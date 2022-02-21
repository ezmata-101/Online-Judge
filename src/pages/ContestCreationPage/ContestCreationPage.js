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
import {createContest, getContestDetail} from '../../contactServer/contest.js'
import Markdown from "markdown-to-jsx";

function ContestCreationPage(){
    const contestTitle = useRef();
    const navigate = useNavigate();

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [hasAnnouncement, setHasAnnouncement] = useState(false)
    const [announcement, setAnnouncement] = useState(null)

    async function submitHandler(event) {
        event.preventDefault();
        console.log()
        const title = contestTitle.current.value;

        if (endTime <= startTime) {
            console.log("Erroror!")
            return;
        } else {
            console.log('Time to thik ache.')
        }


        const contest = {
            title,
            startTime: new Date(startTime).getTime().toString(),
            endTime: new Date(endTime).getTime().toString(),
            duration: endTime - startTime,
            announcement: announcement
        }
        await addNewContest(contest)
    }

    async function addNewContest(contest) {
        console.log('create korar jonno pathacchi')
        console.log(contest)
        console.log('\n\n\n\n\n\n\n\n\n')
        const result = await createContest(contest)
        console.log(result)
        //TODO: Send request to server to create a contest and get a ContestID actually server will return a contestObject
        if(result.status === 'success'){
            navigate('/contest-admin/'+result.message.contestId)
        }
        // navigate('/submission', {state: {contest: new Contest(contest.title,'creator', -1, [], announcement, startTime, endTime, [])}})
    }

    function onSelectAnnouncement(selectedFile){
        if(selectedFile !== null)
        setHasAnnouncement(true)
        setAnnouncement(selectedFile)
        console.log("Announcement: \n"+selectedFile)
    }

    return <div className="create-contest-body">
        <h2>Contest Creation</h2>
        <div>
            <div>
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
                    <FileUploadComponent onSelectFile={onSelectAnnouncement}/>
                    <div className="submit-button">
                        <Button
                            variant="contained"
                            onClick={submitHandler}>
                            Submit
                        </Button>
                    </div>

                </div>
            </div>
            <div>
                {hasAnnouncement && announcement && <Markdown options={{ forceBlock: true }}>{announcement}</Markdown>}
            </div>
        </div>
    </div>
}

export default ContestCreationPage;