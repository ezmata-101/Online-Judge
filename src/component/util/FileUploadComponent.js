import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

function FileUploadComponent(props){
    const [selectedFile, setSelectedFile] = useState(null)
    const navigate = useNavigate()

    async function readFileSynchronously(file){
        return await new Promise((res) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                res(reader.result)
            }
            reader.readAsText(file)
        });
    }

    function onFileChange(event){
        readFileSynchronously(event.target.files[0]).then((data) => {
            props.onSelectFile(data)
        })
    }

    function onFileUpload(){
        props.onFileUpload();
    }


    return <div className={"submission-div"}   style={{marginLeft:'20px'}}>
        <div>
            <input className={"choose-file"} type="file" onChange={onFileChange} />
        </div>

        {props.onFileUpload && <div style={{width:'100%', marginTop:'8px'}}>
            <Button
                variant="contained"
                onClick={onFileUpload}>
                Submit
            </Button>
        </div> }
    </div>
}

export default FileUploadComponent;