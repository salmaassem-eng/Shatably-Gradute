export default function UserInfo({label, className, ...prps}) {
    return (<div className={className}>
        <label className="block text-sm text-[#16404D] mb-2">{label}</label>
        <input
            {...prps}
            className="w-full p-3 bg-[#f4f4f4] rounded-[25px] text-[#16404D]"
        />
    </div>
    )
}