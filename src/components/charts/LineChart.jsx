import React, { useEffect, useState } from 'react';
import HighChartsReact from 'highcharts-react-official';
import HighChart from 'highcharts';
import moment from 'moment';
import { ButtonGroup, Button } from '@material-ui/core';

const generateOptions = (data) => {
      const categories=data.map(item => moment(item.Date).format('DD/MM/YY'))
      return {
            chart: {
                  height: 500,
            },
            title: {
                  text: 'Biểu đồ tổng',
            },
            xAxis: {
                  categories: categories,
                  crosshair: true,
            },
            colors: ['#6C757D','#F3585B'],
            yAxis: {
                  min: 0,
                  title: {
                        text: null,
                  },
                  labels: {
                        align: 'right',
                  },
            },
            tooltip: {
                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat:
                        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true,
            },
            plotOptions: {
                  column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                  },
            },
            series: [
                  {
                        name: 'Số ca nhận',
                        data: data.map((item) => item.Confirmed),
                  },
                  {
                        name:'Số ca tử vong',
                        data: data.map((item)=> item.Deaths)
                  }
            ],
      };
}


function LineChart(props) {
      const {data} = props;
      const [options, setOptions] = useState({})
      const [reportType, setReportType] = useState('all');
      useEffect(()=>{
            let customData=[]
            switch (reportType) {
                  case 'all':
                        customData = data;
                        break;
                  case '60':
                        customData = data.slice(Math.max(data.length - 60, 1));
                        break;
                  case '30':
                        customData = data.slice(Math.max(data.length - 30, 1));
                        break;
                  case '7':
                        customData = data.slice(Math.max(data.length - 7, 1));
                        break;
                  default:
                        customData = data;
                        break;
            }
            setOptions(generateOptions(customData));
      },[data, reportType])
      return (
            <div>
                  <ButtonGroup 
                        size='small'
                        aria-label='small outlined button group'
                        style={{display:'flex', flexDirection:'row', justifyContent:'center'}}
                  >
                        <Button color={reportType==='all' ? 'secondary':''} onClick={()=>setReportType('all')}>
                              Tất cả
                        </Button>
                        <Button color={reportType==='60' ? 'secondary':''} onClick={()=>setReportType('60')}>
                              60 ngày gần nhất
                        </Button>
                        <Button color={reportType==='30' ? 'secondary':''} onClick={()=>setReportType('30')}>
                              30 ngày gần nhất
                        </Button>
                        <Button color={reportType==='7' ? 'secondary':''} onClick={()=>setReportType('7')}>
                              7 ngày gần nhất
                        </Button>
                  </ButtonGroup>
                  <HighChartsReact
                        highcharts={HighChart}
                        options={options}
                  />
            </div>
      );
}

export default LineChart;