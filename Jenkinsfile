pipeline {
    agent any
    
        triggers{
        pollSCM('*/5 * * * *')
    }
    
    environment{
        AWS_DEFAULT_REGION = 'ca-central-1'
    }

    stages {
        stage('Preparation') {
            steps {
                git branch: 'main', url: 'https://github.com/attilaxban/netflix-clone-app.git'
            }
        }

        stage('Push-backend-ECR'){
            steps {
                script {
                    withCredentials([aws(credentialsId: 'aws-access', accessKeyVariable: 'AWS_ACCESS_KEY', secretKeyVariable: 'AWS_SECRET_KEY')]) {
                        sh '''
                            export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY
                            export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY
                            export AWS_DEFAULT_REGION=ca-central-1

                            cd backend
                            
                            aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin 891377360878.dkr.ecr.ca-central-1.amazonaws.com
                            docker build -t mernflix/backend .
                            docker tag mernflix/backend:latest 891377360878.dkr.ecr.ca-central-1.amazonaws.com/mernflix/backend:latest
                            docker push 891377360878.dkr.ecr.ca-central-1.amazonaws.com/mernflix/backend:latest
                        '''
                    }
                }
            }
        }
        
        stage('Push-frontend-ECR'){
            steps{
                script{
                    withCredentials([aws(credentialsId: 'aws-access', accessKeyVariable: 'AWS_ACCESS_KEY', secretKeyVariable: 'AWS_SECRET_KEY')]) {
                        sh '''
                        
                            export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY
                            export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_KEY
                            export AWS_DEFAULT_REGION=ca-central-1
                            
                            cd frontend
                            aws ecr get-login-password --region ca-central-1 | docker login --username AWS --password-stdin 891377360878.dkr.ecr.ca-central-1.amazonaws.com
                            docker build -t mernflix/frontend .
                            docker tag mernflix/frontend:latest 891377360878.dkr.ecr.ca-central-1.amazonaws.com/mernflix/frontend:latest
                            docker push 891377360878.dkr.ecr.ca-central-1.amazonaws.com/mernflix/frontend:latest
                         
                        '''
                    }
                }
            }
        }
        
    }
}
