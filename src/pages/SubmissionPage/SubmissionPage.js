import React, {useEffect, useState} from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {timeConverter} from '../../component/util/utilFunction.js';
import {getSubmissionResult} from '../../contactServer/submission.js';
import {showNotification} from '../../component/layout/showNotifications.js'
function SubmissionPage(props){
    const navigate = useNavigate();
    const {contestId, problemId, submissionId} = useParams();
    console.log({contestId, problemId, submissionId})
    const [verdict, setVerdict] = useState('testing')
    const [verdictDetail, setVerdictDetail] = useState(null)
    const [code, setCode] = useState(null)
    const [subTime, setSubTime] = useState(null)
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    useEffect(() => {
        getSubmissionResult(contestId, problemId, submissionId)
            .then(res => {
                console.log(res)
                if(res.status === 'success'){
                    const submission = res.message.submission;
                    setVerdict(submission.verdict);
                    setVerdictDetail(submission.verdictDetail);
                    setSubTime(submission.submissionTime);
                    setCode(submission.code);
                }else showNotification('Failed to fetch submission')
            })
        console.log(verdict+' '+verdictDetail)
    })
    function goToContest(){
        navigate('/contest/'+contestId);
    }
    function goToProblem(){
        navigate('/problem/'+contestId+'/'+problemId);
    }
    function getVerdictDetail(){
        if(verdictDetail) return <div>
            <pre>{verdictDetail}</pre>
        </div>
        return <div></div>
    }
    function getCode(){
        if(code) return <div>
            <h4>Submitted Code</h4>
            {/*TODO: eita thik korte hobe*/}
            <pre>{code}</pre>
        </div>
        return <div></div>
    }
    return <div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Contest</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>Submission Time</TableCell>
                    <TableCell>Verdict</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell onClick={goToContest}>{contestId}</TableCell>
                    <TableCell onClick={goToProblem}>{problemId}</TableCell>
                    <TableCell>{timeConverter(subTime)}</TableCell>
                    <TableCell>{verdict}</TableCell>
                </TableRow>
            </TableBody>

        </Table>
        {getVerdictDetail()}
        {getCode()}
        {hint && showNotification(hint, 'info')}
    </div>
}
export default SubmissionPage;