import rusFlag from './../assets/images/rus.png'
import usaFlag from './../assets/images/usa.png'
import euroFlag from './../assets/images/euro.png'
import {currenciesApi} from "../api/api";

const SET_NEW_COUPLE = 'SET_NEW_COUPLE'
const DEL_COUPLE = 'DEL_COUPLE'
const CHOOSE_CURRENCY = 'CHOOSE_CURRENCY'
const POINT_VALUE = 'POINT_VALUE'
const SET_FACTOR = 'SET_FACTOR'

let initial = {
    couples: [
        {
            id: 0, countryOne: 'RUB', valueOne: 1,
            countryTwo: 'EUR', valueTwo: 1, factor: 1
        },
        {
            id: 1, countryOne: 'RUB', valueOne: 1,
            countryTwo: 'USD', valueTwo: 1, factor: 1
        },
    ],
    countries: [
        {currency: 'RUB', ikon: rusFlag},
        {currency: 'USD', ikon: usaFlag},
        {currency: 'EUR', ikon: euroFlag},
    ],
    idCounter: 2,
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
                idCounter: action.id + 1
            }
        case (DEL_COUPLE) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if (el.id != action.id) return el
                })],
            }
        case (CHOOSE_CURRENCY) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if (el.id != action.id) {
                        return el
                    } else {
                        (action.numberOfCountry === 'countryOne')
                            ? el.countryOne = action.countryOne
                            : el.countryTwo = action.countryTwo
                    }
                    return el
                })],
            }
        case (POINT_VALUE) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if (el.id != action.id) {
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
                    if (el.id != action.id) {
                        return el
                    } else {
                        el.factor = action.factor
                    }
                    return el
                })],
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

const calculate = (a, b) => {
    return (a * b).toFixed(4)
}

export const createNewCoupleThunk = (id) => {
    return async (dispatch) => {
        dispatch(setNewCouple(id))
        let response = await currenciesApi.getCoupleCurrencies('RUB', 'USD')
        let factor = response
        dispatch(setFactor(id, factor))
        dispatch(pointValue(id, calculate(1, factor), 'valueTwo'))
    }
}

export const setValueTwoWithFlagThunk = (id, countryOne, countryTwo, numberOfCountry, valueOne) => {
    return async (dispatch) => {
        let response = (countryOne === countryTwo)
            ? 1
            : await currenciesApi.getCoupleCurrencies(countryOne, countryTwo)
        let factor = response
        dispatch(setFactor(id, factor))
        dispatch(pointValue(id, calculate(valueOne, factor), 'valueTwo'))
        dispatch(chooseCurrency(id, countryOne, countryTwo, numberOfCountry))
    }
}

export const setCalculatingValueThunk = (id, currentValue, numberOfValue, factor) => {
    return (dispatch) => {
        if (numberOfValue === 'valueOne') {
            dispatch(pointValue(id, currentValue, 'valueOne'))
            dispatch(pointValue(id, calculate(currentValue, factor), 'valueTwo'))
        } else if (numberOfValue === 'valueTwo') {
            dispatch(pointValue(id, currentValue, 'valueTwo'))
            dispatch(pointValue(id, (currentValue / factor).toFixed(4), 'valueOne'))
        }
    }
}

export default converterReducer
