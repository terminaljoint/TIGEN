window.addEventListener("DOMContentLoaded", () => {
  // Initialize TIGEN
  window.TIGEN = {};
  
  // Create main game scene
  TIGEN.scene = new TIGEN_Scene();
  
  // Create editor
  TIGEN.editor = new TIGEN_Editor();
  
  // Create main loop and link to editor
  TIGEN.loop = new TIGEN_Loop(TIGEN.scene);
  TIGEN.loop.render = () => TIGEN.editor.render();
  
  // Start the game loop
  TIGEN.loop.start();
  
  console.log("TIGEN AAA Game Engine v2 - Initialized");
  console.log("Press F12 to toggle debug display");
  console.log("Available systems: ECS, Physics, Rendering, Audio, Particles, Animation, Assets");
});

