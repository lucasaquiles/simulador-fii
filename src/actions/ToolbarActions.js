
import SessionStorageManager from './SessionStorageManager'

class ToolbarActions {

    constructor() {
        this.key = document.location.href
        this.sessionStorageManager = new SessionStorageManager(this.key)
    }
    
    clearSimulation() {
        this.sessionStorageManager.clear()
        document.location.reload()
    }

    storageWasCreated() {
        return this.sessionStorageManager.storageWasCreated()
    }
}

export default ToolbarActions

