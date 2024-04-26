/**
 * Class for observable data
 * 
 * <p>
 * Holds a value and a list of subscribers with callbacks
 * When the value is changed, each subscriber's callback gets called
 * </p>
 */
export default class Observable {
  id = 0
  subscribers
  data
  
  /**
   * 
   * @param {T} data 
   */
  constructor (data) {
    this.subscribers = new Map()
    this.data = data
  }
  
  /**
   * 
   * @param callback callback(newData, oldData) => any
   * @returns subscriberId
   */
  subscribe (callback) {
    const myId = this.id++
    this.subscribers.set(myId, callback)
    return myId
  }
  
  unsubscribe (id) {
    this.subscribers.delete(id)
  }
  
  set (data) {
    const oldData = this.data
    this.data = data
    for (const callback of this.subscribers.values()) {
      callback(data, oldData)
    }
  }
}
