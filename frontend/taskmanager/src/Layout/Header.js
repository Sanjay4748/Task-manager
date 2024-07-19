import React from 'react';
import styles from '../Layout/layout.module.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [useremail,setUseremail] = useState("")

    const Loginsubmit = (e) =>{
        e.preventDefault()
    }

    return (
        <div>        
            <div className={styles.navbar}>
            <Button className={styles.buttonpart}>
                Login
            </Button>
            <Button className={styles.buttonpart}>
                Signup
            </Button>
            </div>
        <div className={styles.carddiv} >
            <div className={styles.card}>
                <form onSubmit={Loginsubmit}>
                    <div>
                        <input type='email' placeholder='Email' onChange={(e)=>setUseremail(e.target.value)} className={styles.inputstyle} />
                    </div>
                    <div>
                        <input type='password' placeholder='Password' className={styles.inputstyle} />
                    </div>
                    <div>
                        <button type='submit' className={styles.loginbtn} >
                            Login
                        </button>
                    </div>
                    <div style={{"display":"flex","justifyContent":'center'}} > 
                        <p>
                        Don't Have a Account <Link to={"/signup"} >Signup?</Link>
                        </p>
                    </div>
                    <div style={{"display":"flex","justifyContent":'center'}}  >
                        signin with google
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Header;
