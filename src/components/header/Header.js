import { useMediaQuery } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss"
const Header = () => {
    const [openSubMenu, setOpenSubMenu] = useState(false)
    const menubtnRef = useRef();
    const menuRef = useRef();
    const isMobileSize = useMediaQuery('(max-width:600px)');
    const handleClick = () => {

        menubtnRef.current.classList.toggle("toggle")
        menuRef.current.classList.toggle("active")
    }
    return (
        <div className="header">

            <img src={"/images/logo.jpeg"} alt="pic" />
            <button ref={menubtnRef} className="sidebar-btn" onClick={handleClick}>
                <span></span>
            </button>
            <nav ref={menuRef}>
                <ul>
                    <li><a href="#"> Praxis</a></li>
                    <li><a href="#"> Kontakt</a></li>
                    <li onClick={() => setOpenSubMenu(!openSubMenu)}><a href="#"> Leistungen</a>
                        {isMobileSize ?
                            <Collapse in={openSubMenu} style={{ width: "100%" }} classes={{ root: "collapse" }}>
                                <ul>
                                    <li><a href="#"> Link1</a></li>
                                    <li><a href="#"> Link2</a></li>
                                    <li><a href="#"> Link3</a></li>
                                    <li><a href="#"> Link4</a></li>
                                </ul>
                            </Collapse> :
                            <ul>
                                <li><a href="#"> Link1</a></li>
                                <li><a href="#"> Link2</a></li>
                                <li><a href="#"> Link3</a></li>
                                <li><a href="#"> Link4</a></li>
                            </ul>
                        }
                    </li>
                    <li>Termin vereinbaren
                        {isMobileSize ?
                            <Collapse in={openSubMenu} style={{ width: "100%" }} classes={{ root: "collapse" }}>
                                <ul>
                                    <li><Link to="/termin"> Termin vereinbaren</Link></li>
                                    <li><Link to="/störnieren">Termin störnieren</Link></li>

                                </ul>
                            </Collapse> :
                            <ul>
                                <li><Link to="/termin"> Termin vereinbaren</Link></li>
                                <li><Link to="/störnieren">Termin störnieren</Link></li>

                            </ul>
                        }
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default Header;