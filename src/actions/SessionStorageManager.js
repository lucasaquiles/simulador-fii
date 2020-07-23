class SessionStorageManager {
    
    constructor(key) {
        this.key = key;
    }

    getKey() {
        return this.key 
    }

    storageWasCreated() {
        return localStorage[ this.key ] ? true : false
    }

    clear() {
        localStorage[this.key] = JSON.stringify([])
    }
}

export default SessionStorageManager
