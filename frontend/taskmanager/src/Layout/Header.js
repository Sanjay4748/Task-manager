import React from 'react';
import styles from '../Layout/layout.module.css';
import { Button } from 'react-bootstrap';

function Header() {
    return (
        <div className={styles.navbar}>
            <Button className={styles.buttonpart}>
                Login
            </Button>
            <Button className={styles.buttonpart}>
                Signup
            </Button>
            
        </div>
    );
}

export default Header;
