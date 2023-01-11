import React, {useEffect, useState} from "react";
import Piece from "./Piece";
import './css/Results.css';
import ResultPagination from "./Pagination";

export default function Results(props) {
    const [pageNumber, setPageNumber] = useState(0);
    const piecesPerPage = 10;
    const from = pageNumber * piecesPerPage;
    const pageCount = Math.ceil(props.pieces.length / piecesPerPage);

    useEffect(() => {
        setPageNumber(0);
    }, [props.pieces])

    const paginatedData = props.pieces.slice(from, from + piecesPerPage).map((piece, index) => (
        <Piece key={index} 
                title={piece.title} 
                composer={piece.composer} 
                imslp_link={piece.imslp_link}
                instrumentation={piece.instrumentation}
                style={piece.style}
        ></Piece>
    ));

    return (
        <div className="results-container" ref={props.scrollRef}>
            <h1>Your Results</h1>
            <div className="results">
                {paginatedData}
            </div>
            <ResultPagination count={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
        </div>
    )
}