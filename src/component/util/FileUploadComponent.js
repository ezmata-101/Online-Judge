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


    return <div className={"submission-div"}>
        <div>
            <input type="file" onChange={onFileChange} />
        </div>

        {props.onFileUpload && <div>
            <Button
                variant="outlined"
                onClick={onFileUpload}>
                Submit
            </Button>
        </div> }
    </div>
}

export default FileUploadComponent;