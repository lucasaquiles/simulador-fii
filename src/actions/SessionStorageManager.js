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
      const currentDataInStore = this.toObject(localStorage[this.key])
      this.findAndUpdate(currentDataInStore, data)
      localStorage[this.key] = this.toJSON(currentDataInStore)
    }

    findAndUpdate(array, data) {
        const index = array.findIndex((filter) => filter.fiiCodeSelected == data.fiiCodeSelected)
        if(index >= 0) {
            array[index] = data
        }else {
            array.push(data)
        }
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
