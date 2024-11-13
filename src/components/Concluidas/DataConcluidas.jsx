import { useState, useEffect } from "react";

const DataConcluidas = ()=>{

    const [data, setData] = useState([]);

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


    return data;
}

export default DataConcluidas;