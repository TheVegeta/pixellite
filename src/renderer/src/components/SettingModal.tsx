import {
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useAppSetting } from "@renderer/store";
import { Formik, FormikErrors, FormikHelpers, FormikTouched } from "formik";
import _ from "lodash";
import { FC, MouseEvent, useEffect, useState } from "react";
import * as Yup from "yup";

const initialValues = {
  jpegQuality: 80,
  pngQuality: 80,
  webpQuality: 60,
  savePath: "",
};

const validationSchema = Yup.object().shape({
  jpegQuality: Yup.number().min(1).max(100).required(),
  pngQuality: Yup.number().min(1).max(100).required(),
  webpQuality: Yup.number().min(1).max(100).required(),
  savePath: Yup.string().required(),
});

const CustomPathSelect: FC<{
  touched: FormikTouched<typeof initialValues>;
  errors: FormikErrors<typeof initialValues>;
  values: typeof initialValues;
  setFieldValue: (arg0: string, arg1: string) => void;
}> = ({ touched, errors, values, setFieldValue }) => {
  const handleFileChange = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const path = await window.api.getDirPath();
    setFieldValue("savePath", path);
  };

  return (
    <Container mb="8px">
      <Text mb="8px">Directroy ({values.savePath})</Text>
      <Input
        type="file"
        p="0"
        isInvalid={!!touched.savePath && !!errors.savePath}
        onClick={handleFileChange}
        placeholder={values.savePath}
      />
    </Container>
  );
};

const SettingModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { jpegQuality, pngQuality, savePath, webpQuality, setQuality } =
    useAppSetting();

  const [initValue, setInitValue] =
    useState<typeof initialValues>(initialValues);

  useEffect(() => {
    setInitValue({ jpegQuality, pngQuality, savePath, webpQuality });
  }, [jpegQuality, pngQuality, savePath, webpQuality]);

  const handleSubmit = async (
    val: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    actions.setSubmitting(true);

    setQuality({
      jpegQuality: _.toNumber(val.jpegQuality),
      pngQuality: _.toNumber(val.pngQuality),
      savePath: val.savePath,
      webpQuality: _.toNumber(val.webpQuality),
    });

    onClose();

    actions.setSubmitting(false);
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Setting</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              touched,
              errors,
              values,
              setFieldValue,
              isSubmitting,
            }) => {
              return (
                <form onSubmit={handleSubmit} onChange={handleChange}>
                  <ModalBody pb={6}>
                    <Container mb="8px">
                      <Text mb="8px">Jpeg image quality</Text>
                      <Input
                        isInvalid={
                          !!touched.jpegQuality && !!errors.jpegQuality
                        }
                        name="jpegQuality"
                        placeholder={"Jpeg image quality"}
                        value={values.jpegQuality}
                      />
                    </Container>

                    <Container mb="8px">
                      <Text mb="8px">Png image quality</Text>
                      <Input
                        isInvalid={!!touched.pngQuality && !!errors.pngQuality}
                        name="pngQuality"
                        placeholder={"Png image quality"}
                        value={values.pngQuality}
                      />
                    </Container>

                    <Container mb="8px">
                      <Text mb="8px">Webp image quality</Text>
                      <Input
                        isInvalid={
                          !!touched.webpQuality && !!errors.webpQuality
                        }
                        name="webpQuality"
                        placeholder={"Webp image quality"}
                        value={values.webpQuality}
                      />
                    </Container>

                    <CustomPathSelect
                      errors={errors}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      values={values}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      disabled={isSubmitting}
                      colorScheme="blue"
                      type="submit"
                      mr={3}
                    >
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingModal;
