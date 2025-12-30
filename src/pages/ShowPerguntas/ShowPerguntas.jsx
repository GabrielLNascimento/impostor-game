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

    const handleNext = () => {
        const perguntaSorteada = sortearPerguntaUnica(
            perguntas[categoriaSelecionada],
            perguntasJaMostradas
        );

        // Se acabarem as perguntas da categoria antes do limite de rodadas
        if (!perguntaSorteada) {
            navigate("/discussao");
            return;
        }

        // 1. Atualiza o histórico de perguntas exibidas
        setPerguntasJaMostradas((prev) => [...prev, perguntaSorteada]);

        // 2. Registra a resposta vinculada ao jogador atual
        const novoPerguntasRespondidas = [
            ...perguntasRespond,
            {
                jogador: jogadores[currentPlayer],
                pergunta: perguntaSorteada,
            },
        ];
        setPerguntaRespond(novoPerguntasRespondidas);

        // 3. Incrementa o contador do jogador que acabou de responder
        const novoContador = [...contadorPergunta];
        novoContador[currentPlayer] += 1;
        setContadorPergunta(novoContador);

        // 4. Verifica quais jogadores ainda não atingiram 2 perguntas
        const indicesDisponiveis = jogadores
            .map((_, idx) => idx)
            .filter((idx) => novoContador[idx] < 2);

        // REGRA DE PULO: Se ninguém mais puder receber perguntas, finaliza
        if (indicesDisponiveis.length === 0) {
            navigate("/discussao");
            return;
        }

        // 5. Sorteia o próximo jogador entre os que ainda restam
        setCurrentPlayer(randomFromArray(indicesDisponiveis));
    };

    useEffect(() => {
        if (perguntasRespond.length === 0) {
            handleNext();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const perguntaAtual = perguntasRespond[perguntasRespond.length - 1];

    return (
        <div className={styles.container}>
            {perguntaAtual ? (
                <>
                    <h2>Pergunta para {jogadores[currentPlayer]}</h2>
                    <span className={styles.pergunta}>
                        {perguntaAtual.pergunta}
                    </span>
                    <button onClick={handleNext}>Próximo</button>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
};

export default ShowPerguntas;
