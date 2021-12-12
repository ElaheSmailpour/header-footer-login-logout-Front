

import { Link } from "react-router-dom"

import "./header.scss"
const Header = () => {
    const isLogin = localStorage.getItem("loginToken")
    const logout = () => {
        localStorage.clear();
        window.location.assign("/")
    }
    return (
        <div className="header">

            <img src={"/images/logo.jpeg"} alt="pic" />
            {isLogin && <p>welcome {localStorage.getItem("usernameToken")} </p>}
            <nav>
                <ul>
               
                   <li><Link to="/contact">Contact</Link></li>
                   {isLogin &&  <li><Link to="/admin">Admin</Link></li>}

                    <li>Profile
                        <ul>
                            {!isLogin && <li> <Link to="/signup">signup</Link></li>}
                            {!isLogin && <li>  <Link to="/login">Login</Link></li>}
                            {isLogin && <li onClick={logout}>Logout</li>}
                        </ul>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Header;