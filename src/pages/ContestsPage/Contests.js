import {useEffect, useState} from "react";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import {timeConverter} from '../../component/util/utilFunction.js'
import {showNotification} from '../../component/layout/showNotifications.js'
function Contests(props){
    const navigate = useNavigate()
    const [upComing, setUpComing] = useState([])
    const [currentlyRunning, setCurrentlyRunning] = useState([])
    const [previous, setPrevious] = useState([])
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }



    useEffect(() => {
        fetch('http://localhost:5000/contests/contests')
            .then(async res => {
                const json = await res.json();
                console.log(json)
                if(json.contests == null) return <div>No Contest Found</div>

                const numOfContest = json.contests.length;

                const up = [];
                const current = [];
                const prev = [];
                const now = Date.now();
                for(let i=0; i<numOfContest; i++){
                    const contest = json.contests[i];
                    if(contest.startTime > now) up.push(contest);
                    else if(contest.endTime < now) prev.push(contest);
                    else current.push(contest)
                }
                setUpComing(up);
                setCurrentlyRunning(current);
                setPrevious(prev)
            })

    }, [])


    async function handler(id) {
        console.log(id)

        navigate('/contest/'+id)
        // const res = await getContestDetail({contestId: id})
        // console.log(res);
    }
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    function addContest(){
        navigate('/create-contest')
    }

    function goToSetter(setter) {
        navigate('/profile/'+setter)
    }

    function getTableForContest(contests, title){
        return <div>
            <h3 style={{textAlign:'center'}}><u>{title}</u></h3>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign:'center'}}><b>ID</b></TableCell>
                            <TableCell style={{textAlign:'center'}}><b>TITLE</b></TableCell>
                            <TableCell style={{textAlign:'center'}}><b>START TIME</b></TableCell>
                            <TableCell style={{textAlign:'center'}}><b>END TIME</b></TableCell>
                            <TableCell style={{textAlign:'center'}}><b>SETTER</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contests.map(contest => {
                            return <TableRow key={contest.id}>
                                <TableCell onClick={() => handler(contest.id)}>{contest.id}</TableCell>
                                <TableCell onClick={() => handler(contest.id)}><Button>{contest.title}</Button></TableCell>
                                <TableCell><Button>{timeConverter(contest.startTime)}</Button></TableCell>
                                <TableCell><Button>{timeConverter(contest.endTime)}</Button></TableCell>
                                <TableCell onClick={() => goToSetter(contest.setter)}><Button>{contest.setter}</Button></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }

    return <div>
        <h1 style={{textAlign:'center'}}>ALL CONTESTS</h1>
        {currentlyRunning.length > 0 && getTableForContest(currentlyRunning, "Running Contests")}
        {upComing.length > 0 && getTableForContest(upComing, "Upcoming Contests")}
        {previous.length > 0 && getTableForContest(previous, "Previous Contests")}
        <Fab
            style={style}
            color={"primary"}
            aria-label={"add"}
            onClick={addContest}
        ><AddIcon/></Fab>
        {hint && showNotification(hint, 'info')}
    </div>
}
export default Contests;