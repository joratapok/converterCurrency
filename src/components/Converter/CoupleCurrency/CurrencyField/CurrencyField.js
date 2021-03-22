import React from 'react'
import classes from './CurrencyField.module.css'

const CurrencyField = ({countryOne, valueOne}) => {
    return (
        <div>
            <div className={classes.flagsWrapper}>
                Flags
            </div>
            <div className={classes.inputWrapper}>
                <input/>
            </div>
        </div>
    )
}

export default CurrencyField