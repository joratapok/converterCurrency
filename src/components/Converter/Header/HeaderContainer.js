import React from "react"
import Header from "./Header";
import {createNewCoupleThunk} from "../../../redux/converterReducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {

    addNewCouple = () => {
        let newId = this.props.idCounter + 1
        this.props.createNewCoupleThunk(newId)
    }

    render() {
        return (
            <>
                <Header addNewCouple={this.addNewCouple}/>
            </>
        )
    }
}

let mapStateToProps = (state) => ({
    idCounter: state.converter.idCounter
})

export default connect(mapStateToProps, {createNewCoupleThunk,})(HeaderContainer);