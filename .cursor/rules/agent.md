# Agent Instructions: Clean Code & Programming Patterns

## Mission
Write maintainable, readable, and scalable code following established best practices and design patterns. Prioritize code clarity over cleverness.

---

## Core Clean Code Principles

### 1. Naming Conventions
**Variables & Functions**
- Use descriptive, pronounceable names that reveal intent
- Avoid abbreviations unless universally understood
- Boolean variables should sound like yes/no questions (`isActive`, `hasPermission`, `canEdit`)
- Functions should be verb-based (`getUserData`, `calculateTotal`, `validateEmail`)

```javascript
// ❌ Bad
const d = new Date();
const usr = fetchUsr(id);
function calc(a, b) { return a + b; }

// ✅ Good
const currentDate = new Date();
const user = fetchUserById(id);
function calculateSum(firstNumber, secondNumber) { 
  return firstNumber + secondNumber; 
}
```

**Classes & Components**
- Use PascalCase for classes and React components
- Name classes with nouns (`UserService`, `PaymentProcessor`, `ErrorBoundary`)
- Name interfaces/types descriptively (`UserProfile`, `ApiResponse`, `FormValues`)

**Constants**
- Use UPPER_SNAKE_CASE for true constants
- Group related constants in objects or enums

```typescript
// ✅ Good
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT_MS = 5000;

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

### 2. Function Design
**Single Responsibility Principle**
- Each function should do ONE thing well
- If you use "and" to describe a function, it probably does too much
- Extract helper functions for complex logic

```typescript
// ❌ Bad - does too much
function processUserAndSendEmail(userData) {
  const user = validateUser(userData);
  saveToDatabase(user);
  const emailTemplate = buildEmailTemplate(user);
  sendEmail(user.email, emailTemplate);
  logActivity(user.id, 'registered');
  return user;
}

// ✅ Good - separate concerns
function registerUser(userData) {
  const user = validateAndSaveUser(userData);
  notifyUserRegistration(user);
  return user;
}

function validateAndSaveUser(userData) {
  const user = validateUser(userData);
  return saveToDatabase(user);
}

function notifyUserRegistration(user) {
  const emailTemplate = buildEmailTemplate(user);
  sendEmail(user.email, emailTemplate);
  logActivity(user.id, 'registered');
}
```

**Function Length**
- Keep functions short (ideally < 20 lines)
- If a function is getting long, extract logical blocks into helper functions
- Use early returns to reduce nesting

```typescript
// ❌ Bad - deeply nested
function processOrder(order) {
  if (order) {
    if (order.items.length > 0) {
      if (order.paymentMethod) {
        if (order.shippingAddress) {
          // process order
        }
      }
    }
  }
}

// ✅ Good - early returns
function processOrder(order) {
  if (!order) return null;
  if (order.items.length === 0) return null;
  if (!order.paymentMethod) throw new Error('Payment method required');
  if (!order.shippingAddress) throw new Error('Shipping address required');
  
  return executeOrderProcessing(order);
}
```

**Function Parameters**
- Limit to 3 parameters max
- Use object parameters for functions with many arguments
- Avoid boolean flags - they indicate the function does multiple things

```typescript
// ❌ Bad
function createUser(name, email, age, address, phone, isAdmin, isPremium) {
  // ...
}

// ✅ Good
interface CreateUserParams {
  name: string;
  email: string;
  age: number;
  address: string;
  phone: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
}

function createUser(params: CreateUserParams) {
  // ...
}
```

### 3. DRY Principle (Don't Repeat Yourself)
- Extract repeated logic into reusable functions
- Use loops and data structures instead of repetitive code
- Create utility functions for common operations
- Use composition over duplication

```typescript
// ❌ Bad - repetition
const isValidEmail = email.includes('@') && email.includes('.');
const isValidBackupEmail = backupEmail.includes('@') && backupEmail.includes('.');

// ✅ Good - extracted
function isValidEmail(email: string): boolean {
  return email.includes('@') && email.includes('.');
}

const isValidEmail = isValidEmail(email);
const isValidBackupEmail = isValidEmail(backupEmail);
```

### 4. Error Handling
**Be Explicit**
- Never use empty catch blocks
- Provide context in error messages
- Use custom error classes for domain-specific errors
- Handle errors at the appropriate level

```typescript
// ❌ Bad
try {
  processPayment(amount);
} catch (e) {
  // silent failure
}

// ✅ Good
try {
  processPayment(amount);
} catch (error) {
  logger.error('Payment processing failed', {
    amount,
    userId: user.id,
    error: error.message,
  });
  throw new PaymentProcessingError(
    'Unable to process payment. Please try again.',
    { cause: error }
  );
}
```

**Custom Error Classes**
```typescript
class PaymentProcessingError extends Error {
  constructor(message: string, public details?: unknown) {
    super(message);
    this.name = 'PaymentProcessingError';
  }
}

class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### 5. Comments & Documentation
**When to Comment**
- Explain WHY, not WHAT (code should be self-explanatory for "what")
- Document complex algorithms or business logic
- Add TODO/FIXME with context and assignee
- Use JSDoc for public APIs and complex functions

```typescript
// ❌ Bad - states the obvious
// Increment i by 1
i++;

// ❌ Bad - outdated comment
// Check if user is admin (this actually checks for any elevated role)
if (user.role !== 'user') { }

// ✅ Good - explains why
// We wait 100ms before validation to avoid overwhelming the API
// during rapid typing. This is a debounce implementation.
setTimeout(validateInput, 100);

// ✅ Good - JSDoc for public API
/**
 * Calculates the total price including tax and discounts
 * @param items - Array of items in the cart
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @param discountCode - Optional discount code to apply
 * @returns Total price with tax and discounts applied
 * @throws {ValidationError} If items array is empty
 */
function calculateTotal(
  items: CartItem[], 
  taxRate: number, 
  discountCode?: string
): number {
  // ...
}
```

**When NOT to Comment**
- Don't comment bad code - rewrite it
- Don't leave commented-out code - use version control
- Don't add noise comments that repeat the code

---

## Design Patterns & Architecture

### 1. SOLID Principles

**Single Responsibility Principle (SRP)**
Each class/module should have one reason to change.

```typescript
// ❌ Bad - multiple responsibilities
class UserManager {
  saveUser(user: User) { /* DB logic */ }
  sendWelcomeEmail(user: User) { /* Email logic */ }
  validateUser(user: User) { /* Validation logic */ }
}

// ✅ Good - separated concerns
class UserRepository {
  saveUser(user: User) { /* DB logic */ }
}

class UserNotificationService {
  sendWelcomeEmail(user: User) { /* Email logic */ }
}

class UserValidator {
  validate(user: User) { /* Validation logic */ }
}
```

**Open/Closed Principle**
Open for extension, closed for modification.

```typescript
// ✅ Good - extensible without modification
interface PaymentStrategy {
  processPayment(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment implements PaymentStrategy {
  async processPayment(amount: number) { /* ... */ }
}

class PayPalPayment implements PaymentStrategy {
  async processPayment(amount: number) { /* ... */ }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}
  
  async process(amount: number) {
    return this.strategy.processPayment(amount);
  }
}
```

**Dependency Inversion Principle**
Depend on abstractions, not concretions.

```typescript
// ❌ Bad - depends on concrete implementation
class UserService {
  private db = new MySQLDatabase();
  
  getUser(id: string) {
    return this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

// ✅ Good - depends on abstraction
interface Database {
  query(sql: string): Promise<any>;
}

class UserService {
  constructor(private db: Database) {}
  
  getUser(id: string) {
    return this.db.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}
```

### 2. Common Design Patterns

**Factory Pattern**
Use when object creation logic is complex.

```typescript
interface Logger {
  log(message: string): void;
}

class LoggerFactory {
  static createLogger(environment: string): Logger {
    switch (environment) {
      case 'production':
        return new CloudLogger();
      case 'development':
        return new ConsoleLogger();
      case 'test':
        return new MockLogger();
      default:
        throw new Error(`Unknown environment: ${environment}`);
    }
  }
}
```

**Repository Pattern**
Abstract data access logic.

```typescript
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

class DatabaseUserRepository implements UserRepository {
  constructor(private db: Database) {}
  
  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    return result[0] ? this.mapToUser(result[0]) : null;
  }
  
  // ... other methods
}
```

**Strategy Pattern**
Encapsulate algorithms and make them interchangeable.

```typescript
interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] { /* ... */ }
}

class MergeSort implements SortStrategy {
  sort(data: number[]): number[] { /* ... */ }
}

class DataProcessor {
  constructor(private sortStrategy: SortStrategy) {}
  
  process(data: number[]) {
    return this.sortStrategy.sort(data);
  }
}
```

**Observer Pattern (Pub/Sub)**
```typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];
  
  subscribe(observer: Observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}
```

### 3. Composition Over Inheritance
- Favor composition to build complex behaviors
- Avoid deep inheritance hierarchies (max 2-3 levels)
- Use interfaces to define contracts

```typescript
// ❌ Bad - inheritance for behavior
class Animal {
  eat() { }
  sleep() { }
}

class FlyingAnimal extends Animal {
  fly() { }
}

class SwimmingAnimal extends Animal {
  swim() { }
}

// What about a duck that flies AND swims?

// ✅ Good - composition
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly() { /* ... */ }
  swim() { /* ... */ }
  eat() { /* ... */ }
}
```

---

## Code Organization

### 1. File Structure
```
src/
├── features/              # Feature-based organization
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   └── users/
│       └── ...
├── shared/               # Shared across features
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── config/               # Configuration files
├── lib/                  # External library setup
└── app/                  # App-level setup
```

### 2. Module Organization
- One component/class per file
- Group related files in folders
- Use barrel exports (index.ts) for cleaner imports
- Keep file length reasonable (< 300 lines)

```typescript
// features/users/index.ts (barrel export)
export { UserList } from './components/UserList';
export { useUsers } from './hooks/useUsers';
export { UserService } from './services/UserService';
export type { User, UserRole } from './types';

// Usage elsewhere
import { UserList, useUsers, UserService } from '@/features/users';
```

### 3. Imports Organization
```typescript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

// 2. Internal absolute imports
import { Button } from '@/shared/components';
import { useAuth } from '@/features/auth';

// 3. Relative imports
import { UserCard } from './UserCard';
import { formatUserName } from './utils';

// 4. Types
import type { User } from './types';

// 5. Styles
import styles from './UserList.module.css';
```

---

## Language-Specific Best Practices

### TypeScript
**Use Type Safety**
```typescript
// ✅ Always type function parameters and return values
function calculateDiscount(price: number, percentage: number): number {
  return price * (percentage / 100);
}

// ✅ Use interfaces for object shapes
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// ✅ Use enums for fixed sets of values
enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

// ✅ Use utility types
type PartialProduct = Partial<Product>;
type ProductKeys = keyof Product;
type ProductName = Pick<Product, 'name'>;

// ✅ Avoid 'any' - use 'unknown' if type is truly unknown
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  // ...
}
```

### React/JSX
**Component Best Practices**
```typescript
// ✅ Functional components with TypeScript
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  // Use meaningful variable names
  const [isEditing, setIsEditing] = useState(false);
  
  // Extract complex logic to custom hooks
  const { permissions } = useUserPermissions(user.id);
  
  // Extract JSX to sub-components if complex
  return (
    <div className={className}>
      <UserAvatar user={user} />
      <UserDetails user={user} />
      {permissions.canEdit && (
        <EditButton onClick={() => onEdit?.(user)} />
      )}
    </div>
  );
}

// ✅ Use custom hooks for reusable logic
function useUserPermissions(userId: string) {
  const [permissions, setPermissions] = useState<Permissions | null>(null);
  
  useEffect(() => {
    fetchUserPermissions(userId).then(setPermissions);
  }, [userId]);
  
  return { permissions };
}
```

### JavaScript/Node.js
**Async/Await Best Practices**
```javascript
// ✅ Always handle errors
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    logger.error('Failed to fetch user data', { userId, error });
    throw error;
  }
}

// ✅ Use Promise.all for parallel operations
async function loadDashboardData(userId) {
  const [user, orders, notifications] = await Promise.all([
    fetchUser(userId),
    fetchOrders(userId),
    fetchNotifications(userId),
  ]);
  
  return { user, orders, notifications };
}

// ✅ Avoid mixing callbacks and promises
// Use one style consistently
```

---

## Testing Considerations

### Write Testable Code
```typescript
// ❌ Hard to test - tightly coupled
function processOrder() {
  const db = new Database();
  const payment = new PaymentGateway();
  // ...
}

// ✅ Easy to test - dependencies injected
function processOrder(db: Database, payment: PaymentGateway) {
  // ...
}

// ✅ Pure functions are easiest to test
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

### Test Structure
```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      // Arrange
      const userData = { name: 'John', email: 'john@example.com' };
      const mockDb = createMockDatabase();
      const service = new UserService(mockDb);
      
      // Act
      const result = await service.createUser(userData);
      
      // Assert
      expect(result).toMatchObject(userData);
      expect(mockDb.save).toHaveBeenCalledWith(userData);
    });
  });
});
```

---

## Performance Considerations

### 1. Avoid Premature Optimization
- Write clean code first
- Profile before optimizing
- Optimize based on actual bottlenecks

### 2. Common Optimizations
```typescript
// ✅ Memoization for expensive calculations
const memoizedCalculation = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// ✅ Debounce frequent operations
const debouncedSearch = debounce((query) => {
  searchAPI(query);
}, 300);

// ✅ Early returns to avoid unnecessary work
function processData(data: Data[]) {
  if (data.length === 0) return [];
  if (!isValid(data)) return [];
  
  return data.map(transform);
}

// ✅ Use appropriate data structures
// Map for O(1) lookups instead of Array.find()
const userMap = new Map(users.map(u => [u.id, u]));
const user = userMap.get(userId); // O(1) instead of O(n)
```

---

## Security Best Practices

```typescript
// ✅ Validate and sanitize inputs
function createUser(input: unknown) {
  const validated = userSchema.parse(input); // Use Zod, Yup, etc.
  return saveUser(validated);
}

// ✅ Never trust user input
function executeQuery(userId: string) {
  // Use parameterized queries
  return db.query('SELECT * FROM users WHERE id = ?', [userId]);
  
  // ❌ NEVER do this - SQL injection risk
  // return db.query(`SELECT * FROM users WHERE id = ${userId}`);
}

// ✅ Use environment variables for secrets
const API_KEY = process.env.API_KEY;

// ❌ Never hardcode secrets
// const API_KEY = 'sk_live_123456789';
```

---

## Code Review Checklist

Before committing code, verify:

- [ ] Code follows naming conventions
- [ ] Functions are small and single-purpose
- [ ] No code duplication (DRY)
- [ ] Error handling is comprehensive
- [ ] Comments explain "why", not "what"
- [ ] Types are properly defined (TypeScript)
- [ ] No console.logs or debug code
- [ ] Dependencies are properly injected
- [ ] Code is testable
- [ ] Performance considerations addressed
- [ ] Security best practices followed
- [ ] Imports are organized
- [ ] File/folder structure is logical

---

## Final Principles

1. **Readability First**: Code is read 10x more than it's written
2. **Keep It Simple**: Simple code is easier to maintain and debug
3. **Consistency Matters**: Follow project conventions over personal preference
4. **Boy Scout Rule**: Leave code better than you found it
5. **Ask Why**: Always understand the purpose before coding

When in doubt, prioritize **clarity over cleverness**.