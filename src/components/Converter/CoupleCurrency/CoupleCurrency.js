import React from 'react'
import classes from './CoupleCurrency.module.css'
import CurrencyField from "./CurrencyField/CurrencyField";
import xButton from "../../../assets/images/xButton.png"

const CoupleCurrency = (props) => {

    let drowFlags = (countries, countryOne, countryTwo, setValueTwoWithFlagThunk, id, numberOfCountry, valueOne) => {

      return(
        <div className={classes.flagsWrapper}>
            {countries.map(c => <div className={(numberOfCountry === 'countryOne' && c.currency===countryOne)
                      ? [classes.flagWrapper, classes.activeFlag].join(' ')
                      : (numberOfCountry === 'countryTwo' && c.currency===countryTwo)
                      ? [classes.flagWrapper, classes.activeFlag].join(' ')
                      : classes.flagWrapper
                  }>
                    <img onClick={() => {
                      (numberOfCountry === 'countryOne')
                      ? setValueTwoWithFlagThunk(id, c.currency, countryTwo, numberOfCountry, valueOne)
                      : setValueTwoWithFlagThunk(id, countryOne, c.currency, numberOfCountry, valueOne)
                    }}
                    className={classes.flag} src={c.ikon} alt={c.currency}/>
                </div>
            )}
        </div>

      )
    }


    return (
        <div className={classes.wrapper}>
            <div className={classes.coupleWrapper}>
                {drowFlags(props.countries, props.couple.countryOne, props.couple.countryTwo, props.setValueTwoWithFlagThunk, props.couple.id, 'countryOne', props.couple.valueOne)}
                <div className={classes.inputWrapper}>
                    <input onChange={(e) => props.setCalculatingValueThunk(props.couple.id, e.target.value, 'valueOne', props.couple.factor)}
                          value={props.couple.valueOne} className={classes.input}/>
                </div>
            </div>

            <div className={classes.coupleWrapper}>
                {drowFlags(props.countries, props.couple.countryOne, props.couple.countryTwo, props.setValueTwoWithFlagThunk, props.couple.id, 'countryTwo', props.couple.valueOne)}
                <div className={classes.inputWrapper}>
                    <input onChange={(e) => props.setCalculatingValueThunk(props.couple.id, e.target.value, 'valueTwo', props.couple.factor)}
                     value={props.couple.valueTwo} className={classes.input}/>
                </div>
            </div>
            <div className={classes.xButtontWrapper}>
                <img src={xButton} onClick={() => props.deleteCouple(props.couple.id)}
                 alt={'delete'} className={classes.xButton} />
            </div>
        </div>
    )
}

export default CoupleCurrency
