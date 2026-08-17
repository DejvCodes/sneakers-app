import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import type {Sneaker} from '../types/types';
import {Link, useParams} from 'react-router-dom';
import sneakers from '../data/sneakers-app-data';
import formatPrice from '../function/formatPrice';

const SneakersDetails = () => {
  const { id } = useParams<string>();
  const [oneSneaker, setOneSneaker] = useState<Sneaker | string>('');

  useEffect(() => {
    try {
      if (!id) {
        alert('No sneaker ID provided');
        return;
      }

      const findSneaker: Sneaker | undefined = sneakers.find((sneaker) => {
        return sneaker.id === parseInt(id);
      })

      setOneSneaker(findSneaker || '');

    } catch (err) {
      console.error('Error fetching sneaker details:', err);
    }
  }, [id]);

  // Destructuring
  const { name, brand, type, price, image, images, season, info, sneakerCode, styleColor } = oneSneaker as Sneaker;

  return <section className='flex items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12'>
    <div className='container'>
      {name ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to='/' className='link inline-block mb-6'>
            <span className='mr-1.5'>&larr;</span>
            Back
          </Link>

          <div
            className='w-full flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 rounded-3xl border-2'
            style={{
              borderColor: styleColor,
              boxShadow: `0 0 40px ${styleColor}70, inset 0 0 10px ${styleColor}20`
            }}
          >
            <div className='w-full h-full flex-1 flex flex-col gap-4 sm:gap-5'>
              <img
                src={image}
                alt={name}
                className='w-img-detail-w h-full object-cover rounded-2xl'
              />
              <div className='md:w-max h-16 flex justify-between gap-4 sm:gap-4 flex-wrap'>
                {images && images.map((img, index) => {
                  return <motion.img
                    key={index}
                    src={img}
                    alt={`${name} - ${index + 1}`}
                    className='w-18 h-16 sm:w-20 sm:h-20 lg:w-35 lg:h-24 object-cover rounded-lg sm:rounded-xl transition-transform hover:scale-110 border border-white/20'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  />
                })}
              </div>
            </div>

            <div className='flex-1 flex flex-col gap-4 sm:gap-4'>
              <div>
                <p
                  className='text-2xl font-semibold tracking-[2px] leading-[0.7em] mb-6 reflect-below'
                  style={{ color: styleColor }}
                >
                  {brand}
                </p>
                <h1
                  className='text-2xl sm:text-3xl lg:text-4xl font-bold mt-1 sm:mt-2'
                >
                  {name}
                </h1>
              </div>
              <div
                className='text-2xl sm:text-3xl font-medium'
                style={{ color: styleColor }}
              >
                {formatPrice(price)}
              </div>

              <div className='flex flex-col gap-2 sm:gap-3 py-4 border-t border-b border-white/20'>
                <div className='flex justify-between text-sm sm:text-base'>
                  <span className='opacity-60'>Type:</span>
                  <span className='font-medium text-right'>{type}</span>
                </div>
                <div className='flex justify-between text-sm sm:text-base'>
                  <span className='opacity-60'>Code:</span>
                  <span className='font-medium text-right'>{sneakerCode}</span>
                </div>
                <div className='flex justify-between text-sm sm:text-base'>
                  <span className='opacity-60'>Style:</span>
                  <span className='font-medium text-right'>{styleColor}</span>
                </div>
                <div className='flex justify-between text-sm sm:text-base'>
                  <span className='opacity-60'>Season:</span>
                  <span className='font-medium text-right'>{season.join(', ')}</span>
                </div>
              </div>

              <div>
                <h3 className='text-base sm:text-lg font-semibold mb-2'>Description</h3>
                <p className='opacity-80 leading-relaxed text-sm sm:text-base'>{info}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className='no-results'>Sneaker not found.</p>
      )}
    </div>
  </section>
};

export default SneakersDetails;
