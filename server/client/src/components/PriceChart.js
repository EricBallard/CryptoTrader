import React, { PureComponent } from 'react';
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';



// const socket = io('http://localhost:4000', {
//   transports: ['websocket', 'polling']
// });

//import io from 'socket.io-client'

const initialData = [
    { name: 1, cost: 4.11 },
    { name: 2, cost: 2.39},
    { name: 3, cost: 1.37},
    { name: 4, cost: 1.16},
    { name: 5, cost: 2.29 },
    { name: 6, cost: 3 },
    { name: 7, cost: 0.53 },
    { name: 8, cost: 2.52},
    { name: 9, cost: 1.79 },
    { name: 10, cost: 2.94},
    { name: 11, cost: 4.3 },
    { name: 12, cost: 4.41 },
    { name: 13, cost: 2.1 },
    { name: 14, cost: 8 },
    { name: 15, cost: 0 },
    { name: 16, cost: 9 },
    { name: 17, cost: 3 },
    { name: 18, cost: 2,},
    { name: 19, cost: 3},
    { name: 20, cost: 7 },
  ];
  
  const getAxisYDomain = (from, to, ref, offset) => {
    const refData = initialData.slice(from - 1, to);
    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach((d) => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
    });
  
    return [(bottom | 0) - offset, (top | 0) + offset];
  };
  
  const initialState = {
    data: initialData,
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
    top: 'dataMax+1',
    bottom: 'dataMin-1',
    top2: 'dataMax+20',
    bottom2: 'dataMin-20',
    animation: true,
  };
  

export default class PriceChart extends PureComponent {
  
    constructor(props) {
      super(props);
      this.state = initialState;
    }
  
    zoom() {
      let { refAreaLeft, refAreaRight } = this.state;
      const { data } = this.state;
  
      if (refAreaLeft === refAreaRight || refAreaRight === '') {
        this.setState(() => ({
          refAreaLeft: '',
          refAreaRight: '',
        }));
        return;
      }

      /*

      useEffect()...
      
      socket.on('cpu', cpuPercent => {
            setData(currentData => [...currentData, cpuPercent]);
        });
  
      */
      // xAxis domain
      if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
  
      // yAxis domain
      const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'cost', 1);
  
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
        data: data.slice(),
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top
      }));
    }
  
    zoomOut() {
      const { data } = this.state;
      this.setState(() => ({
        data: data.slice(),
        refAreaLeft: '',
        refAreaRight: '',
        left: 'dataMin',
        right: 'dataMax',
        top: 'dataMax+1',
        bottom: 'dataMin'
      }));
    }
  
    render() {
      const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom } = this.state;
  
      return (
        <div className="highlight-bar-charts" style={{ userSelect: 'none', width: '100%' }}>
          <button type="button" className="btn update" onClick={this.zoomOut.bind(this)}>
            Zoom Out
          </button>
  
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={800}
              height={400}
              data={data}
              onMouseDown={(e) => e && this.setState({ refAreaLeft: e.activeLabel })}
              onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
              
              // eslint-disable-next-line react/jsx-no-bind
              onMouseUp={this.zoom.bind(this)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis allowDataOverflow dataKey="name" domain={[left, right]} type="number" />
              <YAxis orientation="center" allowDataOverflow domain={[bottom, top]} type="number" yAxisId="1" />
              <Tooltip />
              <Line yAxisId="1" type="natural" dataKey="cost" stroke="#8884d8" animationDuration={300} />
  
              {refAreaLeft && refAreaRight ? (
                <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
}