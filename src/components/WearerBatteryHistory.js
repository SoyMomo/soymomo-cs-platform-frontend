

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function WearerBatteryHistory(Props) {

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', marginBottom: '0.625rem', maxWidth: '100%', overflow: 'auto', scrollbarColor: 'dark' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '1rem' }}>
                        <img src="/images/cs-batteryIcon.svg" width={24} height={24} alt='SoyMomo Logo' />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#603BB0', marginLeft: '0.75rem' }}>Historial batería</h1>
                        <p style={{ fontSize: '0.875rem', color: '#603BB0', alignSelf: 'flex-start', marginLeft: '0.75rem' }}>Carga batería</p>
                    </div>
                </div>
                <div onClick={Props.handleRefresh} style={{ backgroundColor: '#603BB0', borderRadius: '0.75rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
                </div>
            </div>
            <div style={{ maxWidth: '100%', marginTop: '0.75rem' }}>
                    <BarChart width={1000} height={250} data={Props.data} maxBarSize={10} barGap={100} barCategoryGap={1}>
                        <CartesianGrid strokeDasharray="10 10" />
                        <XAxis dataKey="createdAt" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="battery" fill="#603BB0" />
                    </BarChart>

            </div>
        </div>
    )
}

