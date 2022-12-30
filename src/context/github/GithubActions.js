
import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//FOR AXIOS only...
const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {Authorization: `token ${GITHUB_TOKEN}`}
})

// /////////////////////////////////////////////////////////////////////Search Users WITHOUT AXIOS
// export const searchUsers = async (text) => {
//     const params = new URLSearchParams({
//         q:text,
//     });

//     const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
//         headers:{
//             Authorization: `token ${GITHUB_TOKEN}`,
//         }
//     });

//     // From the object returned, destructure to get the items array.
//     const {items} = await response.json()
//     return items;
// }

/////////////////////////////////////////////////////////////////////Search Users USING AXIOS
export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q:text,
    });

    //Returns a response with the information in an object called data.
    const response = await github.get(`/search/users?${params}`);
    return response.data.items;
}


// /////////////////////////////////////////////////////////// Get a Single User WITHOUT AXIOS
// export const getUser = async (login) => {
//     const response = await fetch(`${GITHUB_URL}/users/${login}`,{
//         headers:{
//             Authorization: `token ${GITHUB_TOKEN}`,
//         }
//     });

//     if(response.status === 404){
//         window.location="/notfound";
//     }else{
//         const data = await response.json()
//         return data;
//     }
// }

// //////////////////////////////////////////////////////////////////////////// WITHOUT AXIOS
// export const getUserRepos = async (login) => {

//     const params = new URLSearchParams({
//         sort: "created",
//         per_page: 10,
//     });

//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
//         headers:{
//             Authorization: `token ${GITHUB_TOKEN}`,
//         }
//     });

//     const data = await response.json()
//     return data;
// } 

//////////////////////////////////////////////////////////////// Get User and REPOS USING AXIOS
export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`),
    ]);

    return {user: user.data, repos: repos.data};
}


