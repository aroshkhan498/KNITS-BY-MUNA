"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";
import { toast } from "sonner";

export function AdminDeleteButton({ productId }: { productId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setIsDeleting(true);
    try {
      const result = await deleteProduct(productId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product deleted successfully");
      }
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all disabled:opacity-50"
      title="Delete product"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
