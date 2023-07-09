'use client'
import React, { PropsWithChildren, useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Image from 'next/image';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
  style: { color: 'white' },
}));

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
    
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onBreakpoint={(broken) => {
  
        }}
        onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
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
            <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
                <Image src="/images/cs-soyMomoLogo.svg" alt="logo" width={100} height={100} />
            </div>
            <Menu mode="inline" defaultSelectedKeys={['1']} items={items} style={{background: '#603BB0', width: 'auto'}} />
        </div>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 0 : 200 }}>
        <Content style={{ width: 'auto', height: '100vh', background: '#603BB0' }}>
          <div style={{ background: '#FFF', borderRadius: '30px', height: '96vh', margin: '2vh', padding: 14 }}>
                <div style={{ height: '100%', overflow: 'auto', scrollbarColor: 'dark' }}>
                {children}
                </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};