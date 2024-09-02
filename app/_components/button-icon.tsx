interface ButtonIconProps {
  label: string;
  onClick: () => void;
  icon: React.ReactElement;
  disabled?: boolean;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  label,
  onClick,
  icon,
  disabled = false,
}) => {
  return (
    <button
      aria-label={label}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={"h-16 text-lg w-16 px-3 py-3 rounded-xl focus:outline-none focus:ring-2 bg-gray-100 text-gray-400"}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
    </button>
  );
};

export default ButtonIcon;
