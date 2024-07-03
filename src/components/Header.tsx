import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Header: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Product Viewer</Text>
      <Text style={styles.cartCount}>Cart: {cartItemCount} items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200EE',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartCount: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
