import styles from "./ChangeCategoria.module.css";
import categorias from "../../db/categorias";

import ButtonNext from "../../components/ButtonNext/ButtonNext";

const ChangeCategoria = ({ categoriaSelecionada, setCategoriaSelecionada }) => {
    return (
        <>
            <h1>Escolha a Categoria</h1>

            <div className={styles.container}>
                {categorias.map((cat) => (
                    <span
                        key={cat}
                        onClick={() => setCategoriaSelecionada(cat)}
                        className={`${styles.card} ${
                            categoriaSelecionada === cat ? styles.active : ""
                        }`}
                    >
                        {cat}
                    </span>
                ))}
            </div>

            {categoriaSelecionada.length > 0 && (
                <ButtonNext to="/showstatus" text="Próximo" />
            )}
        </>
    );
};

export default ChangeCategoria;
