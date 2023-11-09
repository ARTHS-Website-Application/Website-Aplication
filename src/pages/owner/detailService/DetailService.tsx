import { detailService } from '@/actions/service';
import LoadingPage from '@/components/LoadingPage';
import { selectorDetailService } from '@/types/actions/detailService';
import { itemService } from '@/types/actions/listService';
import { typeActiveProduct } from '@/types/typeProduct';
import { formatPrice } from '@/utils/formatPrice';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const getDetailService: itemService<string, number> = useSelector((state: selectorDetailService<string, number>) => state.serviceDetailReducer.serviceDetail)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [data, setData] = useState<itemService<string, number>>();
  useEffect(() => {
    if (serviceId) {
      dispatch(detailService(serviceId));
      setIsLoading(true);
    }
  }, [dispatch, serviceId]);
  useEffect(() => {
    if (getDetailService?.id === serviceId) {
      // const dataService = {
      //   pageSize: 50,
      //   repairService:getDetailService.name
      // }
      // dispatch(FilterProductService(dataService))
      setData(getDetailService);
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
  }, [dispatch, getDetailService, serviceId])
  const handleChangeImage = (index: number) => {
    setSelectedImage(index);
  }
  console.log(data)
  return (
    <div className="w-full">
      <div className="font-semibold text-[20px] flex space-x-4 items-center pt-3">
        <Link to="/manage-services" className="hover:text-main">Danh sách dịch vụ</Link>
        <ChevronRightIcon className="w-5 h-5" />
        <p className="text-main">Chi tiết dịch vụ</p>
      </div>
      {isLoading
        ? <LoadingPage />
        : (<div>
          <div className="flex justify-between py-5  space-x-4">
            <div className="bg-white flex flex-col justify-center items-center rounded-lg py-3 w-[60%]">
              {data?.images && (
                <div className='bg-white shadow-lg p-2 rounded-lg'>
                  <img
                    src={data?.images[selectedImage].imageUrl}
                    alt=""
                    className='h-[480px] object-contain'
                  />
                </div>
              )}
              <div className='py-5'>
                <div className='flex justify-center px-2'>
                  <div className={`grid grid-cols-${data?.images?.length ?? 1} gap-x-7`}>
                    {data?.images && data?.images.map((item, index) => (
                      <div key={index} className={`p-2  rounded-lg flex justify-center cursor-pointer  items-center ${index === selectedImage ? 'border-4 border-blue-400' : ''} `}>
                        <img
                          src={item.imageUrl}
                          alt=""
                          className={`h-[170px] object-contain`}
                          onMouseEnter={() => handleChangeImage(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[45%] space-y-5">
              <div className="bg-white p-5 text-[17px] rounded-lg">
                <div className='flex justify-between items-start'>
                  <p className='font-semibold text-[20px] px-1'>{data?.name}</p>
                  <div className='flex min-w-[150px] space-x-2 p-2 items-center border-2 border-gray-200 rounded-lg'>
                    <div className={`w-2 h-2 rounded-full ${data?.status === typeActiveProduct.Active ? "bg-green-600" : "bg-black"}`}></div>
                    <p className='font-semibold text-[14px]'>
                      {data?.status}
                    </p>
                  </div>
                </div>
                <p className='font-semibold text-[19px] py-5'> Chi tiết</p>
                <div className='flex justify-between text-[#6B7280] items-center'>
                  <p>Giá dịch vụ</p>
                  <div className='space-y-5 flex flex-col text-end'>
                    <p>{formatPrice(data?.price)}VNĐ</p>
                  </div>
                </div>
              </div>
              <div className='bg-white p-5 text-[17px] rounded-lg'>
                <p className='font-semibold text-[20px] pb-5'>Sản phẩm áp dụng</p>
                  {data?.motobikeProducts && data?.motobikeProducts?.length>0
                  ?(
                    <div className='overflow-y-scroll h-[300px]'>
                    <div className='space-y-3'>
                    {data?.motobikeProducts && data?.motobikeProducts?.map((item, index) => (
                      <Link to={`/manage-products/${item.id}`} key={index} className='flex space-x-3 items-center hover:text-blue-400'>
                        <img src={item.image} alt="" className="w-11 h-11"/>
                        <p className='text-[21px]'>{item.name}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                  ):(
                    <div className='h-[100px] flex justify-center items-center'>
                      <p className='text-[20px]'>Chưa có sản phẩm</p>
                    </div>
                  )}
                  
              </div>
            </div>

          </div>
          <div className=' flex justify-center items-center py-5'>
            {data?.description && (
              <div className='bg-white w-full rounded-lg p-5 space-y-3'>
                <p className='font-semibold text-[20px]'>Mô tả sản phẩm</p>
                <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
              </div>
            )}
          </div>
        </div>
        )
      }



    </div >
  )
}

export default ProductDetail