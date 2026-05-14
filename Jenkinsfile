pipeline {
    agent any

    environment {
        DOCKERHUB_USER    = "lims4"
        FRONTEND_IMAGE    = "${DOCKERHUB_USER}/devops-portfolio-mern-frontend"
        BACKEND_IMAGE     = "${DOCKERHUB_USER}/devops-portfolio-mern-backend"
        IMAGE_TAG         = "v${new Date().format('yyyy.MM.dd')}-${GIT_COMMIT.take(7)}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Clonage du dépôt : ${GIT_BRANCH}"
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Build des images Docker..."
                sh 'docker compose build'
            }
        }

        stage('Test') {
            steps {
                echo "Vérification des health checks..."
                sh 'docker compose up -d'
                sh 'sleep 30'
                sh 'docker compose ps | grep healthy'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'

                    // Tag latest
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                    sh "docker push ${BACKEND_IMAGE}:latest"

                    // Tag versionné
                    sh "docker tag ${FRONTEND_IMAGE}:latest ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker tag ${BACKEND_IMAGE}:latest ${BACKEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}"
                    sh "docker push ${BACKEND_IMAGE}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Déploiement en local..."
                sh 'docker compose down'
                sh 'docker compose up -d'
                sh 'sleep 20'
                sh 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo "Pipeline réussi — images publiées avec le tag ${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline échoué — nettoyage..."
            sh 'docker compose down'
        }
        always {
            sh 'docker logout'
        }
    }
}