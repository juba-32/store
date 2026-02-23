import Hero from './hero/Hero'
import Bannar from './banner/Bannar'
import ProductSlider from './products slider/ProductSlider'
import PromoBanner from './prompBanner/PromoBanner'
import Reviews from './reviews/Reviews'

export default function Home() {
  return (
    <div>
      <Hero/>
      <PromoBanner/>
      <Bannar />
      <ProductSlider/>
      <Reviews/>
    </div>
  )
}
