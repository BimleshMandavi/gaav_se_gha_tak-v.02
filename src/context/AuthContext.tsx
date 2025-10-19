import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner@2.0.3";
import { products as initialProducts, Product } from "../data/products";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  orders: Order[];
  products: Product[];
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string, phone: string, address: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  createOrder: (order: Omit<Order, "id" | "userId" | "createdAt" | "updatedAt">) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  deleteUser: (userId: string) => void;
  updateUserRole: (userId: string, role: "user" | "admin") => void;
  getUserOrders: (userId: string) => Order[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize with a demo admin user
const DEMO_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@gaavseghartak.com",
    name: "Admin User",
    phone: "1234567890",
    address: "Admin Office, Village Market",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
];

const DEMO_PASSWORD = "admin123"; // For demo purposes only

// Demo orders for testing
const DEMO_ORDERS: Order[] = [
  {
    id: "order-demo-1",
    userId: "admin-1",
    items: [
      {
        id: 1,
        name: "Fresh Vegetables Bundle",
        price: 299,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
      },
      {
        id: 3,
        name: "Pure Cow Ghee",
        price: 699,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
      },
    ],
    total: 1349.65,
    status: "delivered",
    shippingAddress: {
      name: "Admin User",
      email: "admin@gaavseghartak.com",
      phone: "1234567890",
      address: "Admin Office",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedUsers = localStorage.getItem("users");
    const storedOrders = localStorage.getItem("orders");
    const storedProducts = localStorage.getItem("products");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem("users", JSON.stringify(DEMO_USERS));
    }
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      localStorage.setItem("orders", JSON.stringify(DEMO_ORDERS));
    }
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      localStorage.setItem("products", JSON.stringify(initialProducts));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const login = (email: string, password: string): boolean => {
    // Note: In a real app, passwords should be hashed and verified securely
    const foundUser = users.find((u) => u.email === email);
    
    if (!foundUser) {
      toast.error("Invalid email or password");
      return false;
    }

    // Simple password check - in demo, admin uses DEMO_PASSWORD, others use their email as password
    const validPassword = foundUser.role === "admin" 
      ? password === DEMO_PASSWORD 
      : password === localStorage.getItem(`pwd_${foundUser.id}`);

    if (!validPassword) {
      toast.error("Invalid email or password");
      return false;
    }

    setUser(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    toast.success(`Welcome back, ${foundUser.name}!`);
    return true;
  };

  const register = (email: string, password: string, name: string, phone: string, address: string): boolean => {
    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      toast.error("Email already registered");
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      phone,
      address,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    // Store password separately (in real app, this would be hashed on backend)
    localStorage.setItem(`pwd_${newUser.id}`, password);

    setUsers([...users, newUser]);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    toast.success("Registration successful! Welcome!");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully");
  };

  const createOrder = (orderData: Omit<Order, "id" | "userId" | "createdAt" | "updatedAt">) => {
    if (!user) return;

    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders([...orders, newOrder]);
    toast.success("Order placed successfully!");
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
    toast.success("Order status updated");
  };

  const deleteUser = (userId: string) => {
    if (userId === user?.id) {
      toast.error("Cannot delete your own account");
      return;
    }
    setUsers(users.filter((u) => u.id !== userId));
    // Also delete user's orders
    setOrders(orders.filter((o) => o.userId !== userId));
    toast.success("User deleted successfully");
  };

  const updateUserRole = (userId: string, role: "user" | "admin") => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role } : u)));
    if (user?.id === userId) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
    toast.success("User role updated");
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter((order) => order.userId === userId);
  };

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
    };
    setProducts([...products, newProduct]);
    toast.success("Product added successfully");
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...productData } : product
      )
    );
    toast.success("Product updated successfully");
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    toast.success("Product deleted successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        orders,
        products,
        login,
        register,
        logout,
        updateProfile,
        createOrder,
        updateOrderStatus,
        deleteUser,
        updateUserRole,
        getUserOrders,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
