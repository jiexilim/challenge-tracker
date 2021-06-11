import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { useServer } from "../../Server"
import Goal from "../goal/Goal"
import CreateGoal from "../goal/CreateGoal"
import ModalForm from "./ModalForm"
import jwt from "jsonwebtoken"
import axios from "axios"
import { Button } from '@material-ui/core'
import { blueButton } from "../../functions"

const Dashboard = ({ history }) => {
    const serverURL = useServer()
    const classes = blueButton()
    const [goals, setGoals] = useState([])
    const [openForm, setOpenForm] = useState(false)

    const auth = localStorage.getItem("userAccess")
    const decoded = jwt.decode(auth)

    useEffect(() => {
        axios.get(serverURL + "/goal/",
            { params: { userId: decoded.id } })
            .then(res => setGoals(res.data))
            .catch(err => console.log(err))
    })

    const accessGoal = async (id) => {
        history.push(`/goal/${id}`)
    }

    if (goals.length === 0) {
        return (
            <div className="content">
                <Button 
                    classes={{ root: classes.root }}
                    variant="contained" 
                    onClick={() => setOpenForm(true)}
                >
                    ADD YOUR FIRST GOAL
                </Button>
                <ModalForm 
                    openForm={openForm} 
                    closeForm={()=>setOpenForm(false)} 
                    FormComponent={CreateGoal} 
                />
            </div >
        )
    } else {
        return (
            <div className="content">
                {
                    goals.map((goal, index) => (
                        <Goal
                            key={index}
                            goal={goal}
                            onAccess={accessGoal}
                        />
                    ))
                }
            </div>
        )
    }
}

export default withRouter(Dashboard)
