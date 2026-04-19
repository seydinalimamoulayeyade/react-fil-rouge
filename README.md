# 🚀 Portfolio React Cloud & DevOps — Seydina Limamou Laye Yade

Portfolio professionnel développé avec **React**, **Vite** et **Tailwind CSS**, conçu pour présenter mon positionnement **Cloud & DevOps** à travers une interface moderne, animée et structurée.

Ce projet est la reproduction en React de mon portfolio initial en HTML, Tailwind et JavaScript, avec une architecture plus propre, un routing explicite et une base évolutive pour l’intégration future d’un backend plus complet.

---

## ✨ Aperçu

L’application contient :

- une **page d’accueil** fidèle au portfolio original
- une **liste dynamique de projets**
- une **page détail projet**
- une **interface d’ajout / modification / suppression**
- une **persistance simulée** avec `json-server`
- des **animations au scroll** et micro-interactions UI

---

## 🧠 Positionnement

Je suis un ingénieur orienté **Cloud & DevOps**, avec un intérêt particulier pour :

- l’automatisation
- la conteneurisation
- le déploiement d’applications
- les environnements fiables et maintenables
- l’architecture d’interfaces modernes

Ce portfolio reflète cette évolution à travers son contenu, son design et sa structure technique.

---

## 🛠️ Stack technique

### Frontend
- React
- Vite
- Tailwind CSS v4
- React Router

### Données
- json-server
- API REST simulée

### UX / UI
- animations au scroll avec `IntersectionObserver`
- micro-interactions Tailwind
- skeleton loaders
- design sombre orienté portfolio premium

---

## 📂 Structure principale

```bash
src/
├── components/
│   ├── AjouterProjet.jsx
│   ├── DetaillerProjet.jsx
│   ├── Dossier.jsx
│   ├── HomePage.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectCardSkeleton.jsx
│   └── RevealSection.jsx
├── services/
│   └── projetService.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📍 Routes disponibles

| Route | Description |
|------|-------------|
| `/` | Page d’accueil du portfolio |
| `/projets` | Liste des projets |
| `/projets/:id` | Détail d’un projet |
| `/ajouter` | Ajout d’un projet |
| `/modifier/:id` | Modification d’un projet |

---

## ⚙️ Fonctionnalités actuelles

### Portfolio
- hero section orientée Cloud & DevOps
- sections À propos, Compétences et Contact
- projets en vedette sur la page d’accueil
- navigation fidèle au portfolio original

### Projets
- chargement depuis une API REST simulée
- affichage dynamique
- recherche par libellé
- suppression avec mise à jour immédiate
- affichage détaillé par route dynamique

### Administration
- ajout d’un projet
- modification d’un projet avec formulaire prérempli
- suppression d’un projet

### UX
- skeleton loaders pendant les chargements
- reveal au scroll
- hover states premium
- transitions fluides

---

## 🚀 Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/seydinalimamoulayeyade/react-fil-rouge.git
cd react-fil-rouge
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l’API factice

```bash
npx json-server --watch db.json --port 3001
```

### 4. Lancer le projet React

```bash
npm run dev
```

### 5. Ouvrir dans le navigateur

```bash
http://localhost:5173
```

---

## 🧪 Exemple de données attendues dans `db.json`

```json
{
  "projets": [
    {
      "id": 1,
      "libelle": "Portfolio Cloud & DevOps",
      "description": "Portfolio React moderne avec animations, sections premium et gestion de projets.",
      "image": "/images/projet1.jpg",
      "details": "Version React fidèle du portfolio original avec amélioration de l’UX et routing complet."
    }
  ]
}
```

---

## 🎯 Objectif du projet

Ce projet a un double objectif :

1. **présenter mon profil Cloud & DevOps** dans une interface moderne
2. **démontrer ma capacité à structurer une application frontend React** avec routing, composants réutilisables, gestion d’état simple et API simulée

---

## 🔮 Évolutions possibles

- authentification admin
- backend réel (Node.js, Supabase, etc.)
- stockage distant des images
- déploiement CI/CD
- tests unitaires et end-to-end
- amélioration de la version mobile

---

## 📬 Contact

- **Email** : seydinalimamoulayeyade@gmail.com
- **LinkedIn** : https://www.linkedin.com/in/limamou-laye
- **GitHub** : https://github.com/seydinalimamoulayeyade

---

## 📄 Licence

Projet personnel open source à but de présentation et d’apprentissage.

---

## ✅ État actuel

Le projet contient désormais une **version React moderne et visuellement fidèle** au portfolio initial, avec une base propre pour les évolutions futures.
