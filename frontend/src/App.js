import React, { useState, useEffect, useRef } from 'react'
import Results from './components/Results.jsx';
import SearchBar from './SearchBar.jsx';
import Footer from './components/Footer';
import Popup from './components/Popup';
import './App.css'
import './reset.css'

export default function App() {
  const [popupClicked, setPopupClicked] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const ref = useRef(null);

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
        {searchData && <Results key="results" pieces={searchData} scrollRef={ref}></Results>}
      </div>

      <Footer/>
    </div>
  )
}