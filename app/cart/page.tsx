import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-6 pb-6 border-b border-border">
              <div className="w-24 h-24 bg-muted rounded-md shrink-0"></div>
              <div className="flex-1 flex justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-lg">Premium Item {i}</h3>
                  <p className="text-muted-foreground text-sm mb-2">Variant: Standard</p>
                  <p className="font-medium">${(i * 89.99).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button className="text-destructive text-sm hover:underline">Remove</button>
                  <div className="flex items-center border border-border rounded">
                    <button className="px-3 py-1 hover:bg-muted">-</button>
                    <span className="px-3 py-1 border-x border-border text-sm">1</span>
                    <button className="px-3 py-1 hover:bg-muted">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-80 bg-muted/30 p-6 rounded-xl h-fit">
          <h2 className="font-heading text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">$269.97</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between text-base">
              <span className="font-bold">Estimated Total</span>
              <span className="font-bold">$269.97</span>
            </div>
          </div>
          <Link href="/checkout" className="block w-full bg-primary text-on-primary text-center py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
