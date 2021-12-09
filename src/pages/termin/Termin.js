import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import moment from 'moment';
import "./termin.scss"
const Termin = () => {
    const [behandlung, setBehandung] = useState()
    const [selectedDateID, setSelectedDateID] = useState()
    const [selectedHourID, setSelectedHourID] = useState()
    const [aktulleZeit, setAktulleZeit] = useState([
        {
            time: moment().format("dddd D.M.YYYY"),
            hours: [
                { id: 1, hour: "14:00" }, { id: 2, hour: "15:00" }, { id: 3, hour: "16:00" }
            ]
        },
        {
            time: moment().add("days",1).format("dddd D.M.YYYY"),
            hours: [
                { id: 1, hour: "14:00" }, { id: 2, hour: "15:00" }, { id: 3, hour: "16:00" }
            ]

        }
    ])
    const handleChangeBehandlung = (event) => {
        setBehandung(event.target.value);
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
                    value={behandlung}
                    label="Age"
                    onChange={handleChangeBehandlung}
                >
                    <MenuItem value={10}>Kontrolle</MenuItem>
                    <MenuItem value={20}>Implantant</MenuItem>
                    <MenuItem value={30}>Schmerzen</MenuItem>
                </Select>
            </FormControl>
            <Collapse in={behandlung} style={{ width: "100%" }} classes={{ root: "collapse" }}>
                <ul className="sprechstunden">
                    {aktulleZeit.map(item => {
                        return <li key={item.id}>
                            <div className="termin-hour">
                                <p>{item.time}</p>
                                <ul>
                                    {item.hours.map(hour => <li onClick={() => handleSelectTime(item.id, hour.id)}>{hour.hour}</li>)}
                                </ul>
                            </div>
                            <Collapse in={selectedDateID === item.id} style={{ border: "3px solid blue", padding: "2rem" }}>
                                <div className="show-termin">

                                    Ihr Termim am {item.time} um {item.hours.find(hour => hour.id === selectedHourID)?.hour} Uhr.
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