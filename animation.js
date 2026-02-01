/**
 * TIGEN - Animation System
 * Skeletal and property animation support
 */

class AnimationClip {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
    this.tracks = []; // Array of { property, keyframes: [{ time, value }] }
    this.isPlaying = false;
    this.currentTime = 0;
    this.loop = true;
    this.speed = 1;
  }

  addTrack(property, keyframes) {
    this.tracks.push({ property, keyframes });
  }

  play() {
    this.isPlaying = true;
    this.currentTime = 0;
  }

  stop() {
    this.isPlaying = false;
    this.currentTime = 0;
  }

  pause() {
    this.isPlaying = false;
  }

  resume() {
    this.isPlaying = true;
  }

  getValueAtTime(time) {
    const result = {};

    this.tracks.forEach(track => {
      let value = null;

      for (let i = 0; i < track.keyframes.length - 1; i++) {
        const kf1 = track.keyframes[i];
        const kf2 = track.keyframes[i + 1];

        if (time >= kf1.time && time <= kf2.time) {
          const t = (time - kf1.time) / (kf2.time - kf1.time);
          
          if (typeof kf1.value === 'number') {
            value = kf1.value + (kf2.value - kf1.value) * this.easeInOutQuad(t);
          } else if (kf1.value instanceof THREE.Vector3) {
            value = new THREE.Vector3().lerpVectors(kf1.value, kf2.value, this.easeInOutQuad(t));
          } else if (kf1.value instanceof THREE.Euler) {
            value = new THREE.Euler(
              kf1.value.x + (kf2.value.x - kf1.value.x) * this.easeInOutQuad(t),
              kf1.value.y + (kf2.value.y - kf1.value.y) * this.easeInOutQuad(t),
              kf1.value.z + (kf2.value.z - kf1.value.z) * this.easeInOutQuad(t)
            );
          }
          break;
        }
      }

      if (value !== null) {
        result[track.property] = value;
      }
    });

    return result;
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  toJSON() {
    return {
      name: this.name,
      duration: this.duration,
      trackCount: this.tracks.length,
      loop: this.loop
    };
  }
}

class Animator extends Component {
  constructor(entity) {
    super(entity);
    this.clips = new Map();
    this.currentClip = null;
    this.blendTarget = null;
    this.blendDuration = 0.5;
    this.blendProgress = 0;
  }

  addClip(clip) {
    this.clips.set(clip.name, clip);
  }

  getClip(name) {
    return this.clips.get(name);
  }

  play(clipName, loop = true) {
    const clip = this.clips.get(clipName);
    if (!clip) return;

    if (this.currentClip !== clip) {
      this.blendTarget = clip;
      this.blendProgress = 0;
      clip.play();
      clip.loop = loop;
    }
  }

  stop() {
    if (this.currentClip) {
      this.currentClip.stop();
    }
  }

  update(dt) {
    if (!this.currentClip) return;

    if (this.currentClip.isPlaying) {
      this.currentClip.currentTime += dt * this.currentClip.speed;

      if (this.currentClip.currentTime >= this.currentClip.duration) {
        if (this.currentClip.loop) {
          this.currentClip.currentTime = 0;
        } else {
          this.currentClip.stop();
        }
      }

      const values = this.currentClip.getValueAtTime(this.currentClip.currentTime);
      this.applyAnimationValues(values);
    }

    // Blend to new clip
    if (this.blendTarget && this.blendProgress < 1) {
      this.blendProgress += dt / this.blendDuration;
      if (this.blendProgress >= 1) {
        this.blendProgress = 1;
        this.currentClip = this.blendTarget;
        this.blendTarget = null;
      }
    }
  }

  applyAnimationValues(values) {
    const transform = this.entity.transform;

    Object.keys(values).forEach(property => {
      const value = values[property];

      if (property === 'position' && value instanceof THREE.Vector3) {
        transform.position.copy(value);
      } else if (property === 'rotation' && value instanceof THREE.Euler) {
        transform.rotation.copy(value);
      } else if (property === 'scale' && value instanceof THREE.Vector3) {
        transform.scale.copy(value);
      }
    });
  }

  toJSON() {
    return {
      clipCount: this.clips.size,
      currentClip: this.currentClip ? this.currentClip.name : null
    };
  }
}
