import MapClient from '@/components/map'
import Section from '@/components/wrappers/section'

export default function Page() {
  return (
    <Section>
      <div className="w-[10rem] h-[10rem]">
        <MapClient />
      </div>
    </Section>
  )
}
