import { ProductForm } from "@/components/product-form";

export default async function NewProductPage() {
  // Categories hidden — pass an empty list to the form
  const categoryList: any[] = [];

  return (
    <div className="space-y-6">
      <ProductForm categories={categoryList} />
    </div>
  );
}
