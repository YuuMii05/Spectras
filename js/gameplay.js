/**
 * GAMEPLAY.JS - Géré par Joao
 * Système de diagnostic et réparation pour ImmaTech
 */

const Gameplay = {
    // 1. Base de données des bugs (Tu changeras les 'pos' pour ta manette)
    bugsData: [
        { 
            id: 'bug_left_stick', 
            name: 'JOYSTICK_L_DRIFT', 
            pos: {x: -0.3, y: 0.6, z: 0.2}, 
            desc: 'Capteur de position instable.', 
            instr: 'Nettoyer le potentiomètre et recalibrer.' 
        },
        { 
            id: 'bug_r2_trigger', 
            name: 'R2_BLOCK_ERROR', 
            pos: {x: 0.4, y: 0.7, z: -0.3}, 
            desc: 'Résistance anormale sur la gâchette.', 
            instr: 'Vérifier le ressort et le moteur haptique.' 
        },
        { 
            id: 'bug_battery', 
            name: 'BATTERY_LEAK', 
            pos: {x: 0, y: 0.4, z: 0}, 
            desc: 'Surchauffe de l\'accumulateur Li-ion.', 
            instr: 'Remplacer la cellule et vérifier l\'isolation.' 
        }
    ],

    repairedCount: 0,
    currentSelectedBug: null,

    // 2. Initialisation : Crée les sphères rouges sur la manette
    init: function() {
        console.log("Joao: Système de diagnostic lancé...");
        const container = document.querySelector('#machine-container');
        
        if (!container) {
            console.error("Erreur: #machine-container introuvable dans la scène de Lee.");
            return;
        }

        this.bugsData.forEach(data => {
            const bugEl = document.createElement('a-sphere');
            bugEl.setAttribute('id', data.id);
            bugEl.setAttribute('class', 'interactable bug'); // Pour le raycaster de Lee
            bugEl.setAttribute('position', data.pos);
            bugEl.setAttribute('radius', '0.08');
            bugEl.setAttribute('material', 'color: #ff0055; emissive: #ff0055; emissiveIntensity: 1');
            
            // Animation de pulsation (Style Active Theory)
            bugEl.setAttribute('animation', 'property: scale; to: 1.3 1.3 1.3; dir: alternate; loop: true; dur: 600');

            // Événement au CLIC
            bugEl.addEventListener('click', () => {
                this.onBugClicked(bugEl, data);
            });

            container.appendChild(bugEl);
        });
    },

    // 3. Quand l'utilisateur clique sur un bug AR
    onBugClicked: function(element, data) {
        this.currentSelectedBug = element;
        
        // AUDIO : Jouer le son de sélection ici
        // let selectSound = new Audio('assets/select.mp3'); selectSound.play();

        // Envoi des infos à l'UI de Myriam/Maram
        window.dispatchEvent(new CustomEvent('ui-update', { 
            detail: {
                title: data.name,
                description: data.desc,
                instructions: data.instr
            } 
        }));
        
        console.log(`Joao: Bug ${data.name} envoyé à l'UI.`);
    },

    // 4. Fonction appelée par le bouton "REPARER" de l'UI
    repair: function() {
        if (!this.currentSelectedBug) return;

        // AUDIO : Jouer le son de réparation ici
        // let repairSound = new Audio('assets/repair.mp3'); repairSound.play();

        // Feedback visuel : Rouge -> Vert
        this.currentSelectedBug.setAttribute('material', 'color: #00ffaa');
        this.currentSelectedBug.setAttribute('material', 'emissive: #00ffaa');
        this.currentSelectedBug.classList.remove('interactable');
        
        // Animation de disparition
        this.currentSelectedBug.setAttribute('animation__out', {
            property: 'scale',
            to: '0 0 0',
            dur: 500,
            easing: 'easeInBack'
        });

        this.repairedCount++;
        
        // Nettoyage après l'animation
        const elToRemove = this.currentSelectedBug;
        setTimeout(() => elToRemove.remove(), 600);
        this.currentSelectedBug = null;

        // Vérification de fin de mission
        if (this.repairedCount === this.bugsData.length) {
            window.dispatchEvent(new CustomEvent('mission-complete'));
        }
    }
};

// On rend l'objet accessible globalement pour Maram
window.Gameplay = Gameplay;