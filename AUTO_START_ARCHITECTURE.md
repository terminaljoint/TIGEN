# TIGEN Auto-Start Architecture

## Overview

The main TIGEN website (`index.html`) has been refactored to **auto-start the engine on page load** with a **clean overlay documentation panel** that does not interfere with engine execution.

## Architecture Requirements Met ✓

- ✓ **Engine auto-starts on page load** - No user interaction required
- ✓ **Canvas visible by default** - The `<main id="vp">` viewport renders the running engine
- ✓ **Documentation is an overlay panel** - Hidden by default, toggled via "📖 Docs" button
- ✓ **Docs don't block engine** - Overlay UI with `pointer-events: none` on container
- ✓ **Engine fully independent** - Core engine code remains untouched
- ✓ **Plain HTML/CSS UI** - No module imports, no engine coupling

## HTML Structure

```html
<body>
  <!-- Engine rendering viewport (fills entire screen) -->
  <main id="vp" tabindex="0"></main>

  <!-- Overlay UI (non-blocking) -->
  <div id="ui-overlay">
    <div class="top-bar">
      <div class="logo">TIGEN <span>v2</span></div>
      <div class="top-controls">
        <button id="toggleDocs">📖 Docs</button>
        <button id="toggleEditor">🎮 Editor</button>
        <button id="resetCamera">🏠 Reset</button>
      </div>
    </div>

    <!-- Documentation panel (hidden by default) -->
    <div id="docsPanel" hidden>
      <!-- Docs content -->
    </div>

    <!-- Status indicator -->
    <div class="status">
      <span class="status-dot"></span>
      <span id="statusText">Engine Running</span>
    </div>
  </div>
</body>
```

## How It Works

### 1. **Script Loading Order**
```html
<!-- THREE.JS from CDN -->
<script src="https://cdn.jsdelivr.net/npm/three@0.145/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145/examples/js/controls/OrbitControls.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145/examples/js/loaders/GLTFLoader.js"></script>

<!-- TIGEN Engine modules (auto-initialize via main.js) -->
<script src="ecs.js"></script>
<script src="physics.js"></script>
<script src="rendering.js"></script>
<!-- ... more modules ... -->
<script src="main.js"></script>

<!-- UI Controller (independent overlay) -->
<script>UIController.init()...</script>
```

### 2. **Auto-Start Trigger**

**main.js** (unchanged) already has:
```javascript
window.addEventListener("DOMContentLoaded", () => {
  // Initialize TIGEN
  window.TIGEN = {};
  TIGEN.scene = new TIGEN_Scene();
  TIGEN.editor = new TIGEN_Editor();
  TIGEN.loop = new TIGEN_Loop(TIGEN.scene);
  TIGEN.loop.start();
  console.log("TIGEN AAA Game Engine v2 - Initialized");
});
```

This ensures the engine auto-starts when DOM is ready.

### 3. **Overlay UI Controller**

Runs independently after engine initialization:
```javascript
const UIController = {
  init() {
    // Bind all UI buttons
    // docs toggle
    // editor toggle  
    // camera reset
  },

  attachEventListeners() {
    // All handlers reference TIGEN global
    // No coupling to engine code
  }
};

document.addEventListener('DOMContentLoaded', () => {
  UIController.init();
});
```

## CSS Architecture

### Viewport Fills Screen
```css
#vp {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
```

### Overlay UI is Non-Blocking
```css
#ui-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;    /* Allow clicks through to engine */
  z-index: 1000;
}

/* Interactive elements re-enable pointer events */
.top-bar {
  pointer-events: auto;    /* Buttons work */
}

#docsPanel {
  pointer-events: auto;    /* Panel is clickable */
}

.status {
  pointer-events: auto;    /* Status is clickable */
}
```

### Smooth Slide-In Animation
```css
#docsPanel {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## Button Functionality

### 📖 Docs Toggle
- **Effect:** Shows/hides the documentation panel
- **State:** Button highlights when panel is open
- **Content:** Live API reference, quick start, controls, asset paths

### 🎮 Editor Toggle
- **Effect:** Calls `TIGEN.editor.togglePlayMode()`
- **State:** Changes to "⏹ Stop" when in play mode
- **UI Update:** `UIController.updateEditorButton()` reflects state

### 🏠 Reset Camera
- **Effect:** Resets camera to position (20, 20, 20)
- **Action:** Updates OrbitControls target and camera orientation
- **Benefit:** Quick way to return to default view

## Documentation Panel Content

The `#docsPanel` contains:

1. **Getting Started** - Feature overview
2. **Quick Start** - Code examples with copy-paste commands
3. **Controls** - Mouse and keyboard interactions
4. **Global API** - Method reference
5. **Asset Paths** - Directory structure
6. **Help & Resources** - Links to docs and GitHub

## Console Output

On page load, displays welcome message:
```
╔════════════════════════════════════════════════════════════════╗
║                    TIGEN v2 Engine Initialized                ║
╚════════════════════════════════════════════════════════════════╝

🎮 QUICK COMMANDS:
  TIGEN.createEntity(name)    - Create new entity
  TIGEN.scene.entities        - List all entities
  TIGEN.loadModel(url)        - Load 3D model
  TIGEN.Input.isKeyDown(code) - Check input
```

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| `#ui-overlay` has `pointer-events: none` | Prevents accidental UI blocking engine input |
| Interactive elements re-enable `pointer-events: auto` | Selective interactivity only where needed |
| Docs panel slides from right (translate X) | Non-disruptive animation, matches modern UX |
| Status indicator at bottom-left | Visible but unobtrusive position |
| Flat dark theme with green accent | Matches hacker/developer aesthetic |
| `@media` responsive for mobile | Works on tablet/phone with adjusted panel width |

## Development Notes

### Adding New UI Elements
1. Add HTML to `#ui-overlay` div
2. Set `pointer-events: auto` if interactive
3. Add CSS for styling
4. Reference UI in `UIController.init()` if it needs JS handling

### Modifying Engine
- Engine code is completely independent
- No need to touch `UIController` when updating engine
- `TIGEN` global is always available to UI

### Testing
1. Open index.html in browser
2. Engine should start rendering immediately
3. Try clicking buttons to toggle docs
4. Open console (F12) to see welcome message
5. Try commands like `TIGEN.createEntity("Test")`

## Performance Considerations

- ✓ Minimal CSS (embedded in HTML)
- ✓ No external dependencies for UI
- ✓ Overlay layer isolated from engine rendering
- ✓ Smooth 60fps animation
- ✓ No layout thrashing

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential improvements:
- [ ] Minimize docs by default on mobile
- [ ] Add keyboard shortcuts (e.g., `D` to toggle docs)
- [ ] Add theme toggle (dark/light mode)
- [ ] Add code editor directly in docs panel
- [ ] Add multi-tab UI for different panels
- [ ] Add scene export/import buttons
