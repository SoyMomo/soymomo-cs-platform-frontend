import type { ColumnsType } from 'antd/es/table';

export interface DataType {
    key: React.Key;
    [key: string]: any;
}

export const wifiColumns: ColumnsType<DataType> = [
    {
        title: '#',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: 'Fecha',
        width: 150,
        dataIndex: 'date',
        key: 'date',
        align: 'center',
    },
    {
        title: 'Counter LK',
        dataIndex: 'counter',
        key: 'counter',
        width: 150,
        align: 'center',
    },
    {
        title: '% Error',
        dataIndex: 'error',
        key: 'error',
        width: 100,
        align: 'center',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        align: 'center',
    }
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   width: 100,
    //   render: () => <a>action</a>,
    // },
];

export const friendMessageColumns: ColumnsType<DataType> = [
    {
        title: 'Mensaje',
        dataIndex: 'message',
        key: 'message',
        width: 150,
        align: 'center',
    },
    {
        title: 'Enviado por',
        dataIndex: 'sender',
        key: 'sender',
        width: 100,
        align: 'center',
    },
    {
        title: 'Desde',
        dataIndex: 'from',
        key: 'from',
        width: 100,
        align: 'center',
    },
    {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
        width: 150,
        align: 'center',
    },
];

export const friendsColumns: ColumnsType<DataType> = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Aprobación 1',
        dataIndex: 'approval1',
        key: 'approval1',
        width: 130,
        align: 'center',
    },
    {
        title: 'Aprobación 2',
        dataIndex: 'approval2',
        key: 'approval2',
        width: 130,
        align: 'center',
    },
    {
        title: 'Device ID',
        dataIndex: 'deviceID',
        key: 'deviceID',
        width: 150,
        align: 'center',
    }
]