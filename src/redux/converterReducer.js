import rusFlag from './../assets/images/rus.png'
import usaFlag from './../assets/images/usa.png'
import euroFlag from './../assets/images/euro.png'
const SET_NEW_COUPLE = 'SET_NEW_COUPLE'
const DEL_COUPLE = 'DEL_COUPLE'


let initial = {
    couples: [
        { id: 0, countryOne: 'USD', valueOne: 1, countryTwo: 'EUR', valueTwo: 1, inProgress: false }
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
                id: state.idCounter+1, countryOne: 0, valueOne: 1, countryTwo: 1,
                valueTwo: 1, inProgress: false
            }
            return {
                ...state,
                couples: [...state.couples, newObj],
                idCounter: state.idCounter + 1
            }
        case (DEL_COUPLE) :
            return {
                ...state,
                couples: [...state.couples.filter(el => {
                    if(el.id != action.id) return el
                })],
            }
        default :
            return state
    }
}

export const setNewCouple = () => ({type: SET_NEW_COUPLE, })
export const deleteCouple = (id) => ({type: DEL_COUPLE, id })


export default converterReducer
