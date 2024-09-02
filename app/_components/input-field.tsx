interface InputFieldProps {
	label?: string;
	type?: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label = "",
	type = "text",
	placeholder = "",
	value,
	onChange,
	className = "",
}) => {
	return (
		<div className="grid">
			<label className="text-sm pb-1" htmlFor={label}>
				{label}
			</label>
			<input
				id={label}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`h-16 w-52 px-3 py-2 border border-4 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 ${className}`}
			/>
		</div>
	);
};

export default InputField;
