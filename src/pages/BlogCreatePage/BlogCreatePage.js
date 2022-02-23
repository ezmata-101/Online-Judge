import React, {useRef, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import FileUploadComponent from "../../component/util/FileUploadComponent";
import {createBlog, createTutorial} from "../../contactServer/blog";
import {useNavigate} from "react-router-dom";
import {showNotification} from '../../component/layout/showNotifications.js'

export default function BlogCreatePage() {
    const [blogBody, setBlogBody] = React.useState("**Hello world!!!**");
    const [isTutorial, setIsTutorial] = React.useState(false)
    const blogTitle = useRef();
    const contestId = useRef();
    const problemNo = useRef();
    const navigate = useNavigate()
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    async function handleSubmit() {
        if (blogTitle.current.value === '') return;
        if (isTutorial) {
            if (contestId.current.value === '' || problemNo.current.vaule === '') {
                showNotification('Contest and Problem ID')
                return;
            }
            const res = await createTutorial(blogTitle.current.value, contestId.current.value, problemNo.current.value, blogBody)
            if(res.status === 'success'){
                navigate('/blog/'+res.message)
            }else notification(res.message);
        } else {
            createBlog(blogTitle.current.value, blogBody).then(res => {
                console.log(res)
                if (res.status === 'success') {
                    navigate('/blog/' + res.message)
                }else notification(res.message);
            })
        }
    }

    return (
        <div className="blog-create-page">
            <div>
                <div><TextField
                    required
                    label={'Blog Title'}
                    autoComplete="demo title"
                    inputRef={blogTitle}
                /></div>
                <div>
                    <div>
                        <FormControlLabel control={
                            <Checkbox
                                checked={isTutorial}
                                onChange={(e) => setIsTutorial(e.target.checked)}
                            />
                        } label="Is Tutorial"/>

                    </div>
                    {isTutorial && <div>
                        <TextField
                            label={'Contest Id'}
                            autoComplete=""
                            inputRef={contestId}
                        />
                        <TextField
                            label={'Problem NO'}
                            autoComplete=""
                            inputRef={problemNo}
                        />
                    </div>}
                </div>
            </div>
            <div><MDEditor
                value={blogBody}
                onChange={setBlogBody}
            /></div>
            <div><Button onClick={handleSubmit} variant="contained">Create Blog</Button></div>
            {hint && showNotification(hint, 'info')}
        </div>
    );
}