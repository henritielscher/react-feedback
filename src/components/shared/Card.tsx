import React, {
	ReactChild,
	ReactChildren,
	ReactElement,
	ReactNode,
} from "react";

type CardProps = {
	children:
		| JSX.Element
		| JSX.Element[]
		| React.ReactChild
		| React.ReactChild[]
		| React.ReactNode;
	reverse?: boolean;
};

function Card({ children, reverse }: CardProps) {
	return <div className={`card ${reverse && "reverse"}`}>{children}</div>;
}

export default Card;
