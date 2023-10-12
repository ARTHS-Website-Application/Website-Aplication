import { BeatLoader } from 'react-spinners'


const Loading = () => {
  return (
    <div className="w-full h-[60vh] flex justify-center items-center">
        <BeatLoader
  color="#BD3505"
  margin={10}
  size={21}
/>
    </div>
  )
}

export default Loading