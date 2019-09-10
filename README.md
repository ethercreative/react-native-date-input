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
import { DateInput } from 'react-native-date-input';

export default () => {
  const [date, setDate] = useState('');

  const handleChange = (date) => {
    setDate(date);
  };

  return <DateInput handleChange={handleChange} />;
};
```
