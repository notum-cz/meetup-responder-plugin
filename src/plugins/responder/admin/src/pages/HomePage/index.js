/*
 *
 * HomePage
 *
 */

import React from "react";
import { EmptyStateLayout, LoadingIndicatorPage } from "@strapi/helper-plugin";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  BaseHeaderLayout,
  Button,
  ContentLayout,
  Layout,
} from "@strapi/design-system";
import { Cross, Plus } from "@strapi/icons";
import ResponderModal from "../../components/ResponderModal";
import QueryList from "../../components/QueryList";
import requestList from "../../api";

export const queryClient = new QueryClient();

const HomePage = () => {
  const [showModal, setShowModal] = React.useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading: queryLoading } = useQuery(
    "responses",
    requestList.getAllResponses
  );

  const {
    mutate,
    isIdle: mutationIdle,
    isLoading: mutationLoading,
  } = useMutation(requestList.askResponder);

  const askResponder = (data) => {
    mutate(data.content, {
      onSuccess: (_) => {
        queryClient.invalidateQueries("responses");
      },
    });
  };

  const handleAskResponderButton = () => setShowModal(true);

  const loadingInProgress = queryLoading || (mutationLoading && !mutationIdle);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout sideNav={undefined}>
        <BaseHeaderLayout
          title="Responder Plugin"
          subtitle="Ask away!"
          as="h2"
          primaryAction={
            <Button onClick={handleAskResponderButton} startIcon={<Plus />}>
              Ask Responder
            </Button>
          }
        />

        <ContentLayout>
          {loadingInProgress ? (
            <LoadingIndicatorPage />
          ) : (
            <>
              {!data || data.length === 0 ? (
                <EmptyStateLayout
                  content={{
                    id: "noData",
                    defaultMessage: "You have no data.",
                  }}
                  action={
                    <Button
                      onClick={handleAskResponderButton}
                      variant="secondary"
                      startIcon={<Plus />}
                    >
                      Ask responder
                    </Button>
                  }
                  hasRadius={undefined}
                  shadow={undefined}
                />
              ) : (
                <>
                  <QueryList queries={data} />
                </>
              )}
            </>
          )}
        </ContentLayout>
        {showModal && (
          <ResponderModal
            setShowModal={setShowModal}
            askResponder={askResponder}
          />
        )}
      </Layout>
    </QueryClientProvider>
  );
};

export default HomePage;
