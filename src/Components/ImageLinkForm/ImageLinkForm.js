import React from 'react'
import Button from 'react-bootstrap/Button'
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="text-light mt-5">
            <p style={{fontSize: "20px"}}>This software will detect faces in your pictures! (powered by Clarif.ai)</p>
            <p style={{fontSize: "20px"}} className="text-success">Enter a link to an image to begin. (Portrait images preferred for maximum accuracy)</p>
            <div>
                <input className="image-link-form" type="text" onChange={ onInputChange } />
                <Button variant="success" onClick={ onButtonSubmit }>Detect Faces</Button>
            </div>
        </div>
    )
}

export default ImageLinkForm;