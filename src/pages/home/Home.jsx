import Hero from './hero/Hero'
import Bannar from './banner/Bannar'
import ProductSlider from './products slider/ProductSlider'
import Sale from './sale/Sale'
import Reviews from './reviews/Reviews'

export default function Home() {
  return (
    <div>
      <Hero/>
      <Sale/>
      <Bannar />
      <ProductSlider/>
      <Reviews/>
    </div>
  )
}
