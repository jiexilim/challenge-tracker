import React, { useState, useEffect } from 'react'
import { useServer } from "../../Server"
import SingleTaskForm from './SingleTaskForm'
import RecurringTaskForm from "./RecurringTaskForm"
import { Button } from '@material-ui/core'
import axios from "axios"

const AddTaskForm = ({ popupState }) => {
    const serverURL = useServer()
    const [type, setType] = useState("single")

    useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = null
        }
    })

    const onSubmit = (task) => {
        axios.post(serverURL + "/target/create", task)
            .then(res => console.log(res.data));
    }

    return (

        <div style={{
            display: "block", zIndex: 1000000, background: "white", position: "sticky",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            padding: "10px", width: "400px", alignContent: "center"
        }}>

            <div style={{ background: "white", paddingBottom: "10px", borderBottom: "solid grey", borderWidth: "thin" }}>
                <Button color="default" variant="outlined" style={{ marginRight: "20px" }} onClick={() => {
                    setType("single")
                }}>
                    SINGLE TASK
            </Button>
                <Button color="default" variant="outlined" onClick={() => {
                    setType("recurring")
                }}>
                    RECURRING TASK
            </Button>
            </div>

            <form onSubmit={onSubmit} className="form-group">
                {type === 'single' && <SingleTaskForm onSubmit={onSubmit} popupState={popupState} />}
                {type === 'recurring' && <RecurringTaskForm onSubmit={onSubmit} popupState={popupState} />}
            </form>
        </div>
    )
}

export default AddTaskForm