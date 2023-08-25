import { useState, useEffect } from "react"
import BranchService from "../services/brancheService"

const useFetchBranch = () => {
    const [branchList, setBranchList] = useState([]);

    useEffect(() => {
        async function getData () {
            let res = await BranchService.getAllBranches()
            setBranchList(res.data)
        }
        getData()
    }, [])
    return branchList;
}

export default useFetchBranch