import { ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Description from "@/components/Description";
import { FilterProductNotService, WarrantyProduct } from '@/actions/product';
import { detailService, updateService } from '@/actions/service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { itemService } from '@/types/actions/listService';
import { selectorDetailService } from '@/types/actions/detailService';
import { images } from '@/types/images';
import LoadingPage from '@/components/LoadingPage';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { Option, Select } from '@material-tailwind/react';
import { itemWarrantyProduct, selectorWarrantyProduct } from '@/types/actions/listWarranty';
import { dataDiscount, itemDiscount, selectorDiscount } from '@/types/actions/listDiscout';
import { getDiscountChoose } from '@/actions/discount';
const UpdateService = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDetailService: itemService<string, number> = useSelector((state: selectorDetailService<string, number>) => state.serviceDetailReducer.serviceDetail);
  const warrantyChoose: itemWarrantyProduct<string, number>[] = useSelector((state: selectorWarrantyProduct<string, number>) => state.warrantyReducer.warrantyProduct);
  const discountProduct: dataDiscount<string, number> = useSelector((state: selectorDiscount<string, number>) => state.discountReducer.discountInfor);
  const [dataDiscount, setDataDiscount] = useState<itemDiscount<string, number>[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nameProduct, setNameProduct] = useState<string>('');
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [reminderInterval, setReminderInterval] = useState<number>(0);
  const [addDiscount, setAddDiscount] = useState<string>("");
  const [addWarranty, setAddWarranty] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<images[]>([]);
  useEffect(() => {
    dispatch(WarrantyProduct());
    dispatch(getDiscountChoose(50));
    setIsLoading(true)
  }, [dispatch])
  useEffect(() => {
    if (discountProduct?.data?.length > 0) {
      setDataDiscount(discountProduct.data)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }, [discountProduct])
  //dispatch detail
  useEffect(() => {
    if (serviceId) {
      dispatch(detailService(serviceId));
      setIsLoading(true);
    }
  }, [dispatch, serviceId]);
  //getDetailService
  useEffect(() => {
    if (getDetailService && getDetailService?.id === serviceId) {
      setNameProduct(getDetailService.name);
      setPriceProduct(getDetailService.price);
      setDescriptionProduct(getDetailService.description);
      setImagesUrl(getDetailService.images);
      setDuration(getDetailService.duration);
      setReminderInterval(getDetailService.reminderInterval);
      // setAddDiscount;
      setAddWarranty(getDetailService.warrantyDuration);
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
  const handleAddWarranty = (e: string | undefined) => {
    if (e) {
      setAddWarranty(parseInt(e))
    }
  }

  const handleAddDiscount = (e: string | undefined) => {
    if (e) {
      setAddDiscount(e)
    }
  }

  const handleReminderInterval = (e: string | undefined) => {
    if (e) {
      setReminderInterval(parseInt(e))
    }
  }


  const handleCreateService = () => {
    const dataCreate = {
      name: nameProduct,
      price: priceProduct,
      description: descriptionProduct,
      duration: duration,
      reminderInterval: reminderInterval,
      discountId: addDiscount,
      warrantyDuration: addWarranty,
      images: images
    }
    if (nameProduct && priceProduct && descriptionProduct && duration) {
      dispatch(updateService(getDetailService.id, dataCreate))
      navigate(`/manage-services/${serviceId}`)
      showSuccessAlert("Cập nhật thành công");
    } else {
      alert('Xin đừng bỏ trống ở những ký tự hiệu *')
    }
  }
  const handleClear = () => {
    setNameProduct(getDetailService.name);
    setPriceProduct(getDetailService.price);
    setDescriptionProduct(getDetailService.description);
    setImagesUrl(getDetailService.images);
    setDuration(getDetailService.duration);
    setReminderInterval(getDetailService.reminderInterval);
    // setAddDiscount;
    setAddWarranty(getDetailService.warrantyDuration);
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
                    <div className="flex space-x-1">
                      <p>Tên dịch vụ</p>
                      <p className="text-red-800">*</p>
                    </div>
                    <input type="text"
                      value={nameProduct}
                      placeholder='Tên dịch vụ'
                      className='outline-none  w-[700px] p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl '
                      onChange={(e) => setNameProduct(e.target.value)}
                    />
                  </div>
                  <div className=" space-y-3">
                    <div className="flex space-x-1">
                      <p>Giá tiền(VNĐ)</p>
                      <p className="text-red-800">*</p>
                    </div>
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
                <div className="flex justify-between py-5 text-[#6B7280] text-[19px] px-3">
                  <div className="flex flex-col space-y-3">
                    <div className="flex space-x-1">
                      <p>Thời gian làm dịch vụ</p>
                      <p className="text-red-800">*</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="number"
                        min={1}
                        value={duration === 0 ? "" : duration}
                        placeholder="Nhập số phút"
                        className='outline-none p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl'
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                      />
                    </div>

                  </div>
                  <div className="flex flex-col space-y-3">
                    <p className="pl-1">Thời gian nhắc nhở</p>
                    <Select
                      size="lg"
                      label="Lựa chọn tháng"
                      value={reminderInterval.toString()}
                      className="text-[18px] w-[250px] h-[50px] bg-gray-50"
                      onChange={handleReminderInterval}
                    >
                      {
                        Array.from({ length: 12 }, (_, index) => index + 1).map((value, index) => (
                          <Option
                            value={value.toString()}
                            key={index}
                            className="text-[18px]"
                          >{value} tháng</Option>
                        ))
                      }
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between py-5 text-[#6B7280] text-[19px] px-3">
                  <div className="flex flex-col space-y-3">
                    <p>Thời gian bảo hành </p>
                    <div className="w-[250px] text-[18px]">
                      <Select
                        className="px-3 h-[50px] bg-gray-50 text-[18px]"
                        label="Chọn thời gian bảo hành"
                        value={addWarranty.toString()}
                        onChange={handleAddWarranty}
                      >
                        {warrantyChoose && warrantyChoose.length > 0
                          ? warrantyChoose?.map((item, index) => (
                            <Option
                              value={item?.duration.toString()}
                              key={index}
                              className="text-[18px]"
                            >{item?.duration} tháng</Option>
                          ))
                          : ""
                        }
                      </Select>
                    </div>

                  </div>
                  <div className="flex flex-col space-y-3">
                    <p className="pl-1">Khuyến mãi</p>
                    <Select
                      size="lg"
                      label="Lựa chọn khuyến mãi"
                      className="text-[20px] w-[250px] h-[50px] bg-gray-50"
                      onChange={handleAddDiscount}
                    >
                      {dataDiscount?.length > 0
                        ? dataDiscount?.map((item, index) => (
                          <Option
                            value={item.id}
                            key={index}
                            className="text-[18px]"
                          >{item.title}</Option>
                        ))
                        : ""
                      }
                    </Select>
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
                <div className="flex space-x-1">
                  <p className='text-[20px]'>Hình ảnh</p>
                  <p className="text-red-800">*</p>
                </div>
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