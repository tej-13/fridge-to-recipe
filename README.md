# 📝 Task Manager

A simple Task Manager application built using **Next.js**, **React**, and **TypeScript**. This project demonstrates the use of **useState** and **useRef** hooks to add and display tasks dynamically.

## 🚀 Features

- Add a new task
- Display all tasks in a table
- Store Task ID, Description, and Duration
- Built with React Hooks
- Written in TypeScript

## 🛠️ Tech Stack

- Next.js
- React
- TypeScript
- CSS

## 📂 Project Structure

```
app/
│── page.tsx
│── layout.tsx
│── globals.css
```

## 📸 Preview

The application allows users to:

- Enter Task ID
- Enter Task Description
- Enter Task Duration
- Click **Add Task**
- View all tasks in a table

## 📋 Task Model

```typescript
interface TaskType {
    taskID: number;
    description: string;
    duration: number;
}
```

## 📚 React Concepts Used

- useState
- useRef
- Event Handling
- TypeScript Interfaces
- Array State Updates
- Conditional Validation

## ▶️ Getting Started

Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
```

Navigate to the project

```bash
cd task-manager
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open your browser

```
http://localhost:3000
```

## 📖 How It Works

1. Enter the Task ID.
2. Enter the Task Description.
3. Enter the Duration.
4. Click **Add Task**.
5. The task is added to the table instantly.

## 🎯 Learning Objectives

This project helps understand:

- Managing state with `useState`
- Accessing input values using `useRef`
- Working with arrays in React
- Creating interfaces in TypeScript
- Rendering lists using `map()`
- Updating UI dynamically

## 👨‍💻 Author

**Suraj BM**

Artificial Intelligence & Machine Learning Student

---

⭐ If you found this project useful, consider giving it a star.