import React, {useState} from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import rolling from '../src/assets/rolling.svg';
import instrumentOptions from '../src/assets/unique_instruments.json';
import periodOptions from '../src/assets/unique_styles.json';

export default function SearchBar(props) {
    const [loading, setLoading] = useState(false);

    const reformatOptions = (options) => {
        const new_options = [];
        for (var i=0; i < options.length; i++) {
          new_options.push({key: options[i]});
        }
        return new_options;
    }

    const createFilters = () => {
        const filters = {"filters": {"instruments": [], "periods": []}}
        const periodSelect = document.getElementById('period-select');
        const periods = periodSelect.firstElementChild.getElementsByTagName('span');
        for (const p of periods) {
          filters["filters"]["periods"].push(p.innerText);
        }
        const instrumentSelect = document.getElementById('instrument-select');
        const instruments = instrumentSelect.firstElementChild.getElementsByTagName('span');
        for (const i of instruments) {
          filters["filters"]["instruments"].push(i.innerText);
        }
        return JSON.stringify(filters);
    }

    const getSearchData = async () => {
        console.log("fetching data...");
        setLoading(true);
        const filters = createFilters();
        const config = {
          method: 'post',
          url: 'http://localhost:5000/pieces/filter',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : filters
        };
    
        await axios(config)
        .then(function (response) {
          props.setSearchData(response.data["data"]);
        })
        .catch(function (error) {
          console.log(error);
        });
        setLoading(false);
    }

    return (
        <div className='search-div'>
          <button className="info-button" onClick={() => {props.setPopupClicked(true)}}>i</button>
          <Multiselect
            displayValue="key"
            onKeyPressFn={function noRefCheck(){}}
            onRemove={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={function noRefCheck(){}}
            options={reformatOptions(periodOptions)}
            placeholder="Select classical style(s)"
            hidePlaceholder={true}
            closeIcon="circle"
            avoidHighlightFirstOption={true}
            id="period-select"
          />
          <span id="filler-word">for</span>
          <Multiselect
            displayValue="key"
            onKeyPressFn={function noRefCheck(){}}
            onRemove={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={function noRefCheck(){}}
            options={reformatOptions(instrumentOptions)}
            placeholder="Select instrument(s)"
            hidePlaceholder={true}
            closeIcon="circle"
            avoidHighlightFirstOption={true}
            id="instrument-select"
          />
          <div className="search-button-spinner">
            {loading ? <img src={rolling} alt="Loading..." id="spinner"></img>
            : <button className='go-button' onClick={() => {getSearchData()}}>Go</button>}
          </div>
        </div>
    )
}