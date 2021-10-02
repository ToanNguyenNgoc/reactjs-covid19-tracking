import React from 'react';
import {Grid} from '@material-ui/core'
import HighLightItem from './HighLightItem';


function HighLight(props) {
      const {report} = props;
      const data = report[report.length - 1];
      const summary=[
            {
                  id:1,
                  title:'Số ca mắc',
                  count: data?.Confirmed,
                  type:'confirmed'
            },
            {
                  id:2,
                  title:'Số ca khỏi',
                  count: data?.Recovered,
                  type:'recovered'
            },
            {
                  id:3,
                  title:'Số ca tử vong',
                  count: data?.Deaths,
                  type:'deaths'
            }
      ]
      return (
            <Grid container spacing={3}>
                  {
                        summary.map((item) => (
                              <HighLightItem
                                    key={item.id}
                                    title={item.title}
                                    count={item.count}
                                    type={item.type}
                              />
                        ))
                  }

            </Grid>
      );
}

export default HighLight;