import React, {useRef} from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Radio, BackTop } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import './scss/FixedItems.css';

const FixedItems = ({changePage, page, displayMode, changeDisplayMode}) => {

    const refContainer = useRef(null);

    const handleSizeChange = e => {
        changeDisplayMode(e.target.value);
    };

    const checkPage = () => {
        const value = parseInt(refContainer.current.value);
        if (value > 0 && value <= 10000 && value !== page) changePage(parseInt(value));
        refContainer.current.value = '';
    }
    
    const styleBackTop = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
      };

    return (
        <div className='usersFooter'>
            <div className='left-bottom-fixed'>
                <span>page</span>
                <input className='pageSetter' type='number' 
                    ref={refContainer} 
                    placeholder={page}  
                    onBlur={checkPage}>
                </input>
                <span>display mode</span>
                <Radio.Group className='sizeSetter' value={displayMode} onChange={handleSizeChange}>
                    <Radio.Button value="shortcutListing"><FontAwesomeIcon icon={faListUl} /></Radio.Button>
                    <Radio.Button value="normalListing"><FontAwesomeIcon icon={faAddressCard} /></Radio.Button>
                </Radio.Group>
                <EditOutlined className='setterLink centered'/>
            </div>
            <BackTop className='backTop'>
                <div style={styleBackTop}>UP</div>
            </BackTop>
        </div>
    )
}

export default FixedItems;