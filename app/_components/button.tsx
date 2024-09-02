interface ButtonProps {
	label: string;
	onClick: () => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled = false,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`h-16 text-lg w-52 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
				disabled
					? "bg-gray-300"
					: "bg-gray-500 text-white font-bold"
			}`}
		>
			{label}
		</button>
	);
};

export default Button;
