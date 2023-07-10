import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Space, Col, Input } from 'antd'
import { wifiColumns, friendMessageColumns, friendsColumns, userColumns, contactColumns } from '../components/tables/wearerColumns';
//import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import TableComponent from '../components/tables/table'
import useQuery from '../utils/hooks/UseQuery';
import ComandsComponent from '../components/Comands';
import WearerInfo from '../components/WearerInfo';
import WearerSettings from '../components/WearerSettings';
import WearerMainCard from '../components/WearerMainCard';
import AppVersionsCard from '../components/AppVersionsCard';
import WearerLastConnectionCard from '../components/WearerLastConnectionCard';
import WearerBatteryHistory from '../components/WearerBatteryHistory';

const DemoBox = (props) => (
  <p style={{ borderColor: 'red', borderWidth: 5, backgroundColor: 'black', height: props.value }}>{props.children}</p>
);

const { Search } = Input;
const responseBattery = {
  "data": [
    {
      "deviceId": "9505051259",
      "battery": 2,
      "createdAt": "2023-07-09T00:20:53.832Z",
      "updatedAt": "2023-07-09T00:20:53.832Z",
      "objectId": "KB1jRHVJ0z"
    },
    {
      "deviceId": "9505051259",
      "battery": 2,
      "createdAt": "2023-07-09T00:15:52.966Z",
      "updatedAt": "2023-07-09T00:15:52.966Z",
      "objectId": "SS1r46PtjF"
    },
    {
      "deviceId": "9505051259",
      "battery": 5,
      "createdAt": "2023-07-09T00:10:52.866Z",
      "updatedAt": "2023-07-09T00:10:52.866Z",
      "objectId": "8dFl4uWz6e"
    },
    {
      "deviceId": "9505051259",
      "battery": 5,
      "createdAt": "2023-07-09T00:05:51.986Z",
      "updatedAt": "2023-07-09T00:05:51.986Z",
      "objectId": "gL0VqbFxer"
    },
    {
      "deviceId": "9505051259",
      "battery": 6,
      "createdAt": "2023-07-09T00:00:51.928Z",
      "updatedAt": "2023-07-09T00:00:51.928Z",
      "objectId": "g5xeXAzCpu"
    },
    {
      "deviceId": "9505051259",
      "battery": 6,
      "createdAt": "2023-07-08T23:55:50.850Z",
      "updatedAt": "2023-07-08T23:55:50.850Z",
      "objectId": "R79vTdUMXi"
    },
    {
      "deviceId": "9505051259",
      "battery": 6,
      "createdAt": "2023-07-08T23:50:49.989Z",
      "updatedAt": "2023-07-08T23:50:49.989Z",
      "objectId": "W92toXiCVr"
    },
    {
      "deviceId": "9505051259",
      "battery": 7,
      "createdAt": "2023-07-08T23:45:50.785Z",
      "updatedAt": "2023-07-08T23:45:50.785Z",
      "objectId": "2BDeXIpCKz"
    },
    {
      "deviceId": "9505051259",
      "battery": 7,
      "createdAt": "2023-07-08T23:40:50.034Z",
      "updatedAt": "2023-07-08T23:40:50.034Z",
      "objectId": "jjtrBISEfQ"
    },
    {
      "deviceId": "9505051259",
      "battery": 7,
      "createdAt": "2023-07-08T23:35:51.316Z",
      "updatedAt": "2023-07-08T23:35:51.316Z",
      "objectId": "ZK6mCtgKBL"
    },
    {
      "deviceId": "9505051259",
      "battery": 8,
      "createdAt": "2023-07-08T23:33:17.849Z",
      "updatedAt": "2023-07-08T23:33:17.849Z",
      "objectId": "SXBmwNH0ii"
    },
    {
      "deviceId": "9505051259",
      "battery": 8,
      "createdAt": "2023-07-08T23:28:17.964Z",
      "updatedAt": "2023-07-08T23:28:17.964Z",
      "objectId": "XxQLVmNMFU"
    },
    {
      "deviceId": "9505051259",
      "battery": 8,
      "createdAt": "2023-07-08T23:23:17.417Z",
      "updatedAt": "2023-07-08T23:23:17.417Z",
      "objectId": "4uFXEVlyno"
    },
    {
      "deviceId": "9505051259",
      "battery": 9,
      "createdAt": "2023-07-08T23:18:16.879Z",
      "updatedAt": "2023-07-08T23:18:16.879Z",
      "objectId": "QSxPHJA6Cq"
    },
    {
      "deviceId": "9505051259",
      "battery": 9,
      "createdAt": "2023-07-08T23:13:17.474Z",
      "updatedAt": "2023-07-08T23:13:17.474Z",
      "objectId": "xXbegjj71O"
    },
    {
      "deviceId": "9505051259",
      "battery": 9,
      "createdAt": "2023-07-08T23:08:16.848Z",
      "updatedAt": "2023-07-08T23:08:16.848Z",
      "objectId": "2BUKRhkNyZ"
    },
    {
      "deviceId": "9505051259",
      "battery": 9,
      "createdAt": "2023-07-08T23:03:17.004Z",
      "updatedAt": "2023-07-08T23:03:17.004Z",
      "objectId": "YGEC1m76Dn"
    },
    {
      "deviceId": "9505051259",
      "battery": 10,
      "createdAt": "2023-07-08T22:58:15.884Z",
      "updatedAt": "2023-07-08T22:58:15.884Z",
      "objectId": "rBF7P5LjB4"
    },
    {
      "deviceId": "9505051259",
      "battery": 10,
      "createdAt": "2023-07-08T22:53:16.007Z",
      "updatedAt": "2023-07-08T22:53:16.007Z",
      "objectId": "PkHy2Jm3rU"
    },
    {
      "deviceId": "9505051259",
      "battery": 10,
      "createdAt": "2023-07-08T22:48:16.399Z",
      "updatedAt": "2023-07-08T22:48:16.399Z",
      "objectId": "4TDXXLEx62"
    },
    {
      "deviceId": "9505051259",
      "battery": 11,
      "createdAt": "2023-07-08T22:43:16.012Z",
      "updatedAt": "2023-07-08T22:43:16.012Z",
      "objectId": "qGrXNjJI6P"
    },
    {
      "deviceId": "9505051259",
      "battery": 11,
      "createdAt": "2023-07-08T22:38:15.602Z",
      "updatedAt": "2023-07-08T22:38:15.602Z",
      "objectId": "Khu8dYutmU"
    },
    {
      "deviceId": "9505051259",
      "battery": 11,
      "createdAt": "2023-07-08T22:37:00.970Z",
      "updatedAt": "2023-07-08T22:37:00.970Z",
      "objectId": "GAZOCfphzK"
    },
    {
      "deviceId": "9505051259",
      "battery": 12,
      "createdAt": "2023-07-08T22:32:00.905Z",
      "updatedAt": "2023-07-08T22:32:00.905Z",
      "objectId": "wzflCFAIDc"
    },
    {
      "deviceId": "9505051259",
      "battery": 12,
      "createdAt": "2023-07-08T22:27:01.025Z",
      "updatedAt": "2023-07-08T22:27:01.025Z",
      "objectId": "GydNbkOKtS"
    },
    {
      "deviceId": "9505051259",
      "battery": 12,
      "createdAt": "2023-07-08T22:22:00.928Z",
      "updatedAt": "2023-07-08T22:22:00.928Z",
      "objectId": "Pd8eoww3Cg"
    },
    {
      "deviceId": "9505051259",
      "battery": 12,
      "createdAt": "2023-07-08T22:17:00.963Z",
      "updatedAt": "2023-07-08T22:17:00.963Z",
      "objectId": "TYblA2GPMM"
    },
    {
      "deviceId": "9505051259",
      "battery": 13,
      "createdAt": "2023-07-08T22:12:00.968Z",
      "updatedAt": "2023-07-08T22:12:00.968Z",
      "objectId": "jRvQhbVWuw"
    },
    {
      "deviceId": "9505051259",
      "battery": 13,
      "createdAt": "2023-07-08T22:07:01.038Z",
      "updatedAt": "2023-07-08T22:07:01.038Z",
      "objectId": "GKWHsKgiPE"
    },
    {
      "deviceId": "9505051259",
      "battery": 13,
      "createdAt": "2023-07-08T22:02:01.009Z",
      "updatedAt": "2023-07-08T22:02:01.009Z",
      "objectId": "ycIAqwNIwC"
    },
    {
      "deviceId": "9505051259",
      "battery": 14,
      "createdAt": "2023-07-08T21:57:00.938Z",
      "updatedAt": "2023-07-08T21:57:00.938Z",
      "objectId": "4cgPTAHOeo"
    },
    {
      "deviceId": "9505051259",
      "battery": 14,
      "createdAt": "2023-07-08T21:52:00.926Z",
      "updatedAt": "2023-07-08T21:52:00.926Z",
      "objectId": "Ge3i0KDGPS"
    },
    {
      "deviceId": "9505051259",
      "battery": 15,
      "createdAt": "2023-07-08T21:47:01.054Z",
      "updatedAt": "2023-07-08T21:47:01.054Z",
      "objectId": "DvQJIcZCmY"
    },
    {
      "deviceId": "9505051259",
      "battery": 15,
      "createdAt": "2023-07-08T21:42:00.879Z",
      "updatedAt": "2023-07-08T21:42:00.879Z",
      "objectId": "e84WvBXpdG"
    },
    {
      "deviceId": "9505051259",
      "battery": 15,
      "createdAt": "2023-07-08T21:39:01.603Z",
      "updatedAt": "2023-07-08T21:39:01.603Z",
      "objectId": "lKgAkwuGiV"
    },
    {
      "deviceId": "9505051259",
      "battery": 15,
      "createdAt": "2023-07-08T21:34:01.350Z",
      "updatedAt": "2023-07-08T21:34:01.350Z",
      "objectId": "VXMt5HRhKA"
    },
    {
      "deviceId": "9505051259",
      "battery": 16,
      "createdAt": "2023-07-08T21:29:01.601Z",
      "updatedAt": "2023-07-08T21:29:01.601Z",
      "objectId": "to6HJAjG59"
    },
    {
      "deviceId": "9505051259",
      "battery": 16,
      "createdAt": "2023-07-08T21:24:01.056Z",
      "updatedAt": "2023-07-08T21:24:01.056Z",
      "objectId": "GXLEMeuPSW"
    },
    {
      "deviceId": "9505051259",
      "battery": 16,
      "createdAt": "2023-07-08T21:19:01.106Z",
      "updatedAt": "2023-07-08T21:19:01.106Z",
      "objectId": "i485R7ZEHd"
    },
    {
      "deviceId": "9505051259",
      "battery": 16,
      "createdAt": "2023-07-08T21:14:01.052Z",
      "updatedAt": "2023-07-08T21:14:01.052Z",
      "objectId": "o1TCcx2Y0S"
    },
    {
      "deviceId": "9505051259",
      "battery": 17,
      "createdAt": "2023-07-08T21:09:01.005Z",
      "updatedAt": "2023-07-08T21:09:01.005Z",
      "objectId": "GmFeiVv237"
    },
    {
      "deviceId": "9505051259",
      "battery": 17,
      "createdAt": "2023-07-08T21:04:01.087Z",
      "updatedAt": "2023-07-08T21:04:01.087Z",
      "objectId": "92KuR6F9WA"
    },
    {
      "deviceId": "9505051259",
      "battery": 18,
      "createdAt": "2023-07-08T20:59:01.037Z",
      "updatedAt": "2023-07-08T20:59:01.037Z",
      "objectId": "3uVAyN84jX"
    },
    {
      "deviceId": "9505051259",
      "battery": 18,
      "createdAt": "2023-07-08T20:54:01.023Z",
      "updatedAt": "2023-07-08T20:54:01.023Z",
      "objectId": "ka7tfOjmaL"
    },
    {
      "deviceId": "9505051259",
      "battery": 18,
      "createdAt": "2023-07-08T20:49:01.091Z",
      "updatedAt": "2023-07-08T20:49:01.091Z",
      "objectId": "TlHTVaXrgc"
    },
    {
      "deviceId": "9505051259",
      "battery": 19,
      "createdAt": "2023-07-08T20:44:01.085Z",
      "updatedAt": "2023-07-08T20:44:01.085Z",
      "objectId": "baD5LvEzqY"
    },
    {
      "deviceId": "9505051259",
      "battery": 19,
      "createdAt": "2023-07-08T20:41:00.540Z",
      "updatedAt": "2023-07-08T20:41:00.540Z",
      "objectId": "fnR7shcwVf"
    },
    {
      "deviceId": "9505051259",
      "battery": 19,
      "createdAt": "2023-07-08T20:36:00.563Z",
      "updatedAt": "2023-07-08T20:36:00.563Z",
      "objectId": "guL97eWW7s"
    },
    {
      "deviceId": "9505051259",
      "battery": 19,
      "createdAt": "2023-07-08T20:30:59.956Z",
      "updatedAt": "2023-07-08T20:30:59.956Z",
      "objectId": "cQFBpIgyhz"
    },
    {
      "deviceId": "9505051259",
      "battery": 20,
      "createdAt": "2023-07-08T20:26:00.478Z",
      "updatedAt": "2023-07-08T20:26:00.478Z",
      "objectId": "u7qitIEMrz"
    },
    {
      "deviceId": "9505051259",
      "battery": 20,
      "createdAt": "2023-07-08T20:21:00.580Z",
      "updatedAt": "2023-07-08T20:21:00.580Z",
      "objectId": "LtCQUqPTms"
    },
    {
      "deviceId": "9505051259",
      "battery": 20,
      "createdAt": "2023-07-08T20:16:00.111Z",
      "updatedAt": "2023-07-08T20:16:00.111Z",
      "objectId": "QjqyCdknKt"
    },
    {
      "deviceId": "9505051259",
      "battery": 21,
      "createdAt": "2023-07-08T20:10:59.904Z",
      "updatedAt": "2023-07-08T20:10:59.904Z",
      "objectId": "BAxHjYzCie"
    },
    {
      "deviceId": "9505051259",
      "battery": 21,
      "createdAt": "2023-07-08T20:05:59.126Z",
      "updatedAt": "2023-07-08T20:05:59.126Z",
      "objectId": "pqW0c2Xw8R"
    },
    {
      "deviceId": "9505051259",
      "battery": 21,
      "createdAt": "2023-07-08T20:00:58.734Z",
      "updatedAt": "2023-07-08T20:00:58.734Z",
      "objectId": "QzpSMtnxdJ"
    },
    {
      "deviceId": "9505051259",
      "battery": 22,
      "createdAt": "2023-07-08T19:55:57.910Z",
      "updatedAt": "2023-07-08T19:55:57.910Z",
      "objectId": "XA8c28zNCX"
    },
    {
      "deviceId": "9505051259",
      "battery": 22,
      "createdAt": "2023-07-08T19:50:57.042Z",
      "updatedAt": "2023-07-08T19:50:57.042Z",
      "objectId": "UmbQAT7nZG"
    },
    {
      "deviceId": "9505051259",
      "battery": 23,
      "createdAt": "2023-07-08T19:45:57.121Z",
      "updatedAt": "2023-07-08T19:45:57.121Z",
      "objectId": "PMn7qLF2Oy"
    },
  ]
}

//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function WearerDashboard() {

  //const [wifiData, setWifiData] = useState([]);
  const [friendMessageData, setFriendMessageData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [userMessageData, setUserMessageData] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [batteryHistory, setBatteryHistory] = useState([]);
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
      if (!response.data || response.data.data.length === 0) {
        navigate('/not-found');
        return;
      }
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

  }, [query, navigate])

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
    const getChatWearer = async (params) => {
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

  useEffect(() => {
    const deviceId = query.get('deviceId');
    const imei = query.get('imei');
    let params = {};
    if (deviceId) {
      params = { deviceId };
    } else if (imei) {
      params = { imei };
    }
    const getBatteryHistory = async (params) => {
      // const response = await axios.get('http://localhost/wearer/getBatteryHistory', { params }); 
      setBatteryHistory(responseBattery.data)
    }
    getBatteryHistory(params).catch(console.error);
  }, [query, wearer])



  async function onSearch(value) {
    console.log(value);
  }


  return (
    <MainLayout
      children={
        <>
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 20 }}>
              <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
            </div>
            <Space direction="vertical" size={24} style={{ display: 'flex' }}>
              <Row gutter={[24, 32]}>
                <Col xs={24} sm={24} md={24} lg={16} xl={16}>

                  {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
                  <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                    {/* Nombre, numero, imei: card principal */}
                    <WearerMainCard wearer={wearer} />
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
                          wearer={wearer} />
                      </Col>
                      {/* Datos principales */}

                      {/* Ultima conexion con SoyMomoSIM */}
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                          {/* Ultima conexion */}
                          <WearerLastConnectionCard title="Última conexión" lastTKQ={wearer.lastTKQ} />
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
                    <WearerBatteryHistory
                      data={batteryHistory}
                    />
                    {/* Historial de bateria */}

                  </Space>

                </Col>

                <Col xs={24} sm={12} md={12} lg={8} xl={8}>

                  {/* Dimensiones 120 + 24 + 400 + 24 + 400 = 968 */}
                  <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                    {/* Ultima actualizacion */}
                    <AppVersionsCard versionAndroid="5.2.6" versionApple="5.2.6" />
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
                    <WearerSettings
                      title="Ajustes reloj"
                      subtitle="Configuración"
                      leftIcon="/images/cs-wearerSettings.svg"
                      leftIconWidth={24}
                      leftIconHeight={29}
                      refreshLink="/api/refresh"
                      watchSettings={watchSettings} />
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