import React from 'react'
import classes from './CoupleCurrency.module.css'
import xButton from "../../../assets/images/xButton.png"
import Flags from "./Flags/Flags";
import Input from "./Input/Input";

const CoupleCurrency = (props) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.coupleWrapper}>
                <Flags countries={props.countries} countryOne={props.couple.countryOne}
                       countryTwo={props.couple.countryTwo} setValueTwoWithFlagThunk={props.setValueTwoWithFlagThunk}
                       id={props.couple.id} numberOfCountry={'countryOne'} valueOne={props.couple.valueOne}/>
                <Input couple={props.couple} setCalculatingValueThunk={props.setCalculatingValueThunk}
                       numberValue={'valueOne'} valueInput={props.couple.valueOne}/>
            </div>

            <div className={classes.coupleWrapper}>
                <Flags countries={props.countries} countryOne={props.couple.countryOne}
                       countryTwo={props.couple.countryTwo} setValueTwoWithFlagThunk={props.setValueTwoWithFlagThunk}
                       id={props.couple.id} numberOfCountry={'countryTwo'} valueOne={props.couple.valueOne}/>
                <Input couple={props.couple} setCalculatingValueThunk={props.setCalculatingValueThunk}
                       numberValue={'valueTwo'} valueInput={props.couple.valueTwo}/>
            </div>
            <div className={classes.xButtonWrapper}>
                <img src={xButton} onClick={() => props.deleteCouple(props.couple.id)}
                     alt={'delete'} className={classes.xButton}/>
            </div>
        </div>
    )
}

export default CoupleCurrency
