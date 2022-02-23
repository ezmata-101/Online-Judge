import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React, {useState, useEffect} from "react";
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
    async function goToProblemDetail(problemNo) {
        console.log(contestId + ' ' + problemNo)
        // navigate('/problem', {state: {contestId, problemNo}})
        // const problem = await getProblemDetail(contestId, problemNo)
        // console.log(problem)
        navigate('/problem/'+contestId+"/"+problemNo)
    }
    function goToHandle(handle) {
        navigate('/profile/'+handle)
    }
    function createTable(problems){
        if(problems == null) return <div>No problems added yet</div>
        return <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>No</b></TableCell>
                        <TableCell><b>Problem Name</b></TableCell>
                        <TableCell><b>Difficulty</b></TableCell>
                        <TableCell><b>Solve/Try</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {problems.map(problem => {
                        return <TableRow key={problem.problemNo}>
                            <TableCell>{problem.problemNo}</TableCell>
                            <TableCell onClick={() => goToProblemDetail(problem.problemNo)}><Button>{problem.name}</Button></TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                            <TableCell>{problem.solve}/{problem.tries}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    }

    return <div>
        {
            contest && <div>
                <div style={{textAlign:'center'}}>
                    <h1>{contest.title.toUpperCase()}</h1>
                    <div>Contest ID: {contest.contestId}</div>
                    <div style={{fontSize:'18px', margin:'2px'}}><b>Start Time:</b> {timeConverter(contest.startTime)}</div>
                    <div style={{fontSize:'18px'}}><b>End Time  :</b> {timeConverter(contest.endTime)}</div>
                </div>
            </div>
        }
        {problems && createTable(problems)}
        <div>
            <br/>
            <br/>
            <br/>
            {standingsNote && <h4>{standingsNote}</h4>}

            <h2 style={{textAlign: 'center'}}>Standings</h2>
            <Table>
                <TableHead>
                    <TableCell><b>Rank</b></TableCell>
                    <TableCell><b>Handle</b></TableCell>
                    <TableCell><b>Accepted</b></TableCell>
                    <TableCell><b>Wrong Submissions</b></TableCell>
                </TableHead>
                <TableBody>
                    {standings.map((stat, index) => {
                        return <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell><Button onClick={() => goToHandle(stat.handle)}>{stat.handle}</Button></TableCell>
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