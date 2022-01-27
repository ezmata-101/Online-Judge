import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {signUp} from '../../contactServer/auth.js'

function SignUpPage(){
    const handle = useRef();
    const fullName = useRef();
    const password = useRef();
    const confirmedPassword = useRef();
    const country = useRef();
    const institution = useRef();
    const email = useRef();
    const navigate = useNavigate();
    const [hint, setHint] = useState(null);
    const [misMatchedPass, setMismatchedPass] = useState(false);

    function submitHandler(event){
        event.preventDefault();
        const body = {
            handle: handle.current.value,
            name: fullName.current.value,
            password: password.current.value,
            email: email.current.value,
            country: country.current.value,
            institute: institution.current.value,
        }
        console.log(body);

        if(body.handle === "" || body.name === "" || body.password === "" || confirmedPassword.current.value === ""){
            setHint("at least one required field remained empty");
            return;
        }
        setHint(null)

        setMismatchedPass(body.password !== confirmedPassword.current.value);
        if(misMatchedPass) return;
        attemptToSignUp(body)
    }

    function attemptToSignUp(signUpRequest){
        signUp(signUpRequest).then(res => {
            console.log(res);
            if(res.error){
                setHint(res.error);
            }else{
                setHint(res.message);
                // localStorage.setItem("accessToken", res.accessToken);
            }
        });
    }

    function createTextField(fieldName, label, reference, isRequired = true){
        return <div className={fieldName}>
            <TextField
                className={fieldName+"-text-field"}
                required={isRequired}
                label={label}
                inputRef={reference}
            >
            </TextField>
        </div>
    }

    function createPasswordField(fieldName, label, reference){
        return <div className={fieldName}>
            <TextField
                error={fieldName === "confirm-password" && misMatchedPass}
                className={fieldName + "-text-field"}
                required
                id={"filled-"+fieldName+"-input"}
                label={label}
                type="password"
                autoComplete="current-password"
                inputRef={reference}
                helperText={fieldName === "confirm-password" && misMatchedPass? "Passwords didn't match": ""}
                />
        </div>
    }

    return <div className="SignUp-body">
        <h2>Sign Up</h2>
        <div className="form">
            {createTextField("handle", "Handle", handle)}
            {createTextField("name", "Full Name", fullName)}
            {createPasswordField("password", "Password", password)}
            {createPasswordField("confirm-password", "Confirm Password", confirmedPassword)}
            {createTextField("country", "Country", country, false)}
            {createTextField("institution", "Institution", institution, false)}
            {createTextField("email", "email", email, false)}




            {hint && <div><p>{hint}</p></div>}
            <div className="submit-button">
                <Button
                    variant="contained"
                    onClick={submitHandler}>
                    SignUp
                </Button>
            </div>

        </div>
    </div>
}

export default SignUpPage;