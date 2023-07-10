import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { Row, Space, Col, Input, DatePicker, message } from 'antd'
import { aplicationColumns, userColumns } from '../components/tables/tabletColumns';
//import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import DugHistoryCard from '../components/DugHistoryCard';
import PersonalInfoTablet from '../components/personalInfoTablet';
import TabletBatteryHistory from '../components/TabletBatteryHistory';
import { useNavigate } from 'react-router-dom';
import { getTablet, getInstalledApps, getTabletUsers, getDugHistory, getBatteryHistory } from '../services/tabletService.js';

const { RangePicker } = DatePicker;


const { Search } = Input;


//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function TabletDashboard() {

    const [aplicationsData, setAplicationsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [dugHistory, setDugHistory] = useState([]);
    const [personalInfo, setPersonalInfo] = useState([]);
    const [dugFromDate, setDugFromDate] = useState(null);
    const [dugToDate, setDugToDate] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const [inputValue, setInputValue] = useState('');
    const [batteryHistory, setBatteryHistory] = useState([]);

    let query = useQuery();
    const [tablet, setTablet] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const hid = query.get('hid');
        if (!hid) {
            navigate('/404');
            return
        } else {
            getTablet(hid).then((tablet) => {
                if (!tablet) navigate('/404');
                setTablet(tablet);
            }).catch(() => {
            });
        }
    }, [query, navigate])

    useEffect(() => {
        if (tablet) {
            setPersonalInfo(tablet);

            getTabletUsers(tablet.hid).then((users) => {
                setUsersData(users);
            }).catch(console.error);

            getInstalledApps(tablet.objectId).then((apps) => {
                setAplicationsData(apps);
            }).catch(console.error);
        }
    }, [tablet])

    useEffect(() => {
        if (tablet) {
            if (dugFromDate !== null && dugToDate !== null) {
                getDugHistory(dugFromDate, dugToDate, tablet.hid).then((dugHistory) => {
                    setDugHistory(dugHistory);
                }).catch(console.error);
            }
        }
    }, [dugFromDate, dugToDate, tablet, messageApi])

    useEffect(() => {
        if (tablet && tablet.hid) {
            getBatteryHistory(tablet.hid).then((batteryHistory) => {
                setBatteryHistory(batteryHistory);
            }).catch(() => {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Error fetching battery history!',
                    duration: 2,
                    });
            });
        }
    }, [tablet, messageApi])




    async function onSearch(value) {
        if (value === '') return;
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        try {
            const response = await getTablet(value);
            if (!response) {
                messageApi.open({
                    key,
                    type: 'error',
                    content: 'Not found!',
                    duration: 2,
                    });
                setInputValue('');
            } else {
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Loaded!',
                    duration: 2,
                    });
                setInputValue('');
                navigate(`/tablet/dashboard?hid=${value}`);
            }
        } catch(error) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Not found!',
                duration: 2,
                });
            setInputValue('');
        }
    }

    const handleRefreshPersonalInfo = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        getTablet(tablet.hid).then((tablet) => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
                });
            setPersonalInfo(tablet);
        }).catch(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error fetching tablet!',
                duration: 2,
                });
        });
    }

    const handleRefreshApps = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        getInstalledApps(tablet.objectId).then((apps) => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
                });
            setAplicationsData(apps);
        }).catch(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error fetching apps!',
                duration: 2,
                });
        });
    }

    const handleRefreshTabletUsers = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        getTabletUsers(tablet.hid).then((users) => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
                });
            setUsersData(users);
        }).catch(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error fetching tablet users!',
                duration: 2,
                });
        });
    }

    const handleRefreshDugHistory = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        if (dugFromDate === null || dugToDate === null) {
            messageApi.open({
                key,
                type: 'error',
                content: 'Please select a date range!',
                duration: 2,
                });
            return;
        }
        getDugHistory(dugFromDate, dugToDate, tablet.hid).then((dugHistory) => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
                });
            setDugHistory(dugHistory);
        }).catch(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error fetching DUG history!',
                duration: 2,
                });
        });
    }

    const handleBatteryHistoryRefresh = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
          });
        getBatteryHistory(tablet.hid).then((batteryHistory) => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
                });
            setBatteryHistory(batteryHistory);
        }).catch(() => {
            messageApi.open({
                key,
                type: 'error',
                content: 'Error fetching battery history!',
                duration: 2,
                });
        });
    }

    return (
        <MainLayout
            children={
                <>
                    {contextHolder}
                    <div style={{ padding: 20 }}>
                        <Search placeholder="Buscar tablet por hid" onSearch={onSearch} style={{ width: 500, padding: 5 }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        <Space direction="vertical" size={24} style={{ display: 'flex' }}>
                            <Row gutter={[24, 32]}>
                                <Col xs={24} sm={24} md={24} lg={16} xl={16}>

                                    {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
                                    <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                                        {/* Nombre, numero, imei: card principal */}

                                        {/* Nombre, numero, imei: card principal */}

                                        {/* Datos principales y Ultima conexion con SoyMomoSIM */}
                                        <Row gutter={[24, 32]}>

                                            {/* Datos principales */}
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                                            </Col>
                                            {/* Datos principales */}

                                            {/* Ultima conexion con SoyMomoSIM */}
                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                                                    {/* Ultima conexion */}

                                                    {/* Ultima conexion */}

                                                    {/* SoyMomoSIM */}

                                                    {/* SoyMomoSIM */}

                                                </Space>
                                            </Col>
                                            {/* Ultima conexion con SoyMomoSIM */}

                                        </Row>
                                        {/* Datos principales y Ultima conexion con SoyMomoSIM */}

                                        {/* Historial de bateria */}

                                        {/* Historial de bateria */}

                                    </Space>

                                </Col>

                                <Col xs={24} sm={12} md={12} lg={8} xl={8}>

                                    {/* Dimensiones 120 + 24 + 400 + 24 + 400 = 968 */}
                                    <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                                        {/* Ultima actualizacion */}

                                        {/* Ultima actualizacion */}

                                        {/* Comandos */}
                                        {/* Comandos */}


                                        {/* Ajustes reloj */}

                                        {/* Ajustes reloj */}

                                    </Space>

                                </Col>
                            </Row>



                            <Space direction="vertical" size={12} style={{ display: 'flex' }}>
                                    <PersonalInfoTablet
                                        personalInfo={personalInfo}
                                        handleRefresh={handleRefreshPersonalInfo}
                                        hid={tablet.hid}
                                        setTablet={setTablet}
                                    />
                                <TabletBatteryHistory
                                    data={batteryHistory}
                                    handleRefresh={handleBatteryHistoryRefresh}
                                />

                                <Row>
                                    <TableComponent
                                        columns={aplicationColumns()}
                                        data={aplicationsData}
                                        leftIcon="/images/tableIcons/cs-aplicationsTablet.svg"
                                        leftIconHeight={29}
                                        leftIconWidth={38}
                                        refreshLink="/api/refresh"
                                        title='Aplicaciones'
                                        subtitle='Tablet'
                                        handleRefresh={handleRefreshApps}
                                    />
                                </Row>
                                <Row>
                                    <TableComponent
                                        columns={userColumns}
                                        data={usersData}
                                        leftIcon="/images/tableIcons/cs-usersIcon.svg"
                                        leftIconHeight={29}
                                        leftIconWidth={38}
                                        refreshLink="/api/refresh"
                                        title='Usuarios'
                                        subtitle='Tablet'
                                        handleRefresh={handleRefreshTabletUsers}
                                    />
                                </Row>

                                <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', maxWidth: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                                                <img src="/images/tableIcons/cs-history.svg" width={23} height={23} alt='SoyMomo Logo' />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>Historial de Dugs</h1>
                                                <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>Tablet</p>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '0.5rem 1rem', cursor: 'pointer' }} onClick={handleRefreshDugHistory}>
                                            <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
                                        </div>
                                    </div>
                                    <div style={{ maxWidth: '100%', marginTop: '0.75rem', display: "flex", flexWrap: 'wrap', overflow: 'auto', scrollbarColor: 'dark', maxHeight: '300px' }}>
                                        {dugHistory.length > 0 &&
                                            dugHistory.map((item, index) => {
                                                return (
                                                    <DugHistoryCard
                                                        key={index}
                                                        image={item.image}
                                                        date={item.date}
                                                        category={item.category}
                                                        app={item.app}
                                                        time={item.time}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    <RangePicker onChange={(dates, dateString) => {
                                        setDugFromDate(dateString[0])
                                        setDugToDate(dateString[1])
                                    }
                                    } />
                                </div>

                            </Space>
                        </Space>
                    </div>
                </>
            }
        />
    )
}



