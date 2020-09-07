import * as React from 'react'

// import Header from 'components/Header'
import Container from 'components/Container'

import style from './layout.module.css'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={style.page}>
      {/* <Header /> */}
      <header>
        <Container>This is the Header</Container>
      </header>
      <main className={style.main}>
        <Container className={style.container}>{children}</Container>
      </main>
      <Container>
        <footer className={style.footer}>
          <div>
            Built with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            and{' '}
            <span role="img" aria-label="coffee">
              ☕️
            </span>{' '}
          </div>
        </footer>
      </Container>
    </div>
  )
}
