import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import ProductCard from "../Card/Product Card/ProductCard";

const AllProducts = () => {
  // State for holding products, loading status, and pagination details
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Start from page 1
  const [hasMore, setHasMore] = useState(true); // To determine if more products exist
  const observer = useRef();

  // Function to fetch products from the API with pagination
  const fetchProducts = async () => {
    if (loading) return; // Avoid fetching if already loading

    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
      );

      const fetchedProducts = response.data.products;
      console.log("FETCH PRODUCTS",fetchedProducts);  // Fix to log fetched products

      // If there are no more products, set hasMore to false
      if (fetchedProducts.length < 10) {
        setHasMore(false);
      }

      setAllProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer logic to detect when to load more products
  const lastProductElementRef = (node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect(); // Stop observing previous element

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        // When the last product card is in view, load more products
        setPage((prevPage) => prevPage + 1); // Increase page number
      }
    });

    if (node) observer.current.observe(node); // Start observing the new element
  };

  // Fetch products when the page or loading state changes
  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <Container maxWidth="xl" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        All Products
      </Typography>

      {/* Displaying products */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {allProducts.map((prod, index) => {
          // Use a composite key to ensure uniqueness
          const key = `${prod.id}-${index}`;

          if (allProducts.length === index + 1) {
            // Last item, attach the observer
            return (
              <Box ref={lastProductElementRef} key={key} m={2}>
                <ProductCard prod={prod} />
              </Box>
            );
          } else {
            return (
              <Box key={key} m={2}>
                <ProductCard prod={prod} />
              </Box>
            );
          }
        })}
      </Box>

      {/* Loading indicator */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {/* If there are no more products, show message */}
      {!hasMore && !loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Typography variant="h6">No more products to load</Typography>
        </Box>
      )}
    </Container>
  );
};

export default AllProducts;
