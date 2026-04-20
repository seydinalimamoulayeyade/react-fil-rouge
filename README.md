# 🚀 Portfolio React Cloud & DevOps — Fullstack

## 🔥 Nouvelle version FULLSTACK

Ce projet utilise maintenant :
- Frontend React (Vite + Tailwind)
- Backend Node.js + Express
- MongoDB avec Mongoose

---

## ⚙️ Lancement complet

### 1. Backend

```bash
cd backend
npm install
```

Créer `.env` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/filrouge
```

Lancer :

```bash
npm run dev
```

---

### 2. Frontend

Créer `.env` à la racine :

```env
VITE_API_URL=http://localhost:5000/api
```

Puis :

```bash
npm install
npm run dev
```

---

## 🔗 API connectée

Routes utilisées :

```bash
GET /api/projets
POST /api/projets
PUT /api/projets/:id
DELETE /api/projets/:id
```

---

## 🎯 Objectif

Application fullstack Cloud-ready avec :
- architecture propre
- API REST réelle
- frontend connecté

---

## 🚀 Prochaine évolution

- Authentification JWT
- Déploiement (Render / Railway / AWS)
- CI/CD
