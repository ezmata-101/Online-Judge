import {useEffect, useState} from "react";
import {getBlogs, getBlogsByUser} from "../../contactServer/blog";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {showNotification} from '../../component/layout/showNotifications.js'
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
function BlogsPage(){
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
    useEffect(() => {
        getBlogs()
            .then(res => {
                if(res.status === 'success'){
                    console.log(res.blogs)
                    setBlogs(res.blogs);
                }
            })
    }, [])

    function goToBlog(blogId) {
        navigate('/blog/'+blogId);
    }

    async function goToBlogsBy(handle) {
        const resp = await getBlogsByUser(handle)
        console.log(resp)
        if(resp.status === 'success'){
            setBlogs(resp.blogs)
        }else showNotification('failed to fetch blogs')
    }

    function goToCreateBlog() {
        navigate('/create-blog');
    }

    return <div>
        <h1 style={{textAlign:'center'}}>BLOGS</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>TITLE</b></TableCell>
                    <TableCell><b>WRITER</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {blogs.map(blog=>{
                    return <TableRow key={blog.blogId}>
                        <TableCell onClick={() => goToBlog(blog.blogId)}><Button>{blog.blogId}</Button></TableCell>
                        <TableCell onClick={() => goToBlog(blog.blogId)}><Button>{blog.title}</Button></TableCell>
                        <TableCell onClick={() => goToBlogsBy(blog.handle)}><Button>{blog.handle}</Button></TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        <Fab
            style={style}
            color={"primary"}
            aria-label={"add"}
            onClick={goToCreateBlog}
        ><AddIcon/></Fab>
        {hint && showNotification(hint, 'info')}
    </div>
}

export default BlogsPage;