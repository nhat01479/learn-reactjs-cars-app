import React, {useState} from 'react';
import useFetchBranch from '../../hooks/useFetchBranches';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import CarService from '../../services/carService';
import useFetchCars from '../../hooks/useFetchCars';

const schema = yup.object({
    name: yup.string().min(6, "Ít nhất 6 ký tự").max(20, "Tối đa 20 ký tự").required("Vui lòng nhập tên xe"),
    color: yup.string().required('Vui lòng nhập màu sắc'),
    avatar: yup.string().required('Vui lòng nhập url ảnh'),
    price: yup.number().min(10).max(1000).required('Vui lòng nhập giá').typeError('Giá từ 10 tới 1000'),
    description: yup.string().required('Vui lòng nhập mô tả')

})

function CarCreate(props) {
    const { showModal, showModalCreate, closeModal } = props;
    const branchList = useFetchBranch();
    const navigate = useNavigate();
    const [carList, setCarList] = useFetchCars();

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const handleCloseModal = () => {
        reset()
        closeModal()
    }
    const handleCreate = async (data) => {
        console.log(data);
        data = {
            ...data,
            branches: JSON.parse(data.branches)
        }
        let createRes = await CarService.create(data);
        let newCar =await createRes.data;
        setCarList([
            ...carList, newCar
        ])

        if(createRes && createRes.data){
            // navigate('/')
                toast.success(`Bạn vừa thêm xe mới vào BST: ${createRes?.data?.name}`);
            closeModal()
        }
    }

    return (
        <> 
            <div id="create-post-modal" className="modal faded  " tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal Create</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(handleCreate)} >
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label className="fw-bold">Name</label>
                                        <input type="text" className="form-control" {...register('name')}/>
                                        <span className="text-danger">{errors?.name?.message}</span>
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="fw-bold">Color</label>
                                        <input type="text" className="form-control" {...register('color')}/>
                                        <span className="text-danger">{errors?.color?.message}</span>
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="fw-bold">Price</label>
                                        <input type="text" className="form-control" {...register('price')}/>
                                        <span className="text-danger">{errors?.price?.message}</span>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label className="fw-bold">Branch</label>
                                        <select className='form-select' {...register("branches")}>
                                            {
                                                branchList?.map((branch) => (
                                                    <option key={branch.id} value={JSON.stringify(branch)}>{branch.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-4">
                                        <label className="fw-bold">Description</label>
                                        <input type="text" className="form-control" {...register('description')}/>
                                        <span className="text-danger">{errors?.description?.message}</span>

                                    </div>
                                    <div className="col-lg-4">
                                        <label className="fw-bold">AvatarURL</label>
                                        <input type="text" className="form-control" {...register('avatar')}/>
                                        <span className="text-danger">{errors?.avatar?.message}</span>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                    <button type="submit" className="btn btn-primary" >Create new Car</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default CarCreate;