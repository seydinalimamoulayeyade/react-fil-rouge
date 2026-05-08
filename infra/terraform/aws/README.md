# Terraform AWS baseline

Ce dossier pose un socle Infrastructure as Code pour préparer le portfolio à un déploiement AWS.

## Ressources déclarées

- Repositories ECR frontend/backend
- Groupe de logs CloudWatch
- VPC minimal avec sous-réseaux publics

## Utilisation

```bash
cd infra/terraform/aws
terraform init
terraform plan -var="project_name=devops-portfolio-mern"
terraform apply -var="project_name=devops-portfolio-mern"
```

Les credentials AWS doivent être fournis par le CLI AWS, un profil local ou des variables d'environnement.
