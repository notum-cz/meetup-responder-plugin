import {
  Accordion,
  AccordionContent,
  AccordionToggle,
  Box,
  IconButton,
  Typography,
} from "@strapi/design-system";
import { Trash } from "@strapi/icons";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import requestList from "../../api";

const SingleQuery = ({ query, response, id }) => {
  const [expanded, setExpanded] = React.useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteQuery } = useMutation(requestList.deleteResponse, {
    onSuccess: (_) => {
      queryClient.invalidateQueries("responses");
    },
  });
  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((s) => !s)}
      id="acc-2"
      variant="secondary"
    >
      <AccordionToggle
        title={query}
        description=""
        action={
          <IconButton
            onClick={() => deleteQuery(id)}
            icon={<Trash />}
          ></IconButton>
        }
      />
      <AccordionContent>
        <Box padding={3}>
          <Typography>{response}</Typography>
        </Box>
      </AccordionContent>
    </Accordion>
  );
};

export default SingleQuery;
