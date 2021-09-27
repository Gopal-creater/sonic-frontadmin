import React from 'react'

export default function Footer() {
  return (
    <div
      style={{ padding: 5 }}
    >
      <span style={{ fontSize: "small", color: "#ACACAC", fontFamily: "NanutoSans-Bold", fontWeight: "medium" }}>
        <span>&#169;</span> {new Date().getFullYear()} SonicData Ltd. All rights reserved.
      </span><br />
      <span style={{ fontSize: "medium", color: "#757575", fontFamily: "NanutoSans-Black", fontWeight: "bolder", fontSize: "1" }}>
        SonicKey<sup>TM</sup>, Returning value to the artist and rights holder.
      </span>
    </div>
  )
}
