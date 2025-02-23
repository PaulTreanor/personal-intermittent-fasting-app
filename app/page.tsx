"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STORAGE_KEY = "fastingSchedule"

type Schedule = {
  startTime: string
  endTime: string
}

function getTimeRemaining(targetTime: string): number {
  const now = new Date()
  const target = new Date(now.toDateString() + " " + targetTime)
  if (target < now) {
    target.setDate(target.getDate() + 1)
  }
  return target.getTime() - now.getTime()
}

export default function FastingApp() {
  const [schedule, setSchedule] = useState<Schedule>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : { startTime: "12:00", endTime: "20:00" }
    }
    return { startTime: "12:00", endTime: "20:00" }
  })
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isFasting, setIsFasting] = useState<boolean>(true)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
  }, [schedule])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const currentTime = now.toTimeString().slice(0, 5)
      const newIsFasting = currentTime < schedule.startTime || currentTime >= schedule.endTime
      setIsFasting(newIsFasting)

      const targetTime = newIsFasting ? schedule.startTime : schedule.endTime
      setTimeRemaining(getTimeRemaining(targetTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [schedule])

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    const hours = Math.floor((ms / 1000 / 3600) % 24)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Fasting Timer</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Eating Window Start</label>
          <Input
            type="time"
            value={schedule.startTime}
            onChange={(e) => setSchedule((prev) => ({ ...prev, startTime: e.target.value }))}
            className="w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Eating Window End</label>
          <Input
            type="time"
            value={schedule.endTime}
            onChange={(e) => setSchedule((prev) => ({ ...prev, endTime: e.target.value }))}
            className="w-full"
          />
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">{formatTime(timeRemaining)}</div>
          <div className="text-lg font-medium mb-4">{isFasting ? "Time until eating" : "Time until fasting"}</div>
          <Button
            onClick={() => {
              const now = new Date()
              const currentTime = now.toTimeString().slice(0, 5)
              setSchedule({ startTime: currentTime, endTime: currentTime })
            }}
            className="w-full"
          >
            Reset to Now
          </Button>
        </div>
      </div>
    </div>
  )
}

