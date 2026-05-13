import { ProductForm } from "@/components/product-form";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  let product = null;
  let categoryList: any[] = [];
  const resolvedParams = await params;
  
  if (process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL) {
    const result = await db.select().from(products).where(eq(products.id, Number(resolvedParams.id))).limit(1);
    product = result[0];

    try {
      categoryList = await db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.name));
    } catch {
      categoryList = [];
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <ProductForm initialData={product} categories={categoryList} />
    </div>
  );
}
