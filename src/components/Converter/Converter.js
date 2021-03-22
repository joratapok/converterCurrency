import React from 'react'
import CoupleCurrency from "./CoupleCurrency/CoupleCurrency";
import classes from './Converter.module.css'
import HeaderContainer from "./Header/HeaderContainer";
import {connect} from "react-redux";
import {deleteCouple, setNewCouple} from "../../redux/converterReducer";

class Converter extends React.Component {
    render() {
        return (
            <div className={classes.converterWrapper}>
                <HeaderContainer/>
                <div>
                    {this.props.couples.map( couple => <CoupleCurrency countries={this.props.countries}
                                                                       deleteCouple={this.props.deleteCouple}
                                                                       couple={couple}/>)}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    couples: state.converter.couples,
    countries: state.converter.countries
})

export default connect(mapStateToProps, {setNewCouple, deleteCouple})(Converter);