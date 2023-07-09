'use client'

import { Input, message } from 'antd'
import { useRouter} from 'next/navigation';
import axios from 'axios';

const { Search } = Input;

type searchWearerParams = {
  deviceId?: string;
  imei?: string;
};


export default async function SearchPage() {

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  async function onSearch(value: string) {

    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    
    let params: searchWearerParams = {};

    if (value.length === 10) {
      params = { deviceId: value };
    } else if (value.length === 15) {
      params = { imei: value };
    } else {
      messageApi.open({
        key,
        type: 'error',
        content: 'Invalid input, enter imei or deviceId!',
        duration: 2,
      });
      return;
    }

    try {
      const response = await axios.get('http://localhost/wearer/getWearerByDeviceIdOrImei', { params });
      if (!response.data || response.data.length === 0) {
        messageApi.open({
          key,
          type: 'error',
          content: 'Not found!',
          duration: 2,
        });
      } else {
        messageApi.open({
          key,
          type: 'success',
          content: 'Loaded!',
          duration: 2,
        });
        const routeParam = params.deviceId ? `?deviceId=${params.deviceId}` : `?imei=${params.imei}`;
        router.push(`/wearer/dashboard${routeParam}`);
      }
    } catch(error) {
      messageApi.open({
        key,
        type: 'error',
        content: 'Not found!',
        duration: 2,
      });
    }
  }

  return (
      <>
        {contextHolder}
        <div style={{ padding: 20 }}>
          <Search placeholder="input search text" onSearch={onSearch} style={{ width: 500, padding: 5 }} />
        </div>
      </>
    )
}