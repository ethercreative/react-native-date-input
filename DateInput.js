import React from 'react';

import {
  DatePickerAndroid,
  DatePickerIOS,
  Keyboard,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import dayjs from 'dayjs';

export default ({
  inputProps = {},
  dateFormat = 'YYYY-MM-DD',
  defaultValue = '',
  defaultDate = new Date(),
  minimumDate = null,
  maximumDate = null,
  handleChange,
  onRef,
}) => {
  const [date, setDate] = React.useState(defaultDate);
  const [value, setValue] = React.useState(defaultValue);
  const [visible, setVisible] = React.useState(false);
  const ANDROID = Platform.OS === 'android';

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const open = async () => {
    Keyboard.dismiss();

    if (ANDROID) {
      let { action, year, month, day } = await DatePickerAndroid.open({
        date,
        minDate: minimumDate,
        maxDate: maximumDate,
        mode: 'calendar',
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
    const formattedDate = dayjs(date).format(dateFormat);

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
          {...inputProps}
          value={value}
          editable={false}
          pointerEvents={'none'}
        />
      </TouchableOpacity>
    );
  };

  const renderDatePicker = () => {
    if (ANDROID) {
      return;
    }

    const scheme = useColorScheme();

    const styles = StyleSheet.create({
      modal: {
        padding: 0,
        margin: 0,
      },
      background: {
        ...StyleSheet.absoluteFill,
      },
      datePicker: {
        backgroundColor: scheme === 'dark' ? 'black' : 'white',
        ...StyleSheet.absoluteFill,
        top: 'auto',
        paddingBottom: getBottomSpace(),
      },
      bar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor:
          scheme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.03)',
        height: 44,
      },
      done: {
        paddingHorizontal: 17.5,
        fontFamily: 'System',
        fontSize: 15,
        color: scheme === 'dark' ? 'white' : '#147efb',
        fontWeight: '700',
        lineHeight: 44,
      },
    });

    return (
      <Modal
        style={styles.modal}
        visible={visible}
        transparent
        animationType={'slide'}
        onRequestClose={close}
      >
        <TouchableOpacity style={styles.background} onPress={close}>
          <></>
        </TouchableOpacity>

        <View style={styles.datePicker}>
          <View style={styles.bar}>
            <TouchableOpacity onPress={close} activeOpacity={0.8}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>

          <DatePickerIOS
            initialDate={defaultDate}
            date={date}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            mode={'date'}
            onDateChange={onDateChange}
          />
        </View>
      </Modal>
    );
  };

  return (
    <AppearanceProvider>
      {renderInput()}
      {renderDatePicker()}
    </AppearanceProvider>
  );
};
