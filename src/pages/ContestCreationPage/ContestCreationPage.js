import React, {useState} from 'react'
import {useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";

import 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import './ContestCreationPage.css';
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import Contest from "../../models/Contest";
import FileUploadComponent from "../../component/util/FileUploadComponent";

function ContestCreationPage(){
    const contestTitle = useRef();
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [hasAnnouncement, setHasAnnouncement] = useState(false)
    const [announcement, setAnnouncement] = useState(null)

    function submitHandler(event){
        event.preventDefault();
        console.log()
        const title = contestTitle.current.value;

        if(endTime <= startTime){
            console.log("Erroror!")
            return;
        }else{
            console.log('Time to thik ache.')
        }


        const contest = {
            title,
            startTime,
            endTime,
            duration: endTime - startTime,
            announcement: hasAnnouncement
        }
        addNewContest(contest)
    }

    function addNewContest(contest){
        console.log("Send Request to server to create a contest")

        //TODO: Send request to server to create a contest and get a ContestID actually server will return a contestObject

        navigate('/submission', {state: {contest: new Contest(contest.title,'creator', -1, [], announcement, startTime, endTime, [])}})
    }

    function onSelectAnnouncement(selectedFile){
        setAnnouncement(selectedFile)
        console.log("Announcement: \n"+selectedFile)
    }

    return <div className="create-contest-body">
        <h2>Contest Creation</h2>
        <div className="form">
            <div className="title">
                <TextField
                    className="title-text-field"
                    required
                    id="outlined-required"
                    label="Contest Name"
                    defaultValue="Title"
                    inputRef={contestTitle}
                >
                </TextField>
            </div>
            <div className="start-time">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Contest Start Time"
                        renderInput={(params) => <TextField {...params} />}
                        value={startTime}
                        onChange={(newValue) => {
                            setStartTime(newValue);
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="end-time">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Contest End Time"
                        renderInput={(params) => <TextField {...params} />}
                        value={endTime}
                        onChange={(newValue) => {
                            setEndTime(newValue);
                        }}
                    />
                </LocalizationProvider>
            </div>

            <div>
                <FormControlLabel control={
                    <Checkbox
                        checked={hasAnnouncement}
                        onChange={(e) => setHasAnnouncement(e.target.checked)}
                    />
                } label="Announcement"/>

            </div>
            {hasAnnouncement && <FileUploadComponent onSelectFile={onSelectAnnouncement}/>}



            <div className="submit-button">
                <Button
                    variant="contained"
                    onClick={submitHandler}>
                    Submit
                </Button>
            </div>
        </div>
    </div>
}

export default ContestCreationPage;