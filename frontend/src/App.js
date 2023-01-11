import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios';
// import Multiselect from 'multiselect-react-dropdown';
import Results from './components/Results.jsx';
import SearchBar from './SearchBar.jsx';
// import instrumentOptions from '../src/assets/unique_instruments.json';
// import periodOptions from '../src/assets/unique_styles.json';
// import rolling from '../src/assets/rolling.svg';
import Footer from './components/Footer';
import Popup from './components/Popup';
import './App.css'
import './reset.css'

export default function App() {
  const [popupClicked, setPopupClicked] = useState(false);
  const [searchData, setSearchData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  // const reformatOptions = (options) => {
  //   const new_options = []
  //   for (var i=0; i < options.length; i++) {
  //     new_options.push({key: options[i]});
  //   }
  //   return new_options
  // }

  // const createFilters = () => {
  //   const filters = {"filters": {"instruments": [], "periods": []}}
  //   const periodSelect = document.getElementById('period-select');
  //   const periods = periodSelect.firstElementChild.getElementsByTagName('span');
  //   for (const p of periods) {
  //     filters["filters"]["periods"].push(p.innerText);
  //   }
  //   const instrumentSelect = document.getElementById('instrument-select');
  //   const instruments = instrumentSelect.firstElementChild.getElementsByTagName('span');
  //   for (const i of instruments) {
  //     filters["filters"]["instruments"].push(i.innerText);
  //   }
  //   return JSON.stringify(filters);
  // }

  // const getSearchData = async () => {
  //   console.log("fetching data...");
  //   setLoading(true);
  //   const filters = createFilters();
  //   const config = {
  //     method: 'post',
  //     url: 'http://localhost:5000/pieces/filter',
  //     headers: { 
  //       'Content-Type': 'application/json'
  //     },
  //     data : filters
  //   };

  //   await axios(config)
  //   .then(function (response) {
  //     console.log(searchData);
  //     setSearchData(response.data["data"]);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //   setLoading(false);
  // }

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }, [searchData])

  return (
    <div className='app'>
      <Popup trigger={popupClicked} setTrigger={setPopupClicked}>
        <p>
          Search results include pieces belonging to any of the selected classical periods and having
          at least all selected instruments.
        </p>
      </Popup>
      <div className='main'>
        <div className='intro-div'>
          <span className='main-text' id="non-logo">Discover your next piece to play, </span>      
          <span className='main-text' id='logo'>a prima vista</span>
        </div>
      <SearchBar setPopupClicked={setPopupClicked} setSearchData={setSearchData}></SearchBar>
        {/* <div className='search-div'>
          <button className="info-button" onClick={() => {setPopupClicked(true)}}>i</button>
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
        </div> */}
        {searchData && <Results key="results" pieces={searchData} scrollRef={ref}></Results>}
      </div>
      <Footer/>
    </div>
  )
}