import React from 'react'
import { ImCross } from "react-icons/im"

const TempMileStone = ({ milestone, onDelete }) => {
    return (
        <div className="row-item">
            <ImCross className="pointer-item" size="10px" style={{display: 'inline-block', marginRight: '50px', color:"grey"}} onClick={() => onDelete(milestone.id)} />
            <h5 style={{display: 'inline-block', marginRight: '50px'}}>{milestone.title}</h5>
            <h5 style={{display: 'inline-block', marginRight: '50px'}}>{new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit', day: '2-digit'
            }).format(new Date(milestone.endDate))}</h5>
        </div>
    )
}

export default TempMileStone
