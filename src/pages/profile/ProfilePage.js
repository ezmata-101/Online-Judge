import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function ProfilePage(props){
    const location = useLocation();
    const [handle, setHandle] = useState('empty');
    const [name, setName] = useState('empty');
    const [joinDate, setJoinDate] = useState(" ");
    const [rating, setRating] = useState(" ");
    const [lastLogin, setLastLogin] = useState(" ");
    const [institute, setInstitute] = useState('-');
    const [country, setCountry] = useState('-');
    const [email, setEmail] = useState('-');


    const handle1 = location.state.userHandle;

    console.log(handle1)

    useEffect(() =>{
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'BEARER '+localStorage.getItem("accessToken")
            }
        }

        fetch("http://localhost:5000/users/"+handle1, options)
            .then(async res => {
                const json = await res.json();
                setHandle(json.handle)
                setName(json.name)
                setJoinDate(json.joinDate)
                setLastLogin(json.lastLogin)
                setCountry(json.country)
                setInstitute(json.institute)
                setRating(json.rating)
            }).catch(err => {
                console.error(err)
        })
    }, null)

    return <div className={"profile-section"}>
        <table>
            <tr>
                <td>Handle</td>
                <td>{handle}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{name}</td>
            </tr>
            <tr>
                <td>Rating</td>
                <td>{rating}</td>
            </tr>
            <tr>
                <td>Join Date</td>
                <td>{joinDate}</td>
            </tr>
            <tr>
                <td>Last Login</td>
                <td>{lastLogin}</td>
            </tr>
            <tr>
                <td>Institute</td>
                <td>{institute}</td>
            </tr>
            <tr>
                <td>Country</td>
                <td>{country}</td>
            </tr>
            <tr>
                <td>email</td>
                <td>{email}</td>
            </tr>
        </table>
    </div>
}
export default ProfilePage;