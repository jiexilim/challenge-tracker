import React from 'react'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';

const formatDate = (ISO) => {
    const date = new Date(ISO)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let dt = date.getDate()

    if (dt < 10) {
        dt = '0' + dt
    }
    if (month < 10) {
        month = '0' + month
    }

    return (year + '-' + month + '-' + dt)
}

const Calendar = () => {
    var storedData = JSON.parse(localStorage.data)

    storedData.sort((t1, t2) => {
        return t1 - t2
    })

    let events = []

    for (let task of storedData) {
        let event = {}
        if (task.type === "single") {
            event = {
                title: task.name,
                date: formatDate(task.endDate),
                groupId: task.goalId,
                backgroundColor: task.color,
            }
        } else {
            event = {
                title: task.name,
                date: formatDate(task.dates[task.numCompleted]),
                groupId: task.goalId,
                backgroundColor: task.color,
            }
        }
        events.push(event)
    }

    return (
        <div className="content">
            <FullCalendar
                plugins={[listPlugin]}
                initialView="listDay"
                buttonText={{ today: "Today", day: "Day", week: "Week", month: "Month" }}
                events={events}
                eventDidMount={function (info) {
                    info.el.getElementsByClassName('fc-list-event-time')[0].style.display = "none"
                }}
                headerToolbar={{
                    left: 'prevYear,prev today next,nextYear',
                    center: 'title',
                    right: 'listDay,listWeek,listMonth'
                }}
                contentHeight={"auto"}
            // eventBackgroundColor={"#0290b0"}
            />
        </div>
    )
}

export default Calendar
