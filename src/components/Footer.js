import React from 'react';
import PageChanger from './PageChanger';
import './scss/Footer.css';

const Footer = ({page, changePage}) => {


    return (
        <div className='footer'>
            {<PageChanger 
                    page={page}
                    changePage={changePage}
            />}
            <div className='endInfo centered'>
                <img src='images/logo.jpeg' alt='e-globe solutions'/>
            </div>
        </div>
    )
}

export default Footer;