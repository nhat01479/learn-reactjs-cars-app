import React from "react";
import { Spinner } from "react-bootstrap";

function Loading(props) {
	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 9999,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Spinner animation="border" variant="primary" />
		</div>
	);
}

export default Loading;
