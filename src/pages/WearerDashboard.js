import MainLayout from '../layouts/layout';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Row, Space, Col, Input } from 'antd'
import { wifiColumns, friendMessageColumns, friendsColumns, userColumns, contactColumns } from '../components/tables/columns';
//import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';

const DemoBox = (props) => (
  <p style={{borderColor: 'red', borderWidth: 5, backgroundColor: 'black', height: props.value}}>{props.children}</p>
);

const { Search } = Input;

async function getWifiData() {
  const wifiData = [];
  for (let i = 0; i < 100; i++) {
    wifiData.push({
      key: i,
      name: `Edward ${i}`,
      date: `2021-01-01`,
      counter: `francisco.ordenesv@gmail.com`,
      error: `Si`,
      status: `${i}`
    });
  }
  return wifiData;
}

async function getFriendMessageData() {
  const friendMessageData = [];
  for (let i = 0; i < 100; i++) {
    friendMessageData.push({
      key: i,
      message: `Hola Francisco ${i}`,
      sender: `Francisco Órdenes`,
      date: `2021-01-01`,
      from: `app`
    });
  }
  return friendMessageData;
}

async function getFriendData() {
  const friendData = [];
  for (let i = 0; i < 100; i++) {
    friendData.push({
      key: i,
      name: `Francisco Órdenes ${i}`,
      approval1: `Aprovado`,
      approval2: `No aprobado`,
      deviceID: "283949201203923"
    });
  }
  return friendData;
}

async function getUserMessageData() {
  const userMessageData = [];
  for (let i = 0; i < 100; i++) {
    userMessageData.push({
      key: i,
      message: `Holaoaoaaa Francisco ${i} AWDWAHDBAWD  AWDJHBAWDAW AWHBDAWFVGEAFVEF AGWVDGAWXGA GAVWG VG AWV GWVDAVWDGAWD`,
      sender: `Francisco Órdenes`,
      date: `2021-01-01`,
      from: `app`
    });
  }
  return userMessageData;
}

async function getUsers() {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      key: i,

      name: `Francisco Órdenes ${i}`,
      email: `francisco.ordenesv@gmail.com`,
      facebook: `Si`,
      authorized: `Si`,
      os: `IOS`,
      version: `Antigua`,
      country: `Chile`,
    })
  }
  return users;
}

async function getContacts() {
  const contacts = [];
  for (let i = 0; i < 10; i++) {
    contacts.push({
      key: i,
      position: `${i}`,
      name: `Francisco Órdenes ${i}`,
      phone: `app`,
      sos: `+56959826861`,
      lastUpdate: `14:05 2021-01-01`,
    })
  }
  return contacts;
}

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
  
  const [wifiData, setWifiData] = useState([]);
  const [friendMessageData, setFriendMessageData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [userMessageData, setUserMessageData] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  let query = useQuery();
  const [wearer, setWearer] = useState({});

    useEffect(() => {
        const getWearer = async () => {
            const deviceId = query.get('deviceId');
            const imei = query.get('imei');
            let params = {};
            if (deviceId) {
              params = { deviceId };
            } else if (imei) {
              params = { imei };
            }
            const response = await axios.get('http://localhost/wearer/getWearerByDeviceIdOrImei', { params });
            setWearer(response.data.data[0]);
        }
        getWearer().catch(console.error);
    }, [query])

    useEffect(() => {
        console.log(wearer)
    }, [wearer])



  useEffect(() => {
    getWifiData().then((data) => {
      setWifiData(data);
    });
    getFriendMessageData().then((data) => {
      setFriendMessageData(data);
    });
    getFriendData().then((data) => {
      setFriendData(data);
    });
    getUserMessageData().then((data) => {
      setUserMessageData(data);
    });
    getUsers().then((data) => {
      setUsers(data);
    });
    getContacts().then((data) => {
      setContacts(data);
    });
  }, []);

  async function onSearch(value) {
    console.log(value);
  }


  return (
    <MainLayout
        children={
            <>
            <div style={{ padding: 20 }}>
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
              <h1>{wearer.firstName}</h1>
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
                          <DemoBox value={424}>
                          </DemoBox>
                        </Col>
                        {/* Datos principales */}
      
                        {/* Ultima conexion con SoyMomoSIM */}
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                          <Space direction="vertical" size={24} style={{ display: 'flex' }}>
      
                            {/* Ultima conexion */}
                            <DemoBox value={200}>
      
                            </DemoBox>
                            {/* Ultima conexion */}
      
                            {/* SoyMomoSIM */}
                            <DemoBox value={200}>
      
                            </DemoBox>
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
                    <DemoBox value={400}>
                          
                    </DemoBox>
                    {/* Comandos */}
      
      
                    {/* Ajustes reloj */}
                    <DemoBox value={400}>
                          
                    </DemoBox>
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
                  <Row gutter={[24, 32]}>
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
                    </Row>
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