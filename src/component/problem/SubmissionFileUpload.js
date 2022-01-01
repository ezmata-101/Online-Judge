import Submission from "../../models/Submission";
import {useState} from "react";

function SubmissionFileUpload(props){
    const [submittedFile, setSubmittedFile] = useState(null)

    function onFileChange(event){
        setSubmittedFile(event.target.files[0])
        const reader = new FileReader();
        reader.onload = async (event) => {
            setSubmittedFile(event.target.result)
        }
        reader.readAsText(event.target.files[0])
    }
    function onFileUpload(){
        console.log(submittedFile)
        const submission = new Submission(-1, Date.now(), 'C++', 'uploading', null, null, 'ME', props.problemId)
        console.log(submission.getAsJSON())
    }


    return <div className={"submission-div"}>
        <div>
            <input type="file" onChange={onFileChange} />
        </div>
        <div>
            <button onClick={onFileUpload}>
                Submit
            </button>
        </div>
    </div>
}

export default SubmissionFileUpload;