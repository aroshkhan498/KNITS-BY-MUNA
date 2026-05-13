import { ProductForm } from "@/components/product-form";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  let product = null;
  const resolvedParams = await params;
  
  if (process.env.POSTGRES_URL) {
    const result = await db.select().from(products).where(eq(products.id, Number(resolvedParams.id))).limit(1);
    product = result[0];
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ProductForm initialData={product} />
    </div>
  );
}
