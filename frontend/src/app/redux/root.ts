import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import dashboardsReducer, { Dashboard, epics as dashboardEpics } from './dashboards';
import { epics as firestoreEpics } from './firestore';
import { NoneFilterComponent } from '../filters/filterTypes/none-filter/none-filter.component';

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

export const rootEpic = combineEpics(firestoreEpics, dashboardEpics);
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
                type: "none",
                position: {
                    top: 2,
                    left: 2,
                    width: 2,
                    height: 2
                },
                config: {
                    "name": "widget1"
                }
            }
        },
        filter: {
            type: NoneFilterComponent.TypeID,
            config: {}
        },
        selected: true
    },
    {
        id: "abc2",
        name: "ryan",
        editting: false,
        widgets: {},
        filter: {
            type: NoneFilterComponent.TypeID,
            config: {}
        },
        selected: false
    },
    {
        id: "abc3",
        name: "cow",
        editting: false,
        widgets: {},
        filter: {
            type: NoneFilterComponent.TypeID,
            config: {}
        },
        selected: false
    }]
}

const DEFAULT_APP_STATE: AppState = {
    dashboards: []
}

export const INIT_APP_STATE: AppState = TEST_APP_STATE;