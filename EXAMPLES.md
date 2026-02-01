# TIGEN Engine - Feature Showcase & Examples

## 🎯 Complete Feature Demonstrations

### Example 1: Interactive Physics Playground

```javascript
// Create a dynamic physics playground
function createPhysicsPlayground() {
  const scene = TIGEN.scene;
  
  // Create ground
  const ground = scene.createEntity("Ground");
  ground.transform.setScale(50, 1, 50);
  ground.transform.setPosition(0, -2, 0);
  
  const groundMesh = ground.addComponent(Mesh);
  groundMesh.setGeometry('box', { width: 50, height: 1, depth: 50 });
  groundMesh.setMaterial('standard', { color: 0x444444, roughness: 0.8 });
  
  const groundPhysics = ground.addComponent(Physics);
  groundPhysics.isKinematic = true;
  
  // Create falling objects
  for (let i = 0; i < 10; i++) {
    const obj = scene.createEntity(`FallingBox_${i}`);
    obj.transform.setPosition(
      (Math.random() - 0.5) * 20,
      10 + Math.random() * 10,
      (Math.random() - 0.5) * 20
    );
    
    const mesh = obj.addComponent(Mesh);
    mesh.setGeometry('box', { width: 1, height: 1, depth: 1 });
    mesh.setMaterial('standard', { 
      color: Math.random() * 0xffffff,
      metalness: Math.random() * 0.8,
      roughness: Math.random() * 0.5
    });
    
    const physics = obj.addComponent(Physics);
    physics.mass = 0.5 + Math.random() * 1;
    physics.useGravity = true;
    physics.friction = 0.3;
    
    const collider = obj.addComponent(Collider);
    collider.size.set(1, 1, 1);
  }
  
  // Add lighting
  const sun = scene.createEntity("Sun");
  sun.transform.setPosition(20, 30, 20);
  const sunLight = sun.addComponent(Light);
  sunLight.setType('directional');
  sunLight.intensity = 0.8;
  
  // Add ambient light
  const ambientEntity = scene.createEntity("Ambient");
  const ambient = ambientEntity.addComponent(Light);
  ambient.setType('ambient');
  ambient.intensity = 0.4;
}

// Run it
createPhysicsPlayground();
```

---

### Example 2: Animated Scene with Particles

```javascript
// Create an animated scene with particle effects
function createAnimatedScene() {
  const scene = TIGEN.scene;
  
  // Create rotating cubes
  for (let i = 0; i < 5; i++) {
    const cube = scene.createEntity(`RotatingCube_${i}`);
    cube.transform.setPosition(i * 5 - 10, 5, 0);
    
    const mesh = cube.addComponent(Mesh);
    mesh.setGeometry('box', { width: 2, height: 2, depth: 2 });
    mesh.setMaterial('standard', { 
      color: 0x00ff88,
      metalness: 0.5,
      roughness: 0.3
    });
    
    const rotator = cube.addComponent(RotationAnimator);
    rotator.rotationSpeed = new THREE.Vector3(
      Math.random(),
      Math.random() + 1,
      Math.random()
    );
  }
  
  // Create particle effects at center
  const particles = scene.createEntity("ParticleEffect");
  particles.transform.setPosition(0, 5, 0);
  
  const particleSystem = particles.addComponent(ParticleSystem);
  particleSystem.emissionRate = 50;
  particleSystem.lifetime = 2;
  particleSystem.maxParticles = 500;
  particleSystem.speed = new THREE.Vector3(0, 5, 0);
  particleSystem.speedVariance = new THREE.Vector3(10, 2, 10);
  particleSystem.size = 0.15;
  particleSystem.color = 0xffff00;
  particleSystem.play();
}

createAnimatedScene();
```

---

### Example 3: Interactive Game Elements

```javascript
// Create interactive player and enemies
function createGameScene() {
  const scene = TIGEN.scene;
  
  // Player
  const player = scene.createEntity("Player");
  player.transform.setPosition(0, 2, -5);
  
  const playerMesh = player.addComponent(Mesh);
  playerMesh.setGeometry('box', { width: 1, height: 2, depth: 1 });
  playerMesh.setMaterial('standard', { color: 0x0088ff });
  
  const playerPhysics = player.addComponent(Physics);
  playerPhysics.mass = 1;
  playerPhysics.useGravity = true;
  
  const playerCollider = player.addComponent(Collider);
  playerCollider.size.set(1, 2, 1);
  
  // Add camera follow
  const playerScript = player.addComponent(FreeCameraController);
  playerScript.moveSpeed = 15;
  
  // Enemies
  for (let i = 0; i < 5; i++) {
    const enemy = scene.createEntity(`Enemy_${i}`);
    enemy.transform.setPosition(
      (Math.random() - 0.5) * 20,
      1,
      5 + i * 5
    );
    
    const enemyMesh = enemy.addComponent(Mesh);
    enemyMesh.setGeometry('sphere', { radius: 1 });
    enemyMesh.setMaterial('standard', { color: 0xff0000 });
    
    const enemyPhysics = enemy.addComponent(Physics);
    enemyPhysics.mass = 1.5;
    enemyPhysics.useGravity = true;
    
    const enemyCollider = enemy.addComponent(Collider);
    enemyCollider.size.set(1, 1, 1);
    
    const follower = enemy.addComponent(FollowTarget);
    follower.target = player;
    follower.smoothness = 3;
  }
  
  // Create platform
  const platform = scene.createEntity("Platform");
  platform.transform.setPosition(0, 0, 0);
  platform.transform.setScale(50, 0.5, 50);
  
  const platformMesh = platform.addComponent(Mesh);
  platformMesh.setGeometry('box', { width: 50, height: 0.5, depth: 50 });
  platformMesh.setMaterial('standard', { 
    color: 0x666666,
    metalness: 0.2,
    roughness: 0.8
  });
  
  const platformPhysics = platform.addComponent(Physics);
  platformPhysics.isKinematic = true;
}

createGameScene();
```

---

### Example 4: Audio & Visual Effects

```javascript
// Create scene with audio and visual effects
async function createAudioVisualScene() {
  const scene = TIGEN.scene;
  
  // Create sound source
  const soundEntity = scene.createEntity("SoundSource");
  soundEntity.transform.setPosition(0, 5, 0);
  
  const audioSource = soundEntity.addComponent(AudioSource);
  // Note: Replace with actual audio file
  // await audioSource.loadAudio('path/to/your/audio.wav');
  
  audioSource.volume = 0.5;
  audioSource.loop = true;
  audioSource.spatialAudio = true;
  // audioSource.play();
  
  // Create visualizer objects (react to sound)
  for (let i = 0; i < 8; i++) {
    const bar = scene.createEntity(`AudioBar_${i}`);
    const angle = (i / 8) * Math.PI * 2;
    const radius = 5;
    
    bar.transform.setPosition(
      Math.cos(angle) * radius,
      2,
      Math.sin(angle) * radius
    );
    bar.transform.setScale(0.8, 1, 0.8);
    
    const mesh = bar.addComponent(Mesh);
    mesh.setGeometry('box', { width: 1, height: 1, depth: 1 });
    mesh.setMaterial('standard', { 
      color: new THREE.Color().setHSL(i / 8, 1, 0.5),
      metalness: 0.8,
      roughness: 0.2
    });
  }
  
  // Create central light
  const light = scene.createEntity("CentralLight");
  light.transform.setPosition(0, 10, 0);
  
  const lightComponent = light.addComponent(Light);
  lightComponent.setType('point');
  lightComponent.intensity = 1;
  lightComponent.range = 30;
  lightComponent.color = 0x00ff88;
}

// Run with async/await
createAudioVisualScene();
```

---

### Example 5: Custom Animation

```javascript
// Create custom animation
function createAnimatedCharacter() {
  const scene = TIGEN.scene;
  
  const character = scene.createEntity("Character");
  character.transform.setPosition(0, 1, 0);
  
  // Mesh
  const mesh = character.addComponent(Mesh);
  mesh.setGeometry('box', { width: 1, height: 2, depth: 1 });
  mesh.setMaterial('standard', { color: 0x00ff00 });
  
  // Animator
  const animator = character.addComponent(Animator);
  
  // Create walk animation
  const walkClip = new AnimationClip('walk', 2);
  walkClip.addTrack('position', [
    { time: 0, value: new THREE.Vector3(0, 1, 0) },
    { time: 1, value: new THREE.Vector3(5, 1, 0) },
    { time: 2, value: new THREE.Vector3(0, 1, 0) }
  ]);
  
  animator.addClip(walkClip);
  
  // Create jump animation
  const jumpClip = new AnimationClip('jump', 1);
  jumpClip.addTrack('position', [
    { time: 0, value: new THREE.Vector3(0, 1, 0) },
    { time: 0.5, value: new THREE.Vector3(0, 4, 0) },
    { time: 1, value: new THREE.Vector3(0, 1, 0) }
  ]);
  
  animator.addClip(jumpClip);
  
  // Start walking
  animator.play('walk', true);
  
  // Switch to jump after 5 seconds
  setTimeout(() => {
    animator.play('jump', false);
  }, 5000);
}

createAnimatedCharacter();
```

---

### Example 6: Advanced Physics Constraints

```javascript
// Create physics constraints and complex interactions
function createAdvancedPhysicsScene() {
  const scene = TIGEN.scene;
  const physicsEngine = TIGEN.loop.physicsEngine;
  
  // Create a chain of objects
  const chainLength = 5;
  const chainObjects = [];
  
  for (let i = 0; i < chainLength; i++) {
    const link = scene.createEntity(`ChainLink_${i}`);
    link.transform.setPosition(0, 10 - i * 2, 0);
    
    const mesh = link.addComponent(Mesh);
    mesh.setGeometry('box', { width: 1, height: 1, depth: 1 });
    mesh.setMaterial('standard', { color: 0xffaa00 });
    
    const physics = link.addComponent(Physics);
    physics.mass = 1;
    physics.useGravity = true;
    physics.friction = 0.5;
    physics.restitution = 0.3;
    
    const collider = link.addComponent(Collider);
    collider.size.set(1, 1, 1);
    
    physicsEngine.registerBody(physics);
    physicsEngine.registerCollider(collider);
    
    chainObjects.push(link);
  }
  
  // Create a launcher
  const launcher = scene.createEntity("Launcher");
  launcher.transform.setPosition(-10, 2, 0);
  
  const launcherMesh = launcher.addComponent(Mesh);
  launcherMesh.setGeometry('box', { width: 2, height: 1, depth: 1 });
  launcherMesh.setMaterial('standard', { color: 0x0088ff });
  
  const launcherPhysics = launcher.addComponent(Physics);
  launcherPhysics.mass = 10;
  launcherPhysics.useGravity = true;
  launcherPhysics.isKinematic = false;
  
  // Give it a big push
  launcherPhysics.velocity.set(50, 0, 0);
  
  // Ground
  const ground = scene.createEntity("Ground");
  ground.transform.setScale(100, 1, 100);
  ground.transform.setPosition(0, -10, 0);
  
  const groundMesh = ground.addComponent(Mesh);
  groundMesh.setGeometry('box', { width: 100, height: 1, depth: 100 });
  groundMesh.setMaterial('standard', { color: 0x666666 });
  
  const groundPhysics = ground.addComponent(Physics);
  groundPhysics.isKinematic = true;
}

createAdvancedPhysicsScene();
```

---

### Example 7: Custom Script Behavior

```javascript
// Create custom interactive script
class InteractiveBall extends Script {
  onStart() {
    this.clickCount = 0;
    this.color = new THREE.Color(0x00ff00);
  }

  onUpdate(dt) {
    // Rotate ball
    this.entity.transform.rotation.x += dt * 2;
    this.entity.transform.rotation.y += dt * 3;
  }

  onCollisionEnter(other) {
    // Change color on collision
    this.clickCount++;
    this.entity.transform.scale.multiplyScalar(0.9);
    console.log(`Collision ${this.clickCount}`);
  }
}

// Create interactive ball
function createInteractiveBall() {
  const scene = TIGEN.scene;
  
  const ball = scene.createEntity("InteractiveBall");
  ball.transform.setPosition(0, 5, 0);
  
  const mesh = ball.addComponent(Mesh);
  mesh.setGeometry('sphere', { radius: 1 });
  mesh.setMaterial('standard', { color: 0x00ff00, metalness: 0.8 });
  
  const physics = ball.addComponent(Physics);
  physics.mass = 2;
  physics.useGravity = true;
  physics.restitution = 0.9;
  
  const collider = ball.addComponent(Collider);
  collider.size.set(1, 1, 1);
  
  const script = ball.addComponent(InteractiveBall);
}

createInteractiveBall();
```

---

### Example 8: Performance Test Scene

```javascript
// Create a performance test with many objects
function createStressTest() {
  const scene = TIGEN.scene;
  const count = 100;
  
  console.log(`Creating ${count} objects for stress test...`);
  const startTime = performance.now();
  
  for (let i = 0; i < count; i++) {
    const obj = scene.createEntity(`StressTest_${i}`);
    obj.transform.setPosition(
      (Math.random() - 0.5) * 100,
      Math.random() * 50,
      (Math.random() - 0.5) * 100
    );
    
    const mesh = obj.addComponent(Mesh);
    mesh.setGeometry('box', { 
      width: Math.random() * 2 + 0.5,
      height: Math.random() * 2 + 0.5,
      depth: Math.random() * 2 + 0.5
    });
    mesh.setMaterial('standard', { 
      color: Math.random() * 0xffffff,
      metalness: Math.random(),
      roughness: Math.random()
    });
    
    const physics = obj.addComponent(Physics);
    physics.mass = Math.random() * 5;
    physics.useGravity = true;
    
    if (i % 3 === 0) {
      const rotator = obj.addComponent(RotationAnimator);
      rotator.rotationSpeed = new THREE.Vector3(
        Math.random(),
        Math.random(),
        Math.random()
      );
    }
  }
  
  const endTime = performance.now();
  console.log(`Created ${count} objects in ${(endTime - startTime).toFixed(2)}ms`);
  console.log(`Press F12 to see FPS and memory usage`);
}

createStressTest();
```

---

## 🚀 How to Use These Examples

1. **Open the browser console** (F12)
2. **Paste any example code** into the console
3. **Press Enter** to execute
4. **Watch the scene update** in real-time
5. **Use F12** to toggle the performance monitor

## 💡 Combining Examples

You can mix and match these examples to create complex scenes:

```javascript
// Clear scene
TIGEN.scene.clear();

// Create physics playground
createPhysicsPlayground();

// Add animated scene
setTimeout(() => {
  createAnimatedScene();
}, 1000);

// Monitor performance
console.log(TIGEN_DebugRenderer.monitor.getReport());
```

---

These examples showcase the full power and flexibility of the TIGEN engine! 🎮
