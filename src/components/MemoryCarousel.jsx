import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const moments = [
  {
    src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop',
    caption: 'Our first adventure together 🌅',
  },
  {
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=400&fit=crop',
    caption: 'That magical evening ✨',
  },
  {
    src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop',
    caption: 'When we laughed till we cried 😂',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    caption: 'Our favorite place 🏖️',
  },
  {
    src: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&h=400&fit=crop',
    caption: 'The moment I knew 💕',
  },
]

function MemoryCarousel() {
  return (
    <div className="carousel-wrapper glass">
      <h2>Our Top 5 Moments</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2, spaceBetween: 20 },
          1200: { slidesPerView: 3, spaceBetween: 24 },
        }}
        style={{ paddingBottom: '40px' }}
      >
        {moments.map((m, i) => (
          <SwiperSlide key={i}>
            <div style={{ textAlign: 'center' }}>
              <img src={m.src} alt={m.caption} loading="lazy" />
              <p style={{
                marginTop: '10px',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.85)',
                fontStyle: 'italic',
              }}>
                {m.caption}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MemoryCarousel
