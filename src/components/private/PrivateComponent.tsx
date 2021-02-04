import React, {ReactChildren, ReactNode, useContext, useEffect, useState} from 'react'

import { AuthContext } from '../../hooks/context'


interface PrivateComponentProps {
    children?: ReactNode;
}
  
const PrivateComponent = ({children}: PrivateComponentProps) => {
    const auth = useContext(AuthContext)
    return auth.isAuthenticated ? (
        <div>
            {children}
        </div>
    ) : (<></>)
}

export default PrivateComponent
