import React from "react"
import ReactPaginate from "react-paginate"

const Pagination = ({ postperpage, totalpost, paginate }) => {

    const handlepageclick = (data) => {
        paginate(data.selected + 1);
    }
    // const pagenumbers = [];

    // for(let i = 1; i <= Math.ceil(totalpost/postperpage); i++)
    // {
    //     pagenumbers.push(i);
    // }
    return (
        //    <div>
        //        <ul className="pagination">
        //            {
        //                pagenumbers.map((number)=>{
        //                     return(
        //                         <li key={number} className="page-item">
        //                         <a onClick={() =>paginate(number)} href="!#" className="page-link">{number}</a>
        //                         </li>
        //                     )
        //                })
        //            }
        //        </ul>
        //    </div>
        <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            // breakLabel ={"||"}
            pageCount={Math.ceil(totalpost / postperpage)}
            // marginPagesDisplayed = {3}
            // pageRangeDisplayed = {2}
            onPageChange={handlepageclick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
    )
}

export default Pagination;