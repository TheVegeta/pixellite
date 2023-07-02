import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAppSetting, useAppState } from "@renderer/store";
import { map } from "modern-async";
import { ChangeEvent, FC, createRef, useState } from "react";
import SettingModal from "./SettingModal";

const ProgressiveModal: FC<{ isOpen: boolean; setToggle: () => void }> = ({
  isOpen,
  setToggle,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setToggle} closeOnEsc={false} size="full">
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center">
        <Container>
          <Text textAlign="center" mb="3">
            Compressing Image
          </Text>
          <Progress size="xs" isIndeterminate />
        </Container>
      </ModalContent>
    </Modal>
  );
};

const FileInput = () => {
  const inputRef = createRef<HTMLInputElement>();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setImage, imgArray, resetImg } = useAppState();
  const { jpegQuality, savePath, pngQuality, webpQuality } = useAppSetting();

  const [progressModal, setProgressModal] = useState(false);

  const toggleProgressModal = () => setProgressModal((value) => !value);

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
    if (imgArray.length === 0) {
      toast({
        title: "Please select images to compress",
        isClosable: true,
        status: "error",
        position: "top",
      });

      return;
    }

    toggleProgressModal();

    await map(imgArray, async (item) => {
      if (item.type.toLowerCase().includes("jp")) {
        await window.api.compressJpegImg({
          outpath: savePath,
          quality: jpegQuality,
          url: item.path,
        });
      }

      if (item.type.toLowerCase().includes("png")) {
        await window.api.compressPngImg({
          outpath: savePath,
          quality: pngQuality,
          url: item.path,
        });
      }

      if (item.type.toLowerCase().includes("webp")) {
        await window.api.compressWebpImg({
          outpath: savePath,
          quality: webpQuality,
          url: item.path,
        });
      }
    });

    resetImg();

    toggleProgressModal();

    await new Promise((r) => setTimeout(r, 2000));

    toast({
      title: "All select images are compressed",
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <Container>
      <ProgressiveModal
        isOpen={progressModal}
        setToggle={toggleProgressModal}
      />
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
