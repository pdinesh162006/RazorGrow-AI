export default function DashboardOverview() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</p>
          <p className="text-3xl font-bold">$12,450.00</p>
          <p className="text-sm text-green-600 mt-2">+14% from last month</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium mb-2">Orders</p>
          <p className="text-3xl font-bold">84</p>
          <p className="text-sm text-green-600 mt-2">+5% from last month</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-muted-foreground text-sm font-medium mb-2">Active Products</p>
          <p className="text-3xl font-bold">24</p>
        </div>
      </div>
      
      {/* Placeholder Chart */}
      <div className="bg-card p-6 rounded-xl border border-border shadow-sm h-80 flex flex-col justify-center items-center">
        <p className="text-muted-foreground">Revenue Chart Placeholder</p>
      </div>
    </div>
  );
}
