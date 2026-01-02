import { useState } from "react";
import styles from "./Votacao.module.css";

const Votacao = ({ jogadores, impostor }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [votos, setVotos] = useState([]);
    const [revelar, setRevelar] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [mostrarImpostor, setMostrarImpostor] = useState(false);

    if (jogadores.length === 0) return <div>Nenhum jogador</div>;

    const currentPlayer = jogadores[currentIndex];
    const outrosJogadores = jogadores.filter((j) => j !== currentPlayer);

    const handleRevelar = () => setRevelar(true);

    const handleVotar = (votado) => {
        setVotos([
            ...votos,
            { jogadorQueVotou: currentPlayer, jogadorVotado: votado },
        ]);
        setRevelar(false);

        if (currentIndex + 1 < jogadores.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setFinalizado(true);
        }
    };

    const calcularMaisVotado = () => {
        const contagem = {};
        votos.forEach(({ jogadorVotado }) => {
            contagem[jogadorVotado] = (contagem[jogadorVotado] || 0) + 1;
        });
        const maxVotos = Math.max(...Object.values(contagem));
        const maisVotado = Object.keys(contagem).filter(
            (j) => contagem[j] === maxVotos
        );
        return { maisVotado, maxVotos };
    };

    if (finalizado) {
        const resultado = calcularMaisVotado();
        return (
            <div className={styles.container}>
                <h2>Votação finalizada!</h2>
                <p>
                    Maioria votou em:{" "}
                    <strong>{resultado.maisVotado.join(", ")}</strong>
                </p>

                <button
                    onClick={() => setMostrarImpostor(!mostrarImpostor)}
                    className={styles.impostorButton}
                >
                    {mostrarImpostor ? "Ocultar Impostor" : "Revelar Impostor"}
                </button>

                {mostrarImpostor && (
                    <p className={styles.impostorRevelado}>
                        O impostor é: <strong>{impostor}</strong> 
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2>Eu me chamo {currentPlayer}</h2>

            {!revelar ? (
                <button onClick={handleRevelar}>
                    Votar
                </button>
            ) : (
                <>
                    <p>Escolha em quem votar:</p>
                    <div className={styles.buttonsContainer}>
                        {outrosJogadores.map((jogador, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleVotar(jogador)}
                                className={styles.btnVote}
                            >
                                Eu escolho {jogador}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Votacao;
