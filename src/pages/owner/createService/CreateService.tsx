import { ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Description from "@/components/Description";
import { postCreateService } from '@/actions/service';
import { Link } from 'react-router-dom';
import { itemWarrantyProduct, selectorWarrantyProduct } from '@/types/actions/listWarranty';
import { dataDiscount, itemDiscount, selectorDiscount } from '@/types/actions/listDiscout';
import { WarrantyProduct } from '@/actions/product';
import { getDiscountChoose } from '@/actions/discount';
import { Select, Option } from '@material-tailwind/react';
import LoadingPage from '@/components/LoadingPage';
import '../../../css/showDiscount.css';
const CreateService = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const warrantyChoose: itemWarrantyProduct<string, number>[] = useSelector((state: selectorWarrantyProduct<string, number>) => state.warrantyReducer.warrantyProduct);
  const discountProduct: dataDiscount<string, number> = useSelector((state: selectorDiscount<string, number>) => state.discountReducer.discountInfor);
  const [dataDiscount, setDataDiscount] = useState<itemDiscount<string, number>[]>([])
  const [nameProduct, setNameProduct] = useState<string>('');
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [reminderInterval, setReminderInterval] = useState<number>(0);
  const [addDiscount, setAddDiscount] = useState<string>("");
  const [addWarranty, setAddWarranty] = useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]);

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
  const handleAddWarranty = (inputValue: number) => {
    const matchingWarranty = warrantyChoose?.find(item => item.duration === inputValue);

    if (!isNaN(inputValue) && matchingWarranty) {
      setAddWarranty(matchingWarranty.duration);
    }
  };

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
    if (nameProduct && priceProduct && descriptionProduct && images && duration) {
      dispatch(postCreateService(dataCreate))
    } else {
      alert('Xin đừng bỏ trống ở những ký hiệu *')
    }
  }
  const handleClear = () => {
    setNameProduct('');
    setPriceProduct(0);
    setDescriptionProduct('');
    setImages([])
  }
  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
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
                      value={duration <= 0 ? "" : duration}
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
                    className="text-[20px] w-[250px] h-[50px] bg-gray-50"
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
                  <div className="flex space-x-1">
                    <p>Thời gian bảo hành(tối đa {warrantyChoose?.length} tháng) </p>
                    <p className="text-red-800">*</p>
                  </div>
                  <div className="w-full flex space-x-3 items-center">
                    <input
                      type="number"
                      placeholder="Nhập thời gian bảo hành"
                      className="text-[18px] w-[250px] h-[50px] bg-gray-50 border-2 border-blue-gray-200 rounded-lg p-2"
                      value={addWarranty !== null ? addWarranty : ''}
                      max={36} min={1}
                      onChange={(e) => {
                        if (0 < parseInt(e.target.value) && parseInt(e.target.value) <= 36) {
                          handleAddWarranty(parseInt(e.target.value))
                        } else {
                          if (parseInt(e.target.value) < 0) {
                            handleAddWarranty(1)
                          }
                          if (parseInt(e.target.value) > 36) {
                            handleAddWarranty(36)
                          }
                        }
                      }}
                    />
                    <p>THÁNG</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="pl-1">Khuyến mãi</p>
                  <Select
                    size="lg"
                    label="Lựa chọn khuyến mãi"
                    className="text-[20px] w-[250px] h-[50px] bg-gray-50 custom-truncate-class"
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
          {/* Ảnh */}
          <div className=" flex justify-center pt-7">
            <div className="bg-white w-[75%] min-h-[300px] rounded-md p-5 space-y-3">
              <div className="flex space-x-1">
                <p className='text-[20px]'>Hình ảnh</p>
                <p className="text-red-800">*</p>
              </div>
              <div className="bg-[#F9F9FC] border-dashed border-2 border-[#E0E2E7] py-5 flex flex-col justify-center items-center">
                {images.length > 0
                  ? (
                    <div className="flex justify-center items-center space-x-7 pb-5">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img src={URL.createObjectURL(image)} alt="Uploaded" className="h-32 object-cover border-2 border-[#E0E2E7]" />
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
            >Tạo dịch vụ</button>
            <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-gray-300 hover:bg-red-700'
              onClick={handleClear}
            >Hủy</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateService