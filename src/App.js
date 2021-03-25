import Converter from "./components/Converter/Converter";
import {Provider} from "react-redux";
import React from 'react';
import {setValueTwoWithFlagThunk, createNewInitialState} from "./redux/converterReducer";
import {connect} from "react-redux";

class App extends React.Component {


    setCurrentState(data) {
        data.forEach(el => {
            this.props.setValueTwoWithFlagThunk(el.id, el.countryOne, el.countryTwo, 'countryOne', el.valueOne)
        })
    }



    render() {
        return (
            <Provider store={this.props.store}>
                <Converter/>
            </Provider>
        );
    }
}

let mapStateToProps = (state) => ({
    couples: state.converter.couples,
    idCounter: state.converter.idCounter,
})

export default connect(mapStateToProps, {setValueTwoWithFlagThunk, createNewInitialState})(App);
