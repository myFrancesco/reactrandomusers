import React, {useState, useRef, useEffect} from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import {SearchOutlined, ClearOutlined} from '@ant-design/icons';

import './scss/SearchBar.css'

const SearchBar = ({placeholder, users, changeSelectedID}) => {

    useEffect(() => {
        Aos.init({duration: 1000});
    }, []);

    const [filteredData, setFilteredData] = useState([]);
    const [namesList, setNamesList] = useState([]); 
    const refContainer = useRef(null);
    const [focused, setFocused] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const handleChange = () => {
        const searchWord = refContainer.current.value.toLowerCase();
        // name suggestion filtering
        const newFilter = namesList.filter((name) => {
            return (name.toLowerCase().includes(searchWord) && name.toLowerCase() !== searchWord)
        });
        // user id filtering
        const filteredIDs = users.filter((user) => {
            let firstName = user.name?.first;
            let lastName = user.name?.last;
            let name = firstName + ' ' + lastName;
            let fullName = user.name?.title + ' ' + name
            return (
                firstName.toLowerCase().includes(searchWord) ||
                lastName.toLowerCase().includes(searchWord) ||
                name.toLowerCase().includes(searchWord) ||
                fullName.toLowerCase().includes(searchWord)
            )
        }).map((user) => {return user.myID});
        changeSelectedID(filteredIDs);
        (searchWord === '') ? setFilteredData([]) : setFilteredData(newFilter);
    }

    const clearInput = () => {
        setFilteredData([]);
        refContainer.current.value = '';
        handleChange();
    }

    const setInput = (name) => {
        console.log(name);
        refContainer.current.value = name;
        handleChange();
    }

    useEffect(() => {
        // computing all combinations of names
        setNamesList(() => {
            let namesList = [];
            users.forEach((user) => {
                let firstName = user.name?.first;
                let lastName = user.name?.last;
                let name = firstName + ' ' + lastName;
                let fullName = user.name?.title + ' ' + name
                !namesList.includes(firstName) && namesList.push(firstName);
                !namesList.includes(lastName) && namesList.push(lastName);
                !namesList.includes(name) && namesList.push(name);
                !namesList.includes(fullName) && namesList.push(fullName);
            });
            namesList.sort(function(a, b){
                return a.length - b.length;
            });
            return namesList;
        })
    }, [users])

    useEffect(() => {
        handleChange();
    }, [namesList])

    return (
        <div className='search'>
            <div className='searchInput flex-row smallMediumText'>
                <input type='text' placeholder={placeholder} 
                    ref={refContainer}
                    onChange={handleChange} 
                    onFocus={onFocus} 
                    onBlur={onBlur}/>
                <div className='searchIcon' onClick={clearInput}>
                    {refContainer.current?.value.length !== 0 
                        ? <ClearOutlined className='pointer'/>
                        : <SearchOutlined />
                    }
                </div>
            </div>
            {(filteredData.length !== 0 && (focused || mouseOver))
            && <div className='dataResult' onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}
                data-aos="zoom-out-right"
                data-aos-duration="250">
                {filteredData.slice(0, 10).map((name, i) => {
                    return (
                        <div className='dataItem' key={i} onClick={() => {setInput(name); refContainer.current.focus();}} style={{'--id-brd': i+'px'}}>
                            {name}
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default SearchBar;