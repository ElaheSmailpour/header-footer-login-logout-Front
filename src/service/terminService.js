import axios from "axios";

class terminService{
 
    static getbehandlung() {
        return axios.get("/termin/behandlungen")
      }
}

export default terminService