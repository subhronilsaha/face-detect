import React from 'react';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/Logo.png';

const Navigation = ({ onRouteChange }) => {
    const navStyle = {
        height: "60px",
        width: "100%",
        background: "rgb(255, 255, 255)",
        borderBottom: "black solid 1px", 
        display: "flex", 
        justifyContent: "space-between",
        padding: "6px 20px"
    }

    return (
        <div style={navStyle}>
            <img alt="" src={Logo} width="160px" />
            <Button variant="outline-danger" className="float-right" onClick={() => onRouteChange('signin')}>Sign Out</Button>
        </div>
    )
}

export default Navigation;