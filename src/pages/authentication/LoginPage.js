import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {login} from '../../contactServer/auth.js'
import {showNotification} from '../../component/layout/showNotifications.js'
function LoginPage(){
    const handle = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    function submitHandler(event){
        event.preventDefault();
        console.log()
        const enteredHandle = handle.current.value;
        const enteredPassword = password.current.value;

        attemptToLogin(enteredHandle, enteredPassword)
    }

    function attemptToLogin(handle, password){
        login(handle, password).then(res => {
            console.log(res)
            if(res.status === 'success'){
                setHint(null)
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("handle", handle);
                navigate('/profile/'+handle)
            }else{
                notification(res.message)
            }
        });
    }

    return <div className="login-body" style={{textAlign: 'center', height: '50%', margin: '0 auto'}}>
        <h2>LOGIN</h2>
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
            {hint && showNotification(hint, 'info')}
            <div>
                <a href={'/signup'}>Not an user yet?</a>
            </div>
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