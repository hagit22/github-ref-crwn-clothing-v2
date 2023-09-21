import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';   
import { UserContext } from '../../context/user.context'; 
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
    const userContextHandle = useContext(UserContext)

    const signOutHandler = async () => {
      await signOutUser()
      ////userContextHandle.setCurrentUser(null)
    }

    console.log("userContextHandle = %O", {userContextHandle})

    return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className='logo'/>
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            { userContextHandle.currentUser ?
              (<span className='nav-link' onClick={signOutHandler}>
                  SIGN OUT
              </span>) :
              (<Link className='nav-link' to='/auth'>
                  SIGN IN
              </Link>) 
            }
          </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }
  
  export default Navigation;