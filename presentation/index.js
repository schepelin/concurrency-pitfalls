import { css } from 'emotion'

// Import React
import React from "react"

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Code,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  List,
  ListItem,
  Notes,
  Quote,
  Slide,
  Text,
} from "spectacle"

import CodeSlide from "spectacle-code-slide"

// Import theme
import createTheme from "spectacle/lib/themes/default"
import preloader from "spectacle/lib/utils/preloader"

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
const bodyStyle = css`
  background: ${colors.secondary};
`
document.querySelector("body").classList.add(bodyStyle)

const images = {
}
preloader(images)

const code = {
  dataRace: require("raw-loader!../assets/code/data_race.go"),
}
preloader(code)

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
            Concurrency Pitfalls
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Maxim Schepelin, Gett RnD, 2018
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Put the notes here</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Race condition</Heading>
          <Text textColor="primary">
            Operations execution order
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary">Definition</Heading>
          <BlockQuote>
            <Quote>
              Two or more operations must execute in the correct order.<br/>
              But, the program doesn't guarantee that order
            </Quote>
          </BlockQuote>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Put the notes here</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Data race</Heading>
          <Text textColor="primary">Concurrent access to a memory address</Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary">Definition</Heading>
          <BlockQuote>
            <Quote>
              More than one thread access the memory address and at least one of them is writing
            </Quote>
          </BlockQuote>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          color={colors.primary}
          transition={["fade"]}
          lang="clike"
          code={code.dataRace}
          notes={`

          `}
          ranges={[
            { loc: [5, 12], note: "Non determenistic behavior" },
            { loc: [5, 6], note: "Declare variable" },
            { loc: [6, 9], note: "Modify in the goroutine" },
            { loc: [9, 12], note: "Read variable and print the value" },
            { loc: [7, 8], note: "Critical section. Needs exclusive access to the variable" },
            { loc: [9, 11], note: "Critical section. Requires exclusive read access" },
          ]}
        />

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary">The difference</Heading>
          <Text textColor="primary" fit bold>Data race – memory consistentcy</Text>
          <Text textColor="primary" fit bold>Race condition – logical correctness</Text>
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
