# devops-portfolio-mern

> Application fullstack MERN containerisée — fil rouge de la formation Cloud & DevOps à l'Orange Digital Center (ODC).

![Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square&logo=react)
![Docker](https://img.shields.io/badge/Docker-Containerisé-2496ED?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/Licence-MIT-green?style=flat-square)

---

## Présentation

**devops-portfolio-mern** est une application de gestion de portfolio technique, conçue pour servir de projet fil rouge tout au long de la formation DevOps. Chaque module de la formation ajoute une couche concrète au même projet — de la containerisation Docker jusqu'au monitoring Prometheus/Grafana, en passant par Jenkins, Kubernetes et Terraform.

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Base de données | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Upload | Multer (stockage local) |
| Containerisation | Docker + Docker Compose |

---

## Structure du projet

```
devops-portfolio-mern/
├── frontend/                   # Application React (Vite)
│   ├── src/
│   │   ├── components/         # Composants UI réutilisables
│   │   ├── pages/              # Vues / routes
│   │   ├── context/            # État global (AuthContext)
│   │   ├── services/           # Appels API (axios)
│   │   └── hooks/              # Custom hooks
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── backend/                    # API Node.js / Express
│   ├── src/
│   │   ├── config/             # Connexion MongoDB
│   │   ├── controllers/        # Logique métier
│   │   ├── middleware/         # Auth, upload, erreurs
│   │   ├── models/             # Schémas Mongoose
│   │   ├── routes/             # Endpoints REST
│   │   └── utils/              # Fonctions helpers
│   ├── uploads/                # Images uploadées (non versionné)
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Démarrage rapide

### Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et lancé
- Git

### Lancement avec Docker Compose

```bash
git clone https://github.com/seydinalimamoulayeyade/devops-portfolio-mern.git
cd devops-portfolio-mern
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| MongoDB | mongodb://localhost:27017 |

---

## Configuration

### Variables d'environnement

Copie les fichiers d'exemple et renseigne les valeurs :

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**`backend/.env`**

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/filrouge
JWT_SECRET=change_this_secret
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:5000/api
```

> En environnement Docker Compose, `mongo` est résolu par le DNS interne — ne pas remplacer par `localhost`.

---

## Lancement sans Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> MongoDB doit tourner localement sur le port `27017`.

---

## API REST

### Projets

```
GET    /api/projets          Liste tous les projets
GET    /api/projets/:id      Détail d'un projet
POST   /api/projets          Créer un projet (auth requise)
PUT    /api/projets/:id      Modifier un projet (auth requise)
DELETE /api/projets/:id      Supprimer un projet (auth requise)
```

### Authentification

```
POST   /api/auth/register    Créer un compte
POST   /api/auth/login       Connexion — retourne un token JWT
```

---

## Volumes Docker

```yaml
./backend/uploads:/app/uploads   # Bind mount — images persistées sur la machine hôte
mongo_data:/data/db              # Volume Docker — données MongoDB persistées
```

---

## Roadmap DevOps

Ce projet évolue module par module tout au long de la formation :

| Module | Technologie | Statut |
|--------|-------------|--------|
| 1 | DevOps intro — Git flow, branching, README | ✅ Fait |
| 2 | Docker — Dockerfile, Docker Compose | ✅ Fait |
| 3 | Jenkins — Pipeline CI/CD | 🔜 À venir |
| 4 | SonarQube — Qualité du code | 🔜 À venir |
| 5 | Kubernetes — Orchestration | 🔜 À venir |
| 6 | Terraform — Infrastructure as Code | 🔜 À venir |
| 7 | Prometheus / Grafana — Monitoring | 🔜 À venir |
| 8 | Trivy — Scan de sécurité | 🔜 À venir |
| 9 | Outils IA pour DevOps | 🔜 À venir |

---

## Auteur

**Seydina Lima Mamoulaye Yade**
Formation Cloud AWS & DevOps — Orange Digital Center (ODC)
[GitHub](https://github.com/seydinalimamoulayeyade)

---

## Licence

MIT