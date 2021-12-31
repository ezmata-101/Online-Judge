import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Markdown from "markdown-to-jsx";

function ProblemPage(props){
    const p = props.problem;
    const [statement, setStatement] = useState('')
    useEffect(() => {
        import('./../../'+p.statement)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setStatement(res))
                    .catch(err => console.log('Something goes brr...\n'+err))
            }).catch(err => console.log('something went brr\n'+err))
    })


    if (p == null) return <div>no problem found</div>
    return <div className="problem">
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
    </div>
}

export default ProblemPage;