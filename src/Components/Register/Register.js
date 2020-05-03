import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import "../Sign In/SignIn.css";

const Register = ({ onRouteChange, loadUser }) => {   

    const centerify = {
        display: "flex", 
        justifyContent: "center", 
    }
    
    /* -- FORM VALIDATION -- */
    const [signInName, setName] = useState('');
    const [signInEmail, setEmail] = useState('');
    const [signInPassword, setPassword] = useState('');

    const onNameChange = (e) => {
        setName(e.target.value);
    }
    
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    const onSubmit = () => {
        fetch('https://shielded-cove-90316.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: signInName,
                email: signInEmail,
                password: signInPassword,
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user) {
                    loadUser(user);
                    onRouteChange('home');
                }
            })
    }

    return (
        <div style={centerify}>
            <div className="form-container">
                <h1>Register</h1>
                <br />
                <h5>Welcome to Face Detect! Enter your details to begin.</h5>
                <br />

                <label><b>Name</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Name" 
                    name="name" 
                    onChange= { onNameChange }
                    required 
                />

                <br />

                <label><b>Email</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Email" 
                    name="email" 
                    onChange= { onEmailChange }
                />
                
                <br />

                <label><b>Password</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="psw" 
                    onChange= { onPasswordChange }
                />
                    
                <br />
                <br />

                <div>
                    <p>Already have an account?   
                        <Button 
                            variant="outline-warning" 
                            onClick= {() => onRouteChange('signin')}
                            className= "ml-2"
                        >
                            Login
                        </Button>.
                    </p>
                </div>

                <br />

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={ onSubmit }
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Register;