# react-native-date-input

A simple React Native date input component that uses `DatePickerAndroid` and `DatePickerIOS` to select dates

## Installation

```
yarn add react-native-date-input dayjs react-native-appearance react-native-iphone-x-helper
cd ios && pod install
```

## Usage

```js
import React, { useState } from 'react';
import { DateInput } from 'react-native-date-input';
import dayjs from 'dayjs';

export default (props) => {
  const [date, setDate] = useState('');
  let dateInput = null;

  const handleChange = (date) => {
    setDate(date);
  };

  const focus = () => {
    if (!dateInput) {
      return;
    }

    dateInput.focus();
  };

  return (
    <DateInput
      inputProps={{
        style: {},
        ...props,
        // Supports all TextInput props
      }}
      dateFormat={'DD/MM/YYYY'}
      defaultValue={new Date(dayjs().subtract(5, 'year').format('DD/MM/YYYY'))}
      defaultDate={new Date(dayjs().subtract(5, 'year'))}
      minimumDate={new Date(dayjs().subtract(10, 'year'))}
      maximumDate={new Date()}
      handleChange={handleChange}
      onRef={(input) => (dateInput = input)}
    />
  );
};
```
