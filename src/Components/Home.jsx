import axios from 'axios';
import React, { useState } from 'react';
import styles from "../Styles/Home.module.css"
import ReactJson from 'react-json-view'
import { ReactCodeJar } from "react-codejar";
import { useDispatch, useSelector } from 'react-redux';
import { storeHistory } from '../Redux/app/action';

const highlight = editor => {
    let code = editor.textContent;
    code = code.replace(/\((\w+?)(\b)/g, '(<font color="#E77D01">$1</font>$2');
    editor.innerHTML = code;
};

const Home = () => {
    const dispatch = useDispatch()
    const [jsonData, setJsonData] = useState(null)
    const [method, setMethod] = useState("GET")
    const [statusCode, setStatusCode] = useState(null)
    const [reqURL, setReqUrl] = useState("https://reqres.in/api/users")
    const [bodyType, setBodyType] = useState("")
    const [bodyData, setbodyData] = useState(``)
    const [theme, setTheme] = useState("summerfruit")
    const [indent, setIndent] = useState(4)
    const history = useSelector(state => state.app.history)
    
    const handleReq = () => {

        saveReq()

        if(method === "GET"){
            axios.get(reqURL)
            .then((res) => 
                {
                    setStatusCode(res.status)
                    console.log(res);
                    if(res.status === 200){
                        setJsonData(res.data)
                    } else {
                        setJsonData(res)
                    }
                }
            )
            .catch((err) => 
                {console.log(err)
                alert(err)})
        } else if (method === "POST"){
            axios.post(reqURL, bodyData)
            .then((res) => 
                {
                    setStatusCode(res.status)
                    if(res.status === 200 || res.status === 201){
                    setJsonData(res.data)
                } else {
                    setJsonData(res)
                }}
            )
            .catch((err) => 
                {console.log(err)
                alert(err)})
        } else if (method === "PUT"){
            axios.put(reqURL, bodyData)
            .then((res) => 
                {
                    setStatusCode(res.status)
                    if(res.status === 200 || res.status === 201){
                    setJsonData(res.data)
                } else {
                    setJsonData(res)
                }}
            )
            .catch((err) => 
                {console.log(err)
                alert(err)})
        }  else if (method === "PATCH"){
            axios.patch(reqURL, bodyData)
            .then((res) => 
                {
                    setStatusCode(res.status)
                    if(res.status === 200 || res.status === 201){
                    setJsonData(res.data)
                } else {
                    setJsonData(res)
                }}
            )
            .catch((err) => 
                {console.log(err)
                alert(err)})
        }  else if (method === "DELETE"){
            axios.delete(reqURL)
            .then((res) => 
                {   
                    setStatusCode(res.status)
                    console.log(res.data);
                    if(res.status === 204 || res.status === 200){
                    setJsonData(res.data)
                } else {
                    alert(res)
                }}
            )
            .catch((err) => 
                {console.log(err)
                alert(err)})
        }
    }

    // save hostory in redux
    const saveReq = () => {
        let newReq = [...history, {
            "method": method,
            "reqURL": reqURL
        }]

        dispatch(storeHistory(newReq))
        console.log(history);
    }

    // clear history request
    const clearReq = () => {
        dispatch(storeHistory([]))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.historyDiv}>
                <button className={styles.historyBtn} onClick={clearReq}>Clear History</button>
                {
                    history && history.slice(0).reverse().map((el, index) => 
                    
                    <div className={styles.reqHistoryCard} key={index} onClick={() => {setReqUrl(el.reqURL); setMethod(el.method)}}>
                        <h4 className={styles.reqHistoryCardMethod}>{el.method}</h4>
                        <h5 className={styles.reqHistoryCardURL}>{el.reqURL}</h5>
                    </div>)
                }
            </div>
            <div className={styles.pageWrapper}>
                <div className={styles.topBar}>
                    <select className={styles.methodBtn}>
                        <option value="GET" onClick={(e) => setMethod(e.target.value)}>GET</option>
                        <option value="POST" onClick={(e) => setMethod(e.target.value)}>POST</option>
                        <option value="PUT" onClick={(e) => setMethod(e.target.value)}>PUT</option>
                        <option value="PATCH" onClick={(e) => setMethod(e.target.value)}>PATCH</option>
                        <option value="DELETE" onClick={(e) => setMethod(e.target.value)}>DELETE</option>
                    </select>
                    <input className={styles.reqInput} value={reqURL} onChange={(e) => setReqUrl(e.target.value)} type="text" placeholder="Enter Request URL"/>
                    <button className={styles.sendBtn} onClick={handleReq}>SEND</button>
                </div>

                <div className={styles.bodyTypeDiv}>
                    <div className={styles.bodyOptionDiv}>
                        <input type="radio" name="body" value="none" defaultChecked onClick={(e) => setBodyType(e.target.value)}/>
                        <label htmlFor="none">none</label>
                    </div>
                    <div  className={styles.bodyOptionDiv}>
                        <input type="radio" name="body" value="raw" onClick={(e) => setBodyType(e.target.value)} />
                        <label htmlFor="raw">raw</label>
                    </div>
                
                </div>

                {
                    bodyType === "raw" && 
                    <ReactCodeJar
                    code={bodyData} // Initial code value
                    onUpdate={setbodyData} // Update the text
                    highlight={highlight} // Highlight function, receive the editor
                    style={{width: "100%", height: "120px", background: "#151515", textAlign: "justify", color: "#F8F8F7"}}
                    />
                }

                <div>
                    
                        {
                            jsonData && 
                            <div>
                                <div className={styles.reactJarOption}>
                                    <select className={styles.rjOption}>
                                        <option value="summerfruit" onClick={(e) => setTheme(e.target.value)}>Select Theme - Default</option>
                                        <option value="bright" onClick={(e) => setTheme(e.target.value)}>bright</option>
                                        <option value="chalk" onClick={(e) => setTheme(e.target.value)}>chalk</option>
                                        <option value="monokai" onClick={(e) => setTheme(e.target.value)}>monokai</option>
                                        <option value="ocean" onClick={(e) => setTheme(e.target.value)}>ocean</option>
                                        <option value="paraiso" onClick={(e) => setTheme(e.target.value)}>paraiso</option>
                                        <option value="pop" onClick={(e) => setTheme(e.target.value)}>pop</option>
                                        <option value="railscasts" onClick={(e) => setTheme(e.target.value)}>railscasts</option>
                                        <option value="shapeshifter" onClick={(e) => setTheme(e.target.value)}>shapeshifter</option>
                                        <option value="shapeshifter:inverted" onClick={(e) => setTheme(e.target.value)}>shapeshifter:inverted</option>
                                        <option value="solarized" onClick={(e) => setTheme(e.target.value)}>solarized</option>
                                        <option value="twilight" onClick={(e) => setTheme(e.target.value)}>twilight</option>
                                        <option value="bright:inverted" onClick={(e) => setTheme(e.target.value)}>bright:inverted</option>
                                    </select>
                                    <select className={styles.rjOption}>
                                        <option>Indentation Width</option>
                                        <option value={2} onClick={(e) => setIndent(e.target.value)}>2</option>
                                        <option value={4} onClick={(e) => setIndent(e.target.value)}>4</option>
                                        <option value={6} onClick={(e) => setIndent(e.target.value)}>6</option>
                                        <option value={8} onClick={(e) => setIndent(e.target.value)}>8</option>
                                        <option value={10} onClick={(e) => setIndent(e.target.value)}>10</option>
                                    </select>
                                    {
                                        statusCode && <h4 className={styles.statusCode}>Status Code: {statusCode}</h4>
                                    }
                                </div>
                                <ReactJson 
                                                    src={jsonData} 
                                                    theme={theme}
                                                    iconStyle="triangle" 
                                                    enableClipboard={false} 
                                                    displayDataTypes={false}
                                                    style={{padding: "20px"}}
                                                    indentWidth={indent}
                                                />
                            </div>
                        }
                        
                </div>
            </div>
        </div>
    )
}

export {Home}