# 🎨 Mon Portfolio en React

Un portfolio professionnel moderne créé avec React, Vite et CSS3. Avec un design élégant, responsive et un mode sombre.

## ✨ Caractéristiques

- ✅ Design moderne et responsif
- 🌙 Mode sombre/clair
- 📱 Optimisé pour mobile, tablette et desktop
- ⚡ Rapide grâce à Vite
- 🎯 Navigation fluide
- 📧 Formulaire de contact
- 🎨 Animations élégantes

## 📦 Tech Stack

- **React 18** - Bibliothèque JavaScript
- **Vite** - Bundler rapide
- **CSS3** - Styling avec variables CSS et gradients
- **React Icons** - Icônes SVG
- **React Scroll** - Navigation smooth scroll

## 🚀 Installation

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Étapes

1. **Cloner le projet ou entrer dans le dossier**
```bash
cd Portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Le portfolio s'ouvrira automatiquement sur `http://localhost:3000`

## 🛠️ Commandes disponibles

```bash
# Mode développement avec hot reload
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build production
npm run preview

# Analyser le code
npm run lint
```

## 📂 Structure du projet

```
Portfolio/
├── src/
│   ├── components/        # Composants React
│   │   ├── Header.jsx     # En-tête et navigation
│   │   ├── Hero.jsx       # Section héro
│   │   ├── About.jsx      # À propos
│   │   ├── Skills.jsx     # Compétences
│   │   ├── Projects.jsx   # Projets
│   │   ├── Contact.jsx    # Formulaire de contact
│   │   └── Footer.jsx     # Pied de page
│   ├── styles/
│   │   └── index.css      # Styles globaux
│   ├── App.jsx            # Composant principal
│   └── main.jsx           # Point d'entrée
├── index.html            # HTML principal
├── vite.config.js        # Configuration Vite
└── package.json          # Dépendances

```

## 🎨 Personnalisation

### Modifier les couleurs
Éditez les variables CSS dans `src/styles/index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... autres couleurs */
}
```

### Ajouter vos projets
Modifiez le tableau `projects` dans `src/components/Projects.jsx`

### Modifier les informations personnelles
- **Header/Footer**: Éditez les liens dans `src/components/Header.jsx` et `src/components/Footer.jsx`
- **À propos**: Modifiez le texte dans `src/components/About.jsx`
- **Compétences**: Personnalisez le tableau `skills` dans `src/components/Skills.jsx`

### Configurer le formulaire de contact
Actuellement, le formulaire affiche une alerte. Pour l'intégrer avec un backend:

1. Créez un service pour envoyer les données
2. Modifiez la fonction `handleSubmit` dans `src/components/Contact.jsx`

Exemple avec EmailJS:
```javascript
import emailjs from '@emailjs/browser'

const handleSubmit = async (e) => {
  e.preventDefault()
  await emailjs.send(serviceID, templateID, formData)
  // ...
}
```

## 📱 Responsive Design

Le portfolio est entièrement responsive avec des breakpoints à:
- 📱 Mobile: < 480px
- 📱 Tablet: < 768px  
- 🖥️ Desktop: > 768px

## 🌙 Mode Sombre

Le mode sombre/clair se bascule via le bouton dans l'en-tête. L'état peut être persisté via localStorage:

```javascript
// Dans App.jsx
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

## 🚀 Déploiement

### Déployer sur Vercel

```bash
npm install -g vercel
vercel
```

### Déployer sur Netlify

```bash
npm run build
# Puis drag & drop le dossier 'dist' sur netlify.com
```

### Déployer sur GitHub Pages

1. Ajoutez `homepage` dans `package.json`
2. Installez `gh-pages`
3. Ajoutez les scripts de déploiement

## 📝 À faire

- [ ] Ajouter vos vrais projets
- [ ] Ajouter vos vraies images
- [ ] Configurer le formulaire de contact
- [ ] Ajouter vos liens réseaux sociaux
- [ ] Ajouter Analytics (Google Analytics, Plausible, etc.)
- [ ] Générer un sitemap pour le SEO

## 📄 Licence

Ce projet est libre d'utilisation.

## 👤 Auteur

Créé avec ❤️ pour votre portfolio

---

**Besoin d'aide?** N'hésitez pas à consulter la documentation:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Icons](https://react-icons.github.io/react-icons/)
