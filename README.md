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
import React from 'react';
import { DateInput } from 'react-native-date-input';

export default () => {
  return (
    <Form>
      <TextInput />
      <View>
        // Nesting works
        <TextInput />
      </View>
      // Override behaviour with onSubmitEditing prop
      <TextInput onSubmitEditing={submit} />
    </Form>
  );
};
```
