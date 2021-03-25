import rusFlag from './../assets/images/rus.png'
import usaFlag from './../assets/images/usa.png'
import euroFlag from './../assets/images/euro.png'
import {currenciesApi} from "../api/api";

const SET_NEW_COUPLE = 'SET_NEW_COUPLE'
const DEL_COUPLE = 'DEL_COUPLE'
const CHOOSE_CURRENCY = 'CHOOSE_CURRENCY'
const POINT_VALUE = 'POINT_VALUE'
const SET_FACTOR = 'SET_FACTOR'
const CREATE_NEW_INITIAL_STATE = 'CREATE_NEW_INITIAL_STATE'

let initial = {
    couples: [
        {
            id: 1, countryOne: 'RUB', valueOne: 1,
            countryTwo: 'EUR', valueTwo: 1, factor: 1
        },
        {
            id: 2, countryOne: 'RUB', valueOne: 1,
            countryTwo: 'USD', valueTwo: 1, factor: 1
        },
    ],
    countries: [
        {currency: 'RUB', ikon: rusFlag},
        {currency: 'USD', ikon: usaFlag},
        {currency: 'EUR', ikon: euroFlag},
    ],
    idCounter: 3,
}

const converterReducer = (state = initial, action) => {
    switch (action.type) {
        case (SET_NEW_COUPLE) :
            let newObj = {
                id: action.id, countryOne: 'RUB', valueOne: 1, countryTwo: 'USD',
                valueTwo: 1, inProgress: false
            }
            return {
                ...state,
                couples: [...state.couples, newObj],
                idCounter: parseInt(action.id) + 1
            }
        case (DEL_COUPLE) :
            return {
                ...state,
                couples: [...state.couples.filter(el => el.id !== action.id)],
            }
        case (CHOOSE_CURRENCY) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if (el.id !== action.id) {
                        return el
                    } else {
                        el.countryOne = action.countryOne
                        el.countryTwo = action.countryTwo
                    }
                    return el
                })],
            }
        case (POINT_VALUE) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if (el.id !== action.id) {
                        return el
                    } else {
                        (action.numberOfValue === 'valueOne')
                            ? el.valueOne = action.currentValue
                            : el.valueTwo = action.currentValue
                    }
                    return el
                })],
            }
        case (SET_FACTOR) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if (el.id !== action.id) {
                        return el
                    } else {
                        el.factor = action.factor
                    }
                    return el
                })],
            }
        case (CREATE_NEW_INITIAL_STATE) :
            return {
                ...state,
                couples: JSON.parse(action.localData),
                idCounter: parseInt(action.idCounter) + 1
            }
        default :
            return state
    }
}

export const setNewCouple = (id) => ({type: SET_NEW_COUPLE, id})
export const deleteCouple = (id) => ({type: DEL_COUPLE, id})
export const setFactor = (id, factor) => ({type: SET_FACTOR, id, factor})
export const chooseCurrency = (id, countryOne, countryTwo, numberOfCountry) => ({
    type: CHOOSE_CURRENCY, id, countryOne, countryTwo, numberOfCountry
})
export const pointValue = (id, currentValue, numberOfValue) => ({
    type: POINT_VALUE, id, currentValue, numberOfValue
})
export const createNewInitialState = (localData, idCounter) => ({
    type: CREATE_NEW_INITIAL_STATE, localData, idCounter
})

const multiply = (a, b) => {
    return (a * b).toFixed(4)
}
const devide = (a, b) => {
    if (b === 0) {
        return 0
    }
    return (a / b).toFixed(4)
}

export const createNewCoupleThunk = (id) => {
    return async (dispatch) => {
        let response
        dispatch(setNewCouple(id))
        try {
            response = await currenciesApi.getCoupleCurrencies('RUB', 'USD')
        } catch (e) {
            response = 0
            console.log(e)
        }
        let factor = response
        dispatch(setFactor(id, factor))
        dispatch(pointValue(id, multiply(1, factor), 'valueTwo'))
    }
}

export const setValueTwoWithFlagThunk = (id, countryOne, countryTwo, valueOne) => {
    return async (dispatch) => {
        let response
        try {
            response = (countryOne === countryTwo)
                ? 1
                : await currenciesApi.getCoupleCurrencies(countryOne, countryTwo)
        } catch (e) {
            response = 0
            console.log(e)
        }
        let factor = response
        dispatch(setFactor(id, factor))
        dispatch(setCalculatingValueThunk(id, valueOne, 'valueOne', factor))
        dispatch(chooseCurrency(id, countryOne, countryTwo))
    }
}

export const setCalculatingValueThunk = (id, currentValue, numberOfValue, factor) => {
    return (dispatch) => {
        if (numberOfValue === 'valueOne') {
            dispatch(pointValue(id, currentValue, 'valueOne'))
            if (currentValue < 0) {
                dispatch(pointValue(id, 0, 'valueTwo'))
            } else {
                dispatch(pointValue(id, multiply(currentValue, factor), 'valueTwo'))
            }
        } else if (numberOfValue === 'valueTwo') {
            dispatch(pointValue(id, currentValue, 'valueTwo'))
            if (currentValue < 0) {
                dispatch(pointValue(id, 0, 'valueOne'))
            } else {
                dispatch(pointValue(id, devide(currentValue, factor), 'valueOne'))
            }
        }
    }
}

export default converterReducer
