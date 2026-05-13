import { ProductForm } from "@/components/product-form";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  let product = null;
  const resolvedParams = await params;
  
  if (process.env.POSTGRES_URL) {
    const result = await db.select().from(products).where(eq(products.id, resolvedParams.id)).limit(1);
    product = result[0];
  } else {
    // Mock data if no DB
    if (resolvedParams.id === "1") {
      product = {
        id: "1",
        title: "Sunflower Charm",
        description: "A beautiful handmade crochet sunflower charm.",
        price: 15.0,
        discountedPrice: 12.0,
        imageUrl: "/logo.png",
        inStock: true,
      };
    }
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
