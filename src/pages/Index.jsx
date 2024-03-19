import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [numbers, setNumbers] = useState("");
  const [maxOddSum, setMaxOddSum] = useState(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    setNumbers(e.target.value);
  };

  const findMaxOddSum = () => {
    const numbersArray = numbers.split(",").map(Number);

    if (numbersArray.length < 1 || numbersArray.length > 150000) {
      toast({
        title: "Invalid input",
        description: "Array size should be between 1 and 150,000",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (numbersArray.some((num) => num < 1 || num > 1500000)) {
      toast({
        title: "Invalid input",
        description: "Array elements should be between 1 and 1,500,000",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let maxOdd = -Infinity;
    let maxEven = -Infinity;

    for (let num of numbersArray) {
      if (num % 2 === 1) {
        maxOdd = Math.max(maxOdd, num);
      } else {
        maxEven = Math.max(maxEven, num);
      }
    }

    if (maxOdd === -Infinity || maxEven === -Infinity) {
      setMaxOddSum(null);
    } else {
      setMaxOddSum(maxOdd + maxEven);
    }
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8}>
        Maximum Odd Sum
      </Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Enter numbers separated by commas" value={numbers} onChange={handleInputChange} />
        <Button colorScheme="blue" onClick={findMaxOddSum}>
          Find Max Odd Sum
        </Button>
        {maxOddSum !== null && (
          <HStack>
            <Text fontWeight="bold">Maximum Odd Sum:</Text>
            <Text>{maxOddSum}</Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
