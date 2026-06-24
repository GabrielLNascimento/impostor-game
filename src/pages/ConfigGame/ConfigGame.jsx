import styles from "./ConfigGame.module.css";
import ButtonNext from "../../components/ButtonNext/ButtonNext";

const ConfigGame = ({ jogadores, qtdImpostores, setQtdImpostores, qtdPerguntas, setQtdPerguntas }) => {
    const maxImpostores = jogadores.length - 1;

    return (
        <div className={styles.page}>
            <h1>Configuração do Jogo</h1>

            <div className={styles.configItem}>
                <h2>Quantidade de Impostores</h2>
                <p className={styles.desc}>Quantos jogadores serão o impostor</p>
                <div className={styles.control}>
                    <button
                        onClick={() => setQtdImpostores(Math.max(1, qtdImpostores - 1))}
                        disabled={qtdImpostores <= 1}
                        className={styles.btn}
                    >
                        -
                    </button>
                    <span className={styles.value}>{qtdImpostores}</span>
                    <button
                        onClick={() => setQtdImpostores(Math.min(maxImpostores, qtdImpostores + 1))}
                        disabled={qtdImpostores >= maxImpostores}
                        className={styles.btn}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.configItem}>
                <h2>Perguntas por Jogador</h2>
                <p className={styles.desc}>Quantas perguntas cada jogador responde</p>
                <div className={styles.control}>
                    <button
                        onClick={() => setQtdPerguntas(Math.max(1, qtdPerguntas - 1))}
                        disabled={qtdPerguntas <= 1}
                        className={styles.btn}
                    >
                        -
                    </button>
                    <span className={styles.value}>{qtdPerguntas}</span>
                    <button
                        onClick={() => setQtdPerguntas(Math.min(5, qtdPerguntas + 1))}
                        disabled={qtdPerguntas >= 5}
                        className={styles.btn}
                    >
                        +
                    </button>
                </div>
            </div>

            <ButtonNext to="/changecategoria" text="Próximo" />
        </div>
    );
};

export default ConfigGame;
