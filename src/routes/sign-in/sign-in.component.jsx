import { useEffect } from 'react'
import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { delay } from '../../utils/genutils/time.utils'
import { getAuth, getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {

    const waitForResponse = async () => {
        const response = await getRedirectResult(getAuth()) // getAuth() is a Singleton which keeps the current Authentication info.
        if (response) { // meaning its not null, but rather it has already been assigned. Meaning there was a redirect (otherwise it would be null)
            //console.log("signin with redirect: email = ", response.user.email);
            const userDocRef = await createUserDocumentFromAuth(response.user)
        }
    }

    useEffect( () => {
        waitForResponse()
    }, [])

    const loginGoogleUserPopup = async () =>  {
        const response = await signInWithGooglePopup();
        console.log("signin response = %O", response); //This respone contains the user credential for the new signin, including the access token
        console.log("signin response.user.email = %O", response.user.email); 
        const userDocRef = await createUserDocumentFromAuth(response.user)
        
        // Same code above with: DESTRUCTURING !!!
        //const { user } = await signInWithGooglePopup();
        //await createUserDocumentFromAuth(user)
    }
    const loginGoogleUserRedirect = async () => {
        /*
        We dont need await here any more - because there is redirect and code flow stops anyhow!!
        Instead we will take care of the result, through use-effect when the page starts (e.g. after redirect)
        Thats why below, the function: 'signInWithGoogleRedirect' is hust called as is, without async-await!!
        And the following code is commented out:
        
        const response = await signInWithGoogleRedirect();
        console.log("sign in with redirect: user = %O", response.user)
        //await createUserDocumentFromAuth(response.user)
        */

        signInWithGoogleRedirect();

    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={loginGoogleUserPopup}>Sign in with Google Popup</button>
            <button onClick={loginGoogleUserRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;