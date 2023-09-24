import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import CarService from '../../services/carService';
import useFetchBranch from './../../hooks/useFetchBranches';
import noAvatar from '../../assets/images/noAvatar.png'
import FileService from '../../services/fileService';

const schema = yup.object({
    name: yup.string().min(6, "Ít nhất 6 ký tự").max(20, "Tối đa 20 ký tự").required("Vui lòng nhập tên xe"),
    color: yup.string().required('Vui lòng nhập màu sắc'),
    price: yup.number().min(10).max(1000).required('Vui lòng nhập giá').typeError('Giá từ 10 tới 1000'),
    description: yup.string().required('Vui lòng nhập mô tả')

})

function CarCreate(props) {
    const { carList, setCarList, showModal, showModalCreate, closeModal } = props;

    const branchList = useFetchBranch();
    const [uploading, setUploading] = useState(false); //spinner
    const [uploadedImg, setUploadedImg] = useState()
    const [selectImg, setSelectImg] = useState({
        file: null,
        tempUrl: ''
    })

    const navigate = useNavigate();

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
            branches: JSON.parse(data.branches),
            avatar: uploadedImg.url || ''
        }
        let createRes = await CarService.create(data);


        if (createRes && createRes.data) {

            toast.success(`Bạn vừa thêm xe mới vào BST: ${createRes?.data?.name}`, {
                autoClose: 2000
            });
            closeModal()
            navigate('/')
            setCarList([
                ...carList,
                createRes.data
            ])
            reset()
            setSelectImg({
                file: null,
                tempUrl: ''
            })

        }

    }

    const handleSelectImg = (e) => {
        const tempImageUrl = URL.createObjectURL(e.target.files[0]);
        setSelectImg({
            file: e.target.files[0],
            tempUrl: tempImageUrl
        })
    }

    const handleUploadImage = async () => {
        if (selectImg.file) {
            setUploading(true);
            const uploadResult = await FileService.uploadImage(selectImg.file);
            if (uploadResult?.data && Object.keys(uploadResult?.data).length) {
                setUploadedImg(uploadResult?.data)
                console.log(uploadResult?.data);
                toast.info('Upload ảnh thành công', { position: 'top-right', autoClose: 2000 })
                setUploading(false);
            }
        } else {
            toast.con
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
                                    <div className='col-7'>
                                        <div className='row col-12'>
                                            <div className="col-lg-6">
                                                <label className="fw-bold my-4">Name</label>
                                                <input type="text" className="form-control" {...register('name')} />
                                                <span className="text-danger">{errors?.name?.message}</span>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="fw-bold my-4">Color</label>
                                                <input type="text" className="form-control" {...register('color')} />
                                                <span className="text-danger">{errors?.color?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row col-12">
                                            <div className="col-lg-6">
                                                <label className="fw-bold my-4">Price</label>
                                                <input type="text" className="form-control" {...register('price')} />
                                                <span className="text-danger">{errors?.price?.message}</span>
                                            </div>
                                            <div className="col-lg-6">
                                                <label className="fw-bold my-4">Branch</label>
                                                <select className='form-select' {...register("branches")}>
                                                    {
                                                        branchList?.map((branch) => (
                                                            <option key={branch.id} value={JSON.stringify(branch)}>{branch.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className='row col-12'>
                                            <div className="col-lg-12">
                                                <label className="fw-bold my-4">Description</label>
                                                <input type="text" className="form-control" {...register('description')} />
                                                <span className="text-danger">{errors?.description?.message}</span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-5'>
                                        <div className="col-lg-12">
                                            <img
                                                src={selectImg.tempUrl || noAvatar} role='button' alt="" style={{ width: '300px', height: '300px' }}
                                                onClick={() => document.getElementById('imgUpload').click()} />
                                            <div className='d-grid gap-2 mt-2'>
                                                {
                                                    uploading ? (
                                                        <button className="btn btn-sm btn-dark" type="button" disabled="">
                                                            <span
                                                                className="spinner-border spinner-border-sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                            Uploading...
                                                        </button>
                                                    ) : (
                                                        <button onClick={handleUploadImage}
                                                            type='button' className="btn btn-secondary"
                                                        >Upload</button>
                                                    )
                                                }
                                                <input onChange={handleSelectImg}
                                                    type="file" accept='image/*' className="form-control d-none" id='imgUpload'
                                                />
                                            </div>

                                        </div>
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