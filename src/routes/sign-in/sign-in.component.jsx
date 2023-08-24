import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { delay } from '../../utils/genutils/time.utils'

const SignIn = () => {
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
        const response = await signInWithGoogleRedirect();
        await createUserDocumentFromAuth(response.user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={loginGoogleUserPopup}>Sign in with Google Popup</button>
            <button onClick={loginGoogleUserRedirect}>Sign in with Google Redirect</button>
        </div>
    )
}

export default SignIn;