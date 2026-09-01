import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="space-y-8">
        {/* Shipping Information */}
        <section className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading text-xl font-semibold mb-4 text-card-foreground">Shipping Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="w-full px-3 py-2 border border-border rounded bg-background" />
            <input type="text" placeholder="Last Name" className="w-full px-3 py-2 border border-border rounded bg-background" />
            <input type="text" placeholder="Address" className="w-full px-3 py-2 border border-border rounded bg-background col-span-2" />
            <input type="text" placeholder="City" className="w-full px-3 py-2 border border-border rounded bg-background" />
            <input type="text" placeholder="Postal Code" className="w-full px-3 py-2 border border-border rounded bg-background" />
          </div>
        </section>

        {/* Payment Information Placeholder */}
        <section className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading text-xl font-semibold mb-4 text-card-foreground">Payment Method</h2>
          <div className="p-4 border border-border rounded bg-muted/50 text-center">
            <p className="text-muted-foreground">Razorpay Integration will be loaded here.</p>
          </div>
        </section>
        
        <button className="w-full bg-accent text-on-accent py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors text-lg">
          Place Order & Pay
        </button>
      </div>
    </div>
  );
}
