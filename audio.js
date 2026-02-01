/**
 * TIGEN - Audio System
 * Complete audio engine with spatial audio support
 */

class AudioSource extends Component {
  constructor(entity) {
    super(entity);
    this.audioContext = null;
    this.source = null;
    this.gainNode = null;
    this.analyser = null;
    this.panner = null;
    this.buffer = null;
    this.isPlaying = false;
    this.volume = 1;
    this.pitch = 1;
    this.loop = false;
    this.spatialAudio = false;
    this.maxDistance = 100;
    this.refDistance = 1;
  }

  async loadAudio(url) {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Failed to load audio:', error);
    }
  }

  initializeNodes() {
    if (this.source) return;

    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.volume;

    this.analyser = this.audioContext.createAnalyser();

    if (this.spatialAudio) {
      this.panner = this.audioContext.createPanner();
      this.panner.panningModel = 'HRTF';
      this.panner.distanceModel = 'inverse';
      this.panner.maxDistance = this.maxDistance;
      this.panner.refDistance = this.refDistance;

      this.source.connect(this.gainNode);
      this.gainNode.connect(this.panner);
      this.panner.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } else {
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }

    this.source.loop = this.loop;
  }

  play() {
    if (!this.buffer) return;

    if (this.isPlaying) {
      this.stop();
    }

    this.initializeNodes();
    this.source.start(0);
    this.isPlaying = true;
  }

  stop() {
    if (this.source && this.isPlaying) {
      try {
        this.source.stop();
      } catch (e) {}
      this.source = null;
      this.isPlaying = false;
    }
  }

  pause() {
    if (this.isPlaying) {
      this.stop();
    }
  }

  resume() {
    this.play();
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    if (this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }

  update(dt) {
    if (this.panner && this.spatialAudio) {
      const pos = this.entity.transform.getWorldPosition();
      this.panner.setPosition(pos.x, pos.y, pos.z);
    }
  }

  getFrequencyData() {
    if (!this.analyser) return null;
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  toJSON() {
    return {
      volume: this.volume,
      pitch: this.pitch,
      loop: this.loop,
      spatialAudio: this.spatialAudio,
      maxDistance: this.maxDistance
    };
  }

  onDestroy() {
    this.stop();
  }
}

class AudioManager {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterVolume = 1;
    this.sources = [];
  }

  setMasterVolume(value) {
    this.masterVolume = Math.max(0, Math.min(1, value));
    this.masterGain.gain.value = this.masterVolume;
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  stopAllAudio() {
    this.sources.forEach(source => {
      if (source.isPlaying) {
        source.stop();
      }
    });
  }

  getContext() {
    return this.audioContext;
  }
}

const TIGEN_AudioManager = new AudioManager();
