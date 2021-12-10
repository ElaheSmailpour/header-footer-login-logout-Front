import axios from "axios";

class terminService {
  static getbehandlung() {
    return axios.get("/termin/behandlungen")
  }

  static getAvalable() {
    return axios.get("/termin/")
  }
  static getBestätigungTermin(phone) {
    return axios.get("/termin/verfiyPhone/" + phone)
  }
  
  static buchenApi(phone,code,body) {
    return axios.post("/termin/verfiyPhone/" + phone + "/" + code,body)
  }
  
  static terminListApi(phone) {
    return axios.get("/termin/terminList/" + phone)
  }
  
  static terminRemoveApi(terminId) {
    return axios.get("/termin/terminRemove/" + terminId)
  }
  static RegisterApi(body) {
    return axios.post("/register/signup", body)
  }
  static loginApi(body) {
    return axios.post("/register/login", body)
  }
}

export default terminService