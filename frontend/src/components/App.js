import React from 'react';
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
        this.setState({loading: true, city: city}, () => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('load', async () => {
                this.setState({
                    offers: xhr.response,
                    loading: false,
                    serverError: false,
                    searchingStatus: 'finished'
                })
            })
            xhr.onerror = () => {
                this.setState({
                    loading: false,
                    serverError: true
                })
            }
            xhr.open('GET', `http://localhost:3002/jobs-search/?city=${this.state.city}&pages=${this.state.pages}&category=${category}`);
            xhr.send();
        })
    }

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