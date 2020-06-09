import { createReducer } from './utils';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { mapTo, filter, map } from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';

const ADD = 'timemanager/dashboards/create';
const SET_NAME = 'timemanager/dashboards/set_name';
const SET_FILTER = 'timemanager/dashboards/set_filter';
const REMOVE = 'timemanager/dashboards/remove';
const SWAP = 'timemanager/dashboards/swap';
const MOVE = 'timemanager/dashboards/move';
const ADD_WIDGET = 'timemanager/dashboards/add_widget';
const UPDATE_WIDGET = 'timemanager/dashboards/update_widget';
const REMOVE_WIDGET = 'timemanager/dashboards/remove_widget';
const SELECT = 'timemanager/dashboards/select';
const EDIT = 'timemanager/dashboards/edit';
const SET_CONFIG_WIDGET = 'timemanager/dashboards/set_config_widget';

interface Position {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface Widget {
    type: string;
    position: Position;
    config: any
}

export interface Filter {
    type: string;
    config: any;
}

export interface Dashboard {
    id: string;
    name: string;
    filter: Filter;
    selected: boolean;
    editting?: boolean;
    configWidgetID?: string;
    widgets: { [key: string]: Widget };
}

const getDashboardWithID = (draft: Dashboard[], id: string): Dashboard => {
    let dashboard = _.find(draft, { id });
    if (dashboard == null) {
        throw "Could not find dashboard with ID: " + id;
    }
    return dashboard;
}

const addDashboardReducer = (draft: Dashboard[], action: { dashboard: Dashboard }) => {
    draft.push(action.dashboard);
}

const setNameReducer = (draft: Dashboard[], action: { dashboardID: string, dashboardName: string }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    dashboard.name = action.dashboardName;
}

const removeDashboardReducer = (draft: Dashboard[], action: { dashboardID: string }) => {
    _.remove(draft, { id: action.dashboardID });
}

const swapDashboardsReducer = (draft: Dashboard[], action: { dashboardI1: number, dashboardI2: number }) => {
    [draft[action.dashboardI1], draft[action.dashboardI2]] = 
        [draft[action.dashboardI2], draft[action.dashboardI1]];
}

const moveDashboardReducer = (draft: Dashboard[], action: { prevI: number, newI: number }) => {
    let incr = (action.newI < action.prevI)? -1: 1;
    let dashboard = draft[action.prevI];
    //prevI: 0, newI: 1
    for (let i = action.prevI; i != action.newI; i += incr) {
        let nextI = i + incr;
        draft[i] = draft[nextI];
    }
    draft[action.newI] = dashboard;
}


//Update data if filter has changed (Epic)
const setFilterReducer = (draft: Dashboard[], action: { dashboardID: string, filter: Filter }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    dashboard.filter = action.filter;
}

const addWidgetReducer = (draft: Dashboard[], action: { dashboardID: string, widget: Widget, widgetID: string }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    let widgetID = (action.widgetID)? action.widgetID: uuidv4();
    dashboard.widgets[widgetID] = action.widget;
}

const updateWidgetReducer = (draft: Dashboard[], action: { dashboardID: string, widgetID: string, widget: Widget }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    dashboard.widgets[action.widgetID] = action.widget;
}

const removeWidgetReducer = (draft: Dashboard[], action: { dashboardID: string, widgetID: string }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    delete dashboard.widgets[action.widgetID];
}

const selectDashboardReducer = (draft: Dashboard[], action: { dashboardID: string }) => {
    for (let dashboard of draft) {
        dashboard.selected = (dashboard.id == action.dashboardID);
    }
}

const editDashboardReducer = (draft: Dashboard[], action: { dashboardID: string, editting: boolean }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    dashboard.editting = action.editting;
}

const setConfigWidgetIDReducer = (draft: Dashboard[], action: { dashboardID: string, widgetID: string }) => {
    let dashboard = getDashboardWithID(draft, action.dashboardID);
    dashboard.configWidgetID = action.widgetID;
}

const addWidgetEpic = action$ => action$.pipe(
    ofType(ADD_WIDGET),
    map((action: any) => {
        return { 
            type: SET_CONFIG_WIDGET,
            dashboardID: action.dashboardID,
            widgetID: action.widgetID
        }
    })
)

export default createReducer([], {
    [ADD]: addDashboardReducer,
    [SET_NAME]: setNameReducer,
    [SET_FILTER]: setFilterReducer,
    [REMOVE]: removeDashboardReducer,
    [SWAP]: swapDashboardsReducer,
    [MOVE]: moveDashboardReducer,
    [ADD_WIDGET]: addWidgetReducer,
    [UPDATE_WIDGET]: updateWidgetReducer,
    [REMOVE_WIDGET]: removeWidgetReducer,
    [SELECT]: selectDashboardReducer,
    [SET_CONFIG_WIDGET]: setConfigWidgetIDReducer,
    [EDIT]: editDashboardReducer
});

export function addDashboard(dashboard: Dashboard) {
    return {
        type: ADD,
        dashboard
    }
}

export function setDashboardName(id: string, name: string) {
    return {
        type: SET_NAME,
        dashboardID: id,
        dashboardName: name
    }
}

export function setDashboardFilter(id: string, filter: Filter) {
    return {
        type: SET_FILTER,
        dashboardID: id,
        filter
    }
}

export function removeDashboard(id: string) {
    return {
        type: REMOVE,
        dashboardID: id
    }
}

export function swapDashboards(i1: number, i2: number) {
    return {
        type: SWAP,
        dashboardI1: i1,
        dashboardI2: i2
    }
}

export function moveDashboard(prevI: number, newI: number) {
    return {
        type: MOVE,
        prevI,
        newI
    }
}

export function addWidget(dashboardID: string, widget: Widget, widgetID: string) {
    return {
        type: ADD_WIDGET,
        dashboardID,
        widget,
        widgetID
    }
}

export function updateWidget(dashboardID: string, widgetID: string, widget: Widget) {
    return {
        type: UPDATE_WIDGET,
        dashboardID,
        widgetID,
        widget
    }
}

export function removeWidget(dashboardID: string, widgetID: string) {
    return {
        type: REMOVE_WIDGET,
        dashboardID,
        widgetID
    }
}

export function selectDashboard(dashboardID: string) {
    return {
        type: SELECT,
        dashboardID
    }
}

export function setEditting(dashboardID: string, editting: boolean) {
    return {
        type: EDIT,
        dashboardID,
        editting: editting
    }
}

export function setConfigWidgetID(dashboardID: string, widgetID: string) {
    return {
        type: SET_CONFIG_WIDGET,
        widgetID
    }
}

export const epics = combineEpics(addWidgetEpic);