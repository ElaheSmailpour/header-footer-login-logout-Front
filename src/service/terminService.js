import axios from "axios";

class terminService {
  static getbehandlung() {
    return axios.get("/termin/behandlungen")
  }

  static getAvalable() {
    return axios.get("/termin/")
  }

}

export default terminService