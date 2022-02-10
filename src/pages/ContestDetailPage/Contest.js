import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useState, useEffect} from "react";
import {getContestDetail} from "../../contactServer/contest";
import {useLocation, useNavigate} from "react-router-dom";
import {getContestProblem, getProblemDetail} from "../../contactServer/problem";

function Contest(props){
    const location = useLocation();
    let contestID = location.state && location.state.contestId;
    if(contestID == null) contestID = 69;

    const navigate = useNavigate();

    const [contest, setContest] = useState(null);
    const [problems, setProblems] = useState(null);

    useEffect(() => {
        getContestDetail({contestId: contestID})
            .then(res => {
                console.log(res)
                if(res.status === 'success')
                    setContest(res.message)
            })
        getContestProblem({contestId: contestID})
            .then(res => {
                console.log(res)
                if(res.status === 'success') {
                    setProblems(res.message)
                }

            })
    }, [])
    async function getProblem(contestId, problemNo) {
        console.log(contestId + ' ' + problemNo)
        // navigate('/problem', {state: {contestId, problemNo}})
        const problem = await getProblemDetail(contestId, problemNo)
        console.log(problem)
        navigate('/problem', {state: {problem: problem.problem}})
    }
    function createTable(problems){
        if(problems == null) return <div>No problems added yet</div>
        return <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Problem Name</TableCell>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>Solve/Try</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {problems.map(problem => {
                        return <TableRow key={problem.problemNo}>
                            <TableCell>{problem.problemNo}</TableCell>
                            <TableCell onClick={() => {getProblem(contestID, problem.problemNo)}}>{problem.name}</TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                            <TableCell>{problem.solve}/{problem.tries}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    }

    return <div>
        Contest Detail Page
        {
            contest && <div>
                <h3>{contest.title}</h3>
                <h4>{contest.setter}</h4>
            </div>
        }
        {problems && createTable(problems)}
    </div>
}
export default Contest;