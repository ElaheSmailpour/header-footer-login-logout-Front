import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react';
import moment from 'moment';
import terminService from '../../service/terminService';
import "./termin.scss"
const Termin = () => {
    const [behandlungList, setBehandungList] = useState([])
    const [selectedBehandlung, setSelectedBehandung] = useState()
    const [selectedDateID, setSelectedDateID] = useState()
    const [selectedHourID, setSelectedHourID] = useState()
    const [aktulleZeit, setAktulleZeit] = useState([])

    useEffect(() => {
        terminService.getAvalable().then((res) => {
            console.log("res=",res.data)
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
                                {item.hours.map(hour => <li key={hour} onClick={() => handleSelectTime(item.date, hour)}>{hour + ":00"}</li>)}
                                  
                                </ul>
                            </div>
                            <Collapse in={selectedDateID === item.date} style={{ border: "3px solid blue", padding: "2rem" }}>
                                <div className="show-termin">
                                <p>Ihr Termin ist für {behandlungList.find(item => item._id === selectedBehandlung)?.title}  am  {item.date} um  {item.hours.find(hour => hour === selectedHourID)}:00 Uhr.</p>
                                  
                                    Dr Yas.
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