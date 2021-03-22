import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import converterReducer from "./converterReducer";

let reducers = combineReducers({
    converter: converterReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.store = store
export default store
