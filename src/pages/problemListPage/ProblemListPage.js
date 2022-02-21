import FilterProblemComponent from "./FilterProblemComponent";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getAllProblems} from '../../contactServer/problem.js'
function ProblemListPage(props){
    const [categories, setCategories] = useState([]);
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getAllProblems(categories)
            .then(res => {
                if(res.status === 'success'){
                    setProblems(res.message.problems)
                }
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

    return <div>Problems
    <div>
        <div>
            <h3>Filter Problems</h3>
            <FilterProblemComponent onCategorySelect={onCategorySelect}/>
        </div>
        <div>Main list
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>PID</TableCell>
                        <TableCell>Problem</TableCell>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>Solve/Try</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {problems.map(problem => {
                        return <TableRow key={problem.contestId+'/'+problem.problemNo}>
                            <TableCell>{"C"+problem.contestId+"P"+problem.problemNo}</TableCell>
                             <TableCell onClick={() => {goToProblem(problem.contestId, problem.problemNo)}}>{problem.name}</TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                            <TableCell>{problem.solve+"/"+problem.tries}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
        </div>
    </div></div>
}
export default ProblemListPage;