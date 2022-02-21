import {useEffect, useState} from "react";
import {Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getContestDetail} from "../../contactServer/contest";
import {useNavigate} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import {timeConverter} from '../../component/util/utilFunction.js'

function Contests(props){
    const navigate = useNavigate()
    const [upComing, setUpComing] = useState([])
    const [currentlyRunning, setCurrentlyRunning] = useState([])
    const [previous, setPrevious] = useState([])



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

    function getTableForContest(contests, title){
        return <div>
            <h4>{title}</h4>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Starts at</TableCell>
                            <TableCell>Ends at</TableCell>
                            <TableCell>Setter</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contests.map(contest => {
                            return <TableRow key={contest.id}>
                                <TableCell>{contest.id}</TableCell>
                                <TableCell onClick={() => handler(contest.id)}>{contest.title}</TableCell>
                                <TableCell>{timeConverter(contest.startTime)}</TableCell>
                                <TableCell>{timeConverter(contest.endTime)}</TableCell>
                                <TableCell>{contest.setter}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    }

    return <div>
        <h3>All contest</h3>
        {currentlyRunning.length > 0 && getTableForContest(currentlyRunning, "Running Contests")}
        {upComing.length > 0 && getTableForContest(upComing, "Upcoming Contests")}
        {previous.length > 0 && getTableForContest(previous, "Previous Contests")}
        <Fab
            style={style}
            color={"primary"}
            aria-label={"add"}
            onClick={addContest}
        ><AddIcon/></Fab>
    </div>
}
export default Contests;