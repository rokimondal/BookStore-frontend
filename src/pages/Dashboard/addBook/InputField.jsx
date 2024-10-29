
const InputField = ({ label, name, type = 'text', register, placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            <input
                type={type}
                {...register(name, { required: true })}
                className=" p-2 border w-full rounded-md outline-none focus:shadow-sm focus:shadow-gray-400"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
