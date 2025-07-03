# Local Setup Guide for LocalStore E-commerce

This guide will help you run the LocalStore e-commerce application on your local machine.

## Step 1: Prerequisites

Before you begin, ensure you have the following installed on your computer:

### Node.js Installation
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (Long Term Support)
3. Run the installer and follow the installation steps
4. Verify installation by opening a terminal/command prompt and typing:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers for both commands.

## Step 2: Download the Project

You have several options to get the project files:

### Option A: Download ZIP
1. Download the project as a ZIP file
2. Extract it to a folder on your computer
3. Remember the location of this folder

### Option B: Clone with Git (if you have Git installed)
```bash
git clone <repository-url>
cd localstore-ecommerce
```

## Step 3: Open Terminal/Command Prompt

### On Windows:
- Press `Windows + R`, type `cmd`, and press Enter
- Or search for "Command Prompt" in the Start menu

### On Mac:
- Press `Cmd + Space`, type "Terminal", and press Enter
- Or go to Applications > Utilities > Terminal

### On Linux:
- Press `Ctrl + Alt + T`
- Or search for "Terminal" in your applications

## Step 4: Navigate to Project Folder

In the terminal, navigate to where you extracted/cloned the project:

```bash
cd path/to/your/project/folder
```

For example:
- Windows: `cd C:\Users\YourName\Downloads\localstore-ecommerce`
- Mac/Linux: `cd ~/Downloads/localstore-ecommerce`

## Step 5: Install Dependencies

Run this command to install all required packages:

```bash
npm install
```

This will take a few minutes the first time. You'll see lots of text scrolling by - this is normal!

## Step 6: Start the Application

Once installation is complete, start the development server:

```bash
npm run dev
```

You should see output similar to:
```
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index.ts
serving on port 5000
```

## Step 7: Open in Browser

1. Open your web browser (Chrome, Firefox, Safari, etc.)
2. Go to: `http://localhost:5000`
3. You should see the LocalStore e-commerce website!

## Step 8: Start Shopping!

The website includes:
- **12 sample products** across different categories
- **Product filtering** by category and price
- **Shopping cart** functionality
- **Responsive design** that works on mobile and desktop

### Test the Features:
1. **Browse Products**: Scroll through the product catalog
2. **Use Filters**: Try filtering by category (Electronics, Clothing, etc.)
3. **Add to Cart**: Click "Add to Cart" on any product
4. **View Cart**: Click the cart icon in the top-right corner
5. **Manage Cart**: Add/remove items and change quantities

## Troubleshooting

### Common Issues:

**"Command not found" error:**
- Make sure Node.js is properly installed
- Restart your terminal after installing Node.js

**Port 5000 already in use:**
- Another application might be using port 5000
- Close other development servers or restart your computer

**Installation errors:**
- Try deleting the `node_modules` folder and running `npm install` again
- Make sure you have a stable internet connection

**Browser shows "Cannot connect":**
- Make sure the server is running (check the terminal)
- Verify you're using `http://localhost:5000` (not https)

### Getting Help:
If you encounter any issues:
1. Check that Node.js version is 18 or higher: `node --version`
2. Make sure you're in the correct project directory
3. Try the troubleshooting steps above

## Stopping the Application

To stop the development server:
- In the terminal, press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
- The server will stop and you can close the terminal

## Next Steps

Once you have the application running locally, you can:
- Modify the code to customize the store
- Add new products to the catalog
- Change the styling and branding
- Deploy to a web hosting service

Enjoy your local e-commerce store! 🏪