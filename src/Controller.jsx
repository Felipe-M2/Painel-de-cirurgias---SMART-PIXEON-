import axios from "axios";

export async function CorMed(){
    try{
        const reqCor = await axios.get('http://192.168.2.121:7000/cormed');
        return reqCor.data;
    }catch(error){
        return [error];
    }
}

export async function DataCirurgias(){
    try{
        const response = await axios.get('http://192.168.2.121:7000/dados');
        return response.data;
    }catch(error){
        return [error];
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