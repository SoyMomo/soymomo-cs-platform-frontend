export default function TextField(props) {
    // const [value, setValue] = useState('')
    const handleChange = (e) => {
        props.setValue(e.target.value)
    }

    return (
        <input
            className="mt-6 w-full px-4 py-3 rounded-xl border-[#603BB0] border-2 focus:outline-none 
            pla focus:border-[#603BB0] text-[#603BB0] placeholder-[#D8CEEE]"
            type={props.type}
            placeholder={props.label}
            value={props.value}
            // onChange={(e) => {Props.setValue(e.target.value)}}
            onChange={handleChange}
        />
    )
}