export const aplicationColumns = () => [
    {
        title: 'Nombre Aplicación',
        dataIndex: 'appName',
        key: 'appName',
        width: 150,
        align: 'center',
    },
    {
        title: 'Instalada',
        dataIndex: 'installed',
        key: 'installed',
        width: 150,
        align: 'center',
    },
    {
        title: 'Permitida',
        dataIndex: 'allowed',
        key: 'allowed',
        width: 150,
        align: 'center',
    },
    // {
    //     title: 'Acción',
    //     key: 'action',
    //     width: 100,
    //     render: (row) => <button onClick={() => console.log(row)} style={{backgroundColor: '#32B8C0', color: 'white', padding: '0.25rem', borderRadius: '1rem', width: '100px'}}>Permitir</button>,
    //     align: 'center'
    // }
];

export const userColumns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        width: 150,
        align: 'center',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,
        align: 'center',
    },
    {
        title: 'Ingreso a BD',
        dataIndex: 'bd',
        key: 'bd',
        width: 150,
        align: 'center',
    },
    {
        title: 'ToS',
        dataIndex: 'tos',
        key: 'tos',
        width: 150,
        align: 'center',
    },
    {
        title: 'Borrar cuenta',
        dataIndex: 'deletion',
        key: 'deletion',
        width: 100,
        align: 'center',
    },
    // {
    //     title: 'Pais',
    //     dataIndex: 'country',
    //     key: 'country',
    //     width: 100,
    //     align: 'center',
    // }
];


