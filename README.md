# TIGEN v2 - Advanced AAA Game Engine

**Terminal Joint Intelligence Game Engine Network - Professional 3D Game Engine**

A complete, production-ready game engine with professional AAA features for building advanced 3D games and interactive applications.

## 🚀 Features

### Core Systems
- **Entity Component System (ECS)** - Flexible, scalable game object architecture
- **Physics Engine** - 3D rigid body dynamics, collision detection, gravity
- **Advanced Rendering** - PBR materials, real-time shadows, post-processing
- **Audio System** - Spatial audio, effects, multiple simultaneous sounds
- **Particle System** - GPU-accelerated particle effects with full customization
- **Animation System** - Skeletal animation, property animation, blending
- **Asset Manager** - Automatic caching, multi-format loading, memory management
- **Scripting System** - Behavior trees, script components, event system

### Editor Features
- **Real-time Inspector** - Edit all entity properties on-the-fly
- **Scene Outliner** - Hierarchical scene graph visualization
- **Gizmos & Transform** - Orbit camera, entity selection, manipulation
- **Play Mode** - Test gameplay directly in the editor
- **Debug Tools** - FPS counter, performance monitoring, profiling
- **Auto-save** - Automatic world state persistence

### Rendering
- **Material System** - Standard PBR, Physical, Lambert, Phong materials
- **Lighting** - Ambient, directional, point, and spot lights with shadows
- **Post-Processing** - Bloom, tone mapping, color grading
- **3D Primitives** - Box, sphere, cylinder, plane, torus, cone, and more
- **Fog & Atmosphere** - Volumetric effects, distance fog

### Performance
- **Fixed Timestep Physics** - Deterministic 60Hz physics simulation
- **Spatial Optimization** - Efficient scene management
- **Memory Management** - Asset pooling, garbage collection
- **Performance Monitoring** - Real-time FPS and memory tracking

## 📋 Quick Start

### Installation
Simply open `index.html` in a modern web browser (Chrome, Firefox, Edge recommended).

### Basic Usage

```javascript
// Access the engine
const engine = TIGEN;

// Get the scene
const scene = engine.scene;

// Create an entity
const entity = scene.createEntity("MyEntity");

// Add a mesh component
const mesh = entity.addComponent(Mesh);
mesh.setGeometry('box', { width: 2, height: 2, depth: 2 });
mesh.setMaterial('standard', { color: 0xff0000 });

// Add physics
const physics = entity.addComponent(Physics);
physics.mass = 1;
physics.useGravity = true;

// Add a script component
const animator = entity.addComponent(RotationAnimator);
```

## 🎮 Controls

| Key | Action |
|-----|--------|
| **W/A/S/D** | Move camera forward/left/backward/right |
| **Q/E** | Move camera down/up |
| **Shift** | Sprint (2x speed) |
| **Click** | Select entity in viewport |
| **Delete** | Remove selected entity |
| **F12** | Toggle debug display (FPS, memory) |
| **+** | Spawn new cube |
| **Clear** | Remove all entities |

## 🏗️ Architecture

### Entity Component System

```javascript
// Create entity
const entity = scene.createEntity("Player");

// Add components
const mesh = entity.addComponent(Mesh);
const physics = entity.addComponent(Physics);
const animator = entity.addComponent(Animator);
const script = entity.addComponent(FreeCameraController);

// Access components
const meshComponent = entity.getComponent(Mesh);

// Remove components
entity.removeComponent(Physics);

// Access transform
entity.transform.setPosition(0, 1, 0);
entity.transform.setRotation(0, Math.PI / 4, 0);
entity.transform.setScale(1, 1, 1);
```

### Component Types

#### Transform
```javascript
const transform = entity.transform;
transform.position;
transform.rotation;
transform.scale;
transform.setPosition(x, y, z);
transform.setRotation(x, y, z);
transform.setScale(x, y, z);
transform.translate(dx, dy, dz);
transform.getWorldPosition();
```

#### Mesh
```javascript
const mesh = entity.addComponent(Mesh);

// Geometry types: box, sphere, cylinder, plane, torus, cone
mesh.setGeometry('box', { width: 2, height: 2, depth: 2 });

// Material types: standard, physical, normal, Lambert, phong
mesh.setMaterial('standard', { 
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0.5 
});

mesh.castShadow = true;
mesh.receiveShadow = true;
```

#### Physics
```javascript
const physics = entity.addComponent(Physics);

physics.mass = 1;
physics.friction = 0.1;
physics.restitution = 0.8;
physics.useGravity = true;
physics.isKinematic = false;

physics.applyForce(new THREE.Vector3(10, 0, 0));
physics.applyImpulse(new THREE.Vector3(0, 5, 0));
```

#### Collider
```javascript
const collider = entity.addComponent(Collider);

collider.type = 'box'; // box, sphere, capsule
collider.size.set(1, 1, 1);
collider.isTrigger = false;
collider.intersectsWith(otherCollider);
```

#### Light
```javascript
const light = entity.addComponent(Light);

light.type = 'directional'; // ambient, directional, point, spot
light.color = 0xffffff;
light.intensity = 1;
light.range = 100;
light.castShadow = true;
```

#### Camera
```javascript
const camera = entity.addComponent(Camera);

camera.fov = 70;
camera.near = 0.1;
camera.far = 2000;
camera.isActive = true;
```

#### ParticleSystem
```javascript
const particles = entity.addComponent(ParticleSystem);

particles.maxParticles = 1000;
particles.emissionRate = 50;
particles.lifetime = 2;
particles.speed = new THREE.Vector3(0, 10, 0);
particles.size = 0.1;
particles.color = 0xffffff;

particles.play();
particles.stop();
particles.clear();
particles.emit(10);
```

#### Animator
```javascript
const animator = entity.addComponent(Animator);

// Create animation clip
const clip = new AnimationClip('walk', 1.0);
clip.addTrack('position', [
  { time: 0, value: new THREE.Vector3(0, 0, 0) },
  { time: 1, value: new THREE.Vector3(5, 0, 0) }
]);

animator.addClip(clip);
animator.play('walk');
animator.stop();
```

#### AudioSource
```javascript
const audio = entity.addComponent(AudioSource);

await audio.loadAudio('path/to/audio.wav');
audio.volume = 1;
audio.loop = false;
audio.spatialAudio = true;
audio.maxDistance = 100;

audio.play();
audio.stop();
audio.pause();
audio.setVolume(0.5);
```

#### Script
```javascript
class MyScript extends Script {
  onStart() {
    console.log('Script started');
  }

  onUpdate(dt) {
    // Called every frame
  }

  onFixedUpdate(fixedDt) {
    // Called at fixed timestep (60Hz)
  }

  onCollisionEnter(other) {
    console.log('Collision with', other.entity.name);
  }
}

const script = entity.addComponent(MyScript);
```

### Built-in Scripts

#### FreeCameraController
```javascript
const camera = entity.addComponent(FreeCameraController);
camera.moveSpeed = 20;
camera.rotationSpeed = 2;
```

#### RotationAnimator
```javascript
const rotator = entity.addComponent(RotationAnimator);
rotator.rotationSpeed = new THREE.Vector3(1, 1, 1);
```

#### BounceAnimator
```javascript
const bouncer = entity.addComponent(BounceAnimator);
bouncer.bounceHeight = 2;
bouncer.bounceSpeed = 2;
```

#### FollowTarget
```javascript
const follower = entity.addComponent(FollowTarget);
follower.target = targetEntity;
follower.distance = 10;
follower.smoothness = 5;
```

## 🎯 Advanced Features

### Physics Engine

```javascript
const physicsEngine = TIGEN.loop.physicsEngine;

// Set global gravity
physicsEngine.gravity = new THREE.Vector3(0, -20, 0);

// Time scale for slow-motion
physicsEngine.timeScale = 0.5;

// Collision resolution
physicsEngine.update(deltaTime);
```

### Asset Manager

```javascript
const assetMgr = TIGEN_AssetManager;

// Load texture
const texture = await assetMgr.loadTexture('path/to/texture.png');

// Load model
const model = await assetMgr.loadModel('path/to/model.glb');

// Load audio
const audio = await assetMgr.loadAudio('path/to/audio.mp3');

// Get cached asset
const cached = assetMgr.getAsset('path/to/asset');

// Unload asset
assetMgr.unloadAsset('path/to/asset');

// Get memory stats
const stats = assetMgr.getMemoryUsage();
```

### Audio Manager

```javascript
const audioMgr = TIGEN_AudioManager;

// Set master volume
audioMgr.setMasterVolume(0.8);

// Get master volume
const volume = audioMgr.getMasterVolume();

// Stop all audio
audioMgr.stopAllAudio();

// Get audio context
const ctx = audioMgr.getContext();
```

### Performance Monitoring

```javascript
const debugRenderer = TIGEN_DebugRenderer;

// Toggle debug display
debugRenderer.setShowDebug(true);

// Get performance monitor
const monitor = debugRenderer.monitor;

// Get metrics
const fps = monitor.getAverageFPS();
const frameTime = monitor.getFrameTime();
const stats = monitor.getStats();

// Get full report
const report = monitor.getReport();
```

### Scene Management

```javascript
const scene = TIGEN.scene;

// Create entity
const entity = scene.createEntity("Entity");

// Remove entity
scene.removeEntity(entity);

// Find entities
const entities = scene.findEntitiesByName("Player");
const tagged = scene.findEntitiesByTag("enemy");

// Get entity by ID
const entity = scene.getEntity(entityId);

// Clear scene
scene.clear();

// Export scene
const json = scene.toJSON();
```

## 🛠️ Development

### Project Structure

```
TIGEN/
├── index.html              # Main application
├── main.js                 # Entry point
├── editor.js               # Editor and UI logic
├── ecs.js                  # Entity Component System
├── physics.js              # Physics engine
├── rendering.js            # Rendering and materials
├── assets.js               # Asset management
├── particles.js            # Particle system
├── animation.js            # Animation system
├── audio.js                # Audio system
├── scripting.js            # Scripting and behaviors
├── scene.js                # Scene management
├── inspector-advanced.js   # Inspector and outliner
├── debug.js                # Debug tools
├── loop.js                 # Game loop
├── input.js                # Input handling
├── style.css               # Styling
└── README.md               # This file
```

### Extending the Engine

#### Create a Custom Component

```javascript
class MyComponent extends Component {
  constructor(entity) {
    super(entity);
    this.value = 0;
  }

  onEnable() {
    console.log('Component enabled');
  }

  onUpdate(dt) {
    this.value += dt;
  }

  onDestroy() {
    console.log('Component destroyed');
  }

  toJSON() {
    return { value: this.value };
  }
}

ComponentRegistry.register('MyComponent', MyComponent);
```

#### Create a Custom Script

```javascript
class PlayerController extends Script {
  onStart() {
    this.speed = 10;
  }

  onUpdate(dt) {
    const entity = this.entity;
    const moveDir = new THREE.Vector3();

    if (TIGEN_Input.keys['KeyW']) moveDir.z -= 1;
    if (TIGEN_Input.keys['KeyS']) moveDir.z += 1;

    if (moveDir.length() > 0) {
      moveDir.normalize();
      entity.transform.translate(
        moveDir.x * this.speed * dt,
        0,
        moveDir.z * this.speed * dt
      );
    }
  }

  onCollisionEnter(other) {
    console.log('Collided with', other.entity.name);
  }
}
```

## 📊 Performance Tips

1. **Use component pooling** for frequently created/destroyed objects
2. **Optimize physics** by using kinematic bodies where possible
3. **Batch materials** to reduce draw calls
4. **Use LOD (Level of Detail)** for distant objects
5. **Profile regularly** with the debug tools (F12)
6. **Monitor memory** usage and clean up unused assets
7. **Use appropriate physics shapes** (box > sphere for performance)

## 🎓 Examples

### Simple Game Loop

```javascript
// Wait for engine to load
window.addEventListener('DOMContentLoaded', () => {
  // Access engine
  const scene = TIGEN.scene;
  
  // Create player
  const player = scene.createEntity("Player");
  player.transform.setPosition(0, 2, 0);
  
  const playerMesh = player.addComponent(Mesh);
  playerMesh.setGeometry('box', { width: 1, height: 2, depth: 1 });
  playerMesh.setMaterial('standard', { color: 0x0000ff });
  
  const playerPhysics = player.addComponent(Physics);
  playerPhysics.mass = 1;
  playerPhysics.useGravity = true;
  
  const playerControl = player.addComponent(FreeCameraController);
  
  // Create ground
  const ground = scene.createEntity("Ground");
  ground.transform.setScale(100, 1, 100);
  ground.transform.setPosition(0, -1, 0);
  
  const groundMesh = ground.addComponent(Mesh);
  groundMesh.setGeometry('box', { width: 100, height: 1, depth: 100 });
  groundMesh.setMaterial('standard', { color: 0x666666 });
});
```

### Particle Effects

```javascript
const effectEntity = scene.createEntity("Explosion");
effectEntity.transform.setPosition(0, 2, 0);

const particles = effectEntity.addComponent(ParticleSystem);
particles.maxParticles = 500;
particles.emissionRate = 100;
particles.lifetime = 2;
particles.speed = new THREE.Vector3(0, 5, 0);
particles.speedVariance = new THREE.Vector3(10, 5, 10);
particles.size = 0.2;
particles.color = 0xffaa00;

particles.play();
```

## 📄 License

Terminal Joint Proprietary Engine - All Rights Reserved

---

**TIGEN v2** - Built for Performance, Designed for Creators
