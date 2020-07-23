class SessionStorageManager {
    
    constructor(key) {
        this.key = key;
        this.init()
    }

    init() {
        if (!localStorage[this.key]) {
            localStorage[this.key] = JSON.stringify([])
        }   
    }

    load() {
        if (localStorage[this.key]) {
            console.log("achou")
            return JSON.parse(localStorage[this.key])
        }
    }

    getKey() {
        return this.key 
    }

    storageWasCreated() {
        return localStorage[ this.key ] ? true : false
    }

    saveOrUpdate(data) {
      var currentDataInStore = this.toObject(localStorage[this.key])
      currentDataInStore.push(data)
      localStorage[this.key] = this.toJSON(currentDataInStore)
    }

    toObject(data) {
        return JSON.parse(data)
    }

    toJSON(data) {
        return JSON.stringify(data)
    }

    clear() {
        localStorage[this.key] = JSON.stringify([])
    }
}

export default SessionStorageManager
