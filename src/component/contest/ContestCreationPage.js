import React from 'react'
import {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {Box, TextField} from "@mui/material";

function ContestCreationPage(props){
    const contestTitle = useRef();
    const startTime = useRef();
    const duration = useRef();
    const navigate = useNavigate();
    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = contestTitle.current.value;
        const enteredStartTime = startTime.current.value;
        const enteredDuration = duration.current.value;
        const newContest = {
            title: enteredTitle,
            startTime: enteredStartTime,
            duration: enteredDuration
        }
        console.log(newContest)

        addNewContest(newContest)
    }

    function addNewContest(contest){
        console.log("Send Request to server to create a contest")
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Contest Name"
                    defaultValue="Demo Title"
                />
            </div>

            <div>
                {/*<DateTimePicker*/}
                {/*    label="Date&Time picker"*/}
                {/*    value={value}*/}
                {/*    onChange={handleChange}*/}
                {/*    renderInput={(params) => <TextField {...params} />}*/}
                {/*/>*/}
            </div>

        </Box>
    )
}

export default ContestCreationPage;