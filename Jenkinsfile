pipeline {
    agent any

    environment {
        IMAGE_TAG = "build-${BUILD_NUMBER}"
    }

    stages {
        stage('1. Checkout & Setup') {
            steps {
                echo '🚀 Stage 1: Checking out code and setting up environment'
                checkout scm
                bat 'echo Node version && node -v'
                bat 'echo Yarn version && yarn -v'

                // Clean install using yarn
                bat 'yarn install --frozen-lockfile'
            }
        }

        stage('2. Code Quality & Testing') {
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
                stage('Security Audit') {
                    steps {
                        bat 'yarn audit || exit /b 1'
                    }
                }
            }
        }

        stage('3. Build') {
            steps {
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
