# GitHub Copilot – Project Guidelines

These are the rules Copilot should follow when generating code for this repository.

---

## 📌 General Principles

- Follow **KISS**: keep solutions simple, avoid unnecessary abstractions.
- Follow **DRY**: extract common logic, avoid duplication.
- Follow **SOLID**: prefer small, composable units with single responsibility.
- Prefer readability and maintainability over cleverness.
- Avoid over-engineering.

---

## 📌 React 19

- Keep client components minimal and focused on UI or interactivity.
- Use React 19 best practices:
  - Avoid legacy patterns (`useEffect` only when necessary).
  - Prefer **useTransition**, **useOptimistic**, **form actions**, **server actions**.
- Do not generate classes or class components (only functional components).

---

## 📌 TypeScript Guidelines

- Use strict, explicit TypeScript types.
- Avoid `any`.
- Prefer inferred types when they improve clarity.
- Use types instead of interfaces unless extending is required.

---

## 📌 Code Style

- **No semicolons.**
- Use modern ES modules.
- Use named exports when possible.
- Keep functions pure unless side effects are necessary.
- Keep components small and focused (SRP).
- Use descriptive variable names.
- Prefer early returns.

---

## 📌 React Components Structure

- Components must:
  - Accept **typed props**.
  - Be pure and predictable.
  - Avoid logic in JSX.
  - Extract heavy logic into hooks or helpers.

---

## 📌 Hooks

- Hooks must:
  - Have **single responsibility**.
  - Be fully typed.
  - Avoid side effects unless essential.
  - Not contain UI logic.

---

## 📌 MUI

- Use MUI components following:
  - SX prop for styling.
  - Composition over customization.
- Avoid excessive wrapper components.

---

## 📌 Project Architecture

- Use clean folder structure:
  - `app/` for Next.js routes
  - `pages/` for general page
  - `components/` for custom components
  - `ui/` for generic components
  - `hooks/` for shared logic
  - `lib/` for utilities
  - `context/` for context + reducers (if needed)

---

By following these rules, Copilot should generate code aligned with project standards.
