import React from 'react'
import spinner from '../assets/spinner.svg'

export default function Loader() {
    const loaderStyle = {
        height: "95vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(90deg, #d53369 0%, #daae51 100%)"
    }

    return (
        <div style={loaderStyle}>
            <img 
                alt="spinner" 
                src={spinner} 
                width="100px"
                className="mb-2"
            />
            <h6>Face Detect is loading!</h6>
            <h6>Please wait...</h6>
        </div>
    )
}
