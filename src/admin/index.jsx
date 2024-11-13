import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

import './style.css';

import ModalCor from './ModalCor.jsx';
import CadMed from './CadMed/index.jsx';

const admin = ({setAdmin}) => {

    const keyPress = (event) =>{
        if(event.key === "Shift"){
            setAdmin();
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'lastName', headerName: 'Nome', width: 230 },
        {
            field: 'age',
            headerName: 'Cor',
            alignItems: 'center',
            renderCell: (params) => (
                <div
                    onClick={() => handleColorChange(params.id)}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        cursor: 'pointer'
                    }}
                >
                    <div
                        className='color-circle'
                        style={{
                            background: params.value,
                            width: 24,
                            height: 24,
                            borderRadius: '50%'
                        }}
                    ></div>
                </div>
            )
        },
    ];

    const paginationModel = { page: 1, pageSize: 30 };

    const [data, setData] = useState([]);
    const [dataMed, setDataMed] = useState([]);

    const fetchData = async () => {
        try {
            const responseData = await axios.get("http://192.168.2.121:7000/medicos");
            setData(responseData.data)

            const responseDataMed = await axios.get("http://192.168.2.121:7000/cormed")
            setDataMed(responseDataMed.data);

            const setDataMedFunc = responseDataMed.data.map((item) => ({
                id: item.id_med,
                lastName: item.nome_med,
                age: item.cor_med
            }))

            setDataMed(setDataMedFunc)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
        window.addEventListener('keydown', keyPress);
        return()=>{
            window.removeEventListener('keydown', keyPress);
        }
    }, []);

    const [idHandle, setIdHandle] = useState();
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal)
        fetchData();
    }

    const handleColorChange = (id) => {
        handleModal()
        setIdHandle(id)
    }

    const setCor = (cor) => {
        handleModal();
        updateHandleCor(idHandle, cor)
        fetchData();
    }

    const updateHandleCor = async (id, cor)=>{
        try{
            const response = await axios.put('http://192.168.2.121:7000/updatecormed', {
                id: id,
                cor: cor
            });

        }catch(error){
            console.error(error);
        }
    }

    return (
        <section className="admin">

            {modal ? (
                <ModalCor handleModal={handleModal} setCor={setCor} />
            ) : (null)}
            <Paper sx={{ height: '80vh', width: '560px', padding: "10px" }}>
            <button className='btnRefresh' onClick={()=>fetchData()}>Refresh</button>
                <DataGrid
                    rows={dataMed}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 15, 20, 30, 40, 50]}
                    sx={{ border: 0, padding: 1 }}
                />
            </Paper>

            < CadMed />
        </section>
    )
}

export default admin;