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

    const onLogIn = (e) => {
        e.preventDefault();
        let matchedNamePass = false;
        const users = JSON.parse(localStorage.getItem("users"));
        if (users !== null) {
            for (const user of users) {
                if (user["username"] === username && user["password"] === values.password) {
                    matchedNamePass = true;
                    handleLogIn(user);
                }
            }
        } else {
            console.log("User does not exist. Please create new User");
        }
        if (!matchedNamePass) {
            console.log("Username or Password Incorrect. Please try again.");
        }
    }

    const onSignUp = (e) => {
        e.preventDefault();
        let errName = false, errPass = false;
        
        if(!validUsername.test(username)) {
           errName = true;
        }
        if(!validPassword.test(values.password)) {
            errPass = true;
        }
        if(!errName && !errPass) {
            handleSignUp(username, name, values.password);
        } else if(errName) {
            console.log("Username should be minimum 6 characters long and maximum 20, can have only letters, numbers, dot and underscore.");
        } else if(errPass) {
            console.log("Password can have minimum 4 characters, at least one capital letter, one smallcase letter and one number");
        }
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div>
            <div className="list-books-title">
                <h1>{(name !== "") ? name + "'s " : "My"}Reads</h1>
            </div>
            <Link to="/" className="close-search" >Go Back</Link>
            <form className="create-user-form">
                <div className="create-user-details">
                    <div className='create-user-div'>
                        <input type="text" 
                            className='create-user-input' 
                            name="username" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    {
                        (signUp) ?
                        <div className='create-user-div'>
                            <input type="text" 
                                className='create-user-input'
                                name="name" 
                                placeholder="Name" 
                                value={name} 
                                onChange={(event) => setName(event.target.value)} /> 
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
                                    onClick={() => { setSignUp(false) }}>
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
                                    onClick={() => { setSignUp(true) }}>
                                    New User? Click here
                                </button>
                            </div>
                                : 
                            ""
                    }
                </div>
            </form>
        </div>
    )
}

export default LogIn;