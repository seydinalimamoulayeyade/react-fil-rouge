# Portfolio React Cloud & DevOps - Fullstack

## Nouvelle version fullstack

Ce projet utilise maintenant :
- Frontend React (Vite + Tailwind)
- Backend Node.js + Express
- MongoDB avec Mongoose
- Authentification JWT
- Upload local d'images avec Multer

---

## Lancer avec Docker

### 1. Build et lancement

```bash
docker compose up --build
```

### 2. Acces aux services

- Frontend : http://localhost:5173
- Backend : http://localhost:5000
- API projets : http://localhost:5000/api/projets
- MongoDB : mongodb://localhost:27017

### 3. Commandes Docker utiles

Lister les conteneurs actifs :

```bash
docker ps
```

Lister tous les conteneurs :

```bash
docker ps -a
```

Voir les logs de tous les services :

```bash
docker compose logs -f
```

Voir les logs d'un service :

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f mongo
```

Entrer dans un conteneur :

```bash
docker exec -it backend sh
docker exec -it frontend sh
```

Entrer dans MongoDB :

```bash
docker exec -it mongo mongosh
```

Arreter les conteneurs :

```bash
docker compose down
```

Arreter et supprimer aussi le volume MongoDB :

```bash
docker compose down -v
```

### 4. Configuration Docker

Dans Docker Compose, le backend se connecte a MongoDB avec le nom du service :

```env
MONGO_URI=mongodb://mongo:27017/filrouge
```

Ici, `mongo` est resolu par le DNS interne de Docker Compose.

### 5. Volumes

Le projet utilise deux types de stockage :

```yaml
./backend/uploads:/app/uploads
mongo_data:/data/db
```

- `./backend/uploads:/app/uploads` est un bind mount pour conserver les images uploadees sur la machine.
- `mongo_data:/data/db` est un volume Docker pour conserver les donnees MongoDB.

---

## Lancement manuel sans Docker

### 1. Backend

```bash
cd backend
npm install
```

Creer un fichier `.env` dans `backend/` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/filrouge
JWT_SECRET=supersecretkey
```

Lancer :

```bash
npm run dev
```

### 2. Frontend

Creer un fichier `.env` a la racine :

```env
VITE_API_URL=http://localhost:5000/api
```

Puis :

```bash
npm install
npm run dev
```

---

## API connectee

Routes principales :

```bash
GET    /api/projets
GET    /api/projets/:id
POST   /api/projets
PUT    /api/projets/:id
DELETE /api/projets/:id
```

Routes auth :

```bash
POST /api/auth/register
POST /api/auth/login
```

---

## Objectif pedagogique Docker

Ce setup permet de pratiquer :

- Dockerfile
- build d'images
- lancement de conteneurs
- exposition de ports
- reseaux Docker Compose
- DNS integre Docker
- volumes Docker
- bind mounts
- logs
- exec dans un conteneur
- orchestration avec Docker Compose

---

## Objectif du projet

Application fullstack cloud-ready avec :

- architecture propre
- API REST reelle
- frontend connecte
- authentification JWT
- upload d'images
- base MongoDB
- dockerisation pedagogique
