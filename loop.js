class TIGEN_Loop {
  constructor(scene) {
    this.scene = scene;
    this.clock = new THREE.Clock();
    this.physicsEngine = new PhysicsEngine();
    this.scriptManager = TIGEN_ScriptManager;
    this.frameCount = 0;
    this.fixedDeltaTime = 1 / 60; // 60Hz fixed timestep
    this.fixedTimeAccumulator = 0;
  }

  start() {
    const tick = () => {
      requestAnimationFrame(tick);
      const dt = this.clock.getDelta();
      
      // Cap framerate at 200 FPS for performance
      const cappedDt = Math.min(dt, 1 / 200);
      
      // Update performance monitor
      if (TIGEN_DebugRenderer) {
        TIGEN_DebugRenderer.monitor.update(cappedDt);
      }

      // Update scripts
      this.scriptManager.update(cappedDt);

      // Fixed timestep physics
      this.fixedTimeAccumulator += cappedDt;
      while (this.fixedTimeAccumulator >= this.fixedDeltaTime) {
        this.physicsEngine.update(this.fixedDeltaTime);
        this.scriptManager.fixedUpdate(this.fixedDeltaTime);
        this.fixedTimeAccumulator -= this.fixedDeltaTime;
      }

      // Update scene and entities
      this.scene.update(cappedDt);

      // Late updates
      this.scriptManager.lateUpdate(cappedDt);

      // Render
      this.render();

      this.frameCount++;
    };
    tick();
  }

  render() {
    // Override in main editor class
  }

  setScene(scene) {
    this.scene = scene;
  }
}
