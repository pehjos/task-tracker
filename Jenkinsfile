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
                bat 'echo NPM version && npm -v'

                // Install dependencies based on package-lock.json
                bat 'npm ci'
            }
        }

        stage('2. Code Quality & Testing') {
            parallel {
                stage('TypeScript Check') {
                    steps {
                        echo '📝 Running TypeScript check'
                        bat 'npm run type-check || exit /b 1'
                    }
                }

                stage('Linting') {
                    steps {
                        echo '🔍 Running linting'
                        bat 'npm run lint || exit /b 1'
                    }
                }

                stage('Unit Tests') {
                    steps {
                        echo '🧪 Running unit tests'
                        bat 'npm run test || exit /b 1'
                    }
                }

                stage('Security Audit') {
                    steps {
                        echo '🔒 Running security audit'
                        bat 'npm audit || exit /b 1'
                    }
                }
            }
        }

        stage('3. Build') {
            steps {
                echo '🏗️ Building Vite app'
                bat 'npm run build'
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up workspace'
            cleanWs()
        }

        success {
            echo '🎉 Pipeline completed successfully'
        }

        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
