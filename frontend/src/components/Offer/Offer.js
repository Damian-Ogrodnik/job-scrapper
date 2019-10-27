import React from 'react';
import './Offer.css';

const Offer = ({keyNumber, linkData, jobName, city, company}) => {
    const getCompany = (company) => {
        if (company){
            let companyName = company.startsWith('Zobacz profil') ? company.replace('Zobacz profil','') : company;
            return(
                <div className = 'job-offer-element-details'>
                    <div className = 'job-offer-element-details'> 
                        <i className='suitcase icon blue'></i>
                        {companyName}
                    </div>
                </div>
            )
        }
    };

    return (
        <div className='job-offer shadow'  key={keyNumber}>
            <a className='job-offer-element' href={linkData} target='_blank' rel="noopener noreferrer" >{jobName}</a>
            <div className='job-offer-element'>
                <div className = 'job-offer-element-details'> 
                    <i className='map marker alternate icon blue'></i>
                    {city}
                </div>
                {getCompany(company)}
            </div> 
        </div>
    )
}      


export default Offer;