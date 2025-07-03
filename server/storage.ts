import { products, cartItems, users, type Product, type CartItem, type CartItemWithProduct, type InsertProduct, type InsertCartItem, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart operations
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(sessionId: string, productId: number, quantity: number): Promise<CartItem>;
  removeFromCart(sessionId: string, productId: number): Promise<void>;
  updateCartItemQuantity(sessionId: string, productId: number, quantity: number): Promise<CartItem>;
  clearCart(sessionId: string): Promise<void>;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = await db
      .select({
        id: cartItems.id,
        sessionId: cartItems.sessionId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));

    return items.map(item => ({
      id: item.id,
      sessionId: item.sessionId,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product
    }));
  }

  async addToCart(sessionId: string, productId: number, quantity: number): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.sessionId, sessionId) && eq(cartItems.productId, productId));

    if (existingItem) {
      // Update existing item quantity
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + quantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Create new cart item
      const [newItem] = await db
        .insert(cartItems)
        .values({ sessionId, productId, quantity })
        .returning();
      return newItem;
    }
  }

  async removeFromCart(sessionId: string, productId: number): Promise<void> {
    await db
      .delete(cartItems)
      .where(eq(cartItems.sessionId, sessionId))
      .where(eq(cartItems.productId, productId));
  }

  async updateCartItemQuantity(sessionId: string, productId: number, quantity: number): Promise<CartItem> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.sessionId, sessionId))
      .where(eq(cartItems.productId, productId))
      .returning();
    
    if (!updatedItem) {
      throw new Error('Cart item not found');
    }
    
    return updatedItem;
  }

  async clearCart(sessionId: string): Promise<void> {
    await db
      .delete(cartItems)
      .where(eq(cartItems.sessionId, sessionId));
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<string, CartItem[]>;
  private users: Map<number, User>;
  private currentProductId: number;
  private currentCartId: number;
  private currentUserId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.users = new Map();
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentUserId = 1;
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: Omit<Product, 'id'>[] = [
      {
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: "79.99",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        rating: "4.5",
        stock: 50
      },
      {
        name: "Classic Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt in various colors",
        price: "24.99",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Clothing",
        rating: "4.2",
        stock: 100
      },
      {
        name: "Stainless Steel Water Bottle",
        description: "Insulated water bottle that keeps drinks cold for 24 hours",
        price: "34.99",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Home & Garden",
        rating: "4.8",
        stock: 75
      },
      {
        name: "Bestselling Novel Collection",
        description: "Collection of award-winning novels from contemporary authors",
        price: "19.99",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Books",
        rating: "4.6",
        stock: 30
      },
      {
        name: "Yoga Mat with Carrying Strap",
        description: "Non-slip yoga mat with excellent grip and cushioning",
        price: "49.99",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Sports",
        rating: "4.4",
        stock: 25
      },
      {
        name: "Ceramic Coffee Mug Set",
        description: "Set of 4 handcrafted ceramic mugs with unique designs",
        price: "29.99",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Home & Garden",
        rating: "4.3",
        stock: 40
      },
      {
        name: "Wireless Charging Pad",
        description: "Fast wireless charging pad compatible with all Qi devices",
        price: "39.99",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        rating: "4.1",
        stock: 60
      },
      {
        name: "Denim Jacket",
        description: "Classic denim jacket with modern fit and premium fabric",
        price: "89.99",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Clothing",
        rating: "4.7",
        stock: 35
      },
      {
        name: "LED Desk Lamp",
        description: "Adjustable LED desk lamp with touch controls and USB charging",
        price: "54.99",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Home & Garden",
        rating: "4.5",
        stock: 20
      },
      {
        name: "Running Shoes",
        description: "High-performance running shoes with advanced cushioning",
        price: "129.99",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Sports",
        rating: "4.9",
        stock: 45
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with 360° sound and waterproof design",
        price: "59.99",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Electronics",
        rating: "4.6",
        stock: 55
      },
      {
        name: "Mystery Novel Bundle",
        description: "Bundle of 5 gripping mystery novels by acclaimed authors",
        price: "32.99",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        category: "Books",
        rating: "4.4",
        stock: 25
      }
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { 
      id, 
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      stock: product.stock ?? 0
    };
    this.products.set(id, newProduct);
    return newProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = this.cartItems.get(sessionId) || [];
    const itemsWithProducts: CartItemWithProduct[] = [];

    for (const item of items) {
      const product = await this.getProductById(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }

    return itemsWithProducts;
  }

  async addToCart(sessionId: string, productId: number, quantity: number): Promise<CartItem> {
    const items = this.cartItems.get(sessionId) || [];
    const existingItem = items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const newItem: CartItem = {
        id: this.currentCartId++,
        sessionId,
        productId,
        quantity
      };
      items.push(newItem);
      this.cartItems.set(sessionId, items);
      return newItem;
    }
  }

  async removeFromCart(sessionId: string, productId: number): Promise<void> {
    const items = this.cartItems.get(sessionId) || [];
    const filteredItems = items.filter(item => item.productId !== productId);
    this.cartItems.set(sessionId, filteredItems);
  }

  async updateCartItemQuantity(sessionId: string, productId: number, quantity: number): Promise<CartItem> {
    const items = this.cartItems.get(sessionId) || [];
    const item = items.find(item => item.productId === productId);
    
    if (!item) {
      throw new Error('Cart item not found');
    }

    item.quantity = quantity;
    return item;
  }

  async clearCart(sessionId: string): Promise<void> {
    this.cartItems.delete(sessionId);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
