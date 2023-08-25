import axios from "axios";
import { CARS_API_URL } from "./common";

class CarService {
    static getAllCars() {
        return axios.get(CARS_API_URL)
    }
    static create(newCar) {
        return axios.post(CARS_API_URL, newCar)
    }
    static getCarById(carId) {
        return axios.get(CARS_API_URL + '/' + carId)
    }
}

export default CarService