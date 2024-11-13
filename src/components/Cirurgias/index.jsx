import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import Card from '../Card/index';

const Cirurgias = ({setAdmin}) => {
    const [data, setData] = useState([]);
    const [idCon, setIdCon] = useState([]);
    const [cor, setCor] = useState([]);
    const [loadingCor, setLoadingCor] = useState(true);
    const [loadingData, setLoadingData] = useState(true);

    const fetchDataCor = async () => {
        try {
            const reqCor = await axios.get('http://192.168.2.121:7000/cormed');
            setCor(reqCor.data);
        } catch (error) {
            console.error("Error fetching colors:", error);
        } finally {
            setLoadingCor(false);
        }
    };

    const keyPress = (event) =>{
        if(event.key === "Shift"){
            setAdmin();
        }
    };

    const fetchData = async () => {
        try {
            const responseId = await axios.get('http://192.168.2.121:7000/circonidpac');
            const ids = responseId.data.map(item => item.id_pac);

            const responseData = await axios.get('http://192.168.2.121:7000/dados');
            const filteredData = responseData.data.filter(dataCard =>
                !ids.includes(dataCard.AGM_PAC)
            );

            const processedData = filteredData.reduce((acc, item) => {
                if (acc[item.AGM_ID]) {
                    if (item.AGM_OBS && !acc[item.AGM_ID].AGM_OBS) {
                        item.SMK_ROT = `${acc[item.AGM_ID].SMK_ROT} / ${item.SMK_ROT}`;
                        acc[item.AGM_ID] = { ...item };
                    } else {
                        acc[item.AGM_ID].SMK_ROT += ` / ${item.SMK_ROT}`;
                        acc[item.AGM_ID].AGM_OBS += ` /--/ ${item.AGM_OBS}`;
                    }
                } else {
                    acc[item.AGM_ID] = { ...item };
                }
                return acc;
            }, {});

            const finalData = Object.values(processedData)
                .sort((a, b) => new Date(a.AGM_HINI) - new Date(b.AGM_HINI))
                .map(dataCard => {
                    const match = cor.find(corMed => corMed.nome_med.trim() === dataCard.PSV_APEL.trim());
                    return match ? { ...dataCard, corBorda: match.cor_med } : dataCard;
                });

            setIdCon(ids);
            setData(finalData);
        } catch (error) {
            console.error("Error fetching surgery data:", error);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        fetchDataCor();
        const interval = setInterval(() => fetchDataCor(), 1000);

        window.addEventListener('keydown', keyPress);
        return()=>{
            window.removeEventListener('keydown', keyPress);
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (!loadingCor) {
            fetchData();
            const interval = setInterval(() => fetchData(), 10000);
            return () => clearInterval(interval);
        }
    }, [loadingCor]);

    const updateData = () => {
        setTimeout(()=> fetchData(), 400);
    }

    return (
        <section className="cirurgias">
            {['PRIME - SALA 01     ', 'PRIME - SALA 02     ', 'PRIME - SALA 03     ', 'PRIME - SALA 04     ', 'PRIME - SALA 05     ', 'PRIME - SALA 06     ', 'PRIME - SUITE ZEISS '].map((sala, index) => (
                <div className="salaNome" key={index}>
                    <h1 className='tituloSala'>{sala.replace('PRIME -', '')}</h1>
                    <div className="cardCir">
                        {data.filter(dataCard => dataCard.LOC_NOME === sala).map((dataCard) => (
                            <Card
                                key={dataCard.AGM_ID} 
                                dados={dataCard} 
                                updateData={updateData}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Cirurgias;
