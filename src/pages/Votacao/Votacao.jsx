import { useState } from "react";
import styles from "./Votacao.module.css";
import ButtonNext from '../../components/ButtonNext/ButtonNext.jsx'

const Votacao = ({ jogadores, impostores, pontos, setPontos, qtdImpostores }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votos, setVotos] = useState([]);
    const [revelar, setRevelar] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [mostrarImpostor, setMostrarImpostor] = useState(false);
    const [qtdVotosFeitos, setQtdVotosFeitos] = useState(0);
    const [votosJogadorAtual, setVotosJogadorAtual] = useState([]);

    console.log(pontos);

    if (jogadores.length === 0) return <div>Nenhum jogador</div>;

    const currentPlayer = jogadores[currentIndex];
    const outrosJogadores = jogadores.filter((j) => j !== currentPlayer);
    const disponiveis = outrosJogadores.filter(j => !votosJogadorAtual.includes(j));

    function handleRevelar() {
        setRevelar(true);
    }

    function aplicarPontuacao(listaVotos) {
        if (!Array.isArray(listaVotos)) return;

        setPontos((prev) => {
            const novo = { ...prev };

            listaVotos.forEach((voto) => {
                if (impostores.includes(voto.votouEm)) {
                    novo[voto.quemVotou] += 1;
                }
            });

            return novo;
        });
    }

    function handleVotar(jogadorVotado) {
        const novosVotosDoJogador = [...votosJogadorAtual, jogadorVotado];
        setVotosJogadorAtual(novosVotosDoJogador);
        setQtdVotosFeitos(qtdVotosFeitos + 1);
        setRevelar(false);

        if (qtdVotosFeitos + 1 < qtdImpostores) {
            return;
        }

        const todosVotos = [
            ...votos,
            ...novosVotosDoJogador.map(v => ({
                quemVotou: currentPlayer,
                votouEm: v,
            }))
        ];

        setVotos(todosVotos);
        setQtdVotosFeitos(0);
        setVotosJogadorAtual([]);

        const proximoIndex = currentIndex + 1;

        if (proximoIndex < jogadores.length) {
            setCurrentIndex(proximoIndex);
        } else {
            aplicarPontuacao(todosVotos);
            setFinalizado(true);
        }
    }

    if (finalizado) {
        const contagem = {};
        votos.forEach((v) => {
            contagem[v.votouEm] = (contagem[v.votouEm] || 0) + 1;
        });

        const maior = Math.max(...Object.values(contagem));
        const maisVotado = Object.keys(contagem).filter(
            (nome) => contagem[nome] === maior
        );

        return (
            <div className={styles.containerVote}>
                <div>
                    <h2>Votação Finalizada</h2>
                    <p>
                        Jogadores votaram em:{" "}
                        <strong>{maisVotado.join(", ")}</strong>
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
                        <div>
                            {impostores.map((imp) => (
                                <p key={imp} className={styles.impostorRevelado}>{imp}</p>
                            ))}
                        </div>
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
                    <p>Vote na {qtdVotosFeitos + 1}ª pessoa que acha que é impostor:</p>

                    <div className={styles.buttonsContainer}>
                        {disponiveis.map((jogador) => (
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
