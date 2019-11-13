import React from 'react';
import './Offers.css';
import {Offer} from '../Offer';
import {Error} from '../Error';

const Offers = ({loading, searchingStatus, offers, serverError}) => {
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const renderError = () => {
            if (loading === false &&  searchingStatus === 'finished' && offers.length === 0){
                return  <Error errorDescription ={'Oooops... Nothing found...'} advice={'Try to search another word.'} />
                    
            }
            if (loading === false && serverError === true && offers == null){
                return <Error errorDescription ={'Oooops... Server error...'} advice={'Try again later.'} />
            }
        };

        const renderOffers = () => {
            if (loading === true){
                return (
                    <div className="sixteen wide column">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading...</div>
                        </div>
                        <p></p>
                    </div>)
            } else {
                let offersBlocks = []
                if  (offers !== null){
                    let offersShuffled = shuffleArray(offers);
                    for (let i = 0; i < offers.length ; i++){
                        let {jobName, linkData, city, company } = offersShuffled[i];
                        offersBlocks.push(<Offer key={jobName+i} keyNumber = {jobName+i} linkData={linkData} jobName = {jobName} city={city} company ={company} />);
                    };
                    return offersBlocks    
                } 
            }
        };
        return (
                <div className= 'flex-offers'>
                    {renderError()}
                    {renderOffers()}
                </div>
            )
        
};

export {Offers};