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
        widgets: {},
        filter: null
    },
    {
        id: "abc2",
        name: "ryan",
        widgets: {},
        filter: null
    },
    {
        id: "abc3",
        name: "cow",
        widgets: {},
        filter: null
    }]
}

const DEFAULT_APP_STATE: AppState = {
    dashboards: []
}

export const INIT_APP_STATE: AppState = TEST_APP_STATE;