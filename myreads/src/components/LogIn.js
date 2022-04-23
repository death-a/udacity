import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { validUsername, validPassword } from '../utils/Regex';

const LogIn = ({ handleLogIn, handleSignUp }) => {
    const [signUp, setSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [errmsg, setErrMsg] = useState("");

    const onLogIn = (e) => {
        e.preventDefault();
        if(username === "" && values.password === "") {
            setErrMsg("");
        }
        let matchUser = false;
        const users = JSON.parse(localStorage.getItem("users"));
        if (users !== null) {
            for (const user of users) {
                if (user["username"] === username && user["password"] !== values.password) {
                    setErrMsg('Username Password mismatch');
                    matchUser = true;
                } else if (user["username"] === username && user["password"] === values.password) {
                    handleLogIn(user);
                    matchUser = true;
                }
            }
        }
        if(!matchUser) {
            setErrMsg("User does not exist in database. Please Sign Up!");
        }
    }

    const onSignUp = (e) => {
        e.preventDefault();
        let errUserName = false, errPass = false, errName = false, userExists = false;
        
        if(!validUsername.test(username)) {
            errUserName = true;
        }
        if(!validPassword.test(values.password)) {
            errPass = true;
        }
        if(name.trim() === "") {
            errName = true;
        }
        const users = JSON.parse(localStorage.getItem("users"));
        if (users !== null) {
            for (const user of users) {
                if (user["username"] === username) {
                    userExists = true;
                }
            }
        }
        if(!errUserName && !errPass && !errName && !userExists) {
            handleSignUp(username, name, values.password);
        } else if(errUserName) {
            setErrMsg("Please check if all the rules for username are satisfied");
        } else if(errPass) {
            setErrMsg("Some of the rules for setting the password are not satisfied");
        } else if(errName) {
            setErrMsg("Name cannot be blank");
        } else if(userExists) {
            setErrMsg("Username already exists please enter a different username.");
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onhandleChangeUsername = (event) => {
        setUsername(event.target.value);
        setErrMsg("");
    }

    const onhandleChangeName = (event) => {
        setName(event.target.value);
        setErrMsg("");
    }

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setErrMsg("");
    };

    return (
        <div>
            <div className="list-books-title">
                <h1>{(name !== "") ? name + "'s " : "My"}Reads</h1>
            </div>
            <Link to="/" className="close-search" >Go Back</Link>
            <form className="create-user-form">
                <div className="create-user-details">
                    <p className='create-user-errmsg'>{errmsg}</p>
                    <div className='create-user-div'>
                        <input type="text" 
                            className='create-user-input' 
                            name="username" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(event) => onhandleChangeUsername(event)} />
                    </div>
                    {
                        (signUp) ?
                        <div className='create-user-div'>
                            <input type="text" 
                                className='create-user-input'
                                name="name" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(event) => onhandleChangeName(event)} /> 
                        </div>
                                : 
                        ''
                    }
                    <div className='create-user-div'>
                        <input type={values.showPassword ? "text" : "password"} 
                            className="create-user-input" 
                            name="password" 
                            placeholder="Password" 
                            value={values.password} 
                            onChange={handlePasswordChange("password")} />
                        
                        <span onClick={handleClickShowPassword} 
                            onMouseDown={handleMouseDownPassword}
                            className="password-visibility">
                            {
                                (values.showPassword) ? "Hide" : "Show"
                            }
                        </span>
                    </div>
                    {
                        (signUp) ?
                            <div className="create-user-loggedin">
                                <button name="signup" 
                                    className="button-create-user" 
                                    onClick={onSignUp}>
                                    Sign Up
                                </button>
                                <button name="olduser" 
                                    className="button-login" 
                                    onClick={() => { setSignUp(false); setErrMsg(""); }}>
                                    Already a User?
                                </button>
                            </div>
                            : 
                            ""
                    }
                    {
                        (!signUp) ?
                            <div className="create-user-loggedin">
                                <button name="login"
                                    className="button-create-user" 
                                    onClick={onLogIn}>
                                    Log In
                                </button>
                                <button name="newuser" 
                                    className="button-login" 
                                    onClick={() => { setSignUp(true); setErrMsg(""); }}>
                                    New User? Click here
                                </button>
                            </div>
                                : 
                            ""
                    }
                    {
                        (signUp) ?
                            <div style={{ fontSize: "11px", color: "#737373", marginTop: "20px" }}>
                                <p><strong>Rules for Username:</strong><br></br>
                                1. min 6 characters long<br></br>
                                2. max 20 characters<br></br>
                                3. allowed letters, numbers, dot and underscore.</p>
                                
                                <p><strong>Rules for Password:</strong><br></br>
                                1. min 4 characters<br></br>
                                2. at least one capital letter, one smallcase letter and one number</p>
                            </div>
                            :
                            ""
                    }
                </div>
            </form>
        </div>
    )
}

LogIn.propTypes = {
    handleLogIn: PropTypes.func.isRequired,
    handleSignUp: PropTypes.func.isRequired,
}

export default LogIn;