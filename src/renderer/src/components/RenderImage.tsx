import { Box, Image } from "@chakra-ui/react";
import { useAppState } from "../store";

const RenderImage = () => {
  const { imgArray } = useAppState();

  return (
    <Box
      padding={4}
      w="100%"
      maxW="900px"
      mx="auto"
      bg="gray.800"
      sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
    >
      {imgArray.map((item) => (
        <Image
          key={item.name + item.size}
          w="100%"
          borderRadius="xl"
          mb={2}
          display="inline-block"
          src={URL.createObjectURL(item)}
          alt="Alt"
        />
      ))}
    </Box>
  );
};

export default RenderImage;
