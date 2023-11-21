import { Box, Typography } from "@strapi/design-system";
import React from "react";
import SingleQuery from "./SingleQuery";

const QueryList = ({ queries }) => (
  <Box padding={8} background="neutral0">
    <Box padding={2}>
      <Typography variant="alpha">Your Queries</Typography>
    </Box>
    {queries.map((query) => (
      <Box key={query.id} padding={2}>
        <SingleQuery {...query} />
      </Box>
    ))}
  </Box>
);

export default QueryList;
