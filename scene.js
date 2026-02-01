/**
 * TIGEN - Scene Management
 * Scene graph and world management
 */

class TIGEN_Scene extends THREE.Scene {
  constructor() {
    super();
    this.entities = [];
    this.entityMap = new Map();
    this.background = new THREE.Color(0x0a0b0d);
    
    // Lighting setup
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.directionalLight.position.set(50, 100, 50);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.camera.far = 500;
    this.add(this.directionalLight);

    // Grid and helpers
    this.add(new THREE.GridHelper(200, 100, 0x222222, 0x181818));

    // Environment
    this.fog = new THREE.Fog(0x0a0b0d, 500, 1000);
  }

  createEntity(name = "Entity") {
    const entity = new Entity(name);
    this.entities.push(entity);
    this.entityMap.set(entity.id, entity);
    entity.scene = this;
    return entity;
  }

  addEntity(entity) {
    if (!this.entities.includes(entity)) {
      this.entities.push(entity);
      this.entityMap.set(entity.id, entity);
      entity.scene = this;
    }
  }

  removeEntity(entity) {
    const idx = this.entities.indexOf(entity);
    if (idx > -1) {
      this.entities.splice(idx, 1);
      this.entityMap.delete(entity.id);
      entity.destroy();
    }
  }

  getEntity(id) {
    return this.entityMap.get(id);
  }

  findEntitiesByName(name) {
    return this.entities.filter(e => e.name === name);
  }

  findEntitiesByTag(tag) {
    return this.entities.filter(e => e.tags && e.tags.includes(tag));
  }

  update(dt) {
    this.entities.forEach(entity => entity.update(dt));
  }

  clear() {
    this.entities.forEach(entity => entity.destroy());
    this.entities = [];
    this.entityMap.clear();
  }

  toJSON() {
    return {
      name: this.name,
      entities: this.entities.map(e => e.toJSON()),
      environment: {
        background: this.background.getHexString(),
        fogColor: this.fog.color.getHexString(),
        fogFar: this.fog.far,
        fogNear: this.fog.near
      }
    };
  }
}
