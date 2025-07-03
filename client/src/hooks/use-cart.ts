import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartItemWithProduct } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("POST", "/api/cart/add", { productId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest("DELETE", `/api/cart/remove/${productId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      const response = await apiRequest("PUT", "/api/cart/update", { productId, quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/cart/clear");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.product.price) * item.quantity;
    }, 0);
  };

  return {
    cartItems,
    isLoading,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCartMutation.mutate(productId);
      } else {
        updateQuantityMutation.mutate({ productId, quantity });
      }
    },
    clearCart: clearCartMutation.mutate,
    getTotalPrice,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
  };
}
