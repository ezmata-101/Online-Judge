import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

import ProblemHeader from "./problem/ProblemHeader";
import ProblemStatement from "./problem/ProblemStatement";
import ProblemInputOutput from "./problem/ProblemInputOutput";
import ProblemPrevSubs from "./problem/ProblemPrevSubs";
import FileUploadComponent from "../../component/util/FileUploadComponent";
import Submission from "../../models/Submission";

function ProblemPage(props){
    const p = props.problem;
    const navigate = useNavigate();
    const [submissionFile, setSubmissionFile] = useState([null])
    function onSelectFile(selectedFile){
        setSubmissionFile(selectedFile)
    }
    function onFileUpload(){
        const submission = new Submission(-1, Date.now(), 'C++', 'uploading', null, null, 'ME', props.problemId, submissionFile)
        console.log(submission.getAsJSON())
        navigate('/submission', {state: {submission: submission}})
    }

    if (p == null) return <div>no problem found</div>
    return <div className="problem" style={{"display": "flex"}}>
        <div className={"problem-body"}>
            <ProblemHeader problem={p}/>
            <ProblemStatement statement={p.statement}/>
            <ProblemInputOutput problem={p}/>
        </div>
        <div className={"right-panel"}>
            <FileUploadComponent onSelectFile={onSelectFile} onFileUpload={onFileUpload}/>
            <ProblemPrevSubs preSubs={props.prevSubs}/>
        </div>
    </div>
}

export default ProblemPage;