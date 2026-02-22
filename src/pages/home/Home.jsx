import Hero from './hero/Hero'
import Bannar from './banner/Bannar'
import ProductSlider from './products slider/ProductSlider'

export default function Home() {
  return (
    <div>
      <Hero/>
      <ProductSlider/>
      <Bannar />
    </div>
  )
}
