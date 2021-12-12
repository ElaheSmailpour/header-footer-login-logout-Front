import './signup.scss'
import ApiService from "../../service/apiService"
import { useState } from "react"
const Signup = () => {

    const [form, setForm] = useState({
        name: "",
        phone: "",
        password: "",
        repeatPassword: "",
        email: ""
    })



    const Regestrieren = (event) => {
        event.preventDefault()
        if (form.password !== form.repeatPassword) {
            alert("password is not equal repeatpassword")
            return;

        }
        if (!form.password) {
            alert(" enter your password ")
            return;

        }
        const addsignup = {
            name: form.name,
            password: form.password,
            email: form.email,
            phone: form.phone
        }

        ApiService.RegisterApi(addsignup).then((res) => {
            console.log("res=",res)
            alert("signup submitted successfully")
            setForm({
                name:"",
                password:"",
                repeatPassword:"",
                email: "",
                phone: ""

            })
        }).catch((error) => {

            console.log("signup Error=",error);
        })
    }

    const handleChangeForm = (e) => {
      
        const newForm = { ...form };
        newForm[e.target.id] = e.target.value;
        setForm(newForm);
    }
    return (
        <div className="signup">
            <form className="signup-content" onSubmit={Regestrieren}>

                <div className="register">
                    <label for="name">Name:</label>
                    <input type="text" id="name"  value={form.name}
                        onChange={e => handleChangeForm(e)} />
                    <label for="phone">Phone:</label>
                    <input type="text" id="phone"  value={form.phone}
                        onChange={e => handleChangeForm(e)} />
                    <label for="password">password:</label>
                    <input type="password" id="password"  value={form.password} required
                        onChange={e => handleChangeForm(e)} />
                    <label for="repeatPassword"> Repeat Password:</label>
                    <input type="password" id="repeatPassword"  value={form.repeatPassword} required
                        onChange={e => handleChangeForm(e)} />
                    <label for="email">Email:</label>
                    <input type="text" id="email"  value={form.email} required
                        onChange={e => handleChangeForm(e)} />
                </div>
                <button type="submit">Regestrieren</button>
            </form>
        </div>
    )
}
export default Signup