import './style.css';
import axios from 'axios';

const CardCirCon = ({ data, fetchData }) => {

    const handleDelete = async (key) =>{
        try{
            const response = await axios.delete(`http://192.168.2.121:7000/deletecon/${key}`);
            fetchData();
        }catch(error){
            console.error("Erro:" + error);
        }
    }

    return (
        <section className="cardCirCon" onClick={()=>handleDelete(data.id_pac)}>
            <div className="nomeCardCir pacCardCon">
                <p>
                    <span>Paciente:</span> 
                    {data.pac_cir}
                </p>
                
                <p>
                    <span>Convênio:</span>
                    {data.conv_cir}
                </p>
            </div>

            <div className="infoProcedimento">
                <p>
                    <span>Procedimento:</span>
                    {data.proc_cir}
                </p>
            </div>

            <div className="infoHoraCir">
                <div>
                    <p>
                        <span>Hora agendada:</span>
                        {data.hora_cir}
                    </p>
                </div>

                <div>
                    <p>
                        <span>Fim:</span>
                        {data.hora_con}
                    </p>
                </div>
            </div>

            <div className="infoMedCir">
                <div>
                    <p>
                        <span>Médico:</span>
                        {data.med_cir}
                    </p>

                    <p>
                        <span>Local:</span>
                        {data.sala_cir}
                    </p>
                </div>

                <div className='lateralidadeCirCon'>
                    {data.lateralidade}
                </div>
            </div>
        </section>
    )
}

export default CardCirCon;