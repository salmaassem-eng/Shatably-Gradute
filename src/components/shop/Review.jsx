import pay from '../../assets/money.gif';
import shipping from '../../assets/delivery-truck.gif';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Review() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src={pay}
                        alt="Payment processing"
                        className="w-[25rem] h-[25rem] object-contain"
                    />
                    <h2 className="text-[#16404D] text-2xl font-semibold mt-4">Processing Payment...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto px-4">
                <div className="flex justify-center w-full mt-[7rem] ml-[7rem]">
                            {/* Shopping */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                    <div className="h-[2px] bg-[#16404D] w-[12rem] absolute left-7"></div>
                                </div>
                                <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Shopping</span>
                            </div>

                            {/* Payment */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                    <div className="h-[2px] bg-[#16404D] w-[12rem] absolute left-7"></div>
                                </div>
                                <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Payment</span>
                            </div>

                            {/* Shipping */}
                            <div className="relative w-[12rem]">
                                <div className="flex items-center">
                                    <div className="w-7 h-7 rounded-[50%] bg-[#16404D] flex items-center justify-center"></div>
                                </div>
                                <span className="absolute text-sm text-[#16404D] left-[-0.8rem] top-10">Shipping</span>
                            </div>
                        </div>
                <div className="flex items-center justify-center w-full">
                    <img
                        src={shipping}
                        alt="Shipping in progress"
                        className="w-[25rem] h-[25rem] object-contain"
                    />
                </div>
                <h2 className="text-[#16404D] text-2xl font-semibold mt-4 mr-8">Transaction Successful!</h2>
                <p className="text-gray-600 my-2 text-center">"Payment successful! Thank you for your payment. Your transaction has been completed successfully."</p>
                <Link to='/'>
                    <button className="text-[white] bg-[#16404D] rounded-[25px] hover:opacity-90 w-[14rem] p-3 mr-6 mt-4">
                        Back to home
                    </button>
                </Link>
            </div>
        </div>
    );
}