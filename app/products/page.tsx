import Link from 'next/link';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <h2 className="font-heading text-xl font-bold mb-6">Filters</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {['All', 'Electronics', 'Fashion', 'Home', 'Beauty'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" />
                    <span className="text-sm text-muted-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-border rounded bg-background text-sm" />
                <span>-</span>
                <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-border rounded bg-background text-sm" />
              </div>
            </div>
          </div>
        </aside>
        
        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-heading text-3xl font-bold">All Products</h1>
            <select className="border border-border rounded px-4 py-2 bg-background text-sm cursor-pointer">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Link href={`/products/${i}`} key={i} className="group">
                <div className="aspect-[4/5] bg-muted rounded-xl overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
                </div>
                <h3 className="font-heading text-lg font-semibold group-hover:text-accent transition-colors">Premium Item {i}</h3>
                <p className="text-muted-foreground text-sm mb-2">Category Name</p>
                <p className="font-medium">${(i * 89.99).toFixed(2)}</p>
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-10 h-10 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors">&lt;</button>
            <button className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center">1</button>
            <button className="w-10 h-10 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors">2</button>
            <button className="w-10 h-10 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors">3</button>
            <button className="w-10 h-10 rounded border border-border flex items-center justify-center hover:bg-muted transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
