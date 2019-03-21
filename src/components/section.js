import React from 'react'

const Section = (props) => {
  return (
    <section className={props.className}>
      <h1>{props.title}</h1>
      {props.children}
    </section>
  )
}

export default Section