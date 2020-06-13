import { Filter } from '../../redux/dashboards';

export interface StaticFilterInterface {
    TypeID: string;
    Name: string;
    ExecuteFilter(filter: any);
}

export interface FilterInterface {
    filterConfig: any;
}