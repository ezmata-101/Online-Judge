import React from 'react'
import Markdown from "markdown-to-jsx";
import {useEffect, useState} from "react";

function ProblemStatement(props){
    const [statement, setStatement] = useState('')

    useEffect(() => {
        import('./../../'+props.statement)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setStatement(res))
                    .catch(err => console.log('Something goes brr...\n'+err))
            }).catch(err => console.log('something went brr\n'+err))
    })
    return <div>
        <Markdown options={{ forceBlock: true }}>{statement}</Markdown>
    </div>
}

export default ProblemStatement;