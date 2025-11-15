// MERN Todo App – Week 6 Testing and Debugging Assignment
Overview

This MERN stack Todo application demonstrates comprehensive testing and debugging strategies. Focus is on ensuring reliability through unit and integration tests.

Testing
Tools

Vitest (client)

React Testing Library (component testing)

Supertest (API/integration testing)

Coverage

Unit tests for React components and utilities

Integration tests for API endpoints and component-API interactions

Error handling and state updates verified

Setup
# Install dependencies
npm run install-all

# Start client
cd client
npm run dev

# Start server
cd server
npm start

Run Tests
# Run all tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

Implementation Notes

TodoItem.jsx handles individual Todo display and toggle/delete actions

App.jsx manages state and async API calls via TodosAPI

todos.map() used to render all Todos dynamically

Mocked API calls in tests ensure predictable results