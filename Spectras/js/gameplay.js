console.log("PS5 VIEWER LOADED");

/* =========================
   ROTATION MANETTE (2 AXES FLUIDE)
========================= */
AFRAME.registerComponent('model-rotate', {
  init: function () {
    this.isDown = false;
    this.lastX = 0;
    this.lastY = 0;

    this.rotX = 0;
    this.rotY = 0;

    this.targetX = 0;
    this.targetY = 0;

    const scene = this.el.sceneEl;

    // souris down
    scene.addEventListener('mousedown', (e) => {
      this.isDown = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });

    // souris up
    scene.addEventListener('mouseup', () => {
      this.isDown = false;
    });

    // mouvement souris
    scene.addEventListener('mousemove', (e) => {
      if (!this.isDown) return;

      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;

      // horizontal
      this.targetY -= dx * 0.01;

      // vertical
      this.targetX -= dy * 0.01;

      // limite haut/bas
      const limit = Math.PI / 3;
      this.targetX = Math.max(-limit, Math.min(limit, this.targetX));

      this.lastX = e.clientX;
      this.lastY = e.clientY;
    });
  },

  tick: function () {
    // smoothing fluide
    this.rotY += (this.targetY - this.rotY) * 0.25;
    this.rotX += (this.targetX - this.rotX) * 0.25;

    this.el.object3D.rotation.y = this.rotY;
    this.el.object3D.rotation.x = this.rotX;
  }
});