import React from 'react'
import { Parallax } from 'react-parallax';
import './scss/Hero.css'

const Hero = () => {


    return (
        <React.Fragment>
            
            <Parallax bgImage={'images/users.jpeg'} strength={200} className='heroSection'>
                <div className='pageTitle centered'>
                    <div className='title flex-row'>
                        <span>Random&nbsp;</span>
                        <span>Users</span>
                    </div>
                    <div className='myContainer centered'>
                            <div className='myScene'>
                                <div className='myCube'>
                                    <div className={'face front centered-text'}>
                                        User Listing
                                    </div>
                                    <div className={'face back centered-text'}>
                                        Data Fetching
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </Parallax>
        </React.Fragment>
    )
}

export default Hero;