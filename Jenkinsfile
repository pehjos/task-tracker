pipeline {
    agent any

    environment {
        IMAGE_TAG = "build-${BUILD_NUMBER}"
    }

    stages {
        stage('1. Checkout & Setup') {
            steps {
                echo '🚀 Stage 1: Checking out code and setting up environment'
                bat 'echo Node version && node -v'
                bat 'echo NPM version && npm -v'
            }
        }

        stage('2. Code Quality & Testing') {
            parallel {
                stage('TypeScript Check') {
                    steps {
                        bat 'npm run type-check || exit /b 1'
                    }
                }
                stage('Linting') {
                    steps {
                        bat 'npm run lint || exit /b 1'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        bat 'npm test || exit /b 1'
                    }
                }
                stage('Security Audit') {
                    steps {
                        bat 'npm audit || exit /b 1'
                    }
                }
            }
        }

        stage('3. Build') {
            steps {
                bat 'npm run build'
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
