import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import {SpinnerCircular} from 'spinners-react';

const Search = ({ searchTerm }) => {
    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm !== '') {
            setLoading(true);
            const query = searchQuery(searchTerm.toLowerCase());
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [searchTerm]);

    return (
        <div>

            {loading && <SpinnerCircular className="text-center text-blue-600"  message="Searching pins" />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl ">No Pins Found!</div>
            )}
        </div>
    );
};

export default Search;