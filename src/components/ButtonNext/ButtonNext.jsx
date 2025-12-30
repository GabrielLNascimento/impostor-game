import { Link } from "react-router-dom";
import styles from "./ButtonNext.module.css";

const ButtonNext = ({ to, text }) => {
    return (
        <div className={styles.container}>
            <Link to={to} className={styles.button}>
                {text}
            </Link>
        </div>
    );
};

export default ButtonNext;
