import {useState, useEffect} from 'react';
import CarService from '../services/carService';

const useFetchCars = () => { 
    const [carList, setCarList] = useState([]);
    
    useEffect(() => {
        async function getData() {
            let res = await CarService.getAllCars()
            setCarList(res.data)
        }
        getData()
    }, [carList])

    return [carList, setCarList]
}

export default useFetchCars;