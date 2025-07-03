import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate or get session ID
  const getSessionId = (req: any) => {
    if (!req.session.id) {
      req.session.id = Math.random().toString(36).substring(2, 15);
    }
    return req.session.id;
  };

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get cart items
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  });

  // Add item to cart
  app.post("/api/cart/add", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const { productId, quantity = 1 } = req.body;
      
      const addItemSchema = z.object({
        productId: z.number(),
        quantity: z.number().min(1).optional().default(1)
      });
      
      const validated = addItemSchema.parse({ productId, quantity });
      
      // Check if product exists
      const product = await storage.getProductById(validated.productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      const cartItem = await storage.addToCart(sessionId, validated.productId, validated.quantity);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  });

  // Update cart item quantity
  app.put("/api/cart/update", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const { productId, quantity } = req.body;
      
      const updateItemSchema = z.object({
        productId: z.number(),
        quantity: z.number().min(1)
      });
      
      const validated = updateItemSchema.parse({ productId, quantity });
      
      const cartItem = await storage.updateCartItemQuantity(sessionId, validated.productId, validated.quantity);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/remove/:productId", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const productId = parseInt(req.params.productId);
      
      await storage.removeFromCart(sessionId, productId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart/clear", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      await storage.clearCart(sessionId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
