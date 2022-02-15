import React from 'react';
import {DeleteOutlined, InfoCircleOutlined} from '@ant-design/icons';
import {Popover} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faQuestion, faLocationDot } from '@fortawesome/free-solid-svg-icons'


const UserCard = ({info, removeUser, displayMode}) => {


    const plotDateString = (dateString) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        const ret = dateString.split('-');
        return ret[2][0] + ret[2][1] + ' ' + monthNames[parseInt(ret[1])-1] + ' ' + ret[0];
    }
    const popOverContent = (
        <div>
            {info.dob?.date && 
                <React.Fragment>
                    <span className='microSmallText'> date of birth:</span>
                    <p className='smallText'> {plotDateString(info.dob.date)}</p>
                </React.Fragment>
            }
            {info.registered?.date && 
                <React.Fragment>
                    <span className='microSmallText'> date of registration:</span>
                    <p className='smallText'> {plotDateString(info.registered.date)}</p>
                </React.Fragment>
            }
            {info.phone && 
                <React.Fragment>
                    <span className='microSmallText'> phone number:</span>
                    <p className='smallText'> {info.phone}</p>
                </React.Fragment>
            }
        </div>
    );



    const Image = ({picture}) => {
        let defaultImage = 'images/default/user.png';
        return(
            <div className='cardImage'>
                <img  
                    src={picture?.large || picture?.medium || picture?.thumbnail || defaultImage}  
                    alt='where is it?'
                />
            </div>
        )
    }

    const Name = ({name}) => {
        return(
            <p className='user-Name centered'>{!(name?.first || name?.last) 
                ? 'No name user' 
                : '' + name?.title + ' ' + name?.first + ' ' + name?.last}</p>
        )
    }

    const AdditionalInfo = ({text}) => {
        return (
            !text ? null : <p className='smallText'> {text} </p>
        )
    }

    const Generalities = ({age, gender}) => {
        return(
            <div className='generalities'>
                <div className='flex-column'> 
                    <span className='smallText smallWeight'> age </span>
                    <span>{!age ? 'None' : age} </span>
                </div>
                <div className='flex-column'> 
                    <span className='smallText smallWeight'> gender </span>
                    <span>{!gender ? 'None' : gender} </span>
                </div>
            </div>
        )
    }

    const Location = ({location}) => {
        return(
            <div className='additionalInfo centered'>
                <span className='location smallMediumText'> {!location 
                    ? 'Unknown' 
                    : <div className='flex-column'>
                            <FontAwesomeIcon id='locIcon' className='smallText locationIcon' icon={faLocationDot} />
                            {location?.city ? <span> {location.city},</span> : 'Unknown' }
                            {location?.state && <span> {location.state} </span> }
                        </div>
                    }      
                </span>
            </div>
        )
    }

    const Items = () => {
        return (
            <React.Fragment>
                <div className={'decoration ' + (!info.gender ? 'none' : info.gender)} />
                <div className='userCard-delete' onClick={() => removeUser(info.myID)} >
                    <DeleteOutlined className='icon' />
                </div>
                {info.nat === 'CH' && <img className='flag' src='images/switzerland-flag.png' alt='CH'/>}
                <span className={'gender-icon mediumText ' + (!info.gender ? 'none' : info.gender)}>
                    <FontAwesomeIcon icon={!info.gender ? faQuestion : (info.gender==='male' ? faMars : faVenus)} />
                </span>
            </React.Fragment>
        )
    }




    return (
        <div className={'userCard ' + displayMode}>
            <Image picture={info.picture}/>
            <div className='userCard-text'>
                <Name name={info.name} />
                <Generalities age={info.dob?.age} gender={info.gender} location={info.location}/>
                <Location location={info.location}/>
                <div className='additionalInfo flex-column'>
                    <AdditionalInfo text={info.login?.username}/>
                    <AdditionalInfo text={info.email}/>
                </div>
            </div>
            { (info.dob?.date || info.registered?.date || info.phone) &&
                <div className='popOverContainer'>
                    <Popover className='popOverInfo' content={popOverContent}  title="INFO">
                        <InfoCircleOutlined />
                    </Popover>
                </div>
            }
            <Items />
        </div>
    )
}

export default UserCard;