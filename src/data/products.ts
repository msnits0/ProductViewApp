export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category 1',
      price: '$10.00',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category 2',
      price: '$20.00',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      category: 'Category 1',
      price: '$30.00',
      image: 'https://via.placeholder.com/150',
    },
    // Add more products as needed
  ];
  