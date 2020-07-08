import Api from './Api'

export default {
  findStock (name) {
    return Api().get('/stocks/' + name)
  }
}
