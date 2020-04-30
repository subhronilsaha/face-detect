import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import "../Sign In/SignIn.css";

const Register = ({ onRouteChange, onNameSubmit }) => {   
    
    const [input, setInput] = useState(false);

    const centerify = {
        display: "flex", 
        justifyContent: "center", 
    }

    function checkInputs(e) {
        // Form Validation
        let name = e.target.value;

        if (name === '' || name === ' ') {
            setInput(false)
        } else {
            setInput(true)
        }

        onNameSubmit(e);
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
                    onChange= {checkInputs}
                    required 
                />

                <br />

                <label><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required />
                
                <br />

                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />
                    
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
                    onClick={() => onRouteChange('home')}
                    disabled = {input ? false : true}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Register;