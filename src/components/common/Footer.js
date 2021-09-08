import React from 'react'

export default function Footer() {
    return (
        <div
        style={{padding: 5 }}
      >
        <p>
          <span>&#169;</span> {new Date().getFullYear()} - App Copyright Section and footer
        </p>
      </div>
    )
}
