import * as React from 'react';

export default function AppVersionsCard(props) {

  return (
    <div className="flex flex-col bg-white rounded-md shadow-md p-4 mb-4 w-full">
        <p className="text-sm text-start text-[#603BB0] font-bold">Últimas versiones de software</p>
        <div className="flex space-x-2">
            <div className="flex bg-white rounded-md shadow-md p-4 my-2 w-full space-x-2">
                <img src="/images/cs-AndroidIcon.svg" alt="SoyMomo Icon" />
                <p className="text-sm text-start text-[#603BB0] font-bold">Version: </p>
                <p className="text-sm text-start text-[#603BB0]">{props.versionAndroid}</p>
            </div>
            <div className="flex bg-white rounded-md shadow-md p-4 my-2 w-full space-x-2">
                <img src="/images/cs-AppleIcon.svg" alt="SoyMomo Icon" />
                <p className="text-sm text-start text-[#603BB0] font-bold">Version: </p>
                <p className="text-sm text-start text-[#603BB0]">{props.versionApple}</p>
            </div>
        </div>
    </div>
  );
}
