import React from 'react';
import './Offers.css';
import Offer from '../Offer/Offer';
import Error from '../Error/Error'

class Offers extends React.Component {
        shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        renderError = () => {
            if (this.props.loading === false &&  this.props.searchingStatus === 'finished' && this.props.offers === '[]'){
                return  <Error errorDescription ={'Oooops... Nothing found...'} advice={'Try to search another word.'} />
                    
            }
            if (this.props.loading === false && this.props.serverError === true && this.props.offers == null){
                return <Error errorDescription ={'Oooops... Server error...'} advice={'Try again later.'} />
            }
        }

        renderOffers = () => {
            if (this.props.loading === true){
                return (
                    <div className="sixteen wide column">
                        <div className="ui active inverted dimmer">
                            <div className="ui text loader">Loading...</div>
                        </div>
                        <p></p>
                    </div>)
            } else {
                let offersBlocks = []
                if  (this.props.offers !== null){
                    let offers = this.shuffleArray(JSON.parse(this.props.offers))
                    console.log(offers[0])
                    for (let i = 0; i < offers.length ; i++){
                        offersBlocks.push(
                            <Offer key={offers[i].jobName+i} keyNumber = {offers[i].jobName+i} linkData={offers[i].linkData} jobName = {offers[i].jobName} city={offers[i].city} company ={offers[i].company} />
                        )
                    };
                    return offersBlocks    
                } 
            }
        };
        render(){
        return (
                <div className= 'flex-offers'>
                    {this.renderError()}
                    {this.renderOffers()}
                </div>
            )
        }
};

export default Offers;