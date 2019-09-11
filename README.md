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

export default (props) => {
  const [input, setInput] = useState(null);
  const [date, setDate] = useState('');

  const handleChange = (date) => {
    setDate(date);
  };

  const focus = () => {
    if (!input) {
      return;
    }

    input.focus();
  };

  return (
    <DateInput
      inputProps={{
        style: [styles.input],
        placeholderTextColor: '#fff',
        ...props,
      }}
      datePickerProps={{
        ...props,
      }}
      handleChange={handleChange}
      dateFormat={'DD/MM/YYYY'}
      dark
      onRef={(input) => setInput(input)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    background: '#000',
    height: 50,
  },
});
```
