'use client'

import { useState } from 'react'

interface FacebookEmbedProps {
  pageUrl: string
}

export default function FacebookEmbed({ pageUrl }: FacebookEmbedProps) {
  const [iframeStatus, setIframeStatus] = useState<
    'loading' | 'ready' | 'error'
  >('loading')

  if (!pageUrl) {
    return (
      <div
        role="alert"
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#842029',
          backgroundColor: '#f8d7da',
          borderRadius: '8px',
        }}
      >
        <p>
          <strong>Configuration Error:</strong> No Facebook page URL has been
          configured.
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
          Please set the <code>NEXT_PUBLIC_FACEBOOK_PAGE_URL</code> environment
          variable.
        </p>
      </div>
    )
  }

  const encodedUrl = encodeURIComponent(pageUrl)
  const iframeSrc = `https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=timeline&width=500&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&locale=fr_FR`

  return (
    <div>
      {iframeStatus === 'loading' && (
        <div
          role="status"
          style={{ padding: '1rem', textAlign: 'center', color: '#555' }}
        >
          <p>Chargement du fil Facebook…</p>
        </div>
      )}

      {iframeStatus === 'error' && (
        <div
          role="alert"
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#842029',
            backgroundColor: '#f8d7da',
            borderRadius: '8px',
          }}
        >
          <p>Le fil Facebook est temporairement indisponible.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href={pageUrl} target="_blank" rel="noopener noreferrer">
              Visiter la page Facebook directement
            </a>
          </p>
        </div>
      )}

      <iframe
        src={iframeSrc}
        width="500"
        height="800"
        style={{
          border: 'none',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '500px',
          display: iframeStatus === 'ready' ? 'block' : 'none',
          margin: '0 auto',
        }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        onLoad={() => setIframeStatus('ready')}
        onError={() => setIframeStatus('error')}
        title="Facebook Page Timeline"
      />

      {/* Fallback link for when iframe is blocked */}
      <noscript>
        <a href={pageUrl} target="_blank" rel="noopener noreferrer">
          Visiter la page Facebook
        </a>
      </noscript>
    </div>
  )
}
