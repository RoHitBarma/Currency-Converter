
const Dropdowns = ({currencies, currency, setCurrency, title=""}) => {
  return (
    <div>
        <label htmlFor={title} className='block text-sm font-medium text-gray-700 mb-[3px]'> {title} </label>
        <div className='relative'>
            <select 
                onChange={(e) => setCurrency(e.target.value)} 
                value={currency} 
                className='w-full bg-gray-200 font-semibold p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer'
            >
                 
                <hr />
                {currencies.map((currency) => {
                    return(<option value={currency} key={currency}>
                        {currency}
                    </option>)

                })}
            </select> 
        </div>
    </div>
  )
}

export default Dropdowns
