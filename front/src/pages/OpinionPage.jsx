import React from 'react';
import OpinionForm from '../components/OpinionForm';
import { useParams } from 'react-router-dom';

const OpinionPage = () => {
    const { id } = useParams(); 

    return (
        <div className="container">
            <OpinionForm productId={id} />
        </div>
    );
};

export default OpinionPage;
