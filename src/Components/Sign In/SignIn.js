import React,  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './SignIn.css';

const SignIn = ({ onRouteChange, loadUser }) => {
    /* -- CSS STYLE -- */
    const centerify = {
        display: "flex", 
        justifyContent: "center", 
    }

    /* -- FORM DETAILS -- */
    const [signInEmail, setEmail] = useState('');
    const [signInPassword, setPassword] = useState('');

    const onEmailChange = (e) => {
      setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = () => {
        fetch('https://shielded-cove-90316.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user.id) {
                    loadUser(user);
                    onRouteChange('home')
                }
            })
            .catch(err => console.log(err))
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
                    onChange={ onEmailChange }
                />
                
                <br />

                <label><b>Password</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="psw" 
                    onChange={ onPasswordChange }
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
                    onClick={ onSubmit }
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default SignIn;