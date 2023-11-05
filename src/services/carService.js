import axios from "axios";
import { CARS_API_URL } from "./common";

class CarService {
	static getAllCars(keyword) {
		return axios.get(`${CARS_API_URL}?search=${keyword}`);
	}
	static create(newCar) {
		return axios.post(CARS_API_URL, newCar);
	}
	static getCarById(carId) {
		return axios.get(CARS_API_URL + "/" + carId);
	}
	static deleteCar(carId) {
		return axios.delete(
			"https://64e707a3b0fd9648b78f379b.mockapi.io/car" + "/" + carId
		);
	}
}

export default CarService;
