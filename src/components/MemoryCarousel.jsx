import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// Import user images and video
import img1 from '../assets/moment1.jpg'
import img2 from '../assets/moment2.jpg'
import vid1 from '../assets/moment3.mp4'

const moments = [
  {
    type: 'image',
    src: img1,
    caption: 'One of my favorite shots of you! 😍✨',
  },
  {
    type: 'image',
    src: img2,
    caption: 'Looking absolutely stunning... as always. 💖',
  },
  {
    type: 'video',
    src: vid1,
    caption: 'Every second with you is a dream. 🎥💕',
  },
]

function MemoryCarousel() {
  return (
    <div className="carousel-wrapper glass">
      <h2>Your Top Moments</h2>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        spaceBetween={16}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        style={{ paddingBottom: '30px' }}
      >
        {moments.map((m, i) => (
          <SwiperSlide key={i}>
            <div className="carousel-slide-content">
              {m.type === 'video' ? (
                <video
                  src={m.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="carousel-video"
                />
              ) : (
                <img src={m.src} alt={m.caption} loading="lazy" />
              )}
              <p className="carousel-caption">
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
