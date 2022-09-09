class CustomCategory extends Blockly.ToolboxCategory {
  /**
   * Constructor for a custom category.
   * @override
   */
  // eslint-disable-next-line no-useless-constructor
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }

  /** @override */
  setSelected(isSelected){
    // We do not store the label span on the category, so use getElementsByClassName.
    var labelDom = this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0];
    if (isSelected) {
      // Change the background color of the div to white.
      this.rowDiv_.style.backgroundColor = 'white';
      // Set the colour of the text to the colour of the category.
      labelDom.style.color = this.colour_ ? this.colour_ : '#4D4D4D';
      this.iconDom_.style.color = this.colour_ ? this.colour_ : '#4D4D4D';
    } else {
      // Set the background back to the original colour.
      this.rowDiv_.style.backgroundColor = this.colour_;
      // Set the text back to white.
      labelDom.style.color = 'white';
      this.iconDom_.style.color = 'white';
    }
    // This is used for accessibility purposes.
    Blockly.utils.aria.setState(/** @type {!Element} */ (this.htmlDiv_),
        Blockly.utils.aria.State.SELECTED, isSelected);
  }

  /** @override */
  createIconDom_() {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );

    iconSvg.setAttribute('fill', 'currentColor');
    iconSvg.setAttribute('width', '32px');
    iconSvg.setAttribute('height', '32px');
    iconSvg.setAttribute('stroke', '#7D7D7D');
    iconSvg.setAttribute('stroke-width', '1');
    if(this.name_ === 'Motion') {
      iconSvg.setAttribute('viewBox', '0 0 24 24');
      iconSvg.classList.add('motionLogo');
      iconPath.setAttribute(
        'd',
        'M13.5,5.5C14.59,5.5 15.5,4.58 15.5,3.5C15.5,2.38 14.59,1.5 13.5,1.5C12.39,1.5 11.5,2.38 11.5,3.5C11.5,4.58 12.39,5.5 13.5,5.5M9.89,19.38L10.89,15L13,17V23H15V15.5L12.89,13.5L13.5,10.5C14.79,12 16.79,13 19,13V11C17.09,11 15.5,10 14.69,8.58L13.69,7C13.29,6.38 12.69,6 12,6C11.69,6 11.5,6.08 11.19,6.08L6,8.28V13H8V9.58L9.79,8.88L8.19,17L3.29,16L2.89,18L9.89,19.38Z'
      );
    } else if(this.name_ === 'Tilling') {
      iconSvg.setAttribute('viewBox', '0 0 24 24');
      iconSvg.classList.add('shovelLogo');
      iconPath.setAttribute(
        'd',
        'M15.1,1.81L12.27,4.64C11.5,5.42 11.5,6.69 12.27,7.47L13.68,8.88L9.13,13.43L6.31,10.6L4.89,12C-0.06,17 3.5,20.5 3.5,20.5C3.5,20.5 7,24 12,19.09L13.41,17.68L10.61,14.88L15.15,10.34L16.54,11.73C17.32,12.5 18.59,12.5 19.37,11.73L22.2,8.9L15.1,1.81M17.93,10.28L16.55,8.9L15.11,7.46L13.71,6.06L15.12,4.65L19.35,8.88L17.93,10.28Z'
      );
    } else if(this.name_ === 'Harvest') {
      iconSvg.setAttribute('viewBox', '0 0 24 24');
      iconSvg.classList.add('plantsLogo');
      iconPath.setAttribute(
        'd',
        'M2,22V20C2,20 7,18 12,18C17,18 22,20 22,20V22H2M11.3,9.1C10.1,5.2 4,6.1 4,6.1C4,6.1 4.2,13.9 9.9,12.7C9.5,9.8 8,9 8,9C10.8,9 11,12.4 11,12.4V17C11.3,17 11.7,17 12,17C12.3,17 12.7,17 13,17V12.8C13,12.8 13,8.9 16,7.9C16,7.9 14,10.9 14,12.9C21,13.6 21,4 21,4C21,4 12.1,3 11.3,9.1Z'
      );
    } else if(this.name_ === 'Control') {
      iconSvg.setAttribute('viewBox', '0 0 24 24');
      iconSvg.classList.add('controlLogo');
      iconPath.setAttribute(
        'd',
        'M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z'
      );
    }
    iconSvg.appendChild(iconPath);
    return iconSvg;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  CustomCategory, true);