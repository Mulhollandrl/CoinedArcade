function getTemplates (templateMap) {
  return Object.entries(templateMap)
    .reduce((accumulator, entry) => {
      const [key, templateId] = entry
      return {...accumulator, [key]: document.getElementById(templateId).firstElementChild()}
    }, {})
}

const templates = getTemplates({
  menu: 'menu-template',
  levelSelect: 'level-select-template',
  button: 'button-template'
})

export const cloneTemplate = key => templates[key]?.cloneNode(true) 
// export const 
