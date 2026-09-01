import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-primary">
          RazorGrow
        </Link>
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm font-medium">
          <Link href="/products" className="transition-colors hover:text-accent">Shop</Link>
          <Link href="/categories" className="transition-colors hover:text-accent">Categories</Link>
          <Link href="/about" className="transition-colors hover:text-accent">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-sm font-medium hover:text-accent">Cart</Link>
          <Link href="/login" className="text-sm font-medium px-4 py-2 bg-primary text-on-primary rounded-md hover:bg-primary/90 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
