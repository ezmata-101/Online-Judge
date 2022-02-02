import Contest from './../../models/Contest.js';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Problem from "./../../models/Problem.js";

function ContestAdminPage(props){
    // const contest = props.contest;
    const time = new Date();
    const contest = {
        title: "Nafee special",
        id: 1,
        startTime: time,
        endTime: time+1,
        announcement: "## Hi, Codeforces!\n" +
            "***Vladithur*** and I are pleased to invite you to our Codeforces Round #769 (Div. 2), which will be held on **Sunday, January 30, 2022 at 20:35UTC+6**. This round will be rated for participants with rating lower than *2100*.\n" +
            "\n" +
            "We would like to express our great gratitude to:\n" +
            "\n" +
            "***irkstepanov*** and ***KAN*** for not rejecting our tasks excellent coordination of the round and assistance in preparing problems.\n" +
            "***Ormlis***, ***antontrygubO_o***, ***generic_placeholder_name***, ***Alexdat2000***, ***Dart-Xeyter***, ***wxhtzdy***, ***sohsoh***, ***zer0brain***, ***radal***, ***dbsic211***, ***stevancv***, ***maxverr***, ***Scrubpai***, ***Artem1303***, ***RomkaRomantic*** and ***MaxShch*** for testing the round and providing useful feedback.\n" +
            "***MikeMirzayanov*** for cool platforms ***Codeforces*** and ***Polygon***.\n" +
            "You will have *2* hours to solve *5* problems, one of which is divided into *two* subtasks.\n" +
            "\n" +
            "The scoring distribution is **500 — 1000 — 1500 — 2000 — (1500 — 1500)**\n" +
            "\n" +
            "We have tried to make clear statements and strong pretests for the problems and hope you will have fun and increase your rating!\n" +
            "\n" +
            "Good luck!\n\n",
        problems: [
            {id: 1, name: "Problem 1", rating: 500, solve: 10, tried: 15},
            {id: 2, name: "Problem 2", rating: 750, solve: 8, tried: 18},
            {id: 3, name: "Problem 3", rating: 1000, solve: 5, tried: 15},
            {id: 4, name: "Problem 4", rating: 1200, solve: 15, tried: 6},
            {id: 5, name: "Problem 5", rating: 1500, solve: 1, tried: 1},]
    }

    return <div>
        <div>
            <h3>Contest Title: {contest.title}</h3>
            <h4>Contest ID: {contest.id}</h4>
            <Table className={"problem-list-table"}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            No
                        </TableCell>
                        <TableCell>
                            Problem Name
                        </TableCell>
                        <TableCell>
                            Rating
                        </TableCell>
                        <TableCell>
                            Solve/Try
                        </TableCell>
                        <TableCell>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contest.problems.map(problem => {
                        return <TableRow key={problem.id}>
                            <TableCell>{problem.id}</TableCell>
                            <TableCell>{problem.name}</TableCell>
                            <TableCell>{problem.rating}</TableCell>
                            <TableCell>{problem.solve}/{problem.tried}</TableCell>
                            <TableCell><Button>Edit</Button> <Button>Delete</Button></TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    </div>
}

export default ContestAdminPage;