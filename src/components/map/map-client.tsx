'use client'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useThreadParams } from '@/hooks/use-thread-params'
import { useRef } from 'react'
import type { Popup as LeafletPopup } from 'leaflet'

type Marker = {
  lat: number
  lng: number
  label: string
  municipality: string
  type: string
  area: string
  color?: string
  threadId?: string
}

type Props = {
  markers?: Marker[]
}

function MarkerWithPopup({
  m,
  setThread,
}: {
  m: Marker
  setThread: (id: string) => void
}) {
  const popupRef = useRef<LeafletPopup>(null)

  const handleReadThread = () => {
    popupRef.current?.close()
    setThread(m.threadId ?? '')
  }

  return (
    <CircleMarker
      center={[m.lat, m.lng]}
      radius={8}
      pathOptions={{
        color: m.color ?? '#dc2626',
        fillColor: m.color ?? '#dc2626',
        fillOpacity: 0.8,
      }}
    >
      <Popup ref={popupRef} closeButton={false}>
        <div style={{ minWidth: '200px' }}>
          <span
            style={{
              color: m.color,
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {m.type}
          </span>
          <p
            style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0 6px' }}
          >
            {m.municipality}
            {m.area ? `, ${m.area}` : ''}
          </p>
          <p
            style={{
              fontSize: '12px',
              margin: '0 0 8px',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {m.label}
          </p>
          {m.threadId && (
            <button
              onClick={handleReadThread}
              style={{
                fontSize: '11px',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Les saken →
            </button>
          )}
        </div>
      </Popup>
    </CircleMarker>
  )
}

export default function MapClient({ markers = [] }: Props) {
  const { setThread } = useThreadParams()

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[65, 15]}
        zoom={5}
        className="w-full h-full"
        minZoom={4}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap © CartoDB"
        />
        {markers.map((m, i) => (
          <MarkerWithPopup key={i} m={m} setThread={setThread} />
        ))}
      </MapContainer>
    </div>
  )
}
