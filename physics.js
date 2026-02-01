/**
 * TIGEN Physics Engine
 * 3D Rigid Body Physics with Collisions
 */

class Physics extends Component {
  constructor(entity) {
    super(entity);
    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
    this.angularVelocity = new THREE.Vector3();
    this.mass = 1;
    this.friction = 0.1;
    this.restitution = 0.8;
    this.useGravity = true;
    this.isKinematic = false;
    this.collider = null;
  }

  applyForce(force) {
    if (this.isKinematic) return;
    this.acceleration.add(force.divideScalar(this.mass));
  }

  applyImpulse(impulse) {
    if (this.isKinematic) return;
    this.velocity.add(impulse.divideScalar(this.mass));
  }

  update(dt) {
    if (this.isKinematic) return;

    // Gravity
    if (this.useGravity) {
      this.acceleration.y -= 9.81;
    }

    // Update velocity
    this.velocity.add(this.acceleration.clone().multiplyScalar(dt));
    this.velocity.multiplyScalar(1 - this.friction);

    // Update position
    const transform = this.entity.transform;
    transform.translate(
      this.velocity.x * dt,
      this.velocity.y * dt,
      this.velocity.z * dt
    );

    this.acceleration.set(0, 0, 0);
  }

  toJSON() {
    return {
      mass: this.mass,
      friction: this.friction,
      restitution: this.restitution,
      useGravity: this.useGravity,
      isKinematic: this.isKinematic
    };
  }
}

class Collider extends Component {
  constructor(entity) {
    super(entity);
    this.type = "box"; // box, sphere, capsule
    this.size = new THREE.Vector3(1, 1, 1);
    this.isTrigger = false;
    this.enabled = true;
  }

  getBounds() {
    const pos = this.entity.transform.getWorldPosition();
    const scale = this.entity.transform.scale;
    return {
      min: pos.clone().sub(this.size.clone().multiply(scale).multiplyScalar(0.5)),
      max: pos.clone().add(this.size.clone().multiply(scale).multiplyScalar(0.5))
    };
  }

  intersectsWith(other) {
    if (!this.enabled || !other.enabled) return false;

    const bounds1 = this.getBounds();
    const bounds2 = other.getBounds();

    return (
      bounds1.min.x <= bounds2.max.x &&
      bounds1.max.x >= bounds2.min.x &&
      bounds1.min.y <= bounds2.max.y &&
      bounds1.max.y >= bounds2.min.y &&
      bounds1.min.z <= bounds2.max.z &&
      bounds1.max.z >= bounds2.min.z
    );
  }

  toJSON() {
    return {
      type: this.type,
      size: [this.size.x, this.size.y, this.size.z],
      isTrigger: this.isTrigger
    };
  }
}

class PhysicsEngine {
  constructor() {
    this.bodies = [];
    this.colliders = [];
    this.gravity = new THREE.Vector3(0, -9.81, 0);
    this.timeScale = 1;
  }

  registerBody(physics) {
    if (!this.bodies.includes(physics)) {
      this.bodies.push(physics);
    }
  }

  registerCollider(collider) {
    if (!this.colliders.includes(collider)) {
      this.colliders.push(collider);
    }
  }

  update(dt) {
    dt *= this.timeScale;

    // Update all physics bodies
    this.bodies.forEach(body => body.update(dt));

    // Collision detection
    for (let i = 0; i < this.colliders.length; i++) {
      for (let j = i + 1; j < this.colliders.length; j++) {
        const col1 = this.colliders[i];
        const col2 = this.colliders[j];

        if (col1.intersectsWith(col2)) {
          // Handle collision
          const physics1 = col1.entity.getComponent(Physics);
          const physics2 = col2.entity.getComponent(Physics);

          if (physics1 && physics2 && !col1.isTrigger && !col2.isTrigger) {
            this.resolveCollision(physics1, physics2);
          }

          // Call collision callbacks
          if (col1.onCollision) col1.onCollision(col2);
          if (col2.onCollision) col2.onCollision(col1);
        }
      }
    }
  }

  resolveCollision(body1, body2) {
    if (body1.isKinematic && body2.isKinematic) return;

    const vel1 = body1.velocity.clone();
    const vel2 = body2.velocity.clone();

    const relVel = vel1.sub(vel2);
    const restitution = Math.min(body1.restitution, body2.restitution);

    // Simple elastic collision resolution
    const impulse = relVel.multiplyScalar(1 + restitution);

    if (!body1.isKinematic) body1.velocity.sub(impulse.clone().multiplyScalar(1 / body1.mass));
    if (!body2.isKinematic) body2.velocity.add(impulse.clone().multiplyScalar(1 / body2.mass));
  }
}
