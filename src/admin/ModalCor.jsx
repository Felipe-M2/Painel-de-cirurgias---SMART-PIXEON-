const ModalCor = ({handleModal, setCor}) => {
    const cores = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF5",
        "#F5FF33", "#8E33FF", "#33FF8E", "#FF8E33", "#33A1FF",
        "#A1FF33", "#5733FF", "#FF3357", "#57FF33", "#338EFF",
        "#A133FF", "#FF33F5", "#57A1FF", "#FFA133", "#33FFB2",
        "#B233FF", "#33FFD2", "#D2FF33", "#FF33B2", "#FFD233",
        "#FF57A1", "#57FFD2", "#D233FF", "#33FFA1", "#A1D233",
        "#FF8EB2", "#8EFF33", "#33D2FF", "#A133D2", "#FFD2A1",
        "#D2A1FF", "#A1FFD2", "#8E57FF", "#57FFA1", "#A1B233",
        "#F5A1FF", "#FF8E57", "#B2FF8E", "#8EFFA1", "#A1FFB2",
        "#57A1D2", "#D2A1B2", "#33A1D2", "#FFD2A1", "#A1D2FF",
        "#A157FF", "#8EFFD2", "#FFD2B2", "#D2A157", "#33FFA8",
        "#B2FFA1", "#FF33D2", "#D2A1FF", "#FF57B2", "#8E33D2",
        "#D2FF33", "#FFB233", "#A1D2B2", "#B2A1FF", "#FF338E",
        "#33B2FF", "#D2A1D2", "#FFD28E", "#8EFFA1", "#D2A8FF",
        "#FFD233", "#A1FF57", "#8E33A1", "#A1FF8E", "#33FF8E",
        "#D2FF8E", "#FFD2FF", "#8E57A1", "#FF57B2", "#57D2FF",
        "#FF8E33", "#A1FF33", "#D2B2FF", "#33FFA1", "#FF338E"
    ]
    

    return (
        <section className="modal">
            <button onClick={handleModal}>Fechar</button>
            <div>
                {cores.map((cor) => (
                    <div
                        onClick={()=>setCor(cor)}
                        className="cardCor"
                        style={{ background: cor }}
                    ></div>
                ))}
            </div>
        </section>
    )
}

export default ModalCor;