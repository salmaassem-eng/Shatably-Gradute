
import { useField } from 'formik';

export default function UserInput({ labelName, ...props }) {
    const [field, meta] = useField(props);

    return (
        <div>
            <label htmlFor={props.id || props.name} className="block font-medium">
                {labelName}
            </label>
            <div className="mt-[5px] relative">
                <input
                    {...field}
                    {...props}
                    className={`appearance-none block w-full px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out ${meta.touched && meta.error ? 'border-2 border-red-500' : ''}`}
                />
                {meta.touched && meta.error && (
                    <p className="text-red-500 text-sm mt-1 ml-2">{meta.error}</p>
                )}
            </div>
        </div>
    );
}