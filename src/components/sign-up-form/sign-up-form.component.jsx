import { useState } from 'react'
////import { useContext } from 'react'
import { creatAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button, { Button2, Button3, Button4, Button5 } from '../button/button.component'
////import { UserContext } from '../../context/user.context'
import './sign-up-form.styles.scss'

// we can create a state variable for each field seperately, or as an object with 4 fields as we are doing here:
// Its best practice to put them together into 1 Object, when they are tied together to the same logic...
// (they are all tied together in the same way to the same state)
// Because this way we can use the same 'handleChange' callback for all of them.
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    // useState (with destructuring)
    const [formFields, setFormFields] = useState(defaultFormFields)

    // destructuring
    const { displayName, email, password, confirmPassword} = formFields

    //console.log("Form-Fields = %O",formFields)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields ({ ...formFields, [name]: value })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    
    ////const userContextHandle = useContext(UserContext)

    const handleSubmit = async (event) => {
        event.preventDefault()  // this causes that the code here is activated only if form field values have been assigned
        if (password != confirmPassword) {
            alert ("paswwords do not match")
            return
        }
        try {
            const response = await creatAuthUserWithEmailAndPassword (email, password)
            console.log ('calling my creatAuthUserWithEmailAndPassword = %O', response)
            // We must add 'displayName' from input-field as additional info, 
            // as opposed to google-signin, where 'display name' came inside the auth-object from google's authentication process!
            const userDocRef = await createUserDocumentFromAuth(response.user, {displayName}) 
            console.log("userDocRef = %O",userDocRef)
            resetFormFields()
            ////userContextHandle.setCurrentUser(response.user)

        }
        catch(error) {
            if (error.code == 'auth/email-already-in-use') // not necessarily in DB, but was already authenticated
                alert(error.code)
            console.log('user creation encountred an error', error)
        }
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit = {handleSubmit}>

                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                {/* BELOW IS AN EXAMPLE ANOTHER WAY TO WRITE THE EXACT SAME THING AS IN THE LINES ABOVE 
                    WE JUST CREATE AN OBJECT LITERAL, TO MAKE IT MORE READABLE (CURRENTLY NOT WORKING ??) */}
                {/*<FormInput 
                    label="Confirm Password" 
                    inputOptions={{
                        type:"password",
                        required: true,
                        onChange: {handleChange}, 
                        name: "confirmPassword",
                        value: {confirmPassword}, 
                    }}
                />*/}

                {/*<button type="submit">Sign Up</button>                       // original html-based button */}
                <Button  type="submit">Sign Up</Button>                         {/* Our 'Button' Component!! */}
                {/*<Button buttonType='google' type="submit">Sign Up</Button>   // example with buttonType!! */}
                </form>
        </div>  
    )
}

export default SignUpForm



