/**
 * TIGEN - Scripting & Behavior System
 * Script-based entity behavior and game logic
 */

class Script extends Component {
  constructor(entity) {
    super(entity);
    this.isRunning = true;
  }

  onEnable() {
    TIGEN_ScriptManager.addScript(this);
  }

  onDisable() {
    TIGEN_ScriptManager.removeScript(this);
  }

  onStart() {} // Called on first frame
  onUpdate(dt) {} // Called every frame
  onLateUpdate(dt) {} // Called after all updates
  onFixedUpdate(fixedDt) {} // Called at fixed timestep
  onCollisionEnter(other) {} // Collision started
  onCollisionStay(other) {} // Collision ongoing
  onCollisionExit(other) {} // Collision ended
  onDestroy() {
    this.isRunning = false;
    TIGEN_ScriptManager.removeScript(this);
  } // Called on script removal
}

// Built-in scripts

class FreeCameraController extends Script {
  constructor(entity) {
    super(entity);
    this.moveSpeed = 20;
    this.rotationSpeed = 2;
    this.velocity = new THREE.Vector3();
  }

  onUpdate(dt) {
    const camera = this.entity.transform;
    
    // WASD movement
    const moveDir = new THREE.Vector3();
    if (TIGEN_Input.keys['KeyW']) moveDir.z -= 1;
    if (TIGEN_Input.keys['KeyS']) moveDir.z += 1;
    if (TIGEN_Input.keys['KeyA']) moveDir.x -= 1;
    if (TIGEN_Input.keys['KeyD']) moveDir.x += 1;
    if (TIGEN_Input.keys['KeyE']) moveDir.y += 1;
    if (TIGEN_Input.keys['KeyQ']) moveDir.y -= 1;

    if (moveDir.length() > 0) {
      moveDir.normalize();
      const speed = TIGEN_Input.keys['ShiftLeft'] ? this.moveSpeed * 2 : this.moveSpeed;
      camera.translate(
        moveDir.x * speed * dt,
        moveDir.y * speed * dt,
        moveDir.z * speed * dt
      );
    }
  }
}

class RotationAnimator extends Script {
  constructor(entity) {
    super(entity);
    this.rotationSpeed = new THREE.Vector3(1, 1, 1);
  }

  onUpdate(dt) {
    const transform = this.entity.transform;
    transform.rotation.x += this.rotationSpeed.x * dt;
    transform.rotation.y += this.rotationSpeed.y * dt;
    transform.rotation.z += this.rotationSpeed.z * dt;
  }
}

class BounceAnimator extends Script {
  constructor(entity) {
    super(entity);
    this.bounceHeight = 2;
    this.bounceSpeed = 2;
    this.originalY = entity.transform.position.y;
  }

  onUpdate(dt) {
    const transform = this.entity.transform;
    const newY = this.originalY + Math.sin(Date.now() * this.bounceSpeed * 0.001) * this.bounceHeight;
    transform.setPosition(transform.position.x, newY, transform.position.z);
  }
}

class FollowTarget extends Script {
  constructor(entity) {
    super(entity);
    this.target = null;
    this.distance = 10;
    this.smoothness = 5;
    this.offset = new THREE.Vector3(0, 2, 5);
  }

  onUpdate(dt) {
    if (!this.target) return;

    const targetPos = this.target.getWorldPosition().clone().add(this.offset);
    const currentPos = this.entity.transform.getWorldPosition();
    const direction = targetPos.sub(currentPos);
    
    const speed = direction.length() * this.smoothness;
    direction.normalize();

    this.entity.transform.translate(
      direction.x * speed * dt,
      direction.y * speed * dt,
      direction.z * speed * dt
    );
  }
}

class ScriptManager {
  constructor() {
    this.scripts = [];
    this.updateOrder = [];
  }

  addScript(script) {
    if (!this.scripts.includes(script)) {
      this.scripts.push(script);
      this.updateOrder.push(script);
    }
  }

  removeScript(script) {
    const idx = this.scripts.indexOf(script);
    if (idx > -1) {
      this.scripts.splice(idx, 1);
      const orderIdx = this.updateOrder.indexOf(script);
      if (orderIdx > -1) this.updateOrder.splice(orderIdx, 1);
    }
  }

  update(dt) {
    [...this.updateOrder].forEach(script => {
      if (script.isRunning && script.onUpdate) {
        script.onUpdate(dt);
      }
    });
  }

  lateUpdate(dt) {
    [...this.updateOrder].forEach(script => {
      if (script.isRunning && script.onLateUpdate) {
        script.onLateUpdate(dt);
      }
    });
  }

  fixedUpdate(fixedDt) {
    [...this.updateOrder].forEach(script => {
      if (script.isRunning && script.onFixedUpdate) {
        script.onFixedUpdate(fixedDt);
      }
    });
  }

  broadcastMessage(methodName, param = null) {
    [...this.scripts].forEach(script => {
      if (script[methodName] && typeof script[methodName] === 'function') {
        script[methodName](param);
      }
    });
  }
}

const TIGEN_ScriptManager = new ScriptManager();

// Register built-in scripts
ComponentRegistry.register('FreeCameraController', FreeCameraController);
ComponentRegistry.register('RotationAnimator', RotationAnimator);
ComponentRegistry.register('BounceAnimator', BounceAnimator);
ComponentRegistry.register('FollowTarget', FollowTarget);
