import React from 'react';
import {View, StyleSheet} from 'react-native';

export default Header = props => {
  return <View style={styles.viewContainer}>{props.children}</View>;
};

var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
