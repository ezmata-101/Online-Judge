import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Markdown from "markdown-to-jsx";
import Submission from "../../models/Submission";

function ProblemPage(props){
    const p = props.problem;
    const [statement, setStatement] = useState('')
    const [submittedFile, setSubmittedFile] = useState(null)



    useEffect(() => {
        import('./../../'+p.statement)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setStatement(res))
                    .catch(err => console.log('Something goes brr...\n'+err))
            }).catch(err => console.log('something went brr\n'+err))
    })

    function onFileChange(event){
        console.log(event.target.files[0])
        setSubmittedFile(event.target.files[0])

        const reader = new FileReader();
        console.log("ekhane ashe")
        reader.onload = async (event) => {
            setSubmittedFile(event.target.result)
        }
        reader.readAsText(event.target.files[0])
    }
    function onFileUpload(){
        console.log(submittedFile)
        const submission = new Submission(-1, Date.now(), 'C++', 'uploading', null, null, 'ME', p.problemId)
        console.log(submission.getAsJSON())
    }


    if (p == null) return <div>no problem found</div>
    return <div className="problem" style={{"display": "flex"}}>
        <div className={"problem-body"}>
            <section>
                <Typography
                    variant='h3'
                >{p.name}</Typography>
                <Typography
                    variant='caption'
                >Time Limit: {p.timeLimit}s</Typography><br></br>
                <Typography
                    variant='caption'
                >Memory Limit: {p.memoryLimit}MB</Typography>
            </section>
            <section>
                <Markdown options={{ forceBlock: true }}>{statement}</Markdown>
            </section>
            <section>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Input</TableCell>
                            <TableCell>Output</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {p.input.map(i => {
                            return <TableRow key={i.key}>
                                <TableCell>{p.input[i.key].ip.split('\n').map((line, index)=>{
                                    return <div key={index}>{line}</div>
                                })}</TableCell>
                                <TableCell>{p.output[i.key].op.split('\n').map((line, index)=>{
                                    return <div key={index}>{line}</div>
                                })}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                    <TableBody>
                    </TableBody>
                </Table>
            </section>
        </div>
        <div className={"right-panel"}>
            <div className={"submission-div"}>
                <div>
                    <input type="file" onChange={onFileChange} />
                </div>
                <div>
                    <button onClick={onFileUpload}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default ProblemPage;