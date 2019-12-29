import React from 'react'

export default function Appointment({customer:{firstName}}) {
  return (
    <div>
      {firstName}
    </div>
  )
}
