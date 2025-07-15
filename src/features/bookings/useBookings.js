import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constans";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //////// FILTER /////////
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "" };

  //////// SORT /////////
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  /////// Pagination ///////
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  /////// QUERY ////////
  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    // whenever filter changes in [] react query re-fetches
    queryKey: ["bookings", filter, sortBy, page],
  });

  /////// PRE-FETCHING ////////
  const pageCount = Math.ceil(count / PAGE_SIZE);
  // pre-fetch next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });

  // pre-fetch previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });

  return { bookings, error, isLoading, count };
}
