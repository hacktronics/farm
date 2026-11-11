class ToolboxLabel extends Blockly.ToolboxItem {
  // eslint-disable-next-line no-useless-constructor
  constructor(toolboxItemDef, parentToolbox) {
    super(toolboxItemDef, parentToolbox);
  }

  /** @override */
  init() {
    // Create the label.
    this.label = document.createElement('label');
    // Set the name.
    this.label.textContent = this.toolboxItemDef_['name'];
    // Set the color.
    this.label.style.color = this.toolboxItemDef_['colour'];
    // Any attributes that begin with css- will get added to a cssconfig object.
    const cssConfig = this.toolboxItemDef_['cssconfig'];
    // Add the class.
    if (cssConfig) {
      this.label.classList.add(cssConfig['label']);
    }
  }

  /** @override */
  getDiv() {
    return this.label;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  'toolboxlabel',
  ToolboxLabel);