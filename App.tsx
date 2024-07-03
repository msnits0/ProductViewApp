import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { products, Product } from './src/data/products';
import CustomText from './src/components/CustomText';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState, AppDispatch } from './src/redux/store';
import { addItem, removeItem } from './src/redux/cartSlice';
import Header from './src/components/Header';

const ProductList = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (searchText) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchText]);

  const handleAddToCart = (productName: string) => {
    dispatch(addItem(productName));
    Toast.show({
      type: 'success',
      text1: `${productName} added to cart!`,
    });
  };

  const handleRemoveFromCart = (productName: string) => {
    dispatch(removeItem(productName));
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <CustomText style={styles.productName}>{item.name}</CustomText>
        <CustomText style={styles.productPrice}>{item.price}</CustomText>
        {cartItems[item.name] ? (
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => handleRemoveFromCart(item.name)}>
              <CustomText style={styles.quantityButton}>-</CustomText>
            </TouchableOpacity>
            <CustomText style={styles.quantityText}>{cartItems[item.name]}</CustomText>
            <TouchableOpacity onPress={() => handleAddToCart(item.name)}>
              <CustomText style={styles.quantityButton}>+</CustomText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{width:'60%',position:'absolute',right:10,bottom:10}}>
          <Button title="Add to Cart" onPress={() => handleAddToCart(item.name)} />

            </View>
        )}
      </View>
    </View>
  );

  return (
    <>
      <Header />
    
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or category"
        value={searchText}
        placeholderTextColor={'grey'}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.productList}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
    </>

  );
};

const App = () => (
  <Provider store={store}>
    <ProductList />
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 16,
    // padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    height:100
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    // justifyContent: 'center',
    padding:10
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 8,
    color: '#6200EE',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default App;
