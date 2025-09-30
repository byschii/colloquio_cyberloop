"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { atom, useAtom } from "jotai"

// Jotai state
const countAtom = atom(0)
const nameAtom = atom("")

export default function Home() {
  const [count, setCount] = useAtom(countAtom)
  const [name, setName] = useAtom(nameAtom)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Turborepo + shadcn/ui + Jotai</CardTitle>
          <CardDescription>
            A modern monorepo setup with state management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Counter Example</h3>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount((c) => c - 1)}>-</Button>
              <span className="text-2xl font-bold">{count}</span>
              <Button onClick={() => setCount((c) => c + 1)}>+</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Input Example</h3>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name && (
              <p className="text-sm text-muted-foreground">
                Hello, {name}!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}