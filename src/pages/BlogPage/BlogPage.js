import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import {timeConverter} from "../../component/util/utilFunction";
import {getBlog, getBlogComments, postComment} from "../../contactServer/blog";
import FormControl from "@mui/material/FormControl";
import {InputAdornment, OutlinedInput} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function BlogPage(props){
    const {blogId} = useParams();
    const [blog, setBlog] = useState({blogId: 10, blogWriter: 'Abrar Nafee Akhand', blogTitle: 'Binary Search', created: Date.now(), blogBody: '\n**Problem:** Given a sorted array  **arr[]**  of  **n**  elements, write a function to search a given element  **x**  in **arr[].**\n\n**Linear Search Approach**: A simple approach is to do a  [**linear search**](https://www.geeksforgeeks.org/linear-search/)**.**  The time complexity of the Linear search is O(n). Another approach to perform the same task is using  _Binary Search_.  \n\n**Binary Search Approach:**  Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(Log n). The basic steps to perform Binary Search are:\n\n-   Begin with an interval covering the whole array.\n-   If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half.\n-   Otherwise, narrow it to the upper half.\n-   Repeatedly check until the value is found or the interval is empty.  \n    \n\n**Example :**\n<img src="https://www.geeksforgeeks.org/wp-content/uploads/Binary-Search.png" width="400px">\n\n**Binary Search Algorithm:**  We basically ignore half of the elements just after one comparison.\n\n1.  Compare x with the middle element.\n2.  If x matches with the middle element, we return the mid index.\n3.  Else If x is greater than the mid element, then x can only lie in the right half subarray after the mid element. So we recur for the right half.\n4.  Else (x is smaller) recur for the left half.\n\n\n**Recursive implementation of Binary Search**:\n```c++\n// C++ program to implement recursive Binary Search\n#include <bits/stdc++.h>\nusing` `namespace` `std;\n \n// A recursive binary search function. It returns\n// location of x in given array arr[l..r] is present,\n// otherwise -1\nint` `binarySearch(``int` `arr[], ``int` `l, ``int` `r, ``int` `x)\n{\n  ``if` `(r >= l) {\n    ``int` `mid = l + (r - l) / 2;\n \n    ``// If the element is present at the middle\n    ``// itself\n    ``if` `(arr[mid] == x)\n      ``return` `mid;\n \n    ``// If element is smaller than mid, then\n    ``// it can only be present in left subarray\n    ``if` `(arr[mid] > x)\n      ``return` `binarySearch(arr, l, mid - 1, x);\n \n    ``// Else the element can only be present\n    ``// in right subarray\n    ``return` `binarySearch(arr, mid + 1, r, x);\n  ``}\n \n  ``// We reach here when element is not\n  ``// present in array\n  ``return` `-1;\n}\n \nint` `main(``void``)\n{\n  ``int` `arr[] = { 2, 3, 4, 10, 40 };\n  ``int` `x = 10;\n  ``int` `n = ``sizeof``(arr) / ``sizeof``(arr[0]);\n  ``int` `result = binarySearch(arr, 0, n - 1, x);\n  ``(result == -1)\n    ``? cout << ``"Element is not present in array"\n    ``: cout << ``"Element is present at index "` `<< result;\n  ``return` `0;\n}\n```\n\n**Output**\n\nElement is present at index 3\n\nto be continued...'})
    const [comments, setComments] = useState([
            {commenter: 'nafee', time: Date.now(), comment: 'Ei line a ekta bhule ache na?'},
            {commenter: 'nafee', time: Date.now(), comment: 'accha, na thik ache'},
            {commenter: 'nafee', time: Date.now(), comment: 'na bhul ache. please do check!'},
        ])
    const newComment = useRef()
    useEffect(() => {
        getBlog(blogId)
            .then(res => {
                if(res.status === 'success'){
                    setBlog(res.message.blog);
                }
            })
        getBlogComments(blogId)
            .then(res => {
                if(res.status === 'success'){
                    setComments(res.message.comments);
                }
            })
    })
    function getComment(comment){
        return <div>
            <hr/>
            <div>{comment.comment}</div>
            <div><div>- <a href={"/profile/"+comment.commenter}>{comment.commenter}</a></div><div>{timeConverter(comment.time)}</div></div>
        </div>
    }
    function comment(){
        console.log(newComment.current.value)
        postComment(blogId, newComment.current.value)
    }
    return <div>
        <h1>{blog.blogTitle}</h1>
        <h3>{blog.blogWriter}</h3>
        <h4>Date: {timeConverter(blog.created)}</h4>
        <MDEditor.Markdown source={blog.blogBody} />
        <div>
            <div>
                <FormControl sx={{ width: '100%' }}>
                    <OutlinedInput
                        placeholder="Share your thoughts..."
                        inputRef={newComment}
                        endAdornment={
                            <InputAdornment position="start">
                                <SendIcon onClick={comment}/>
                            </InputAdornment>
                        }
                    >
                    </OutlinedInput>
                </FormControl>
            </div>
            <div>
                {comments.map((comment, index) => {
                    return <div key={index}>{getComment(comment)}</div>
                })}
            </div>
        </div>
    </div>
}