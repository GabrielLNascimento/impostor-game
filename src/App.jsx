import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/Home.jsx";
import ChangePlayers from "./pages/ChangePlayers/ChangePlayers.jsx";
import ConfigGame from "./pages/ConfigGame/ConfigGame.jsx";
import ChangeCategoria from "./pages/ChangeCategoria/ChangeCategoria.jsx";
import ShowStatus from "./pages/ShowStatus/ShowStatus.jsx";
import ShowPerguntas from "./pages/ShowPerguntas/ShowPerguntas.jsx";
import Discussao from "./pages/Discussao/Discussao.jsx";
import Votacao from "./pages/Votacao/Votacao.jsx";
import AdivinhaPalavra from "./pages/AdivinhaPalavra/AdivinhaPalavra.jsx";
import Placar from "./pages/Placar/Placar.jsx";

const App = () => {
    const navigate = useNavigate();
    const [jogadores, setJogadores] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [impostores, setImpostores] = useState([]);
    const [palavra, setPalavra] = useState("");
    const [perguntasRespond, setPerguntaRespond] = useState([]);
    const [pontos, setPontos] = useState({});
    const [rodadas, setRodadas] = useState(1);
    const [qtdImpostores, setQtdImpostores] = useState(1);
    const [qtdPerguntas, setQtdPerguntas] = useState(2);

    const recomeçarJogo = () => {
        if (rodadas >= 5) return;

        setPontos({});
        setImpostores([]);
        setPalavra("");
        setPerguntaRespond([]);
        setCategoriaSelecionada("");
        setRodadas(1);

        navigate("/changeplayers");
    };

    const proximaRodada = () => {
        setImpostores([]);
        setPalavra("");
        setPerguntaRespond([]);
        setCategoriaSelecionada("");
        setRodadas((prev) => prev + 1);

        navigate("/changecategoria");
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/changeplayers"
                    element={
                        <ChangePlayers
                            jogadores={jogadores}
                            setJogadores={setJogadores}
                            setPontos={setPontos}
                        />
                    }
                />
                <Route
                    path="/config"
                    element={
                        <ConfigGame
                            jogadores={jogadores}
                            qtdImpostores={qtdImpostores}
                            setQtdImpostores={setQtdImpostores}
                            qtdPerguntas={qtdPerguntas}
                            setQtdPerguntas={setQtdPerguntas}
                        />
                    }
                />
                <Route
                    path="/changecategoria"
                    element={
                        <ChangeCategoria
                            categoriaSelecionada={categoriaSelecionada}
                            setCategoriaSelecionada={setCategoriaSelecionada}
                        />
                    }
                />
                <Route
                    path="/showstatus"
                    element={
                        <ShowStatus
                            impostores={impostores}
                            setImpostores={setImpostores}
                            jogadores={jogadores}
                            palavra={palavra}
                            setPalavra={setPalavra}
                            categoriaSelecionada={categoriaSelecionada}
                            qtdImpostores={qtdImpostores}
                        />
                    }
                />
                <Route
                    path="/showperguntas"
                    element={
                        <ShowPerguntas
                            jogadores={jogadores}
                            categoriaSelecionada={categoriaSelecionada}
                            perguntasRespond={perguntasRespond}
                            setPerguntaRespond={setPerguntaRespond}
                            qtdPerguntas={qtdPerguntas}
                        />
                    }
                />
                <Route
                    path="/discussao"
                    element={
                        <Discussao
                            perguntasRespond={perguntasRespond}
                            jogadores={jogadores}
                        />
                    }
                />
                <Route
                    path="/votacao"
                    element={
                        <Votacao
                            jogadores={jogadores}
                            impostores={impostores}
                            pontos={pontos}
                            setPontos={setPontos}
                            qtdImpostores={qtdImpostores}
                        />
                    }
                />
                <Route
                    path="/adivinha"
                    element={
                        <AdivinhaPalavra
                            palavraCorreta={palavra}
                            categoriaSelecionada={categoriaSelecionada}
                            impostores={impostores}
                            pontos={pontos}
                            setPontos={setPontos}
                            jogadores={jogadores}
                        />
                    }
                />
                <Route
                    path="/placar"
                    element={
                        <Placar
                            jogadores={jogadores}
                            pontos={pontos}
                            rodadas={rodadas}
                            recomeçarJogo={recomeçarJogo}
                            proximaRodada={proximaRodada}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default App;
