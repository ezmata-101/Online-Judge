import React from 'react'
import {Typography} from "@mui/material";

function ProblemHeader(props){
    const p = props.problem;
    return <section style={{textAlign:'center'}}>
        <Typography
            variant='h3'
        >{p.name}</Typography>
        <Typography
            variant='caption'
        >Time Limit: <b>{p.timeLimit}</b>s</Typography><br></br>
        <Typography
            variant='caption'
        >Memory Limit: <b>{p.memoryLimit}</b>MB</Typography>
    </section>
}
export default ProblemHeader;