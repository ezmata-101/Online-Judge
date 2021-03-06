import {isTestInput, isTestOutput, isSampleOutput, isSampleInput, isStatement, readFileSynchronously} from '../../component/util/utilFunction.js';
import React, {useRef, useState} from "react";
import {Button, TextField} from "@mui/material";
import MultipleSelectCheckmarks from "./MultipleSelectCheckMarks";
import {useNavigate, useParams} from "react-router-dom";
import {createProblem} from './../../contactServer/problem.js';
import {showNotification} from '../../component/layout/showNotifications.js'
function ProblemCreate(props){
    const {contestId} = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState([])
    const [sampleInputs, setSampleInputs] = useState([])
    const [sampleOutputs, setSampleOutputs] = useState([])
    const [statement, setStatement] = useState(null)
    const [category, setCategory] = useState([])
    const problemName = useRef()
    const [defaultProblemName, setDefaultProblemName] = useState('Problem Name');
    // const contestId = useRef()
    const problemNo = useRef()
    const timeLimit = useRef()
    const memoryLimit = useRef()
    const rating = useRef()
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    // const [contestID, setContestId] = useState(null)
    // const [problemNo, setProblemNo] = useState(null)
    // const [timeLimit, setTimeLimit] = useState(null)
    // const [memoryLimit, setMemoryLimit] = useState(null)
    async function onFolderSelect(event) {
        const numOfFiles = event.target.files.length;
        // console.log(event.target.files[0].webkitRelativePath.split('/')[0])
        if(problemName.current.value === 'Problem Name'){
            problemName.current.value = event.target.files[0].webkitRelativePath.split('/')[0];
            // setDefaultProblemName(event.target.files[0].webkitRelativePath.split('/')[0])
        }
        const inputs = [];
        const outputs = [];
        const sampleInputs = [];
        const sampleOutputs = [];
        let statement = null;
        for (let i = 0; i < numOfFiles; i++) {
            const fileName = event.target.files[i].name.toString();
            const data = await readFileSynchronously(event.target.files[i]);
            if (isTestInput(fileName)) inputs.push({fileName, data});
            if (isTestOutput(fileName)) outputs.push({fileName, data});
            if (isSampleInput(fileName)) sampleInputs.push({fileName, data});
            if (isSampleOutput(fileName)) sampleOutputs.push({fileName, data});
            if (isStatement(fileName)) statement = {fileName, data};
        }
        console.log({statement, sampleInputs, sampleOutputs, inputs, outputs});
        setInputs(inputs)
        setOutputs(outputs)
        setSampleInputs(sampleInputs)
        setSampleOutputs(sampleOutputs)
        setStatement(statement)
    }

    function onSelectCategory(categories){
        setCategory(categories)
    }

    function submitHandler() {
        const input = [];
        const output = [];
        const problem = {
            contestId,
            name: problemName.current.value,
            problemID: '-1',
            problemNo: problemNo.current.value,
            timeLimit: parseFloat(timeLimit.current.value),
            difficulty: parseInt(rating.current.value),
            memoryLimit: parseInt(memoryLimit.current.value),
            statement: statement.data,
            sampleInputs,
            sampleOutputs,
            inputs,
            outputs,
            category
        }
        for(let i=0; i<sampleOutputs.length; i++){
            input.push({key: i, ip: sampleInputs[i].data})
            output.push({key: i, op: sampleOutputs[i].data})
        }
        problem.input = input;
        problem.output = output;

        createProblem(problem).then(res => {
            console.log(res)
            if(res.status === 'success') navigate('/contest-admin/'+contestId)
            else notification(res.message)
        })
    }

    return <div>
        <div>
            <h4>Add problem to contest: {contestId}</h4>
            <TextField
                className="title-text-field"
                required
                id="outlined-required"
                label="Problem Name"
                defaultValue={defaultProblemName}
                inputRef={problemName}
            >
            </TextField>
            <TextField
                className="title-text-field"
                required
                id="outlined-required"
                label="Problem No"
                defaultValue="1"
                inputRef={problemNo}
            >
            </TextField>
        </div>
        <div>
            <div>
                <h4>Problem Creation Instruction</h4>
                <ol>
                    How to structure a problem folder:
                    <li>State your problem in a .MD (Markdown) file named <b>statement.md</b></li>
                    <li>Create sample test cases and save them in separate files naming them as <i>sample_input.txt, sample_input (1).txt, ...</i> and <i>sample_output.txt, sample_output (1).txt, ...</i></li>
                    <li>Similarly create hidden test cases naming as <i>test_input.txt, test_input (1).txt, ...</i> and <i>test_input.txt, test_input (1).txt, ...</i></li>
                    <li>Place statement.md, sample and hidden test cases in a single folder</li>
                    <li>Select the directory. </li>
                    <li>Fill up the fields, check appropriate categories and submit :) </li>
                </ol>
            </div>
        </div>

        <input directory="" webkitdirectory="" type="file" onChange={onFolderSelect}/>
        <div>
            <h3>Problem Category</h3>
            <MultipleSelectCheckmarks onSelectCategories={onSelectCategory}/>
        </div>
        <div>
            <TextField
                className="title-text-field"
                required
                id="outlined-required"
                label="Problem Difficulty"
                defaultValue="1000"
                inputRef={rating}
            >
            </TextField>
            <TextField
                className="title-text-field"
                required
                id="outlined-required"
                label="Time Limit"
                defaultValue="1"
                inputRef={timeLimit}
            >
            </TextField>
            <TextField
                className="title-text-field"
                required
                id="outlined-required"
                label="Memory Limit"
                defaultValue="100"
                inputRef={memoryLimit}
            >
            </TextField>

        </div>
        <div className="submit-button">
            <Button
                variant="contained"
                onClick={submitHandler}>
                Create Problem
            </Button>
        </div>
        {hint && showNotification(hint, 'info')}
    </div>
}
export default ProblemCreate;