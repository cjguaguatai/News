class Storage {
  set (key, value) {
    if (value instanceof Object) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get (key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()
export default storage
