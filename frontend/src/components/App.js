import React from 'react';
import axios from 'axios';
import './App.css';
import Offers from './Offers/Offers';
import Head from './Head/Head'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            offers: null,
            loading: false,
            searchingStatus: null,
            pages: 1
        }
    };

    getOffers = async (city, category) => {
        this.setState({loading: true, city: city}, async () => {
            await axios.get(`http://localhost:7000/jobs-search/?city=${this.state.city}&pages=${this.state.pages}&category=${category}`)
                .then(response => {
                    this.setState({
                        offers: response.data,
                        loading: false,
                        serverError: false,
                        searchingStatus: 'finished'
                    })
                })
                .catch( () => {
                    this.setState({
                        loading: false,
                        serverError: true
                    })
                })
        })
    };

    setNumOfPages = (e) => this.setState({pages: e.target.value});

    render(){
        return (
        <div className='ui grid'>  
            <Head setNumOfPages = {this.setNumOfPages} changeColor = {this.changeColor} getOffers={this.getOffers}/>
            <Offers searchingStatus = {this.state.searchingStatus} offers = {this.state.offers} loading = {this.state.loading} serverError = {this.state.serverError}></Offers>
        </div>  
        )
    }
};

export default App;