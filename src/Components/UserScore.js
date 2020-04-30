import React from 'react';

const UserScore = ({ name, faces }) => {
    return (
        <div className="text-light mt-5">
            <h1 className="text-warning">Welcome {name}.</h1>
            <br />
            <h4>You have detected <span className="text-success">{faces}</span> faces.</h4>
        </div>
    )
}

export default UserScore;