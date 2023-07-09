import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Space, Col, Input } from 'antd'
import { wifiColumns, friendMessageColumns, friendsColumns, userColumns, contactColumns } from '../components/tables/wearerColumns';
//import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import ComandsComponent from '../components/Comands';
import WearerInfo from '../components/WearerInfo';
import WearerSettings from '../components/WearerSettings';

const DemoBox = (props) => (
  <p style={{ borderColor: 'red', borderWidth: 5, backgroundColor: 'black', height: props.value }}>{props.children}</p>
);

const { Search } = Input;

const chartData = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 15000 },
  { quarter: 5, earnings: 15500 },
  { quarter: 6, earnings: 16000 },
  { quarter: 7, earnings: 13500 },
  { quarter: 8, earnings: 12000 },
  { quarter: 9, earnings: 17000 },
  { quarter: 10, earnings: 19000 }
];

//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function WearerDashboard() {

  //const [wifiData, setWifiData] = useState([]);
  const [friendMessageData, setFriendMessageData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [userMessageData, setUserMessageData] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
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
        const getWearer = async (params) => {
            const response = await axios.get('http://localhost/wearer/getWearerByDeviceIdOrImei', { params });
            setWearer(response.data.data[0]);
            setWatchSettings(response.data.includes[0].settings);
        }

        const getContacts = async (params) => {
            const response = await axios.get('http://localhost/wearer/getContacts', { params });
            let finalResponse;
            if (response.data.data) {
              finalResponse = response.data.data.map((contact) => {
                contact.sos = contact.sos ? "Si" : "No"
                return contact
              })
            }
            setContacts(finalResponse ?? [])
        }

        const getWatchUsers = async (params) => {
            const response = await axios.get('http://localhost/wearer/watchUser/getWatchUserByEmailOrDeviceIdOrImei', { params });
            let fetchedUsers = response.data.data.users
            const fetchedWatchUsers = response.data.data.results
            fetchedUsers.map((user) => {
              const currentWu = fetchedWatchUsers.find((watchUser) => watchUser.user.objectId === user.objectId)
              user.id = user.objectId
              user.name = user.firstName + " " + user.lastName
              user.facebook = user.fb ? "Si" : "No"
              user.authorized = currentWu.active ? "Si" : "No"
              return user
            })
            setUsers(fetchedUsers)
        }

        getWearer(params).catch(console.error);
        getContacts(params).catch(console.error);
        getWatchUsers(params).catch(console.error);
        
    }, [query])

    useEffect(() => {
      const deviceId = query.get('deviceId');
      const imei = query.get('imei');
      let params = {};
      if (deviceId) {
        params = { deviceId };
      } else if (imei) {
        params = { imei };
      }
      const getFriends = async (params) => {
          const response = await axios.get('http://localhost/wearer/getWearerFriends', { params });
          let fetchedFriends = response.data.data
          for (let i = 0; i < fetchedFriends.length; i++) {
            const wearer1 = (await axios.get('http://localhost/wearer/getWearerByObjectId', { params: { objectId: fetchedFriends[i].watch2.objectId } })).data.data[0];
            const wearer2 = (await axios.get('http://localhost/wearer/getWearerByObjectId', { params: { objectId: fetchedFriends[i].watch2.objectId } })).data.data[0];
            if (wearer1.deviceId === deviceId || wearer1.imei === imei) {
              fetchedFriends[i].name = wearer2.firstName + " " + wearer2.lastName
              fetchedFriends[i].deviceId = wearer2.deviceId
            } else {
              fetchedFriends[i].name = wearer1.firstName + " " + wearer1.lastName
              fetchedFriends[i].deviceId = wearer1.deviceId
            }
            fetchedFriends[i].id = i
            fetchedFriends[i].approval1 = fetchedFriends[i].isWatch1Approved ? "Aprobado" : "No aprobado"
            fetchedFriends[i].approval2 = fetchedFriends[i].isWatch2Approved ? "Aprobado" : "No aprobado"
          }
          setFriendData(fetchedFriends)
      }
      getFriends(params).catch(console.error);
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
      const getChatUser = async (params) => {
        const response = await axios.get('http://localhost/wearer/chatUser', { params });
        const messages = response.data.data
        .filter(row => row.chatUser.type === "text")  // Filter first
        .map(row => {                                // Then map
          const chatUser = row.chatUser
          const user = row.user
          return {
            message: chatUser.text,
            sender: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
            date: chatUser.createdAt,
            from: chatUser.sender,
          }
        });
        setUserMessageData(messages)
      }
      getChatUser(params).catch(console.error);
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
      const getChatWearer= async (params) => {
        const response = await axios.get('http://localhost/wearer/chatWearer', { params });
        const messages = response.data.data
        .filter(row => row.chatWearer.type === "text")  // Filter first
        .map(row => {                                // Then map
          const chatWearer = row.chatWearer
          const sender = row.sender
          return {
            message: chatWearer.text,
            sender: `${sender.firstName ?? ""} ${sender.lastName ?? ""}`,
            date: chatWearer.createdAt,
            from: "watch",
          }
        });
        setFriendMessageData(messages)
      }
      getChatWearer(params).catch(console.error);
    }, [query, wearer])

  async function onSearch(value) {
    console.log(value);
  }


  return (
    <MainLayout
      children={
        <>
          <div style={{ padding: 20 }}>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
            <h1>{wearer.lastKnownLocation?.longitude}</h1>
            <Space direction="vertical" size={24} style={{ display: 'flex' }}>
              <Row gutter={[24, 32]}>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>

                  {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
                  <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                    {/* Nombre, numero, imei: card principal */}
                    <DemoBox value={240}>
                    </DemoBox>
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
                          wearer={wearer}/>
                      </Col>
                      {/* Datos principales */}

                      {/* Ultima conexion con SoyMomoSIM */}
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                        <WearerSettings
                          title="Ajustes reloj"
                          subtitle="Configuración" 
                          leftIcon="/images/cs-wearerSettings.svg" 
                          leftIconWidth={24}
                          leftIconHeight={29}
                          refreshLink="/api/refresh"
                          watchSettings={watchSettings}/>

                          {/* Ultima conexion */}
                          {/* <DemoBox value={200}>

                          </DemoBox> */}
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

                    <DemoBox value={256}>
                    </DemoBox>

                    {/* Historial de bateria */}

                  </Space>

                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={8}>

                  {/* Dimensiones 120 + 24 + 400 + 24 + 400 = 968 */}
                  <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                    {/* Ultima actualizacion */}
                    <DemoBox value={120}>

                    </DemoBox>
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
                    {/* <WearerSettings
                          title="Ajustes reloj"
                          subtitle="Configuración" 
                          leftIcon="/images/cs-wearerSettings.svg" 
                          leftIconWidth={24}
                          leftIconHeight={29}
                          refreshLink="/api/refresh"
                          watchSettings={watchSettings}/> */}
                    {/* Ajustes reloj */}

                  </Space>

                </Col>

                {/* <Col>
                    <VictoryChart
                      theme={VictoryTheme.material}
                      domainPadding={{ x: 10 }}
                    >
                      <VictoryBar
                        data={chartData}
                        // data accessor for x values
                        x="quarter"
                        // data accessor for y values
                        y="earnings"
                        animate={{
                          duration: 2000,
                          onLoad: { duration: 1000 }
                        }}
                        barRatio={0.3}
                        style={{
                          data: {
                            fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31",
                            stroke: ({ index }) => "#c43a31",
                            fillOpacity: 0.7,
                            strokeWidth: 3
                          },
                          labels: {
                            fontSize: 15,
                            fill: ({ datum }: any) => "#c43a31"
                          }
                        }}
                      />
                    </VictoryChart>
                  </Col> */}
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