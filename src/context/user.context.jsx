import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'


// This is a Context's 'Consumer Oject' which allows you to access the data passed down by the 'Context Provider Component'
// It gives access to the actual data, which is pased as 'props' by the UserContext's Provider (e.g. 'value' paramerer below)
// For creating this object, you use 'createContext()' and pass the default value as a parameter (The default is used just
// in case the 'UserProvider' markup was not used)
export const UserContext = createContext({      
    currentUserDefault: null,   // null is the default value in case the UserProvider markup will not be used. 
                                // (In general: null still returns 'true' (meaning: exists))
    setCurrentUserDefault: () => null
})


// This is a 'Context Provider Component' which allows you to wrap a component tree with a context object,
// and thus give access to all the components nested inside it
export const UserProvider = ({children}) => {

    // the actuall context data 
    const [currentUser, setCurrentUser] = useState(null) // null is the initial value
    const value = { currentUser, setCurrentUser }

    
    useEffect( () => {
        const unsubscribe = onAuthStateChangedListener(
            // This is the callback parameter for onAuthStateChangedListener(). 
            // It takes'user' as the parameter for the callback, which is passed through Firebase's: 'onAuthStateChanged()'

            ////(user) => { console.log("currentUser is: %O", user) }   
            (user) => {
                console.log("currentUser is: %O", user)
                if (user)
                    createUserDocumentFromAuth(user)
                setCurrentUser(user)
            }
        )
        console.log('first mount')
    }, []) // the code in the function is activated once upon UserProvider's first Mount

    //// code outside of useEffect() will be called for every re-render!


    // <userContext.Provider> (markup) is used for wrapping the children (in index.js)
    // We are actually returning the 'Provider' field from 'UserContext' with the actuall current value 
    // that will be passed down in the props.
    // And wrapping the children which were passed down as field of the receieved props parameter.
    return <UserContext.Provider value={value} > {children} </UserContext.Provider> 
}