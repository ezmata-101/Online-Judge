import {useEffect, useState} from "react";
import {getBlogs, getBlogsByUser} from "../../contactServer/blog";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {showNotification} from '../../component/layout/showNotifications.js'
function BlogsPage(){
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
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

    return <div>
        <h4>Blogs</h4>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Writer</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {blogs.map(blog=>{
                    return <TableRow key={blog.blogId}>
                        <TableCell onClick={() => goToBlog(blog.blogId)}>{blog.blogId}</TableCell>
                        <TableCell onClick={() => goToBlog(blog.blogId)}>{blog.title}</TableCell>
                        <TableCell onClick={() => goToBlogsBy(blog.handle)}>{blog.handle}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        {hint && showNotification(hint, 'info')}
    </div>
}

export default BlogsPage;