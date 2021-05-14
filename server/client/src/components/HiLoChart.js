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

/* Graph data */
let data = [{ name: 'HIGH / LOW', Low: 0.4359, High: 0.6581, All_Time_High: 0.7516 }]

/* Format bar graph labels  */
const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props
  return <Label {...rest} fontSize='1.25rem' fill='#FFFFFF' />
}

/* Formats tool-tip datakey names, replaces _ with spaces */
const formatter = (value, name, props) => [value, String([name]).replaceAll('_', ' '), props]

export class HiLoChart extends React.Component {
  render() {


    return (
      <div className='hilo-graph'>
        <ResponsiveContainer height='99%' maxWidth='50px'>

          {/* Recharts - vertical bar chart */}
          <BarChart
            //margin={{ left: 50.5, right: 7.5 }}
            layout='vertical'
            data={data}
            stackOffset='expand' >

            {/* Config axis, hide labels */}
            <XAxis hide type='number' />
            <YAxis hide type='category'
              dataKey='name' />


            {/* Hover/tap for more info - and style*/}
            <Tooltip placement='bottom' cursor={false}
              contentStyle={{ backgroundColor: '#707070' }}
              formatter={formatter}
            />

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
}
