import styles from "./ShowStatus.module.css";
import { useEffect, useState } from "react";
import randomFromArray from "../../utils/randomFromArray.js";
import ButtonNext from "../../components/ButtonNext/ButtonNext.jsx";
import { useNavigate } from "react-router-dom";

import palavras from "../../db/palavras.js";

const ShowStatus = ({
    impostor,
    setImpostor,
    jogadores,
    palavra,
    setPalavra,
    categoriaSelecionada,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!impostor) {
            const impostorRandom = randomFromArray(jogadores);

            setImpostor(impostorRandom);
        }

        if (!palavra && categoriaSelecionada) {
            const palavrasDaCategoria = palavras[categoriaSelecionada];
            if (palavrasDaCategoria && palavrasDaCategoria.length > 0) {
                const palavraSorteada = randomFromArray(palavrasDaCategoria);
                setPalavra(palavraSorteada);
            }
        }
    });

    if (jogadores.length === 0) return <div>Nenhum jogador</div>;

    const currentPlayer = jogadores[currentIndex];

    const handleNext = () => {
        setRevealed(false);

        if (currentIndex + 1 < jogadores.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // todos os jogadores já viram, vamos para a próxima página
            navigate("/showperguntas"); // substitua pela rota correta
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.titleSecond}>Mostre o telefone para</h2>
            <h2>{currentPlayer}</h2>

            {!revealed ? (
                <button onClick={() => setRevealed(true)}>
                    Toque para revelar
                </button>
            ) : (
                <>
                    <p>
                        {currentPlayer === impostor
                            ? "Você é o IMPOSITOR 👀"
                            : `${palavra}`}
                    </p>
                    <button onClick={handleNext}>Próximo</button>
                </>
            )}
        </div>
    );
};

export default ShowStatus;
