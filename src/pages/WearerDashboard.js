import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Space, Col, Input } from 'antd'
import { friendMessageColumns, friendsColumns, userColumns, contactColumns } from '../components/tables/wearerColumns';

import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import ComandsComponent from '../components/Comands';
import WearerInfo from '../components/WearerInfo';
import WearerSettings from '../components/WearerSettings';
import WearerMainCard from '../components/WearerMainCard';
import AppVersionsCard from '../components/AppVersionsCard';
import WearerLastConnectionCard from '../components/WearerLastConnectionCard';
import WearerBatteryHistory from '../components/WearerBatteryHistory';
import { getWearer, getContacts, getWatchUsers, getFriends, getChatUser, getChatWearer, getBatteryHistory } from '../services/wearerService';

const { Search } = Input;

export default function WearerDashboard() {

  const [friendMessageData, setFriendMessageData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [userMessageData, setUserMessageData] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [batteryHistory, setBatteryHistory] = useState([]);
  let query = useQuery();
  const [wearer, setWearer] = useState({});
  const [watchSettings, setWatchSettings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
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

    getWearer(params).then((response) => {
      if (!response.data || response.data.data.length === 0) {
        navigate('/not-found');
        return;
      }
      setWearer(response.data.data[0]);
      setWatchSettings(response.data.includes[0].settings);
    }).catch(console.error);

    getContacts(params).then((response) => {
      setContacts(response);
    });
    
    getWatchUsers(params).then((response) => {
      setUsers(response);
    }).catch(console.error);

  }, [query, navigate])

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    getFriends(params, deviceId, imei).then((response) => {
      setFriendData(response);
    });
  }, [query, wearer])

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    getChatUser(params).then((response) => {
      setUserMessageData(response);
    }).catch(console.error);
  
  }, [query, wearer])

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    getChatWearer(params).then((response) => {
      setFriendMessageData(response);
    }).catch(console.error);
  }, [query, wearer])

  useEffect(() => {
    if (wearer) {
      if (wearer.deviceId) {
        getBatteryHistory(wearer.deviceId).then((response) => {
          setBatteryHistory(response);
        }).catch(console.error);
      }
    }
  }, [query, wearer])



  async function onSearch(value) {
    console.log(value);
  }


  return (
    <MainLayout
      children={
        <>
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 20 }}>
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
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
                          refreshLink="/api/refresh"
                          wearer={wearer} />
                      </Col>
                      {/* Datos principales */}

                      {/* Ultima conexion con SoyMomoSIM */}
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                          {/* Ultima conexion */}
                          <WearerLastConnectionCard title="Última conexión" lastTKQ={wearer.lastTKQ} />
                          {/* Ultima conexion */}

                          {/* SoyMomoSIM */}
                          {/* <DemoBox value={200}>

                          </DemoBox> */}
                          {/* SoyMomoSIM */}

                        </Space>
                      </Col>
                      {/* Ultima conexion con SoyMomoSIM */}

                    </Row>
                    {/* Datos principales y Ultima conexion con SoyMomoSIM */}

                    {/* Historial de bateria */}
                    <WearerBatteryHistory
                      data={batteryHistory}
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
                      refreshLink="/api/refresh"
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
                      refreshLink="/api/refresh"
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
                      refreshLink="/api/refresh"
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
                    refreshLink="/api/refresh"
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
                    refreshLink="/api/refresh"
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
                    refreshLink="/api/refresh"
                    title='Contactos'
                    subtitle='Reloj'
                  />
                </Row>
              </Space>
            </Space>
          </div>
        </>
      }
    />
  )
}