import { createUseStyles } from "react-jss";
import logo from "#src/assets/images/logo.svg";

const useStyles = createUseStyles({
	logoContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.5em",
		height: "4.5em",
	},
	logo: {
		width: "2.4em",
		color: "#000000E0",
	},
	logoText: {
		fontSize: "1em",
		fontWeight: "bold",
		color: "#FFFFFF",
	},
});

export interface LogoProps {
	collapsed: boolean;
}

export function Logo({ collapsed }: LogoProps) {
	const classes = useStyles();
	return (
		<div className={classes.logoContainer}>
			<img src={logo} alt="logo" className={classes.logo} />

			{collapsed ? null : <h1 className={classes.logoText}>Shop Runner</h1>}
		</div>
	);
}
