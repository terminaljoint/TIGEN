# TIGEN - Quick Reference Card

## 🎮 Core Concepts

```javascript
// The main engine object
TIGEN.scene    // Game scene
TIGEN.editor   // Editor UI
TIGEN.loop     // Game loop
```

## ⚡ Quick Component Guide

### Add Component to Entity
```javascript
const mesh = entity.addComponent(Mesh);
const physics = entity.addComponent(Physics);
const light = entity.addComponent(Light);
const audio = entity.addComponent(AudioSource);
const animator = entity.addComponent(Animator);
const particles = entity.addComponent(ParticleSystem);
```

### Transform (Always Available)
```javascript
entity.transform.position     // THREE.Vector3
entity.transform.rotation     // THREE.Euler
entity.transform.scale        // THREE.Vector3

entity.transform.setPosition(x, y, z)
entity.transform.setRotation(x, y, z)
entity.transform.setScale(x, y, z)
entity.transform.translate(dx, dy, dz)
```

## 🎨 Rendering

### Mesh Setup
```javascript
mesh.setGeometry('box', { width: 2, height: 2, depth: 2 });
mesh.setMaterial('standard', { color: 0xff0000 });

// Geometry types
'box', 'sphere', 'cylinder', 'plane', 'torus', 'cone'

// Material types
'standard', 'physical', 'normal', 'Lambert', 'phong'
```

### Lighting
```javascript
light.setType('ambient');        // Uniform lighting
light.setType('directional');    // Sun-like light
light.setType('point');          // Omnidirectional
light.setType('spot');           // Spotlight

light.intensity = 1;
light.color = 0xffffff;
light.castShadow = true;
```

## 🏃 Physics

### Setup Physics
```javascript
physics.mass = 1;
physics.friction = 0.1;
physics.restitution = 0.8;
physics.useGravity = true;
physics.isKinematic = false;

physics.applyForce(vector);    // Constant acceleration
physics.applyImpulse(vector);  // Instant velocity change
```

### Collisions
```javascript
collider.type = 'box';         // box, sphere, capsule
collider.size.set(1, 1, 1);
collider.isTrigger = false;
```

## 🎬 Animation

### Create & Play
```javascript
const clip = new AnimationClip('name', duration);
clip.addTrack('position', keyframes);
animator.addClip(clip);
animator.play('name');
animator.stop();
```

### Keyframe Format
```javascript
[
  { time: 0, value: new THREE.Vector3(0, 0, 0) },
  { time: 1, value: new THREE.Vector3(5, 0, 0) }
]
```

## 🔊 Audio

```javascript
const audio = entity.addComponent(AudioSource);

await audio.loadAudio('path/to/file.wav');

audio.volume = 0.8;
audio.loop = false;
audio.spatialAudio = true;

audio.play();
audio.stop();
audio.pause();
audio.resume();
```

## ✨ Particles

```javascript
particles.maxParticles = 1000;
particles.emissionRate = 50;
particles.lifetime = 2;
particles.speed = new THREE.Vector3(0, 10, 0);
particles.speedVariance = new THREE.Vector3(5, 2, 5);
particles.size = 0.1;
particles.color = 0xffff00;

particles.play();
particles.stop();
particles.emit(count);
particles.clear();
```

## 📝 Scripts

### Create Custom Script
```javascript
class MyScript extends Script {
  onStart() {}
  onUpdate(dt) {}
  onFixedUpdate(fixedDt) {}
  onCollisionEnter(other) {}
  onDestroy() {}
}

entity.addComponent(MyScript);
```

### Built-in Scripts
```javascript
FreeCameraController   // WASD, Q/E movement
RotationAnimator       // Auto-rotating
BounceAnimator         // Bouncing motion
FollowTarget          // Follow an entity
```

## 🎯 Scene Management

```javascript
// Create entity
const entity = TIGEN.scene.createEntity("Name");

// Remove entity
TIGEN.scene.removeEntity(entity);

// Find entities
TIGEN.scene.findEntitiesByName("Name")
TIGEN.scene.findEntitiesByTag("tag")

// Clear all
TIGEN.scene.clear();
```

## 💾 Assets

```javascript
// Load resources
await TIGEN_AssetManager.loadTexture(url);
await TIGEN_AssetManager.loadModel(url);
await TIGEN_AssetManager.loadAudio(url);

// Get asset
TIGEN_AssetManager.getAsset(url);

// Unload
TIGEN_AssetManager.unloadAsset(url);
```

## 📊 Debug & Performance

```javascript
// Show FPS display
TIGEN_DebugRenderer.setShowDebug(true);

// Get metrics
const monitor = TIGEN_DebugRenderer.monitor;
monitor.getAverageFPS()
monitor.getFrameTime()
monitor.getStats()

// Keyboard shortcut: F12 toggles debug
```

## 🎮 Input

```javascript
TIGEN_Input.keys['KeyW']        // true if W pressed
TIGEN_Input.keys['ShiftLeft']   // true if Shift held
TIGEN_Input.keys['Space']       // true if Space pressed

// Common keys
'KeyA', 'KeyD', 'KeyQ', 'KeyE'
'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
'Enter', 'Escape', 'Tab', 'Delete'
```

## 🔧 Managers

```javascript
// Audio Manager
TIGEN_AudioManager.setMasterVolume(0.8)
TIGEN_AudioManager.stopAllAudio()

// Script Manager
TIGEN_ScriptManager.update(dt)
TIGEN_ScriptManager.broadcastMessage('methodName')

// Inspector
TIGEN_Inspector.select(entity)
TIGEN_Inspector.refresh()

// Outliner
TIGEN_Outliner.refresh()
```

## 📐 Math Helpers

```javascript
// Create vectors
new THREE.Vector3(x, y, z)
new THREE.Euler(x, y, z)       // Rotation
new THREE.Color(0xff0000)       // Colors

// Vector operations
vector.add(other)
vector.sub(other)
vector.multiply(scalar)
vector.normalize()
vector.length()
vector.clone()
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **W/A/S/D** | Move |
| **Q/E** | Up/Down |
| **Shift** | Sprint |
| **Click** | Select entity |
| **Delete** | Remove entity |
| **F12** | Toggle debug |

## 🔗 File Structure

```
index.html         ← Main page
main.js            ← Entry point
editor.js          ← UI logic
ecs.js             ← Entity System
physics.js         ← Physics Engine
rendering.js       ← Renderer
particles.js       ← Particles
animation.js       ← Animations
audio.js           ← Audio
scripting.js       ← Scripts
assets.js          ← Assets
debug.js           ← Debug tools
inspector-advanced.js  ← Inspector UI
```

## 📚 Documentation Files

- **README.md** - Full documentation & API
- **TUTORIAL.md** - Beginner guide
- **API_REFERENCE.md** - Complete API reference
- **EXAMPLES.md** - Code examples
- **QUICK_REFERENCE.md** - This file!

## 🚀 Common Tasks

### Create a Box
```javascript
const box = scene.createEntity("Box");
const mesh = box.addComponent(Mesh);
mesh.setGeometry('box', { width: 2, height: 2, depth: 2 });
mesh.setMaterial('standard', { color: 0xff0000 });
```

### Add Gravity
```javascript
const physics = entity.addComponent(Physics);
physics.useGravity = true;
physics.mass = 1;
```

### Make It Spin
```javascript
entity.addComponent(RotationAnimator);
// or
entity.transform.rotation.y += speed * dt;
```

### Play Sound
```javascript
const audio = entity.addComponent(AudioSource);
await audio.loadAudio('sound.wav');
audio.play();
```

### Follow Player
```javascript
const follower = entity.addComponent(FollowTarget);
follower.target = playerEntity;
```

---

**Save this page as a bookmark for quick reference!** 📌
