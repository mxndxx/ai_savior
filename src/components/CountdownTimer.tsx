'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const targetDate = new Date()
      targetDate.setDate(targetDate.getDate() + 1)
      targetDate.setHours(0, 0, 0, 0)

      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        return { hours: 0, minutes: 0, seconds: 0 }
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      return { hours, minutes, seconds }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="text-center mb-8">
        <p className="text-gray-400 mb-4">무료 시크릿 특강 신청 마감까지</p>
        <div className="flex justify-center items-center gap-4 text-4xl font-bold">
          <div className="bg-gray-900 rounded-lg p-4 min-w-[80px] transition-all hover:bg-gray-800">
            <span className="text-blue-500 animate-pulse-slow">--</span>
            <p className="text-sm text-gray-400 mt-1">시간</p>
          </div>
          <span className="text-2xl animate-pulse-slow">:</span>
          <div className="bg-gray-900 rounded-lg p-4 min-w-[80px] transition-all hover:bg-gray-800">
            <span className="text-blue-500 animate-pulse-slow">--</span>
            <p className="text-sm text-gray-400 mt-1">분</p>
          </div>
          <span className="text-2xl animate-pulse-slow">:</span>
          <div className="bg-gray-900 rounded-lg p-4 min-w-[80px] transition-all hover:bg-gray-800">
            <span className="text-blue-500 animate-pulse-slow">--</span>
            <p className="text-sm text-gray-400 mt-1">초</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center mb-8">
      <p className="text-gray-400 mb-4">무료 시크릿 특강 신청 마감까지</p>
      <div className="flex justify-center items-center gap-4 text-4xl font-bold">
        <div className="bg-gray-900 rounded-lg p-4 min-w-[80px] transition-all hover:bg-gray-800">
          <span className="text-blue-500 animate-pulse-slow">{String(timeLeft.hours).padStart(2, '0')}</span>
          <p className="text-sm text-gray-400 mt-1">시간</p>
        </div>
        <span className="text-2xl animate-pulse-slow">:</span>
        <div className="bg-gray-900 rounded-lg p-4 min-w-[80px] transition-all hover:bg-gray-800">
          <span className="text-blue-500 animate-pulse-slow">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <p className="text-sm text-gray-400 mt-1">분</p>
        </div>
        <span className="text-2xl animate-pulse-slow">:</span>
        <div className="bg-gray-900 rounded-lg p-4 min-w-[80px] transition-all hover:bg-gray-800">
          <span className="text-blue-500 animate-pulse-slow">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <p className="text-sm text-gray-400 mt-1">초</p>
        </div>
      </div>
    </div>
  )
}