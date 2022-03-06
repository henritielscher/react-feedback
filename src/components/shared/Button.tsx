import React from "react";

type ButtonProps = {
	children:
		| JSX.Element
		| JSX.Element[]
		| React.ReactChild
		| React.ReactChild[]
		| React.ReactNode;
	version?: string;
	type?: "submit" | "reset" | "button";
	isDisabled?: boolean;
};

function Button({ children, version, type, isDisabled }: ButtonProps) {
	return (
		<button
			type={type}
			disabled={isDisabled}
			className={`btn btn-${version}`}
		>
			{children}
		</button>
	);
}

Button.defaultProps = {
	version: "primary",
	type: "button",
	isDisabled: false,
};

export default Button;
