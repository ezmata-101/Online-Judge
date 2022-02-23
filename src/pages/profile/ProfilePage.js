import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getUserDetail} from './../../contactServer/auth.js'
import {getUserSubmissions} from "../../contactServer/submission.js";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {timeConverter} from "../../component/util/utilFunction";
import {showNotification} from '../../component/layout/showNotifications.js'
function ProfilePage(props) {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        joinDate: '0',
        country: '',
        email: '',
        institute: '',
        lastLogin: '0',
        rating: -1
    })
    const [hint, setHint] = useState(null);
    function notification(message){
        setHint(message);
        setTimeout(() => setHint(null), 5000);
    }
    const {handle} = useParams();
    const [submissions, setSubmissions] = useState([])
    const [sub, setSub] = useState(0)
    const [ac, setAc] = useState(0)
    useEffect(() => {
        getUserDetail(handle)
            .then(res => {
                if(res.status === 'success'){
                    setProfile(res.profileDetail)
                }else notification('Failed')
            })
        getUserSubmissions(handle)
            .then(res => {
                console.log(res)
                if(res.status === 'success'){
                    setSubmissions(res.message);
                    setSub(res.message.length)
                    setAc(res.message.filter(r => r.verdict === 'AC').length);
                }else notification('failed')
            })
    }, [])


    function goToContest(contestId) {
        navigate('/contest/'+contestId)
    }

    function goToProblem(contestId, problemId) {
        navigate('/problem/'+contestId+'/'+problemId)
    }

    function goToSubmission(contestId, problemId, submissionId) {
        navigate('/submission/'+contestId+'/'+problemId+'/'+submissionId)
    }

    return <div className={"profile-section"}>
        <table>
            <tbody>
            <tr>
                <td>Handle</td>
                <td>{handle}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{profile.name}</td>
            </tr>
            <tr>
                <td>Rating</td>
                <td>{profile.rating}</td>
            </tr>
            <tr>
                <td>Join Date</td>
                <td>{profile.joinDate}</td>
            </tr>
            <tr>
                <td>Last Login</td>
                <td>{profile.lastLogin}</td>
            </tr>
            <tr>
                <td>Institute</td>
                <td>{profile.institute}</td>
            </tr>
            <tr>
                <td>Country</td>
                <td>{profile.country}</td>
            </tr>
            <tr>
                <td>email</td>
                <td>{profile.email}</td>
            </tr>
            </tbody>
        </table>
        <h4>User Submissions</h4>
        <h5>Total Submissions: {sub}</h5>
        <h5 style={{color:'green'}}>Accepted: {ac}</h5>
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Contest</TableCell>
                        <TableCell>Problem</TableCell>
                        <TableCell>Submission Time</TableCell>
                        <TableCell>Verdict</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions.map((s, index)=> {
                        return <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell onClick={()=>goToContest(s.contestId)}>{s.contestId}</TableCell>
                            <TableCell onClick={()=>goToProblem(s.contestId, s.problemId)}>{s.name}</TableCell>
                            <TableCell onClick={()=>goToSubmission(s.contestId, s.problemId, s.submissionId)}>{timeConverter(s.subTime)}</TableCell>
                            <TableCell>{s.verdict}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
        {hint && showNotification(hint, 'info')}

    </div>
}

export default ProfilePage;