import { ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Description from "@/components/Description";
import { FilterProductNotService } from '@/actions/product';
import { detailService, updateService } from '@/actions/service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { itemService } from '@/types/actions/listService';
import { selectorDetailService } from '@/types/actions/detailService';
import { images } from '@/types/images';
import LoadingPage from '@/components/LoadingPage';
import { showSuccessAlert } from '@/constants/chooseToastify';
const UpdateService = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const getDetailService: itemService<string, number> = useSelector((state: selectorDetailService<string, number>) => state.serviceDetailReducer.serviceDetail)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameProduct, setNameProduct] = useState<string>('');
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<images[]>([]);
  //dispatch detail
  useEffect(() => {
    if (serviceId) {
      dispatch(detailService(serviceId));
      setIsLoading(true);
    }
  }, [dispatch, serviceId]);
  //getDetailService
  useEffect(() => {
    if (getDetailService?.id === serviceId) {
      setNameProduct(getDetailService.name);
      setPriceProduct(getDetailService.price);
      setDescriptionProduct(getDetailService.description);
      setImagesUrl(getDetailService.images);
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
  }, [dispatch, getDetailService, serviceId])

  //dispatch product not service
  useEffect(() => {
    const data = {
      pageSize: 50,
      noRepairService: true,
    }
    dispatch(FilterProductNotService(data))
  }, [dispatch])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const selectedImages = Array.from(fileList) as File[];

      if (selectedImages.length + images.length <= 4) {
        setImages([...images, ...selectedImages]);
      } else {
        alert('Bạn chỉ có thể tải lên tối đa 4 ảnh.');
      }
    }

  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  }

  const handleDescription = (value: string) => {
    setDescriptionProduct(value);
  }


  const handleCreateService = () => {
    const dataCreate = {
      name: nameProduct,
      price: priceProduct,
      description: descriptionProduct,
      images: images
    }
    if (nameProduct && priceProduct && descriptionProduct) {
      dispatch(updateService(getDetailService.id, dataCreate))
      navigate(`/manage-services/${serviceId}`)
        showSuccessAlert("Cập nhật thành công");
    } else {
      alert('Xin đừng bỏ trống')
    }
  }
  const handleClear = () => {
    setNameProduct(getDetailService.name);
    setPriceProduct(getDetailService.price);
    setDescriptionProduct(getDetailService.description);
    setImagesUrl(getDetailService.images);
  }
  return (
    <div>
      {isLoading
        ? <LoadingPage />
        : (
          <div>
            <div className="flex space-x-3 items-center text-[21px] font-semibold">
              <Link to="/manage-services" className="hover:text-main">Danh sách dịch vụ</Link>
              <ChevronRightIcon className="w-5 h-5" />
              <h1 className=" text-main">Tạo mới dịch vụ</h1>
            </div>
            <div className="flex justify-center pt-5">
              <div className="bg-white w-[75%] p-5 rounded-md">
                <p className="text-[21px] font-semibold">Thông tin dịch vụ</p>
                <div className="w-full flex justify-between items-center px-3 py-5 text-[#6B7280] text-[19px] ">
                  <div className="space-y-3">
                    <p className="pl-1">Tên</p>
                    <input type="text"
                      value={nameProduct}
                      placeholder='Tên dịch vụ'
                      className='outline-none  w-[700px] p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl '
                      onChange={(e) => setNameProduct(e.target.value)}
                    />
                  </div>
                  <div className=" space-y-3">
                    <p>Giá tiền</p>
                    <div className="flex items-center space-x-2">
                      <input type="number"
                        min={1}
                        value={priceProduct === 0 ? "" : priceProduct}
                        placeholder="Nhập số tiền"
                        className='outline-none p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl'
                        onChange={(e) => setPriceProduct(parseInt(e.target.value))}
                      />
                      <p>VNĐ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*add product */}
            <div className='flex justify-center pt-5'>
            </div>
            {/* Ảnh */}
            <div className=" flex justify-center pt-7">
              <div className="bg-white w-[75%] min-h-[300px] rounded-md p-5 space-y-3">
                <p className="text-[20px]">Hình ảnh</p>
                <div className="bg-[#F9F9FC] border-dashed border-2 border-[#E0E2E7] py-5 flex flex-col justify-center items-center">
                  {imagesUrl?.length > 0
                    ? (
                      <div className="flex justify-center items-center space-x-7 pb-5">
                        {imagesUrl.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              // src={URL.createObjectURL(image)} 
                              src={image.imageUrl}
                              alt="Uploaded"
                              className="h-32 object-cover border-2 border-[#E0E2E7]" />
                            <button onClick={() => handleRemoveImage(index)} className="absolute right-1 top-1 text-gray-400 w-5 h-5 bg-white rounded-full flex justify-center items-center">x</button>
                          </div>
                        ))}
                      </div>
                    )
                    : (
                      <div className="flex flex-col justify-center items-center py-4">
                        <div className="rounded-full w-[50px] h-[50px] bg-[#DEDEFA] border-4 border-[#EFEFFD] flex justify-center items-center">
                          <PhotoIcon className="w-7 h-9 fill-[#5C59E8]" />
                        </div>
                        <p className="text-[#858D9D]">Chưa có ảnh được thêm vào</p>
                      </div>
                    )}
                  <label htmlFor="fileInput" className="relative cursor-pointer bg-[#DEDEFA] text-[#5C59E8] font-semibold px-4 py-2 rounded hover:bg-[#9b9ad7]">
                    <span className="absolute top-0 left-0 right-0 bottom-0 opacity-0 z-10 cursor-pointer"></span>
                    Thêm ảnh
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="fileInput"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <div className="pt-7">
              <Description dataValue={descriptionProduct} handleDescription={handleDescription} />
            </div>

            {/* Tạo */}
            <div className="py-5 flex flex-row-reverse space-x-reverse space-x-5">
              <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-gray-300 hover:bg-green-600'
                onClick={handleCreateService}
              >Cập nhật dịch vụ</button>
              <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-gray-300 hover:bg-red-700'
                onClick={handleClear}
              >Hủy</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default UpdateService