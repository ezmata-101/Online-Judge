import React from 'react'
import {Typography} from "@mui/material";

function ProblemHeader(props){
    const p = props.problem;
    return <section>
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
}
export default ProblemHeader;