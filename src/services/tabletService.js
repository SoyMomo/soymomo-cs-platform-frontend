import axios from 'axios';

export const getTablet = async (hid, token) => {
    const params = { hid };
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/tablet/getTabletByHidOrRecoveryEmail', { params }, { headers: { Authorization: `Bearer ${token}` } });
    if (!response) return;
    if (!response.data) return;
    if (!response.data.data) return;
    const tab = response.data.data;
    return tab;
}

export const getInstalledApps = async (objectId, token) => {
    const params = { objectId };
    if (!objectId) return;
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/tablet/getTabletInstalledApps', { params }, { headers: { Authorization: `Bearer ${token}` } });
    if (!response) return;
    if (!response.data) return;
    if (!response.data.data) return;
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

export const getTabletUsers = async (hid, token) => {
    const params = { hid };
    if (!hid) return;
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/tablet/tabletUser/getTabletUserByHidOrRecoveryEmail', { params }, { headers: { Authorization: `Bearer ${token}` } });
    if (!response) return;
    if (!response.data) return;
    const data = response.data.data;
    if (!data) return;
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

export const getDugHistory = async (dugFromDate, dugToDate, hid, token) => {
    let from = dugFromDate ? new Date(dugFromDate) : null;
    let to = dugToDate ? new Date(dugToDate) : null;
    from = from ? from.toISOString() : null;
    to = to ? to.toISOString() : null;
    const params = { hid, from, to };
    const result = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/tablet/smartDetection/getDugHistory', { params }, { headers: { Authorization: `Bearer ${token}` } })
    if (!result) return;
    if (!result.data) return;
    const data = result.data.data;
    if (!data) return;
    const dugHistory = data.map((e, index) => {
        const date = new Date(e.createdAt);
        const time = date.getHours() + ':' + date.getMinutes();
        const dateStr = date.toLocaleDateString();
        return {
            id: index,
            key: index,
            image: e.screenshot.url,
            date: dateStr,
            category: e.classType,
            app: e.appName,
            time: time
        }
    });
    return dugHistory
}

export const updateTablet = async ({ hid, profileName, recoveryEmail, pin, token}) => {
    const body = { profileName, recoveryEmail, pin, hid };
    const response = await axios.post(process.env.REACT_APP_BACKEND_HOST + '/tablet/updateTabletUserInformation', body, { headers: { Authorization: `Bearer ${token}` } });
    if (!response) return;
    if (!response.data) return;
    return response.data.data;
}

export const updateParentalControlSettings = async ({ hid, parentalControlSettings, token }) => {
    const body = { hid, ...parentalControlSettings };
    const response = await axios.post(process.env.REACT_APP_BACKEND_HOST + '/tablet/updateParentalControlSettings', body, { headers: { Authorization: `Bearer ${token}` } });
    if (!response) return;
    if (!response.data) return;
    return response.data.data;
}  

export const getBatteryHistory = async (hid, token) => {
    let from = new Date(); 
    from.setDate(from.getDate() - 7); 
    from = from.toISOString();
    let to = new Date();
    to = to.toISOString();
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/tablet/batteryInfo/getBatteryHistory', { params: { hid, from, to } }, { headers: { Authorization: `Bearer ${token}` } });
    if (!response) return;
    if (!response.data) return;
    const data = response.data.data;
    if (!data) return;
    const batteryHistory = data.map((e, index) => {
        return {
            key: index,
            createdAt: e.createdAtOnTablet.iso,
            battery: e.percentage
        }
    });
    return batteryHistory;
}