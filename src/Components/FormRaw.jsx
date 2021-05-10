import React, { useState } from 'react';

const FormRow = () => {

    const [valueType, setValueType] = useState("text")
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")

    console.log(key);
    console.log(value);
    return (
        <div>
            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Key"/>
            <select>
                <option value="text" onClick={(e) => setValueType(e.target.value)}>Text</option>
                <option value="file" onClick={(e) => setValueType(e.target.value)}>File</option>
            </select>
            {
                value === "file" ?
                <input type="file" placeholder="Value"/> :
                <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="value"/>
            }
        </div>
    )
}

export {FormRow}