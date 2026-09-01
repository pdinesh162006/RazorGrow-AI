export default function MerchantProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-bold">Products</h1>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
          Add New Product
        </button>
      </div>
      
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="p-4 font-medium text-muted-foreground">Product</th>
              <th className="p-4 font-medium text-muted-foreground">Category</th>
              <th className="p-4 font-medium text-muted-foreground">Price</th>
              <th className="p-4 font-medium text-muted-foreground">Stock</th>
              <th className="p-4 font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[1, 2, 3].map(i => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded"></div>
                  <span className="font-medium">Premium Item {i}</span>
                </td>
                <td className="p-4 text-muted-foreground">Category Name</td>
                <td className="p-4 font-medium">${(i * 89.99).toFixed(2)}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    24 in stock
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-accent hover:underline mr-4">Edit</button>
                  <button className="text-destructive hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
