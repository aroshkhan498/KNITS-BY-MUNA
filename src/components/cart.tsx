"use client";

import { ShoppingCart, X, Plus, Minus, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "./cart-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function Cart() {
  const { items, updateQuantity, total } = useCart();
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = () => {
    let orderText = `Hi Knits by Muna! I would like to order:\n\n`;
    items.forEach((item) => {
      orderText += `${item.quantity}x ${item.title} - $${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    orderText += `\nTotal: $${total.toFixed(2)}`;

    // Encode for URL
    const encodedText = encodeURIComponent(orderText);
    // Open Messenger or WhatsApp (Using Instagram DM link as placeholder if no messenger)
    // The prompt says: Facebook Page Messenger / Instagram DM inbox
    window.open(`https://ig.me/m/knitsbymuna?text=${encodedText}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="icon" className="relative border-primary text-primary hover:bg-primary/20 hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground shadow-[0_0_10px_var(--secondary)]">
                {itemCount}
              </span>
            )}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]">
        <DialogHeader>
          <DialogTitle className="font-outfit text-2xl text-primary drop-shadow-[0_0_5px_rgba(var(--primary),0.5)]">Your Cart</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b border-border pb-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-16 w-16 rounded-md object-cover border border-border"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-4 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-secondary drop-shadow-[0_0_5px_rgba(var(--secondary),0.5)]">${total.toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full font-bold bg-primary hover:bg-primary/80 text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)] flex items-center gap-2">
              <Send className="h-4 w-4" /> Place Order via DM
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
