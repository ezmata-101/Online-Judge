import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import Markdown from "markdown-to-jsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getContestDetail} from "../../contactServer/contest";
import {getContestProblem} from "../../contactServer/problem";

function ContestAdminPage(){
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
    const {contestId} = useParams();
    const [contest, setContest] = useState(null);
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getContestDetail({contestId: contestId})
            .then(res => {
                console.log(res)
                if(res.status === 'success')
                    setContest(res.message)
            })
        getContestProblem({contestId: contestId})
            .then(res => {
                console.log(res)
                if(res.status === 'success') {
                    setProblems(res.message)
                }

            })
    }, [])


    function addProblem() {
        navigate('/problem-create/'+contestId)
    }
    function seeStat(problemNo){

    }
    function deleteProblem(problemNo){
        console.log('will request to delete problem: '+contest.id + ' / '+ problemNo)
    }

    function goToProblemDetail(problemNo) {
        navigate('/problem/'+contestId+'/'+problemNo)
    }

    function contestPage(){
        return <div>
            <div>
                <h3>Contest Title: {contest.title}</h3>
                <h4>Contest ID: {contest.id}</h4>
                <Table className={"problem-list-table"}>
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Problem Name</TableCell>
                            <TableCell>difficulty</TableCell>
                            <TableCell>Solve/Try</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {problems.map(problem => {
                            return <TableRow key={problem.problemNo}>
                                <TableCell>{problem.problemNo}</TableCell>
                                <TableCell onClick={() => goToProblemDetail(problem.problemNo)}>{problem.name}</TableCell>
                                <TableCell>{problem.difficulty}</TableCell>
                                <TableCell>{problem.solve}/{problem.tries}</TableCell>
                                <TableCell><Button onClick={()=> deleteProblem(problem.problemNo)}>Delete</Button></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                {contest.announcement && <Markdown options={{ forceBlock: true }}>{contest.announcement}</Markdown>}
                <Fab
                    style={style}
                    color={"primary"}
                    aria-label={"add"}
                    onClick={addProblem}
                ><AddIcon/></Fab>

            </div>
        </div>
    }
    return <div>
        Contest Admin Page:
        {contest && contestPage()}
    </div>
}

export default ContestAdminPage;