import React from 'react';
import './Error.css';

const Error = ({errorDescription, advice}) => {
    return (
        <div className='nothing-found'>
            <div className="nothing-found-element icon">
                <i className="exclamation triangle icon massive"></i>
            </div>
            <div className='nothing-found-element'>{errorDescription}</div>
            <div className='nothing-found-element'>{advice}</div>
        </div>
    )
}      

export {Error};