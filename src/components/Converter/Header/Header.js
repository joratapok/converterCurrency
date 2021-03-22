import React from 'react'

const Header = ({addNewCouple, ...props}) => {
    return(
        <div>
            <div>
                Currency Converter
            </div>
            <div>
                <button onClick={addNewCouple}>Create new couple</button>
            </div>
        </div>
    )
}

export default Header