pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20' // Updated for Vite + React 19
        DOCKER_IMAGE = 'my-app' // Matches your package.json name
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    tools {
        nodejs "${NODE_VERSION}"
    }
    
    stages {
        stage('1. Checkout & Setup') {
            steps {
                echo '🚀 Stage 1: Checking out code and setting up environment'
                
                // Checkout code from GitHub
                checkout scm
                
                // Display Node and npm versions
                sh 'node --version'
                sh 'npm --version'
                
                // Clean any previous builds
                sh 'rm -rf node_modules dist coverage'
                
                // Install dependencies (npm ci for exact package-lock.json versions)
                sh 'npm ci'
                
                echo '✅ Dependencies installed successfully'
            }
        }
        
        stage('2. Code Quality & Testing') {
            parallel {
                stage('TypeScript Check') {
                    steps {
                        echo '📝 Running TypeScript compilation check'
                        sh 'npx tsc -b --noEmit'
                    }
                }
                
                stage('Linting') {
                    steps {
                        echo '🔍 Running ESLint checks'
                        sh 'npm run lint'
                    }
                }
                
                stage('Unit Tests') {
                    steps {
                        echo '🧪 Running tests with Vitest'
                        sh 'npm run test -- --coverage'
                    }
                    post {
                        always {
                            // Archive test coverage reports
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
                
                // Build the React app with Vite
                sh 'npm run build'
                
                // Verify build output (Vite builds to 'dist' folder)
                sh 'ls -la dist/'
                
                // Archive build artifacts
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                
                // Optional: Create Docker image
                script {
                    if (fileExists('Dockerfile')) {
                        echo '🐳 Building Docker image'
                        def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        docker.withRegistry('https://your-registry.com', 'docker-registry-credentials') {
                            image.push()
                            image.push('latest')
                        }
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
                        
                        // Production deployment steps (Vite builds to 'dist' folder)
                        sh '''
                            # Example: Deploy to AWS S3 + CloudFront
                            aws s3 sync dist/ s3://your-prod-bucket --delete
                            aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
                        '''
                        
                        // Or deploy using rsync to server
                        // sh 'rsync -avz --delete dist/ user@prod-server:/var/www/html/'
                        
                    } else if (env.BRANCH_NAME == 'develop') {
                        echo '🧪 Deploying to STAGING'
                        
                        // Staging deployment steps (Vite builds to 'dist' folder)
                        sh '''
                            # Example: Deploy to staging environment
                            aws s3 sync dist/ s3://your-staging-bucket --delete
                        '''
                        
                        // Or deploy to staging server
                        // sh 'rsync -avz --delete dist/ user@staging-server:/var/www/html/'
                    }
                }
                
                echo '✅ Deployment completed successfully'
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
            
            // Send success notification
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
            
            // Send failure notification
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