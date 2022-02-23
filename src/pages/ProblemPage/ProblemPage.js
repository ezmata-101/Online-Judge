import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import ProblemHeader from "./problem/ProblemHeader";
import ProblemStatement from "./problem/ProblemStatement";
import ProblemInputOutput from "./problem/ProblemInputOutput";
import ProblemPrevSubs from "./problem/ProblemPrevSubs";
import FileUploadComponent from "../../component/util/FileUploadComponent";
import Submission from "../../models/Submission";
import {getProblemDetail, getProblemTutorial} from "../../contactServer/problem";
import {submit} from '../../contactServer/submission.js';
import {showNotification} from '../../component/layout/showNotifications.js'
import {Button} from "@mui/material";
function ProblemPage(props){
    const {contestId, problemNo} = useParams();
    const [problem, setProblem] = useState(null)
    const [hint, setHint] = useState(null);
    const [tutorial, setTutorial] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    useEffect(async () => {
        const tempProblem = await getProblemDetail(contestId, problemNo);
        if(tempProblem.status === 'success') setProblem(tempProblem.problem);
        else notification('Error!')

        const tempTutorial = await getProblemTutorial(contestId, problemNo);
        if(tempTutorial.status === 'success') setTutorial(tempTutorial.blogId);

    }, [])


    const navigate = useNavigate();
    const [submissionFile, setSubmissionFile] = useState([null])
    function onSelectFile(selectedFile){
        setSubmissionFile(selectedFile)
    }
    function onFileUpload(){
        const submission = new Submission(-1, Date.now(), 'C++', 'uploading', "-", "-", 'ME', (contestId+'/'+problemNo), submissionFile)

        submit(contestId, problemNo, submissionFile)
            .then(response => {
                if(response.status === 'success') {
                    console.log('submitted!')
                    submission.submissionId = response.message.submissionId;
                    submission.verdict = response.message.verdict;
                    navigate('/submission/' + contestId + '/' + problemNo + '/' + submission.submissionId)
                }else notification('Failed to submit')
            })

        // navigate('/submission', {state: {submission: submission}})
    }



    if (problem == null) return <div>no problem found</div>

    function goToTutorial() {
        navigate('/blog/'+tutorial);
    }

    return <div className="problem" style={{margin:'10px'}}>
        <ProblemHeader problem={problem}/>
        <div className={"problem-body"} style={{width:'90%', marginLeft: '5%'}}>
            <div style={{display: 'flex', marginTop:'20px'}}>
                <ProblemStatement statement={problem.statement}/>
                <FileUploadComponent onSelectFile={onSelectFile} onFileUpload={onFileUpload}/>
            </div>
            <ProblemInputOutput problem={problem}/>
            <div className={"right-panel"}>
                {props.prevSubs && <ProblemPrevSubs preSubs={props.prevSubs}/>}
            </div>
            {hint && showNotification(hint, 'info')}
            {tutorial && <div><Button onClick={goToTutorial}>Go To Tutorial</Button></div>}
        </div>
    </div>
}

export default ProblemPage;