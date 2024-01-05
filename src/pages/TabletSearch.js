import MainLayout from '../layouts/layout';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, message } from 'antd'
import { getTablet } from '../services/tabletService';
import { useAuth } from "../authContext";




const { Search } = Input;


//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function TabletSearch() {
    const { tokens } = useAuth();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
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
        try {
            const response = await getTablet(value, tokens.AccessToken);
            if (!response) {
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
                setInputValue('');
                navigate(`/tablet/dashboard?hid=${value}`);
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
        <MainLayout>
            <>
                {contextHolder}
                <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 20 }}>
                        <Search placeholder="Buscar tablet por hid" value={inputValue} onChange={e => setInputValue(e.target.value)} onSearch={onSearch} style={{ width: 500, padding: 5 }} />
                    </div>
                </div>
            </>
        </MainLayout>
    )
}
