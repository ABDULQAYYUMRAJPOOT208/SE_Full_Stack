import { Card, CardActionArea, CardActions, Rating, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ProductCard.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductCard({ prod }) {
    // Fallback values to prevent errors if certain properties are missing
    const productName = prod?.title || 'Unnamed Product';  // Use `title` from the response object
    const productImage = prod?.images[0] || '/path/to/placeholder-image.jpg';  // Use the first image or a placeholder
    const productPrice = prod?.price || 0;  // Default to 0 if price is not available
    const productRating = prod?.rating || 0;  // Default to 0 if rating is missing
    const productId = prod?.id || 'unknown';  // Default to 'unknown' if ID is missing

    const [imageError, setImageError] = useState(false); // State to track if the image failed to load

    // If image fails to load, use a fallback
    const handleImageError = () => {
        setImageError(true); // If the image URL fails, switch to a fallback image
    };

    return (
        <Card className={styles.main_card}>
            <CardActionArea className={styles.card_action}>
                <Box className={styles.cart_box}>
                    <img
                        alt={productName}
                        src={imageError ? '/path/to/placeholder-image.jpg' : productImage}
                        loading="lazy"
                        className={styles.cart_img}
                        onError={handleImageError}  // Fallback image on error
                    />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {productName.length > 20 ? `${productName.slice(0, 20)}...` : productName}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <Typography variant="h6" color="primary">
                    ₹{productPrice}
                </Typography>
                <Typography>
                    <Rating precision={0.5} name="read-only" value={productRating} readOnly />
                </Typography>
            </CardActions>
        </Card>
    );
}
