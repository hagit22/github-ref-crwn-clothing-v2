import { useState } from 'react'
////import { useContext } from 'react'
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button, { Button2, Button3, Button4, Button5 } from '../button/button.component'
////import { UserContext } from '../../context/user.context'
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    // useState (with destructuring)
    const [formFields, setFormFields] = useState(defaultFormFields)

    // destructuring
    const { email, password} = formFields

    //console.log("Form-Fields = %O",formFields)

    ////const userContextHandle = useContext(UserContext)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields ({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    
    const loginGoogleUserPopup = async () =>  {
        const response = await signInWithGooglePopup();
        console.log("signin response = %O", response); //This respone contains the user credential for the new signin, including the access token
        console.log("signin response.user.email = %O", response.user.email); 
        ////const userDocRef = await createUserDocumentFromAuth(response.user)

        ////userContextHandle.setCurrentUser(response.user)
        
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

    const handleSubmit = async (event) => {
        event.preventDefault()  
        try {
            const response = await signInAuthUserWithEmailAndPassword (email, password)
            console.log ('calling my signInAuthUserWithEmailAndPassword = %O', response)
            resetFormFields()
            ////userContextHandle.setCurrentUser(response.user)
        }
        catch(error) {
            alert(error.message)
            switch(error.message) {
                case "auth/user-not-found": 
                    alert("no user associated with this email")
                    break
                case "Firbase: Error (auth/wrong-password).": 
                    alert("incorrect password for email")
                    break;
                default: 
                    console.log(error)
            }
        }
    }

    return(
        <div>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit = {handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button onClick={loginGoogleUserPopup} buttonType='google' type='button'>Google sign in</Button>                        
                </div>                        
            </form>
        </div>  
    )
}

export default SignInForm



