import React, { useState } from 'react';

import {
  DatePickerAndroid,
  DatePickerIOS,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import moment from 'moment';

const ANDROID = Platform.OS === 'android';
const now = new Date();

export default ({
  inputProps = {},
  datePickerProps = {},
  dateFormat = 'YYYY-MM-DD',
  handleChange,
  dark = false,
  onRef,
}) => {
  const [date, setDate] = useState(now);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const open = async () => {
    Keyboard.dismiss();

    if (ANDROID) {
      let { action, year, month, day } = await DatePickerAndroid.open({
        date,
      });

      if (action === DatePickerAndroid.dismissedAction) {
        return;
      }

      month = ('0' + (month + 1)).slice(-2);
      day = ('0' + day).slice(-2);

      const selected = new Date(`${year}-${month}-${day}`);
      onDateChange(selected);

      return;
    }

    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const onDateChange = (date) => {
    const formattedDate = moment(date).format(dateFormat);

    setDate(date);
    setValue(formattedDate);

    if (!handleChange) {
      return;
    }

    handleChange(formattedDate);
  };

  if (onRef) {
    onRef({ focus: open });
  }

  const renderInput = () => {
    return (
      <TouchableOpacity onPress={open} activeOpacity={1}>
        <TextInput
          value={value}
          editable={false}
          pointerEvents={'none'}
          {...inputProps}
        />
      </TouchableOpacity>
    );
  };

  const renderDatePicker = () => {
    if (ANDROID) {
      return;
    }

    const styles = StyleSheet.create({
      modal: {
        padding: 0,
        margin: 0,
      },
      datePicker: {
        backgroundColor: 'white',
        ...StyleSheet.absoluteFill,
        top: 'auto',
        paddingBottom: getBottomSpace(),
      },
      bar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 44,
      },
      done: {
        paddingHorizontal: 17.5,
        fontFamily: 'System',
        fontSize: 15,
        color: '#147efb',
        fontWeight: '700',
        lineHeight: 44,
      },
    });

    return (
      <Modal
        style={styles.modal}
        isVisible={visible}
        backdropColor={'rgba(0, 0, 0, 0)'}
        useNativeDriver
        hideModalContentWhileAnimating
        onBackdropPress={() => close()}
      >
        <View style={styles.datePicker}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={close} activeOpacity={0.8}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>

          <DatePickerIOS
            initialDate={now}
            date={date}
            mode={'date'}
            onDateChange={onDateChange}
          />
        </View>
      </Modal>
    );
  };

  return (
    <>
      {renderInput()}
      {renderDatePicker()}
    </>
  );
};
