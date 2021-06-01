import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import Header from '../Header/Header';
import { facebookSignIn, googleSignIn, signInWithEmailAndPassword, initializeAppfirebase, signupWithEmailAndPassword } from '../Firebase/FirebaseAuthentication';

initializeAppfirebase()

const LogIn = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [logInError, setLogInError] = useState('');
  const [isNewUser, setIsNewUser] = useState(() => false);
  const [inputError, setInputError] = useState({});
  const [inputStatus, setInputStatus] = useState({});
  const [inputUserInfo, setInputUserInfo] = useState({});
  const [inputLoginUser, setInputLoginUser] = useState({});

  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } }

  const updateInputUserInfo = (name, value) => {
    const newInputUserInfo = { ...inputUserInfo }
    newInputUserInfo[name] = value
    setInputUserInfo(newInputUserInfo)
    //console.log(inputUserInfo)
  }

  const handleInputValid = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let message = ''
    let status = false;

    if (name === 'name') {
      if (/[0-9a-zA-Z]{3,}/.test(value)) {
        message = '';
        status = true;
      } else {
        message = 'Name should be at least 3 character';
      }
    }

    if (name === 'email') {
      if (/\S+@\S+\.\S+/.test(value)) {
        message = '';
        status = true;
      } else {
        message = 'Please input valid email address';
      }
    }

    if (name === 'password') {
      if (/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(value)) {
        message = '';
        status = true;
      } else {
        message = 'Password shuld be minimum 6 characters and at least 1 number';
      }
    }

    if (name === 'confirmPassword') {
      if (value === inputUserInfo?.password) {
        message = '';
        status = true;
      } else {
        message = "Password did not match";
      }
    }

    if (status) {
      updateInputUserInfo(name, value)
    } else {
      updateInputUserInfo(name, '')
    }

    const newInputError = { ...inputError }
    newInputError[name] = message

    const newInputStatus = { ...inputStatus }
    newInputStatus[name] = status

    setInputError(newInputError)
    setInputStatus(newInputStatus)

  }

  const submitSignUp = (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = inputUserInfo
    if (name && email && password && confirmPassword) {
      signupWithEmailAndPassword(email, password, name)
        .then(res => {
          const newUser = {
            ...res,
            displayName: name
          }
          handleResponse(newUser, res.success)
        })
    }
  }

  const handleLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputLoginUser({
      ...inputLoginUser,
      [name]: value,
    })
  }

  const submitSignIn = (e) => {
    e.preventDefault()
    const { email, password } = inputLoginUser
    console.log(email, password)
    signInWithEmailAndPassword(email, password)
      .then(res => {
        handleResponse(res, res.success)
      })
  }

  const signInWithGoogle = () => {
    googleSignIn()
      .then(res => {
        handleResponse(res, res.success)
      })
  }

  const signInWithFacebook = () => {
    facebookSignIn()
      .then(res => {
        handleResponse(res, res.success)
      })
  }

  const handleResponse = (res, success) => {
    if (success) {
      console.log(res)
      setLoggedInUser(res)
      setLogInError('')
      history.replace(from)
    } else {
      console.log(res.error)
      setLogInError(res.error)
    }
  }

  return (
    <>
      <Header></Header>
      <div className="container mb-5">
        <div className=" d-flex justify-content-center mt-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                {
                  isNewUser ?
                    <form className="form p-2" onSubmit={submitSignUp}>
                      <h3 className="mb-3">Create an account</h3>
                      <div className="form-group mb-3">
                        <input className="form-control" name="name" onChange={handleInputValid} type="text" placeholder="Enter your name" required />
                        <small className="text-danger">{inputError?.name}</small>
                      </div>
                      <div className="form-group mb-3">
                        <input className="form-control" name="email" onChange={handleInputValid} type="text" placeholder="Enter your email" required />
                        <small className="text-danger">{inputError?.email}</small>
                      </div>
                      <div className="form-group mb-3">
                        <input className="form-control" name="password" onChange={handleInputValid} type="password" placeholder="Create your password" required />
                        <small className="text-danger">{inputError?.password}</small>
                      </div>
                      <div className="form-group mb-3">
                        <input className="form-control" name="confirmPassword" onChange={handleInputValid} type="password" placeholder="Re-type your password" required />
                        <small className="text-danger">{inputError?.confirmPassword}</small>
                      </div>
                      <div className="form-group">
                        <input className="btn btn-primary btn-block" type="submit" value="Create an account" />
                      </div>

                      <div className="text-center">
                        <p className="m-3">Already have an account? <span style={{ cursor: 'pointer' }} onClick={() => setIsNewUser(false)} className="text-primary"> Login</span> </p>
                        <p>-----------OR-----------</p>
                      </div>
                    </form>
                    :
                    <form className="form" onSubmit={submitSignIn}>
                      <h3 className="mb-3">Login</h3>
                      <div className="form-group mb-3">
                        <input className="form-control" name="email" onChange={handleLoginInput} type="email" placeholder="Enter your email" required />
                      </div>
                      <div className="form-group mb-3">
                        <input className="form-control" name="password" onChange={handleLoginInput} type="password" placeholder="Enter your password" required />
                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit"><span><i className="fas fa-sign-in-alt"></i> </span> Sign in </button>
                      </div>

                      <div className="text-center">
                        <p className="m-3">Don't have a account? <span style={{ cursor: 'pointer' }} onClick={() => setIsNewUser(true)} className="text-primary"> Create an account</span> </p>
                        <p>-----------OR-----------</p>
                      </div>
                    </form>
                }

                <div className="text-center">
                  <button onClick={signInWithGoogle} className="btn btn-outline-danger mb-3"><span><i className="fab fa-google"></i> </span> Sign in with Google</button> <br />
                </div>
                {
                  logInError ? <div className="alert alert-warning mt-4" role="alert">{logInError}</div> : ''
                }



              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;