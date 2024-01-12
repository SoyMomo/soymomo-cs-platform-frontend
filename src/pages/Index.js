
import MainLayout from "../layouts/layout";
import { ListItem, ListTitle } from "../components/ListItem";
import { useNavigate } from   "react-router-dom";
import { Input, message, Button } from 'antd'
import React, { useState, useEffect } from "react";
import { useAuth, checkAuth } from "../authContext";
import axios from 'axios';
import useQuery from "../utils/hooks/UseQuery";


const { Search } = Input;


export default function Index() {
  const { tokens } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const navigate = useNavigate();
  const query = useQuery();
  const [inputValue, setInputValue] = useState('');
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (!tokens || !checkAuth(tokens)) {
      navigate('/login');
    }
  }, [tokens, navigate]);

  useEffect(() => {
    const searchTxt = query.get('searchTxt');
    if (searchTxt) {
      onSearch(searchTxt)
    }
  }, [query])


  useEffect(() => {
    // When the component mounts, load the table state from sessionStorage
    const savedTableState = sessionStorage.getItem('watchTableState');
    if (savedTableState) {
      setListItems(JSON.parse(savedTableState));
    }
  }, []);
  
  useEffect(() => {
    // When the tableData state changes, save it to sessionStorage
    if (listItems.length > 0) {
      sessionStorage.setItem('watchTableState', JSON.stringify(listItems));
    }
  }, [listItems]);

  const handleRowClick = (deviceId, imei) => {
		const routeParam = deviceId ? `?deviceId=${deviceId}` : `?imei=${imei}`;
    navigate(`/wearer${routeParam}`, {state: { imei }});
	}

  const cleanTable = () => {
    setListItems([]);
    sessionStorage.removeItem('watchTableState');
  };

  async function onSearch(value) {

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    
    let params = {
      queryStr: value
    };

    try {
      const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getWearerByString', { 
        params: params, 
        headers: { 
          Authorization: `Bearer ${tokens.AccessToken}` 
        } 
      });
      if (!response || !response.data || response.data.length === 0) {
        messageApi.open({
          key,
          type: 'error',
          content: 'Not found!',
          duration: 2,
        });
      } else {
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded!',
          duration: 2,
        });

        setListItems(response.data.data)
        
      }
    } catch(error) {
      messageApi.open({
        key,
        type: 'error',
        content: 'Not found!',
        duration: 2,
      });
    }
  }

  return (
    <MainLayout>
      <>
        {contextHolder}
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <Search
              placeholder="Buscar reloj por imei o deviceId"
              onSearch={onSearch}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ width: 500, padding: 5 }}
            />
            {listItems.length > 0 && (
              <Button
                type="danger"
                onClick={cleanTable}
                style={{ marginLeft: '15px', backgroundColor: '#F93C7C', color: 'white' }}
              >
                Limpiar Tabla
              </Button>
            )}
          </div>
          {listItems.length !== 0 ? 
            <div>
              <ListTitle/>
              <div className="list">
                {listItems.map((item, index) => 
                  <ListItem
                  key={index}
                  objectId={item.objectId}
                  deviceId={item.deviceId}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  imei={item.imei}
                  phone={item.phone}
                  handleClick={() => handleRowClick(item.deviceId, item.imei)}
                  />
                )}
              </div>
            </div> :
            false
          }
          
        </div>
      </>
    </MainLayout>
    )
}