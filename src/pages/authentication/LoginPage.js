import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {login} from '../../contactServer/auth.js'

function LoginPage(){
    const handle = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [hint, setHint] = useState(null);
    //
    // const [startTime, setStartTime] = useState(new Date());
    // const [endTime, setEndTime] = useState(new Date());
    // const [hasAnnouncement, setHasAnnouncement] = useState(false)
    // const [announcement, setAnnouncement] = useState(null)

    function submitHandler(event){
        event.preventDefault();
        console.log()
        const enteredHandle = handle.current.value;
        const enteredPassword = password.current.value;

        attemptToLogin(enteredHandle, enteredPassword)
    }

    function attemptToLogin(handle, password){
        console.log("Send Request to server to create a contest")

        login(handle, password).then(res => {
            // console.log(res)
            if(res.error){
                setHint(res.error);
            }else{
                setHint(null)
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("handle", handle);
                // const accessToken = res.accessToken;
                navigate('/profile', {state: {userHandle: handle}})
            }
        });
    }

    return <div className="login-body">
        <h2>Login</h2>
        <div className="form">
            <div className="handle">
                <TextField
                    className="handle-text-field"
                    required
                    label="Handle"
                    inputRef={handle}
                >
                </TextField>
            </div>
            <div className="password">
                <TextField
                    className="password-text-field"
                    required
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    inputRef={password}
                    // variant="filled"
                >
                </TextField>
            </div>
            {hint && <div><p>{hint}</p></div>}
            <div className="submit-button">
                <Button
                    variant="contained"
                    onClick={submitHandler}>
                    Login
                </Button>
            </div>

        </div>
    </div>
}

export default LoginPage;