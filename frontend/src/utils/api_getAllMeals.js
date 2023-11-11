import axios from "axios";

export const getAllMeals = () => axios({
    method: 'GET',
    url: 'http://localhost:5555/allmeals'
    }).then((response) => {
    // setAllMeals(response.data)
    return response.data
     }).catch((error) => console.log(error));