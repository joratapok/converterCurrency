import React from 'react'
import classes from './Flags.module.css'

const Flags = (props) => {
    return (
        <div className={classes.flagsWrapper}>
            {props.countries.map(c => <div key={c.currency}
                    className={(props.numberOfCountry === 'countryOne' && c.currency === props.countryOne)
                        ? [classes.flagWrapper, classes.activeFlag].join(' ')
                        : (props.numberOfCountry === 'countryTwo' && c.currency === props.countryTwo)
                            ? [classes.flagWrapper, classes.activeFlag].join(' ')
                            : classes.flagWrapper
                    }>
                    <img onClick={() => {
                        (props.numberOfCountry === 'countryOne')
                            ? props.setValueTwoWithFlagThunk(props.id, c.currency, props.countryTwo, props.numberOfCountry, props.valueOne)
                            : props.setValueTwoWithFlagThunk(props.id, props.countryOne, c.currency, props.numberOfCountry, props.valueOne)
                    }}
                         className={classes.flag} src={c.ikon} alt={c.currency}/>
                </div>
            )}
        </div>
    )
}

export default Flags