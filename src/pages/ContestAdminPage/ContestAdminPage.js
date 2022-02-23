import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import Fab from '@mui/material/Fab'
import Markdown from "markdown-to-jsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getContestDetail, generateStandings, getContestStanding} from "../../contactServer/contest";
import {deleteProblem, getContestProblem} from "../../contactServer/problem";
import {timeConverter} from '../../component/util/utilFunction.js';
import {showNotification} from '../../component/layout/showNotifications.js'
function ContestAdminPage(){
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    const {contestId} = useParams();
    const [contest, setContest] = useState(null);
    const [problems, setProblems] = useState([]);
    const [standings, setStandings] =useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getContestDetail({contestId: contestId})
            .then(res => {
                console.log(res)
                if(res.status === 'success')
                    setContest(res.message)
                else notification('Error!')
            })
        getAndSetProblems();
        getContestStanding(contestId)
            .then(res => {
                console.log(res)
                if(res.status === 'success'){
                    setStandings(res.standings)
                }else{
                    notification(res.message);
                    setStandings([])
                }
            })
    }, [])

    function getAndSetProblems(){
        getContestProblem({contestId: contestId})
            .then(res => {
                console.log(res)
                if (res.status === 'success') {
                    setProblems(res.message)
                }else notification('Error!')
            })
    }

    function addProblem() {
        navigate('/problem-create/'+contestId)
    }
    function generate(){
        generateStandings(contestId)
            .then(res => {
                if(res.status === 'success')
                    notification('successfully generated')
                else notification(res.message)
            })
    }
    function seeStat(problemNo){

    }
    function deleteProb(problemNo){
        // console.log('will request to delete problem: '+contestId + ' / '+ problemNo)
        deleteProblem(contestId, problemNo)
            .then(res => {
                if(res.status === 'success'){
                    getAndSetProblems()
                }else notification(res.message)
            })
    }

    function goToProblemDetail(problemNo) {
        navigate('/problem/'+contestId+'/'+problemNo)
    }

    function getFab(){
        console.log(contest.endTime);
        console.log(Date.now());
        console.log('end' + timeConverter(contest.endTime));
        console.log('now' + timeConverter(Date.now()));
        if(parseInt(contest.startTime) > parseInt(Date.now())){
            console.log('eita kemne choto hoy?')
            return <Fab
                style={style}
                color={"primary"}
                aria-label={"add"}
                onClick={addProblem}
            ><AddIcon/></Fab>
        }else if(parseInt(contest.endTime) < parseInt(Date.now())){
            console.log('ekhane asha uchit')
            return <Fab
                style={style}
                color={"primary"}
                aria-label={"add"}
                onClick={generate}
            ><AlignVerticalBottomIcon/></Fab>
        }else return <div></div>
    }

    function goToHandle(handle) {
        navigate('/profile/'+handle)
    }

    function contestPage(){
        return <div>
            <div>
                <div style={{textAlign:'center'}}>
                    <h1>{contest.title.toUpperCase()}</h1>
                    <div>Contest ID: {contest.contestId}</div>
                    <div style={{fontSize:'18px', margin:'2px'}}><b>Start Time:</b> {timeConverter(contest.startTime)}</div>
                    <div style={{fontSize:'18px'}}><b>End Time  :</b> {timeConverter(contest.endTime)}</div>
                </div>
                <Table className={"problem-list-table"} style={{marginTop: '10px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>No</b></TableCell>
                            <TableCell><b>Problem Name</b></TableCell>
                            <TableCell><b>Difficulty</b></TableCell>
                            <TableCell><b>Solve/Try</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {problems.map(problem => {
                            return <TableRow key={problem.problemNo}>
                                <TableCell>{problem.problemNo}</TableCell>
                                <TableCell onClick={() => goToProblemDetail(problem.problemNo)}><Button>{problem.name}</Button></TableCell>
                                <TableCell>{problem.difficulty}</TableCell>
                                <TableCell>{problem.solve}/{problem.tries}</TableCell>
                                <TableCell><Button variant="contained" color={'error'} onClick={()=> deleteProb(problem.problemNo)}>Delete</Button></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                {contest.announcement && <Markdown options={{ forceBlock: true }}>{contest.announcement}</Markdown>}
                {getFab()}
                <div>
                    <br/>
                    <br/>
                    <br/>

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
            </div>
            {hint && showNotification(hint, 'info')}
        </div>
    }
    return <div>
        {contest && contestPage()}
    </div>
}

export default ContestAdminPage;