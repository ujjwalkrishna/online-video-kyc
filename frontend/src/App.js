import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UsersHome from './pages/Home/Users/LandingPage';
import AdminHome from './pages/Admin/Home';
import VideoHome from './pages/VideoCalling';
import ReactNotification from 'react-notifications-component'
import Login from './pages/Authenticate/Login';
import Signup from './pages/Authenticate/Signup';
import Testimonial from "./components/Testimonial/Testimonial";
import Navbar from "./components/Navbar/Header";
import UserProfile from "./pages/Home/Users/UserProfile"
import Footer from "./components/Navbar/Footer";
import SideNavbar from "./components/SideNavbar/SideNavbar";
import BasicDetails from './pages/Documents/BasicDetails';
import AadharDetails from './pages/Documents/AadharDetails';
import PanDetails from './pages/Documents/PanDetails';
import CancelledCheque from './pages/Documents/CancelledCheque';
import Signature from './pages/Documents/Signature';
import PhotoVerification from "./pages/Documents/PhotoVerification";
import LocationVerification from "./pages/Documents/LocationVerification";
import Congratulations from "./pages/Documents/Congratulations"
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import { socket } from "./context/VideoState";
import 'react-notifications-component/dist/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'antd/dist/antd.css';
import './App.css';


function App() {
    // call refresh endpoint
    const { loading } = useLoadingWithRefresh();
    const { user } = useSelector((state) => state.auth);
    console.log(socket);
    console.log(user)
    socket.on('connect', () => {
        socket.send(user);
    });

    return loading ? (
        <Loader message="Loading, please wait.." />
    ) : (
        <BrowserRouter>
            <Navbar />
            <ReactNotification />
            <Switch>
                <GuestRoute path="/" exact>
                    <>
                    <UsersHome />
                    <Footer /> 
                    </>
                </GuestRoute>
                <GuestRoute path="/login">
                    <Login />
                </GuestRoute>
                <GuestRoute path="/signup">
                    <ReactNotification />
                    <Signup />
                </GuestRoute>

                <ProtectedRoute path="/users/home">
                    <>
                    <UsersHome />
                    <Footer /> 
                    </>
                </ProtectedRoute>

                <ProtectedRoute path="/users/profile">
                    <UserProfile />
                </ProtectedRoute>

                <ProtectedRoute path="/users/basic-details">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <BasicDetails />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/aadhar-details">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <AadharDetails />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/pan-details">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <PanDetails />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/cheque-details">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <CancelledCheque />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/signature">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <Signature />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/photo-verification">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <PhotoVerification />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/congratulations">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <Congratulations />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/loc-verification">
                    <div className="app">
                        <div className="NavbarSection">
                            <SideNavbar />
                        </div>
                        <div className="main">
                            <LocationVerification />
                        </div>
                    </div>
                </ProtectedRoute>

                <ProtectedRoute path="/users/video-calling">
                    <VideoHome />
                </ProtectedRoute>

                <ProtectedRoute path="/admin/home">
                    <AdminHome />
                </ProtectedRoute>

                {/* <ProtectedRoute path="/admin/user-profile">
                    <UserProfile />
                </ProtectedRoute> */}
            </Switch>
        </BrowserRouter>
    );
}

const GuestRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return isAuth ? (user.role == "admin" ? (
                    <Redirect
                        to={{
                            pathname: '/admin/home',
                            state: { from: location },
                        }}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/users/home',
                            state: { from: location },
                        }}
                    />
                )) : (
                    children
                );
            }}
        ></Route>
    );
};

const ProtectedRoute = ({ children, ...rest }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={({ location }) => {
                return !isAuth ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                );
            }}
        ></Route>
    );
};

export default App;
