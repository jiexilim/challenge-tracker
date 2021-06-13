import React, { useState, useEffect } from 'react'

const DBProgressBar = ({ percent }) => {
    const [value, setValue] = useState(0);
    const [percentString, setPercentString] = useState(0)

    useEffect(() => {
        setValue(Number(percent) * 300)
        setPercentString(Number.isNaN(percent) ? 0 : Math.round((Number(percent) * 100) * 10) / 10)
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

