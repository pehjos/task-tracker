pipeline {
    agent any

    tools {
        nodejs 'NodeJS'                  // From Jenkins Global Tools
    }

    environment {
        IMAGE_TAG = "build-${BUILD_NUMBER}"
        SONAR_SCANNER_HOME = tool 'SonarScanner' // Name set in Jenkins → Global Tool Config
    }

    stages {
        stage('1. Checkout & Setup') {
            steps {
                echo '🚀 Checkout and environment setup'
                checkout scm
                bat 'node -v'
                bat 'npm install -g yarn'
                bat 'yarn -v'
                bat 'yarn install --frozen-lockfile'
            }
        }

        stage('2. SonarQube Scan') {
            steps {
                echo '🔍 Running SonarQube analysis before build'
                withCredentials([string(credentialsId: 'sonarcloud-token', variable: 'SONAR_TOKEN')]) {
                    bat """
                        ${env.SONAR_SCANNER_HOME}\\bin\\sonar-scanner.bat ^
                        -Dsonar.login=%SONAR_TOKEN%
                    """
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
                echo '🏗️ Building project'
                bat 'yarn build'
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
    }
}
