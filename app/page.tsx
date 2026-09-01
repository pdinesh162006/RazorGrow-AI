import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-[80vh] items-center justify-center overflow-hidden bg-primary px-4 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="z-10 max-w-3xl space-y-8">
          <h1 className="font-heading text-5xl sm:text-7xl font-bold tracking-tight text-on-primary">
            Elevate Your <span className="text-accent">Lifestyle</span>
          </h1>
          <p className="text-lg sm:text-xl text-on-primary/80 max-w-2xl mx-auto">
            Discover our curated collection of premium products designed for the modern connoisseur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/products" className="px-8 py-4 bg-accent text-on-accent font-semibold rounded-full hover:bg-accent/90 transition-all hover:scale-105">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight">New Arrivals</h2>
            <p className="text-muted-foreground mt-2">The latest additions to our exclusive catalog.</p>
          </div>
          <Link href="/products" className="text-accent hover:underline font-medium">View all</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-4 relative">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-medium shadow-lg hover:bg-primary/90">
                    Quick Add
                  </button>
                </div>
              </div>
              <h3 className="font-heading text-lg font-semibold">Premium Item {i}</h3>
              <p className="text-muted-foreground text-sm mb-2">Category Name</p>
              <p className="font-medium">${(i * 129.99).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
