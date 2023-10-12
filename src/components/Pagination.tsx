type props={
  totalPosts:number,
  postsPerPage:number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage:number
}
const Pagination = ({ 
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage, }:props) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.length>1?(
      <div className="w-full py-4 flex justify-center">
        {pageNumbers.map((page:number,index) => (
          <li key={index} className="mx-1 flex flex-row">
            <button
            onClick = {() => setCurrentPage(page)}
              className={` w-9 h-9 rounded-lg font-medium shadow-lg
              ${currentPage === page ? "text-white bg-[#4d4bb9]" : "text-[#5C59E8] hover:text-black hover:underline"} `}
            >
              {page}
            </button>
          </li>
        ))}
      </div>
    ):""}
    </div>
    
  );
};

export default Pagination;
