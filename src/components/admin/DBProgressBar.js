import React, { useState, useEffect } from 'react'

const DBProgressBar = ({ percent }) => {
    const [value, setValue] = useState(200);
    const [percentString, setPercentString] = useState("")

    useEffect(() => {
        setValue(Number(percent) * 300);
        setPercentString(percent * 100)
    });

    return (
        <div className="db-progress-div">
            <div style={{ width: `${value}px` }} className="db-progress" />
            <div className="db-progress-data">
                <div>{`${percentString}%`}</div>
            </div>
        </div>
    )
}

export default DBProgressBar

