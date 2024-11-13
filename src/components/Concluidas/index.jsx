import './style.css';
import DataConcluidas from "./DataConcluidas";
import { useEffect, useState } from 'react';
import CardCirCon from './cardCirCon';
import axios from 'axios';

const Concluidas = ()=>{

    const [data, setData] = useState([]);

    const fetchData = async()=>{
        try{
            const response = await axios.get('http://192.168.2.121:7000/dadosmodal')
            setData(response.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <section className="concluidas">

            <div className='tituloCirCon'>
                <h1>Registro de cirurgias concluidas</h1>
            </div>

            {data.map((cir)=>(
                <CardCirCon data={cir} fetchData={fetchData}/>
            ))}
        </section>
    )
}

export default Concluidas;