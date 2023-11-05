import React, { useState } from "react";
import useFetchBranch from "../../hooks/useFetchBranches";
import Spinner from "react-bootstrap/Spinner";

function CarDetail(props) {
	const { showModalDetail, setShowModalDetail, carSingle, uploading } = props;
	const branchList = useFetchBranch();

	return (
		<>
			<div
				className="modal faded  "
				tabIndex={-1}
				style={{ display: showModalDetail ? "block" : "none" }}
			>
				<div className="modal-dialog modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Modal Detail</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => setShowModalDetail(false)}
							/>
						</div>
						<div className="modal-body">
							<form>
								<div className="row mb-3">
									<div className="col-7">
										<div className="row col-12">
											<div className="col-lg-6">
												<label className="fw-bold my-4">Name</label>
												<input
													type="text"
													className="form-control"
													// {...register("name")}
													value={carSingle?.name}
												/>
												<span className="text-danger">
													{/* {errors?.name?.message} */}
												</span>
											</div>
											<div className="col-lg-6">
												<label className="fw-bold my-4">Color</label>
												<input
													type="text"
													className="form-control"
													value={carSingle?.color}
													// {...register("color")}
												/>
												<span className="text-danger">
													{/* {errors?.color?.message} */}
												</span>
											</div>
										</div>
										<div className="row col-12">
											<div className="col-lg-6">
												<label className="fw-bold my-4">Price</label>
												<input
													type="text"
													className="form-control"
													value={carSingle?.price}
													// {...register("price")}
												/>
												<span className="text-danger">
													{/* {errors?.price?.message} */}
												</span>
											</div>
											<div className="col-lg-6">
												<label className="fw-bold my-4">Branch</label>
												<select
													className="form-select"
													// {...register("branches")}
												>
													{branchList?.map((branch) => {
														if (branch.id == carSingle?.branches?.id) {
															return (
																<option
																	key={branch.id}
																	value={JSON.stringify(branch)}
																>
																	{branch.name}
																</option>
															);
														}
													})}
												</select>
											</div>
										</div>
										<div className="row col-12">
											<div className="col-lg-12">
												<label className="fw-bold my-4">Description</label>
												<input
													type="text"
													className="form-control"
													value={carSingle?.description}
													// {...register("description")}
												/>
												<span className="text-danger">
													{/* {errors?.description?.message} */}
												</span>
											</div>
										</div>
									</div>
									<div className="col-5">
										<div className="col-lg-12 d-flex">
											{uploading ? (
												<div
													style={{
														display: "flex",
														width: "300px",
														height: "300px",
														justifyContent: "center",
														alignItems: "center",
													}}
												>
													<div>
														<Spinner animation="border" variant="primary" />
													</div>
												</div>
											) : (
												<img
													// src={selectImg.tempUrl || noAvatar}
													src={carSingle?.avatar}
													role="button"
													alt=""
													style={{ width: "300px", height: "300px" }}
													// onClick={() =>
													// 	document.getElementById("imgUpload").click()
													// }
												/>
											)}

											{/* <div className="d-grid gap-2 mt-2">
												{uploading ? (
													<button
														className="btn btn-sm btn-dark"
														type="button"
														disabled=""
													>
														<span
															className="spinner-border spinner-border-sm"
															role="status"
															aria-hidden="true"
														/>
														Uploading...
													</button>
												) : (
													<button
														// onClick={handleUploadImage}
														type="button"
														className="btn btn-secondary"
													>
														Upload
													</button>
												)}
												<input
													// onChange={handleSelectImg}
													type="file"
													accept="image/*"
													className="form-control d-none"
													id="imgUpload"
												/>
											</div> */}
										</div>
									</div>
								</div>

								<div className="modal-footer">
									{/* <button
										type="button"
										className="btn btn-secondary"
										data-bs-dismiss="modal"
										onClick={() => setshowModalDetail(false)}
									>
										Close
									</button> */}
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => setShowModalDetail(false)}
									>
										Confirm
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CarDetail;
