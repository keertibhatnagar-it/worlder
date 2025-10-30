export type User = {
id: string
name: string
email?: string
provider: 'email' | 'google' | 'facebook' | 'apple'
passwordHash?: string // simple storing — demo only
}


const USERS_KEY = 'worlder_users'
const SESSION_KEY = 'worlder_session'


export function readUsers(): User[] {
try {
const raw = localStorage.getItem(USERS_KEY)
return raw ? JSON.parse(raw) : []
} catch { return [] }
}


export function writeUsers(users: User[]) {
localStorage.setItem(USERS_KEY, JSON.stringify(users))
}


export function saveSession(user: User) {
localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}


export function readSession(): User | null {
const raw = localStorage.getItem(SESSION_KEY)
return raw ? JSON.parse(raw) : null
}


export function clearSession() {
localStorage.removeItem(SESSION_KEY)
}


export function addUser(u: User) {
const users = readUsers()
users.push(u)
writeUsers(users)
}


export function findUserByEmail(email: string) {
return readUsers().find(u => u.email === email)
}