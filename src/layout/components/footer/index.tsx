import {
	Layout,
} from "antd";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	footer: {
		backgroundColor: "transparent",
		display: "flex",
		justifyContent: "center",
	},
});

const { Footer: AntdFooter } = Layout;

export function Footer() {
	const classes = useStyles();

	return (
		<AntdFooter className={classes.footer}>
			<p>@ 2023 Shop Runner </p>
		</AntdFooter>
	);
}
