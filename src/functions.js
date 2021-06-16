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
        return new Date(yyyy, mm + 1, dd)
    } else {
        return new Date(yyyy + 1, mm, dd)
    }
}

export const dateForDayOfNextWeek = (date, dayOfWeek) => {
    const dayList = { 'sun': 0, 'mon': 1, 'tue': 2, 'wed': 3, 'thu': 4, 'fri': 5, 'sat': 6 }
    let nextDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (7 + dayList[dayOfWeek] - date.getDay()) % 7)

    if (nextDate <= date)
        nextDate.setDate(nextDate.getDate() + 7)

    return nextDate;
}

export const useStyles = makeStyles((theme) => ({
    blueButton: {
        background: '#0290B0 !important',
        color: 'white !important',
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
    },
    subBlueButton: {
        background: "rgba(98, 138, 138, 1) !important",
        color: "white !important",
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
    },
    taskTypeButton: {
        '&:hover': {
            background: "rgba(98, 138, 138, 1) !important",
            color: "white",
        },
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
        width: "50%",
        borderBottom: "solid 1px #ccc !important",
        borderRadius: "0px !important",
    },
    clickedTaskTypeButton: {
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
        width: "50%",
        borderBottom: "solid 1px #ccc !important",
        borderRadius: "0px !important",
        background: "rgba(98, 138, 138, 1) !important",
        color: "white !important",
    },
    mainBlueButton: {
        background: '#0290B0 !important',
        color: 'white !important',
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
        fontSize: "20px !important",
    },
    cancelButton: {
        background: 'none !important',
        color: '#0290B0 !important',
    },
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
    },
    createGoalInput: {
        width: "100%",
        marginTop: "100px",
    },
    editGoalInput: {
        width: "100%",
        fontFamily: "Product Sans !important",
    },
    taskInput: {
        width: "95%",
        fontFamily: "Product Sans !important",
        padding: "0px !important",
    },
    dropDown: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    checkBox: {
        padding: "0px !important",
        color: "#0290B0 !important"
    },
    subCheckBox: {
        color: "#0290B0 !important",
    },
    daysLabel: {
        fontFamily: "Product Sans !important",
        fontSize: "15px !important",
        letterSpacing: "2px !important",
    },
    completeSkipButton: {
        '&:hover': {
            background: "rgba(98, 138, 138, 1) !important",
            color: "white",
        },
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
        width: "100%",
    },
    clickedCompleteSkipButton: {
        letterSpacing: "1px !important",
        fontFamily: "Product Sans !important",
        width: "100%",
        background: "rgba(98, 138, 138, 1) !important",
        color: "white !important",
    },

}))
