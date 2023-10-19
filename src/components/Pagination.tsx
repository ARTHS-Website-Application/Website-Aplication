import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum: string | null = searchParams.get('page');
  console.log("pageNum", pageNum);

  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Sử dụng useEffect để kiểm tra giá trị 'page' khi component được tạo và mỗi khi query parameter thay đổi
  useEffect(() => {
    // Kiểm tra nếu có giá trị 'page' trong query parameter
    if (pageNum !== null) {
      // Chuyển đổi giá trị 'page' từ chuỗi thành số nguyên và cập nhật setCurrentPage
      setCurrentPage(parseInt(pageNum, pageNumbers.length+1) - 1);
    }
  }, [pageNum, setCurrentPage]);

  return (
    <div>
      {pageNumbers.length > 1 ? (
        <div className="w-full py-4 flex justify-center">
          {pageNumbers.map((page: number, index) => (
            <li key={index} className="mx-1 flex flex-row">
              <button
                onClick={() => {
                  setSearchParams({ page: (page + 1).toString() });
                  if (pageNum !== null) {
                    console.log("pageNum o if", pageNum);
                    setCurrentPage(parseInt(pageNum) - 1);
                  }
                }}
                className={`w-9 h-9 rounded-lg font-medium shadow-lg
                  ${currentPage === page ? "text-white bg-[#4d4bb9]" : "text-[#5C59E8] hover:text-black hover:underline"} `}
              >
                {page + 1}
              </button>
            </li>
          ))}
        </div>
      ) : ""}
    </div>
  );
};

export default Pagination;
