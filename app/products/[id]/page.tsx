import Link from 'next/link';

export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-muted rounded-2xl w-full"></div>
        
        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-accent font-medium mb-2">Category Name</p>
          <h1 className="font-heading text-4xl font-bold mb-4">Premium Item {params.id}</h1>
          <p className="text-2xl font-medium mb-6">$89.99</p>
          
          <p className="text-muted-foreground mb-8">
            Experience the pinnacle of design and functionality. This premium item is crafted with meticulous attention to detail, ensuring an unparalleled user experience.
          </p>
          
          <div className="space-y-4 mb-8">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-md">
                <button className="px-4 py-2 hover:bg-muted">-</button>
                <span className="px-4 py-2 border-x border-border">1</span>
                <button className="px-4 py-2 hover:bg-muted">+</button>
              </div>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-on-primary py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Add to Cart
            </button>
            <button className="flex-1 bg-accent text-on-accent py-4 rounded-full font-semibold hover:bg-accent/90 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
