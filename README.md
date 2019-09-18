# react-native-date-input

A simple React Native date input component that uses `DatePickerAndroid` and `DatePickerIOS` to select dates

## Installation

```
npm install react-native-date-input
yarn add react-native-date-input
expo install react-native-date-input
```

## Usage

```js
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DateInput } from 'react-native-date-input';
import moment from 'moment';

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
      minimumDate={new Date(moment().subtract(10, 'year'))}
      maximumDate={new Date()}
      handleChange={handleChange}
      onRef={(input) => (dateInput = input)}
    />
  );
};
```
