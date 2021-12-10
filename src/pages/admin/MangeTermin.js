import "./manage.scss"
import AdminService from "../../service/adminService";
import { useEffect, useState } from "react";
import moment from "moment"
const MangeTermin = () => {
    const [terminList, setTerminList] = useState([])
    useEffect(() => {
        AdminService.getTerminApi().then((res) => {
            setTerminList(res.data)
        }).catch((err) => {
            console.log("error getTerminApi=", err)
        })
    }, [])
    const getCurrentDate = (date) => {
        const day = moment(date, "DD-MM-YYYY").format("dddd")
        switch (day) {
            case "Thursday":
                return "Donnerstag"
            case "Friday":
                return "Freitag"
            case "Wednesday":
                return "Mittwoch"
            case "Tuesday":
                return "Dienstag"
            case "Monday":
                return "Montag"
            case "Saturday":
                return "Samstag"
            case "Sunday":
                return "Sonntag"

            default:
                return ""
        }

    }
    const removeHour=(time,hour)=>{
AdminService.removeHourApi(time,hour).then((res) => {
    AdminService.getTerminApi().then((res) => {
        setTerminList(res.data)
    }).catch((err) => {
        console.log("error getTerminApi=", err)
    })
}).catch((err) => {
    console.log("error removeHourApi=", err)
})
    }
    return (
        <div className="manage">
            <h1>Manage Termin</h1>
            <div className="manage-content">
                <table>
                    <thead>
                        <tr>
                            <th>*</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                        </tr>
                    </thead>
                    <tbody>

                        {terminList.map((item) => <tr><td>{item.date + " " + getCurrentDate(item.date)}</td>
                            {item.hours.map((hourItem) => <td><div>
                                <p>{hourItem.free ? "free" : "reserved"}</p>
                               {hourItem.free && <button onClick={()=>removeHour(hourItem.hour,item.date)}>removeHour</button>}
                                </div>
                                </td>)}
                        </tr>)}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MangeTermin;