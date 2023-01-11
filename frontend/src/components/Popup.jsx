import React from "react";
import './css/Popup.css';

export default function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="blocker" onClick={() => {props.setTrigger(false)}}></div>
            <div className="popup-inner">
                {props.children}
            </div>
        </div>
    ) : "";
}