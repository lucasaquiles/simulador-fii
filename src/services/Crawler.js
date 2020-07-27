import Api from './Api'

const httpMessage = {
  NOT_FOUND: {
    code: 404,
    status: 'Nenhum resultado encontrado'
  },
  NONE: {
    code: 500,
    status: "Ops! Não foi possivel fazer a simulação agora!"
  },
  TIMEOUT: {
    code: 408,
    status: "Ops! a consulta está demorando demais"
  }
}

function returnStatus(httpError) {
  
  if(!httpError.response) {
    return httpMessage.NONE
  }
  const code = httpError.response.status
  const responseStatus = Object.values(httpMessage).filter((httpcodes) => { 
    console.log("code", httpcodes.code)
    return httpcodes.code == code 
  }).pop()
  
  return responseStatus
}

export default {
  findStock (name) {
    return Api().get('/stocks/' + name).catch((error) => {
      return returnStatus(error)
    })
  }
}
