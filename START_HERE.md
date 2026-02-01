# 🚀 TIGEN v2 - Start Here!

Welcome to **TIGEN v2**, the advanced AAA game engine. This document will guide you through all the resources available.

## 📖 Documentation Guide

### For First-Time Users
Start with these in order:

1. **[TUTORIAL.md](TUTORIAL.md)** - 📚 Beginner's Guide
   - Getting started with the editor
   - Creating your first scene
   - Understanding components
   - Common tasks and keyboard shortcuts

2. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - ⚡ Quick Lookup
   - Common code snippets
   - Component quick guide
   - Keyboard shortcuts
   - Common tasks

### For Detailed Learning

3. **[README.md](README.md)** - 📖 Complete Documentation
   - Full feature list
   - Detailed component documentation
   - Advanced features
   - Development tips

4. **[API_REFERENCE.md](API_REFERENCE.md)** - 🔧 Complete API Reference
   - Every class and method
   - All function signatures
   - Property documentation
   - Usage patterns

### For Learning by Example

5. **[EXAMPLES.md](EXAMPLES.md)** - 💡 Code Examples
   - 8+ complete working examples
   - Physics playground
   - Particle effects
   - Custom scripts
   - Animation systems

### Project Information

6. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - ✨ What's Included
   - Full feature list
   - System architecture
   - Performance metrics
   - File structure

---

## 🎮 Quick Start (2 Minutes)

### 1. Open the Engine
```
Open index.html in your web browser
(Chrome, Firefox, or Edge recommended)
```

### 2. Spawn Objects
```
Click the + button in the Outliner (left panel)
Repeat to spawn multiple cubes
```

### 3. Select & Edit
```
Click an object in the viewport
Edit Position, Rotation, Scale in the Inspector (right panel)
```

### 4. Test Physics
```
Click + Add Component → Physics
Check "Use Gravity" checkbox
Click "ENTER GAMEWORLD" to run simulation
```

### 5. Add Movement
```
Click + Add Component → FreeCameraController
Play and use WASD + Q/E to move

Press STOP to return to editor
```

---

## 📚 Complete File Structure

```
TIGEN/
├── ENGINE CODE
│   ├── index.html              ← Open this file in browser!
│   ├── main.js                 Entry point
│   ├── editor.js               Editor UI
│   ├── loop.js                 Game loop
│   ├── input.js                Input handling
│   ├── ecs.js                  Entity Component System
│   ├── physics.js              Physics engine
│   ├── rendering.js            Rendering & materials
│   ├── particles.js            Particle system
│   ├── animation.js            Animation system
│   ├── audio.js                Audio system
│   ├── scripting.js            Scripting system
│   ├── scene.js                Scene management
│   ├── assets.js               Asset manager
│   ├── debug.js                Debug tools
│   ├── inspector-advanced.js   Inspector UI
│   ├── style.css               Styling
│   └── renderer.js             Legacy renderer
│
└── DOCUMENTATION
    ├── README.md               Full documentation
    ├── TUTORIAL.md             Beginner's guide
    ├── API_REFERENCE.md        Complete API reference
    ├── EXAMPLES.md             Code examples
    ├── QUICK_REFERENCE.md      Quick reference card
    ├── IMPLEMENTATION_SUMMARY  What's included
    └── START_HERE.md           This file!
```

---

## 🎯 Learning Paths

### Path 1: Visual Learner
1. Open index.html
2. Play with the editor UI
3. Spawn objects and modify properties
4. Read TUTORIAL.md for understanding

### Path 2: Code-First
1. Read API_REFERENCE.md
2. Try examples from EXAMPLES.md
3. Open browser console (F12)
4. Paste code and experiment

### Path 3: Structured Learning
1. Follow TUTORIAL.md step-by-step
2. Study QUICK_REFERENCE.md
3. Review EXAMPLES.md
4. Reference API_REFERENCE.md as needed

### Path 4: Feature Explorer
1. Read README.md features section
2. Try corresponding EXAMPLES.md
3. Deep dive into API_REFERENCE.md
4. Extend with custom components

---

## 🎮 Controls Quick Guide

| Control | Action |
|---------|--------|
| **W/A/S/D** | Move camera |
| **Q/E** | Move up/down |
| **Shift + WASD** | Sprint |
| **Click** | Select entity |
| **Delete** | Remove entity |
| **F12** | Show FPS/Debug |
| **+** (Outliner) | Spawn cube |
| **Clear** (Button) | Delete all |

---

## 💻 Browser Console Commands

Open browser console (F12) and try:

```javascript
// Access the engine
TIGEN.scene      // Main scene
TIGEN.editor     // Editor
TIGEN.loop       // Game loop

// Create entity
const entity = TIGEN.scene.createEntity("MyEntity");

// Add mesh
const mesh = entity.addComponent(Mesh);
mesh.setGeometry('sphere', { radius: 2 });
mesh.setMaterial('standard', { color: 0x00ff00 });

// Add physics
const physics = entity.addComponent(Physics);
physics.useGravity = true;

// Add animation
entity.addComponent(RotationAnimator);

// Check performance
TIGEN_DebugRenderer.monitor.getReport()
```

---

## 🌟 Features Overview

### Rendering
✅ PBR Materials  
✅ Real-time Shadows  
✅ Post-processing Effects  
✅ Multiple Light Types  

### Physics
✅ Gravity Simulation  
✅ Collision Detection  
✅ Rigid Body Dynamics  
✅ Kinematic Bodies  

### Systems
✅ Particle Effects  
✅ Animation System  
✅ Spatial Audio  
✅ Asset Management  

### Editor
✅ Visual Inspector  
✅ Scene Outliner  
✅ Debug Display  
✅ Play Mode  

---

## 🔍 Troubleshooting

### Objects aren't visible
- Check they have a Mesh component
- Verify Mesh has geometry and material
- Ensure camera is not inside objects

### Physics not working
- Check Physics component is added
- Verify Collider component exists
- Ensure useGravity is true

### Performance issues
- Press F12 to check FPS
- Check object count (fewer = faster)
- Reduce particle counts
- Simplify materials

### Audio not playing
- Check browser allows audio (may need user interaction)
- Verify file path is correct
- Check volume is not muted
- Check spatialAudio setting

---

## 📞 Getting Help

1. **Check Documentation**
   - API_REFERENCE.md for all methods
   - EXAMPLES.md for working code
   - QUICK_REFERENCE.md for quick lookup

2. **Try Examples**
   - Copy code from EXAMPLES.md
   - Paste into browser console
   - Modify and experiment

3. **Inspect Objects**
   - Open browser console
   - Type `TIGEN.scene.entities`
   - Explore properties and methods

4. **Debug**
   - Press F12 to show debug display
   - Watch FPS and memory
   - Use console for logging

---

## 🚀 Next Steps

1. ✅ You're reading this
2. ▶️ Open index.html in browser
3. ▶️ Follow TUTORIAL.md
4. ▶️ Try EXAMPLES.md code
5. ▶️ Build something awesome!

---

## 📊 By the Numbers

- **15+** Core systems
- **20+** Component types
- **50+** Methods per system
- **8+** Complete examples
- **Complete** Documentation
- **Production-ready** Code

---

## 🎓 Skill Levels

### Beginner (No experience)
→ Start with TUTORIAL.md

### Intermediate (Some game dev)
→ Use QUICK_REFERENCE.md
→ Try EXAMPLES.md

### Advanced (Expert developer)
→ Reference API_REFERENCE.md
→ Extend engine with custom systems

### Expert (Engine developer)
→ Modify core systems
→ Optimize performance
→ Add new features

---

## 📝 Quick Syntax Reference

```javascript
// Scene
TIGEN.scene.createEntity(name)
TIGEN.scene.removeEntity(entity)

// Components
entity.addComponent(ComponentClass)
entity.getComponent(ComponentClass)
entity.removeComponent(ComponentClass)

// Transform
entity.transform.setPosition(x, y, z)
entity.transform.setRotation(x, y, z)
entity.transform.setScale(x, y, z)

// Geometry types
'box', 'sphere', 'cylinder', 'plane', 'torus', 'cone'

// Material types
'standard', 'physical', 'normal', 'Lambert', 'phong'

// Light types
'ambient', 'directional', 'point', 'spot'

// Built-in Scripts
FreeCameraController, RotationAnimator, BounceAnimator, FollowTarget
```

---

## 🎉 Welcome to TIGEN!

You now have access to a **professional game engine** with:

✅ Complete ECS Architecture  
✅ Physics Simulation  
✅ Advanced Rendering  
✅ Audio & Particles  
✅ Animation System  
✅ Professional Editor  
✅ Full Documentation  

**Ready to create? Let's go!** 🚀

---

**Questions?** Check the documentation files:
- [TUTORIAL.md](TUTORIAL.md) - Learn
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Look up
- [API_REFERENCE.md](API_REFERENCE.md) - Deep dive
- [EXAMPLES.md](EXAMPLES.md) - See code
- [README.md](README.md) - Full guide
