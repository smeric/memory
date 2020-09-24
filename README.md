# memory

Jeu de mémoire

Au commencement du jeu, des cartes sont disposées face cachée à l'écran.
* Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est
validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner
une nouvelle paire de cartes.
* Une compteur de temps, avec une barre de progression, s’affiche en dessous du
plateau. Par défaut, le temps imparti est de 3 minutes.
* Le joueur gagne s'il arrive à découvrir toutes les paires avant la fin des 3 minutes.
* Chaque temps de partie effectuée est sauvegardée en base de données.
Avant le début du jeu, les meilleurs temps s’affichent à l’écran.

## Mise en place des fichiers

### Clonage du repository en local

Création du dossier `memory` et clonage de l'ensemble du contenu du repository
```bash
git clone https://github.com/smeric/memory.git
```

### Gestion des packages
Installation de npm dans le dossier `memory`
```bash
npm install
```

### Gestion des dépendances
Installation de composer dans le dossier `public`
```bash
composer install
```

### Modifications CSS
Mise en route du préprocesseur sass si des modifications sont apportées aux feuilles de style.
```bash
npm run build-css
```

## 1ère mise en route de l'app

### Création de la table en BDD
On peut soit importer le fichier `/memory/scores.sql` depuis phpMyAdmin soit se connecter sur `http://localhost/memory/public/gateway.php`. Le fichier `gateway.php` inclus le fichier `init.php` qui contient les instructions pour que php crée la table. Il faudra dans tous les cas arréter d'inclure ce fichier et le supprimer dès que la table existera dans la base.

Les informations de connexion à la base se trouvent dans le fichier `config.php` également inclus dans `gateway.php`.

### Lancement de l'app
Si on l'execute en local, l'app se trouve ici :  `http://localhost/memory/public/index.html`.

Amusez-vous bien ;)
