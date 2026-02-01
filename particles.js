/**
 * TIGEN - Particle System
 * Advanced GPU-accelerated particle effects
 */

class ParticleSystem extends Component {
  constructor(entity) {
    super(entity);
    this.particles = [];
    this.maxParticles = 1000;
    this.emissionRate = 50;
    this.lifetime = 2;
    this.speed = new THREE.Vector3(0, 10, 0);
    this.speedVariance = new THREE.Vector3(5, 2, 5);
    this.gravity = 9.81;
    this.size = 0.1;
    this.sizeVariance = 0.05;
    this.color = 0xffffff;
    this.colorVariance = 0;
    this.material = null;
    this.geometry = null;
    this.mesh = null;
    this.isPlaying = true;
    this.loop = true;
    this.emissionTime = 0;

    this.initializeParticleSystem();
  }

  initializeParticleSystem() {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.maxParticles * 3);
    const colors = new Float32Array(this.maxParticles * 3);
    const sizes = new Float32Array(this.maxParticles);

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    this.material = new THREE.PointsMaterial({
      size: this.size,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      depthWrite: false
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
  }

  emit(count = 1) {
    const pos = this.entity.transform.getWorldPosition();

    for (let i = 0; i < count && this.particles.length < this.maxParticles; i++) {
      const particle = {
        position: pos.clone().add(
          new THREE.Vector3(
            (Math.random() - 0.5) * this.speedVariance.x,
            (Math.random() - 0.5) * this.speedVariance.y,
            (Math.random() - 0.5) * this.speedVariance.z
          )
        ),
        velocity: new THREE.Vector3(
          this.speed.x + (Math.random() - 0.5) * this.speedVariance.x,
          this.speed.y + (Math.random() - 0.5) * this.speedVariance.y,
          this.speed.z + (Math.random() - 0.5) * this.speedVariance.z
        ),
        age: 0,
        lifetime: this.lifetime + (Math.random() - 0.5) * this.lifetime * 0.2,
        size: this.size + (Math.random() - 0.5) * this.sizeVariance,
        color: new THREE.Color(this.color)
      };

      if (this.colorVariance > 0) {
        particle.color.multiplyScalar(1 + (Math.random() - 0.5) * this.colorVariance);
      }

      this.particles.push(particle);
    }

    this.updateGeometry();
  }

  update(dt) {
    if (!this.isPlaying) return;

    // Emit new particles
    this.emissionTime += dt;
    const particlesToEmit = Math.floor(this.emissionRate * dt);
    if (particlesToEmit > 0) {
      this.emit(particlesToEmit);
    }

    // Update existing particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;

      if (p.age >= p.lifetime) {
        this.particles.splice(i, 1);
        continue;
      }

      // Apply gravity
      p.velocity.y -= this.gravity * dt;

      // Update position
      p.position.add(p.velocity.clone().multiplyScalar(dt));

      // Fade out
      p.alpha = 1 - (p.age / p.lifetime);
    }

    this.updateGeometry();
  }

  updateGeometry() {
    const positions = this.geometry.attributes.position.array;
    const colors = this.geometry.attributes.color.array;
    const sizes = this.geometry.attributes.size.array;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      positions[i * 3] = p.position.x;
      positions[i * 3 + 1] = p.position.y;
      positions[i * 3 + 2] = p.position.z;

      colors[i * 3] = p.color.r * p.alpha;
      colors[i * 3 + 1] = p.color.g * p.alpha;
      colors[i * 3 + 2] = p.color.b * p.alpha;

      sizes[i] = p.size;
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
  }

  play() {
    this.isPlaying = true;
  }

  stop() {
    this.isPlaying = false;
  }

  clear() {
    this.particles = [];
    this.updateGeometry();
  }

  toJSON() {
    return {
      maxParticles: this.maxParticles,
      emissionRate: this.emissionRate,
      lifetime: this.lifetime,
      speed: [this.speed.x, this.speed.y, this.speed.z],
      gravity: this.gravity,
      size: this.size
    };
  }
}
