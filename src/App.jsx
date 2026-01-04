import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

// pages
import Home from "./pages/Home/Home.jsx";
import ChangePlayers from "./pages/ChangePlayers/ChangePlayers.jsx";
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
    const [impostor, setImpostor] = useState("");
    const [palavra, setPalavra] = useState("");
    const [perguntasRespond, setPerguntaRespond] = useState([]);
    const [pontos, setPontos] = useState({});
    const [rodadas, setRodadas] = useState(1);

    const recomeçarJogo = () => {
        if (rodadas >= 5) return;

        setPontos({});
        setImpostor("");
        setPalavra("");
        setPerguntaRespond([]);
        setCategoriaSelecionada("");
        setRodadas(1)
        

        navigate("/changeplayers");
    };

    const proximaRodada = () => {
        setImpostor("");
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
                            impostor={impostor}
                            setImpostor={setImpostor}
                            jogadores={jogadores}
                            palavra={palavra}
                            setPalavra={setPalavra}
                            categoriaSelecionada={categoriaSelecionada}
                        />
                    }
                />
                <Route
                    path="/showperguntas"
                    element={
                        <ShowPerguntas
                            jogadores={jogadores}
                            impostor={impostor}
                            categoriaSelecionada={categoriaSelecionada}
                            perguntasRespond={perguntasRespond}
                            setPerguntaRespond={setPerguntaRespond}
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
                            impostor={impostor}
                            pontos={pontos}
                            setPontos={setPontos}
                        />
                    }
                />
                <Route
                    path="/adivinha"
                    element={
                        <AdivinhaPalavra
                            palavraCorreta={palavra}
                            categoriaSelecionada={categoriaSelecionada}
                            impostor={impostor}
                            pontos={pontos}
                            setPontos={setPontos}
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
