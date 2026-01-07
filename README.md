# Mayur CRM 🚀

**The All-in-One Business Management Solution**

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

An enterprise-grade Customer Relationship Management (CRM) system built for modern businesses. Streamline your operations from lead acquisition to invoicing with a powerful, intuitive interface.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=Dashboard+Preview) *Add a screenshot of your dashboard here*

## ✨ Key Features

-   **🔐 Secure Authentication**: Robust user management with role-based access (Admin/Staff) using NextAuth v5.
-   **👥 Lead Management**: Track leads through their lifecycle (New -> Follow Up -> Converted). Never miss an opportunity.
-   **🧾 Intelligent Invoicing**: Generate professional PDF invoices and quotations instantly. Download or share public links with clients.
-   **✅ Task Tracking**: Organize your team's workflow with assigned tasks and due dates.
-   **📊 Analytics Dashboard**: Visual reports to monitor business health and sales performance.
-   **📱 Mobile Responsive**: Manage your business from any device, anywhere.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Server Actions)
-   **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety.
-   **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose ODM.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/) for a premium, accessible design.
-   **Auth**: [NextAuth.js (v5)](https://authjs.dev/)
-   **PDF Generation**: React-PDF for on-the-fly document creation.
-   **Email**: Nodemailer for transactional emails (OTP, Notifications).

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js 18+ installed.
-   MongoDB connection string (Atlas or Local).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/mayur-crm.git
    cd mayur-crm
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    AUTH_SECRET=your_generated_secret_key # run `npx auth secret` to generate
    NEXTAUTH_URL=http://localhost:3000
    
    # Email Server Configuration (Optional for Dev, required for Emails)
    EMAIL_SERVER_HOST=smtp.example.com
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER=your_email_user
    EMAIL_SERVER_PASSWORD=your_email_password
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment on Vercel

The easiest way to deploy this app is using the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  **Critical Step**: In Vercel Project Settings > Environment Variables, add all the variables from your `.env.local` file (`MONGODB_URI`, `AUTH_SECRET`, etc.).
4.  **Database Access**: Ensure your MongoDB Atlas Network Access whitelist includes `0.0.0.0/0` (Allow Access from Anywhere) so Vercel's dynamic IPs can connect.
5.  Deploy! 🚀

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
