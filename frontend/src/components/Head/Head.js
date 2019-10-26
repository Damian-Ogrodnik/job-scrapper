import React from 'react';
import InfoModal from '../Modal/InfoModal'
import './Head.css';

class Head extends React.Component {
    constructor(props) {
        super(props)
        this.pagesButtons = React.createRef();
        this.city = React.createRef();
        this.category = React.createRef();
        this.state = {
            modalDisplay: false

        }
    };

    changeColor = (e) => {
        let levels = this.pagesButtons.current.children
        for (let i = 1; i < levels.length; i++) {
            levels[i].style.background = 'rgb(33,133,208)'
        }
        e.style.background = 'rgb(13,113,187)';
    };

    displayModal = () => {
         if (this.state.modalDisplay){
             return <InfoModal description={'Using big search scope can take a few minutes...'} />
         }
    }

    render(){
        return (
            <div className='sixteen wide column'>
                <div className='flex'>
                    <div className='head'>
                        <h1 className='ui header'>Job Scrapper</h1>
                    </div>
                    <div style={{minWidth: "250px", margin: "20px 0px 0px 0px"}}>
                            <div ref={this.pagesButtons} id ='pages-buttons' className="ui buttons blue" style={{ padding: "0px 15px"}}>
                                <div className="ui button active blue" style={{ backgroundColor: "rgb(13,113,187)"}}>Search Scope</div>
                                <button className="ui button" value = {1} onClick={(e)=> {this.props.setNumOfPages(e); this.changeColor(e.target)}} >Small</button>
                                <button className="ui button" value = {5} onClick={(e)=> {this.props.setNumOfPages(e); this.changeColor(e.target)}}>Normal</button>
                                <button className="ui button" value = {15} onClick={(e)=> {this.props.setNumOfPages(e); this.changeColor(e.target); this.setState({modalDisplay: true})}}>Big</button>
                                {this.displayModal()}
                            </div>
                    </div>
                    <div className="ui input focus "  style={{margin: "20px 0px 0px 0px"}}>
                        <input ref= {this.city} type="text" id='search-bar-city'  placeholder="Location..." />
                        <input ref= {this.category} type="text" id='search-bar-category'  placeholder="Category..." />
                         <button id='search-button' className="ui primary button attached"  onClick={()=> this.props.getOffers(this.city.current.value, this.category.current.value)}>Click to Search</button>
                    </div>
                </div>
            </div>
        )
    
}
}     


export default Head;