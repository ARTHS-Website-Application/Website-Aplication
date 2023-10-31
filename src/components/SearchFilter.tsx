import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

type Props = {
  place:string,
}

const SearchFilter = ({place}: Props) => {
  return (
    <form className="w-[70%]">
            <div className="w-full relative">
                <input
                    type="text"
                    placeholder={place}
                    className="w-full py-3 pl-3 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-gray-20"
                />
                <MagnifyingGlassIcon className="w-6 h-6 absolute right-3 top-0 bottom-0 my-auto stroke-gray-500"/>
            </div>
        </form>
  )
}

export default SearchFilter