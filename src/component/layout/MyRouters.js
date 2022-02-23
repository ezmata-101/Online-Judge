import {Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/authentication/LoginPage";
import ProblemPage from "../../pages/ProblemPage/ProblemPage";
import SubmissionPage from "../../pages/SubmissionPage/SubmissionPage";
import ContestCreationPage from "../../pages/ContestCreationPage/ContestCreationPage";
import ContestAdminPage from "../../pages/ContestAdminPage/ContestAdminPage";
import SignUpPage from "../../pages/authentication/SignUpPage";
import ProfilePage from "../../pages/profile/ProfilePage";
import ProblemCreate from "../../pages/ProblemCreationPage/ProblemCreate";
import Contests from "../../pages/ContestsPage/Contests";
import Contest from "../../pages/ContestDetailPage/Contest";
import ProblemListPage from "../../pages/problemListPage/ProblemListPage";
import React from "react";
import BlogCreatePage from "../../pages/BlogCreatePage/BlogCreatePage";
import BlogPage from "../../pages/BlogPage/BlogPage";
import BlogsPage from "../../pages/BlogsPage/BlogsPage";

export default function MyRouters() {
    return (
        <Routes>
            <Route path='/' exact
                   element={<LoginPage/>}>
            </Route>
            <Route path='/problem/:contestId/:problemNo' exact
                   element={<ProblemPage/>}>
            </Route>
            <Route path="/problem-create/:contestId" exact
                   element={<ProblemCreate/>}>
            </Route>
            <Route path="/create-contest"
                   element={<ContestCreationPage/>}>
            </Route>
            <Route path="/login"
                   element={<LoginPage/>}>
            </Route>
            <Route path="/signup"
                   element={<SignUpPage/>}>
            </Route>
            <Route path="/contest-admin/:contestId" exact
                   element={<ContestAdminPage/>}>
            </Route>
            <Route path="/create-blog" exact
                   element={<BlogCreatePage/>}>
            </Route>
            <Route path="/problem-create"
                   element={<ProblemCreate/>}>
            </Route>
            <Route path="/contests"
                   element={<Contests/>}>
            </Route>
            <Route path="/contest/:contestId" exact
                   element={<Contest/>}>
            </Route>
            <Route path="/problems"
                   element={<ProblemListPage/>}>
            </Route>
            <Route path="/submission/:contestId/:problemId/:submissionId"
                   element={<SubmissionPage/>}>
            </Route>
            <Route path="/blog/:blogId"
                   element={<BlogPage/>}>
            </Route>
            <Route path="/profile/:handle" exact
                   element={<ProfilePage/>}>
            </Route>
                <Route path="/blogs" exact
                       element={<BlogsPage/>}>
                </Route>
        </Routes>
    )
}