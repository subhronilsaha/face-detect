import React from 'react'

const UserStats = ({ userEntries }) => {
    return (
        <div>
            <br/>
            <h5 className="text-warning">No. of Entries : </h5>
            <h2 className="text-warning">
                { userEntries }
            </h2>
        </div>
    )
}

export default UserStats;