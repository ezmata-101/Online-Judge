import FilterProblemComponent from "./FilterProblemComponent";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

function ProblemListPage(props){
    const [categories, setCategories] = useState([]);
    // const useEffect = useEffect();
    const problems = [{
            "problemNo": "1",
            "contestId": 70,
            "name": "Problem 1",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 500,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "2",
            "contestId": 69,
            "name": "problem2",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1000,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "2",
            "contestId": 70,
            "name": "Problem 2",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1000,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "4",
            "contestId": 85,
            "name": "Two Sets",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1000,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "1",
            "contestId": 69,
            "name": "problem1",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1000,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "1",
            "contestId": 85,
            "name": "Chessboard and Queens",
            "category": [
                "Ad Hoc",
                "Brute Force"
            ],
            "difficulty": 1200,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "3",
            "contestId": 84,
            "name": "Edit Distance",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1200,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "2",
            "contestId": 84,
            "name": "Chessboard and Queens",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1200,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "3",
            "contestId": 70,
            "name": "Problem 3",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1200,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "1",
            "contestId": 84,
            "name": "Two sets",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1200,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "4",
            "contestId": 70,
            "name": "Problem 4",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 1500,
            "tries": 0,
            "solve": 0
        },
        {
            "problemNo": "5",
            "contestId": 70,
            "name": "Problem 5",
            "category": [
                "Ad Hoc"
            ],
            "difficulty": 2000,
            "tries": 0,
            "solve": 0
        }
    ]

    function onCategorySelect(categories){
        setCategories(categories)
        console.log('in problem list page')
        console.log(categories)
    }

    return <div>Problems
    <div>
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
                             <TableCell>{problem.name}</TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                            <TableCell>{problem.solve+"/"+problem.tries}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
        </div>
        <div>
            <h3>Filter Problems</h3>
            <FilterProblemComponent onCategorySelect={onCategorySelect}/>
        </div>
    </div></div>
}
export default ProblemListPage;