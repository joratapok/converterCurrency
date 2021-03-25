import Converter from "./components/Converter/Converter";
import {Provider} from "react-redux";
import React, {useEffect} from 'react';
import {setValueTwoWithFlagThunk, createNewInitialState} from "./redux/converterReducer";
import {connect} from "react-redux";


const App = (props) => {

    useEffect(() => {
        props.couples.forEach(el => {
            props.setValueTwoWithFlagThunk(el.id, el.countryOne, el.countryTwo, el.valueOne)
        })
    }, [])

    return (
        <Provider store={props.store}>
            <Converter/>
        </Provider>
    );
}

let mapStateToProps = (state) => ({
    couples: state.converter.couples,
    idCounter: state.converter.idCounter,
})

export default connect(mapStateToProps, {setValueTwoWithFlagThunk, createNewInitialState})(App);
