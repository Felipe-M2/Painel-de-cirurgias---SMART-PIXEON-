import './style.css';

import { useState, useEffect } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { IndiceMedDia } from '../../Controller';

const ModalIndice = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await IndiceMedDia();
            setData(data);
        }

        fetchData();
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        justifyContent: 'space-between',
        fontSize: '1.2rem',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    return (
        <section className="ModalIndice">
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Item>
                        Médico visitante
                        <div className="corMed" style={{width: '50px', height: '50px', background: '#fff'}}></div>
                    </Item>
                    {data.map((item, index)=>(
                        <Item key={index}
                            style={{cursor: 'pointer'}}
                        >
                            {item.nome}
                            <div 
                                className="corMed" 
                                style={
                                    {width: '50px', 
                                    height: '50px', 
                                    background: item.cor,
                                    borderRadius: '50%'
                                    }
                                }></div>
                        </Item>
                    ))}
                </Stack>
            </Box>
        </section>
    )
}

export default ModalIndice;