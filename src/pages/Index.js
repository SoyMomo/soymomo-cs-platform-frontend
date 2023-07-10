
import MainLayout from "../layouts/layout";
import { useNavigate } from   "react-router-dom";
import { Input, message } from 'antd'
import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import AuthContext from "../authContext";

const { Search } = Input;


export default function Index() {
  const { tokens } = useContext(AuthContext);

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!tokens) {
      navigate('/login');
    }
  }, [tokens, navigate]);

  async function onSearch(value) {

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    
    let params = {};

    if (value.length === 10) {
      params = { deviceId: value };
    } else if (value.length === 15) {
      params = { imei: value };
    } else {
      messageApi.open({
        key,
        type: 'error',
        content: 'Invalid input, enter imei or deviceId!',
        duration: 2,
      });
      return;
    }

    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getWearerByDeviceIdOrImei', { params });
      if (!response || !response.data || response.data.length === 0) {
        messageApi.open({
          key,
          type: 'error',
          content: 'Not found!',
          duration: 2,
        });
        setInputValue('');
      } else {
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded!',
          duration: 2,
        });
        const routeParam = params.deviceId ? `?deviceId=${params.deviceId}` : `?imei=${params.imei}`;
        navigate(`/wearer${routeParam}`);
        
      }
    } catch(error) {
      messageApi.open({
        key,
        type: 'error',
        content: 'Not found!',
        duration: 2,
      });
      setInputValue('');
    }
  }

  return (
    <MainLayout
        children={
            <>
            {contextHolder}
            <div style={{ padding: 20 }}>
              <Search placeholder="Buscar reloj por imei o deviceId" onSearch={onSearch} value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ width: 500, padding: 5 }} />
            </div>
          </>
        }
    />
    )
}