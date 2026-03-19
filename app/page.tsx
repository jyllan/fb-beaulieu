import FacebookEmbed from './components/FacebookEmbed'

export default function Home() {
  const pageUrl = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || ''

  return (
    <main className="container">
      <FacebookEmbed pageUrl={pageUrl} />
    </main>
  )
}
