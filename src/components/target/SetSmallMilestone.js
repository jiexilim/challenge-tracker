import React, { useState } from 'react'

const SetSmallMilestone = ({ onSet }) => {
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(0);
    const [dateType, setDateType] = useState('wk');

    const onClick = (event) => {
        onSet(title, duration, dateType)
        setTitle("");
        setDuration(0);
        setDateType('wk');
    }

    return (
        <div>
            <div className="form-group">
                <label>
                    <h4>What is your small milestone?</h4>
                    <input
                        type="text"
                        placeholder="Your small milestone"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
            </div>

            <div className="form-group">
                <label>
                    <h4>Give your milestone a duration to complete.</h4>
                    <input
                        type="number"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                    <select className="drop-down" onChange={(e) => setDateType(e.target.value)}>
                        <option value="wk">Week(s)</option>
                        <option value="mth">Month(s)</option>
                        <option value="yr">Year(s)</option>
                    </select>
                </label>
                <br />
                <button type="button" className="sub-btn" onClick={onClick}>Set</button>
            </div>
        </div>
    )
}

export default SetSmallMilestone