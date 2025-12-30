import styles from "./Home.module.css";
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Game of the Impostor</h1>

            <div className={styles.content}>
                <button>
                    <Link to="/changeplayers" className={styles.linkbtn}>Jogar</Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
