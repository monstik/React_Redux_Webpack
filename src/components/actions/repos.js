import axios from "axios";
import {setIsFetching, setRepos, setFetchingError} from "../../reducers/reposReducer";


export const getRepos = (searchQuery = "stars:%3E1", perPage, currentPage) => {

    if (searchQuery === '') {
        searchQuery = "stars:%3E1";
    }
    return (dispatch) => {

        dispatch(setIsFetching(true));

        axios
            .get(`https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`)
            .then(res => dispatch(setRepos(res.data)))
            .catch(e => {
                console.log('error')
                dispatch(setFetchingError(true));
                dispatch(setIsFetching(false));
                setTimeout(dispatch(setFetchingError(false)), 2000);
            });


    }
}

export const getCurrentRepo = (userName, repoName, setRepo, setIsFetching) => {
    axios
        .get(`https://api.github.com/repos/${userName}/${repoName}`)
        .then(res => {
                setRepo(res.data);
                setIsFetching(true);
            }
        )
        .catch(e => {
            console.log(e)
            }
        )

}

export const getContributors = (userName, repoName, setContributors) => {

    axios
        .get(`https://api.github.com/repos/${userName}/${repoName}/contributors?page=1&per_page=10`)
        .then(res => setContributors(res.data))
        .catch((e) => {
            console.log(e)
        })


}