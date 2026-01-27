# 🕹️ Pixel Portfolio - Dual World Edition

Bienvenue dans le dépôt de mon portfolio basé sur l'esthétique du **Pixel Art** et du rétrogaming.

## 🌟 Le Concept : "The Glitch Dimension"

Le portfolio propose deux ambiances visuelles distinctes :
- **Mode Normal (City) :** Un univers pixel art coloré, propre et accueillant.
- **Mode Glitch (Debug) :** Une version alternative révélée par l'interaction.

### 🕹️ Mécaniques de changement d'ambiance
- **Sur Mobile :** Le monde bascule en inclinant physiquement le téléphone.
- **Sur PC :** Une interaction narrative spécifique insertion de cartouche en Drag & Drop permet de révéler la dimension cachée.


## 🛠️ Stack Technique & Dépendances

### Fondations
* **[React 18](https://reactjs.org/)** (TypeScript) : Bibliothèque principale pour une interface réactive et un code typé.
* **[Vite](https://vitejs.dev/)** : Outil de build ultra-rapide pour le développement local.
  
  ```npm create vite@latest```

### Navigation
* **[React Router Dom](https://reactrouter.com/)** : Gestion du routage Single Page Application (SPA) pour des transitions fluides entre Accueil, À Propos, Projets et Contact.

   ```npm install react-router-dom```

### Styling & Animations
* **[Sass (SCSS)](https://sass-lang.com/)** : Utilisé pour le style et les animations complexes (effets de glitch, transitions de sprites, keyframes avancées).
  
  ```npm install -D sass```

* Reveal des blocs et les icons
  
  ```npm instamm framer-motion```

  ```npm install react-icons```

### API
* **[Supabase](https://supabase.com/)** : Gestion d'une base de données pour modifier le nombre de projets, leur affichage et leur description
  
  ```npm install @supabase/supabase-js```