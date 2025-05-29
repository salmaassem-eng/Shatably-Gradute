export default function UserInput({labelName ,...props}) {
    return (
        <div>
            <label {...props} className="block font-medium ">
                {labelName}
            </label>
            <div className="mt-[5px] relative">
                <input
                    required
                    {...props}
                    className="appearance-none block w-[435px] px-[10px] py-[20px]  bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out "
                />
            </div>
        </div>
    )
}