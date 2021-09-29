import React from 'react'

export default function Footer() {
  return (
    <div
      style={{ padding: 5 }}
    >
      <span style={{ fontSize: "small", color: "#ACACAC", fontFamily: "NunitoSans-Regular", fontWeight: 500 }}>
        <span>&#169;</span> {new Date().getFullYear()} SonicData Ltd. All rights reserved.
      </span><br />
      <span style={{ fontSize: "small", color: "#757575", fontFamily: "NunitoSans-Regular", fontWeight: "bold" }}>
        SonicKey<sup>TM</sup>, Returning value to the artist and rights holder.
      </span>
    </div>
  )
}
