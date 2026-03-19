'use client'

import { useEffect, useState } from 'react'

interface FacebookEmbedProps {
  pageUrl: string
}

declare global {
  interface Window {
    FB?: {
      init: (params: { xfbml: boolean; version: string }) => void
      XFBML: {
        parse: (element?: HTMLElement) => void
      }
    }
    fbAsyncInit?: () => void
  }
}

export default function FacebookEmbed({ pageUrl }: FacebookEmbedProps) {
  const [sdkStatus, setSdkStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  )

  useEffect(() => {
    if (!pageUrl) return

    let timeoutId: ReturnType<typeof setTimeout>

    const loadSdk = () => {
      // If SDK is already loaded, just init and parse
      if (window.FB) {
        setSdkStatus('ready')
        window.FB.XFBML.parse()
        return
      }

      // Set up the async init callback
      window.fbAsyncInit = () => {
        window.FB!.init({
          xfbml: true,
          version: 'v19.0',
        })
        clearTimeout(timeoutId)
        setSdkStatus('ready')
      }

      // Inject the SDK script if not already present
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script')
        script.id = 'facebook-jssdk'
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.async = true
        script.defer = true
        script.onerror = () => {
          clearTimeout(timeoutId)
          setSdkStatus('error')
        }
        document.body.appendChild(script)
      }

      // 10-second timeout for SDK load failure
      timeoutId = setTimeout(() => {
        setSdkStatus((current) => (current === 'loading' ? 'error' : current))
      }, 10000)
    }

    loadSdk()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [pageUrl])

  // Config error: pageUrl is empty or undefined
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

  return (
    <div>
      {/* Loading indicator */}
      {sdkStatus === 'loading' && (
        <div
          role="status"
          style={{ padding: '1rem', textAlign: 'center', color: '#555' }}
        >
          <p>Loading Facebook feed…</p>
        </div>
      )}

      {/* Error state */}
      {sdkStatus === 'error' && (
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
          <p>The Facebook feed is temporarily unavailable.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href={pageUrl} target="_blank" rel="noopener noreferrer">
              Visit the Facebook page directly
            </a>
          </p>
        </div>
      )}

      {/* Facebook Page Plugin markup */}
      <div
        className="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-width="500"
        data-height="800"
        data-small-header="true"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="false"
      >
        <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
          <a href={pageUrl}>Facebook Page</a>
        </blockquote>
      </div>
    </div>
  )
}
