'use client'

import Link from 'next/link'
import { Button, Row, Space, Typography, Table, Col } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';


const { Title } = Typography

const DemoBox: React.FC<{ children: React.ReactNode; value: number }> = (props) => (
  <p style={{border: 'black', backgroundColor: 'black', height: props.value}}>{props.children}</p>
);

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  const chartData = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 15000},
    {quarter: 5, earnings: 15500},
    {quarter: 6, earnings: 16000},
    {quarter: 7, earnings: 13500},
    {quarter: 8, earnings: 12000},
    {quarter: 9, earnings: 17000},
    {quarter: 10, earnings: 19000}
  ];

//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function AppDir() {
  return (
    <>
        <div style={{padding: 20}}>
        <Row gutter={[24, 32]}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>

            {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
            <Space direction="vertical" size={24} style={{ display: 'flex' }}>

              {/* Nombre, numero, imei: card principal */}
              <DemoBox value={240}>
                    <Title level={3}>Dashboard</Title>
              </DemoBox>
              {/* Nombre, numero, imei: card principal */}

              {/* Datos principales y Ultima conexion con SoyMomoSIM */}
              <Row gutter={24}>

                {/* Datos principales */}
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <DemoBox value={424}>
                    <Title level={3}>Dashboard</Title>
                  </DemoBox>
                </Col>
                {/* Datos principales */}

                {/* Ultima conexion con SoyMomoSIM */}
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                    {/* Ultima conexion */}
                    <DemoBox value={200}>
                      <Title level={3}>Dashboard</Title>
                    </DemoBox>
                    {/* Ultima conexion */}

                    {/* SoyMomoSIM */}
                    <DemoBox value={200}>
                      <Title level={3}>Dashboard</Title>
                    </DemoBox>
                    {/* SoyMomoSIM */}

                  </Space>
                </Col>
                {/* Ultima conexion con SoyMomoSIM */}

              </Row>
              {/* Datos principales y Ultima conexion con SoyMomoSIM */}

              {/* Historial de bateria */}

              <DemoBox value={256}>
                    <Title level={3}>Dashboard</Title>
              </DemoBox>

              {/* Historial de bateria */}

            </Space>

          </Col>

          <Col xs={24} sm={12} md={12} lg={8} xl={8}>

          {/* Dimensiones 120 + 24 + 400 + 24 + 400 = 968 */}
          <Space direction="vertical" size={24} style={{ display: 'flex' }}>

            {/* Ultima actualizacion */}
            <DemoBox value={120}>
                <Title level={3}>Dashboard</Title>
            </DemoBox>
            {/* Ultima actualizacion */}

            {/* Comandos */}
            <DemoBox value={400}>
                  <Title level={3}>Dashboard</Title>
            </DemoBox>
            {/* Comandos */}


            {/* Ajustes reloj */}
            <DemoBox value={400}>
                  <Title level={3}>Dashboard</Title>
            </DemoBox>
            {/* Ajustes reloj */}
            
          </Space>

          </Col>
        </Row>

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
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
            </Row> 
            <Row gutter={[24, 32]}> 
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
            </Row> 
            <Row gutter={[24, 32]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
            </Row> 
            <Row gutter={[24, 32]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
            </Row>
            <Row gutter={[24, 32]}>
                <Col>
                    <Table columns={columns} dataSource={data} scroll={{ x: 'max-content', y: 300 }} /> 
                </Col>
            </Row> 
        </div>
    </>
  )
}