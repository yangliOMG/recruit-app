/** @jsx jsx */
import React  from 'react'
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'

import Button from './constant'

const style = css`
  color: hotpink;
`
// styled.Button`
//   color: hotpink;
// `

const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'sans-serif',
      color: 'black'
    }}
    {...props}
  />
)
const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props}
  />
)
const SmallArticleText = props => (
  <ArticleText
    css={{
      fontSize: 10
    }}
    {...props}
  />
)

const Section = styled.section`
  background: #333;
`
const Aside = Section.withComponent('aside')  //复制

const Child = styled.div`
  color: red;
`
const Parent = styled.div`
    color:red;
  ${Child} {
    color: green;
  }
`

const Buttons = styled.button`
  color: hotpink;
`

const Header = styled.div`
  color: ${({ isActive }) => isActive ? 'green' : 'red'};
`
const MyComp = ({ isActive }) => (
  <Header isActive={isActive}>HI</Header>
)

function Counter() {
  return (
    <React.Fragment>
        <div css={style}>asdfasdfasdf</div>
        <Button>0000</Button>

        <SmallArticleText>asdasd</SmallArticleText>

        <Section>This is a section</Section>
        <Aside>This is an an aside</Aside>

        <Parent>
          red
          <Child>green</Child>
        </Parent>
        <Child>red</Child>

        <Buttons
          as="a"
          href="https://github.com/emotion-js/emotion"
        >
          Emotion on GitHub
        </Buttons>

        <MyComp isActive={true}></MyComp>
    </React.Fragment>
  );
}

export default Counter

