import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList
} from 'recharts'

const data = [{ name: 'High/Low', lo: 0.4359, hi: 0.6581, alltimehi: 0.7516 }]


const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props
  return <Label {...rest} fontSize='12' fill='#FFFFFF' fontWeight='Bold' />
}

export class HiLoChart extends React.Component {
  render() {


    return (
      <div className='hilo-chart'>
        <ResponsiveContainer>

          {/* Recharts - vertical bar chart */}
          <BarChart
           //margin={{ left: 50, right: 50 }}
            layout='vertical'
            data={data}
            stackOffset='expand' >

            {/* Config axis, hide labels */}
            <XAxis hide type='number' />
            <YAxis hide type='category'
              dataKey='name'
              stroke='#000'
              fontSize='12' />
          
            {/* Hover/tap for more info - and style*/}
            <Tooltip placement='bottom'  cursor={false}
              contentStyle={{ backgroundColor: '#707070', fontSize: '1.5rem' }}/>

            {/* Pretty self-explaintory, data key matches keys in data.. fill,
                stack id allows the 3 bars to stack into one, radius rounds corners */}
            <Bar dataKey='lo' fill='#6c0f2c' stroke='#303030' stackId='a' radius={[10, 0, 0, 10]}>
              <LabelList
                dataKey='lo'
                position='center'
                content={renderCustomizedLabel} />
            </Bar>

            <Bar dataKey='hi' fill='#248232' stackId='a'>
              <LabelList
                dataKey='hi'
                position='center'
                content={renderCustomizedLabel} />
            </Bar>

            <Bar dataKey='alltimehi' fill='#303030' stackId='a' radius={[0, 10, 10, 0]}>
              <LabelList
                dataKey='alltimehi'
                position='center'
                content={renderCustomizedLabel} />
            </Bar>
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
