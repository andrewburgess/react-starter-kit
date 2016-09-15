import _ from 'lodash';

const initialState = {
    _css: []
};

const APP_INSERT_CSS = 'app:css:insert';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case APP_INSERT_CSS:
            return _.extend({}, state, {
                _css: [...(state._css || []), action.payload]
            });
        default:
            return state;
    }
}

export function insertCss(...classes) {
    return {
        type: APP_INSERT_CSS,
        payload: classes.map(style => style._getCss())
    };
}
