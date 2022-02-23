import {useEffect, useState} from "react";
import {showNotification} from '../../component/layout/showNotifications.js'
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

function RatingPage(){
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]);
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    useEffect(() => {
        fetch('http://localhost:5000/users/rating')
            .then(async res => {
                const json = await res.json();
                if(json.status === 'success'){
                    setRatings(json.users);
                }else notification('Error!')
            })
    }, [])

    function goToProfile(handle) {
        navigate('/profile/'+handle)
    }

    return <div>
        <h3>Rating</h3>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Handle</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Rating</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ratings.map((user, index) => {
                    return <TableRow key={index} onClick={() => goToProfile(user.handle)}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{user.handle}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.rating}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        {hint && showNotification(hint, 'info')}
    </div>
}
export default RatingPage;