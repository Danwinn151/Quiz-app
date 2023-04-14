const reducer = (state = 0, action) => {

    if(action.type === "Deposit"){
        return state + action.payload
    }
    return state

}

export default reducer