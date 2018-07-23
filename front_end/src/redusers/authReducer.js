const initialState = {
    isAuthenticated: false,
    user: {},
    hello: 'test'
}

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}