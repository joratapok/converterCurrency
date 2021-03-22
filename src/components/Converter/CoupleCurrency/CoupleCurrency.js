import React from 'react'
import classes from './CoupleCurrency.module.css'
import CurrencyField from "./CurrencyField/CurrencyField";

const CoupleCurrency = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.coupleWrapper}>
                <div className={classes.flagsWrapper}>
                    {props.countries.map(c => <div className={classes.flagWrapper}>
                            <img className={classes.flag} src={c.ikon} alt={c.currency}/>
                        </div>
                    )}
                </div>
                <div className={classes.inputWrapper}>
                    <input valueOne={props.couple.valueOne}/>
                </div>
            </div>

            <div className={classes.coupleWrapper}>
                <div className={classes.flagsWrapper}>
                    {props.countries.map(c => <div className={classes.flagWrapper}>
                            <img className={classes.flag} src={c.ikon} alt={c.currency}/>
                        </div>
                    )}
                </div>
                <div className={classes.inputWrapper}>
                    <input valueTwo={props.couple.valueTwo}/>
                </div>
            </div>
            <div>
                <button onClick={() => props.deleteCouple(props.couple.id)}>delete</button>
            </div>
        </div>
    )
}

export default CoupleCurrency