import React, { FormEvent } from "react"
import Block from "../Block"
import "./styles.scss"
import Heading from "../Heading"
import BlockCTA from "../BlockCTA"

interface QuestionPageProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  buttonText: string
  onSubmit: (e: FormEvent) => void
  // pageNumber: number
}

const QuestionPage: React.FC<QuestionPageProps> = (
  props: QuestionPageProps
) => {
  return (
    <div className="qp-root">
      <Block>
        <Heading level={2}>{props.title}</Heading>
        {props.subtitle ? <Heading level={5}>{props.subtitle}</Heading> : null}
        <form
          className="form form--full-width"
          onSubmit={e => {
            e.preventDefault()
            props.onSubmit(e)
          }}
          name="quote"
        >
          {props.children}
          <div className="form__actions">
            <BlockCTA submit large>
              {props.buttonText}
            </BlockCTA>
          </div>
        </form>
      </Block>
    </div>
  )
}

export default QuestionPage
