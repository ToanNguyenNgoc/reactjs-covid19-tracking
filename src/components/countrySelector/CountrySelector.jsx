import React from 'react';
import {FormControl, InputLabel, NativeSelect, FormHelperText} from '@material-ui/core'

function CountrySelector(props) {
      const {countries, value, handleOnChange} = props
      return (
            <FormControl>
                  <InputLabel htmlFor="" shrink >Quốc gia</InputLabel>
                  <NativeSelect
                        value={value}
                        onChange={handleOnChange}
                        inputProps={{
                              name:'country',
                              id:'country-selector'
                        }}
                  >
                        {
                              countries?.map((country, index)=>{
                                    return (
                                          <option key={index} value={country.ISO2.toLowerCase()}>{country.Country}</option>
                                    )
                              })
                        }
                  </NativeSelect>
                  <FormHelperText>Lựa chọn quốc gia</FormHelperText>
            </FormControl>
      );
}

export default CountrySelector;