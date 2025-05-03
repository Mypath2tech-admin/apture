"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  name: string
  id?: string
  required?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DatePickerDemo({
  name,
  id,
  
  value,
  onChange,
}: DatePickerProps) {
  const dateValue = value ? new Date(value) : undefined

  const handleSelect = (selectedDate?: Date) => {
    if (!selectedDate) return
    const syntheticEvent = {
      target: {
        name,
        value: selectedDate.toISOString().split("T")[0], // Format to yyyy-mm-dd
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    onChange(syntheticEvent)
  }

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !dateValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon className={`mr-2 h-4 w-4 ${id}`}/>
          {dateValue ? format(dateValue, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
