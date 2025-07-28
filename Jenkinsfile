pipeline {
    agent any

    environment {
        PROJECT_NAME = 'yimo-cascade-splash'
    }

    stages {
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
                    sh 'nohup npm run dev &'
                    echo 'Dev server started'
                }
            }
        }
    }
}
