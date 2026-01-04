import { useState } from "react";
import { useNavigate } from "react-router-dom";
import palavrasDB from "../../db/palavras";
import styles from "./AdivinhaPalavra.module.css";

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function gerarOpcoes(palavraCorreta, categoriaSelecionada) {
    if (!palavraCorreta || !categoriaSelecionada) return [];

    const banco = palavrasDB[categoriaSelecionada];
    const falsas = banco.filter((p) => p !== palavraCorreta);

    const escolhidas = embaralhar(falsas).slice(0, 4);
    return embaralhar([palavraCorreta, ...escolhidas]);
}

const AdivinhaPalavra = ({
    palavraCorreta,
    categoriaSelecionada,
    impostor,
    pontos,
    setPontos,
}) => {
    const [opcoes] = useState(() =>
        gerarOpcoes(palavraCorreta, categoriaSelecionada)
    );
    const navigate = useNavigate()
    const [escolha, setEscolha] = useState(null);
    const [resultado, setResultado] = useState("");

    const selecionar = (palavra) => {
        if (resultado) return;
        setEscolha(palavra);
    };

    const confirmar = () => {
        if (escolha === palavraCorreta) {
            setResultado("✅ ACERTOU!");

            setPontos((prev) => ({
                ...prev,
                [impostor]: (prev[impostor] || 0) + 2,
            }));
        } else {
            setResultado("❌ ERROU!");
        }

        setTimeout(() => {
            navigate("/placar")
        }, 2000)
    };

    console.log(pontos);

    return (
        <div className={styles.containerOpcoes}>
            <div className={styles.header}>
                <h1>Qual é a palavra correta?</h1>
            </div>

            <div className={styles.meio}>
                <div className={styles.opcoes}>
                    {opcoes.map((p, index) => {
                        let classe = "";

                        if (resultado) {
                            if (p === palavraCorreta) classe = styles.correta;
                            else if (p === escolha) classe = styles.errada;
                        } else if (p === escolha) {
                            classe = styles.selecionado;
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => selecionar(p)}
                                className={classe}
                                disabled={!!resultado}
                            >
                                {p}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={styles.footer}>
                {escolha && !resultado && (
                    <button className={styles.proximo} onClick={confirmar}>
                        Próximo
                    </button>
                )}

                {resultado && <h2 className={styles.resultado}>{resultado}</h2>}
            </div>
        </div>
    );
};

export default AdivinhaPalavra;
