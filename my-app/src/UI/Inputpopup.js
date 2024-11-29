import React, { useState } from 'react';

const InputPopup = ({ title, button, onConfirm, sub1, sub2, sub3}) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg w-1/2 h-1/2 relative ml-32"> 
                <h1 className="text-3xl text-center mb-4 mt-6">{title}</h1>
                
                <div className="mb-2 flex justify-center items-center mt-10">
                    <p className="text-m mr-4">{sub1}</p>
                    <input 
                        type="text" 
                        onChange={(e) => setInput1(e.target.value)}
                        className="border-2 border-gray-300 rounded-3xl h-10 w-1/3 shadow-lg"
                    />
                </div>
                
                <div className="mb-2 flex justify-center items-center mt-6">
                    <p className="text-m mr-4">{sub2}</p>
                    <input 
                        type="text" 
                        onChange={(e) => setInput2(e.target.value)}
                        className="border-2 border-gray-300 rounded-3xl h-10 w-1/3  p-1 shadow-lg"
                    />
                </div>
                
                <div className="mb-2 flex justify-center items-center mt-6">
                    <p className="text-m mr-4">{sub3}</p>
                    <input 
                        type="text" 
                        onChange={(e) => setInput3(e.target.value)}
                        className="border-2 border-gray-300 rounded-3xl h-10 w-1/3 p-1 shadow-lg"
                    />
                </div>
                
                <button 
                    onClick={onConfirm}
                    className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mx-auto block mt-10"
                >
                    {button}
                </button>
                <button
                    onClick={onConfirm}
                    className="absolute top-3 right-3 text-bold text-gray-500 hover:text-gray-700 text-2xl"
            
                >
                    x
                </button>
            </div>
        </div>
    );
};

export default InputPopup;


