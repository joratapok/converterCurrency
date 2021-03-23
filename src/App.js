import Converter from "./components/Converter/Converter";
import {Provider} from "react-redux";
import React from 'react';
import {setValueTwoWithFlagThunk} from "./redux/converterReducer";
import {connect} from "react-redux";

class App extends React.Component {

    setCurrentState(data) {
        data.map(el => {
            this.props.setValueTwoWithFlagThunk(el.id, el.countryOne, el.countryTwo, 'countryOne', el.valueOne)
        })
    }

    componentDidMount() {
        if (localStorage.getItem('converterData')) {
            let localData = JSON.parse(localStorage.getItem('converterData'))
            this.setCurrentState(localData)
        } else {
            this.setCurrentState(this.props.couples)
        }

    }
    componentDidUpdate() {
        let data = JSON.stringify(this.props.couples)
        localStorage.setItem('converterData', data)
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
    couples: state.converter.couples
})

export default connect(mapStateToProps, {setValueTwoWithFlagThunk,})(App);
