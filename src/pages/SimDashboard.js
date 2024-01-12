import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Space, Col, Input, message, Button } from 'antd'
import { useAuth, checkAuth } from "../authContext";
import useQuery from '../utils/hooks/UseQuery';
import AppVersionsCard from '../components/AppVersionsCard';
import { getSimInfo, getWearer } from '../services/wearerService';
import SimMainCard from '../components/SimMainCard';
import SimPlanCard from '../components/SimPlanCard';
import SimSubscriberCard from '../components/SimSubscriberCard';
import SimWearerCard from '../components/SIMWearerCard';

const { Search } = Input;

export default function SimDashboard() {
  const key = 'updatable';
  const { tokens } = useAuth();
  const navigate = useNavigate();
  let query = useQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const [inputValue, setInputValue] = useState('');
  const [simData, setSimData] = useState({});
  const [wearer, setWearer] = useState({});
  const [globalImei, setGlobalImei] = useState('')
  const [globalDeviceId, setGlobalDeviceId] = useState('')

  let imei;
  let iccId;

//   const { state } = useLocation()
//   const { imei } = state

  useEffect(() => {
    if (!tokens || !checkAuth(tokens)) {
      navigate('/login');
    }
  }, [tokens, navigate]);

  useEffect(() => {
    iccId = query.get('iccId');
    imei = query.get('imei');
    if (!iccId && !imei) {
      navigate('/not-found');
      return;
    }

    let imeiValue;

    getSimInfo(imei, iccId, tokens.AccessToken).then((response) => {
      if (!response.data || response.data.length === 0) {
        setSimData({})
      } else {
        const body = response.data.data.results[0];
        const { type } = response.data.data;
        let simCard;
        if (type === 'Sub') {
          imeiValue = body.imei;
          simCard = {
            iccId: body.sim.iccId,
            imei: body.imei,
            plan: body.plan,
            remainingTrialDays: response.data.data.remainingTrialDays,
            providerName: body.sim.mnoProvider.name,
            phone: body.msisdn,
            state: body.status,
            networkProvider: body.sim.networkOperator.name,
            paymentProvider: body.paymentProvider.name,
            subscriber: body.subscriber,
          };
        } else if (type === 'Sim') {
          simCard = {
            iccId: body.iccId,
            remainingTrialDays: response.data.data.remainingTrialDays,
            providerName: body.mnoProvider.name,
            networkProvider: body.networkOperator.name,
          };
        }
        setSimData(simCard)
      }

      // Fetch reloj asociado
      if (imeiValue) {
        let payload;
        if (imeiValue.length === 10) {
          payload = { deviceId: imeiValue }
          setGlobalDeviceId(imeiValue)
        } else {
          payload = { imei: imeiValue }
          setGlobalImei(imeiValue)
        }
        getWearer(payload, tokens.AccessToken).then((response) => {
          if (!response.data || response.data.data.length === 0) {
            navigate('/not-found');
            return;
          }
          setWearer(response.data.data[0]);
        }).catch(console.error);
      }
    }).catch(console.error)

  }, [query, navigate, tokens])


  const handleSIMRefresh = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    let imeiValue;
    let iccIdValue;

    if (iccId) {
      iccIdValue = iccId;
    } else if (imei) {
      imeiValue = imei;
    } else return;

    getSimInfo(imeiValue, iccIdValue, tokens.AccessToken).then((response) => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Loaded!',
        duration: 2,
      });

      if (!response.data || response.data.length === 0) {
        setSimData({})
      } else {
        const body = response.data.data.results[0];
        imeiValue = body.imei;
        const simCard = {
          iccId: body.sim.iccId,
          imei: body.imei,
          plan: body.plan,
          remainingTrialDays: response.data.data.remainingTrialDays,
          providerName: body.sim.mnoProvider.name,
          phone: body.msisdn,
          state: body.status,
          networkProvider: body.sim.networkOperator.name,
          paymentProvider: body.paymentProvider.name,
          subscriber: body.subscriber,
        };
        setSimData(simCard)
      }

      // Fetch reloj asociado
      if (imeiValue) {
        getWearer({ imei: imeiValue }, tokens.AccessToken).then((response) => {
          if (!response.data || response.data.data.length === 0) {
            navigate('/not-found');
            return;
          }
          setWearer(response.data.data[0]);
        }).catch(console.error);
      }
    }).catch(() => {
      messageApi.open({
        key,
        type: 'error',
        content: 'Error fetching data!',
        duration: 2,
      });
    });
  }



  async function onSearch(value) {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    navigate(`/sim?searchTxt=${value}`);
  }

  async function navWearerDashboard() {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });

    const routeParam = globalDeviceId ? `?deviceId=${globalDeviceId}` : `?imei=${globalImei}`;
    navigate(`/wearer${routeParam}`, {state: { imei: globalImei, deviceId: globalDeviceId }});

    // navigate(`/wearer?imei=${globalImei}`, {state: { imei: globalImei }});
  }

  return (
    <MainLayout>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 20 }}>
          { contextHolder }
          <Search placeholder="Buscar SIM" onSearch={onSearch} value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ width: 500, padding: 5 }} />
          <Button onClick={() => navigate(-1)} style={{ marginLeft: '15px', marginTop: '5px' }}>Go Back</Button>
        </div>
        <Space direction="vertical" size={24} style={{ display: 'flex' }}>
          <Row gutter={[24, 32]}>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>

              {/* Dimensiones 240 + 24 + 424 + 24 + 256 = 968 */}
              <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                {/* Nombre, numero, imei: card principal */}
                <SimMainCard
                  simCard={simData}
                  handleRefresh={handleSIMRefresh}
                />
                {/* <WearerMainCard wearer={wearer} /> */}
                {/* Nombre, numero, imei: card principal */}

                {/* Datos principales y Ultima conexion con SoyMomoSIM */}
                <Row gutter={[24, 32]}>

                  {/* Datos principales */}
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <SimPlanCard
                        simCard={simData}
                        handleRefresh={handleSIMRefresh}
                    />
                  </Col>
                  {/* Datos principales */}

                  {/* Ultima conexion con SoyMomoSIM */}
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Space direction="vertical" size={24} style={{ display: 'flex' }}>

                      {/* Ultima conexion */}
                      {/* Ultima conexion */}

                      {/* SoyMomoSIM */}
                        <SimSubscriberCard
                            simCard={simData}
                            handleRefresh={handleSIMRefresh}
                        />

                        <SimWearerCard
                            wearer={wearer}
                            handleRefresh={handleSIMRefresh}
                            navWearerDashboard={() => navWearerDashboard(imei)}
                        />

                      {/* SoyMomoSIM */}

                    </Space>
                  </Col>
                  {/* Ultima conexion con SoyMomoSIM */}

                </Row>
                {/* Datos principales y Ultima conexion con SoyMomoSIM */}

                {/* Historial de bateria */}
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
                {/* Comandos */}


                {/* Ajustes reloj */}
                {/* Ajustes reloj */}

              </Space>

            </Col>
          </Row>

          {/* <Space direction="vertical" size={12} style={{ display: 'flex' }}>
            <Row gutter={[24, 32]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <TableComponent
                  columns={friendMessageColumns}
                  data={friendMessageData}
                  leftIcon="/images/tableIcons/cs-friendMessagesIcon.svg"
                  leftIconHeight={29}
                  leftIconWidth={24}
                  handleRefresh={handleChatWearerRefresh}
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
                  handleRefresh={handleChatUserRefresh}
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
                handleRefresh={handleFriendsRefresh}
                title='Amigos'
                subtitle='Aprobación'
              />
            </Row>
            <Row>
              <TableComponent
                columns={userColumns}
                data={users}
                leftIcon="/images/tableIcons/cs-usersIcon.svg"
                leftIconHeight={29}
                leftIconWidth={38}
                handleRefresh={handleWatchUserRefresh}
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
                handleRefresh={handleContactRefresh}
                title='Contactos'
                subtitle='Reloj'
              />
            </Row>
          </Space> */} 
        </Space>
      </div>
    </MainLayout>
  )
}