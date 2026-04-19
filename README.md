# Finance Web Application

## Project Overview  
The Finance Web Application is a modern financial management tool designed for users to track their expenses, investments, and overall financial health. Built with Next.js for server-side rendering and optimized performance, this application takes advantage of TypeScript's strong typing system and Tailwind CSS for responsive and customizable UI components.

## Features  
- User Authentication  
- Expense Tracking  
- Investment Portfolio Management  
- Budget Planning Tools  
- Real-time Data Visualization  
- Responsive Design for Mobile and Desktop  

## Tech Stack  
- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that provides static typing, improving the maintainability of the codebase.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **Node.js**: The server environment that runs the Next.js application.
- **PostgreSQL**: A powerful relational database for storing user data and application records.
- **Prisma**: An ORM that simplifies database interactions and queries.

## Installation Instructions  
1. **Clone the repository**:  
   `git clone https://github.com/wchonguk/finance-web-app.git`  
2. **Change directory**:  
   `cd finance-web-app`  
3. **Install dependencies**:  
   `npm install` or `yarn install`  
4. **Set up the database**:  
   - Create a new PostgreSQL database and configure the connection in the `.env` file.  
5. **Run database migrations**:  
   `npx prisma migrate dev`  
6. **Start the development server**:  
   `npm run dev` or `yarn dev`  

## Project Structure  
```
finance-web-app/
├── public/          # Static files like images and fonts
├── src/             # Source files (components, pages, styles)
│   ├── components/  # Reusable components
│   ├── pages/       # Next.js pages
│   ├── styles/      # Global styles and Tailwind CSS configs
│   ├── utils/       # Utility functions
│   └── hooks/       # Custom hooks
├── .env             # Environment variables
├── package.json     # Project metadata and dependencies
└── tsconfig.json    # TypeScript configuration
```

## Usage  
- Navigate to the application in your web browser, usually at `http://localhost:3000`.
- Sign up or log in to access your financial dashboard.
- Use the dashboard to track expenses, manage investments, and view financial reports.

## Development  
- Ensure you have Node.js v14 or higher installed.
- For testing, use `npm run test` or `yarn test`.
- For building for production, run `npm run build` or `yarn build`.
- Contributions are welcome! Please open issues or pull requests for suggestions or improvements.