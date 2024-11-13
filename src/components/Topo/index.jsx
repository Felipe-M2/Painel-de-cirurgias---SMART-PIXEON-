import './style.css';

import Logo from '../../assets/logover.svg';
import { useEffect, useState } from 'react';

const Topo = ({ handlePage, handleOpen }) => {

    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setHora(new Date()), 1000);

        return () => clearInterval(timerId);
    })

    const time = hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const data = hora.toLocaleDateString();

    return (
        <section className="topo">
            <div>
                <div className="logo" onClick={handlePage}>
                    <img src={Logo} alt="Logo do Hospital de olhos VER!" />
                </div>

                <button className='btnIndice' onClick={handleOpen}>Indice</button>

                <div>
                    VER Excelência em oftalmologia - PRIME
                </div>

                <div className="hora">
                    <span>{data}</span>
                    <h1>{time}</h1>
                </div>
            </div>
        </section>
    )
}

export default Topo;