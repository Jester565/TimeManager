import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import dashboardsReducer, { Dashboard, epics as dashboardEpics } from './dashboards';
import { epics as firestoreEpics } from './firestore';
import { NoneFilterComponent } from '../filters/filterTypes/none-filter/none-filter.component';
import { debounceTime, throttleTime, distinctUntilChanged } from 'rxjs/operators';
import { throttle } from 'lodash';

export interface AppState {
    dashboards: Dashboard[];
}

export const loadState = () => {
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

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const rootEpic = combineEpics(firestoreEpics, dashboardEpics);
export const rootReducer = combineReducers<AppState>({
    dashboards: dashboardsReducer
});

const TEST_APP_STATE: AppState = {
    dashboards: [{
        id: "first",
        name: "First Dashboard",
        editting: false,
        widgets: { },
        filter: {
            type: NoneFilterComponent.TypeID,
            config: {}
        },
        selected: true
    }]
}

const DEFAULT_APP_STATE: AppState = {
    dashboards: []
}

export const INIT_APP_STATE: AppState = TEST_APP_STATE;