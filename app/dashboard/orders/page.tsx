export default function MerchantOrders() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold mb-8">Orders</h1>
      
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-4 font-medium text-muted-foreground">Order ID</th>
              <th className="p-4 font-medium text-muted-foreground">Date</th>
              <th className="p-4 font-medium text-muted-foreground">Customer</th>
              <th className="p-4 font-medium text-muted-foreground">Total</th>
              <th className="p-4 font-medium text-muted-foreground">Status</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1, 2, 3, 4].map(i => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="p-4 font-medium">#ORD-{1000 + i}</td>
                <td className="p-4 text-muted-foreground">Sep 1, 2026</td>
                <td className="p-4">customer{i}@example.com</td>
                <td className="p-4 font-medium">$269.97</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${i % 2 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {i % 2 === 0 ? 'Pending' : 'Shipped'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <select className="border border-border rounded px-2 py-1 bg-background text-sm cursor-pointer mr-2">
                    <option>Update Status</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                  </select>
                  <button className="text-accent hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
