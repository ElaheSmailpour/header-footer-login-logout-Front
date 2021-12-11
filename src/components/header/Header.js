


import "./header.scss"
const Header = () => {

    return (
        <div className="header">

            <img src={"/images/logo.jpeg"} alt="pic" />

            <nav>
                <ul>

                    <li><a href="#">Termin</a></li>
                    <li><a href="#">Admin</a></li>
                    <li><a href="#">Kontakt</a></li>
                    <li><a href="#">Profile</a>
                        <ul>
                            <li><a href="#">signup</a></li>
                            <li><a href="#">login</a></li>
                        </ul>
                    </li>
                    <li><a href="#">überuns</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;