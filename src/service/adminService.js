import axios from "axios";

class AdminService {
    static loginApi(username, password) {
        return axios.post("/admin/login", { username, password })
    }

    static getTerminApi() {
        return axios.get("/admin/getTermin", {
            headers: {
                token: localStorage.getItem("loginToken")
            }
        })
    }
    
    static removeHourApi(time,date) {
        return axios.post("/admin/removeHour" ,{time,date},{
            headers: {
                token: localStorage.getItem("loginToken")
            }
        })
        
    }
}

export default AdminService