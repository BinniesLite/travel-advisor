import { useReducer } from 'react';
import FilterContext from './filter-ctx';

// Make a default state
const defaultFilterState = {
    type: "",
    rating: ""
};

// Handling cart Reducer
    // Have state and action, the state is the current
    // The action is the future ? 
const filterReducer = (state,action) => {

};


const FilterProvider = () => {
    // Make a reducer hook
    const [filterState, dispatchFilterState] = useReducer(
        filterReducer,
        defaultFilterState
    );



    return (
        <FilterContext.Provider value={cartContext}>
          {props.children}
        </FilterContext.Provider>
    );
}