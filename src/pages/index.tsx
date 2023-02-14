import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function Home() {
  const { error, isError, isLoading, products } = useProducts();

  if (isError) return <p className="text-red-500">{JSON.stringify(error)}</p>;

  if (isLoading) return <p>Loading...</p>;

  return <Link href="/products">Porducts</Link>;
}
