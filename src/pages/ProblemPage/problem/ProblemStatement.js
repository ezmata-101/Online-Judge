import React from 'react'
import Markdown from "markdown-to-jsx";
import {useEffect, useState} from "react";

function ProblemStatement(props){
    return <div>
        <Markdown options={{ forceBlock: true }}>{props.statement}</Markdown>
    </div>
}

export default ProblemStatement;