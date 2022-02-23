import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom';

import ProblemHeader from "./problem/ProblemHeader";
import ProblemStatement from "./problem/ProblemStatement";
import ProblemInputOutput from "./problem/ProblemInputOutput";
import ProblemPrevSubs from "./problem/ProblemPrevSubs";
import FileUploadComponent from "../../component/util/FileUploadComponent";
import Submission from "../../models/Submission";
import {getProblemDetail} from "../../contactServer/problem";
import {submit} from '../../contactServer/submission.js';
import {showNotification} from '../../component/layout/showNotifications.js'
function ProblemPage(props){
    const {contestId, problemNo} = useParams();
    const [problem, setProblem] = useState(null)
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    useEffect(async () => {
        const tempProblem = await getProblemDetail(contestId, problemNo);
        if(tempProblem.status === 'success') setProblem(tempProblem.problem);
        else notification('Error!')
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
    return <div className="problem" style={{"display": "flex"}}>
        <div className={"problem-body"}>
            <ProblemHeader problem={problem}/>
            <ProblemStatement statement={problem.statement}/>
            <ProblemInputOutput problem={problem}/>
        </div>
        <div className={"right-panel"}>
            <FileUploadComponent onSelectFile={onSelectFile} onFileUpload={onFileUpload}/>
            {props.prevSubs && <ProblemPrevSubs preSubs={props.prevSubs}/>}
        </div>
        {hint && showNotification(hint, 'info')}
    </div>
}

export default ProblemPage;