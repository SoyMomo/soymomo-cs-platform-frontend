
import MainLayout from "../layouts/layout";
import { useNavigate } from   "react-router-dom";
import { Input, message, Button } from 'antd'
import React, { useState, useEffect } from "react";
import { useAuth, checkAuth } from "../authContext";
import axios from 'axios';
import useQuery from "../utils/hooks/UseQuery";
import { SimListItem, SimListTitle } from "../components/SimListItem";


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
    const savedTableState = sessionStorage.getItem('simTableState');
    if (savedTableState) {
      setListItems(JSON.parse(savedTableState));
    }
  }, []);
  
  useEffect(() => {
    // When the tableData state changes, save it to sessionStorage
    if (listItems.length > 0) {
      sessionStorage.setItem('simTableState', JSON.stringify(listItems));
    }
  }, [listItems]);

  const handleRowClick = (iccId, imei) => {
		const routeParam = iccId ? `?iccId=${iccId}` : `?imei=${imei}`;
        navigate(`/sim/dashboard${routeParam}`, {state: { iccId, imei }});
	}

  const cleanTable = () => {
    setListItems([]);
    sessionStorage.removeItem('simTableState');
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
      const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/sim/searchSims', { 
        params: params, 
        headers: { 
          Authorization: `Bearer ${tokens.AccessToken}` 
        } 
      });
      if (!response || !response.data || (response.data.data.simResults.length === 0 && response.data.data.subResults.length === 0)) {
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


        const { simResults, subResults } = response.data.data;

        // Verificar los datos y formatearlos para que calcen con la info desplegada
        const results = subResults.concat(simResults)

        setListItems(results)
        
      }
    } catch(error) {
      console.log(error)
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
              placeholder="Buscar SIM"
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
              <SimListTitle/>
              <div className="list">
                {listItems.map((item, index) => 
                  {if (item.subscriber) {
                    return(<SimListItem
                      key={index}
                      iccId={item.iccId}
                      name={item.subscriber.name}
                      lastname={item.subscriber.lastname}
                      phone={item.subscriber.phone}
                      personalId={item.subscriber.personalId}
                      objectId={item.objectId}
                      handleClick={() => handleRowClick(item.iccId, item.imei)}
                    />)
                  } else {
                    
                    return (<SimListItem
                      key={index}
                      iccId={item.iccId}
                      // name={item.subscriber.name}
                      // lastname={item.subscriber.lastname}
                      // phone={item.subscriber.phone}
                      // personalId={item.subscriber.personalId}
                      objectId={item.objectId}
                      handleClick={() => handleRowClick(item.iccId, item.imei)}
                    />)
                  }}
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