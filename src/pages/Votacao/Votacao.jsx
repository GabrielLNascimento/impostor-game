import { useState } from "react";
import styles from "./Votacao.module.css";
import ButtonNext from '../../components/ButtonNext/ButtonNext.jsx'

const Votacao = ({ jogadores, impostor, pontos, setPontos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votos, setVotos] = useState([]);
    const [revelar, setRevelar] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [mostrarImpostor, setMostrarImpostor] = useState(false);

    console.log(pontos);

    if (jogadores.length === 0) return <div>Nenhum jogador</div>;

    const currentPlayer = jogadores[currentIndex];
    const outrosJogadores = jogadores.filter((j) => j !== currentPlayer);

    function handleRevelar() {
        setRevelar(true);
    }

    function calcularResultado(listaVotos) {
        const contagem = {};

        listaVotos.forEach((v) => {
            contagem[v.votouEm] = (contagem[v.votouEm] || 0) + 1;
        });

        const maior = Math.max(...Object.values(contagem));
        const maisVotado = Object.keys(contagem).filter(
            (nome) => contagem[nome] === maior
        );

        return { maisVotado };
    }

    function aplicarPontuacao(listaVotos) {
        if (!Array.isArray(listaVotos)) return;

        setPontos((prev) => {
            const novo = { ...prev };

            listaVotos.forEach((voto) => {
                if (voto.votouEm === impostor) {
                    novo[voto.quemVotou] += 1;
                }
            });

            return novo;
        });
    }

    function handleVotar(jogadorVotado) {
        const novosVotos = [
            ...votos,
            { quemVotou: currentPlayer, votouEm: jogadorVotado },
        ];

        setVotos(novosVotos);
        setRevelar(false);

        const proximoIndex = currentIndex + 1;

        if (proximoIndex < jogadores.length) {
            setCurrentIndex(proximoIndex);
        } else {
            aplicarPontuacao(novosVotos);
            setFinalizado(true);
        }
    }

    if (finalizado) {
        const resultado = calcularResultado(votos);

        return (
            <div className={styles.containerVote}>
                <div>
                    <h2>Votação Finalizada</h2>
                    <p>
                        Jogadores votaram em:{" "}
                        <strong>{resultado.maisVotado.join(", ")}</strong>
                    </p>
                    <button
                        onClick={() => setMostrarImpostor(!mostrarImpostor)}
                        className={styles.impostorButton}
                    >
                        {mostrarImpostor
                            ? "Ocultar Impostor"
                            : "Revelar Impostor"}
                    </button>
                </div>

                <div>

                    {mostrarImpostor && (
                        <p className={styles.impostorRevelado}>{impostor}</p>
                    )}
                </div>

                <div>
                    {mostrarImpostor && (
                        <ButtonNext to="/adivinha" text="Próximo" />
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.titleVote}>Eu me chamo {currentPlayer}</h2>

            {!revelar ? (
                <button onClick={handleRevelar} className={styles.btnVote}>
                    Votar
                </button>
            ) : (
                <>
                    <p>Escolha em quem votar:</p>

                    <div className={styles.buttonsContainer}>
                        {outrosJogadores.map((jogador) => (
                            <button
                                key={jogador}
                                onClick={() => handleVotar(jogador)}
                                className={styles.btnVotePlayer}
                            >
                                {jogador}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Votacao;
