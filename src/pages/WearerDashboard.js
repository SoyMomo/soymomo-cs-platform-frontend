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
  getSimInfo,
  getTcpOptions
} from '../services/wearerService';
import WearerSIMCard from '../components/WearerSIMCard';
// import SimPlanCard from '../components/SimPlanCard';

import axios from 'axios';

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
  const [options, setOptions] = useState([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    // ... more options
  ]);
  const navigate = useNavigate();

  const { state } = useLocation()
  let { imei } = state

  // Autenticación
  useEffect(() => {
    if (!tokens || !checkAuth(tokens)) {
      navigate('/login');
    }
  }, [tokens, navigate]);

  // Fetch Wearer Info
  useEffect(() => {
    const deviceId = query.get('deviceId');
    if (query.get('imei')) {
      imei = query.get('imei')
    }
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


    getSimInfo(imei, null, tokens.AccessToken).then((response) => {
      if (!response.data || response.data.length === 0) {
        setSimData({})
      } else {
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

  // Fetch Wearer Friends
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

  // Fetch Chat Users
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

  // Fetch Chat Wearer
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

  // Fetch Battery History
  useEffect(() => {
    if (wearer) {
      if (wearer.deviceId) {
        getBatteryHistory(wearer.deviceId, tokens.AccessToken).then((response) => {
          setBatteryHistory(response);
        }).catch(console.error);
      }
    }
  }, [query, wearer, tokens])

  // Fetch TCP Options
  useEffect(() => {
    getTcpOptions(tokens.AccessToken).then((response) => {
      const arr = response.data.data.reduce((acc, item) => {
        return acc.concat([{ value: item[0], label: item[1], params: item[2] }])
      }, [])
      setOptions(arr)
    }).catch(console.error)
  },[])

 // #region Handle Refreshes
  const handleContactRefresh = () => {
    openMessageApi('Loading...', 'loading');
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getContacts(params, tokens.AccessToken).then((response) => {
      openMessageApi('Loaded!', 'success');
      setContacts(response);
    }).catch(() => {
      openMessageApi('Error fetching data!', 'error');
    });
  }

  const handleWatchUserRefresh = () => {
    openMessageApi('Loading...', 'loading');
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getWatchUsers(params, tokens.AccessToken).then((response) => {
      openMessageApi('Loaded!', 'success');
      setUsers(response);
    }).catch(() => {
      openMessageApi('Error fetching data!', 'error');
    });
  }

  const handleFriendsRefresh = () => {
    openMessageApi('Loading...', 'loading');
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getFriends(params, params.deviceId, params.imei, tokens.AccessToken).then((response) => {
      openMessageApi('Loaded!', 'success');
      setFriendData(response);
    }).catch(() => {
      openMessageApi('Error fetching data!', 'error');
    });
  }

  const handleChatUserRefresh = () => {
    openMessageApi('Loading...', 'loading');
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getChatUser(params, tokens.AccessToken).then((response) => {
      openMessageApi('Loaded!', 'success');
      setUserMessageData(response);
    }).catch(() => {
      openMessageApi('Error fetching data!', 'error');
    });
  }

  const handleChatWearerRefresh = () => {
    openMessageApi('Loading...', 'loading');
    const params = { deviceId: wearer.deviceId, imei: wearer.imei };
    getChatWearer(params, tokens.AccessToken).then((response) => {
      openMessageApi('Loaded!', 'success');
      setFriendMessageData(response);
    }).catch(() => {
      openMessageApi('Error fetching data!', 'error');
    });
  }

  const handleBatteryHistoryRefresh = () => {
    openMessageApi('Loading...', 'loading');
    if (wearer) {
      if (wearer.deviceId) {
        getBatteryHistory(wearer.deviceId, tokens.AccessToken).then((response) => {
          openMessageApi('Loaded!', 'success');
          
          setBatteryHistory(response);
        }).catch(() => {
          openMessageApi('Error fetching data!', 'error');
        });
      }
    }
  }

  const handleSIMRefresh = () => {
    openMessageApi('Loading...', 'loading');

    let imeiValue;

    if (imei) {
      imeiValue = imei;
    } else if (wearer && wearer.imei) {
      imeiValue = wearer.imei
    } else return;

    getSimInfo(imeiValue, null, tokens.AccessToken).then((response) => {
      openMessageApi('Loaded!', 'success');
      
      if (!response.data || response.data.length === 0) {
        setSimData({})
      } else {
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
      openMessageApi('Error fetching data!', 'error');
    });
  }

  const handleWearerInfoRefresh = () => {
    const params = {
      deviceId: wearer.deviceId,
      imei: wearer.imei,
    }
    openMessageApi('Loading...', 'loading');
    
    getWearer(params, tokens.AccessToken).then((response) => {
      if (!response.data || response.data.data.length === 0) {
        openMessageApi('Error fetching data!', 'error');
        return;
      }
      openMessageApi('Loaded!', 'success');
      
      setWearer(response.data.data[0]);
      setWatchSettings(response.data.includes[0].settings);
    }).catch(() => {
      openMessageApi('Error fetching data!', 'error');
      
    });
  }
  // #endregion

  async function navSimDashboard() {
    openMessageApi('Loading...', 'loading');
    navigate(`/sim/dashboard?imei=${imei}`, {state: { imei }});
  }

  async function onSearch(value) {
    openMessageApi('Loading...', 'loading');
    navigate(`/?searchTxt=${value}`);
  }

  async function updateWearer(deviceId, imei) {
    let payload;
    try {
      if (deviceId) {
        payload = { deviceId }
      } else if (imei) {
        payload = { imei: imei }
      }
      getWearer(payload, tokens.AccessToken).then((response) => {
        if (!response.data || response.data.data.length === 0) {
          navigate('/not-found');
          return;
        }
        setWearer(response.data.data[0]);
      }).catch(console.error);
    } catch(error) {
      console.error(error)
    }
  }

  async function resetWatch(deviceId, imei) {
    try {
        openMessageApi('Loading...', 'loading')
        if (!deviceId && imei) {
            deviceId = imei.slice(4, 14);
        } else if (!deviceId && !imei) {
          throw new Error('Error, no deviceId or imei provided.');
        }
        const response = await axios.post(
            process.env.REACT_APP_BACKEND_HOST +'/wearer/resetWatch',
            { deviceId },
            { 
                headers: { Authorization: `Bearer ${tokens.AccessToken}` }
            }
        );
        if (response.status === 201) {
            openMessageApi('Success!', 'success')
            updateWearer(deviceId, imei)
        } else {
            openMessageApi(`Error ${response.status}: ${response.data.error}`, 'error')
        }
    } catch (error) {
        openMessageApi(`Error: ${error.message}`, 'error')
    }
  }

  const openMessageApi = (message, type) => {
    if (type === 'loading') {
      messageApi.open({
        key,
        type,
        content: message,
      });
    } else {
      messageApi.open({
        key,
        type,
        content: message,
        duration: 2,
      });
    }
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
                  resetWatch={resetWatch}
                  openMessageApi={openMessageApi}
                  tcpOptions={options}
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