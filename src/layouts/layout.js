import React, { useState } from 'react';
import {
  ClockCircleOutlined,
  TabletOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from   "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// const items = [
//   ClockCircleOutlined,
//   TabletOutlined,
// ].map((icon, index) => (
//   {
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav`,
//   style: { color: 'white' },
// }));

export default function MainLayout(props) {

  const url = window.location.href;
  const includesTablet = url.includes('tablet');
  const items = []
  if (url.includes('tablet')) {
    items.push(
      {
        key: '1',
        icon: React.createElement(ClockCircleOutlined),
        label: 'Reloj',
        style: { color: 'white' },
      },
      {
        key: '2',
        icon: React.createElement(TabletOutlined),
        label: 'Tablet',
        style: { color: '#603BB0', backgroundColor: 'white' },
      })
  } else {
    items.push(
      {
        key: '1',
        icon: React.createElement(ClockCircleOutlined),
        label: 'Reloj',
        style: { color: '#603BB0', backgroundColor: 'white' },
      },
      {
        key: '2',
        icon: React.createElement(TabletOutlined),
        label: 'Tablet',
        style: { color: 'white' },
      })
  }
    
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onClick = (e) => {
    if (e.key === '1') {
        navigate('/');
    } else if (e.key === '2') {
        navigate('/tablet');
    }
  };
  

  const handleLogoClick = () => {
    navigate('/');
  }

  return (
    <Layout hasSider>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onBreakpoint={(broken) => {
        }}
        onCollapse={(collapsed, type) => {
            setCollapsed(collapsed);
        }}
        style={{ 
            background: '#603BB0',           
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0
        }}
      >
        <div style={{marginTop: '2vh', marginBottom: '2vh', marginRight: 'auto'}}>
            <div style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem'}}>
                <img src="/images/cs-soyMomoLogo.svg" alt="logo" width={100} height={100} onClick={handleLogoClick} style={{cursor: 'pointer'}} />
            </div>
            <Menu onClick={onClick} mode="inline" items={items} style={{background: '#603BB0', width: 'auto'}} />
        </div>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 0 : 200 }}>
        <Content style={{ width: 'auto', height: '100vh', background: '#603BB0' }}>
          <div style={{ background: '#FFF', borderRadius: '30px', height: '96vh', margin: '2vh', padding: 14 }}>
                <div style={{ height: '100%', overflow: 'auto', scrollbarColor: 'dark' }}>
                {props.children}
                </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};