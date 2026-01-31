const TIGEN_Input = {
  keys:{},

  init(){
    window.addEventListener("keydown",e=>this.keys[e.code]=true);
    window.addEventListener("keyup",e=>this.keys[e.code]=false);
  }
};

TIGEN_Input.init();

