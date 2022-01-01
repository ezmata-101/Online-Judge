import {Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

function ProblemPrevSubs(props){
    const prevSubmissions = props.preSubs;
    // const sub1 = new Submission(1234789, Date.now(), 'C++', 'AC', 232, 124,1, 'c1p1')
    // const sub2 = new Submission(1239875, Date.now(), 'C++', 'WA', 202, 124,1, 'c1p1')
    // const sub3 = new Submission(1032942, Date.now(), 'C++', 'TLE', 3000, 124,1, 'c1p1')
    //
    // const prevSubmissions = [
    //     sub1.getAsJSON(),
    //     sub2.getAsJSON(),
    //     sub3.getAsJSON(),
    // ]
    console.log(prevSubmissions)

    function goToSubmission(submissionId) {
        console.log(submissionId)
    }

    function timeConverter(UNIX_timestamp){
        const a = new Date(UNIX_timestamp);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
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