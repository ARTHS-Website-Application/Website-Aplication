// src/components/RevenueChart.js
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { itemRevenue, itemStatics, pagination, selectorRevenue, selectorStatics } from '@/types/revenue';
import { getRevenue, getStatics } from '@/actions/revenue';
import { formatDateFeedback } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { selectorProduct } from '@/types/actions/product';
import { typeActiveProduct } from '@/types/typeProduct';
import { ShowProduct } from '@/actions/product';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const RevenueChart = () => {
    const dispatch = useDispatch();
    const motorbikeProduct = useSelector((state: selectorProduct<string, number>) => state.productReducer?.productInfor);
    const revenueInfo = useSelector((state: selectorRevenue<string, number>) => state.revenueReducer?.revenueInfo);
    const staticsInfo: itemStatics<string, number>[] = useSelector((state: selectorStatics<string, number>) => state.staticsReducer?.staticsInfo);
    const [productData, setProductData] = useState<pagination<number>>();
    const [staticsData, setStaticsData] = useState<itemStatics<string, number>[]>([]);
    const [revenueData, setRevenueData] = useState<itemRevenue<string, number>[]>([]);
    const [paginationNumber, setPaginationNumber] = useState<number>(0);
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [modalContent, setModalContent] = useState<ModalContent>({ month: '', transactions: [] });

    //console.log('product', motorbikeProduct.pagination.totalRow)

    interface ChartDataSet {
        label: string;
        data: number[];
        backgroundColor: string;
    }

    interface ChartData {
        labels: string[];
        datasets: ChartDataSet[];
    }

    interface ModalContent {
        month: string;
        transactions: itemRevenue<string, number>[];
    }
    interface TotalsByType {
        [key: string]: number;
    }

    interface PieChartDataSet {
        label: string;
        data: number[];
        backgroundColor: string[];
    }

    interface PieChartData {
        labels: string[];
        datasets: PieChartDataSet[];
    }

    const [pieChartData, setPieChartData] = useState<PieChartData>({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: [],
            },
        ],
    });
    const processRevenueData = (revenueData: itemStatics<string, number>[]) => {
        const revenueByMonth = new Array(12).fill(0);
        revenueData.forEach(item => {
            const transactionDate = new Date(item.transactionDate);
            const month = transactionDate.getMonth();
            revenueByMonth[month] += item.totalAmount;
        });
        return revenueByMonth;
    };

    const calculateTotalAnnualRevenue = (revenueData: itemStatics<string, number>[]) => {
        const monthlyRevenue = processRevenueData(revenueData);
        const totalAnnualRevenue = monthlyRevenue.reduce((acc, total) => acc + total, 0);
        //console.log('Doanh thu', totalAnnualRevenue)
        return totalAnnualRevenue;
    };


    const processPieChartData = (data: itemStatics<string, number>[]) => {
        //console.log('statics', data)

        const totalsByType = data.reduce((acc: TotalsByType, item) => {
            acc[item.orderType] = (acc[item.orderType] || 0) + item.totalAmount;
            return acc;
        }, {} as TotalsByType);

        return {
            labels: Object.keys(totalsByType),
            datasets: [
                {
                    label: 'Doanh thu',
                    data: Object.values(totalsByType),
                    backgroundColor: Object.keys(totalsByType).map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`),
                },
            ],
        };
    };

    const [chartData, setChartData] = useState<ChartData>({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Doanh thu',
                data: new Array(12).fill(0), // Initialize with zeros for each month
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }
        ]
    });

    const onChartClick = (_event: any, elements: string | any[]) => {
        if (elements.length === 0) return;

        const elementIndex = elements[0].index;
        const selectedMonthValue = elementIndex; // Save the selected month value
        setSelectedMonth(selectedMonthValue);

        const transactionsOfMonth = revenueData.filter(item => new Date(item.transactionDate).getMonth() === selectedMonthValue);
        setModalContent({ month: `Tháng ${selectedMonthValue + 1}`, transactions: transactionsOfMonth });

        const staticOfMonth = staticsData.filter(item => new Date(item.transactionDate).getMonth() === selectedMonthValue);
        const pieData = processPieChartData(staticOfMonth);
        setPieChartData(pieData);
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        onClick: onChartClick,
    };

    useEffect(() => {
        if (revenueInfo.pagination?.totalRow) {
            setPaginationNumber(0);
        }
    }, [revenueInfo.pagination?.totalRow]);


    useEffect(() => {
        const data = {
            number: paginationNumber,
            status: typeActiveProduct.Active,
        }
        dispatch(ShowProduct(data));

    }, [dispatch, paginationNumber])

    useEffect(() => {
        const filters = {
            status: 'Thành công',
            month: selectedMonth + 1,
            pageSize: 100,
        };
        dispatch(getRevenue(paginationNumber, filters));
    }, [dispatch, paginationNumber, selectedMonth]);


    useEffect(() => {
        const currentYear = new Date().getFullYear();
        dispatch(getStatics({ year: currentYear }));
    }, [dispatch]);


    useEffect(() => {
        setRevenueData(revenueInfo.data);
        setStaticsData(staticsInfo);
        setProductData(motorbikeProduct.pagination)
    }, [revenueInfo.data, staticsInfo, motorbikeProduct.pagination]);

    useEffect(() => {
        if (staticsData && staticsData.length > 0) {
            const currentMonth = selectedMonth;
            const processedData = processRevenueData(staticsData);
            setChartData(prevState => {
                const newData = [...prevState.datasets[0].data];
                processedData.forEach((amount, month) => {
                    newData[month] = amount;
                });
                return {
                    ...prevState,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: newData,
                        }
                    ],
                };
            });
            //const currentMonthTransactions = revenueData.filter(item => new Date(item.transactionDate).getMonth() === currentMonth);
            setModalContent({ month: `Tháng ${currentMonth + 1}`, transactions: revenueData });

            const currentMonthStatics = staticsData.filter(item => new Date(item.transactionDate).getMonth() === currentMonth);
            const pieData = processPieChartData(currentMonthStatics);
            setPieChartData(pieData);
        }
    }, [staticsData, revenueData]);




    return (
        <>
            <div className="p-3 bg-white shadow rounded-lg w-full flex flex-wrap justify-between mb-3">
                {/* Thêm phần hiển thị thông tin tổng doanh thu, tổng đơn hàng và tổng sản phẩm ở đây */}
                <div className="w-full mt-4 p-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Thông Tin Tổng Hợp của năm {new Date().getFullYear()}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tổng Doanh Thu</h3>
                            <p className="text-gray-600">{formatPrice(calculateTotalAnnualRevenue(staticsData))} VNĐ</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Số lượng giao dịch</h3>
                            <p className="text-gray-600">{staticsData.length}</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tổng Sản Phẩm</h3>
                            <p className="text-gray-600">{productData?.totalRow}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-white shadow rounded-lg w-full flex flex-wrap justify-between items-center">
                <div className='w-[65%] p-2'>
                    <div className="border border-gray-200 rounded-lg mb-4 p-2">
                        <h2 className="text-lg font-medium text-gray-800 mb-3">Biểu Đồ Doanh Thu Năm {new Date().getFullYear()}</h2>
                        <div className=" h-96"> {/* Set a fixed height */}
                            <Bar data={chartData} options={{ ...options, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg w-full lg:w-1/3 mb-4 p-2">
                    <h2 className="text-lg font-medium text-gray-800 mb-3">Phân Loại Giao Dịch Tháng {selectedMonth + 1}</h2>
                    <div className="h-96"> {/* Set a fixed height */}
                        <Pie data={pieChartData} options={{ ...pieOptions, maintainAspectRatio: false }} />
                    </div>
                </div>

            </div>
            {modalContent && modalContent.transactions && modalContent.transactions.length > 0 && (
                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-2">Chi Tiết Doanh Thu - {modalContent.month}</h3>
                    <div className="overflow-auto max-h-[400px] bg-white"> {/* Adjust max height as needed */}
                        <table className="w-full text-sm text-left text-gray-900">
                            <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">Ngày giao dịch</th>
                                    <th scope="col" className="py-3 px-6">Mã đơn hàng</th>
                                    <th scope="col" className="py-3 px-6">Loại Giao Dịch</th>
                                    <th scope="col" className="py-3 px-6">Số Tiền</th>
                                    <th scope="col" className="py-3 px-6">Phương Thức Thanh Toán</th>
                                    <th scope="col" className="py-3 px-6">Loại</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                {modalContent.transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-100 transition-all duration-200">
                                        <td className="py-4 px-6 border border-gray-300">{formatDateFeedback(transaction.transactionDate?.toString())}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.orderId}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.type}</td>
                                        <td className="py-4 px-6 border border-gray-300">{formatPrice(transaction.totalAmount)}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.paymentMethod}</td>
                                        <td className="py-4 px-6 border border-gray-300">{transaction.orderType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}

export default RevenueChart;