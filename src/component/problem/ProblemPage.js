import React from 'react'
import ProblemHeader from "./ProblemHeader";
import ProblemStatement from "./ProblemStatement";
import ProblemInputOutput from "./ProblemInputOutput";
import SubmissionFileUpload from "./SubmissionFileUpload";
import ProblemPrevSubs from "./ProblemPrevSubs";

function ProblemPage(props){
    const p = props.problem;


    if (p == null) return <div>no problem found</div>
    return <div className="problem" style={{"display": "flex"}}>
        <div className={"problem-body"}>
            <ProblemHeader problem={p}/>
            <ProblemStatement statement={p.statement}/>
            <ProblemInputOutput problem={p}/>
        </div>
        <div className={"right-panel"}>
            <SubmissionFileUpload probleId={p.problemId}/>
            <ProblemPrevSubs preSubs={props.prevSubs}/>
        </div>
    </div>
}

export default ProblemPage;