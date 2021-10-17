import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getContributors, getCurrentRepo} from "../actions/repos";
import './card.less';

const Card = (props) => {

    const {username, repoName} = useParams();
    const [repo, setRepo] = useState({owner: {}});
    const [contributors, setContributors] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getCurrentRepo(username, repoName, setRepo, setIsFetching);
        getContributors(username, repoName, setContributors);
    }, [])


    return (
        <div>
            <button onClick={() => props.history.goBack()}>Back</button>

            {isFetching === false
                ?
                <div className="fetching"/>
                :
                <>
                    <div className="card">
                        <img src={repo.owner.avatar_url} alt=""/>
                        <div className="name">
                            {repo.name}
                        </div>
                        <div className="stars">
                            {repo.stargazers_count}
                        </div>
                    </div>
                    <div>
                        {contributors.map((c, index) =>
                            <div>{index + 1}. {c.login}</div>
                        )}
                    </div>
                </>
            }
        </div>
    );
};

export default Card;