import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
    return (
        <div className={classes.inputWrapper}>
            <input type={'number'} maxLength={15}
                   onChange={(e) => props.setCalculatingValueThunk(props.couple.id, e.target.value,
                       props.numberValue, props.couple.factor)}
                   value={props.valueInput} className={classes.input}/>
        </div>
    )
}

export default Input