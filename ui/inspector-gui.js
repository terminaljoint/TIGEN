/* Inspector GUI - edits selected entity properties */
(function(){
  window.InspectorGUI = {
    container:null,
    current:null,
    init(body){
      this.container = body;
      const info = document.createElement('div'); info.id='inspector-body'; this.container.appendChild(info);
      document.addEventListener('entitySelected',(e)=> this.show(e.detail.entity));
    },

    show(entity){
      this.current = entity;
      const root = document.getElementById('inspector-body'); if (!root) return; root.innerHTML='';
      if (!entity){ root.textContent='No selection'; return; }
      // Name
      const nameRow = document.createElement('div'); nameRow.className='inspector-row';
      const nameLabel = document.createElement('label'); nameLabel.textContent='Name';
      const nameInput = document.createElement('input'); nameInput.value = entity.name || '';
      nameInput.onchange = ()=>{ entity.name = nameInput.value; if (window.TIGEN_Outliner && TIGEN_Outliner.refresh) TIGEN_Outliner.refresh(); };
      nameRow.appendChild(nameLabel); nameRow.appendChild(nameInput); root.appendChild(nameRow);

      // Transform (position)
      const pos = entity.transform && entity.transform.position ? entity.transform.position : null;
      if (pos){ ['x','y','z'].forEach(axis=>{
        const row = document.createElement('div'); row.className='inspector-row';
        const lab = document.createElement('label'); lab.textContent = axis.toUpperCase();
        const inp = document.createElement('input'); inp.type='number'; inp.step='0.1'; inp.value = (pos[axis]||0).toFixed(2);
        inp.onchange = ()=>{ pos[axis] = parseFloat(inp.value); };
        row.appendChild(lab); row.appendChild(inp); root.appendChild(row);
      }); }

      // Components summary
      if (entity.components && entity.components.size){
        const compHeader = document.createElement('div'); compHeader.className='gui-header'; compHeader.textContent='Components'; root.appendChild(compHeader);
        entity.components.forEach((c,name)=>{
          const d = document.createElement('div'); d.className='outline-item'; d.textContent = name || c.constructor.name;
          root.appendChild(d);
        });
      }
    }
  };
})();
