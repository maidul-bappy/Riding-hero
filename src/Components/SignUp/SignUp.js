import React, {useState, useRef} from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../Firebase/firebase.config";
import { Form, Card, Button } from 'react-bootstrap'


const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);      
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
      return <Redirect to="/dashboard" />;
  }
  return (
    <>

    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form  onSubmit={handleSubmit}>
          <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required/>
          </Form.Group>
          <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required/>
          </Form.Group>
          <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required/>
          </Form.Group>
         <Button className='w-100 mt-3 mb-5"' type='submit'>Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already Have An Account ? Log In
    </div>
{/* 
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form> */}
    </>
  );
};

export default SignUp;