
# Bukuacak

Bukuacak is a simple and efficient API for accessing book data, offering various features such as filtering, sorting, and getting random books. This repository contains the front-end setup for displaying and interacting with the Bukuacak API.

## Features

- **Get Books with Filters**: Fetch a list of books with multiple filtering options such as year, genre, keyword, and sorting.
- **Get Book by ID**: Retrieve details of a specific book using its unique ID.
- **Get Book by Query Parameter**: Fetch a book by providing an ID as a query parameter.
- **Get Random Book**: Get a random book from the collection based on optional filters.
- **Get Genre Statistics**: Retrieve statistics on the number of books available in each genre.

## Setup

This project is set up using **React** and **Vite** for fast development and build speed.

### Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bukuacak.git
   cd bukuacak
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to see the application in action.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server with hot module replacement (HMR) for fast updates.
- `npm run build`: Builds the project for production.
- `npm run preview`: Preview the production build locally.

## Dependencies

This project is powered by the following libraries:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **@vitejs/plugin-react**: Official React plugin for Vite.
- **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript code.

### React + Vite Setup

This repository uses Vite, a modern and fast build tool. The following plugins are used for an optimized development experience:

- **@vitejs/plugin-react**: Uses Babel for Fast Refresh in React development.
- **@vitejs/plugin-react-swc**: An alternative that uses SWC for Fast Refresh, providing better performance for large projects.

## Contributing

Feel free to open issues or submit pull requests if you encounter bugs or want to propose enhancements. All contributions are welcome!

### Steps to Contribute

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/bukuacak.git
   ```
3. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature-branch
   ```
4. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
5. Push your changes:
   ```bash
   git push origin feature-branch
   ```
6. Open a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Vite** for providing an amazing development experience.
- **React** for making building interactive UIs easy.
- **ESLint** for enforcing consistent code quality.
