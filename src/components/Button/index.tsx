import { ButtonContainer } from "./styles";
import { IButtonProps } from "./types";

const Button = ({ title,onClick, className, disabled }: IButtonProps) => {
  return <ButtonContainer className={className} onClick={onClick}  disabled={disabled}>{title}</ButtonContainer>;
};

export default Button;
