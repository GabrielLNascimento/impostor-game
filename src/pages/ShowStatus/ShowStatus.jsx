import styles from "./ShowStatus.module.css";
import { useEffect, useState } from "react";
import randomFromArray from "../../utils/randomFromArray.js";
import ButtonNext from "../../components/ButtonNext/ButtonNext.jsx";
import { useNavigate } from "react-router-dom";

import palavras from "../../db/palavras.js";

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

const ShowStatus = ({
    impostores,
    setImpostores,
    jogadores,
    palavra,
    setPalavra,
    categoriaSelecionada,
    qtdImpostores,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let impostoresAtuais = impostores;

        if (impostoresAtuais.length === 0) {
            const embaralhados = embaralhar([...jogadores]);
            impostoresAtuais = embaralhados.slice(0, qtdImpostores);
            setImpostores(impostoresAtuais);
        }

        if (!palavra && categoriaSelecionada) {
            if (categoriaSelecionada === "Jogadores") {
                const disponiveis = jogadores.filter(j => !impostoresAtuais.includes(j));
                const sorteada = randomFromArray(disponiveis);
                if (sorteada) setPalavra(sorteada);
            } else {
                const palavrasDaCategoria = palavras[categoriaSelecionada];
                if (palavrasDaCategoria && palavrasDaCategoria.length > 0) {
                    const palavraSorteada = randomFromArray(palavrasDaCategoria);
                    setPalavra(palavraSorteada);
                }
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
            navigate("/showperguntas");
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <h2 className={styles.titleSecond}>Mostre o telefone para</h2>
                <h2 className={styles.titleName}>{currentPlayer}</h2>
            </div>

            {!revealed ? (
                <button onClick={() => setRevealed(true)} className={styles.btnRevelar}>
                    Toque para revelar
                </button>
            ) : (
                <>
                    <p>
                        {impostores.includes(currentPlayer)
                            ? "Você é o IMPOSITOR 👀"
                            : `${palavra}`}
                    </p>
                    <button onClick={handleNext} className={styles.btnProximo}>Próximo</button>
                </>
            )}
        </div>
    );
};

export default ShowStatus;
