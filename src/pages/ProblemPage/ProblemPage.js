import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom';

import ProblemHeader from "./problem/ProblemHeader";
import ProblemStatement from "./problem/ProblemStatement";
import ProblemInputOutput from "./problem/ProblemInputOutput";
import ProblemPrevSubs from "./problem/ProblemPrevSubs";
import FileUploadComponent from "../../component/util/FileUploadComponent";
import Submission from "../../models/Submission";

function ProblemPage(props){
    const location = useLocation();
    let problem = props.problem;
    if(problem == null){
        problem = location.state.problem
    }else{
        problem = null
    }


    const navigate = useNavigate();
    const [submissionFile, setSubmissionFile] = useState([null])
    function onSelectFile(selectedFile){
        setSubmissionFile(selectedFile)
    }
    function onFileUpload(){
        const submission = new Submission(-1, Date.now(), 'C++', 'uploading', null, null, 'ME', props.problemId, submissionFile)

        navigate('/submission', {state: {submission: submission}})
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
    </div>
}

export default ProblemPage;