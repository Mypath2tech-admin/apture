import bcrypt from "bcryptjs"
import { customAlphabet } from "nanoid"

// Generate a secure random password
export const generateSecurePassword = (length = 12): string => {
  // Define character sets
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()-_=+"

  // Combine all character sets
  const allChars = lowercase + uppercase + numbers + symbols

  // Create nanoid generator with all characters
  const nanoid = customAlphabet(allChars, length)

  // Generate password
  let password = nanoid()

  // Ensure password has at least one character from each set
  if (!/[a-z]/.test(password)) password = replaceRandomChar(password, lowercase)
  if (!/[A-Z]/.test(password)) password = replaceRandomChar(password, uppercase)
  if (!/[0-9]/.test(password)) password = replaceRandomChar(password, numbers)
  if (!/[!@#$%^&*()-_=+]/.test(password)) password = replaceRandomChar(password, symbols)

  return password
}

// Helper function to replace a random character in the password
const replaceRandomChar = (password: string, charSet: string): string => {
  const position = Math.floor(Math.random() * password.length)
  const randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length))
  return password.substring(0, position) + randomChar + password.substring(position + 1)
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}
