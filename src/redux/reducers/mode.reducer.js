const modeReducer = (state =  'LIST' , action) => {
    switch (action.type) {
        case 'TOGGLE_SHOP_MODE':
            const shopMode = action.payload.mode
            return shopMode;
        case 'TOGGLE_LIST_MODE':
            return action.payload;
        default:
            return state;
    }
};

export default modeReducer;