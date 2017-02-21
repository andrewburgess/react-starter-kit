import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
    return combineReducers({
        app: (state = {}) => state,
        ...asyncReducers
    });
}
