'use client'

import { useState } from "react";

interface TextFieldProps {
    label: string
    type: string
    setValue: (value: string) => void
    value: string
}

export default function TextField(Props: TextFieldProps) {
    // const [value, setValue] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Props.setValue(e.target.value)
    }

    return (
        <input
            className="mt-6 w-full px-4 py-3 mt-2 text-gray-700 rounded-xl border-[#603BB0] border-2 focus:outline-none 
            pla focus:border-[#603BB0] text-[#603BB0] placeholder-[#D8CEEE]"
            type={Props.type}
            placeholder={Props.label}
            value={Props.value}
            // onChange={(e) => {Props.setValue(e.target.value)}}
            onChange={handleChange}
        />
    )
}