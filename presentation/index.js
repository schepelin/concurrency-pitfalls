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
  livelock: require("raw-loader!../assets/code/livelock.go"),
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
          <Notes>
            <p>To build good software you should be really hands-onn with a bad one</p>
            <p>And be able to separate these two categories</p>
          </Notes>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Concurrency Pitfalls
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            Maxim Schepelin, Gett RnD, 2018
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>We start from the most popular pitfall – a data race</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Data race</Heading>
          <Text textColor="primary">Concurrent access to a memory address</Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary">Practical definition</Heading>
          <BlockQuote>
            <Quote>
              Two or more threads access the memory address and at least one of them does a write-operation
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
            { loc: [5, 12], note: "Non deterministic behavior" },
            { loc: [5, 6], note: "Declare variable" },
            { loc: [6, 9], note: "Modify it in the goroutine" },
            { loc: [9, 12], note: "Read the variable and print the value" },
            { loc: [7, 8], note: "Critical section. Needs exclusive access to the variable" },
            { loc: [9, 11], note: "Critical section. Requires exclusive read access" },
          ]}
        />

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Critcal section – a block of code with exlusive access to a variable</p>
            <p>A Critical Section term is tightly coupled with the concept of atomicy</p>
            <p>Example: mount</p>
          </Notes>
          <Heading size={3} textColor="primary">i++</Heading>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Put the notes here</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Race condition</Heading>
          <Text textColor="primary">
            Presumptive threads execution order
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary">Practical definition</Heading>
          <BlockQuote>
            <Quote>
              Two or more operations must be completed in a particular order to be done correctly.<br/>
              But, a code doesn't guarantee that.
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
            { loc: [23, 25], note: "Simulate low latency" },
            { loc: [26, 29], note: "Exclusively update balance" },

            { loc: [31, 32], note: "Spend method" },
            { loc: [33, 35], note: "It takes much longer that Earn" },
            { loc: [36, 41], note: "Exclusively update balance" },

            { loc: [44, 45], note: "Create account" },
            { loc: [47, 49], note: "Run Earn and Spend. Most of the time it works" },
            { loc: [52, 53], note: "But, the behavior is non-deterministic. Might be 20 or 150" },
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
            { loc: [30, 31], note: "First account's critical section is too long" },

            { loc: [34, 36], note: "Initialize two accounts" },
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
            <Text textColor="primary" padding="0 0 7px 0" bold >Mutual Exclusion Condition</Text>
            <Text textColor="primary" padding="0 0 7px 0" bold>Hold and Wait Condition</Text>
            <Text textColor="primary" padding="0 0 7px 0" bold>No-Preemptive Condition</Text>
            <Text textColor="primary" padding="0 0 7px 0" bold>Circular Wait Condition</Text>
          </BlockQuote>

          <br/>
          <br/>
          <br/>
          <br/>
          <Text textAlign="right">
            <Link
              href="https://people.cs.umass.edu/~mcorner/courses/691J/papers/TS/coffman_deadlocks/coffman_deadlocks.pdf"
              textColor="tertiary"
            >
              *Original Paper: System Deadlocks, 1971
            </Link>
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Notes>
            <p>Deadlock leads to complete stop of program execution.</p>
            <p>In case of livelock a programm continues execution, but don't make any progress</p>
          </Notes>
          <Heading size={3} textColor="tertiary">Livelock</Heading>
          <Text textColor="primary">
            Meet someone in a hallway
          </Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <Heading size={3} textColor="tertiary">Practical definition</Heading>
          <BlockQuote>
            <Quote>
            The states of the processes involved in a livelock constantly change with regard to one another, none progressing.
            </Quote>
          </BlockQuote>
        </Slide>

        <CodeSlide
          bgColor="secondary"
          color={colors.primary}
          transition={["fade"]}
          lang="clike"
          code={code.livelock}
          notes={`

          `}
          ranges={[
            { loc: [10, 14], note: "Define an Eater struct" },
            { loc: [22, 47], note: "EatWith method" },
            { loc: [23, 24], note: "Until an Eater is hungry" },
            { loc: [24, 28], note: "Wait if spoon is used by the second one" },
            { loc: [29, 37], note: "An Eater is so polite. He always gives a favor for the second one" },
            { loc: [38, 45], note: "Use the spoon if the second has already eaten" },

            { loc: [73, 76], note: "Initialize two eaters and the spoon" },
            { loc: [77, 79], note: "Declare a wait group" },
            { loc: [80, 84], note: "Run Bob" },
            { loc: [85, 89], note: "Run Alice" },
            { loc: [89, 90], note: "Wait for result (hope, it will finish some-time)" },
          ]}
        />

        {/* last slide of the presentation */}
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
