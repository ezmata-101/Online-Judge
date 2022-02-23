import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useState, useEffect} from "react";
import {getContestDetail, getContestStanding} from "../../contactServer/contest";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getContestProblem, getProblemDetail} from "../../contactServer/problem";
import {timeConverter} from "../../component/util/utilFunction";
import {showNotification} from '../../component/layout/showNotifications.js'
function Contest(props){
    let {contestId} = useParams();
    console.log(contestId)
    const navigate = useNavigate();
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }

    const [contest, setContest] = useState(null);
    const [problems, setProblems] = useState([]);
    const [standings, setStandings] =useState([]);
    const [standingsNote, setNote] = useState([]);
    useEffect(() => {
        getContestDetail({contestId: contestId})
            .then(res => {
                console.log(res)
                if(res.status === 'success') {
                    if(res.owner === true) navigate('/contest-admin/'+contestId)
                    else setContest(res.message)
                }else notification('Error!')
            })
        getContestProblem({contestId: contestId})
            .then(res => {
                console.log(res)
                if(res.status === 'success') {
                    setProblems(res.message)
                }else notification('Error!')
            })
        getContestStanding(contestId)
            .then(res => {
                console.log(res)
                if(res.status === 'success'){
                    setStandings(res.standings)
                    setNote(null)
                }else{
                    setNote(res.message);
                    setStandings([])
                }
            })

    }, [])
    async function getProblem(contestId, problemNo) {
        console.log(contestId + ' ' + problemNo)
        // navigate('/problem', {state: {contestId, problemNo}})
        // const problem = await getProblemDetail(contestId, problemNo)
        // console.log(problem)
        navigate('/problem/'+contestId+"/"+problemNo)
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
                            <TableCell onClick={() => {getProblem(contestId, problem.problemNo)}}>{problem.name}</TableCell>
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
                <h4>Start: {timeConverter(contest.startTime)}</h4>
                <h4>End: {timeConverter(contest.endTime)}</h4>
            </div>
        }
        {problems && createTable(problems)}
        <div>
            <br/>
            <br/>
            <br/>
            {standingsNote && <h4>{standingsNote}</h4>}

            <h3>Standings</h3>
            <Table>
                <TableHead>
                    <TableCell>Rank</TableCell>
                    <TableCell>Handle</TableCell>
                    <TableCell>Accepted</TableCell>
                    <TableCell>Wrong Submissions</TableCell>
                </TableHead>
                <TableBody>
                    {standings.map((stat, index) => {
                        return <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{stat.handle}</TableCell>
                            <TableCell>{stat.acProblems}</TableCell>
                            <TableCell>{stat.wrongSubs}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
        {hint && showNotification(hint, 'info')}
    </div>
}
export default Contest;