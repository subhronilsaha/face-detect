import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box }) => {
    return (
        <div style={{background: "white"}}>
            <div className="bounding-box" 
                style={{
                    top: box.topRow, 
                    bottom: box.bottomRow, 
                    left: box.leftCol, 
                    right: box.rightCol
                }}>
            </div>
        </div>
    )
}

export default FaceRecognition;