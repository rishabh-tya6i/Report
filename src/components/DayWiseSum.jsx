import React from 'react'

const DayWiseSum = ({totalPnL, maxProfit, maxLoss}) => {
  return (
    <div  className="flex flex-wrap justify-around gap-4 p-4 bg-slate-50 dark:bg-gray-900 rounded-xl shadow-md text-center transition-colors">
    
        
            <section className="w-1/4 h-24 flex flex-col justify-center items-center rounded-lg shadow-lg transition-colors dark:border-solid dark:border-2 dark:border-green-400 dark:bg-green-950/80">
                <p className='dark:text-neutral-50'>Total PnL</p>
                <h1 className='text-green-400 font-semibold text-xl'>{totalPnL}</h1>
            </section>
        
    
            <section className="w-1/4 h-24 flex flex-col justify-center items-center rounded-lg shadow-lg transition-colors dark:border-solid dark:border-2 dark:border-green-400 dark:bg-green-950/80">
                <p className='dark:text-neutral-50' >Maximum Profit</p>
                <h1 className='text-green-400 font-semibold text-xl' >{maxProfit}</h1>
            </section>
        
    
            <section className="w-1/4 h-24 flex justify-center items-center dark:border-2 dark:border-red-400 dark:border-solid flex-col dark:bg-red-800/80 rounded-lg shadow-lg transition-colors">
                <p className='dark:text-neutral-50'>Maximum Loss</p>
                <h1 className='text-red-500 font-semibold text-xl'>{maxLoss}</h1>
            </section>
        
    </div>
  )
}

export default DayWiseSum
