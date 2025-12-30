import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ShowPerguntas.module.css";
import perguntas from "../../db/perguntas.js";
import randomFromArray from "../../utils/randomFromArray.js";

// Sorteia N perguntas de forma não repetida
const sortearPerguntasPorJogador = (perguntasDaCategoria, quantidade) => {
    const usadas = [];
    const resultado = [];
    const copia = [...perguntasDaCategoria];
    for (let i = 0; i < quantidade; i++) {
        if (copia.length === 0) {
            copia.push(...usadas);
            usadas.length = 0;
        }
        const sorteada = randomFromArray(copia);
        resultado.push(sorteada);
        copia.splice(copia.indexOf(sorteada), 1);
        usadas.push(sorteada);
    }
    return resultado;
};

const ShowPerguntas = ({
    jogadores,
    categoriaSelecionada,
    perguntasRespond,
    setPerguntaRespond,
}) => {
    const navigate = useNavigate();

    // Inicializa perguntasPorJogador
    const [perguntasPorJogador] = useState(() => {
        const perguntasDaCategoria = perguntas[categoriaSelecionada] || [];
        return jogadores.map(() =>
            sortearPerguntasPorJogador(perguntasDaCategoria, 2)
        );
    });

    const [contadorPergunta, setContadorPergunta] = useState(() =>
        Array(jogadores.length).fill(0)
    );

    const [currentPlayer, setCurrentPlayer] = useState(() =>
        Math.floor(Math.random() * jogadores.length)
    );

    const handleNext = () => {
        const currentPergunta =
            perguntasPorJogador[currentPlayer][contadorPergunta[currentPlayer]];

        // Adiciona objeto { jogador, pergunta } no array de perguntasRespond
        const novoPerguntasRespondidas = [...perguntasRespond];
        novoPerguntasRespondidas.push({
            jogador: jogadores[currentPlayer],
            pergunta: currentPergunta,
        });
        setPerguntaRespond(novoPerguntasRespondidas);

        // Atualiza contador
        const novoContador = [...contadorPergunta];
        novoContador[currentPlayer] += 1;
        setContadorPergunta(novoContador);

        // Próximo jogador que ainda tem perguntas
        const indicesDisponiveis = jogadores
            .map((_, idx) => idx)
            .filter((idx) => novoContador[idx] < 2);

        if (indicesDisponiveis.length === 0) {
            navigate("/discussao");
            return;
        }

        setCurrentPlayer(randomFromArray(indicesDisponiveis));
    };

    const currentPergunta =
        perguntasPorJogador[currentPlayer][contadorPergunta[currentPlayer]];

    return (
        <div className={styles.container}>
            <h2>Pergunta para {jogadores[currentPlayer]}</h2>
            <span className={styles.pergunta}>{currentPergunta}</span>
            <button onClick={handleNext}>Próximo</button>
        </div>
    );
};

export default ShowPerguntas;
