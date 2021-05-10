import axios from 'axios';
import React, { useState } from 'react';
import styles from "../Styles/Home.module.css"
import ReactJson from 'react-json-view'
import { ReactCodeJar } from "react-codejar";
import { FormRow } from './FormRaw';
import { useDispatch, useSelector } from 'react-redux';
import { addFormRow } from '../Redux/app/action';

const highlight = editor => {
    let code = editor.textContent;
    code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
    editor.innerHTML = code;
};

const Home = () => {


    const dispatch = useDispatch()
    const [bodyData, setbodyData] = useState(`{
        "name": "morpheus",
        "job": "leader"
    }`);
    const [jsonData, setJsonData] = useState(null)
    const [method, setMethod] = useState("get")
    const [reqURL, setReqUrl] = useState("https://reqres.in/api/users")
    const [bodyType, setBodyType] = useState("")
    const [formList, setFormList] = useState([])
    
    const handleReq = () => {

        console.log(bodyData);

        if(method === "get"){
            axios.get(reqURL)
            .then((res) => setJsonData(res.data))
        } else if (method === "post"){
            axios.post(reqURL, bodyData)
            .then((res) => setJsonData(res.data))
        }
    }

    const handleAddRow = () => {
        setFormList(formList.concat(<FormRow key={formList.length}/>));
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <select>
                    <option value="get" onClick={(e) => setMethod(e.target.value)}>GET</option>
                    <option value="post" onClick={(e) => setMethod(e.target.value)}>POST</option>
                    <option value="delete" onClick={(e) => setMethod(e.target.value)}>DELETE</option>
                    <option value="patch" onClick={(e) => setMethod(e.target.value)}>PATCH</option>
                    <option value="put" onClick={(e) => setMethod(e.target.value)}>PUT</option>
                </select>
                <input value={reqURL} onChange={(e) => setReqUrl(e.target.value)} type="text" placeholder="Enter Request URL"/>
                <button onClick={handleReq}>SEND</button>
            </div>

            <div>
                <div>
                    <input type="radio" name="body" value="none" defaultChecked onClick={(e) => setBodyType(e.target.value)}/>
                    <label htmlFor="none">rone</label>
                </div>
                <div>
                    <input type="radio" name="body" value="raw" onClick={(e) => setBodyType(e.target.value)} />
                    <label htmlFor="raw">raw</label>
                </div>
                <div>
                    <input type="radio" name="body" value="formData" onClick={(e) => setBodyType(e.target.value)}/>
                    <label htmlFor="formData">form-data</label>
                </div>
            </div>


            {
                bodyType === "raw" && 
                <ReactCodeJar
                code={bodyData} // Initial code value
                onUpdate={setbodyData} // Update the text
                highlight={highlight} // Highlight function, receive the editor
                style={{border: "1px solid red", width: "100%", height: "100px", background:"white", textAlign: "left"}}
                />
            }
    
            {
                bodyType === "formData" &&
                <div>
                    {formList}
                    <button onClick={() => handleAddRow()}>ADD ROW</button>
                </div>
            }

            {
                jsonData && <ReactJson 
                                src={jsonData} 
                                theme="summerfruit" 
                                iconStyle="triangle" 
                                enableClipboard={false} 
                                displayDataTypes={false}
                                style={{padding: "20px"}}
                            />
            }

            {/* <button onClick={handleCheck}>Check</button> */}
        </div>
    )
}

export {Home}