import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import converterReducer from "./converterReducer";

const saveState = (state) => {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('converterData', serialisedState)
}

const loadState = () => {
    try {
        const serialisedState = window.localStorage.getItem('converterData');
        if (!serialisedState) return undefined;
        return JSON.parse(serialisedState)
    } catch (err) {
        return undefined;
    }
}

const oldState = loadState()

const reducers = combineReducers({
    converter: converterReducer,
})

const store = createStore(reducers, oldState, applyMiddleware(thunkMiddleware))


store.subscribe(() => {
    saveState(store.getState());
})

export default store
