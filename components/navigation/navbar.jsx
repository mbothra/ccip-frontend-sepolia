import { CustomButton } from "./CustomButton.jsx";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a target={"_blank"}>
				<img
					className={styles.alchemy_logo}
					src="/Chainlink.png"
					onClick={() => document.documentElement.requestFullscreen()}
				></img>
			</a>
			<CustomButton></CustomButton>
		</nav>
	);
}
