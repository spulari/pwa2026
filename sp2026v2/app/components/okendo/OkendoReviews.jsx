import React from "react";
import { Box, Text, Spinner, Stack, HStack } from "@chakra-ui/react";
import { useOkendoReviews } from "../../hooks/useOkendoReviews";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <HStack spacing={1}>
      {Array(fullStars).fill("★").map((s, i) => (
        <Text key={`f-${i}`} color="gold">★</Text>
      ))}
      {Array(emptyStars).fill("☆").map((s, i) => (
        <Text key={`e-${i}`} color="gray.300">☆</Text>
      ))}
    </HStack>
  );
}

export default function OkendoReviews({ productId }) {
  const { data, isLoading, error } = useOkendoReviews(productId);

  if (isLoading) {
    return (
      <Box py={4}>
        <Spinner />
        <Text mt={2}>Loading reviews...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box py={4}>
        <Text color="red.500">
          Failed to load reviews. Please try again later.
        </Text>
      </Box>
    );
  }

  const reviews = data?.reviews || [];

  if (!reviews.length) {
    return (
      <Box py={4}>
        <Text>No reviews yet for this product.</Text>
      </Box>
    );
  }

  return (
    <Box py={6}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Customer Reviews
      </Text>

      <Stack spacing={4}>
        {reviews.map((review) => (
          <Box key={review.id} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="600">{review.reviewerName}</Text>

            <StarRating rating={review.rating} />

            <Text mt={2}>{review.body}</Text>

            <Text fontSize="sm" color="gray.500" mt={2}>
              {new Date(review.createdAt).toLocaleDateString()}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}