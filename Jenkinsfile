pipeline {
    agent any
    tools {nodejs "latest"}
    
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'node --version'
                sh '''
                npm install
                   '''
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh '''
                npm run test -- --coverage
                   '''
                   archiveArtifacts 'coverage/'
            }
        }
        stage('Notification') {
            steps {
                echo 'Sending email....'
                sh '''
                    cd scripts/
                    chmod 775 *
                    ./email.sh
                   '''
            }
        }
    }
}