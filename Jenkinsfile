pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    triggers {
        githubPush()
    }

    environment {
        DOCKERHUB_USER = "lims4"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/devops-portfolio-mern-frontend"
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/devops-portfolio-mern-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Clonage du depot : ${env.GIT_BRANCH ?: 'branche Jenkins'}"
                checkout scm
                script {
                    def shortCommit = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    env.IMAGE_TAG = "v${new Date().format('yyyy.MM.dd')}-${shortCommit}"
                    echo "Tag Docker calcule : ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Preflight') {
            steps {
                echo "Verification de Docker sur l'agent Jenkins..."
                sh '''
                    set -eu

                    if ! command -v docker >/dev/null 2>&1; then
                        echo "ERREUR: Docker CLI est introuvable sur cet agent Jenkins."
                        echo "Installez Docker CLI dans Jenkins et donnez acces au daemon Docker."
                        exit 127
                    fi

                    docker --version
                    docker compose version
                '''
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
                echo "Demarrage et verification des healthchecks..."
                sh '''
                    set -eu

                    docker compose up -d

                    for service in mongo backend frontend; do
                        echo "Attente du service $service..."
                        container_id="$(docker compose ps -q "$service")"

                        if [ -z "$container_id" ]; then
                            echo "ERREUR: conteneur introuvable pour $service"
                            docker compose ps
                            exit 1
                        fi

                        for attempt in $(seq 1 30); do
                            status="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$container_id")"
                            echo "$service: $status"

                            if [ "$status" = "healthy" ] || [ "$status" = "no-healthcheck" ]; then
                                break
                            fi

                            if [ "$attempt" -eq 30 ]; then
                                echo "ERREUR: $service n'est pas healthy apres attente."
                                docker compose logs "$service"
                                exit 1
                            fi

                            sleep 5
                        done
                    done

                    docker compose ps
                '''
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        set -eu

                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                        docker tag "$FRONTEND_IMAGE:latest" "$FRONTEND_IMAGE:$IMAGE_TAG"
                        docker tag "$BACKEND_IMAGE:latest" "$BACKEND_IMAGE:$IMAGE_TAG"

                        docker push "$FRONTEND_IMAGE:latest"
                        docker push "$BACKEND_IMAGE:latest"
                        docker push "$FRONTEND_IMAGE:$IMAGE_TAG"
                        docker push "$BACKEND_IMAGE:$IMAGE_TAG"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploiement en local..."
                sh '''
                    set -eu
                    docker compose down
                    docker compose up -d
                    docker compose ps
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline reussi - images publiees avec le tag ${env.IMAGE_TAG}"
        }
        failure {
            echo "Pipeline echoue - nettoyage si Docker est disponible..."
            sh '''
                if command -v docker >/dev/null 2>&1; then
                    docker compose down || true
                else
                    echo "Docker indisponible: nettoyage ignore."
                fi
            '''
        }
        always {
            sh '''
                if command -v docker >/dev/null 2>&1; then
                    docker logout || true
                else
                    echo "Docker indisponible: logout ignore."
                fi
            '''
        }
    }
}
