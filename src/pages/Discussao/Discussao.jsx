import styles from "./Discussao.module.css";
import ButtonNext from '../../components/ButtonNext/ButtonNext.jsx'

// Função para agrupar perguntas por jogador
const agruparPorJogador = (perguntasRespond) => {
    const map = {};
    perguntasRespond.forEach(({ jogador, pergunta }) => {
        if (!map[jogador]) map[jogador] = [];
        map[jogador].push(pergunta);
    });
    return map;
};

const Discussao = ({ perguntasRespond, jogadores }) => {
    const perguntasPorJogador = agruparPorJogador(perguntasRespond);

    return (
        <div className={styles.container}>
            <h1>Momento da discussão</h1>

            <div className={styles.cardsContainer}>
                {jogadores.map((jogador, idx) => (
                    <div key={idx} className={styles.card}>
                        <h2>{jogador}</h2>
                        <ul>
                            {perguntasPorJogador[jogador] &&
                            perguntasPorJogador[jogador].length > 0 ? (
                                perguntasPorJogador[jogador].map(
                                    (pergunta, pIdx) => (
                                        <li key={pIdx}>{pergunta}</li>
                                    )
                                )
                            ) : (
                                <li>Nenhuma pergunta respondida</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>

            <ButtonNext to="/votacao" text="Ir para votação" /> 
        </div>
    );
};

export default Discussao;
