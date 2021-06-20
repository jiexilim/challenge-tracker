import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { useServer } from "../../Server"
import Goal from "../goal/Goal"
import CreateGoal from "../goal/CreateGoal"
import ModalForm from "./ModalForm"
import jwt from "jsonwebtoken"
import axios from "axios"
import { Button } from '@material-ui/core'
import { useStyles } from "../../functions"

const Dashboard = ({ history }) => {
    const serverURL = useServer()
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [goals, setGoals] = useState([])
    const [openForm, setOpenForm] = useState(false)
    let tasksStorage = []

    const auth = localStorage.getItem("userAccess")
    const decoded = jwt.decode(auth)

    useEffect(async () => {
        const goalsRes = await axios.get(serverURL + "/goal/",
            { params: { userId: decoded.id } })

        setGoals(goalsRes.data)
        setLoading(false)
        for (let goal of goalsRes.data) {
            const tasksRes = await axios.get(serverURL + "/task/", { params: { goalId: goal._id } })
            tasksRes.data.map((task) => task.color = goal.color)

            tasksStorage.push(...tasksRes.data)
        }

        localStorage.data = JSON.stringify(tasksStorage);
    }, [goals])

    const accessGoal = async (id) => {
        history.push(`/goal/${id}`)
    }
    return (
        !loading && ((goals.length === 0) ?
            <div className="content">
                <Button
                    classes={{ root: classes.mainBlueButton }}
                    variant="contained"
                    onClick={() => setOpenForm(true)}
                >
                    ADD YOUR FIRST GOAL
                </Button>
                <ModalForm
                    openForm={openForm}
                    closeForm={() => setOpenForm(false)}
                    FormComponent={CreateGoal}
                />
            </div > :
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
        ))

}

export default withRouter(Dashboard)
