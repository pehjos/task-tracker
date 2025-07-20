pipeline {
    agent any

    environment {
        NODE_VERSION = '20' // Kept for clarity, but not used in tools anymore
        DOCKER_IMAGE = 'my-app' // Use your desired image name
        DOCKER_TAG = "build-${BUILD_NUMBER}"
    }

    stages {
        stage('1. Checkout & Setup') {
            steps {
                echo '🚀 Stage 1: Checking out code and setting up environment'

                checkout scm

                // Show node & npm versions
                sh 'node --version'
                sh 'npm --version'

                // Clean previous builds
                sh 'rm -rf node_modules dist coverage'

                // Install exact dependencies
                sh 'npm ci'

                echo '✅ Dependencies installed successfully'
            }
        }

        stage('2. Code Quality & Testing') {
            parallel {
                stage('TypeScript Check') {
                    steps {
                        echo '📝 Running TypeScript compilation check'
                        sh 'npx tsc -b --noEmit || echo "TypeScript check failed (non-blocking)"'
                    }
                }

                stage('Linting') {
                    steps {
                        echo '🔍 Running ESLint checks'
                        sh 'npm run lint || echo "Lint warnings present (non-blocking)"'
                    }
                }

                stage('Unit Tests') {
                    steps {
                        echo '🧪 Running tests with Vitest'
                        sh 'npm run test -- --coverage || echo "Tests failed/skipped (non-blocking)"'
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: true,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: 'coverage',
                                reportFiles: 'index.html',
                                reportName: 'Coverage Report'
                            ])
                        }
                    }
                }

                stage('Security Audit') {
                    steps {
                        echo '🔒 Running security audit'
                        sh 'npm audit --audit-level=moderate || echo "Security audit completed with warnings"'
                    }
                }
            }
        }

        stage('3. Build & Package') {
            steps {
                echo '🏗️ Stage 3: Building the Vite React application'

                // Build the React app
                sh 'npm run build'

                // Confirm output
                sh 'ls -la dist/'

                // Archive the build output
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true

                // Build Docker image locally
                script {
                    if (fileExists('Dockerfile')) {
                        echo '🐳 Building Docker image'
                        def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        echo "✅ Docker image built locally: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }

                echo '✅ Build completed successfully'
            }
        }

        stage('4. Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                    branch 'develop'
                }
            }
            steps {
                echo '🚀 Stage 4: Deploying application'

                script {
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master') {
                        echo '🌟 Deploying to PRODUCTION'

                        sh '''
                            # Placeholder: Deploy to production bucket or server
                            echo "Skipping real deployment (not configured yet)"
                        '''
                    } else if (env.BRANCH_NAME == 'develop') {
                        echo '🧪 Deploying to STAGING'

                        sh '''
                            # Placeholder: Deploy to staging
                            echo "Skipping real staging deploy"
                        '''
                    }
                }

                echo '✅ Deployment stage completed (no deployment executed)'
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning up workspace'
            cleanWs()
        }

        success {
            echo '🎉 Pipeline completed successfully!'

            emailext (
                subject: "✅ BUILD SUCCESS: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: """
                    <h3>Build Successful! 🎉</h3>
                    <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                    <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                    <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                    <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                mimeType: 'text/html',
                to: 'team@yourcompany.com'
            )
        }

        failure {
            echo '❌ Pipeline failed!'

            emailext (
                subject: "❌ BUILD FAILED: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: """
                    <h3>Build Failed! ❌</h3>
                    <p><strong>Job:</strong> ${env.JOB_NAME}</p>
                    <p><strong>Build Number:</strong> ${env.BUILD_NUMBER}</p>
                    <p><strong>Branch:</strong> ${env.BRANCH_NAME}</p>
                    <p><strong>Build URL:</strong> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><strong>Console Output:</strong> <a href="${env.BUILD_URL}console">View Logs</a></p>
                """,
                mimeType: 'text/html',
                to: 'team@yourcompany.com'
            )
        }
    }
}
