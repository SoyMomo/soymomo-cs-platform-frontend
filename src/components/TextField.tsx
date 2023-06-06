'use client'

import { useState } from "react";

export default function TextField({ label }: { label: string} ) {
    const [value, setValue] = useState('')

    return (
        <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700 tracking-wide">{label}</label>
            <input 
                className="text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}