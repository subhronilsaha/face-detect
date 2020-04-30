import React from 'react';
import Button from 'react-bootstrap/Button';
import './SignIn.css';

const SignIn = ({ onRouteChange }) => {

    const centerify = {
        display: "flex", 
        justifyContent: "center", 
    }

    return (
        <div style={centerify}>
            <div className="form-container">
                <h1>Sign In</h1>
                <br />
                <h5>Welcome to Face Detect! Enter your details to begin.</h5>
                <br />
  
                <label><b>Email</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Email" 
                    name="email"
                />
                
                <br />

                <label><b>Password</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="psw" 
                    required 
                />
                    
                <br />
                <br />

                <div className="go-to-register">
                    <p>Don't have an account?   
                        <Button 
                            variant="outline-warning" 
                            onClick= {() => onRouteChange('register')}
                            className= "ml-2"
                        >
                            Register
                        </Button>.
                    </p>
                </div>

                <br />

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={() => onRouteChange('home')}
                    disabled
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default SignIn;