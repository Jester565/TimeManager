import { filter, mapTo } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';

const loadEpic = action$ => action$.pipe(
    filter((action: any) => action.type === 'PING'),
    mapTo({ type: 'PONG' })
)

export const epics = combineEpics(loadEpic);