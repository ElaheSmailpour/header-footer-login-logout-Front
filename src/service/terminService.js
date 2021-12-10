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
}

export default terminService