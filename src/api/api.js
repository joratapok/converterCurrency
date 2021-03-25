import * as axios from "axios";

const instance = axios.create({
    baseURL: `https://free.currconv.com/api/v7/convert`,
})

export const currenciesApi = {
    getCoupleCurrencies(firstCurrency, secondCurrency) {
        let key = `${firstCurrency}_${secondCurrency}`
        return instance.get(`?q=${firstCurrency}_${secondCurrency}&compact=ultra&apiKey=7ec103bbbf74f0802821`)
            .then(response => {
                return response.data[key]
            })
    },
}
