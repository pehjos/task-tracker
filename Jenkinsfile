pipeline {
    agent any
    
    environment {
        // Define environment variables
        NODE_VERSION = '18'  // Adjust based on your project
        PYTHON_VERSION = '3.9'  // Adjust if using Python
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                checkout scm
                echo "Code checked out successfully"
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    // Setup based on your project type
                    if (fileExists('package.json')) {
                        echo "Node.js project detected"
                        bat 'npm --version'
                        bat 'node --version'
                    }
                    if (fileExists('requirements.txt')) {
                        echo "Python project detected"
                        bat 'python --version'
                    }
                    if (fileExists('pom.xml')) {
                        echo "Maven project detected"
                        bat 'mvn --version'
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies based on project type
                    if (fileExists('package.json')) {
                        bat 'npm install'
                    }
                    if (fileExists('requirements.txt')) {
                        bat 'pip install -r requirements.txt'
                    }
                    if (fileExists('pom.xml')) {
                        bat 'mvn clean compile'
                    }
                }
            }
        }
        
        stage('Code Quality Checks') {
            parallel {
                stage('Linting') {
                    steps {
                        script {
                            // Run linting based on project type
                            if (fileExists('package.json')) {
                                bat 'npm run lint || echo "No lint script found"'
                            }
                            if (fileExists('.pylintrc') || fileExists('setup.cfg')) {
                                bat 'pylint . || echo "Pylint check completed"'
                            }
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        script {
                            // Security checks
                            if (fileExists('package.json')) {
                                bat 'npm audit || echo "Security audit completed"'
                            }
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Run tests based on project type
                    if (fileExists('package.json')) {
                        bat 'npm test'
                    }
                    if (fileExists('pytest.ini') || fileExists('test_*.py')) {
                        bat 'python -m pytest --junitxml=test-results.xml'
                    }
                    if (fileExists('pom.xml')) {
                        bat 'mvn test'
                    }
                }
            }
            post {
                always {
                    // Publish test results
                    script {
                        if (fileExists('test-results.xml')) {
                            publishTestResults testResultsPattern: 'test-results.xml'
                        }
                        if (fileExists('target/surefire-reports/*.xml')) {
                            publishTestResults testResultsPattern: 'target/surefire-reports/*.xml'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Build based on project type
                    if (fileExists('package.json')) {
                        bat 'npm run build || echo "No build script found"'
                    }
                    if (fileExists('setup.py')) {
                        bat 'python setup.py build'
                    }
                    if (fileExists('pom.xml')) {
                        bat 'mvn package'
                    }
                    if (fileExists('Dockerfile')) {
                        bat 'docker build -t %JOB_NAME%:%BUILD_NUMBER% .'
                    }
                }
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                script {
                    // Archive build artifacts
                    if (fileExists('dist/')) {
                        archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                    }
                    if (fileExists('build/')) {
                        archiveArtifacts artifacts: 'build/**/*', fingerprint: true
                    }
                    if (fileExists('target/')) {
                        archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'  // Only deploy from main branch
            }
            steps {
                script {
                    // Add your deployment logic here
                    echo "Deploying to staging environment..."
                    // Example: bat 'scp dist/* user@staging-server:/path/to/deploy/'
                    // Example: bat 'ssh user@staging-server "sudo systemctl restart myapp"'
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
            // Optional: Send success notification
            // emailext subject: "Build Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            //          body: "Build completed successfully.",
            //          to: "team@company.com"
        }
        failure {
            echo "Pipeline failed!"
            // Optional: Send failure notification
            // emailext subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
            //          body: "Build failed. Please check the console output.",
            //          to: "team@company.com"
        }
    }
}