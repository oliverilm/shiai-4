import React, { useState, useEffect, useContext } from 'react'

const List = () => {
    const [club, setClub] = useState({})
    // TODO: define club interface and club post interface.

    useEffect(() => {
        let mounted = true
        if (mounted) {
            // TODO: get club detail info
        }
        return () => {
            mounted = false
        }
    }, [])

    return (
        <div>
        </div>
    )
}

export default List;