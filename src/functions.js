import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

export const handleEnter = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        return false;
    }
}

export const dateForNextRecurrence = (date, recurEvery) => {
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();

    if (recurEvery === "fn") {
        return new Date(yyyy, mm, dd + 14);
    } else if (recurEvery === "fw") {
        return new Date(yyyy, mm, dd + 28);
    } else if (recurEvery === "mth") {
        return date.setMonth(mm + 1)
    } else {
        return date.setYear(yyyy + 1)
    }
}


export const dateForDayOfNextWeek = (date, dayOfWeek) => {
    let nextDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (7 + dayOfWeek - date.getDay()) % 7)

    if (nextDate <= date)
        nextDate.setDate(nextDate.getDate() + 7)

    return nextDate;
}

export const blueButton = makeStyles({
    root: {
      background: '#0290B0 !important',
      color: 'white !important',
      letterSpacing: "1px !important",
      fontFamily: "Product Sans !important",
    }
})

export const cancelButton = makeStyles({
    root: {
      background: 'none !important',
      color: '#0290B0 !important',
    }
})

export const modalStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#fff",
        boxShadow: "inset 0 0 2px #000000",
        padding: "60px",
        overflowY: "scroll",
        width: '50%',
    },
    view: {
        display: "flex",
        height: "100%",
        justifyContent: 'center',
    },
    cross: {
        color: "white",
        cursor: "pointer",
        margin: "15px",
    }
})

export const createGoalInput = makeStyles({
    root: {
        width: "100%",
        marginTop: "100px",
    }
})

export const editGoalInput = makeStyles({
    root: {
        width: "100%",
        fontFamily: "Product Sans !important",
    }
})