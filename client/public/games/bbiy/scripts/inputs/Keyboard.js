export default new (class Keyboard {
  constructor () {
    this.keys = new Map()
    document.addEventListener('keydown', e => {
      this.keys.set(e.key, true)
    })
    document.addEventListener('keyup', e => {
      this.keys.delete(e.key)
    })
  }
  
  /**
   * Returns true if this key is pressed 
   * @param {string} key
   * @returns {boolean}
   */
  isPressed (key) {
    return this.keys.has(key)
  }
  
  /**
   * Returns true if any of these keys are pressed 
   * @param {string[]} keys
   * @returns {boolean}
   */
  anyPressed (keys) {
    for (let i = 0; i < keys.length; i++) {
      if (this.keys.has(keys[i])) {
        return true
      }
    }
    return false
  }
  
  /**
   * Set key pressed to false. Useful when you only want one key press at a time.
   * @param {string | undefined} key The key to unpress. If undefined, unpresses all keys.
   */
  unpress (key) {
    if (key) {
      this.keys.delete(key)
    } else if (key === undefined) {
      this.keys.clear()
    }
  }
})()
