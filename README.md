<h1 align="center" id="top">Spectra – Interface de contrôle immersive</h1>
<p align="center">
  <b>WebXR • Interaction 3D • Réalité Augmentée</b>
</p>
<p align="center">
  <i>Application web immersive développée avec A-Frame et JavaScript, 
  permettant d’interagir avec une machine 3D et d’accompagner les techniciens 
  dans le diagnostic et la réparation de systèmes complexes.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <br/>
  <img src="https://img.shields.io/badge/A--Frame-EF2D5E?style=for-the-badge&logo=aframe&logoColor=white" />
  <img src="https://img.shields.io/badge/WebXR-000000?style=for-the-badge&logo=webxr&logoColor=white" />
  <img src="https://img.shields.io/badge/AR.js-FF6F00?style=for-the-badge&logo=augmented-reality&logoColor=white" />
</p>

---

#### Projet réalisé dans le cadre du programme IPSSI, visant à concevoir une expérience interactive en réalité augmentée alliant immersion, ergonomie et utilité métier.

*Ce projet a été réalisé en collaboration par quatre étudiants :*

* *Maram Bougossa (Intégration & Architecture) : A assuré la connexion entre la scène AR, le gameplay et l’interface, ainsi que les tests finaux, la correction des bugs et la livraison du projet.*

* *Lee Banon (AR & Scène 3D) : A mis en place la scène en réalité augmentée avec A-Frame et intégré la machine 3D de manière stable au centre de l’expérience.*

* *Joao Victor (Gameplay & Logique) : A développé la logique du jeu en créant les bugs interactifs, leur détection, leur réparation et le système de progression.*

* *Myriam Ghoul (Interface Utilisateur) : A conçu le panneau latéral interactif avec affichage dynamique des informations, animations et validation des réparations.*

---

> ### Architecture et Conception Technique  
Le projet **Spectra** repose sur une architecture modulaire orientée expérience immersive, permettant de séparer clairement les responsabilités entre rendu 3D, logique interactive et interface utilisateur.  

L’application exploite les technologies **WebXR** et **A-Frame** afin de proposer une expérience en réalité augmentée fluide directement dans le navigateur.

---
**Organisation du projet**    

* **index.html** : Point d’entrée principal de l’application  
* **scene/scene.html** : Initialisation de la scène AR, gestion de la caméra et affichage de la machine 3D  
* **js/gameplay.js** : Gestion des interactions et du système de bugs (détection, réparation, progression)  
* **js/ui.js** : Gestion dynamique des interactions avec le panneau utilisateur  
* **js/main.js** : Intégration globale et communication entre les modules  
* **ui/ui.html & ui/ui.css** : Interface utilisateur (panneau latéral, affichage des informations, animations)  
* **assets/** : Ressources (modèles 3D, effets sonores, médias)  

---

**Logique interactive (Gameplay)**    

Le système simule une intervention technique :

* Apparition de bugs sur la machine  
* Interaction utilisateur par clic  
* Affichage d’informations contextuelles  
* Validation des réparations  
* Progression globale :  
  `cassée → en réparation → réparée`  

---

**Interface Utilisateur (UI/UX)**    

* Panneau latéral dynamique  
* Contenu adaptatif selon le bug  
* Animations fluides (slide)  
* Interaction simplifiée via bouton de validation  

---

**Réalité Augmentée & Rendu 3D**    

* Activation de la caméra en temps réel  
* Intégration d’une scène A-Frame  
* Positionnement stable de la machine 3D  
* Superposition AR pour interaction directe  

---

> ### Installation et Lancement  

1. **Cloner le projet**  
```bash
git clone https://github.com/YuuMii05/Spectras.git
cd Spectras
```
2. Ouvrir le projet
Lancer dans VS Code
3. Exécuter avec Live Server
Ouvrir index.html ou scene.html
4. Accéder à l’application
http://127.0.0.1:5500/index.html

**Guide d’Utilisation (Workflow)**  
1. Lancer l’application
2. La caméra AR s’active et la machine apparaît
3. Cliquer sur un bug pour afficher les informations
4. Lire les instructions de réparation
5. Valider la réparation
6. Observer la progression jusqu’à résolution complète

**Structure du Projet**  

```text
Spectras/
├── assets/             # Ressources (Modèle 3D ps5.glb, sons click/repair.mp3)
├── js/                 # Logique applicative
│   ├── gameplay.js     # Gestion des interactions et détection des bugs
│   ├── main.js         # Point d'entrée et initialisation globale
│   └── ui.js           # Contrôle dynamique de l'interface utilisateur
├── scene/              # Composants de réalité augmentée
│   └── scene.html      # Configuration de la scène A-Frame et caméra XR
├── ui/                 # Interface graphique (Frontend)
│   ├── ui.css          # Styles, animations et design "Pink"
│   └── ui.html         # Structure du panneau d'information latéral
├── index.html          # Page d'accueil principale
└── README.md           # Documentation du projet
```

**Aperçu et Preuves de Fonctionnement**  
1. **Page d'Accueil (Navigation Immersive)**
L'interface d'accueil de **Spectra** propose une esthétique minimaliste et moderne sur un dégradé de tons roses, centrée sur l'utilisateur. Elle sert de point d'entrée principal vers le guide interactif 3D, offrant une navigation directe vers les informations essentielles du projet via un bouton d'action central.
<img width="1906" height="906" alt="Accueil - page" src="https://github.com/user-attachments/assets/8b31c073-fcad-4b0b-9bf1-c25063f65c3d" />

2. **Section Infos & Objectifs**
Cette page détaille la mission de l'interface de contrôle développée pour *ImmaTech*. Elle explique comment **Spectra** transforme une manette de jeu stylisée en un outil d'assistance intelligent. L'utilisateur y découvre le workflow de diagnostic : interaction avec l'environnement en temps réel, aide à la réparation de systèmes complexes et navigation fluide en réalité augmentée (AR).
<img width="1899" height="901" alt="Infos - page" src="https://github.com/user-attachments/assets/616fa917-fb6c-4ea1-a7a8-3f70dd4386d7" />

3. **Interface Interactive & Diagnostic 3D**  
Cette interface est le cœur fonctionnel de Spectra. Elle permet une inspection immersive en temps réel d'un contrôleur modélisé en 3D (ici une PS5 Pro), transformant la maintenance technique en une expérience visuelle simplifiée.
<img width="1918" height="917" alt="1" src="https://github.com/user-attachments/assets/ce3a1204-a9da-4304-ae94-54e85eb4a455" />
<img width="1918" height="922" alt="2" src="https://github.com/user-attachments/assets/3e3037de-d4a4-4ce8-9c4d-5f58a2727022" />  

Caractéristiques principales :
* Télémétrie en temps réel : Monitoring instantané de la batterie, de la force du signal BT et de la température interne.
* Diagnostic Ciblé : Identification précise des pannes (ex: accumulation de débris sous une membrane) via un panneau latéral dynamique.
* Navigation Intuitive : Contrôles de caméra fluides (Re-center, Auto-rotate) et fonction Full Scan pour une analyse exhaustive du matériel.
* Assistance Contextuelle : Recommandations de réparation précises basées sur l'état des composants, optimisées pour une utilisation en réalité étendue (XR).

**Conclusion**  
Ce projet nous a permis de développer une application immersive combinant réalité augmentée, interaction 3D et logique applicative, tout en respectant une architecture modulaire.
Il offre une solution concrète d’assistance au diagnostic, illustrant le potentiel des technologies WebXR dans un contexte professionnel.

---

**Contacts de l'Équipe**  
* **Maram Bougossa** - [GitHub](https://github.com/YuuMii05)
* **Joao Victor** - [GitHub](https://github.com/kiseij660)
* **Lee Banon** - [GitHub](https://github.com/Leebanon0111)
* **Myriam Ghoul** - [GitHub](https://github.com/myriamelghl-afk)

<p align="right"><a href="#top">Retour au menu</a></p>
