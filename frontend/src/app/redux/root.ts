import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import dashboardsReducer, { Dashboard } from './dashboards';
import { epics as firestoreEpics } from './firestore';

export interface AppState {
    dashboards: Dashboard[];
}

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const rootEpic = combineEpics(firestoreEpics);
export const rootReducer = combineReducers<AppState>({
    dashboards: dashboardsReducer
});

const TEST_APP_STATE: AppState = {
    dashboards: [{
        id: "abc",
        name: "Alex",
        editting: false,
        widgets: { 
            "w1": {
                type: "line",
                position: {
                    top: 2,
                    left: 2,
                    width: 20,
                    height: 20
                },
                config: {
                    "name": "widget1"
                }
            }
        },
        filter: null,
        selected: true
    },
    {
        id: "abc2",
        name: "ryan",
        editting: false,
        widgets: {},
        filter: null,
        selected: false
    },
    {
        id: "abc3",
        name: "cow",
        editting: false,
        widgets: {},
        filter: null,
        selected: false
    }]
}

const DEFAULT_APP_STATE: AppState = {
    dashboards: []
}

export const INIT_APP_STATE: AppState = TEST_APP_STATE;