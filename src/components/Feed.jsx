import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';

import {Circles} from 'react-loader-spinner';

const Feed = () => {
    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
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
    }, [categoryId]);
    const ideaName = categoryId || 'new';
    if (loading) {
        return (
            <Circles message={`We are adding ${ideaName} ideas to your feed!`}/>
        );
    }
    return (
        <div>
            {pins && (
                <MasonryLayout pins={pins} />
            )}
        </div>
    );
};

export default Feed;