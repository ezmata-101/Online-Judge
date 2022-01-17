import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useLocation} from "react-router-dom";
import {timeConverter} from '../../component/util/utilFunction.js';


function SubmissionPage(props){
    const location = useLocation();
    console.log(location.state)
    if(location.state.submission == null) return <div>No submission sent</div>

    const sub = location.state.submission;


    return <div>
        <div>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Submission</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Language</TableCell>
                    <TableCell>Verdict</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Memory</TableCell>
                </TableRow>
                </TableHead>
                <TableBody><TableRow>
                        <TableCell>{sub.submissionId}</TableCell>
                        <TableCell>{sub.attemptedFor}</TableCell>
                        <TableCell>{timeConverter(sub.submissionTime)}</TableCell>
                        <TableCell>{sub.language}</TableCell>
                        <TableCell>{sub.verdict}</TableCell>
                        <TableCell>{sub.time}</TableCell>
                        <TableCell>{sub.memory}</TableCell>
                    </TableRow></TableBody>
            </Table>
        </div>
        <div>
            <pre>{sub.submittedFile}</pre>
        </div>
    </div>
}
export default SubmissionPage;