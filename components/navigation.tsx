"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, BarChart3, Home } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-semibold">怕麻烦人格测试</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                测试
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/results" ? "default" : "ghost"}
              size="sm"
            >
              <Link href="/results" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                查看结果
              </Link>
            </Button>
          </div>
        </nav>
      </CardContent>
    </Card>
  )
}