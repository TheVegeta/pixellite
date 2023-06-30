import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Input } from "@chakra-ui/react";
import { useAppState } from "@renderer/store";
import { map } from "modern-async";
import { ChangeEvent, createRef } from "react";

const FileInput = () => {
  const inputRef = createRef<HTMLInputElement>();

  const { setImage, imgArray } = useAppState();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange: (arg0: ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    if (e.target.files && e.target.files.length !== 0) {
      const fileArray = Array.from(e.target.files);

      const files: Array<File> = [];

      fileArray
        .filter((item) => item.type.includes("image"))
        .map((item) => {
          files.push(item);
        });

      setImage(files);
    }
  };

  const handleImageCompress = async () => {
    await map(imgArray, async (item) => {
      await window.api.compressJpegImg({
        outpath: "",
        quality: 60,
        url: item.path,
      });
    });
  };

  return (
    <Container>
      <Input
        type="file"
        display="none"
        ref={inputRef}
        multiple={true}
        onChange={handleFileChange}
      />
      <Flex justifyContent="center" my="20">
        <Button onClick={handleClick}>
          <AddIcon />
        </Button>

        <Button onClick={handleImageCompress}>compress </Button>
      </Flex>
    </Container>
  );
};

export default FileInput;
