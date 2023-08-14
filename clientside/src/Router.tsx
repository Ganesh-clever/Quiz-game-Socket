import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { ProductedRouter, PublicRouter } from "./Utils/GlobalFunctions";
import Layout from "./Pages/Layout/Layout";
import Settings from "./Pages/Settings/Settings";
import QuizQuestion from "./Pages/QuizQuestion/QuizQuestion";
import ProfilePage from "./Pages/Profile/ProfilePage";
import RoomPage from "./Pages/Room/RoomPage";
import QuizGamePage from "./Pages/QuizQuestion/QuizGamePage";
import QuestionContainer from "./Pages/QuizQuestion/QuestionContainer";
import Message from "./Pages/Message/Message";
import VideoChat from "./Pages/VideoChat/VideoChat";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<ProductedRouter><Layout/></ProductedRouter>,
        children:[
            {
                path:'/',
                element:<Dashboard/>
            },
            {
                path:'rooms',
                element:<RoomPage/>
            },
            {
                path:'profile',
                element:<ProfilePage/>
            },
            {
                path:'quiz-slots',
                element:<QuizQuestion/>
            },
            {
                path:'quiz-game',
                element:<QuizGamePage/>
            },
            {
                path:'settings',
                element:<Settings/>
            },
            {
                path:'chat',
                element:<Message/>
            },
            {
                path:'video-conference',
                element:<VideoChat/>
            },
        ]
    },
    {
        path:'/login',
        element:<PublicRouter><Login/></PublicRouter>
    },
    {
        path:'/register',
        element:<Register/>
    }
])