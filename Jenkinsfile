pipeline {
    agent any

    environment {
        PROJECT_NAME = 'yimo-cascade-splash'
    }

    stages {
        stage('Check Environment') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'which npm'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${PROJECT_NAME}") {
                    sh '''
                        echo "Cleaning npm cache..."
                        npm cache clean --force

                        echo "Installing dependencies..."
                        HUSKY=0 npm install --no-optional
                    '''
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
