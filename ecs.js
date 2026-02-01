/**
 * TIGEN - Entity Component System (ECS)
 * Advanced AAA Game Engine Component Architecture
 */

class Component {
  constructor(entity) {
    this.entity = entity;
    this.enabled = true;
  }

  onEnable() {}
  onDisable() {}
  update(dt) {}
  onDestroy() {}
}

class Entity {
  constructor(name = "Entity") {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.components = new Map();
    this.children = [];
    this.parent = null;
    this.active = true;
    this.transform = this.addComponent(Transform);
  }

  addComponent(ComponentClass) {
    if (this.components.has(ComponentClass.name)) {
      return this.components.get(ComponentClass.name);
    }
    const component = new ComponentClass(this);
    this.components.set(ComponentClass.name, component);
    if (component.onEnable) component.onEnable();
    return component;
  }

  getComponent(ComponentClass) {
    return this.components.get(ComponentClass.name);
  }

  removeComponent(ComponentClass) {
    const component = this.components.get(ComponentClass.name);
    if (component && component.onDestroy) {
      component.onDestroy();
    }
    this.components.delete(ComponentClass.name);
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx > -1) this.children.splice(idx, 1);
    child.parent = null;
  }

  update(dt) {
    if (!this.active) return;
    for (let component of this.components.values()) {
      if (component.enabled && component.update) {
        component.update(dt);
      }
    }
    this.children.forEach(child => child.update(dt));
  }

  destroy() {
    this.components.forEach(comp => {
      if (comp.onDestroy) comp.onDestroy();
    });
    this.components.clear();
    this.children.forEach(child => child.destroy());
    this.children = [];
  }

  getWorldPosition() {
    return this.transform.getWorldPosition();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      transform: this.transform.toJSON(),
      components: Array.from(this.components.entries()).map(([name, comp]) => ({
        name,
        data: comp.toJSON ? comp.toJSON() : {}
      })),
      children: this.children.map(child => child.toJSON())
    };
  }
}

class Transform extends Component {
  constructor(entity) {
    super(entity);
    this.position = new THREE.Vector3();
    this.rotation = new THREE.Euler();
    this.scale = new THREE.Vector3(1, 1, 1);
    this.matrix = new THREE.Matrix4();
    this.matrixWorld = new THREE.Matrix4();
    this.matrixNeedsUpdate = true;
  }

  updateMatrix() {
    this.matrix.compose(this.position, new THREE.Quaternion().setFromEuler(this.rotation), this.scale);
    this.matrixNeedsUpdate = false;
  }

  getWorldPosition() {
    const pos = this.position.clone();
    let parent = this.entity.parent;
    while (parent) {
      pos.applyQuaternion(new THREE.Quaternion().setFromEuler(parent.transform.rotation));
      pos.add(parent.transform.position);
      parent = parent.parent;
    }
    return pos;
  }

  setPosition(x, y, z) {
    this.position.set(x, y, z);
    this.matrixNeedsUpdate = true;
  }

  translate(x, y, z) {
    this.position.add(new THREE.Vector3(x, y, z));
    this.matrixNeedsUpdate = true;
  }

  setRotation(x, y, z) {
    this.rotation.set(x, y, z);
    this.matrixNeedsUpdate = true;
  }

  setScale(x, y, z) {
    this.scale.set(x, y, z);
    this.matrixNeedsUpdate = true;
  }

  toJSON() {
    return {
      position: [this.position.x, this.position.y, this.position.z],
      rotation: [this.rotation.x, this.rotation.y, this.rotation.z],
      scale: [this.scale.x, this.scale.y, this.scale.z]
    };
  }
}

// Component Registry
const ComponentRegistry = {
  components: new Map(),

  register(name, ComponentClass) {
    this.components.set(name, ComponentClass);
  },

  get(name) {
    return this.components.get(name);
  },

  getAll() {
    return Array.from(this.components.entries());
  }
};
