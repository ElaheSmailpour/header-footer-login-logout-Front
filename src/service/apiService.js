import axios from "axios";

class ApiService {
  static RegisterApi(body){
      return axios.post("/register/signup",body)
  }
  
  static loginApi(body){
    return axios.post("/register/login",body)
}
}

export default ApiService