import React, { useState } from 'react';

const FormRow = () => {

    const [value, setValueType] = useState("text")

    return (
        <div>
            <input placeholder="Key"/>
            <select>
                <option value="text" onClick={(e) => setValueType(e.target.value)}>Text</option>
                <option value="file" onClick={(e) => setValueType(e.target.value)}>File</option>
            </select>
            {
                value === "file" ?
                <input type="file" placeholder="Value"/> :
                <input type="text" placeholder="value"/>
            }
        </div>
    )
}

export {FormRow}