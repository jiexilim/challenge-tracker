import React, { useState, useEffect } from 'react'

const ProgressBar = ({ percent, completed, due }) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(Number(percent) * 500)
    });

    return (
        <div id="progress-div">
            <div style={{ width: `${value}px` }} id="progress">
            </div>
            <div id="progress-data">
                <div>{`${completed}`}</div>
                <div id="last-child">{`${due}`}</div>
            </div>
        </div>
    )
}

export default ProgressBar

