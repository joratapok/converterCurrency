import React from 'react'
import classes from './Header.module.css'

const Header = ({addNewCouple, ...props}) => {
    return (
        <div className={classes.HeaderWrapper}>
            <div>
                Currency Converter
            </div>
            <button className={classes.button} onClick={addNewCouple}>Create new couple</button>
        </div>
    )
}

export default Header