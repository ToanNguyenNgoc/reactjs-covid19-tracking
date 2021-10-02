import React, { useEffect, useState } from 'react';
import {Grid, Card, CardContent, Typography} from '@material-ui/core'

function HighLightItem(props) {
      const {title, count, type} = props;
      const[color, setColor] = useState('');
      useEffect(()=>{
            switch (type) {
                  case 'confirmed':
                        setColor('#6C757D')
                        break;
                  case 'recovered':
                        setColor('#198754')
                        break;
                  case 'deaths':
                        setColor('#DC3545')
                        break;
                  default:
                        break;
            }
      },[type])
      return (
            <Grid item sm={4} xs={12}>
                  <Card >
                        <CardContent style={{backgroundColor: color, fontSize:'18px', color:'white'}}>
                              <Typography component="p" variant="body2">{title}</Typography>
                              <Typography component="span" variant="body2">{count}</Typography>
                        </CardContent>
                  </Card>
            </Grid>
      );
}

export default HighLightItem;