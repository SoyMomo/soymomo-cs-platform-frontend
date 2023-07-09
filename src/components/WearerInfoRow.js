import * as React from 'react';

export default function WearerInfoRow({ iconSrc, label, value }){

    return (
        <div className="flex items-center space-x-2">
            <img src={iconSrc} alt={`${label} Icon`} />
            <div className="flex justify-between w-full">
                <h3 className="text-purple-700 font-semibold">{label}:</h3>
                <p className='text-purple-700'>{value}</p>
            </div>
        </div>
    )
};