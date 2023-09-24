import { useEffect, useState } from 'react';
import CarCreate from './CarCreate';
import axios from 'axios';
import CarService from '../../services/carService';
import { toast } from 'react-toastify';
import { CARS_API_URL } from '../../services/common';

function CarList() {
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        async function getData() {
            let res = await axios.get(CARS_API_URL);
            let carListData = await res.data;
            setCarList(carListData);
        }
        // getData()
        const timer = setTimeout(() => {
            getData();
        }, 1000);

        return () => clearTimeout(timer);
    }, [])



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
    const handleDelete = async (id) => {

        let carDelete = await CarService.deleteCar(id)

        if (carDelete) {
            toast.success(`Bạn vừa thêm xoá ${carDelete?.name} khỏi BST`, {
                autoClose: 2000
            });
        }
        let newCarList = carList.filter(car => car.id !== id);
        setCarList(newCarList);
    }

    return (
        <>
            <CarCreate carList={carList} setCarList={setCarList} showModal={showModal} showModalCreate={showModalCreate} closeModal={closeModal} />
            {/* <CarDetail  showModal={showModal} showModalCreate={showModalCreate} closeModal={closeModal} /> */}
            <section>
                <div className='container'>
                    <div className="d-flex justify-content-between align-self-center">
                        <div>
                            <button className="btn btn-outline-primary m-3" onClick={showModalCreate}>
                                <i className="fas fa-plus" /> New Car
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
                                        <img src={car.avatar} className="card-img-top" style={{ width: '286px', height: '286px' }} alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{car.id}. {car.name}</h5>
                                            <p>{car.description}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">{car.color}</li>
                                            <li className="list-group-item">{car.price}</li>
                                            <li className="list-group-item">{car.branches.name}</li>
                                        </ul>
                                        <div className="card-body">
                                            <button type='button' onClick={() => handleShowCarDetail(car.id)} className="card-link">View Detail</button>
                                            <button type='button' className="card-link" onClick={() => handleDelete(car.id)}>Delete</button>
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