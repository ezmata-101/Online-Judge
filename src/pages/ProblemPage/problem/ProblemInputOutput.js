import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

function ProblemInputOutput(props){
    const p = props.problem;
    return <div>
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
                        <TableCell>{p.input[i.key].text.split('\n').map((line, index)=>{
                            return <div key={index}>{line}</div>
                        })}</TableCell>
                        <TableCell>{p.output[i.key].text.split('\n').map((line, index)=>{
                            return <div key={index}>{line}</div>
                        })}</TableCell>
                    </TableRow>
                })}
            </TableBody>
            <TableBody>
            </TableBody>
        </Table>
    </div>
}
export default ProblemInputOutput;