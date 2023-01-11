import React from "react";
import './css/Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">Made for musicians by a musician <a href="https://github.com/jackie-jia" target="_blank" rel="noreferrer">@jackie-jia</a></p>
            <img className="violin" src="images/violin.svg" alt="violin"></img>
        </footer>
    )
}