import React from 'react';
import {RightOutlined, LeftOutlined} from '@ant-design/icons';

const PageChanger = ({page, changePage}) => {
    return (
        <div className='pageChanger flex-row space-around'>
            <span className={'changePage centered pointer left ' + (page<=1 && 'disabled')}
                onClick={() => changePage(page - 1)} 
            >
                <LeftOutlined className='pageIcon'/>
            </span>
            <span className='changePage centered pointer right'
                onClick={() => changePage(page + 1)} 
            >
                <RightOutlined className='pageIcon'/>
            </span>
        </div>
    )
}

export default PageChanger;