import React from "react";
import styleTagColors from '../assets/tag_colors.json';
import './css/Piece.css';

export default function Piece(props) {

    const getTagColor = () => {
        const lower = props.style.toLowerCase();
        if (lower in styleTagColors) {
            return styleTagColors[lower];
        }
        return "#BFD9FF";
    }

    const generateInstrList = props.instrumentation.map((instr) => (
        <li>{instr}</li>
    ))

    return (
        <div className="card" style={{width: "45%"}}>

            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <h6 className="card-subtitle">{props.composer}</h6>
                <ul className="instrumentation-list">
                    {generateInstrList}
                </ul>
            </div>

            <div className="card-footer">
                <div className="style-tag" style={{backgroundColor: getTagColor()}}>{props.style}</div>
                <a href={props.imslp_link} target="_blank" rel="noreferrer" className="card-link">IMSLP</a>
            </div>
            
        </div>
    )
}