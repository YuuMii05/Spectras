const BUGS_DATA = [
  { id: 'btn_cross',      name: 'CROIX',      pos: { x: -0.010, y: 0.028, z: -0.024 } },
  { id: 'btn_circle',     name: 'ROND',       pos: { x: -0.018, y: 0.024, z: -0.020 } },
  { id: 'btn_square',     name: 'CARRÉ',      pos: { x: -0.006, y: 0.024, z: -0.018 } },
  { id: 'btn_triangle',   name: 'TRIANGLE',   pos: { x: -0.012, y: 0.024, z: -0.016 } },

  { id: 'btn_l1',         name: 'L1',         pos: { x:  0.040, y: 0.020, z: -0.008 } },
  { id: 'btn_r1',         name: 'R1',         pos: { x: -0.012, y: 0.018, z: -0.012 } },

  { id: 'btn_l2',         name: 'L2',         pos: { x:  0.040, y: 0.010, z: -0.012 } },
  { id: 'btn_r2',         name: 'R2',         pos: { x: -0.012, y: 0.010, z: -0.012 } },

  { id: 'btn_left_stick', name: 'JOYSTICK G', pos: { x:  0.028, y: 0.034, z: -0.030 } },
  { id: 'btn_right_stick',name: 'JOYSTICK D', pos: { x:  0.000, y: 0.034, z: -0.028 } },

  { id: 'btn_dpad',       name: 'DPAD',       pos: { x:  0.036, y: 0.026, z: -0.012 } },
  { id: 'btn_touchpad',   name: 'TOUCHPAD',   pos: { x:  0.012, y: 0.022, z: -0.010 } },
  { id: 'btn_ps',         name: 'PS',         pos: { x:  0.012, y: 0.022, z: -0.026 } }
];
const Gameplay = {
  currentSelectedBug: null,

  onBugClicked(element, data) {
    if (this.currentSelectedBug) {
      this.currentSelectedBug.setAttribute(
        'material',
        'color: #ff4f87; emissive: #ff4f87; emissiveIntensity: 0.8; opacity: 0.85'
      );
    }

    this.currentSelectedBug = element;

    element.setAttribute(
      'material',
      'color: #00ffaa; emissive: #00ffaa; emissiveIntensity: 1; opacity: 0.95'
    );

    console.log('Bouton sélectionné :', data.name);
  }
};

window.Gameplay = Gameplay;

/* Hotspots collés au modèle */
AFRAME.registerComponent('ps5-hotspots', {
  init: function () {
    const root = this.el;
    const model = root.querySelector('#controllerModel');

    model.addEventListener('model-loaded', () => {
      root.querySelectorAll('.hotspot').forEach(el => el.remove());

      BUGS_DATA.forEach((data) => {
        const spot = document.createElement('a-sphere');
        spot.setAttribute('id', data.id);
        spot.setAttribute('class', 'hotspot');
        spot.setAttribute('position', `${data.pos.x} ${data.pos.y} ${data.pos.z}`);
        spot.setAttribute('radius', '0.008');
        spot.setAttribute(
          'material',
          'color: #ff4f87; emissive: #ff4f87; emissiveIntensity: 0.8; opacity: 0.85'
        );
        spot.setAttribute(
          'animation',
          'property: scale; to: 1.15 1.15 1.15; dir: alternate; loop: true; dur: 700'
        );

        spot._bugData = data;
        root.appendChild(spot);
      });
    });
  }
});

/* Caméra orbitale */
AFRAME.registerComponent('orbit-controls-manager', {
  init: function () {
    this.scene = this.el;
    this.camera = document.querySelector('#mainCamera');
    this.root = document.querySelector('#controllerRoot');

    this.yaw = 0;
    this.pitch = 0;
    this.distance = 3;

    this.isDown = false;
    this.dragging = false;
    this.startX = 0;
    this.startY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.dragThreshold = 5;
    this.pendingHotspot = null;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.onLoaded = this.onLoaded.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onWheel = this.onWheel.bind(this);

    if (this.scene.hasLoaded) {
      this.onLoaded();
    } else {
      this.scene.addEventListener('loaded', this.onLoaded);
    }
  },

  onLoaded: function () {
    this.canvas = this.scene.canvas;

    this.canvas.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    this.updateCamera();
  },

  getHit: function (clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();

    this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    const cam = this.camera.getObject3D('camera');
    if (!cam) return null;

    this.raycaster.setFromCamera(this.mouse, cam);
    const hits = this.raycaster.intersectObject(this.root.object3D, true);
    return hits.length ? hits[0] : null;
  },

  findAFrameEl: function (threeObject) {
    let obj = threeObject;
    while (obj) {
      if (obj.el) return obj.el;
      obj = obj.parent;
    }
    return null;
  },

  updateCamera: function () {
    const x = this.distance * Math.sin(this.yaw) * Math.cos(this.pitch);
    const y = this.distance * Math.sin(this.pitch);
    const z = this.distance * Math.cos(this.yaw) * Math.cos(this.pitch);

    this.camera.setAttribute('position', `${x} ${y} ${z}`);
    this.camera.object3D.lookAt(new THREE.Vector3(0, 0, 0));
  },

  onMouseDown: function (e) {
    const hit = this.getHit(e.clientX, e.clientY);
    const hitEl = hit ? this.findAFrameEl(hit.object) : null;

    this.isDown = true;
    this.dragging = false;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;

    if (hitEl && hitEl.classList && hitEl.classList.contains('hotspot')) {
      this.pendingHotspot = hitEl;
    } else {
      this.pendingHotspot = null;
    }
  },

  onMouseMove: function (e) {
    if (!this.isDown) return;

    const dxTotal = e.clientX - this.startX;
    const dyTotal = e.clientY - this.startY;

    if (Math.hypot(dxTotal, dyTotal) > this.dragThreshold) {
      this.dragging = true;
    }

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;

    if (this.dragging) {
      this.yaw -= dx * 0.01;
      this.pitch -= dy * 0.01;

      const limit = Math.PI / 2.3;
      this.pitch = Math.max(-limit, Math.min(limit, this.pitch));

      this.updateCamera();
    }

    this.lastX = e.clientX;
    this.lastY = e.clientY;
  },

  onMouseUp: function () {
    if (!this.isDown) return;

    if (!this.dragging && this.pendingHotspot) {
      Gameplay.onBugClicked(this.pendingHotspot, this.pendingHotspot._bugData);
    }

    this.isDown = false;
    this.dragging = false;
    this.pendingHotspot = null;
  },

  onWheel: function (e) {
    e.preventDefault();
    this.distance += e.deltaY * 0.002;
    this.distance = Math.max(1.2, Math.min(6, this.distance));
    this.updateCamera();
  }
});