# TillOut - Till Calculation System

TillOut is a web-based application tool for cashiers and retail managers that simplifies the process of counting and balancing cash registers. By providing a clear interface for entering denomination counts, it generates an accurate deposit breakdown, which helps reduce human error and saves valuable time during daily cash management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)

## Features

- **Variance Calculation**: Automatically calculates and displays any variance (under/over) between the expected and actual cash amounts.
- **Variance Suggestions**: In case of a variance, a suggestion algorithm helps identify which tender type or denomination to double-check.
- **Deposit Breakdown**: Automatically calculates the final deposit amount and presents a clear breakdown for banking.
- **Multiple-Currency Support**: Easily configurable for use with different currencies.

## Technologies Used

- **Framework**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Animation**: [Framer Motion](https://motion.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Component Development**: [Storybook](https://storybook.js.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Steps

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/kiyoundev/tillout.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd tillout
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Start the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Usage

1.  Open the application in your browser.
2.  On the main page, enter the quantity for each bill, coin, and roll denomination in its respective field.
3.  Navigate to the summary page to view a detailed breakdown of the count.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.
- `npm run test`: Runs the test suite with Jest.
- `npm run test:watch`: Runs the test suite in watch mode.
- `npm run storybook`: Starts the Storybook server for component development.
- `npm run build-storybook`: Builds a static version of the Storybook.

## Project Structure

The project follows a feature-based architecture to promote scalability and maintainability. Core features are organized into their own modules, each containing its specific components, hooks, and logic. Shared, reusable components are kept in a global `components` directory. The project is configured with a `@` path alias that points to the `src` directory, simplifying import paths.

```
src/
├── assets/            # Static assets (fonts, images)
├── components/        # Shared, reusable UI components
├── constants/         # Application-wide constants (e.g., currency data)
├── features/          # Feature-based modules
│   ├── entry/         # Components related to the data entry page
│   └── summary/       # Components related to the summary/variance page
├── pages/             # Page components that assemble features
├── stores/            # Zustand global state management
├── styles/            # Theme and global styling
├── types/             # Shared TypeScript type definitions
└── utils/             # Global utility functions
```

## Future Updates

- [ ] **User Authentication**: Implement user accounts to save pre-defined configurations and track till history.
- [ ] **Multiple Till Support**: Allow users to manage and switch between multiple till counts simultaneously (e.g., for different cash registers or shifts).
- [ ] **Enhanced Reporting**: Introduce an analytics dashboard with charts and graphs to visualize historical till data, helping users track variance trends and gain insights into cash management patterns.
- [ ] **Data Export Options**: Enable users to export reports in various formats (PDF, CSV) 
