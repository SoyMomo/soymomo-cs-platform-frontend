import axios from 'axios';

export const getWearer = async (params, token) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getWearerByDeviceIdOrImei', { params }, { headers: { Authorization: `Bearer ${token}` } });
    return response;
}

export const getContacts = async (params, token) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getContacts', { params }, { headers: { Authorization: `Bearer ${token}` } });
    let finalResponse;
    if (response.data.data) {
      finalResponse = response.data.data.map((contact) => {
        contact.sos = contact.sos ? "Si" : "No"
        return contact
      })
    }
    return finalResponse ?? [];
  }

export const getWatchUsers = async (params, token) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/watchUser/getWatchUserByEmailOrDeviceIdOrImei', { params }, { headers: { Authorization: `Bearer ${token}` } });
    let fetchedUsers = response.data.data.users
    const fetchedWatchUsers = response.data.data.results
    fetchedUsers = fetchedUsers.map((user) => {
      const currentWu = fetchedWatchUsers.find((watchUser) => watchUser.user.objectId === user.objectId)
      user.id = user.objectId
      user.name = user.firstName + " " + user.lastName
      user.facebook = user.fb ? "Si" : "No"
      user.authorized = currentWu.active ? "Si" : "No"
      return user
    })
    return fetchedUsers;
  }

export const getFriends = async (params, deviceId, imei, token) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getWearerFriends', { params }, { headers: { Authorization: `Bearer ${token}` } });
    let fetchedFriends = response.data.data
    for (let i = 0; i < fetchedFriends.length; i++) {
      const wearer1 = (await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getWearerByObjectId', { headers: { Authorization: `Bearer ${token}` } }, { params: { objectId: fetchedFriends[i].watch2.objectId } })).data.data[0];
      const wearer2 = (await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/getWearerByObjectId', { headers: { Authorization: `Bearer ${token}` } }, { params: { objectId: fetchedFriends[i].watch2.objectId } })).data.data[0];
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
    return fetchedFriends;
  }

export const getChatUser = async (params, token) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/chatUser', { params }, { headers: { Authorization: `Bearer ${token}` } });
    const messages = response.data.data
      .filter(row => row.chatUser.type === "text")  // Filter first
      .map((row, index) => {                                // Then map
        const chatUser = row.chatUser
        const user = row.user
        return {
            key: index,
          message: chatUser.text,
          sender: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
          date: chatUser.createdAt,
          from: chatUser.sender,
        }
      });
    return messages;
  }

  export const getChatWearer = async (params, token) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/chatWearer', { params }, { headers: { Authorization: `Bearer ${token}` } });
    const messages = response.data.data
      .filter(row => row.chatWearer.type === "text")  // Filter first
      .map((row, index) => {                                // Then map
        const chatWearer = row.chatWearer
        const sender = row.sender
        return {
            key: index,
          message: chatWearer.text,
          sender: `${sender.firstName ?? ""} ${sender.lastName ?? ""}`,
          date: chatWearer.createdAt,
          from: "watch",
        }
      });
    return messages
  }

  export const getBatteryHistory = async (deviceId, token) => {
    let from = new Date(); 
    from.setDate(from.getDate() - 7); 
    from = from.toISOString();
    let to = new Date();
    to = to.toISOString();
    const response = await axios.get(process.env.REACT_APP_BACKEND_HOST + '/wearer/historyBattery', { params: { deviceId, from, to } }, { headers: { Authorization: `Bearer ${token}` } });
    const data = response.data.data
    return data
  }