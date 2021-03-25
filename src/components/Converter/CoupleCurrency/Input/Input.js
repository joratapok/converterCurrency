import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    return (
        <div className={classes.inputWrapper}>
            <input type={'number'} 
                   onChange={(e) => props.setCalculatingValueThunk(props.couple.id, e.target.value,
                       props.numberValue, props.couple.factor)}
                   value={props.valueInput} className={classes.input}/>
            <span className={classes.currency}>{props.currency}</span>
        </div>
    )
}

export default Input
