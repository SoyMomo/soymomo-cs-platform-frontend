import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import sharedStyles from '../styles/Common.module.css'
import styles from '../styles/Common.module.css'

export default function TabletBatteryHistory(Props) {

    return (
        <div className={sharedStyles.generalCard}>
            <div className={sharedStyles.generalSubContainer}>
                <div className={sharedStyles.flexCenter}>
                    <div className={sharedStyles.iconContainer}>
                        <img src="/images/cs-batteryIcon.svg" width={24} height={24} alt='SoyMomo Logo' />
                    </div>
                    <div className={sharedStyles.flexAndCol}>
                        <h1 className={sharedStyles.iconTitle}>Historial batería</h1>
                        <p className={sharedStyles.iconSubTitle}>Carga batería</p>
                    </div>
                </div>
                <div onClick={Props.handleRefresh} className={sharedStyles.refreshContainer}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" className={sharedStyles.refreshImg} alt='SoyMomo Logo' />
                </div>
            </div>
            <div className={styles.chartContainer}>
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