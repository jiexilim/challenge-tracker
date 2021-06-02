import React, { useState, useRef } from 'react'

const InputTag = ({ onChange }) => {
    const [tags, setTags] = useState([]);
    let textInput = useRef(null);
    onChange(tags)
  
    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const inputKeyPress = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            e.preventDefault();
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            textInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };

    return (
        <div className="input-tag">
            <ul className="input-tag__tags">
                {tags.map((tag, i) => (
                    <li key={tag}>
                        {tag}
                        <button type="button" onClick={() => { removeTag(i); }}>+</button>
                    </li>
                ))}
                <li className="input-tag__tags__input"><input type="text" onKeyPress={inputKeyPress} ref={c => { textInput = c; }} /></li>
            </ul>
        </div>
    )
}

export default InputTag
