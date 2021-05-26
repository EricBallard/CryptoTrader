import React, { useState } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts'




const PriceChart = ({maxHeight}) => {
  const tempData = [
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
    { name: 3, cost: 1.37, impression: 150 },
    { name: 4, cost: 1.16, impression: 180 },
    { name: 5, cost: 2.29, impression: 200 },
    { name: 6, cost: 3, impression: 499 },
    { name: 7, cost: 0.53, impression: 50 },
    { name: 8, cost: 2.52, impression: 100 },
    { name: 9, cost: 1.79, impression: 200 },
    { name: 10, cost: 2.94, impression: 222 },
    { name: 11, cost: 4.3, impression: 210 },
    { name: 12, cost: 4.41, impression: 300 },
    { name: 13, cost: 2.1, impression: 50 },
    { name: 14, cost: 8, impression: 190 },
    { name: 15, cost: 0, impression: 300 },
    { name: 16, cost: 9, impression: 400 },
    { name: 17, cost: 3, impression: 200 },
    { name: 18, cost: 2, impression: 50 },
    { name: 19, cost: 3, impression: 100 },
    { name: 20, cost: 7, impression: 100 },
  ]

  /* Init functional states */
  const [data, setData] = useState(tempData)
  
  const [left, setLeft] = useState('dataMin')
  const [right, setRight] = useState('dataMax')
  const [refAreaLeft, setRefLeft] = useState('')
  const [refAreaRight, setRefRight] = useState('')

  const [top, setTop] = useState('dataMax+1')
  const [bottom, setBottom] = useState('dataMin-1')

  const [top2, setTop2] = useState('dataMax+20')
  const [bottom2, setBottom2] = useState('dataMin-20')

  /* Calculate axis domain 
  const getAxisYDomain = (from, to, ref, offset) => {
    const refData = data.slice(from - 1, to)

    setBottom(refData[0][ref])
    setTop(refData[0][ref])

    refData.forEach((d) => {
      if (d[ref] > top)
        setTop(d[ref])
        
      if (d[ref] < bottom)
        setBottom(d[ref])
    })

    return [(bottom | 0) - offset, (top | 0) + offset]
  }
*/

  /* Zoom */
  const zoom = (out) => {

    if (out === true) {
      // OUT
      setData(data.slice())

      setRefLeft('')
      setRefRight('')

      setLeft('dataMin')
      setRight('dataMax')

      setTop('dataMax+1')
      setBottom('dataMin')

      setTop2('dataMax+50')
      setBottom2('dataMin+50')
      return
    }

    // IN  
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setRefLeft('')
      setRefRight('')
      return
    }

    // xAxis domain
    /* Selection inversed (selected right -> left) */
    if (refAreaLeft > refAreaRight) {
      setRefLeft(refAreaRight)
      setRefRight(refAreaLeft)
    }
    //      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]


    // yAxis domain
    //const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1)
    //const [bottom2, top2] = getAxisYDomain(refAreaLeft, refAreaRight, 'impression', 50)

    

    setData(data.slice())

    setLeft(refAreaLeft)
    setRight(refAreaRight)

    setRefLeft('')
    setRefRight('')
  }

  /* Return JSX */
  return (
    <div className='price-graph' style={{ userSelect: 'none', width: '99%' }}>

      <ResponsiveContainer width='99%'
        aspect={1} maxHeight={maxHeight / 2.5}>

        <LineChart
          margin={{ left: -25, right: -25, top: 0 }}
          data={data}
          onMouseDown={(e) => setRefLeft(e.activeLabel)}
          onMouseMove={(e) => refAreaLeft && setRefRight(e.activeLabel)}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseUp={() => zoom(false)} >

          <CartesianGrid strokeDasharray='3 3' />
          <XAxis allowDataOverflow dataKey='name' domain={[left, right]} type='number' />
          <YAxis allowDataOverflow domain={[bottom, top]} type='number' yAxisId='1' />
          <YAxis orientation='right' allowDataOverflow domain={[bottom2, top2]} type='number' yAxisId='2' />
          {/*<Tooltip />*/}
          <Line yAxisId='1' type='natural' dataKey='cost' stroke='#8884d8' animationDuration={300} />
          <Line yAxisId='2' type='natural' dataKey='impression' stroke='#82ca9d' animationDuration={300} />

          {refAreaLeft && refAreaRight ?
            <ReferenceArea yAxisId='1' x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} /> : null}

        </LineChart>
      </ResponsiveContainer>

    
      {/* Controls */}
      <div className='live-graph controls'>
        <button type='button' className='btn graph-btn btn-primary' tabIndex={1}>1Y</button>
        <button type='button' className='btn graph-btn btn-primary' tabIndex={1}>3M</button>
        <button type='button' className='btn graph-btn btn-primary' tabIndex={1}>1W</button>
        <button type='button' className='btn graph-btn btn-primary' tabIndex={1}>1D</button>
        <button type='button' name='1h' className='btn graph-btn btn-primary' tabIndex={1}>1H</button>
      </div>

      {/* Zoom-out button */}
      <button type='button' className='btn graph-btn zoom' onClick={() => zoom(true)}>Zoom Out </button>
    
    </div >
  )
}

export default PriceChart
