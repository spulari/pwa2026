import { useQuery } from "@tanstack/react-query";
import { fetchOkendoReviews } from "../api/okendo";

export function useOkendoReviews(productId) {

//const ids = ['8654269677656','8650765762648','8649070641240','8672623329368','8672623329368','8731219165272','8650750361688','8649076342872'];

  return useQuery({
    queryKey: ["okendo-reviews", productId],
    queryFn: () => fetchOkendoReviews({ productId }),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5, // 5 mins cache
    retry: 1,
  });
}