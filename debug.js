/**
 * TIGEN - Performance Monitoring & Debug Tools
 * FPS counter, profiling, and performance metrics
 */

class PerformanceMonitor {
  constructor() {
    this.fpsValues = [];
    this.frameTime = 0;
    this.fps = 60;
    this.deltaTime = 0;
    this.stats = {
      meshCount: 0,
      triangleCount: 0,
      lightCount: 0,
      particleCount: 0,
      drawCalls: 0,
      memoryUsage: 0
    };
    this.enabled = true;
    this.maxSamples = 60;
  }

  update(dt) {
    this.deltaTime = dt;
    const fps = 1 / dt;
    this.fpsValues.push(fps);

    if (this.fpsValues.length > this.maxSamples) {
      this.fpsValues.shift();
    }

    this.fps = this.fpsValues.reduce((a, b) => a + b) / this.fpsValues.length;
    this.frameTime = dt * 1000;
  }

  getStats() {
    if (!performance.memory) {
      return this.stats;
    }

    this.stats.memoryUsage = (performance.memory.usedJSHeapSize / 1048576).toFixed(2); // MB
    return this.stats;
  }

  getAverageFPS() {
    return Math.round(this.fps);
  }

  getFrameTime() {
    return this.frameTime.toFixed(2);
  }

  reset() {
    this.fpsValues = [];
    this.fps = 60;
  }

  getReport() {
    return {
      fps: this.getAverageFPS(),
      frameTime: this.getFrameTime() + 'ms',
      stats: this.getStats()
    };
  }
}

class DebugRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.monitor = new PerformanceMonitor();
    this.showDebug = true;
    this.showStats = true;
  }

  render(renderer) {
    if (!this.showDebug || !this.ctx) return;

    const width = this.canvas.width;
    const height = this.canvas.height;

    // Semi-transparent background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, width, 120);

    // Text
    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 12px monospace';

    let y = 15;
    const lineHeight = 18;

    this.ctx.fillText(`FPS: ${this.monitor.getAverageFPS()}`, 10, y);
    y += lineHeight;

    this.ctx.fillText(`Frame: ${this.monitor.getFrameTime()}ms`, 10, y);
    y += lineHeight;

    if (this.showStats) {
      const stats = this.monitor.getStats();
      this.ctx.fillText(`Memory: ${stats.memoryUsage}MB`, 10, y);
    }
  }

  setShowDebug(show) {
    this.showDebug = show;
  }

  getMonitor() {
    return this.monitor;
  }
}

// Create off-screen canvas for debug info
const debugCanvas = document.createElement('canvas');
debugCanvas.width = window.innerWidth;
debugCanvas.height = window.innerHeight;
debugCanvas.style.position = 'fixed';
debugCanvas.style.top = '0';
debugCanvas.style.left = '0';
debugCanvas.style.pointerEvents = 'none';
debugCanvas.style.zIndex = '9999';
debugCanvas.style.opacity = '0.8';

const TIGEN_DebugRenderer = new DebugRenderer(debugCanvas);

// Add debug canvas to page when enabled
let debugCanvasAdded = false;
function toggleDebugDisplay(show) {
  if (show && !debugCanvasAdded) {
    document.body.appendChild(debugCanvas);
    debugCanvasAdded = true;
  } else if (!show && debugCanvasAdded) {
    debugCanvas.remove();
    debugCanvasAdded = false;
  }
}

// Keyboard shortcut: F12 to toggle debug
window.addEventListener('keydown', (e) => {
  if (e.key === 'F12') {
    e.preventDefault();
    TIGEN_DebugRenderer.setShowDebug(!TIGEN_DebugRenderer.showDebug);
    toggleDebugDisplay(TIGEN_DebugRenderer.showDebug);
  }
});

toggleDebugDisplay(false); // Start disabled
