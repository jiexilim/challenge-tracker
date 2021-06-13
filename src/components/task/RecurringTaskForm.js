import React, { useState } from 'react'
import { handleEnter, dateForDayOfNextWeek, dateForNextRecurrence, useStyles } from "../../functions"
import { useParams } from "react-router-dom"
import DatePicker from 'react-date-picker'
import { Button, TextField, FormControl, Select } from "@material-ui/core"
import { Checkbox } from "antd";

const RecurringTaskForm = ({ onSubmit, popupState }) => {
    const { id } = useParams()
    const classes = useStyles()
    const [showNotesForm, setShowNotesForm] = useState(false)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    // compute recur info
    const [startDate, setStartDate] = useState(new Date())
    const [recurEvery, setRecurEvery] = useState('wk')
    const [checkedDays, setCheckedDays] = useState([])
    const [endAfter, setEndAfter] = useState("countReached")
    const [endDate, setEndDate] = useState(new Date())
    const [count, setCount] = useState(0)

    const onClick = () => {
        popupState.close()

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

        onSubmit({ name, type: 'recurring', dates, notes, computeRecurDatesInfo, goalId: id })
    }

    return (
        <div className="task-form">
            <div onKeyDown={handleEnter}>
                <p>Task name:</p>
                <TextField
                    variant="outlined"
                    classes={{ root: classes.taskInput }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div onKeyDown={handleEnter}>
                <p>Start on:</p>
                <DatePicker
                    value={startDate}
                    showTimeSelect
                    onSelect={(date) => setStartDate(date)}
                    onChange={(date) => setStartDate(date)}
                />
            </div>
            <div className="recurring-task-recur-every">
                <p>Recur every:</p>
                <FormControl variant="outlined" className={classes.dropDown}>
                    <Select
                        native
                        value={recurEvery}
                        onChange={(e) => setRecurEvery(e.target.value)}
                    >
                        <option value="wk">Week</option>
                        <option value="fn">Fortnight</option>
                        <option value="fw">Four weeks</option>
                        <option value="mth">Month</option>
                        <option value="yr">Year</option>
                    </Select>
                </FormControl>
                {
                    recurEvery === 'wk' &&
                    <Checkbox.Group
                        className="day-type-checkboxes"
                        onChange={(checkedValues) => setCheckedDays(checkedValues)} >
                        <Checkbox value="0"> Sun</Checkbox>
                        <Checkbox value="1"> Mon</Checkbox>
                        <Checkbox value="2"> Tues</Checkbox>
                        <Checkbox value="3"> Wed</Checkbox>
                        <Checkbox value="4"> Thurs</Checkbox>
                        <Checkbox value="5"> Fri</Checkbox>
                        <Checkbox value="6"> Sat</Checkbox>
                    </Checkbox.Group>
                }
            </div>
            <div className="recurring-task-end-after">
                <div>
                    <p>End after:</p>
                    <FormControl variant="outlined" className={classes.dropDown}>
                        <Select
                            native
                            value={endAfter}
                            onChange={(e) => setEndAfter(e.target.value)}
                        >
                            <option value="countReached">Count Reached</option>
                            <option value="dateReached">Date Reached</option>
                        </Select>
                    </FormControl>
                </div>
                {
                    endAfter === "dateReached" &&
                    <div
                        className="date-count"
                        onKeyDown={handleEnter}
                    >
                        <p>Date:</p>
                        <DatePicker
                            value={endDate}
                            showTimeSelect
                            onSelect={(date) => setEndDate(date)}
                            onChange={(date) => setEndDate(date)}
                        />
                    </div>
                }
                {
                    endAfter === "countReached" &&
                    <div onKeyDown={handleEnter}>
                        <p>Count:</p>
                        <TextField
                            type="number"
                            variant="outlined"
                            classes={{ root: classes.taskInput }}
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </div>
                }
            </div>
            <div onKeyDown={handleEnter}>
                {
                    !showNotesForm &&
                    <Button
                        classes={{ root: classes.subBlueButton }}
                        onClick={() => setShowNotesForm(true)}
                    >
                        ADD NOTES
                    </Button>
                }
                {
                    showNotesForm &&
                    <label>
                        <p>Notes:</p>
                        <TextField
                            classes={{ root: classes.taskInput }}
                            multiline={true}
                            placeholder="Notes"
                            variant="outlined"
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </label>
                }
            </div>
            <div className="task-form-btn-container">
                <Button
                    classes={{ root: classes.cancelButton }}
                    onClick={popupState.close}
                >
                    CANCEL
                </Button>
                <Button
                    classes={{ root: classes.blueButton }}
                    onClick={onClick}
                >
                    SAVE
                </Button>
            </div>
        </div>
    )
}

export default RecurringTaskForm
