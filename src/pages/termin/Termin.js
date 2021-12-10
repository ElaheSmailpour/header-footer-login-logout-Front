import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import terminService from '../../service/terminService';
import "./termin.scss"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Termin = () => {
    const [behandlungList, setBehandungList] = useState([])
    const [selectedBehandlung, setSelectedBehandung] = useState()
    const [selectedDate, setSelectedDateID] = useState()
    const [selectedHour, setSelectedHourID] = useState()
    const [aktulleZeit, setAktulleZeit] = useState([])
    const [showTerminForm, setShowTerminForm] = useState(false)
    const [codesenden, setCodeSenden] = useState(false)
    const [userDetails, setUserDetails] = useState({
        name: "",
        telefonNummner: "",
        störnieren: false,
        datenSchutz: false,
        code: ""
    })
    const history=useHistory()
    useEffect(() => {
        terminService.getAvalable().then((res) => {
            setAktulleZeit(res.data)
        }).catch((err) => {
            console.log("error getAvalable=", err)
        })
    }, [])
    useEffect(() => {
        terminService.getbehandlung().then((res) => {
            setBehandungList(res.data)
        }).catch((err) => {
            console.log("error getbehandlung=", err)
        })
    }, [])
    const handleChangeBehandlung = (event) => {
        setSelectedBehandung(event.target.value);
    };
    const handleSelectTime = (dateId, hourId) => {
        setSelectedHourID(hourId)
        setSelectedDateID(dateId)
    }
    const HandleChangeUserDetail = (event) => {
        let value;
        if (event.target.type === "checkbox")
            value = event.target.checked;
        else
            value = event.target.value
        setUserDetails((oldUserDetails) => {
            return { ...oldUserDetails, [event.target.id]: value }
        })

    }
    const handleBestätigung = () => {
        terminService.getBestätigungTermin(userDetails.telefonNummner).then((res) => {
            setCodeSenden(true)
        }).catch((err) => {
            console.log("err getBestätigungTermin", err)
        })
    }
    const handleBuchen = () => {
        const body = {
            name: userDetails.name,
            time: selectedHour,
            date: selectedDate
        }
        terminService.buchenApi(userDetails.telefonNummner, userDetails.code, body).then((res) => {
            alert("Termin gebucht!")
            history.push("/")
        }).catch((err) => {
            console.log("err Buchen", err)
        })
    }
    return (
        <div className="termin">
            <FormControl className="termin-select">
                <InputLabel id="demo-simple-select-helper-label">Behandlungen</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedBehandlung}
                    label="Age"
                    onChange={handleChangeBehandlung}
                >
                    {behandlungList.map((item, index) => {
                        return <MenuItem key={index} value={item._id} >{item.title}</MenuItem>
                    })}


                </Select>
            </FormControl>
            <Collapse in={selectedBehandlung} style={{ width: "100%" }} classes={{ root: "collapse" }}>
                <ul className="sprechstunden">
                    {aktulleZeit.map(item => {

                        return <li key={item.id}>
                            <div className="termin-hour">
                                <p>{item.date}</p>
                                <ul>
                                    {item.hours.map(hour => <li className={hour === selectedHour && item.date === selectedDate && "hourActive"} key={hour} onClick={() => handleSelectTime(item.date, hour)}>{hour + ":00"}</li>)}

                                </ul>
                            </div>
                            <Collapse in={selectedDate === item.date} style={{ border: "3px solid blue", padding: "2rem" }}>
                                <div className="show-termin">
                                    <p>Ihr Termin ist für {behandlungList.find(item => item._id === selectedBehandlung)?.title}  am  {item.date} um  {item.hours.find(hour => hour === selectedHour)}:00 Uhr.</p>

                                    <p>Dr Yas.</p>
                                    {!showTerminForm && <button onClick={() => setShowTerminForm(true)}>zum Termin </button>}

                                    {showTerminForm && <lable>Geben Sie bitte Ihr Name ein:<input id="name" type="text" placeholder="Geben Sie bitte Ihr Name ein!" value={userDetails.name} onChange={HandleChangeUserDetail} />  </lable>}

                                    {userDetails.name.length > 3 && <label><input type="checkbox" id="störnieren" checked={userDetails.störnieren} onChange={HandleChangeUserDetail} />Sollten Sie Ihren Termin nicht wahrnehmen können, sagen Sie diesen bitte min. 24 Stunden vorher ab.</label>}

                                    {userDetails.störnieren && <lable>Geben Sie bitte Ihre TelefonNummer ein: <input id="telefonNummner" type="number" placeholder="Geben Sie bitte Ihre TelefonNummer ein!" value={userDetails.telefonNummner} onChange={HandleChangeUserDetail} /> </lable>}

                                    {userDetails.telefonNummner.length >= 5 && <label><input type="checkbox" id="datenSchutz" checked={userDetails.datenSchutz} onChange={HandleChangeUserDetail} />Ich akzeptiere die <Link to="#" target="_black">Allgemeinen Geschäftsbedingungen (AGB)</Link> und die Datenschutzerklärung von Dr.Yas sarab.</label>}
                                    {userDetails.datenSchutz && <button onClick={handleBestätigung}>Termin Bestätigung</button>}
                                    {codesenden && <label>Code:<input type="text" placeholder='code' value={userDetails.code} id="code" onChange={HandleChangeUserDetail} /></label>}
                                    {codesenden && <button onClick={handleBuchen}>Buchen</button>}
                                </div>
                            </Collapse>
                        </li>
                    })}
                </ul>
            </Collapse>
        </div>
    )
}

export default Termin;