import {
  ButtonProps as MantineButtonProps,
  Button as MantineButton,
  createPolymorphicComponent,
  BoxProps,
} from "@mantine/core";
import clsx from 'clsx';

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonProps = MantineButtonProps & {
  size?: ButtonSize;
  variant?:
    | "gradient"
    | "filled"
    | "outline"
    | "light"
    | "white"
    | "default"
    | "subtle"
    | "link";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const sizeToClassMapper = (size: ButtonSize) => {
  switch (size) {
    case "xs":
      return "px-2 py-0.5 text-xs ";
    case "sm":
      return "px-3 py-0.5 text-sm";
    case "md":
      return "px-4 py-2";
    case "lg":
      return "text-lg py-1 px-5";
    default:
      return "text-xl py-1.5 px-5";
  }
};

const Button = ({
  children,
  variant = "filled",
  color = "yellow",
  size = "md",
  className,
  ...props
}: ButtonProps) => {
  return (
    <MantineButton
      {...props}
      color={color}
      variant={variant === "link" ? "subtle" : variant}
      className={clsx(sizeToClassMapper(size), className, {
        "bg-transparent hover:brightness-75 transition-all": variant === "link",
      })}
      styles={{
        root: { height: 'unset' },
        label: { padding: '2px 0' }
      }}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
