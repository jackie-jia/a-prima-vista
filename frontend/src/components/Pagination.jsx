import {Box} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import './css/Pagination.css'



export default function ResultPagination(props) {

    const handlePageChange = (event, page) => {
        props.setPageNumber(page - 1);
    }

    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
            sx={{margin: "20px 0px"}}>
            <Pagination 
                count={props.count}
                onChange={handlePageChange}
                page={props.pageNumber + 1}
                color="primary"/>
        </Box>
    )
}