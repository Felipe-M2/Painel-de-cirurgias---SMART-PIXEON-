import './style.css';

import { useState, useEffect } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { CorMed } from '../../Controller';

const ModalIndice = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await CorMed();
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
                    {data.map((item, index)=>(
                        <Item key={index}
                            style={{cursor: 'pointer'}}
                        >
                            {item.nome_med}
                            <div className="corMed" style={{width: '50px', height: '50px', background: item.cor_med}}></div>
                        </Item>
                    ))}
                </Stack>
            </Box>
        </section>
    )
}

export default ModalIndice;