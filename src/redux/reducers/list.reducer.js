const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST':
            // SET LIST FROM DB TO STORE
            return action.payload

        case 'SORT_BY_LIST_NAME':
            // SORT LIST ITEMS BASED ON NAME id OF LIST INTO STATE BEFORE DISTANCE SORT

            const index = action.payload;

            

            const namedList = state.filter(item => item.list_id === index);
            return namedList;
        

        case 'UPDATE_DISTANCE':
            // UPDATE DISTANCE VALUES IN LIST STORE ONLY
            // CALC DISTANCE HERE
            let sortedList = [...state]
            const { id } = action.payload

            let currentX;
            let currentY;

            // Find X,Y coords of last archived item
            for (let listItem of sortedList) {
                if (id == listItem.id) {
                    currentX = listItem.x;
                    currentY = listItem.y
                    listItem.hidden = !listItem.hidden
                }
            }

            // console.log('in updateDistance new origin', currentX, currentY);

            // filter out unhidden items from list to evaluate new distance
            // filter out hidden items to be added back into list after distance calc

            const unhiddenlistItems = sortedList.filter(item => item.hidden === false)
            const hiddenItems = sortedList.filter(item => item.hidden === true)
            // console.log('sorted list filtered by hidden value', unhiddenlistItems, hiddenItems)

            // recalculate distance values based on last item origin
            // update list object with revised x,y values
            for (let listItem of unhiddenlistItems) {
                let distX = Math.abs(currentX - listItem.x);
                distX = Math.round((distX + Number.EPSILON) * 100) / 100

                let distY = Math.abs(currentY - listItem.y);
                distY = Math.round((distY + Number.EPSILON) * 100) / 100

                // Pythagorean theorem rounded to 2 decimal places
                // calcs distance from current origin to item x y
                let distance = 0
                const calcDistance = () => {
                    distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
                    return Math.round((distance + Number.EPSILON) * 100) / 100;
                }

                // calculate X Y coordinates from 0,0 to establish initial distance value
                // value from distance is spread back into foundItem in res.send
                distance = calcDistance()
                // console.log('new origin calcDistance', listItem.keyword_search, distance);
                // as each item is passed into the loop, the distance key is updated
                listItem.distance = distance

            }

            // sort the object array by distance, return new list
            unhiddenlistItems.sort((a, b) => a.distance - b.distance)

            // console.log('list sorted by distance from last hidden item', unhiddenlistItems, hiddenItems);

            return [...unhiddenlistItems, ...hiddenItems];

        default:
            return state;
    }
};

export default listReducer;