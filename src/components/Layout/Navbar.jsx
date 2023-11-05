import React from "react";

function Navbar() {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
			<div className="container-fluid">
				<a className="navbar-brand" href="/#)">
					LOGO
				</a>

				<div className="collapse navbar-collapse" id="mynavbar">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<a className="nav-link" href="/#">
								Link
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/#">
								Link
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/#">
								Link
							</a>
						</li>
					</ul>
					<form className="d-flex">
						<input
							className="form-control me-2"
							type="text"
							placeholder="Search"
						/>
						<button className="btn btn-primary" type="button">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
