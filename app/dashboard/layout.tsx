import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/dashboard" className="font-heading text-xl font-bold text-primary">
            Merchant Portal
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-muted text-card-foreground">Overview</Link>
          <Link href="/dashboard/products" className="block px-4 py-2 rounded-md hover:bg-muted text-card-foreground">Products</Link>
          <Link href="/dashboard/orders" className="block px-4 py-2 rounded-md hover:bg-muted text-card-foreground">Orders</Link>
          <Link href="/dashboard/settings" className="block px-4 py-2 rounded-md hover:bg-muted text-card-foreground">Settings</Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Dashboard Header */}
        <header className="h-16 bg-card border-b border-border flex items-center px-8 justify-end">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Merchant Account</span>
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">M</div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
