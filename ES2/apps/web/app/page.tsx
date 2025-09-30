"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { atom, useAtom } from "jotai"


// Todo item type
interface TodoItem {
  id: string
  text: string
  completed: boolean
}

// Jotai state
const listNameAtom = atom("TODO LIST")
const todosAtom = atom<TodoItem[]>([
  { id: "1", text: "Esempio di task 1", completed: false },
])
const newItemTextAtom = atom("")

export default function Home() {
  const [listName, setListName] = useAtom(listNameAtom)
  const [todos, setTodos] = useAtom(todosAtom)
  const [newItemText, setNewItemText] = useAtom(newItemTextAtom)

  const addTodo = () => {
    if (newItemText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setNewItemText("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="text-xl font-semibold border-none p-0 h-auto focus-visible:ring-0"
            />
          </CardTitle>
          <CardDescription>
            {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add new item input */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          {/* Todo list */}
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  todo.completed ? "bg-muted text-muted-foreground" : "bg-background"
                }`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleTodo(todo.id)}
                  className={`h-6 w-6 p-0 rounded-full border-2 ${
                    todo.completed 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "border-muted-foreground"
                  }`}
                >
                  {todo.completed && "✓"}
                </Button>
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through" : ""
                  }`}
                >
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTodo(todo.id)}
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  ×
                </Button>
              </div>
            ))}
            {todos.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tasks yet. Add one above!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}