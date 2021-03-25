import React from 'react'
import CoupleCurrency from "./CoupleCurrency/CoupleCurrency";
import classes from './Converter.module.css'
import HeaderContainer from "./Header/HeaderContainer";
import {connect} from "react-redux";
import {
    chooseCurrency,
    deleteCouple,
    setCalculatingValueThunk,
    setNewCouple,
    setValueTwoWithFlagThunk
} from "../../redux/converterReducer";

function Converter(props) {
    return (
        <div className={classes.converterWrapper}>
            <HeaderContainer/>
            {props.couples.map(couple => <CoupleCurrency
                key={couple.id}
                countries={props.countries}
                deleteCouple={props.deleteCouple}
                chooseCurrency={props.chooseCurrency}
                setCalculatingValueThunk={props.setCalculatingValueThunk}
                setValueTwoWithFlagThunk={props.setValueTwoWithFlagThunk}
                couple={couple}
            />)}
        </div>
    )
}

let mapStateToProps = (state) => ({
    couples: state.converter.couples,
    countries: state.converter.countries
})

export default connect(mapStateToProps, {
    setNewCouple, deleteCouple, chooseCurrency,
    setCalculatingValueThunk, setValueTwoWithFlagThunk
})(Converter);
