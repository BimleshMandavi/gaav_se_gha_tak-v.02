import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Users, Package, ShoppingBag, TrendingUp, Trash2, Shield, Edit, Eye, Plus, Search, BarChart3, Filter, Download, Package2, ChevronDown, ChevronUp, User } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AdminGuide } from "../components/AdminGuide";

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const { user, users, orders, products, updateOrderStatus, deleteUser, updateUserRole, addProduct, updateProduct, deleteProduct } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});
  const [orderSearchTerm, setOrderSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    category: "",
    unit: "",
    description: "",
  });

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="mb-2">Not Logged In</h2>
            <p className="text-gray-600 mb-4">Please login to access admin panel</p>
            <Button onClick={() => onNavigate("login")} className="bg-green-600 hover:bg-green-700">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Shield className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <h2 className="mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have permission to access this page</p>
            <Button onClick={() => onNavigate("home")} className="bg-green-600 hover:bg-green-700">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const totalUsers = users.filter(u => u.role === "user").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  // Analytics data
  const statusData = [
    { name: "Pending", value: orders.filter(o => o.status === "pending").length, color: "#fbbf24" },
    { name: "Processing", value: orders.filter(o => o.status === "processing").length, color: "#3b82f6" },
    { name: "Shipped", value: orders.filter(o => o.status === "shipped").length, color: "#a855f7" },
    { name: "Delivered", value: orders.filter(o => o.status === "delivered").length, color: "#10b981" },
    { name: "Cancelled", value: orders.filter(o => o.status === "cancelled").length, color: "#ef4444" },
  ];

  // Revenue by month (last 6 months)
  const getRevenueByMonth = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        return orderDate.getMonth() === month.getMonth() && orderDate.getFullYear() === month.getFullYear();
      });
      const revenue = monthOrders.reduce((sum, o) => sum + o.total, 0);
      data.push({
        month: monthNames[month.getMonth()],
        revenue: revenue,
        orders: monthOrders.length
      });
    }
    return data;
  };

  // Category sales
  const getCategorySales = () => {
    const categoryTotals: { [key: string]: number } = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const product = products.find(p => p.name === item.name);
        if (product) {
          categoryTotals[product.category] = (categoryTotals[product.category] || 0) + (item.price * item.quantity);
        }
      });
    });
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      users.find(u => u.id === order.userId)?.name.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      users.find(u => u.id === order.userId)?.email.toLowerCase().includes(orderSearchTerm.toLowerCase());
    const matchesStatus = orderStatusFilter === "all" || order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(productSearchTerm.toLowerCase());
    const matchesCategory = productCategoryFilter === "all" || product.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleAddProduct = () => {
    addProduct(newProduct);
    setIsAddProductOpen(false);
    setNewProduct({
      name: "",
      price: 0,
      image: "",
      category: "",
      unit: "",
      description: "",
    });
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: editingProduct.name,
        price: editingProduct.price,
        image: editingProduct.image,
        category: editingProduct.category,
        unit: editingProduct.unit,
        description: editingProduct.description,
      });
      setIsEditProductOpen(false);
      setEditingProduct(null);
    }
  };

  const exportOrders = () => {
    const csv = [
      ["Order ID", "Customer", "Email", "Items", "Total", "Status", "Date"].join(","),
      ...orders.map(order => {
        const customer = users.find(u => u.id === order.userId);
        return [
          order.id,
          customer?.name || "Unknown",
          customer?.email || "",
          order.items.length,
          order.total,
          order.status,
          new Date(order.createdAt).toLocaleDateString()
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage products, orders, users, and view analytics</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("profile")}
              className="gap-2"
            >
              <User className="w-4 h-4" />
              My Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGuide(!showGuide)}
              className="gap-2"
            >
              {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showGuide ? "Hide" : "Show"} Guide
            </Button>
          </div>
        </div>

        {/* Admin Guide */}
        {showGuide && (
          <div className="mb-8">
            <AdminGuide />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="mt-1 text-gray-900">{totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="mt-1 text-gray-900">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="mt-1 text-gray-900">{pendingOrders}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="mt-1 text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Last 6 months performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getRevenueByMonth()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue (₹)" />
                      <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Order Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>Distribution of order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Sales */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Revenue breakdown by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getCategorySales()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#10b981" name="Revenue (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-gray-900">
                    {orders.length > 0 ? ((deliveredOrders / orders.length) * 100).toFixed(1) : 0}%
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Orders successfully delivered</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avg Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-gray-900">
                    ₹{orders.length > 0 ? (totalRevenue / orders.length).toFixed(0) : 0}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Average revenue per order</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-gray-900">{products.length}</div>
                  <p className="text-sm text-gray-600 mt-2">Available in store</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>View and manage customer orders</CardDescription>
                  </div>
                  <Button onClick={exportOrders} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by order ID, customer name or email..."
                      value={orderSearchTerm}
                      onChange={(e) => setOrderSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="mb-2 text-gray-900">No Orders Found</h3>
                    <p className="text-gray-600">
                      {orderSearchTerm || orderStatusFilter !== "all" 
                        ? "Try adjusting your filters" 
                        : "Orders will appear here once customers start ordering"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((order) => {
                          const customer = users.find(u => u.id === order.userId);
                          return (
                            <TableRow key={order.id}>
                              <TableCell className="text-sm font-mono">{order.id.substring(0, 12)}...</TableCell>
                              <TableCell>
                                <div>
                                  <p className="text-sm">{customer?.name || "Unknown"}</p>
                                  <p className="text-xs text-gray-500">{customer?.email || ""}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm">{order.items.length} items</TableCell>
                              <TableCell className="text-sm">₹{order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setSelectedOrder(order)}
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                      <DialogHeader>
                                        <DialogTitle>Order Details</DialogTitle>
                                        <DialogDescription>
                                          Order ID: {selectedOrder?.id}
                                        </DialogDescription>
                                      </DialogHeader>
                                      {selectedOrder && (
                                        <div className="space-y-4">
                                          {/* Customer Info */}
                                          <div>
                                            <h3 className="text-gray-900 mb-2">Customer Information</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                                              <p><span className="text-gray-600">Name:</span> {selectedOrder.shippingAddress.name}</p>
                                              <p><span className="text-gray-600">Email:</span> {selectedOrder.shippingAddress.email}</p>
                                              <p><span className="text-gray-600">Phone:</span> {selectedOrder.shippingAddress.phone}</p>
                                            </div>
                                          </div>

                                          {/* Shipping Address */}
                                          <div>
                                            <h3 className="text-gray-900 mb-2">Shipping Address</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                              <p>{selectedOrder.shippingAddress.address}</p>
                                              <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                                              <p>PIN: {selectedOrder.shippingAddress.pincode}</p>
                                            </div>
                                          </div>

                                          {/* Order Items */}
                                          <div>
                                            <h3 className="text-gray-900 mb-2">Order Items</h3>
                                            <div className="space-y-2">
                                              {selectedOrder.items.map((item: any, index: number) => (
                                                <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                                                  <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                  />
                                                  <div className="flex-1">
                                                    <p className="text-sm text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                  </div>
                                                  <p className="text-sm text-gray-900">₹{item.price * item.quantity}</p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>

                                          {/* Order Summary */}
                                          <div className="border-t pt-4">
                                            <div className="flex justify-between mb-2">
                                              <span className="text-gray-600">Subtotal:</span>
                                              <span>₹{selectedOrder.total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between mb-2">
                                              <span className="text-gray-600">Status:</span>
                                              <Badge className={getStatusColor(selectedOrder.status)}>
                                                {selectedOrder.status}
                                              </Badge>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-gray-600">Order Date:</span>
                                              <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </DialogContent>
                                  </Dialog>
                                  <Select
                                    value={selectedStatus[order.id] || order.status}
                                    onValueChange={(value) => handleStatusChange(order.id, value)}
                                  >
                                    <SelectTrigger className="w-[130px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="processing">Processing</SelectItem>
                                      <SelectItem value="shipped">Shipped</SelectItem>
                                      <SelectItem value="delivered">Delivered</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Products Management</CardTitle>
                    <CardDescription>Add, edit, and manage your products</CardDescription>
                  </div>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 gap-2">
                        <Plus className="w-4 h-4" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>Enter product details below</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                            placeholder="Fresh Organic Tomatoes"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                            placeholder="50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            placeholder="Vegetables"
                          />
                        </div>
                        <div>
                          <Label htmlFor="unit">Unit</Label>
                          <Input
                            id="unit"
                            value={newProduct.unit}
                            onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                            placeholder="kg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                            placeholder="Fresh organic tomatoes from local farms"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
                          Add Product
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={productSearchTerm}
                      onChange={(e) => setProductSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={productCategoryFilter} onValueChange={setProductCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <span className="text-sm">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">₹{product.price}</TableCell>
                          <TableCell className="text-sm">{product.unit}</TableCell>
                          <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                            {product.description}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog open={isEditProductOpen && editingProduct?.id === product.id} onOpenChange={(open) => {
                                setIsEditProductOpen(open);
                                if (!open) setEditingProduct(null);
                              }}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setEditingProduct(product)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                                  </DialogHeader>
                                  {editingProduct && (
                                    <div className="space-y-4">
                                      <div>
                                        <Label htmlFor="edit-name">Product Name</Label>
                                        <Input
                                          id="edit-name"
                                          value={editingProduct.name}
                                          onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-price">Price (₹)</Label>
                                        <Input
                                          id="edit-price"
                                          type="number"
                                          value={editingProduct.price}
                                          onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-image">Image URL</Label>
                                        <Input
                                          id="edit-image"
                                          value={editingProduct.image}
                                          onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-category">Category</Label>
                                        <Input
                                          id="edit-category"
                                          value={editingProduct.category}
                                          onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-unit">Unit</Label>
                                        <Input
                                          id="edit-unit"
                                          value={editingProduct.unit}
                                          onChange={(e) => setEditingProduct({...editingProduct, unit: e.target.value})}
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Textarea
                                          id="edit-description"
                                          value={editingProduct.description}
                                          onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => {
                                      setIsEditProductOpen(false);
                                      setEditingProduct(null);
                                    }}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleEditProduct} className="bg-green-600 hover:bg-green-700">
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteProduct(product.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell className="text-sm">{u.phone}</TableCell>
                          <TableCell>
                            <Badge className={u.role === "admin" ? "bg-purple-600" : "bg-blue-600"}>
                              {u.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Select
                                value={u.role}
                                onValueChange={(value) => updateUserRole(u.id, value as "user" | "admin")}
                                disabled={u.id === user.id}
                              >
                                <SelectTrigger className="w-[100px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-red-300 text-red-600 hover:bg-red-50"
                                    disabled={u.id === user.id}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {u.name}? This action cannot be undone and will also delete all their orders.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteUser(u.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
