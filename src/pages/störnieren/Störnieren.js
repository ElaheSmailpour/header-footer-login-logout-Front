import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import terminService from '../../service/terminService';

const Störnieren = () => {
    const [phone, setPhone] = useState()
    const [terminListData, setTerminListData] = useState([])
    const handleChangeInput = (event) => {
        setPhone(event.target.value)
    }
    const history = useHistory()
    const terminList = () => {
        terminService.terminListApi(phone).then((res) => {
            setTerminListData(res.data)
        }).catch((err) => {
            alert(err?.response?.data)
            console.log("error terminList=", err)
        })
    }
    const TerminStörnieren = (id) => {
        terminService.terminRemoveApi(id).then((res) => {
            alert("termin gelöscht!")
            history.push("/")
        }).catch((err) => {
            alert(err?.response?.data)
            console.log("error TerminStörnieren=", err)
        })
    }
    return (
        <div className="störnieren">
            <input type="number" placeholder="telefonnummber" value={phone} onChange={handleChangeInput} />
            <button onClick={terminList}>Termin List</button>
            <ul>
                {terminListData.map((item, index) => {
                    return <li key={index}><p>{item.userId.name} Ihr Temin ist am :{item.date} um {item.time}Uhr. </p><button onClick={() => TerminStörnieren(item._id)}>Termin Störnieren</button></li>
                })}
            </ul>
        </div>
    )
}

export default Störnieren;