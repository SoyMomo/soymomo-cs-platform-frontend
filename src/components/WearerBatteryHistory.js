import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from '../styles/WearerBatteryHistory.module.css';
import sharedStyles from '../styles/Common.module.css'

export default function WearerBatteryHistory(Props) {

    return (
        <div className={styles.container}>
            <div className={sharedStyles.cardSubContainer}>
                <div className={sharedStyles.flexCenter}>
                    <div className={styles.iconContainer}>
                        <img src="/images/cs-batteryIcon.svg" width={24} height={24} alt='SoyMomo Logo' />
                    </div>
                    <div className={styles.textContainer}>
                        <h1 className={styles.title}>Historial batería</h1>
                        <p className={styles.subtitle}>Carga batería</p>
                    </div>
                </div>
                <div onClick={Props.handleRefresh} className={styles.refreshContainer}>
                    <img src="/images/tableIcons/cs-refreshIcon.svg" width={16} height={16} alt='SoyMomo Logo' />
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
