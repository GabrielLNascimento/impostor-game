import styles from "./ChangePlayers.module.css";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import ButtonNext from "../../components/ButtonNext/ButtonNext";

const ChangePlayers = ({ jogadores, setJogadores, setPontos }) => {
    const [players, setPlayers] = useState("");

    const addPlayer = (e) => {
        if (e.key === "Enter" && players.trim() !== "") {
            setJogadores([...jogadores, players.trim()]);
            setPlayers("");
        }
    };

    const deletePlayer = (indexToDelete) => {
        const newList = jogadores.filter((_, index) => index !== indexToDelete);
        setJogadores(newList);
    };

    useEffect(() => {
        setPontos((prevPontos) => {
            const newPontos = {};

            jogadores.forEach((jogador) => {
                newPontos[jogador] = prevPontos[jogador] ?? 0;
            });

            return newPontos;
        });
    }, [jogadores, setPontos]);


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Nome dos Jogadores</h1>

            <input
                type="text"
                placeholder="Ex: Fulano"
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
                onKeyDown={addPlayer}
            />

            <div className={styles.containerPlayers}>
                {jogadores.map((jogador, index) => (
                    <div key={index} className={styles.playerCard}>
                        <span className={styles.playerName}>{jogador}</span>

                        <button
                            className={styles.deleteBtn}
                            onClick={() => deletePlayer(index)}
                            aria-label="Remover jogador"
                        >
                            <Trash2 />
                        </button>
                    </div>
                ))}
            </div>

            {jogadores.length > 0 && (
                <ButtonNext to="/changecategoria" text="Próximo" />
            )}
        </div>
    );
};

export default ChangePlayers;
