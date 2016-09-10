import { combineReducers } from 'redux';

import appReducer from './ducks/app';

export default function (asyncReducers) {
    return combineReducers({
        app: appReducer,
        ...asyncReducers
    });
}
