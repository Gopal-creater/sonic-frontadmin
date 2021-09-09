import React from 'react'

export default function Footer() {
  return (
    <div
      style={{ padding: 5 }}
    >
      <p style={{ fontSize: "small", color: "#ACACAC" }} >
        <span>&#169;</span> {new Date().getFullYear()} SonicData Ltd. All rights reserved.
      </p>
    </div>
  )
}
