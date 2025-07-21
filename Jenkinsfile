pipeline {
    agent any

    tools {
        nodejs 'NodeJS'               // Pre-configured NodeJS tool in Jenkins
        sonarScanner 'SonarScanner'  // Pre-configured SonarQube scanner tool
    }

    environment {
        IMAGE_TAG = "build-${BUILD_NUMBER}"
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
                echo '🔍 Running SonarQube analysis before build'
                withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                    bat '''
                        sonar-scanner ^
                        -Dsonar.projectKey=your_project_key ^
                        -Dsonar.organization=your_org_if_needed ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://your-sonarqube-server ^
                        -Dsonar.login=%SONAR_TOKEN%
                    '''
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
    }

    post {
        always {
            node {
                echo '🧹 Cleaning up workspace'
                cleanWs()
            }
        }

        failure {
            echo '❌ Pipeline failed!'
        }

        success {
            echo '✅ Pipeline succeeded!'
        }
    }
}
