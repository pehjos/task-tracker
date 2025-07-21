pipeline {
    agent any
    tools {
        nodejs 'NodeJS'  // Must match the label in Jenkins "NodeJS" installation
    }
    environment {
        IMAGE_TAG = "build-${BUILD_NUMBER}"
        SONAR_SCANNER_HOME = tool 'SonarScanner'  // Reference to configured SonarQube Scanner
        PATH = "${env.SONAR_SCANNER_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('1. Checkout & Setup') {
            steps {
                echo '🚀 Stage 1: Checking out code and setting up environment'
                checkout scm
                bat 'echo Node version && node -v'
                bat 'npm install -g yarn'
                bat 'echo Yarn version && yarn -v'
                bat 'yarn install --frozen-lockfile'
            }
        }
        stage('2. SonarQube Analysis') {
            steps {
                echo '🔍 Running SonarQube analysis using sonar-project.properties'
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') { 
                        bat 'sonar-scanner -Dsonar.login=%SONAR_TOKEN%'
                    }
                }
            }
        }
        stage('3. Code Quality & Testing') {
            parallel {
                stage('TypeScript Check') {
                    steps {
                        bat 'yarn type-check || exit /b 1'
                    }
                }
                stage('Linting') {
                    steps {
                        bat 'yarn lint || exit /b 1'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        bat 'yarn test || exit /b 1'
                    }
                }
            }
        }
        stage('4. Build') {
            steps {
                echo '🏗️ Building application'
                bat 'yarn build'
            }
        }
        stage('5. Quality Gate') {
            steps {
                echo '⏳ Waiting for SonarQube Quality Gate'
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    post {
        always {
            echo '🧹 Cleaning up workspace'
            cleanWs()
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        success {
            echo '✅ Pipeline succeeded!'
        }
    }
}