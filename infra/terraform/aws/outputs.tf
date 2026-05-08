output "frontend_ecr_repository_url" {
  description = "URL du repository ECR frontend."
  value       = aws_ecr_repository.frontend.repository_url
}

output "backend_ecr_repository_url" {
  description = "URL du repository ECR backend."
  value       = aws_ecr_repository.backend.repository_url
}

output "cloudwatch_log_group_name" {
  description = "Nom du groupe de logs applicatif."
  value       = aws_cloudwatch_log_group.app.name
}

output "vpc_id" {
  description = "ID du VPC applicatif."
  value       = aws_vpc.main.id
}
