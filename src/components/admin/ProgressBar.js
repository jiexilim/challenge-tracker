import React, { useState, useEffect } from 'react'

const ProgressBar = ({ width, percent, completed, due }) => {
    const [value, setValue] = useState(0);

    React.useEffect(() => {
        setValue(percent * width);
    });

    return (
        <div className="progress-div" style={{ width: (width + 6) }}>
            <span style={{ paddingLeft: "10px", fontWeight: "bold", display: "inline-flex" }}>{`${completed}`}</span>
            <span style={{ paddingRight: "10px", fontWeight: "bold", float: "right" }}>{`${due}`}</span>
            <div style={{ width: `${value}px` }} className="progress" />
        </div>
    )
}

export default ProgressBar

