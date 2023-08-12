export interface IRouterParams {
    children : any
}

export interface IModal {
    isOpen : boolean;
    onFinish : (val:any) => void;
    className : string;
}

export interface IPiechart {
    className : string;
    data : any;
}

export interface ITable {
    className : string;
    columns : any;
    dataSource : any | [];
    pageSize : any;
    loading : boolean;
}
