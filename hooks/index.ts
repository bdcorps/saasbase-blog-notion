import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const getBackendURL = (path: string) => {
  const server = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "";
  return server + path;
};

const makeRequest = ({ method, url, data }: any) => {
  return axios({
    method,
    url,
    data,
  });
};


const useAddUserToNewsletter = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(({ email, ...data }: any) => {
    const url: string = getBackendURL(`/api/users`);

    return makeRequest({
      method: "patch",
      url,
      data: { email, data },
    });
  }, {
    onSuccess: () => {
      // queryClient.invalidateQueries("collection");

      toast({
        title: "Success",
        description: "You have been subscribed to our newsletter",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  })
};


export {
  useAddUserToNewsletter
};
