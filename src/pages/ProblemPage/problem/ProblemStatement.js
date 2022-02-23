import React from 'react'
import MDEditor from "@uiw/react-md-editor";

function ProblemStatement(props){
    return <div>
        <MDEditor.Markdown source={props.statement}/>
    </div>
}

export default ProblemStatement;