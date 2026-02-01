# TIGEN Engine - Complete API Reference

## Core Objects

### TIGEN (Global Namespace)
```javascript
TIGEN.scene          // Main game scene (TIGEN_Scene)
TIGEN.editor         // Editor instance (TIGEN_Editor)
TIGEN.loop           // Game loop (TIGEN_Loop)
```

### Managers & Systems

#### Asset Manager
```javascript
TIGEN_AssetManager.loadTexture(url)           // Promise<THREE.Texture>
TIGEN_AssetManager.loadModel(url)             // Promise<GLTF>
TIGEN_AssetManager.loadAudio(url)             // Promise<ArrayBuffer>
TIGEN_AssetManager.getAsset(url)              // Asset
TIGEN_AssetManager.unloadAsset(url)           // void
TIGEN_AssetManager.unloadAll()                // void
TIGEN_AssetManager.getMemoryUsage()           // { assetCount, loadingCount }
```

#### Audio Manager
```javascript
TIGEN_AudioManager.setMasterVolume(value)     // void (0-1)
TIGEN_AudioManager.getMasterVolume()          // number
TIGEN_AudioManager.stopAllAudio()             // void
TIGEN_AudioManager.getContext()               // AudioContext
```

#### Debug Renderer
```javascript
TIGEN_DebugRenderer.monitor                   // PerformanceMonitor
TIGEN_DebugRenderer.setShowDebug(show)        // void
TIGEN_DebugRenderer.showStats                 // boolean
```

#### Script Manager
```javascript
TIGEN_ScriptManager.addScript(script)         // void
TIGEN_ScriptManager.removeScript(script)      // void
TIGEN_ScriptManager.update(dt)                // void
TIGEN_ScriptManager.lateUpdate(dt)            // void
TIGEN_ScriptManager.fixedUpdate(fixedDt)      // void
TIGEN_ScriptManager.broadcastMessage(name, param) // void
```

#### Inspector & Outliner
```javascript
TIGEN_Inspector.select(entity)                // void
TIGEN_Inspector.refresh()                     // void
TIGEN_Inspector.selected                      // Entity | null

TIGEN_Outliner.setScene(scene)                // void
TIGEN_Outliner.refresh()                      // void
```

#### Input
```javascript
TIGEN_Input.keys                              // { keyCode: boolean }
TIGEN_Input.init()                            // void

// Example
TIGEN_Input.keys['KeyW']  // true if W pressed
TIGEN_Input.keys['ShiftLeft']  // true if Shift held
```

---

## Entity Component System

### Entity Class

```javascript
// Creation
const entity = scene.createEntity(name)
const entity = new Entity(name)

// Properties
entity.id                 // string (unique)
entity.name               // string
entity.active             // boolean
entity.components         // Map<string, Component>
entity.children           // Entity[]
entity.parent             // Entity | null
entity.transform          // Transform (always present)

// Methods
entity.addComponent(ComponentClass)           // Component
entity.getComponent(ComponentClass)           // Component | undefined
entity.removeComponent(ComponentClass)        // void
entity.addChild(child)                        // void
entity.removeChild(child)                     // void
entity.update(dt)                             // void
entity.destroy()                              // void
entity.getWorldPosition()                     // THREE.Vector3
entity.toJSON()                               // object
```

### Component Base Class

```javascript
class Component {
  constructor(entity)
  entity                    // Entity
  enabled                   // boolean

  onEnable()               // Override
  onDisable()              // Override
  update(dt)               // Override
  onDestroy()              // Override
  toJSON()                 // Override (optional)
}
```

### Transform Component

```javascript
// Properties
transform.position        // THREE.Vector3
transform.rotation        // THREE.Euler
transform.scale           // THREE.Vector3

// Methods
transform.setPosition(x, y, z)               // void
transform.setRotation(x, y, z)               // void
transform.setScale(x, y, z)                  // void
transform.translate(x, y, z)                 // void
transform.getWorldPosition()                 // THREE.Vector3
transform.toJSON()                           // object
```

### Mesh Component

```javascript
// Properties
mesh.geometry             // THREE.BufferGeometry
mesh.material             // THREE.Material
mesh.mesh                 // THREE.Mesh
mesh.castShadow           // boolean
mesh.receiveShadow        // boolean

// Methods
mesh.setGeometry(type, params)               // void
// Types: 'box', 'sphere', 'cylinder', 'plane', 'torus', 'cone'

mesh.setMaterial(type, params)               // void
// Types: 'standard', 'physical', 'normal', 'Lambert', 'phong'

mesh.updateMesh()                            // void
mesh.toJSON()                                // object
```

### Physics Component

```javascript
// Properties
physics.velocity          // THREE.Vector3
physics.acceleration      // THREE.Vector3
physics.angularVelocity   // THREE.Vector3
physics.mass              // number
physics.friction          // number
physics.restitution       // number
physics.useGravity        // boolean
physics.isKinematic       // boolean

// Methods
physics.applyForce(force)                    // void
physics.applyImpulse(impulse)                // void
physics.update(dt)                           // void
physics.toJSON()                             // object
```

### Collider Component

```javascript
// Properties
collider.type             // 'box' | 'sphere' | 'capsule'
collider.size             // THREE.Vector3
collider.isTrigger        // boolean
collider.enabled          // boolean

// Methods
collider.getBounds()                         // { min, max }
collider.intersectsWith(other)               // boolean
collider.toJSON()                            // object
```

### Light Component

```javascript
// Properties
light.light               // THREE.Light
light.type                // 'ambient' | 'directional' | 'point' | 'spot'
light.intensity           // number
light.color               // number (hex)
light.range               // number
light.castShadow          // boolean

// Methods
light.createLight()                          // void
light.setType(type)                          // void
light.toJSON()                               // object
```

### Camera Component

```javascript
// Properties
camera.camera             // THREE.PerspectiveCamera
camera.fov                // number
camera.near               // number
camera.far                // number
camera.isActive           // boolean

// Methods
camera.updateProjection()                    // void
camera.toJSON()                              // object
```

### ParticleSystem Component

```javascript
// Properties
particles.maxParticles    // number
particles.emissionRate    // number
particles.lifetime        // number
particles.speed           // THREE.Vector3
particles.speedVariance   // THREE.Vector3
particles.gravity         // number
particles.size            // number
particles.sizeVariance    // number
particles.color           // number (hex)
particles.colorVariance   // number
particles.isPlaying       // boolean
particles.loop            // boolean

// Methods
particles.emit(count)                        // void
particles.play()                             // void
particles.stop()                             // void
particles.clear()                            // void
particles.update(dt)                         // void
particles.toJSON()                           // object
```

### Animator Component

```javascript
// Methods
animator.addClip(clip)                       // void
animator.getClip(name)                       // AnimationClip
animator.play(clipName, loop)                // void
animator.stop()                              // void
animator.update(dt)                          // void
animator.toJSON()                            // object
```

### AudioSource Component

```javascript
// Properties
audio.volume              // number
audio.pitch               // number
audio.loop                // boolean
audio.spatialAudio        // boolean
audio.maxDistance         // number
audio.refDistance         // number
audio.isPlaying           // boolean

// Methods
audio.loadAudio(url)                         // Promise<void>
audio.play()                                 // void
audio.stop()                                 // void
audio.pause()                                // void
audio.resume()                               // void
audio.setVolume(value)                       // void
audio.getFrequencyData()                     // Uint8Array | null
audio.update(dt)                             // void
audio.toJSON()                               // object
```

### Animation Classes

#### AnimationClip

```javascript
const clip = new AnimationClip(name, duration)

// Properties
clip.name                 // string
clip.duration             // number
clip.tracks               // array
clip.isPlaying            // boolean
clip.currentTime           // number
clip.loop                 // boolean
clip.speed                // number

// Methods
clip.addTrack(property, keyframes)           // void
clip.play()                                  // void
clip.stop()                                  // void
clip.pause()                                 // void
clip.resume()                                // void
clip.getValueAtTime(time)                    // object
clip.toJSON()                                // object
```

#### Keyframe Format

```javascript
{ time: 0, value: new THREE.Vector3(0, 0, 0) }
{ time: 1, value: new THREE.Vector3(5, 0, 0) }
```

---

## Physics Engine

### PhysicsEngine Class

```javascript
const engine = new PhysicsEngine()

// Properties
engine.bodies             // Physics[]
engine.colliders          // Collider[]
engine.gravity            // THREE.Vector3
engine.timeScale          // number

// Methods
engine.registerBody(physics)                 // void
engine.registerCollider(collider)            // void
engine.update(dt)                            // void
engine.resolveCollision(body1, body2)        // void
```

---

## Rendering System

### AdvancedRenderer Class

```javascript
const renderer = new AdvancedRenderer(scene, viewport)

// Properties
renderer.scene            // THREE.Scene
renderer.viewport         // HTMLElement
renderer.camera           // THREE.PerspectiveCamera
renderer.renderer         // THREE.WebGLRenderer
renderer.composer         // EffectComposer

// Methods
renderer.setupEffects()                      // void
renderer.onWindowResize()                    // void
renderer.draw()                              // void
```

---

## Scene Management

### TIGEN_Scene Class

```javascript
const scene = new TIGEN_Scene()

// Properties
scene.entities            // Entity[]
scene.ambientLight        // THREE.AmbientLight
scene.directionalLight    // THREE.DirectionalLight
scene.fog                 // THREE.Fog

// Methods
scene.createEntity(name)                     // Entity
scene.addEntity(entity)                      // void
scene.removeEntity(entity)                   // void
scene.getEntity(id)                          // Entity | undefined
scene.findEntitiesByName(name)               // Entity[]
scene.findEntitiesByTag(tag)                 // Entity[]
scene.update(dt)                             // void
scene.clear()                                // void
scene.toJSON()                               // object
```

---

## Scripting System

### Script Base Class

```javascript
class Script extends Component {
  onStart()                // Override
  onUpdate(dt)             // Override
  onLateUpdate(dt)         // Override
  onFixedUpdate(fixedDt)   // Override
  onCollisionEnter(other)  // Override
  onCollisionStay(other)   // Override
  onCollisionExit(other)   // Override
  onDestroy()              // Override
}
```

### Built-in Scripts

#### FreeCameraController
```javascript
controller.moveSpeed      // number (default: 20)
controller.rotationSpeed  // number (default: 2)
```

#### RotationAnimator
```javascript
rotator.rotationSpeed     // THREE.Vector3
```

#### BounceAnimator
```javascript
bouncer.bounceHeight      // number
bouncer.bounceSpeed       // number
bouncer.originalY         // number
```

#### FollowTarget
```javascript
follower.target           // Entity
follower.distance         // number
follower.smoothness       // number
follower.offset           // THREE.Vector3
```

---

## Game Loop

### TIGEN_Loop Class

```javascript
const loop = new TIGEN_Loop(scene)

// Properties
loop.scene                // TIGEN_Scene
loop.clock                // THREE.Clock
loop.physicsEngine        // PhysicsEngine
loop.scriptManager        // ScriptManager
loop.frameCount           // number
loop.fixedDeltaTime       // number (default: 1/60)

// Methods
loop.start()                                 // void
loop.render()                                // void
loop.setScene(scene)                         // void
```

---

## Utility Classes

### ComponentRegistry

```javascript
ComponentRegistry.register(name, ComponentClass)    // void
ComponentRegistry.get(name)                         // ComponentClass
ComponentRegistry.getAll()                          // [name, ComponentClass][]
```

### PerformanceMonitor

```javascript
const monitor = new PerformanceMonitor()

// Properties
monitor.fps               // number
monitor.frameTime         // number (ms)
monitor.stats             // object

// Methods
monitor.update(dt)                           // void
monitor.getStats()                           // object
monitor.getAverageFPS()                      // number
monitor.getFrameTime()                       // string
monitor.reset()                              // void
monitor.getReport()                          // object
```

---

## Input System

### TIGEN_Input

```javascript
TIGEN_Input.keys          // { keyCode: boolean }

// Keyboard codes
'KeyW', 'KeyA', 'KeyS', 'KeyD'
'KeyQ', 'KeyE'
'ShiftLeft', 'ShiftRight'
'ControlLeft', 'ControlRight'
'AltLeft', 'AltRight'
'Space', 'Enter'
'Escape'
// ... and all other standard key codes
```

---

## Common Patterns

### Create a Complete Entity

```javascript
const entity = scene.createEntity("CompleteEntity");

// Transform
entity.transform.setPosition(0, 1, 0);

// Mesh
const mesh = entity.addComponent(Mesh);
mesh.setGeometry('box', { width: 1, height: 1, depth: 1 });
mesh.setMaterial('standard', { color: 0xff0000 });

// Physics
const physics = entity.addComponent(Physics);
physics.mass = 1;
physics.useGravity = true;

// Collider
const collider = entity.addComponent(Collider);
collider.size.set(1, 1, 1);

// Script
const script = entity.addComponent(MyScript);
```

### Save and Load Scene

```javascript
// Save
const sceneData = TIGEN.scene.toJSON();
localStorage.setItem('savedScene', JSON.stringify(sceneData));

// Load (reconstruct manually)
const data = JSON.parse(localStorage.getItem('savedScene'));
```

### Access All Entities

```javascript
const allEntities = TIGEN.scene.entities;
allEntities.forEach(entity => {
  console.log(entity.name, entity.transform.position);
});
```

---

## Events & Callbacks

### Entity Selection Event

```javascript
document.addEventListener('entitySelected', (e) => {
  console.log('Selected:', e.detail.entity);
});
```

### Custom Entity Serialization

```javascript
entity.toJSON(); // Returns serializable object
```

---

This complete API reference covers all accessible features of the TIGEN engine!
