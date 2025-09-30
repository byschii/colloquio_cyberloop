import { z } from 'zod';

// Basic schema examples
const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();

// Object schema
const userSchema = z.object({
  name: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean().optional(),
});

// Array schema
const numbersSchema = z.array(z.number());

// Enum schema
const statusSchema = z.enum(['active', 'inactive', 'pending']);

// Union schema
const idSchema = z.union([z.string(), z.number()]);

// Test valid data
console.log('=== Testing Valid Data ===\n');

try {
  const validUser = userSchema.parse({
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    isActive: true,
  });
  console.log('✓ Valid user:', validUser);
} catch (error) {
  console.error('✗ Error:', error);
}

try {
  const validNumbers = numbersSchema.parse([1, 2, 3, 4, 5]);
  console.log('✓ Valid numbers:', validNumbers);
} catch (error) {
  console.error('✗ Error:', error);
}

try {
  const validStatus = statusSchema.parse('active');
  console.log('✓ Valid status:', validStatus);
} catch (error) {
  console.error('✗ Error:', error);
}

// Test invalid data
console.log('\n=== Testing Invalid Data ===\n');

try {
  const invalidUser = userSchema.parse({
    name: 'Jane Doe',
    age: -5, // Invalid: negative age
    email: 'not-an-email',
  });
  console.log('✓ Invalid user passed (unexpected):', invalidUser);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log('✗ Validation failed (expected):');
    error.issues.forEach((issue) => {
      console.log(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
  }
}

// Type inference
type User = z.infer<typeof userSchema>;
const exampleUser: User = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
};
console.log('\n=== Type Inference ===');
console.log('✓ Type-safe user:', exampleUser);

// Safe parse (doesn't throw)
console.log('\n=== Safe Parse ===');
const result = userSchema.safeParse({
  name: 'Bob',
  age: 35,
  email: 'bob@example.com',
});

if (result.success) {
  console.log('✓ Safe parse succeeded:', result.data);
} else {
  console.log('✗ Safe parse failed:', result.error);
}