import { useEffect, useState } from 'react';
import useFetchCars from '../../hooks/useFetchCars';
import { Link } from 'react-router-dom';
import CarCreate from './CarCreate';
import axios from 'axios';
import CarDetail from './CarDetail';
import CarService from '../../services/carService';

function CarList() {
    const [carList, setCarList] = useState([]);
// const [carList, setCarList] = useFetchCars();

    useEffect(() => {
        async function getData() {
            let res = await axios.get('https://64e707a3b0fd9648b78f379b.mockapi.io/car?search=&sortBy=id&order=desc');
            let carListData = await res.data;
            setCarList(carListData);

        }
        getData()
    },[carList])


    const [showModal, setShowModal] = useState(false);

    const showModalCreate = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleShowCarDetail = (id) => {
        setShowModal(true);
    }

    return (
        <>
            <CarCreate showModal={showModal} showModalCreate={showModalCreate} closeModal={closeModal} />
            {/* <CarDetail  showModal={showModal} showModalCreate={showModalCreate} closeModal={closeModal} /> */}
            <section>
                <div className='container'>
                    <div className="d-flex justify-content-between align-self-center">
                        <div>
                            <button className="btn btn-outline-primary m-3" onClick={showModalCreate}>
                                <i className="fas fa-plus"  /> New Car
                            </button>
                        </div>
                        <div className="m-3" style={{ height: '30px' }}>
                            <form>
                                <div className="container-search d-flex">
                                    <div className="d-flex " style={{ border: '1px solid lightgrey', borderRadius: '5px' }}>
                                        <input type="search" name="keyword"
                                            width="300px" className="form-control" />
                                        <button type="button" className="btn btn-outline-success"  >
                                            <i className="fas fa-search" /></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='container '>
                    <div className='row'>

                        {
                            carList?.map((car) => (
                                <div key={car.id} className='col-sm-3 my-3'>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img src={car.avatar} className="card-img-top" style={{width: '286px', height: '286px'}} alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{car.name}</h5>
                                            <p>{car.description}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{car.color}</li>
                                            <li className="list-group-item">{car.price}</li>
                                            <li className="list-group-item">{car.branches.name}</li>
                                        </ul>
                                        <div className="card-body">
                                            <button type='button' onClick={() => handleShowCarDetail(car.id)} className="card-link">View Detail</button>
                                            <button type='button' className="card-link">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                </div>
            </section>
        </>
    );
}

export default CarList;