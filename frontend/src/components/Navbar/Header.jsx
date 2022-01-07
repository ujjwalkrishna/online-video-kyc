import React, { useState, useEffect } from "react";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, Link, useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import personIcon from "../../assets/images/avatar.jpeg"
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';
import { logout } from "../../http/index"

function Header() {
    const { user } = useSelector((state) => state.auth);

    const [header, setHeader] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [login, changeLogin] = useState(false);
    const dispatch = useDispatch();
    
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    let history = useHistory();

    useEffect(async () => {
        if (user != null) {
            changeLogin(true);
        }
    }, []);

    async function handleLogout() {
        try {
            const { data } = await logout();
            changeLogin(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setAuth({ user: null, isAuth: false }));
            //console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    };
    window.addEventListener("scroll", changeBackground);

    return (
        <div className={header ? "header active2" : "header"}>
            <div className="headerLeft">
                <Link className="link" to="/">
                    <h2 className="logo">OnlineKYC</h2>
                </Link>
            </div>
            <div className="headerMiddle">
                <NavLink className="link1" to="/users/home" activeClassName="active1">
                    <h2 className="menuItems">Home</h2>
                </NavLink>
                <NavLink className="link1" to="/users/video-calling" activeClassName="active1">
                    <h2 className="menuItems">Video Calling</h2>
                </NavLink>
                <NavLink className="link1" to="/users/basic-details" activeClassName="active1">
                    <h2 className="menuItems">Documents Verification</h2>
                </NavLink>
            </div>
            <div className="headerRight">
                {user && user.userPhotoUrl ? <Avatar onClick={() => handleToggle()} aria-haspopup="true" aria-controls={open ? "menu-list-grow" : undefined} ref={anchorRef} className="avatar" alt={user.name} src={user.userPhotoUrl} /> : <Avatar className="profilePic" onClick={() => handleToggle()} aria-haspopup="true" aria-controls={open ? "menu-list-grow" : undefined} ref={anchorRef} src={personIcon} className="avatar"></Avatar>}
                <Popper
                    className="dropdown"
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={(e) => handleClose(e)}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={(e) => handleListKeyDown(e)}>
                                        {!user && <><MenuItem className="link2" onClick={() => history.push("/login")}>
                                            Login
                                        </MenuItem>
                                            <MenuItem className="link2" onClick={() => history.push("/signup")}>
                                                Sign Up
                                            </MenuItem></>}
                                        {user && <><Link className="link" to="/users/profile">
                                            <MenuItem className="link2" onClick={(e) => handleClose(e)}>
                                                My Dashboard
                                            </MenuItem>
                                        </Link>
                                            <MenuItem className="link2" onClick={() => handleLogout()}>
                                                Logout
                                            </MenuItem></>}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}

export default Header;
