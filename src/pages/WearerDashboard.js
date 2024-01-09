import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { Row, Space, Col, Input, message, Button } from 'antd'
import { friendMessageColumns, friendsColumns, userColumns, contactColumns } from '../components/tables/wearerColumns';
import { useAuth, checkAuth } from "../authContext";
import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import ComandsComponent from '../components/Comands';
import WearerInfo from '../components/WearerInfo';
import WearerSettings from '../components/WearerSettings';
import WearerMainCard from '../components/WearerMainCard';
import AppVersionsCard from '../components/AppVersionsCard';
import WearerLastConnectionCard from '../components/WearerLastConnectionCard';
import WearerBatteryHistory from '../components/WearerBatteryHistory';
// import SimMainCard from '../components/SimMainCard';
import {
  getWearer,
  getContacts,
  getWatchUsers,
  getFriends,
  getChatUser,
  getChatWearer,
  getBatteryHistory,
  getSimInfo
} from '../services/wearerService';
import WearerSIMCard from '../components/WearerSIMCard';
// import SimPlanCard from '../components/SimPlanCard';

const { Search } = Input;

export default function WearerDashboard() {
  const { tokens } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const [inputValue, setInputValue] = useState('');
  const [friendMessageData, setFriendMessageData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [userMessageData, setUserMessageData] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [batteryHistory, setBatteryHistory] = useState([]);
  let query = useQuery();
  const [wearer, setWearer] = useState({});
  const [watchSettings, setWatchSettings] = useState({});
  const [simData, setSimData] = useState({});
  const navigate = useNavigate();

  const { state } = useLocation()
  const { imei } = state

  useEffect(() => {
    if (!tokens || !checkAuth(tokens)) {
      navigate('/login');
    }
  }, [tokens, navigate]);

  useEffect(() => {
    const deviceId = query.get('deviceId');
    // const imei = query.get('imei');
    if (!deviceId && !imei) {
      navigate('/not-found');
      return;
    }
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }

    getWearer(params, tokens.AccessToken).then((response) => {
      if (!response.data || response.data.data.length === 0) {
        navigate('/not-found');
        return;
      }
      setWearer(response.data.data[0]);
      setWatchSettings(response.data.includes[0].settings);
    }).catch(console.error);

    getContacts(params, tokens.AccessToken).then((response) => {
      setContacts(response);
    });
    
    getWatchUsers(params, tokens.AccessToken).then((response) => {
      setUsers(response);
    }).catch(console.error);

    // console.log(imei)

    getSimInfo(imei, tokens.AccessToken).then((response) => {
      if (!response.data || response.data.length === 0) {
        setSimData({})
      } else {
        console.log(response)
        const body = response.data.data.results[0];
        const simCard = {
          iccId: body.sim.iccId,
          plan: body.plan,
          remainingTrialDays: response.data.data.remainingTrialDays,
          providerName: body.sim.mnoProvider.name,
          phone: body.msisdn,
          state: body.status,
          networkProvider: body.sim.networkOperator.name,
        };
        setSimData(simCard)
      }
    }).catch(console.error)

  }, [query, navigate, tokens])

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    getFriends(params, deviceId, imei, tokens.AccessToken).then((response) => {
      setFriendData(response);
    });
  }, [query, wearer, tokens])

  const handleContactRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getContacts(params, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
      setContacts(response);
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }

  const handleWatchUserRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getWatchUsers(params, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
      setUsers(response);
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }

  const handleFriendsRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getFriends(params, params.deviceId, params.imei, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
      setFriendData(response);
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }


  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    getChatUser(params, tokens.AccessToken).then((response) => {
      setUserMessageData(response);
    }).catch(console.error);
  
  }, [query, wearer, tokens])

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    getChatWearer(params, tokens.AccessToken).then((response) => {
      setFriendMessageData(response);
    }).catch(console.error);
  }, [query, wearer, tokens])

  useEffect(() => {
    if (wearer) {
      if (wearer.deviceId) {
        getBatteryHistory(wearer.deviceId, tokens.AccessToken).then((response) => {
          setBatteryHistory(response);
        }).catch(console.error);
      }
    }
  }, [query, wearer, tokens])

  const handleChatUserRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getChatUser(params, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
      setUserMessageData(response);
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }

  const handleChatWearerRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getChatWearer(params, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
      setFriendMessageData(response);
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
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
    if (wearer) {
      if (wearer.deviceId) {
        getBatteryHistory(wearer.deviceId, tokens.AccessToken).then((response) => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Loaded!',
            duration: 2,
          });
          setBatteryHistory(response);
        }).catch(() => {
          messageApi.open({
            key,
            type: 'error',
            content: 'Error fetching data!',
            duration: 2,
          });
        });
      }
    }
  }

  const handleSIMRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    let imeiValue;

    if (imei) {
      imeiValue = imei;
    } else if (wearer && wearer.imei) {
      imeiValue = wearer.imei
    } else return;

    getSimInfo(imeiValue, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });

      if (!response.data || response.data.length === 0) {
        setSimData({})
      } else {
        console.log(response)
        const body = response.data.data[0];
        const simCard = {
          planName: body.plan.title,
          providerName: body.sim.mnoProvider.name,
          phone: body.msisdn,
          state: body.status,
          networkProvider: body.sim.networkOperator.name,
        };
        setSimData(simCard)
      }
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }

  async function navSimDashboard(imei) {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    navigate(`/sim?imei=${imei}`);
  }



  async function onSearch(value) {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    navigate(`/?searchTxt=${value}`);
  }

  const handleWearerInfoRefresh = () => {
    const params = {
      deviceId: wearer.deviceId,
      imei: wearer.imei,
    }
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    getWearer(params, tokens.AccessToken).then((response) => {
      if (!response.data || response.data.data.length === 0) {
        messageApi.open({
          key,
          type: 'error',
          content: 'Error fetching data!',
          duration: 2,
        });
        return;
      }
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });
      setWearer(response.data.data[0]);
      setWatchSettings(response.data.includes[0].settings);
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }


  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 20 }}>
          { contextHolder }
          <Search placeholder="Buscar reloj por imei o deviceId" onSearch={onSearch} value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ width: 500, padding: 5 }} />
          <Button onClick={() => navigate(-1)} style={{ marginLeft: '15px', marginTop: '5px' }}>Go Back</Button>
        </div>
        <Space direction="vertical" size={24} style={{ display: 'flex' }}>
          <Row gutter={[24, 32]}>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>

              {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
              <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                {/* Nombre, numero, imei: card principal */}
                <WearerMainCard wearer={wearer} />
                {/* Nombre, numero, imei: card principal */}

                {/* Datos principales y Ultima conexion con SoyMomoSIM */}
                <Row gutter={[24, 32]}>

                  {/* Datos principales */}
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <WearerInfo
                      title="Datos principales"
                      subtitle="Reloj"
                      leftIcon="/images/cs-wearerInfo.svg"
                      leftIconWidth={24}
                      leftIconHeight={29}
                      handleRefresh={handleWearerInfoRefresh}
                      wearer={wearer}
                    />
                  </Col>
                  {/* Datos principales */}

                  {/* Ultima conexion con SoyMomoSIM */}
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                      {/* Ultima conexion */}
                      <WearerLastConnectionCard title="Última conexión" lastTKQ={wearer.lastTKQ} handleRefresh={handleWearerInfoRefresh} />
                      {/* Ultima conexion */}

                      {/* SoyMomoSIM */}
                      <WearerSIMCard
                        simCard={simData}
                        handleRefresh={handleSIMRefresh}
                        navSimDashboard={() => navSimDashboard(imei)}
                      />

                      {/* SoyMomoSIM */}

                    </Space>
                  </Col>
                  {/* Ultima conexion con SoyMomoSIM */}

                </Row>
                {/* Datos principales y Ultima conexion con SoyMomoSIM */}

                {/* Historial de bateria */}
                <WearerBatteryHistory
                  data={batteryHistory}
                  handleRefresh={handleBatteryHistoryRefresh}
                />
                {/* Historial de bateria */}

              </Space>

            </Col>

            <Col xs={24} sm={12} md={12} lg={8} xl={8}>

              {/* Dimensiones 120 + 24 + 400 + 24 + 400 = 968 */}
              <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                {/* Ultima actualizacion */}
                <AppVersionsCard versionAndroid="5.2.6" versionApple="5.2.6" />
                {/* Ultima actualizacion */}

                {/* Comandos */}
                <ComandsComponent
                  leftIcon='/images/cs-comands.svg'
                  title='Comandos'
                  subtitle='Modificar'
                  leftIconWidth={24}
                  leftIconHeight={24}
                  imei={wearer.imei}
                  deviceId={wearer.deviceId}
                />
                {/* Comandos */}


                {/* Ajustes reloj */}
                <WearerSettings
                  title="Ajustes reloj"
                  subtitle="Configuración"
                  leftIcon="/images/cs-wearerSettings.svg"
                  leftIconWidth={24}
                  leftIconHeight={29}
                  handleRefresh={handleWearerInfoRefresh}
                  watchSettings={watchSettings} />
                {/* Ajustes reloj */}

              </Space>

            </Col>
          </Row>

          <Space direction="vertical" size={12} style={{ display: 'flex' }}>
            <Row gutter={[24, 32]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <TableComponent
                  columns={friendMessageColumns}
                  data={friendMessageData}
                  leftIcon="/images/tableIcons/cs-friendMessagesIcon.svg"
                  leftIconHeight={29}
                  leftIconWidth={24}
                  handleRefresh={handleChatWearerRefresh}
                  title='Mensajes de amigos'
                  subtitle='Externos'
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <TableComponent
                  columns={friendMessageColumns}
                  data={userMessageData}
                  leftIcon="/images/tableIcons/cs-userMessagesIcon.svg"
                  leftIconHeight={29}
                  leftIconWidth={24}
                  handleRefresh={handleChatUserRefresh}
                  title='Mensajes de usuarios'
                  subtitle='Familiares'
                />
              </Col>
            </Row>
            <Row>
              <TableComponent
                columns={friendsColumns}
                data={friendData}
                leftIcon="/images/tableIcons/cs-friendsHeart.svg"
                leftIconHeight={27}
                leftIconWidth={31}
                handleRefresh={handleFriendsRefresh}
                title='Amigos'
                subtitle='Aprobación'
              />
            </Row>
            {/* <Row gutter={[24, 32]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <TableComponent
                  columns={wifiColumns}
                  data={wifiData}
                  leftIcon="/images/tableIcons/cs-wifiIcon.svg"
                  leftIconHeight={0}
                  leftIconWidth={32}
                  refreshLink="/api/refresh"
                  title='Historial de conexión'
                  subtitle='Internet'
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <TableComponent
                  columns={friendsColumns}
                  data={friendData}
                  leftIcon="/images/tableIcons/cs-friendsHeart.svg"
                  leftIconHeight={27}
                  leftIconWidth={31}
                  refreshLink="/api/refresh"
                  title='Amigos'
                  subtitle='Aprobación'
                />
              </Col>
            </Row> */}
            <Row>
              <TableComponent
                columns={userColumns}
                data={users}
                leftIcon="/images/tableIcons/cs-usersIcon.svg"
                leftIconHeight={29}
                leftIconWidth={38}
                handleRefresh={handleWatchUserRefresh}
                title='Usuarios'
                subtitle='Familiares'
              />
            </Row>
            <Row>
              <TableComponent
                columns={contactColumns}
                data={contacts}
                leftIcon="/images/tableIcons/cs-contactIcon.svg"
                leftIconHeight={29}
                leftIconWidth={38}
                handleRefresh={handleContactRefresh}
                title='Contactos'
                subtitle='Reloj'
              />
            </Row>
          </Space>
        </Space>
      </div>
    </MainLayout>
  )
}