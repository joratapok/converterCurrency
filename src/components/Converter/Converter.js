import React from 'react'
import CoupleCurrency from "./CoupleCurrency/CoupleCurrency";
import classes from './Converter.module.css'
import HeaderContainer from "./Header/HeaderContainer";
import {connect} from "react-redux";
import {
    deleteCouple, setNewCouple, chooseCurrency,
    setCalculatingValueThunk, setValueTwoWithFlagThunk
} from "../../redux/converterReducer";

class Converter extends React.Component {
    render() {
        return (
            <div className={classes.converterWrapper}>
                <HeaderContainer/>
                {this.props.couples.map(couple => <CoupleCurrency
                    key={couple.id}
                    countries={this.props.countries}
                    deleteCouple={this.props.deleteCouple}
                    chooseCurrency={this.props.chooseCurrency}
                    setCalculatingValueThunk={this.props.setCalculatingValueThunk}
                    setValueTwoWithFlagThunk={this.props.setValueTwoWithFlagThunk}
                    couple={couple}
                />)}
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    couples: state.converter.couples,
    countries: state.converter.countries
})

export default connect(mapStateToProps, {
    setNewCouple, deleteCouple,
    chooseCurrency, setCalculatingValueThunk, setValueTwoWithFlagThunk
})(Converter);
