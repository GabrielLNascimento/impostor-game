import styles from "./ChangePlayers.module.css";
import { useState } from "react";

import ButtonNext from "../../components/ButtonNext/ButtonNext";

const ChangePlayers = ({ jogadores, setJogadores }) => {
    const [players, setPlayers] = useState("");
    console.log(jogadores);
    const addPlayer = (e) => {
        if (e.key === "Enter" && players.trim() !== "") {
            setJogadores([...jogadores, players.trim()]);
            setPlayers("");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Nome dos Jogadores</h1>

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
                        {jogador}
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
