# **App Name**: AlphaFlow Underwear

## Core Features:

- Product Catalog & Detail Pages: Users can browse featured products on the homepage, view the full product catalog with filtering options (price, quantity), and access detailed product pages with image galleries, descriptions, and size selection. Stock availability will be reflected from Firestore.
- Shopping Cart & Simplified Checkout: Users can add items to a cart, adjust quantities, see the total, and proceed to a simplified checkout collecting necessary shipping information (name, address, WhatsApp). The primary payment option is PIX, which will automatically generate a QR code for payment. Orders are saved to Firestore with an 'awaiting payment' status.
- User Account & Order History: Implement user registration and login functionality using Firebase Authentication (email and password). Logged-in users will have a dedicated area to view their past order history, fetched from Firestore.
- Dynamic Marketing Content Tool: A generative AI tool that assists in creating catchy and urgent promotional messages for banners (e.g., 'Kit 10 cuecas por R$49,90 hoje no PIX') and product highlights, aiming to optimize conversion rates.
- Floating WhatsApp Support Button: A persistent floating button on all pages providing quick, direct access to customer support via WhatsApp.

## Style Guidelines:

- Primary action color: A vibrant red (#F2133A) for strong call-to-action buttons and key interactive elements, reflecting urgency and a bold, masculine aesthetic.
- Background color: A very dark, reddish-grey (#1C1719) to provide a sleek, modern, and minimalist backdrop, enhancing the vibrance of primary elements.
- Accent color: A bright, warm orange (#F5900F) used sparingly for highlights, secondary interactive elements, or attention-grabbing details, complementing the primary red without competing.
- Body and headline font: 'Inter' (sans-serif) for its modern, clean, and highly readable qualities, suitable for a minimalist design across all content.
- Use a consistent set of sharp, minimalist monochromatic icons. These should maintain a clean and uncluttered appearance, complementing the overall masculine and modern design without excessive detail.
- A clean, grid-based layout with ample negative space to ensure products are the focus. Emphasis on a mobile-first approach, ensuring optimal responsiveness and ease of navigation on smaller screens.
- Implement subtle and fast micro-interactions on hover effects for product cards and buttons. This provides positive user feedback and a responsive feel while maintaining quick page load times.