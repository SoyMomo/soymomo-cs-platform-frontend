'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Row, Space, Typography, Table, Col } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { wifiColumns, DataType, friendMessageColumns, friendsColumns } from '../../components/tables/columns';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

import TableComponent from '../../components/tables/table'

const { Title } = Typography

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Full Name',
//     width: 100,
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     width: 100,
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Column 1',
//     dataIndex: 'address',
//     key: '1',
//     width: 150,
//   },
//   {
//     title: 'Column 2',
//     dataIndex: 'address',
//     key: '2',
//     width: 150,
//   },
//   {
//     title: 'Column 3',
//     dataIndex: 'address',
//     key: '3',
//     width: 150,
//   },
//   {
//     title: 'Column 4',
//     dataIndex: 'address',
//     key: '4',
//     width: 150,
//   },
//   {
//     title: 'Column 5',
//     dataIndex: 'address',
//     key: '5',
//     width: 150,
//   },
//   {
//     title: 'Column 6',
//     dataIndex: 'address',
//     key: '6',
//     width: 150,
//   },
//   {
//     title: 'Column 7',
//     dataIndex: 'address',
//     key: '7',
//     width: 150,
//   },
//   { title: 'Column 8', dataIndex: 'address', key: '8' },
//   {
//     title: 'Action',
//     key: 'operation',
//     width: 100,
//     render: () => <a>action</a>,
//   },
// ];

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
                columns={wifiColumns}
                data={wifiData}
                leftIcon="/images/cs-wifiIcon.svg"
                leftIconHeight={0}
                leftIconWidth={32}
                refreshLink="/api/refresh"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <TableComponent
                columns={friendMessageColumns}
                data={friendMessageData}
                leftIcon="/images/cs-friendMessagesIcon.svg"
                leftIconHeight={29}
                leftIconWidth={24}
                refreshLink="/api/refresh"
              />
            </Col>
          </Row>
          <Row gutter={[24, 32]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <TableComponent
                columns={friendsColumns}
                data={friendData}
                leftIcon="/images/cs-friendsHeart.svg"
                leftIconHeight={27}
                leftIconWidth={31}
                refreshLink="/api/refresh"
              />
            </Col>
          </Row>
            </div>
          </>
          )
}