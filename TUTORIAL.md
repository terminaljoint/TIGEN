# TIGEN - Quick Tutorial Guide

## Getting Started

### 1. Launch the Engine
Open `index.html` in your web browser. You should see the TIGEN editor with:
- Left panel: Scene Outliner (entity hierarchy)
- Center: 3D Viewport
- Right panel: Entity Inspector
- Top bar: Controls and buttons

### 2. Create Your First Scene

#### Spawn Objects
- Click the **+** button in the Outliner to spawn a cube
- Spawn multiple cubes to fill your scene

#### Select Objects
- Click on an object in the viewport to select it
- The object will highlight and its properties appear in the Inspector

#### Modify Properties
- Use the Inspector to change:
  - **Position**: X, Y, Z coordinates
  - **Rotation**: X, Y, Z rotation angles (in radians)
  - **Scale**: X, Y, Z scale factors
  - **Component properties**: Adjust individual component settings

### 3. Working with Components

#### Add a Component
1. Select an entity
2. Scroll to the bottom of the Inspector
3. Click **+ Add Component**
4. Choose a component type:
   - **Mesh**: Visual representation
   - **Physics**: Physics simulation
   - **Light**: Illumination
   - **ParticleSystem**: Effects
   - **Animator**: Animations
   - **AudioSource**: Sound
   - **Camera**: Viewing device

#### Example: Add Physics to an Object

```javascript
// Script version (in console):
const entity = TIGEN.scene.entities[0];
const physics = entity.addComponent(Physics);
physics.mass = 2;
physics.useGravity = true;
physics.friction = 0.2;
```

### 4. Using Scripts

#### Apply a Built-in Script

1. Select entity → + Add Component → Look for **FreeCameraController**
2. This makes the entity controllable with WASD + Q/E keys

**Available Built-in Scripts:**
- `FreeCameraController` - Camera movement (WASD, Q/E, Shift)
- `RotationAnimator` - Automatic rotation
- `BounceAnimator` - Bouncing up/down animation
- `FollowTarget` - Follow another entity

#### Create a Custom Script

```javascript
class MyCustomScript extends Script {
  onStart() {
    console.log("Script started!");
    this.color = 0xff0000;
  }

  onUpdate(dt) {
    // Called every frame
    this.entity.transform.rotation.y += dt;
  }

  onCollisionEnter(other) {
    console.log("Hit:", other.entity.name);
  }
}

// Add to an entity
const entity = TIGEN.scene.entities[0];
const script = entity.addComponent(MyCustomScript);
```

### 5. Camera Controls

| Key | Action |
|-----|--------|
| **W** | Move forward |
| **A** | Move left |
| **S** | Move backward |
| **D** | Move right |
| **Q** | Move down |
| **E** | Move up |
| **Shift** | Sprint (2x speed) |
| **Mouse (drag right panel)** | Rotate view |

### 6. Testing Your Scene

#### Play Mode
1. Click **ENTER GAMEWORLD** button
2. Your scene will run with physics simulation
3. Click **STOP** to return to editor

#### Debug Display
- Press **F12** to see:
  - FPS (Frames Per Second)
  - Frame time in milliseconds
  - Memory usage
- Press **F12** again to hide

### 7. Common Tasks

#### Create a Dynamic Scene

```javascript
// In browser console
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

player.addComponent(FreeCameraController);
```

#### Create Particle Effects

```javascript
const scene = TIGEN.scene;
const fx = scene.createEntity("Particles");

const particles = fx.addComponent(ParticleSystem);
particles.emissionRate = 100;
particles.lifetime = 1;
particles.speed = new THREE.Vector3(0, 10, 0);
particles.color = 0xffff00;

particles.play();
```

#### Add Sound

```javascript
const audioEntity = scene.createEntity("Sound");
const audio = audioEntity.addComponent(AudioSource);

// Load audio file
await audio.loadAudio('path/to/sound.wav');

// Configure
audio.volume = 0.8;
audio.loop = false;
audio.spatialAudio = true;

// Play
audio.play();
```

#### Create a Rotating Object

```javascript
const entity = scene.createEntity("Rotator");
const rotator = entity.addComponent(RotationAnimator);
rotator.rotationSpeed = new THREE.Vector3(1, 2, 0.5); // x, y, z rad/s
```

### 8. Debugging Tips

#### Check Console Errors
- Open browser DevTools (F12 or right-click → Inspect)
- Go to Console tab
- Look for any red error messages

#### Monitor Performance
- Press F12 in game viewport to show debug info
- Watch FPS and memory usage
- Reduce complexity if FPS drops below 30

#### Select Objects in Console
```javascript
// Get first entity
const entity = TIGEN.scene.entities[0];

// Inspect components
console.log(entity.components);

// Get component
const mesh = entity.getComponent(Mesh);

// Modify properties
entity.transform.setPosition(5, 5, 5);
```

### 9. Best Practices

1. **Organize Entities**
   - Use clear names for entities
   - Group related objects

2. **Optimize Physics**
   - Don't add physics to static objects unnecessarily
   - Use kinematic bodies for moving platforms
   - Reduce collision complexity

3. **Performance**
   - Monitor FPS with debug display (F12)
   - Reduce particle counts for mobile
   - Use appropriate material types

4. **Audio**
   - Use compressed formats (MP3, OGG)
   - Keep audio files small
   - Enable spatial audio only when needed

5. **Animations**
   - Blend between animation states for smooth transitions
   - Use fixed timestep for deterministic physics

### 10. Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| **Click viewport** | Select entity |
| **Delete** | Remove selected entity |
| **F12** | Toggle debug display |
| **+** (Outliner) | Spawn cube |
| **Clear** (Button) | Delete all entities |

## Need Help?

- Check the main **README.md** for full API documentation
- Inspect existing entities in the scene
- Use browser console to test code
- Check performance with F12 debug display

Happy building! 🚀
