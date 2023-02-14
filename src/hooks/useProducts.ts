import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

function getProducts() {
  return axios
    .get<Product[]>("http://localhost:3000/products")
    .then((res) => res.data);
}

function getProduct(id: number) {
  return axios
    .get<Product>(`http://localhost:3000/products/${id}`)
    .then((res) => res.data);
}

export function useProducts() {
  const query = useQuery(["products"], getProducts);
  return {
    ...query,
    products: query.data,
  };
}

export function useProduct(id: number) {
  const query = useQuery(["products", id], () => getProduct(id), {
    enabled: Boolean(id),
  });
  return {
    ...query,
    product: query.data,
  };
}

export function useAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
  });
  const queryClient = useQueryClient();
  const mutation = useMutation(
    () =>
      axios.post("http://localhost:3000/products", {
        ...form,
        price: parseInt(form.price),
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return {
    form,
    setForm,
    ...mutation,
  };
}

export function useEditProduct(product?: Product) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    price: product?.price.toString() ?? "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price.toString(),
      });
    }
  }, [product]);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () =>
      axios.patch(`http://localhost:3000/products/${product?.id}`, {
        ...form,
        price: parseInt(form.price),
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["products", product?.id]),
    }
  );

  return {
    form,
    setForm,
    ...mutation,
  };
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => axios.delete(`http://localhost:3000/products/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );
}
