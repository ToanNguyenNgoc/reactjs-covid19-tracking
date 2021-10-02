import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import LineChart from '../charts/LineChart';
import HighMap from '../charts/HighMap';
import { getMapDataByCountryId } from '../../apis';



function Summary(props) {
      const {report, countryId} = props;
      const [mapData, setMaData] = useState({});
      useEffect(()=>{
            if(countryId){
                  getMapDataByCountryId(countryId)
                        .then((res)=> {
                              setMaData(res)
                        })
                        .catch((err)=> console.log(err))
            }
      },[countryId])
      return (
            <Grid container spacing={3}>
                  <Grid item sm={8} xs={12}>
                        <LineChart data={report}/>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                        <HighMap mapData={mapData}/>
                  </Grid>
            </Grid>
      );
}

export default Summary;