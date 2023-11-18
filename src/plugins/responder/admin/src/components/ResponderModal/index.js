import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  TextInput,
  Typography,
} from "@strapi/design-system";
import { Information } from "@strapi/icons";
import React from "react";

const ResponderModal = ({ setShowModal, askResponder }) => {
  const [content, setContent] = React.useState("");

  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    await askResponder({ content });
    setShowModal(false);
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Ask responder
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="What do you want to ask?"
          label="Question"
          name="content"
          hint="Ask anything."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          labelAction={<Information aria-hidden />}
        />
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Ask responder</Button>}
      />
    </ModalLayout>
  );
};

export default ResponderModal;
