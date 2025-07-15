import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // after mutation is seuccess, re-fetch (invaldating) catched data based on queryKey
    onSuccess: () => {
      toast.success("cabin seccessfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // if there was an error while mutating do this:
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
