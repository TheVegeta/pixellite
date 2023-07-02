import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useAppState } from "@renderer/store";
import { map } from "modern-async";
import { ChangeEvent, createRef } from "react";
import SettingModal from "./SettingModal";

const FileInput = () => {
  const inputRef = createRef<HTMLInputElement>();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Flex justifyContent="center" my="20" gap="3">
        <Button onClick={handleClick}>
          <AddIcon />
        </Button>

        <Button onClick={handleImageCompress}>compress</Button>

        <Button onClick={onOpen}>
          <SettingsIcon />
        </Button>
      </Flex>

      <SettingModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default FileInput;
