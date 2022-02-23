import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getUserDetail} from './../../contactServer/auth.js'
import {getUserSubmissions} from "../../contactServer/submission.js";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {timeConverter, timeSince} from "../../component/util/utilFunction";
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

    return <div className={"profile-section"} style={{justifyItems:'center'}}>
        <div style={{width:'100%'}}>
            <div style={{width:"50%", margin: '0 auto'}}>
                <table>
                    <tbody>
                    <tr>
                        <td>Handle</td>
                        <td style={{paddingLeft: '10px'}}>{handle}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td style={{paddingLeft: '10px'}}>{profile.name}</td>
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td style={{paddingLeft: '10px'}}>{profile.rating}</td>
                    </tr>
                    <tr>
                        <td>Join Date</td>
                        <td style={{paddingLeft: '10px'}}>{timeSince(Date.parse(profile.joinDate))+' ago'}</td>
                    </tr>
                    <tr>
                        <td>Last Login</td>
                        <td style={{paddingLeft: '10px'}}>{timeSince(Date.parse(profile.lastLogin))+' ago'}</td>
                    </tr>
                    <tr>
                        <td>Institute</td>
                        <td style={{paddingLeft: '10px'}}>{profile.institute}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td style={{paddingLeft: '10px'}}>{profile.country}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td style={{paddingLeft: '10px'}}>{profile.email}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h2 style={{textAlign: 'center', marginTop: '25px'}}>User Submission</h2>
        <div>
            <div><b style={{fontSize: '18px'}}>Total Submissions:</b> <i>{sub}</i></div>
            <div style={{color:'green'}}><b style={{fontSize: '18px'}}>Accepted: </b><i>{ac}</i></div>
        </div>
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>No</b></TableCell>
                        <TableCell><b>Contest</b></TableCell>
                        <TableCell><b>Problem</b></TableCell>
                        <TableCell><b>Submission Time</b></TableCell>
                        <TableCell><b>Verdict</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions.map((s, index)=> {
                        return <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell onClick={()=>goToContest(s.contestId)}><Button>{s.contestId}</Button></TableCell>
                            <TableCell onClick={()=>goToProblem(s.contestId, s.problemId)}><Button>{s.name}</Button></TableCell>
                            <TableCell onClick={()=>goToSubmission(s.contestId, s.problemId, s.submissionId)}><Button>{timeConverter(s.subTime)}</Button></TableCell>
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