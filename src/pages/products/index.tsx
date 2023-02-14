import { useAddProduct, useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { SetStateAction } from "react";

export default function Products() {
  const { error, isError, isLoading, products } = useProducts();
  const { form, setForm, mutate } = useAddProduct();

  if (isError) return <p className="text-red-500">{JSON.stringify(error)}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1>Products</h1>
        {products &&
          products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <p>{product.name}</p>
            </Link>
          ))}
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(evt) => {
          evt.preventDefault();
          mutate();
        }}
      >
        <Input
          name="name"
          state={form}
          update={setForm}
          placeholder="Porduct Name"
        />
        <Input name="price" state={form} update={setForm} placeholder="Price" />

        <button
          type="submit"
          className="bg-slate-700 text-white py-3 text-center"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

type InputProps<T> = {
  state: T;
  update: React.Dispatch<SetStateAction<T>>;
  name: keyof T;
  placeholder: string;
};

export function Input<T>({ state, update, name, placeholder }: InputProps<T>) {
  return (
    <input
      type="text"
      name={name as string}
      placeholder={placeholder}
      value={state[name] as string}
      onChange={(evt) =>
        update((prev) => ({ ...prev, [name]: evt.target.value }))
      }
    />
  );
}
