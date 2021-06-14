import React, { useState } from 'react'
import { handleEnter, dateForDayOfNextWeek, dateForNextRecurrence, useStyles } from "../../functions"
import DatePicker from 'react-date-picker'
import { Button, TextField, FormControl, Select, FormControlLabel, FormGroup, Checkbox } from "@material-ui/core"

const EditRecurringtask = ({ task, onSubmit, onDelete, popupState }) => {
    const classes = useStyles()
    const [name, setName] = useState(task.name)
    const [dates, setDates] = useState(task.dates)
    const [numCompleted, setNumCompleted] = useState(task.numCompleted)
    const [notes, setNotes] = useState(task.notes)
    const taskId = task._id
    const isCompleted = task.isCompleted
    // compute recur info
    const [startDate, setStartDate] = useState(task.computeRecurDatesInfo.startDate)
    const [recurEvery, setRecurEvery] = useState(task.computeRecurDatesInfo.recurEvery)
    const [checkedDays, setCheckedDays] = useState(task.computeRecurDatesInfo.checkedDays)
    const { sun, mon, tue, wed, thu, fri, sat } = checkedDays
    const [endAfter, setEndAfter] = useState(task.computeRecurDatesInfo.endAfter)
    const [endDate, setEndDate] = useState(task.computeRecurDatesInfo.endDate)
    const [count, setCount] = useState(task.computeRecurDatesInfo.count)

    const onSave = () => {
        popupState.close()
        let dates = []
        let dateInc = startDate

        // if (recurEvery !== "wk") { setCheckedDays([]) }
        const computeRecurDatesInfo = { startDate, recurEvery, checkedDays, endAfter, endDate, count }

        if (JSON.stringify(computeRecurDatesInfo) !== JSON.stringify(task.computeRecurDatesInfo)) {
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
                while (dateInc.getTime() <= new Date(endDate).getTime()) {
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

            setDates(dates)
            setNumCompleted(0)
        }

        onSubmit({ name, type: 'recurring', dates, numCompleted, computeRecurDatesInfo, notes, isCompleted })
    }

    const onCheck = (event) => {
        setCheckedDays({ ...checkedDays, [event.target.name]: event.target.checked });
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
                    <FormGroup row>
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={sun}
                                onChange={onCheck}
                                name="sun"
                                className={classes.subCheckBox}
                            />}
                            label="Sun"
                        />
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={mon}
                                onChange={onCheck}
                                name="mon"
                                className={classes.subCheckBox}
                            />}
                            label="Mon"
                        />
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={tue}
                                onChange={onCheck}
                                name="tue"
                                className={classes.subCheckBox}
                            />}
                            label="Tue"
                        />
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={wed}
                                onChange={onCheck}
                                name="wed"
                                className={classes.subCheckBox}
                            />}
                            label="Wed"
                        />
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={thu}
                                onChange={onCheck}
                                name="thu"
                                className={classes.subCheckBox}
                            />}
                            label="Thu"
                        />
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={fri}
                                onChange={onCheck}
                                name="fri"
                                className={classes.subCheckBox}
                            />}
                            label="Fri"
                        />
                        <FormControlLabel
                            classes={{ label: classes.daysLabel }}
                            control={<Checkbox
                                checked={sat}
                                onChange={onCheck}
                                name="sat"
                                className={classes.subCheckBox}
                            />}
                            label="Sat"
                        />
                    </FormGroup>
                    // <Checkbox.Group
                    //     className="day-type-checkboxes"
                    //     defaultValue={checkedDays}
                    //     onChange={(checkedValues) => setCheckedDays(checkedValues)}
                    // >
                    //     <Checkbox value="0"> Sun</Checkbox>
                    //     <Checkbox value="1"> Mon</Checkbox>
                    //     <Checkbox value="2"> Tues</Checkbox>
                    //     <Checkbox value="3"> Wed</Checkbox>
                    //     <Checkbox value="4"> Thurs</Checkbox>
                    //     <Checkbox value="5"> Fri</Checkbox>
                    //     <Checkbox value="6"> Sat</Checkbox>
                    // </Checkbox.Group>
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
                    onClick={onDelete}
                >
                    DELETE
                </Button>
                <Button
                    classes={{ root: classes.blueButton }}
                    onClick={onSave}
                >
                    SAVE
                </Button>
            </div>

        </div>
    )
}

export default EditRecurringtask
