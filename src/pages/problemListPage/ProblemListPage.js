import FilterProblemComponent from "./FilterProblemComponent";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getAllProblems} from '../../contactServer/problem.js'
import {showNotification} from '../../component/layout/showNotifications.js'
function ProblemListPage(props){
    const [categories, setCategories] = useState([]);
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate()
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    useEffect(() => {
        getAllProblems(categories)
            .then(res => {
                if(res.status === 'success'){
                    setProblems(res.message.problems)
                }else notification('Failed to fetch problems')
            })
    }, [categories])

    function onCategorySelect(categories){
        setCategories(categories)
        console.log('in problem list page')
        console.log(categories)
    }

    function goToProblem(contestId, problemNo) {
        navigate('/problem/'+contestId+'/'+problemNo)
    }

    return <div>
        <h1 style={{textAlign:'center'}}>PROBLEMS</h1>
    <div>
        <div>
            <FilterProblemComponent onCategorySelect={onCategorySelect}/>
        </div>
        <div>
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>PID</b></TableCell>
                        <TableCell><b>Problem</b></TableCell>
                        <TableCell><b>Difficulty</b></TableCell>
                        <TableCell><b>Solve/Try</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {problems.map(problem => {
                        return <TableRow key={problem.contestId+'/'+problem.problemNo}>
                            <TableCell><Button>{"C"+problem.contestId+"P"+problem.problemNo}</Button></TableCell>
                            <TableCell onClick={() => {goToProblem(problem.contestId, problem.problemNo)}}><Button>{problem.name}</Button></TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                            <TableCell>{problem.solve+"/"+problem.tries}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
        </div>
        {hint && showNotification(hint, 'info')}
    </div></div>
}
export default ProblemListPage;