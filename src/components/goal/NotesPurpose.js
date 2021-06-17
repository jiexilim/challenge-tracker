import React from 'react'
import { AiFillPushpin } from "react-icons/ai"
import { FaQuoteLeft } from "react-icons/fa"

const NotesPurpose = ({ notes, purpose }) => {
    return (
        <div id="notes-purpose-container">
            <div className="sub-notes-purpose">
                <AiFillPushpin className="notes-purpose-icon" size={25} />
                {notes}
            </div>
            <div className="sub-notes-purpose">
                <FaQuoteLeft className="notes-purpose-icon" size={20} />
                {purpose}
            </div>
        </div>
    )
}

export default NotesPurpose
