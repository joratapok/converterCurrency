import React from "react"
import Header from "./Header";
import {createNewCoupleThunk} from "../../../redux/converterReducer";
import {connect} from "react-redux";


const HeaderContainer = (props) => {

    let addNewCouple = () => {
        let newId = props.idCounter + 1
        props.createNewCoupleThunk(newId)
    }

    return (
        <>
            <Header addNewCouple={addNewCouple}/>
        </>
    )
}

let mapStateToProps = (state) => ({
    idCounter: state.converter.idCounter
})

export default connect(mapStateToProps, {createNewCoupleThunk,})(HeaderContainer);