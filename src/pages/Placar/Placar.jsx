import styles from "./Placar.module.css";

const Placar = ({
    jogadores,
    pontos,
    rodadas,
    recomeçarJogo,
    proximaRodada,
}) => {

    const ranking = [...jogadores].sort(
        (a, b) => (pontos[b] || 0) - (pontos[a] || 0)
    );

    const limiteAtingido = rodadas >= 5;

    return (
        <div className={styles.container}>
            <h1>🏆 Tabela de Pontos</h1>
            <p className={styles.rodada}>Rodada {rodadas} de 5</p>

            <div className={styles.lista}>
                {ranking.map((jogador, index) => (
                    <div key={index} className={styles.item}>
                        <span>{jogador}</span>
                        <span className={styles.pontos}>
                            {pontos[jogador] || 0}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.botoes}>
                <button
                    className={styles.botao}
                    onClick={proximaRodada}
                >
                    Próxima Rodada
                </button>

                <button
                    className={styles.reset}
                    onClick={recomeçarJogo}
                    disabled={limiteAtingido}
                >
                    Recomeçar Jogo
                </button>
            </div>

            {limiteAtingido && (
                <p className={styles.limite}>🚫 Limite de 5 rodadas atingido</p>
            )}
        </div>
    );
};

export default Placar;
