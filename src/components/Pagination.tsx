import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {useState} from 'react'
type props = {
  totalPosts: number,
  postsPerPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  currentPage: number,
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  }: props) => {
    const [inputValue, setInputValue] = useState('');
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  // xử lí hiển thị pagination
  const maxVisiblePages = 3;
  const currentPageIndex = pageNumbers.findIndex((page) => page === currentPage);
  let startPage = 0;
  let endPage = pageNumbers.length - 1;
  if (currentPageIndex >= 0) {
    startPage = Math.max(0, currentPageIndex - Math.floor(maxVisiblePages / 2));
    endPage = Math.min(pageNumbers.length - 1, startPage + maxVisiblePages - 1);
  }
  // 3 page cuối
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(0, endPage - maxVisiblePages + 1);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= pageNumbers.length) {
      setInputValue(e.target.value);
    } else {
      setInputValue('');
    }
  };

  const handleGoToPage = () => {
    if (inputValue !== '') {
      setCurrentPage(parseInt(inputValue) - 1);
      setInputValue('');
    }
  };


  return (
    <div>
      {pageNumbers.length > 1 ? (
        <div className="w-full pt-4 flex justify-center items-center">

          <div className="flex pr-1">
            <div className="flex justify-center items-center px-2 space-x-2 text-[18px] bg-[#4d4bb9] h-[36px] text-white shadow-lg rounded-l-md">
              <p className="">Trang:</p>
              <input
                type="number"
                min={1}
                value={inputValue}
                max={pageNumbers.length}
                onChange={handleInputChange}
                className="w-[45px] focus:outline-none border-b-2 border-white bg-[#4d4bb9]"
              />
            </div>
            <button className="transition ease-in-out bg-white px-2 text-center text-[#4d4bb9] hover:scale-110  duration-300 rounded-r-lg shadow-lg"
              disabled={inputValue === ''}
              onClick={handleGoToPage}
              >Đến</button>
          </div>
          {currentPage > 0 && (
            <div className="flex">
              <button
                onClick={() => setCurrentPage(0)}
                className={`w-9 h-9 mx-1 rounded-lg font-medium shadow-lg bg-[#4d4bb9] flex justify-center items-center`}>
                <ChevronDoubleLeftIcon className="w-5 h-5 stroke-white fill-white hover:stroke-black hover:fill-black" />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`w-9 h-9 mx-1 rounded-lg font-medium shadow-lg bg-[#4d4bb9] flex justify-center items-center`}>
                <ChevronLeftIcon className="w-5 h-5 stroke-white fill-white hover:stroke-black hover:fill-black" />
              </button>
            </div>

          )}
          {startPage > 0 && (
            <li className="mx-1 flex flex-row w-9 h-9 text-[#5C59E8] text-[20px]">
              &hellip;
            </li>
          )}

          {pageNumbers.slice(startPage, endPage + 1).map((page: number, index) => (
            <li key={index} className="mx-1 flex flex-row">
              <button
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg font-medium shadow-lg
                  ${currentPage === page ? "text-white bg-[#4d4bb9]" : "text-[#5C59E8] hover:text-black hover:underline"} `}
              >
                {page + 1}
              </button>
            </li>
          ))}

          {/* Hiển thị dấu 3 chấm nếu không ở trang cuối cùng */}
          {endPage < pageNumbers.length - 1 && (
            <li className="mx-1 flex flex-row w-9 h-9 text-[#5C59E8] text-[20px]">
              &hellip;
            </li>
          )}
          {currentPage !== pageNumbers.length - 1 && (
            <div className="flex">
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`w-9 h-9 mx-1 rounded-lg font-medium shadow-lg bg-[#4d4bb9] flex justify-center items-center`}>
                <ChevronRightIcon className="w-5 h-5 stroke-white fill-white hover:stroke-black hover:fill-black" />
              </button>
              <button
                onClick={() => setCurrentPage(pageNumbers.length-1)}
                className={`w-9 h-9 mx-1 rounded-lg font-medium shadow-lg bg-[#4d4bb9] flex justify-center items-center`}>
                <ChevronDoubleRightIcon className="w-5 h-5 stroke-white fill-white hover:stroke-black hover:fill-black" />
              </button>
            </div>

          )}
        </div>
      ) : ""}
    </div>
  );
};

export default Pagination;
