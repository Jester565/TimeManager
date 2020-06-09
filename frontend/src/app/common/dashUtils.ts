import _ from 'lodash';
import { Dashboard, Widget } from '../redux/dashboards';

export const findWidgetsBottom = (widgets: Widget[]) => {
    let bottoms = _.map(widgets, (widget: Widget) => {
        return widget.position.top + widget.position.height;
    });
    return _.max(bottoms)
}