import axios from "axios";
import { useState } from "react";

let medCirDia = [];
let corMedCirDia = [];

export async function CorMed(){
    try{
        const reqCor = await axios.get('http://192.168.2.121:7000/cormed');
        corMedCirDia = reqCor.data;
        return reqCor.data;
    }catch(error){
        return [error];
    }
}

export async function IndiceMedDia(){
    const medicos = [...new Set(medCirDia)];
    const newArrayMed = [];
    
    corMedCirDia.map((item)=>{
        if(medicos.includes(item.nome_med)){
            newArrayMed.push({nome: item.nome_med, cor: item.cor_med});
        }
    })

    return newArrayMed;
}

export async function DataCirurgias(){
    try{
        const response = await axios.get('http://192.168.2.121:7000/dados');
        const newMed = response.data.map((med)=>med.PSV_APEL);
        medCirDia = [...newMed];
        return response.data;
    }catch(error){
        console.error(error)
    }
}

export async function IdCirCon(){
    try{
        const response = await axios.get('http://192.168.2.121:7000/circonidpac');
        return response.data;
    }catch(error){
        return[error];
    }
}

