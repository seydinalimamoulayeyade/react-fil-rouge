variable "project_name" {
  description = "Nom utilisé pour préfixer les ressources AWS."
  type        = string
  default     = "devops-portfolio-mern"
}

variable "aws_region" {
  description = "Région AWS cible."
  type        = string
  default     = "eu-west-3"
}

variable "vpc_cidr" {
  description = "CIDR du VPC applicatif."
  type        = string
  default     = "10.20.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR des sous-réseaux publics."
  type        = list(string)
  default     = ["10.20.1.0/24", "10.20.2.0/24"]
}
