import RevenueChart from "@/components/owner/RevenueChart";



const HomeOwner = () => {
  // const dispatch = useDispatch();
  // const staticsInfo:itemStatics<string,number>[] = useSelector((state: selectorStatics<string, number>) => state.staticsReducer?.staticsInfo);
  // const [staticsData, setStaticsData] = useState<itemStatics<string, number>[]>([]);
  // console.log('data', staticsData);
  // useEffect(() => {
  //   const currentYear = new Date().getFullYear();
  //   dispatch(getStatics({ year: currentYear }));
  // }, [dispatch]);

  // useEffect(() => {
  //   setStaticsData(staticsInfo);
  // }, [staticsInfo]);
  

  return (
    //<div>Hello</div>
    <div><RevenueChart/></div>
  )
}

export default HomeOwner

