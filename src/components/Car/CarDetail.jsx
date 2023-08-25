import React from 'react';

function CarDetail(props) {
    const {carr, showModal, showModalCreate, closeModal} = props;
    return (
        <>
            <div id="create-post-modal" className="modal faded  " tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Car Detail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal} />
                        </div>
                        <div className="modal-body">

                            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src='...' className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">123</h5>
                                            <p className="card-text"></p>
                                            <p className="card-text"></p>
                                            <p className="card-text"></p>
                                            {/* <p className="card-text">{car.branches.name}</p> */}
                                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default CarDetail;