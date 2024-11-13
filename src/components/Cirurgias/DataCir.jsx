import axios from "axios";
import { useEffect, useState } from "react";

const DataCir = () => {

    const [data, setData] = useState(null);

    // const data = [
    //     {
    //         lateralidade: 'OD',
    //         nome: 'Nome do paciente',
    //         idade: 7,
    //         hora: '07:00',
    //         procedimento: 'estrabismo',
    //         local: 'Sala 1',
    //         conv: 'Unimed',
    //         medico: 'Dr. Teste',
    //         decricao: 'Observação: dr lucas farias UNIMED/APTO estrabismo ciclovertical ao estrabismo horizontal ao ANESTESIA GERAL CAUTERIO BIPOLAR VICRYL 6-0 7 anos / GUIA OK VAL: 13/09 Ch: 9:15 In: 10:15 ag paulo 05/03'
    //     },
    //     {
    //         lateralidade: 'OD',
    //         nome: 'Nome do paciente',
    //         idade: 7,
    //         hora: '07:00',
    //         procedimento: 'estrabismo',
    //         local: 'Sala 2',
    //         conv: 'Unimed',
    //         medico: 'Dr. Teste',
    //         decricao: 'Observação: dr lucas farias UNIMED/APTO estrabismo ciclovertical ao estrabismo horizontal ao ANESTESIA GERAL CAUTERIO BIPOLAR VICRYL 6-0 7 anos / GUIA OK VAL: 13/09 Ch: 9:15 In: 10:15 ag paulo 05/03'
    //     },
    //     {
    //         lateralidade: 'OD',
    //         nome: 'Nome do paciente',
    //         idade: 7,
    //         hora: '07:00',
    //         procedimento: 'estrabismo',
    //         local: 'Sala 3',
    //         conv: 'Unimed',
    //         medico: 'Dr. Teste',
    //         decricao: 'Observação: dr lucas farias UNIMED/APTO estrabismo ciclovertical ao estrabismo horizontal ao ANESTESIA GERAL CAUTERIO BIPOLAR VICRYL 6-0 7 anos / GUIA OK VAL: 13/09 Ch: 9:15 In: 10:15 ag paulo 05/03'
    //     },
    //     {
    //         lateralidade: 'OD',
    //         nome: 'Nome do paciente',
    //         idade: 7,
    //         hora: '07:00',
    //         procedimento: 'estrabismo',
    //         local: 'Sala 3',
    //         conv: 'Unimed',
    //         medico: 'Dr. Teste',
    //         decricao: 'Observação: dr lucas farias UNIMED/APTO estrabismo ciclovertical ao estrabismo horizontal ao ANESTESIA GERAL CAUTERIO BIPOLAR VICRYL 6-0 7 anos / GUIA OK VAL: 13/09 Ch: 9:15 In: 10:15 ag paulo 05/03'
    //     },
    //     {
    //         lateralidade: 'OD',
    //         nome: 'Nome do paciente',
    //         idade: 7,
    //         hora: '07:00',
    //         procedimento: 'estrabismo',
    //         local: 'Sala 3',
    //         conv: 'Unimed',
    //         medico: 'Dr. Teste',
    //         decricao: 'Observação: dr lucas farias UNIMED/APTO estrabismo ciclovertical ao estrabismo horizontal ao ANESTESIA GERAL CAUTERIO BIPOLAR VICRYL 6-0 7 anos / GUIA OK VAL: 13/09 Ch: 9:15 In: 10:15 ag paulo 05/03'
    //     },
    //     {
    //         lateralidade: 'OD',
    //         nome: 'Nome do paciente',
    //         idade: 7,
    //         hora: '07:00',
    //         procedimento: 'estrabismo',
    //         local: 'Sala 3',
    //         conv: 'Unimed',
    //         medico: 'Dr. Teste',
    //         decricao: 'Observação: dr lucas farias UNIMED/APTO estrabismo ciclovertical ao estrabismo horizontal ao ANESTESIA GERAL CAUTERIO BIPOLAR VICRYL 6-0 7 anos / GUIA OK VAL: 13/09 Ch: 9:15 In: 10:15 ag paulo 05/03'
    //     }
    // ]

    useEffect(() => {
        const fetchData = async()=>{
            try{
                const response = await axios.get('http://192.168.2.121:7000/dados')
                setData(response.data);
            }catch(error){
                console.log(error);
            }
        }

        fetchData()
    }, [])

    console.log(data);

    return data;

}

export default DataCir;