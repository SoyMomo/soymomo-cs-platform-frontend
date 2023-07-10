import axios from 'axios';

export const getTablet = async (hid) => {
    const params = { hid };
    const response = await axios.get('http://localhost/tablet/getTabletByHidOrRecoveryEmail', { params });
    const tab = response.data.data;
    return tab;
}

export const getInstalledApps = async (objectId) => {
    const params = { objectId };
    if (!objectId) return;
    const response = await axios.get('http://localhost/tablet/getTabletInstalledApps', { params });

    const apps = response.data.data.map(app => {
        return {
            key: app.objectId,
            appName: app.appName,
            installed: app.installed ? 'Si' : 'No',
            allowed: app.allowed ? 'Permitido' : 'No permitido'
        }
    });
    return apps;
}

export const getTabletUsers = async (hid) => {
    const params = { hid };
    if (!hid) return;
    const response = await axios.get('http://localhost/tablet/tabletUser/getTabletUserByHidOrRecoveryEmail', { params });
    const data = response.data.data;
    const users = data.map(e => {
        const user = e.user;
        return {
            key: user.objectId,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            bd: user.createdAt !== null ? 'Si' : 'No',
            tos: user.acceptedNewTOS ? 'Si' : 'No',
            deletion: user.hasRequestedDeletion ? 'Si' : 'No'
        }
    });
    return users
}

export const getDugHistory = async (dugFromDate, dugToDate, hid) => {
    let from = dugFromDate ? new Date(dugFromDate) : null;
    let to = dugToDate ? new Date(dugToDate) : null;
    from = from ? from.toISOString() : null;
    to = to ? to.toISOString() : null;
    const params = { hid, from, to };
    const result = await axios.get('http://localhost/tablet/smartDetection/getDugHistory', { params })
    const data = result.data.data;
    const dugHistory = data.map((e, index) => {
        const date = new Date(e.createdAt);
        const time = date.getHours() + ':' + date.getMinutes();
        const dateStr = date.toLocaleDateString();
        return {
            id: index,
            image: e.screenshot.url,
            date: dateStr,
            category: e.classType,
            app: e.appName,
            time: time
        }
    });
    return dugHistory
}  

export const getBatteryHistory = async (hid) => {
    const responseBattery = {
        "data": [
            {
                "chargingMethod": "Descargando",
                "tablet": {
                    "type": "Pointer",
                    "className": "Tablet",
                    "objectId": "Fe4N97GTHK"
                },
                "percentage": 73,
                "health": "Buena",
                "createdAtOnTablet": {
                    "type": "Date",
                    "iso": "2023-07-09T06:23:15.030Z"
                },
                "createdAt": "2023-07-09T14:47:06.283Z",
                "updatedAt": "2023-07-09T14:47:06.283Z",
                "objectId": "zpz0RRiNKY"
            },
            {
                "chargingMethod": "Descargando",
                "tablet": {
                    "type": "Pointer",
                    "className": "Tablet",
                    "objectId": "Fe4N97GTHK"
                },
                "percentage": 64,
                "health": "Buena",
                "createdAtOnTablet": {
                    "type": "Date",
                    "iso": "2023-07-09T12:08:16.019Z"
                },
                "createdAt": "2023-07-09T14:47:06.283Z",
                "updatedAt": "2023-07-09T14:47:06.283Z",
                "objectId": "f12Akuu6UE"
            },
            {
                "chargingMethod": "Descargando",
                "tablet": {
                    "type": "Pointer",
                    "className": "Tablet",
                    "objectId": "Fe4N97GTHK"
                },
                "percentage": 89,
                "health": "Buena",
                "createdAtOnTablet": {
                    "type": "Date",
                    "iso": "2023-07-08T20:23:13.216Z"
                },
                "createdAt": "2023-07-09T14:47:06.283Z",
                "updatedAt": "2023-07-09T14:47:06.283Z",
                "objectId": "KcRtZfXZ2I"
            }
    ]}
    // const response = await axios.get('http://localhost/tablet/batteryHistory/getBatteryHistoryByHid', { params: { hid } });
    const data = responseBattery.data;
    const batteryHistory = data.map((e, index) => {
        const date = new Date(e.createdAt);
        const time = date.getHours() + ':' + date.getMinutes();
        const dateStr = date.toLocaleDateString();
        return {
            createdAt: e.createdAtOnTablet.iso,
            battery: e.percentage
        }
    });
    return batteryHistory;
}