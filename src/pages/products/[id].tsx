import { useEditProduct, useProduct } from "@/hooks/useProducts";
import { useRouter } from "next/router";
import { Input } from ".";

export default function Product() {
  const router = useRouter();
  const { isLoading, product } = useProduct(
    parseInt(router.query.id as string)
  );
  const { mutate, form, setForm } = useEditProduct(product);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <p>{product?.name}</p>
        <p>{product?.price}</p>
      </div>
      {product && (
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            mutate();
          }}
        >
          <Input state={form} name="name" update={setForm} placeholder="" />
          <Input state={form} name="price" update={setForm} placeholder="" />
          <button type="submit">Edit</button>
        </form>
      )}
    </>
  );
}
