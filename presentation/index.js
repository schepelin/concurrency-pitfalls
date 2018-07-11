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
  raceCondition: require("raw-loader!../assets/code/race_condition.go"),
  raceConditionSleep: require("raw-loader!../assets/code/race_condition_sleep.go"),
  dataRace: require("raw-loader!../assets/code/data_race.go"),
  deadlock: require("raw-loader!../assets/code/deadlock.go"),
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
            BTW Why do we have data races?
            ----</br>
            Critical section & atomicy
          `}
          ranges={[
            { loc: [5, 12], note: "Non determenistic behavior" },
            { loc: [5, 6], note: "Declare variable" },
            { loc: [6, 9], note: "Modify it in the goroutine" },
            { loc: [9, 12], note: "Read the variable and print the value" },
            { loc: [7, 8], note: "Critical section. Needs exclusive access to the variable" },
            { loc: [9, 11], note: "Critical section. Requires exclusive read access" },
          ]}
        />

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>The term critical section is tightly coupled with the concept of atomicy</p>
            <p>mount</p>
          </Notes>
          <Heading size={3} textColor="primary">i++</Heading>
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
              Two or more operations must be executed in the correct order.<br/>
              But, the code doesn't guarantee that.
            </Quote>
          </BlockQuote>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          color={colors.primary}
          transition={["fade"]}
          lang="clike"
          code={code.raceCondition}
          notes={`

          `}
          ranges={[
            { loc: [9, 13], note: "Account struct" },
            { loc: [21, 22], note: "Earn method" },
            { loc: [23, 25], note: "Simulate latency" },
            { loc: [26, 29], note: "Exclusivelly update balance" },

            { loc: [31, 32], note: "Spend method" },
            { loc: [33, 35], note: "Simulate latency" },
            { loc: [36, 41], note: "Exclusivelly update balance" },

            { loc: [44, 45], note: "Create account" },
            { loc: [47, 49], note: "Run Earcn and Spend. There is no data race" },
            { loc: [52, 53], note: "Non determenistic behavior. Might be 20 or 150" },
          ]}
        />

        <CodeSlide
          bgColor="secondary"
          color={colors.primary}
          transition={["fade"]}
          lang="clike"
          code={code.raceConditionSleep}
          notes={`

          `}
          ranges={[
            { loc: [45, 47], note: "Sleep doesn't fix the race condition. It just decreases its probability" },
          ]}
        />

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary" padding="0 0 20px 0">The difference</Heading>
          <Text textColor="primary" fit bold >
            Data race – memory inconsistentcy<br/>
            Race condition – incorrect execution order
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Threads are blocking each other so that program can't be continued</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Deadlock</Heading>
          <Text textColor="primary">
            As bad as it sounds
          </Text>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          color={colors.primary}
          transition={["fade"]}
          lang="clike"
          code={code.deadlock}
          notes={`

          `}
          ranges={[
            { loc: [7, 11], note: "Same Account struct" },
            { loc: [19, 32], note: "Money transfer method" },
            { loc: [20, 25], note: "Lock first account to eliminate data race" },
            { loc: [26, 29], note: "Lock second account to eliminate data race" },
            { loc: [30, 31], note: "First account critical section is too long" },

            { loc: [34, 36], note: "Initialzie two accounts" },
            { loc: [37, 39], note: "Define a wait group" },
            { loc: [40, 44], note: "Alice transfers money to Bob" },
            { loc: [45, 49], note: "And, Bob transfers money to Alice at the same time" },
          ]}
        />

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>A concurrent process holds exclusive rights to a resource at any one time.</p>
            <p>A concurrent process must simultaneously hold a resource and be waiting for an additional resource.</p>
            <p>A resource held by a concurrent process can only be released by that process</p>
            <p>A concurrent process (P1) must be waiting on a chain of other concurrent processes (P2), which are in turn waiting on it (P1)</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Coffman's conditions</Heading>
          <BlockQuote>
            <Text textColor="primary" padding="0 0 7px 0">Mutual Exclusion Condition</Text>
            <Text textColor="primary" padding="0 0 7px 0">Hold and Wait Condition</Text>
            <Text textColor="primary" padding="0 0 7px 0">No-Preemptive Condition</Text>
            <Text textColor="primary" padding="0 0 7px 0">Circular Wait Condition</Text>
          </BlockQuote>
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
