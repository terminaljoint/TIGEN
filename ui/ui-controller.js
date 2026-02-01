/* UI Controller - initializes GUI panels and wires to TIGEN API */
(function(){
  function createPanel(id, title){
    const root = document.createElement('div');
    root.id = id;
    root.className = id === 'gui-bottom' ? 'gui-bottom' : (id === 'gui-left' ? 'gui-left' : 'gui-right');
    const header = document.createElement('div'); header.className='gui-header'; header.textContent = title;
    const body = document.createElement('div'); body.className='gui-body';
    root.appendChild(header); root.appendChild(body);
    return {root, body};
  }

  window.UIController = {
    init(){
      if (document.getElementById('tigen-gui-root')) return;
      const root = document.createElement('div'); root.id='tigen-gui-root';
      const left = createPanel('gui-left','Outliner');
      const right = createPanel('gui-right','Inspector');
      const bottom = createPanel('gui-bottom','Assets');
      root.appendChild(left.root);
      root.appendChild(bottom.root);
      root.appendChild(right.root);
      document.body.appendChild(root);

      // Initialize modules if present
      if (window.OutlinerGUI && OutlinerGUI.init) OutlinerGUI.init(left.body);
      if (window.InspectorGUI && InspectorGUI.init) InspectorGUI.init(right.body);
      if (window.AssetBrowser && AssetBrowser.init) AssetBrowser.init(bottom.body);

      // Wire global event to refresh outliner periodically
      setInterval(()=>{ if (window.OutlinerGUI && OutlinerGUI.refresh) OutlinerGUI.refresh(); }, 800);
    }
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => window.UIController.init());
  else window.UIController.init();
})();
