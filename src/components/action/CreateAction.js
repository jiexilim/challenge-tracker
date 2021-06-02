import React, { useState } from 'react'
import { Checkbox } from "antd";
import { useServer } from "../../Server"
import DatePicker from 'react-date-picker'
//import "antd/dist/antd.css";
const axios = require("axios");

const dateForDayOfWeek = (ISODate, dayOfWeek) => {
    let date = new Date(ISODate);
    let result = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (7 + dayOfWeek - date.getDay()) % 7)

    if (result <= date)
        result.setDate(result.getDate() + 7)

    return result.getTime();
}

const CreateAction = ({ target }) => {
    const serverURL = useServer();
    const [noDuplicate, setNoDuplicate] = useState(false)
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date())
    const [freq, setFreq] = useState("1");
    const [checkedDays, setCheckedDays] = useState([])

    const onSubmit = async (event) => {
        event.preventDefault();
        let dates = [];
        let actions = []

        if (noDuplicate) {
            actions.push({ title, date, targetId: target._id })
        } else {
            for (let day of checkedDays) {
                console.log(day)
                let actionDate = (new Date()).getTime();
                const endDate = Date.parse(target.endDate);
                while (actionDate <= endDate) {
                    actionDate = dateForDayOfWeek(actionDate, day)
                    if (actionDate <= endDate) {
                        dates.push(actionDate);
                    }
                }
            }

            dates.sort((d1, d2) => {
                return d1 - d2
            })

            dates = dates.map(ISO => new Date(ISO))

            for (let dateElement of dates) {
                actions.push({ title, date: dateElement, targetId: target._id })
            }
        }
        axios.post(serverURL + "/action/create", actions)
            .then(res => console.log(res.data));
    };

   

    const onChange = (checkedValues) => {

        setCheckedDays(checkedValues);
    }

    const isDisabled = (id) => {
        return (
          checkedDays.length >= Number(freq) && checkedDays.indexOf(id) === -1
        );
      };

    return (
        <div className="content">
            <form onSubmit={onSubmit}>
                <h1>Step to your Target.</h1>

                <div>
                    <label>
                        Your Step.
                    <br />
                        <input
                            type="text"
                            placeholder=""
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Do you want to duplicate this Step to
                        <select
                            className="space-element"
                            name="selectFreq"
                            onChange={(e) => setFreq(e.target.value)}>
                            <option value="1">Once</option>
                            <option value="2">Twice</option>
                            <option value="3">Thrice</option>
                            <option value="4">4 Times</option>
                            <option value="5">5 Times</option>
                            <option value="6">6 Times</option>
                            <option value="7">7 Times</option>
                        </select>
                        {/* <select
                            className="space-element"
                            name="selectDate"
                            onChange={(e) => setDateType(e.target.value)}>
                            <option value="wk">per week</option>
                            <option value="mth">per month</option>
                        </select> */}
                        {"     " + "per week on"}
                        <span className="space-element">
                            <Checkbox.Group onChange={onChange}>
                                <Checkbox value="0" disabled={isDisabled("0")}>
                                    Sun
                                </Checkbox>
                                <Checkbox value="1" disabled={isDisabled("1")}>
                                    Mon
                                </Checkbox>
                                <Checkbox value="2" disabled={isDisabled("2")}>
                                    Tues
                                </Checkbox>
                                <Checkbox value="3" disabled={isDisabled("3")}>
                                    Wed
                                </Checkbox>
                                <Checkbox value="4" disabled={isDisabled("4")}>
                                    Thurs
                                </Checkbox>
                                <Checkbox value="5" disabled={isDisabled("5")}>
                                    Fri
                                </Checkbox>
                                <Checkbox value="6" disabled={isDisabled("6")}>
                                    Sat
                                </Checkbox>
                            </Checkbox.Group>
                        </span>
                    </label>
                    <label>
                        <input
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                            type="checkbox"
                            checked={noDuplicate}
                            onChange={() => setNoDuplicate(!noDuplicate)}
                        /> Nope
                    </label>
                    <br />
                    {noDuplicate ?
                        <label>
                            Is there a date this Step should be completed on ?
                          <br />
                            <DatePicker
                                value={date}
                                showTimeSelect
                                onSelect={(date) => setDate(date)}
                                onChange={(date) => setDate(date)}
                            />
                        </label> :
                        null}

                </div>

                <input type="submit" value="Set" className="btn btn-block" />
            </form>
        </div>
    );
}

export default CreateAction
