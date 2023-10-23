import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import React from 'react'

type Props = {}

const Search = (props: Props) => {

  return (
    <div className="py-2 px-3 flex bg-white w-[60vw] h-[45px] items-center space-x-3 rounded-xl">
    <MagnifyingGlassIcon className="w-5 h-5"/>
    <input 
    type="text"
    placeholder='Tìm kiếm sản phẩm'
    className="outline-none w-[58vw]"/>
    </div>
  )
}

export default Search