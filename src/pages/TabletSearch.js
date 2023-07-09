import MainLayout from '../layouts/layout';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd'



const { Search } = Input;


//<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
export default function TabletSearch() {
    const navigate = useNavigate();

    async function onSearch(value) {
        navigate(`/tablet/dashboard?hid=${value}`);
    }


    return (
        <MainLayout
            children={
                <>
                    <div style={{ padding: 20 }}>
                        <Search placeholder="Buscar tablet por hid" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
                    </div>
                </>
            }
        />
    )
}
