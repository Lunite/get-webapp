import React from "react"

import { Slider, Slide, Dot, DotGroup, WithStore } from "pure-react-carousel"

class Carousel extends React.Component<{ items }, { currentSlide }> {
  render() {
    return (
      <>
        {/* This hidden element ensures the carousel is the correct height */}
        <div
          style={{
            opacity: 0,
            pointerEvents: "none",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {this.props.items.map(({ node }) => node)}
        </div>
        <div className="case-studies-map__carousel">
          <Slider>
            {this.props.items.map(({ node, index }) => (
              <Slide index={index}>{node}</Slide>
            ))}
          </Slider>
          <DotGroup>
            {this.props.items.map(({ index }) => (
              <Dot slide={index}>
                <div
                  className={`carousel__dot ${
                    this.state?.currentSlide === index ? "dot--current" : ""
                  }`}
                />
              </Dot>
            ))}
          </DotGroup>
        </div>
      </>
    )
  }
}

export default WithStore(Carousel)
