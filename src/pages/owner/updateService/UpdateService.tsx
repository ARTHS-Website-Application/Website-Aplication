import { ChevronRightIcon, MagnifyingGlassIcon, PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Description from "@/components/Description";
import { FilterProductNotService } from '@/actions/product';
import { itemProduct, selectorProduct } from '@/types/actions/product';
import { detailService, updateService } from '@/actions/service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { dataProduct, itemService } from '@/types/actions/listService';
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
  const productInfor: itemProduct<string, number> = useSelector((state: selectorProduct<string, number>) => state.productReducer.productInfor);
  const [nameProduct, setNameProduct] = useState<string>('');
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [descriptionProduct, setDescriptionProduct] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [imagesUrl, setImagesUrl] = useState<images[]>([]);
  const [addSearch, setAddSearch] = useState<string>("")
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [checkedProduct, setCheckedProduct] = useState<dataProduct<string, number>[]>([]);
  const [addProduct, setAddProduct] = useState<string[]>([]);
  const [dataProduct, setDataProduct] = useState<dataProduct<string, number>[]>([])
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
      const productId = getDetailService?.motobikeProducts?.map(item => item.id)
      setAddProduct(productId);
      setCheckedProduct(getDetailService.motobikeProducts)
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }
  }, [dataProduct, dispatch, getDetailService, serviceId])

  //dispatch product not service
  useEffect(() => {
    const data = {
      pageSize: 50,
      noRepairService: true,
    }
    dispatch(FilterProductNotService(data))
  }, [dispatch])
  useEffect(() => {
    if (productInfor.data){
      const tranform = productInfor.data.map((item)=>{
        const itemMatched = {
          id: item?.id,
          name: item?.name,
          priceCurrent: item?.priceCurrent,
          discountAmount: item?.discount ? item?.discount?.discountAmount : 0,
          image: item?.images[0].imageUrl
        }
        return itemMatched})
        setDataProduct([...dataProduct,...getDetailService.motobikeProducts.map(item => ({ ...item })),...tranform.map(item => ({ ...item }))])
    }
      
  }, [productInfor.data])
  //search and choose product
  const itemSearch = dataProduct.filter((item) => {
    return item.name.toLowerCase().includes(addSearch.toLowerCase());
  })
  useEffect(() => {
    const matched = dataProduct?.filter((item) => addProduct.includes(item.id));

    setCheckedProduct(matched);
  }, [addProduct, dataProduct]);

  const handleProductChange = (value: string) => {
    if (addProduct.includes(value)) {
      setAddProduct(addProduct.filter(item => item !== value));
    } else {
      setAddProduct([...addProduct, value]);
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


  const handleCreateService = () => {
    const dataCreate = {
      name: nameProduct,
      price: priceProduct,
      motobikeProductIds: addProduct,
      description: descriptionProduct,
      images: images
    }
    if (nameProduct && priceProduct && addProduct && descriptionProduct) {
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
    const productId = getDetailService?.motobikeProducts?.map(item => item.id)
    setAddProduct(productId);
    setCheckedProduct(getDetailService.motobikeProducts)
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
              <div className='bg-white w-[75%] p-5 rounded-md'>
                <p className='text-[21px] font-semibold pb-3'>Thêm sản phẩm (các sản phẩm chưa có dịch vụ) </p>
                {checkedProduct?.length > 0 && (
                  <div className='overflow-y-scroll h-[10vh] px-3 py-4 space-y-3 mb-3'>
                    {checkedProduct?.map((item, index) => (
                      <div key={index} className='flex justify-between items-center'>
                        <div className='flex items-center space-x-2'>
                          <img src={item?.image} className='w-11 h-11' />
                          <label className='text-[19px]'>{item?.name}</label>
                        </div>
                        <XCircleIcon className='w-7 h-7 cursor-pointer fill-blue-gray-400 hover:fill-red-500'
                          onClick={() => handleProductChange(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex px-3 space-x-3 items-center border-2 border-[#E0E2E7] bg-[#E0E2E7] rounded-xl">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <input type="text"
                    placeholder='Tìm kiếm dòng xe'
                    className='py-3 w-[80%] text-[16px] outline-none bg-[#E0E2E7]'
                    onChange={(e) => {
                      if (searchTimeout) {
                        clearTimeout(searchTimeout);
                      }
                      const newTimeSearch = window.setTimeout(() => {
                        setAddSearch(e.target.value);
                      }, 800);
                      setSearchTimeout(newTimeSearch);
                    }}
                  />
                </div>
                <div className="overflow-y-scroll h-[30vh] px-3 py-1">
                  {itemSearch?.length > 0
                    ? itemSearch?.map((item, index) => (
                      <div className='flex space-x-3 space-y-3 items-center' key={index}>
                        <div className='pt-3'>
                          <input type="checkbox"
                            className='w-5 h-5'
                            checked={addProduct.includes(item?.id)}
                            onChange={() => handleProductChange(item?.id)}
                          />
                        </div>

                        <img src={item?.image} className='w-14 h-14' />
                        <label>{item?.name}</label>
                      </div>
                    )) : (
                      <div className="flex justify-center items-center">
                        <p>Không tìm thấy sản phẩm</p>
                      </div>
                    )}
                </div>

              </div>
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