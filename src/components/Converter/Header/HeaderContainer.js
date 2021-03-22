import React from "react"
import Header from "./Header";
import {setNewCouple} from "../../../redux/converterReducer";
import {connect} from "react-redux";

class HeaderContainer extends React.Component {

    addNewCouple = () => {
        this.props.setNewCouple()
    }

    render() {
        return (
            <>
                <Header addNewCouple={this.addNewCouple}
                        couples={this.props.couples}
                        setNewCouple={setNewCouple}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => ({
    couples: state.couples,
})

export default connect(mapStateToProps, {setNewCouple,})(HeaderContainer);