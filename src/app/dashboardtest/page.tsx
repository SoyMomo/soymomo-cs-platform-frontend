'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Row, Space, Typography, Table, Col } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { wifiColumns, DataType, friendMessageColumns, friendsColumns, userColumns, contactColumns } from '../../components/tables/columns';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import TableComponent from '../../components/tables/table'

const { Title } = Typography

async function getWifiData() {
  const wifiData: DataType[] = [];
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
  const friendMessageData: DataType[] = [];
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
  const friendData: DataType[] = [];
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
  const userMessageData: DataType[] = [];
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
  const users: DataType[] = [];
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
  const contacts: DataType[] = [];
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
export default function AppDir() {

  const [wifiData, setWifiData] = React.useState<DataType[]>([]);
  const [friendMessageData, setFriendMessageData] = React.useState<DataType[]>([]);
  const [friendData, setFriendData] = React.useState<DataType[]>([]);
  const [userMessageData, setUserMessageData] = React.useState<DataType[]>([]);
  const [users, setUsers] = React.useState<DataType[]>([]);
  const [contacts, setContacts] = React.useState<DataType[]>([]);

  React.useEffect(() => {
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


  return (
    <>
      <div style={{ padding: 20 }}>
        <Row gutter={[24, 32]}>
          <Col>
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
          </Col>
        </Row>



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
        <Row gutter={[24, 32]}>
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
        <Row gutter={[24, 32]}>
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

      </div >
    </>
  )
}