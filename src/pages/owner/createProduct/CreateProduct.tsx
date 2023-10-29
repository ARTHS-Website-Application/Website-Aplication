import { Select, Option } from "@material-tailwind/react";
import { CategoryProduct, getVehicleProduct, getVehicleSearch, postCreateProduct } from '@/actions/product';
import { getServicesChoose } from '@/actions/service';
import { itemCategoryProduct, selectorCategoryProduct } from '@/types/actions/categoryPr';
import { dataService, selectorService } from '@/types/actions/listService';
import { ChevronDownIcon, MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemVehicleProduct, selectorVehicleProduct } from "@/types/actions/listVehicle";
import { getDiscountChoose } from "@/actions/discount";
import { itemDiscount, selectorDiscount } from "@/types/actions/listDiscout";
import { item } from "@/types/actions/product";
import { selectorDetailProduct } from "@/types/actions/detailProduct";
import { useNavigate } from "react-router-dom";
import Description from "@/components/Description";

const CreateProduct = () => {
  const [showVehicle, setShowVehicle] = useState<boolean>(false);
  const dispatch = useDispatch();
  const categoryProduct: itemCategoryProduct<string>[] = useSelector((state: selectorCategoryProduct<string>) => state.categoryProductReducer.categoryProduct);
  const discountProduct: itemDiscount<string, number>[] = useSelector((state: selectorDiscount<string, number>) => state.discountReducer.discountInfor);
  const vehicleProduct: itemVehicleProduct<string>[] = useSelector((state: selectorVehicleProduct<string>) => state.vehicleProductReducer.vehicleProduct);
  const serviceChoose: dataService<string, number> = useSelector((state: selectorService<string, number>) => state.serviceReducer.serviceInfor);
  const detailProduct: item<string, number> = useSelector((state: selectorDetailProduct<string, number>) => state.productDetailReducer.productDetail)

  const [nameProduct, setNameProduct] = useState<string>('');
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');
  const [addCategory, setAddCategory] = useState<string>("");
  const [addDiscount, setAddDiscount] = useState<string>("");
  const [addService, setAddService] = useState<string>("");
  const [addWarranty, setAddWarranty] = useState<string>("");
  const [checkedVehicles, setCheckedVehicles] = useState<itemVehicleProduct<string>[]>([]);
  const [addVehicle, setAddVehicle] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [addSearch, setAddSearch] = useState<string>("")
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  console.log(addVehicle)
  const navigate = useNavigate()
  useEffect(() => {
  }, [])
  useEffect(() => {
    const matched = vehicleProduct?.filter((vehicle) => addVehicle.includes(vehicle.id));
    setCheckedVehicles(matched);
  }, [addVehicle, vehicleProduct]);
  useEffect(() => {
    dispatch(CategoryProduct());
    dispatch(getDiscountChoose());
    dispatch(getServicesChoose(50));
    if (addSearch !== "") {
      dispatch(getVehicleSearch(addSearch))
    } else {
      dispatch(getVehicleProduct())
    }

  }, [dispatch, addSearch])

  const handleShowVehicle = () => {
    setShowVehicle(!showVehicle);
  }
  const handleAddService = (e: string) => {
    setAddService(e)
  }
  const handleAddCategory = (e: string) => {
    setAddCategory(e)
  }

  const handleAddDiscount = (e: string) => {
    setAddDiscount(e)
  }
  const handleVehicleChange = (value: string) => {
    if (addVehicle.includes(value)) {
      setAddVehicle(addVehicle.filter(item => item !== value));
    } else {
      setAddVehicle([...addVehicle, value]);
    }
  };



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


  const handleCreateProduct = () => {
    const dataCreate = {
      name: nameProduct,
      priceCurrent: priceProduct,
      quantity: quantityProduct,
      description: descriptionProduct,
      repairServiceId: addService,
      discountId: addDiscount,
      warrantyId: addWarranty,
      categoryId: addCategory,
      vehiclesId: addVehicle,
      images: images
    }
    dispatch(postCreateProduct(dataCreate))
    navigate(`/manage-products/${detailProduct.id}`)
    console.log("data", dataCreate)
  }
  return (
    <div>
      <h1 className="text-[25px] font-semibold text-main">Tạo mới sản phẩm</h1>
      <div className="flex space-x-[3%] pt-5">
        <div className="bg-white w-[60%] p-5 rounded-md">
          <p className="text-[21px] font-semibold">Thông tin chung</p>
          <div className="w-[97%] text-[#6B7280] text-[19px] py-5 ">
            <div className="space-y-3">
              <p className="pl-1">Tên</p>
              <input type="text"
                value={nameProduct}
                placeholder='Tên sản phẩm'
                className='outline-none  w-full p-3 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl '
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </div>
            <div className="flex justify-between pt-7">
              <div className="flex items-center space-x-3">
                <p>Số lượng</p>
                <input type="number"
                  min={1}
                  placeholder="Nhập số sản phẩm"
                  className='outline-none p-2 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl'
                  onChange={(e) => setQuantityProduct(parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-3">
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
            <div className="flex justify-between pt-7">
              <div className="flex flex-col space-y-3">
                <p className="pl-1">Thời gian bảo hành</p>
                <select name="" id="" className="w-[250px] border-2 border-[#E5E7EB] p-3 rounded-lg ">
                  <option value="">Thời gian bảo hành</option>
                  <option value="">3 tháng</option>
                </select>
              </div>
              <div className="flex flex-col space-y-3">
                <p className="pl-1">Khuyến mãi</p>
                <Select
                  size="lg"
                  label="Lựa chọn khuyến mãi"
                  className="text-[20px] w-[250px] h-[50px] bg-gray-50"
                  onChange={handleAddDiscount}
                >
                  {discountProduct
                    ? discountProduct.map((item, index) => (
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
        {/* Thể loại */}
        <div className="bg-white w-[40%] p-5 rounded-md ">
          <p className="text-[21px] font-semibold">Thể loại</p>
          <div className="w-[97%] text-[#6B7280] text-[19px] py-5 space-y-5 ">
            <div className="flex flex-col space-y-3">
              <p className="pl-1">Dịch vụ</p>
              <Select
                className="text-[18px] h-[50px] bg-gray-50"
                size="lg"
                label="Lựa chọn dịch vụ"
                onChange={handleAddService}
              >
                {serviceChoose?.data
                  ? serviceChoose?.data?.map((item, index) => (
                    <Option
                      value={item?.id}
                      key={index}
                      className="text-[18px]"
                    >{item?.name}</Option>
                  ))
                  : ""
                }
              </Select>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="pl-1">Loại sản phẩm</p>
              <Select
                size="lg"
                label="Lựa chọn sản phẩm"
                className="text-[20px] h-[50px] bg-gray-50"
                onChange={handleAddCategory}
              >
                {categoryProduct
                  ? categoryProduct.map((item, index) => (
                    <Option
                      value={item.id}
                      key={index}
                      className="text-[18px]"
                    >{item.categoryName}</Option>
                  ))
                  : ""
                }
              </Select>
            </div>
            <div className="space-y-3">
              <p className="pl-1">Thương hiệu xe</p>
              {checkedVehicles?.length > 0
                ? (
                  <div className="flex w-full p-3 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl focus:border-blue-500">
                    <div className={`${checkedVehicles?.length > 3 ? "overflow-y-scroll h-[100px]" : ""}  w-[98%] `}>
                      <div className='grid grid-cols-3 gap-2 px-1'>
                        {checkedVehicles?.map((item, index) => (
                          <div key={index} className='flex justify-between text-[14px] items-center px-2  py-2 border-2 border-gray-200 rounded-lg'>
                            <p className="text-center">{item?.vehicleName}</p>
                            <button className="font-semibold text-[20px]" onClick={() => handleVehicleChange(item.id)}>x</button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleShowVehicle}
                    >
                      <ChevronDownIcon className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <button className="w-full p-3 border-2 border-[#E5E7EB] bg-gray-50 rounded-xl focus:border-blue-500"
                      onClick={handleShowVehicle}
                    >
                      <div className="flex justify-between items-center">
                        <p>Chọn thương hiệu xe</p>
                        <ChevronDownIcon className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                )}
            </div>
            {showVehicle ? (
              <div className='space-y-5'>
                <div className="flex px-3 space-x-3 items-center border-2 border-[#E0E2E7] bg-[#E0E2E7] rounded-xl">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <input type="text"
                    placeholder='Tìm kiếm dòng xe'
                    className='py-3 text-[16px] outline-none bg-[#E0E2E7]'
                    onChange={(e) => {
                      if (searchTimeout) {
                        clearTimeout(searchTimeout);
                      }
                      const newTimeSearch = window.setTimeout(() => {
                        setAddSearch(e.target.value);
                      }, 800);

                      // Cập nhật trạng thái searchTimeout
                      setSearchTimeout(newTimeSearch);
                    }}
                  />
                </div>

                <div className="overflow-y-scroll h-[30vh] px-3">
                  {vehicleProduct?.length > 0
                    ? vehicleProduct?.map((item, index) => (
                      <div className='flex space-x-3 items-center' key={index}>
                        <input type="checkbox"
                          className='w-5 h-5'
                          checked={addVehicle.includes(item?.id)}
                          onChange={() => handleVehicleChange(item?.id)}
                        />
                        <label>{item?.vehicleName}</label>
                      </div>
                    )) : (
                      <div className="flex justify-center items-center">
                        <p>Không tìm thấy thương hiệu này</p>
                      </div>
                    )}
                </div>
              </div>
            ) : ""}
          </div>
        </div>
      </div>
      {/* Ảnh */}
      <div className=" flex justify-center pt-7">
        <div className="bg-white w-[75%] min-h-[300px] rounded-md p-5 space-y-3">
          <p className="text-[20px]">Hình ảnh</p>
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
          onClick={handleCreateProduct}
        >Thêm sản phẩm</button>
        <button className='w-[200px] h-[60px] text-center bg-slate-300 text-[20px] rounded-lg text-white font-semibold bg-gray-300 hover:bg-red-700'
        >Hủy</button>
      </div>
    </div>
  )
}

export default CreateProduct