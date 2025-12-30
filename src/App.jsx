import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// pages
import Home from "./pages/Home/Home.jsx";
import ChangePlayers from "./pages/ChangePlayers/ChangePlayers.jsx";
import ChangeCategoria from "./pages/ChangeCategoria/ChangeCategoria.jsx";

const App = () => {
    const [jogadores, setJogadores] = useState([]);
    // const [categoria, setCategoria] = useState("")

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/changeplayers"
                    element={<ChangePlayers jogadores={jogadores} setJogadores={setJogadores} />}
                />
                <Route
                    path="/changecategoria"
                    element={<ChangeCategoria />}
                />
            </Routes>
        </>
    );
};

export default App;
