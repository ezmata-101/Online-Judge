import React from 'react'
import Header from "./component/layout/Header";
import ProblemPage from "./pages/ProblemPage/ProblemPage";
import Submission from "./models/Submission";
import {Route, Routes} from "react-router-dom";
import SubmissionPage from "./pages/SubmissionPage/SubmissionPage";
import ContestCreationPage from "./pages/ContestCreationPage/ContestCreationPage";
import ContestAdminPage from "./pages/ContestAdminPage/ContestAdminPage";
import LoginPage from "./pages/authentication/LoginPage";

function App() {
    const problem = {
        problemId: 'c1p1',
        name: 'Shortest Path',
        difficulty: 1200,
        category: ['Graph Theory', 'Shortest Path'],
        timeLimit: 2,
        memoryLimit: 256,
        statement: 'demo.md',
        input: [
            {key:0, ip:"4 3 5\n1 2 5\n1 3 9\n2 3 3\n1 2\n2 1\n1 3\n1 4\n3 2\n"},
            {key:1, ip:"4 3 5\n1 2 5\n1 3 9\n2 3 3\n1 2\n2 1\n1 3\n1 4\n3 2\n"},
        ],
        output: [
            {key:0, op: "5\n5\n8\n-1\n3\n"},
            {key:1, op: "5\n5\n8\n-1\n3\n"}
        ],
        tutorial: 'null'
    }
    const sub1 = new Submission('pid', Date.now(), 'C++', 'AC', 232, 124,1, 'c1p1', 'null')
    const sub2 = new Submission('pid', Date.now(), 'C++', 'WA', 202, 124,1, 'c1p1', 'null')
    const sub3 = new Submission('pid', Date.now(), 'C++', 'TLE', 3000, 124,1, 'c1p1', 'null')

    const prevSubmissions = [
        sub1.getAsJSON(),
        sub2.getAsJSON(),
        sub3.getAsJSON(),
    ]
  return (
    <div className="App">
      <Header/>
        <Routes>
            <Route path='/' exact
                   element={<ProblemPage problem={problem} prevSubs={prevSubmissions}/>}>
            </Route>
            <Route path="/submission"
                   element={<SubmissionPage submission={null}/>}>
            </Route>
            <Route path="/create-contest"
                   element={<ContestCreationPage/>}>
            </Route>
            <Route path="/contest-admin"
                   element={<ContestAdminPage/>}>
            </Route>
            <Route path="/login"
                   element={<LoginPage/>}>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
