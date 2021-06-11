import React, { useState } from 'react'
import { handleEnter, dateForDayOfNextWeek, dateForNextRecurrence } from "../../functions"
import DatePicker from 'react-date-picker'
import { Button } from "@material-ui/core"
import { Checkbox } from "antd";

const RecurringTaskForm = ({ onSubmit, popupState }) => {
    const goal = JSON.parse(localStorage.getItem('currentGoal'));
    const [showNotesForm, setShowNotesForm] = useState(false)
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [recurEvery, setRecurEvery] = useState('wk')
    const [checkedDays, setCheckedDays] = useState([])
    const [endAfter, setEndAfter] = useState("countReached")
    const [endDate, setEndDate] = useState(new Date())
    const [count, setCount] = useState(0)
    const [notes, setNotes] = useState("")

    const onClick  = () => {
        let dates = []
        let dateInc = startDate
    
        if (endAfter === "countReached") {
            for (let i = 0; i < count; i++) {
                if (recurEvery === "wk") {
                    if (dates.length === 0 && checkedDays.includes(startDate.getDay().toString())) {
                        dates.push(dateInc)
                        continue
                    }
                    for (let day of checkedDays) {
                        dateInc = dateForDayOfNextWeek(dateInc, day)
                        dates.push(dateInc)
                    }
                } else {
                    dates.push(dateInc)
                    dateInc = dateForNextRecurrence(dateInc, recurEvery)
                }
            }
        } else {
            while (dateInc.getTime() <= endDate.getTime()) {
                if (recurEvery === "wk") {
                    if (dates.length === 0 && checkedDays.includes(startDate.getDay().toString())) {
                        dates.push(dateInc)
                        continue
                    }
                    for (let day of checkedDays) {
                        dateInc = dateForDayOfNextWeek(dateInc, day)
                        dateInc.getTime() <= endDate.getTime() && dates.push(dateInc) 
                    }
                } else {
                    dates.push(dateInc)
                    dateInc = dateForNextRecurrence(dateInc, recurEvery)
                }
            }
        }

        dates.sort((d1, d2) => {
            return d1 - d2
        })

        const computeRecurDatesInfo = { startDate, recurEvery, checkedDays, endAfter, endDate, count }

        onSubmit({title, type: 'recurring', dates, notes, goalId: goal._id, computeRecurDatesInfo })

    }

    return (
        <div style={{  overflowY: "scroll",  height: "300px", width: "auto" }}>

            <div className="small-form-group" >
                <label>
                    <h4>Your Task:</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
            </div>

            <div className="small-form-group"  onKeyDown={handleEnter}>
                <label>
                    <h4>Start on:</h4>
                    <DatePicker
                        value={startDate}
                        showTimeSelect
                        onSelect={(date) => setStartDate(date)}
                        onChange={(date) => setStartDate(date)}
                    />
                </label>
            </div>

            <div style={{ display: "flex", justifyItems: "left" }}>
            <div className="small-form-group"  style={{ flex: 1 }}>
                <label>
                    <h4>Recur every:</h4>
                    <select className="sub-btn" onChange={(e) => setRecurEvery(e.target.value)}>
                        <option value="wk">Week</option>
                        <option value="fn">Fortnight</option>
                        <option value="fw">Four weeks</option>
                        <option value="mth">Month</option>
                        <option value="yr">Year</option>
                    </select>
                </label>
            </div>

            {
                recurEvery === 'wk' &&
                <Checkbox.Group onChange={(checkedValues) => setCheckedDays(checkedValues)} style={{ flex: 2, paddingTop: "30px" }}>
                    <Checkbox style={{ padding: "5px" }} value="0"> Sun</Checkbox>
                    <Checkbox style={{ padding: "5px" }} value="1"> Mon</Checkbox>
                    <Checkbox style={{ padding: "5px" }} value="2"> Tues</Checkbox>
                    <Checkbox style={{ padding: "5px" }} value="3"> Wed</Checkbox>
                    <br />
                    <Checkbox style={{ padding: "5px" }} value="4"> Thurs</Checkbox>
                    <Checkbox style={{ padding: "5px" }} value="5"> Fri</Checkbox>
                    <Checkbox style={{ padding: "5px" }} value="6"> Sat</Checkbox>
                </Checkbox.Group>
            }
            </div>

            <div style={{ display: "flex", justifyItems: "left" }}>
            <div className="small-form-group" style={{ flex: 2 }}>
                <label>
                    <h4>End after:</h4>
                    <select className="sub-btn" onChange={(e) => setEndAfter(e.target.value)}>
                        <option value="countReached">Count Reached</option>
                        <option value="dateReached">Date Reached</option>
                    </select>
                </label>
            </div>

            {
                endAfter === "dateReached" &&
                <div className="small-form-group"  onKeyDown={handleEnter} style={{ flex: 3 }}>
                    <label>
                        <h4>End on:</h4>
                        <DatePicker
                            value={endDate}
                            showTimeSelect
                            onSelect={(date) => setEndDate(date)}
                            onChange={(date) => setEndDate(date)}
                        />
                    </label>
                </div>
            }

            {
                endAfter === "countReached" &&
                <div className="small-form-group"  onKeyDown={handleEnter} style={{ flex: 3 }}>
                    <label>
                        <h4>Count:</h4>
                        <input
                            className="sub-btn"
                            type="number"
                            placeholder="Count"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </label>
                </div>
            }
            </div>

            <Button color="default" variant="outlined" onClick={() => setShowNotesForm(true)}>
                    ADD NOTES
            </Button>
        
            {
                showNotesForm &&
                <div className="small-form-group" style={{ padding: "10px" }} onKeyDown={handleEnter}>
                    <label>
                        <h4>Notes: (Opt)</h4>
                        <textarea
                            placeholder="Your notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={5}
                            cols={50}
                        />
                    </label>
                </div>
            }
            <br />
            <Button style={{
                    display: "block", background: "none",
                    float: "left", border: "none", padding: "none",
                    color: "#0290B0", textDecoration: "underline", padding: "10px 10px",
                    margin: "5px", marginTop: "30px"
                }} onClick={popupState.close}>
                    Cancel
                
            </Button>

            <Button style={{ backgroundColor: '#0290B0', color: 'white', padding: "10px 10px",
                    margin: "20px", float: "right" }} variant="contained" onClick={() => {
                popupState.close()
                onClick()
            }}>
                SAVE
            </Button>

        </div>
    )
}

export default RecurringTaskForm
