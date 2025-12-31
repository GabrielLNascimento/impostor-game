import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ShowPerguntas.module.css";
import perguntas from "../../db/perguntas.js";
import randomFromArray from "../../utils/randomFromArray.js";

const ShowPerguntas = ({
    jogadores,
    categoriaSelecionada,
    perguntasRespond,
    setPerguntaRespond,
}) => {
    const navigate = useNavigate();

    const [contadorPergunta, setContadorPergunta] = useState(() =>
        Array(jogadores.length).fill(0)
    );

    const [currentPlayer, setCurrentPlayer] = useState(() =>
        Math.floor(Math.random() * jogadores.length)
    );

    const [perguntasJaMostradas, setPerguntasJaMostradas] = useState([]);

    const sortearPerguntaUnica = (perguntasDaCategoria, jaMostradas) => {
        const disponiveis = perguntasDaCategoria.filter(
            (p) => !jaMostradas.includes(p)
        );
        return disponiveis.length === 0 ? null : randomFromArray(disponiveis);
    };

    const executarRodada = (jogadorIndex, novoContador) => {
        const perguntaSorteada = sortearPerguntaUnica(
            perguntas[categoriaSelecionada],
            perguntasJaMostradas
        );

        if (!perguntaSorteada) {
            navigate("/discussao");
            return;
        }

        setPerguntasJaMostradas((prev) => [...prev, perguntaSorteada]);

        setPerguntaRespond((prev) => [
            ...prev,
            {
                jogador: jogadores[jogadorIndex],
                pergunta: perguntaSorteada,
            },
        ]);

        setContadorPergunta(novoContador);
    };

    useEffect(() => {
        executarRodada(currentPlayer, [...contadorPergunta]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNext = () => {
        const novoContador = [...contadorPergunta];
        novoContador[currentPlayer] += 1;

        const indicesDisponiveis = jogadores
            .map((_, i) => i)
            .filter((i) => novoContador[i] < 2);

        if (indicesDisponiveis.length === 0) {
            navigate("/discussao");
            return;
        }

        const proximoJogador = randomFromArray(indicesDisponiveis);

        setCurrentPlayer(proximoJogador);
        executarRodada(proximoJogador, novoContador);
    };

    const perguntaAtual =
        perguntasRespond[perguntasRespond.length - 1]?.pergunta || "";

    return (
        <div className={styles.container}>
            <h2>Pergunta para {jogadores[currentPlayer]}</h2>
            <span className={styles.pergunta}>{perguntaAtual}</span>
            <button onClick={handleNext}>Próximo</button>
        </div>
    );
};

export default ShowPerguntas;
