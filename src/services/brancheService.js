import axios from "axios";
import { BRANCHES_API_URL } from "./common";

class BranchService {
    static getAllBranches() {
        return axios.get(BRANCHES_API_URL);
    }
}

export default BranchService