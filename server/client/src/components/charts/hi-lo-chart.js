import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList
} from 'recharts'

/* Graph data */
let data = [{ name: 'HIGH / LOW', Low: 0.4359, High: 0.6581, All_Time_High: 0.7516 }]

/* Format bar graph labels  */
const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props
  return <Label {...rest} fontSize='1.25rem' fill='#FFFFFF' />
}

const HiLoChart = ({ maxHeight }) => {
  return (
    <div className='hilo-graph'>
      <ResponsiveContainer width='99%' maxHeight={maxHeight/16}>

        {/* Recharts - vertical bar chart */}
        <BarChart
          margin={{ left: 50, right: 50, top: 0, bottom: 0 }}
          layout='vertical'
          data={data}
          stackOffset='expand' >

          {/* Config axis, hide labels */}
          <XAxis hide type='number' />
          <YAxis hide type='category'
            dataKey='name' />

          {/* Pretty self-explaintory, data key matches keys in data.. fill,
            stack id allows the 3 bars to stack into one, radius rounds corners */}
          <Bar dataKey='Low' stackId='a' stroke='#000' fill='#6c0f2c' radius={[10, 0, 0, 10]}>
            <LabelList
              name='ass'
              label='ass'
              dataKey='Low'
              position='center'
              content={renderCustomizedLabel} />
          </Bar>

          <Bar dataKey='High' stackId='a' stroke='#000' fill='#248232'>
            <LabelList
              dataKey='High'
              position='center'
              content={renderCustomizedLabel} />
          </Bar>

          <Bar dataKey='All_Time_High' stackId='a' stroke='#000' fill='#000' radius={[0, 10, 10, 0]}>
            <LabelList
              dataKey='All_Time_High'
              position='center'
              content={renderCustomizedLabel} />
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HiLoChart