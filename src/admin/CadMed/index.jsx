import './style.css';

import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import { useState } from 'react';
import axios from 'axios';

const CadMed = () => {

    const [crm, setCrm] = useState();
    const [medico, setMedico] = useState();
    const [status, setStatus] = useState();

    const pesquisaMed = async (crm) => {
        try {
            const response = await axios.get(`http://192.168.2.121:7000/medicos`, {
                params: { crm }
            });
            setMedico(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const cadMedCor = async()=>{
        try{
            const response = await axios.post(`http://192.168.2.121:7000/datamed`, {
                medico: medico[0].psv_apel,
                crm: crm
            })
            if(response.data.success == true){
                setCrm('')
                setMedico('')
            }
        }catch(error){
            console.error(error)
        }
    }

    return (
        <section className='cadMed'>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Digite o CRM"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    inputProps={{ 'aria-label': 'CRM' }}
                />
                <IconButton onClick={() => pesquisaMed(crm)} type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={()=>cadMedCor()} color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>

            {medico && medico.length > 0 ?(
                <div className="medList">
                    <h1>{medico[0].psv_apel}</h1>
                    <p>{medico[0].psv_crm}</p>
                </div>
            ):(
                <p>Sem resultados</p>
            )}

        </section>
    )
}

export default CadMed;