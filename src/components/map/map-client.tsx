'use client'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

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

export default function MapClient({ markers = [] }: Props) {
  return (
    <MapContainer
      center={[65, 15]}
      zoom={5}
      className="w-full h-full rounded-lg"
      minZoom={4}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
        attribution="© OpenStreetMap © CartoDB"
      />
      {markers.map((m, i) => (
        <CircleMarker
          key={i}
          center={[m.lat, m.lng]}
          radius={8}
          pathOptions={{
            color: m.color ?? '#dc2626',
            fillColor: m.color ?? '#dc2626',
            fillOpacity: 0.8,
          }}
        >
          <Popup>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxWidth: '220px',
              }}
            >
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
              <span style={{ fontSize: '11px', color: '#6b7280' }}>
                {m.municipality}
                {m.area ? `, ${m.area}` : ''}
              </span>
              <p
                style={{
                  fontSize: '12px',
                  margin: 0,
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
                <a
                  href={`/?thread=${m.threadId}`}
                  style={{
                    fontSize: '11px',
                    color: m.color,
                    textDecoration: 'none',
                    fontWeight: 600,
                    marginTop: '4px',
                    display: 'inline-block',
                  }}
                >
                  Se sak →
                </a>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
