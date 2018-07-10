// Import React
import React from "react"

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Link,
  Layout,
  Notes,
  Fill,
  Quote,
  Slide,
  Text,
} from "spectacle"

import CodeSlide from "spectacle-code-slide"

// Import theme
import createTheme from "spectacle/lib/themes/default"

// Require CSS
require("normalize.css")

const colors = {
  primary: "#FAFAFA",
  secondary: "#1F2022",
  tertiary: "#FFBF00",
  quarternary: "#CECECE",
}

const theme = createTheme(colors, {
  primary: "Montserrat",
  secondary: "Helvetica",
})

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={["zoom", "slide"]}
        transitionDuration={500}
        theme={theme}
        contentWidth={1200}
        contentHeight={900}
      >
        {/* Title slide */}
        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Presentation Title
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Maxim Schepelin, Where, When
          </Text>
        </Slide>

        {/* Main slide. Copy it to have more */}
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Put the notes here</p>
          </Notes>
          <Heading size={3} textColor="primary">Main slide</Heading>
        </Slide>

        {/* last slide of a presentation */}
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="primary">
            Questions?
          </Heading>
          <Text textColor="tertiary">
            Maxim Schepelin
          </Text>
          <Text textColor="tertiary">
            m.schepelin@gmail.com
          </Text>
        </Slide>
      </Deck>
    )
  }
}
