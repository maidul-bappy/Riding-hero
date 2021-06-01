import React, { useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../../App';

import logo from "../../images/logo.png"
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory()
    const login = () => {
        history.push('/login');
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to='/'> <img className="ms-5" src={logo} alt="" /> </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="Nav-Menu collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-5">
                    <li className="nav-item active">
                        <Link className="nav-link ms-5 text-dark" to="home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link ms-5 text-dark" to="destination">Destination</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link ms-5  text-dark" to="/">Blog</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link ms-5  text-dark" to="/">Contact</Link>
                    </li>
                    {
                        (loggedInUser?.email) ? <li className="nav-item"> <p className="nav-link">{loggedInUser.displayName}</p></li> : ''
                    }
                    <li className="nav-item">
                        {
                            (loggedInUser?.email) ? <button style={{ fontWeight: "bolder" }} onClick={() => setLoggedInUser({})} className="btn btn-danger ">Log Out</button> : <button onClick={login} className="btn btn-primary">Log In</button>
                        }
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Header;
