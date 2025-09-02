import React from 'react'
import { PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
 } from 'recharts';

const data = [
  { name: "Electronics", value: 45, color: "#3b82f6" },
  { name: "Clothing",   value: 30, color: "#8b5cf6" },
  { name: "Books",      value: 15, color: "#16b981" },
  { name: "Other",      value: 10, color: "#f59e0b" },
];
const SalesChart = () => {
  return (
    <div  className='bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50'>
        <div className='mb-6'>
            <h3 className=' text-lg font-bold text-slate-800 dark:text-white'>
                Sales by Category
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
                Production Distribution
            </p>
        </div>
        <div className='h-48'>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}>
                {data.map((entry,index)=>(
                    <Cell key={`cell-${index}`} fill={entry.color}/> 
                ))}
                    </Pie>
                <Tooltip formatter={(value) =>`${value}%`}/>
                {/* <Legend verticalAlign='bottom' height={30} /> */}
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className='space-y-3'>
            {data.map((item,index)=>{
                return(
                    <div key={index} className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                             <div className="w-3 h-3 rounded-full"
                            style={{backgroundColor:item.color}}
                            />
                            <span className='text-sm text-slate-600 dark:text-slate-400'>
                                {item.name}
                            </span>
                        </div>
                     
                      <div className='text-sm font-semibold text-slate-800 dark:text-white'>
                            {item.value}%
                      </div>
                    </div>
                )
            })}    
        </div>
    </div>
  )
}

export default SalesChart