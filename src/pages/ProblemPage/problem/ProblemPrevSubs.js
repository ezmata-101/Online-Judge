import React from 'react'
import {Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {timeConverter} from '../../../component/util/utilFunction.js';
function ProblemPrevSubs(props){
    const prevSubmissions = props.preSubs;
    function goToSubmission(submissionId) {
    }

    return <div>
        <Typography variant="h6">Last Submissions</Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Submission</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Verdict</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {prevSubmissions.map((sub, index)=>{
                    return <TableRow key={index}>
                        <TableCell>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => goToSubmission(sub.submissionId)}
                            >
                                {sub.submissionId}
                            </Link>
                        </TableCell>
                        <TableCell>{timeConverter(sub.submissionTime)}</TableCell>
                        <TableCell>{sub.verdict}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </div>
}

export default ProblemPrevSubs;