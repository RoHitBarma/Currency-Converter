import React, { useEffect, useState } from 'react'
import Dropdowns from './Dropdowns'
import { HiArrowsRightLeft } from 'react-icons/hi2'

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]) // this state set dropdown currencis value.
  const [amount, setAmount] = useState(1) //set and change amount 

  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")

  const [convertedRate, setConvertedRate] = useState(null)
  const [converting, setConverting] = useState(false)
  
  // CURRENCIES API -  https://api.frankfurter.app/currencies

  const fetchCurrencies = async() => {
    
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data))
    } catch (error) {
      console.log(error) 
    }
  };

  useEffect(()=>{
    fetchCurrencies()
  }, [])
  console.log(currencies);

  // conversion API - URL - "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR" 
  const convertCurrency = async() => {
    if(!amount) return;
    setConverting(true)
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();

      setConvertedRate(data.rates[toCurrency] + " " + toCurrency)
    } catch (error) {
      console.log(error) 
    }finally {setConverting(false)}
  }

  const swapCurrencies = () => {
    setToCurrency(fromCurrency)
    setFromCurrency(toCurrency)
  }
  
  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
      <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter App</h2>
      <div className='flex justify-between items-center'>
        <Dropdowns 
          currencies={currencies} 
          currency={fromCurrency} 
          setCurrency={setFromCurrency}
          title='From: ' 
        />
        {/* Swap Currenncy Button */}
        <div className='mt-[18px]'>
          <button onClick={swapCurrencies} className='cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300'>
            <HiArrowsRightLeft className='text-xl'/>
          </button>
        </div>
        <Dropdowns 
          currencies={currencies}
          currency={toCurrency} 
          setCurrency={setToCurrency}
          title='To: ' 
        />
      </div>
      
      <div className='mt-4'>
        <label htmlFor="amount" className='block text-sm text-gray-700 font-medium'>
          Amount:
        </label>
        <input 
          type="number" 
          className='w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
          value={amount}
          onChange={(e)=> setAmount(e.target.value)}
        />
        
      </div>

      <div className='flex justify-end mt-6'>
        <button onClick={convertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:bg-indigo-500 cursor-pointer focus:ring-offset-2 ${converting ? "animate-pulse" : ""}`}>
          Convert
        </button>
      </div>

      {convertedRate && (<div className='mt-4 text-2xl font-medium text-green-700'>
        Converted Amount: {convertedRate}
      </div>)}
    </div>
  )
}

export default CurrencyConverter
