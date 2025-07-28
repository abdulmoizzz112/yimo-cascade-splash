pipeline {
    agent any

    environment {
        GIT_URL = 'https://github.com/abdulmoizzz112/yimo-cascade-splash.git'
        PROJECT_NAME = 'yimo-cascade-splash'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository
                git url: "${GIT_URL}"
            }
        }

        stage('Navigate to Project') {
            steps {
                dir("${PROJECT_NAME}") {
                    echo "Changed directory to ${PROJECT_NAME}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${PROJECT_NAME}") {
                    sh 'npm install'
                }
            }
        }

        stage('Start Development Server') {
            steps {
                dir("${PROJECT_NAME}") {
                    // Start the dev server (non-blocking)
                    sh 'nohup npm run dev &'
                    echo "Dev server started"
                }
            }
        }
    }
}
