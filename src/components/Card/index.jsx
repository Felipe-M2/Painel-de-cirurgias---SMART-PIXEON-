import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

const Card = ({ dados, updateData }) => {

    const horaFormatada = new Date(dados.AGM_HINI);
    const hora = horaFormatada.getUTCHours().toString().padStart(2, '0');
    const minutos = horaFormatada.getUTCMinutes().toString().padStart(2, '0');
    const formatada = `${hora}:${minutos}`

    const [menuCir, setMenuCir] = useState('hidden');

    const handleMenuCir = () => {
        if (menuCir === 'hidden') {
            setMenuCir('visible');
        } else {
            setMenuCir('hidden');
        }
    }

    const [horaAtual, setHoraAtual] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setHoraAtual(new Date()), 1000);

        return () => clearInterval(timerId);
    })

    function funDataSQL(){
        const ano = horaAtual.getFullYear();
        const mes = String(horaAtual.getMonth() + 1).padStart(2, '0');
        const dia = String(horaAtual.getDate()).padStart(2, '0');

        return `${ano}/${mes}/${dia}`
    }

    const dataSQL = funDataSQL();

    const time = horaAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const replaceUndefinedWithNull = (value) => value === undefined ? null : value;

    const dataCirCon = {
        hora_cir: replaceUndefinedWithNull(formatada),
        id_pac: replaceUndefinedWithNull(dados.AGM_PAC),
        pac_cir: replaceUndefinedWithNull(dados.PAC_NOME),
        idade: replaceUndefinedWithNull(dados.COMPUTE004),
        proc_cir: replaceUndefinedWithNull(dados.SMK_ROT),
        lateralidade: replaceUndefinedWithNull(dados.AGM_IND_OLHO),
        med_cir: replaceUndefinedWithNull(dados.PSV_APEL),
        med_aux: replaceUndefinedWithNull(dados.medicoauxiliar),
        conv_cir: replaceUndefinedWithNull(dados.CNV_NOME_CM),
        sala_cir: replaceUndefinedWithNull(dados.LOC_NOME),
        hora_con: replaceUndefinedWithNull(time),
        data: dataSQL,
    };

    const [isClosed, setIsClosed] = useState(false);

    const handleConCir = async (event) => {
        event.preventDefault();

        setIsClosed(true);

        try {
            const response = await axios.post('http://192.168.2.121:7000/cirpainel', dataCirCon);
            updateData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section 
            key={dados.AGM_ID} 
            className={`card ${isClosed ? 'close' : ''}`}
            onClick={handleMenuCir}
            style={{border: dados?.corBorda ? `1px solid ${dados.corBorda}` : "1px solid #fff"}}
        >
            <div className="lateralidade">
                {dados.AGM_IND_OLHO}
            </div>

            <h1 className='nomePac'>{dados.PAC_NOME}</h1>
            <h1 className='idade'>{dados.COMPUTE004} Anos</h1>
            <span>{formatada} - {dados.SMK_ROT}</span>
            <p>{dados.LOC_NOME}</p>
            <h1 className='conv'>{dados.CNV_NOME_CM}</h1>
            <div className='medico'>
                <h1>{dados.PSV_APEL}</h1>
                <h1>{dados.medicoauxiliar}</h1>
            </div>

            {
                dados.AGM_OBS.length > 0 && (
                    <p className='decricao'>{dados.AGM_OBS}</p>
                )
            }

            <section
                className="menuCirOp"
                style={{ visibility: menuCir }}
            >
                {/* <button>Em Cirurgia</button> */}
                <button onClick={handleConCir}>Concluida</button>
                <button className='btnVoltar' onClick={() => handleMenuCir}>Voltar</button>
            </section>
        </section>
    )
}

export default Card;