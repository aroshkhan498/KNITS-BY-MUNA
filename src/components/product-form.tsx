"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { createCategory, saveProduct } from "@/app/admin/actions";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

export function ProductForm({
  initialData,
  categories = [],
}: {
  initialData?: any;
  categories?: CategoryOption[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDiscounted, setIsDiscounted] = useState(!!initialData?.discountedPrice);
  const [categoryMode, setCategoryMode] = useState(
    initialData?.categoryId || categories.length > 0 ? "existing" : "new"
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialData?.categoryId || categories[0]?.id || "");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (file) {
      formData.set("image", file);
    }

    if (categoryMode === "existing") {
      if (!selectedCategoryId) {
        toast.error("Please select a category or add a new one.");
        setLoading(false);
        return;
      }
      formData.set("categoryId", selectedCategoryId);
    } else {
      if (!newCategoryName.trim()) {
        toast.error("Please enter a new category name.");
        setLoading(false);
        return;
      }

      const categoryFormData = new FormData();
      categoryFormData.set("name", newCategoryName.trim());
      categoryFormData.set("description", newCategoryDescription.trim());

      const categoryResult = await createCategory(categoryFormData);
      if (categoryResult.error || !categoryResult.categoryId) {
        toast.error(categoryResult.error || "Failed to create category");
        setLoading(false);
        return;
      }

      formData.set("categoryId", categoryResult.categoryId);
    }
    
    if (initialData?.id) {
      formData.set("id", initialData.id);
    }

    try {
      const result = await saveProduct(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Product saved successfully!");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-outfit text-primary">{initialData ? "Edit Product" : "New Product"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={initialData?.title} required className="border-border focus-visible:ring-primary" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              required
              rows={4}
              className="w-full flex min-h-[80px] rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" defaultValue={initialData?.price} required className="border-border focus-visible:ring-primary" />
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Switch 
                  id="hasDiscount" 
                  checked={isDiscounted} 
                  onCheckedChange={setIsDiscounted} 
                  className="data-[state=checked]:bg-secondary"
                />
                <Label htmlFor="hasDiscount">Apply Discount</Label>
              </div>
              
              {isDiscounted && (
                <div className="space-y-2">
                  <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
                  <Input 
                    id="discountedPrice" 
                    name="discountedPrice" 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    defaultValue={initialData?.discountedPrice} 
                    required={isDiscounted} 
                    className="border-border focus-visible:ring-primary"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Label className="text-base font-semibold">Category</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose an existing category or create a new one while saving the product.
                </p>
              </div>
              <div className="inline-flex rounded-full border border-border bg-background p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setCategoryMode("existing")}
                  className={`px-3 py-1.5 rounded-full transition-all ${categoryMode === "existing" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Existing
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryMode("new")}
                  className={`px-3 py-1.5 rounded-full transition-all ${categoryMode === "new" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Add New
                </button>
              </div>
            </div>

            {categoryMode === "existing" ? (
              <div className="space-y-2">
                <Label htmlFor="categoryId">Select Category</Label>
                <select
                  id="categoryId"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="w-full h-11 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No categories exist yet. Switch to Add New to create one.
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newCategoryName">New Category Name</Label>
                  <Input
                    id="newCategoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="e.g. Keychains"
                    className="border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newCategoryDescription">Category Description</Label>
                  <Input
                    id="newCategoryDescription"
                    value={newCategoryDescription}
                    onChange={(e) => setNewCategoryDescription(e.target.value)}
                    placeholder="Short description"
                    className="border-border focus-visible:ring-primary"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input 
              id="image" 
              name="image" 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required={!initialData?.imageUrl} 
              className="border-border focus-visible:ring-primary file:text-primary file:bg-primary/10 file:border-0 hover:file:bg-primary/20 file:mr-4 file:py-1 file:px-3 file:rounded-md cursor-pointer"
            />
            {initialData?.imageUrl && (
              <p className="text-sm text-muted-foreground mt-2">
                Leave empty to keep current image.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Switch 
              id="inStock" 
              name="inStock" 
              defaultChecked={initialData ? initialData.inStock : true} 
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 border-t border-border pt-6">
          <Button type="button" variant="outline" onClick={() => router.push("/admin")} disabled={loading} className="border-border hover:bg-muted">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 min-w-[120px]">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
