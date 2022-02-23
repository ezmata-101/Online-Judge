import {useEffect, useState} from "react";
import {showNotification} from '../../component/layout/showNotifications.js'
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
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
        <h1 style={{textAlign: 'center'}}>RATING</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell><b>RANK</b></TableCell>
                    <TableCell><b>HANDLE</b></TableCell>
                    <TableCell><b>NAME</b></TableCell>
                    <TableCell><b>RATING</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ratings.map((user, index) => {
                    return <TableRow key={index} onClick={() => goToProfile(user.handle)}>
                        <TableCell><Button>{index+1}</Button></TableCell>
                        <TableCell><Button>{user.handle}</Button></TableCell>
                        <TableCell><Button>{user.name}</Button></TableCell>
                        <TableCell><Button>{user.rating}</Button></TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        {hint && showNotification(hint, 'info')}
    </div>
}
export default RatingPage;