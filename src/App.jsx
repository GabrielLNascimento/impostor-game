import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// pages
import Home from "./pages/Home/Home.jsx";
import ChangePlayers from "./pages/ChangePlayers/ChangePlayers.jsx";
import ChangeCategoria from "./pages/ChangeCategoria/ChangeCategoria.jsx";
import ShowStatus from "./pages/ShowStatus/ShowStatus.jsx";
import ShowPerguntas from "./pages/ShowPerguntas/ShowPerguntas.jsx";
import Discussao from "./pages/Discussao/Discussao.jsx";
import Votacao from "./pages/Votacao/Votacao.jsx";

const App = () => {
    const [jogadores, setJogadores] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [impostor, setImpostor] = useState("");
    const [palavra, setPalavra] = useState("");
    const [perguntasRespond, setPerguntaRespond] = useState([]);

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
                    element={<Votacao jogadores={jogadores} impostor={impostor} />}
                />
            </Routes>
        </>
    );
};

export default App;
