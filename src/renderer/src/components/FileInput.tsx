import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Input } from "@chakra-ui/react";
import { useAppState } from "@renderer/store";
import { ChangeEvent, createRef } from "react";

const FileInput = () => {
  const inputRef = createRef<HTMLInputElement>();

  const { setImage } = useAppState();

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
      </Flex>
    </Container>
  );
};

export default FileInput;
