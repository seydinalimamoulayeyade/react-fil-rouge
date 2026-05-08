pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  environment {
    DOCKERHUB_NAMESPACE = "lims4"
    FRONTEND_IMAGE = "${DOCKERHUB_NAMESPACE}/devops-portfolio-mern-frontend"
    BACKEND_IMAGE = "${DOCKERHUB_NAMESPACE}/devops-portfolio-mern-backend"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  stages {
    stage("Install frontend") {
      steps {
        dir("frontend") {
          sh "npm ci || npm install"
        }
      }
    }

    stage("Lint and build frontend") {
      steps {
        dir("frontend") {
          sh "npm run lint"
          sh "npm run build"
        }
      }
    }

    stage("Install backend") {
      steps {
        dir("backend") {
          sh "npm ci || npm install"
        }
      }
    }

    stage("SonarQube analysis") {
      steps {
        sh "sonar-scanner -Dsonar.projectVersion=${IMAGE_TAG}"
      }
    }

    stage("Build Docker images") {
      steps {
        sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} -t ${FRONTEND_IMAGE}:latest ./frontend"
        sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} -t ${BACKEND_IMAGE}:latest ./backend"
      }
    }

    stage("Trivy filesystem scan") {
      steps {
        sh "trivy fs --config trivy.yaml ."
      }
    }

    stage("Trivy image scan") {
      steps {
        sh "trivy image --config trivy.yaml ${FRONTEND_IMAGE}:${IMAGE_TAG}"
        sh "trivy image --config trivy.yaml ${BACKEND_IMAGE}:${IMAGE_TAG}"
      }
    }

    stage("Push Docker images") {
      when {
        branch "main"
      }
      steps {
        withCredentials([usernamePassword(credentialsId: "dockerhub-credentials", usernameVariable: "DOCKERHUB_USER", passwordVariable: "DOCKERHUB_TOKEN")]) {
          sh "echo ${DOCKERHUB_TOKEN} | docker login -u ${DOCKERHUB_USER} --password-stdin"
          sh "docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}"
          sh "docker push ${FRONTEND_IMAGE}:latest"
          sh "docker push ${BACKEND_IMAGE}:${IMAGE_TAG}"
          sh "docker push ${BACKEND_IMAGE}:latest"
        }
      }
    }
  }

  post {
    always {
      sh "docker logout || true"
    }
    success {
      echo "Pipeline terminé : build, qualité, sécurité et images Docker OK."
    }
    failure {
      echo "Pipeline en échec : consulter les logs Jenkins pour corriger l'étape concernée."
    }
  }
}
