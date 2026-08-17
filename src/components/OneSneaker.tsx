import PropTypes from 'prop-types';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import type {Sneaker} from '../types/types';
import formatPrice from '../function/formatPrice';

const OneSneaker = ({ id, image, brand, fullName, price, styleColor }: Sneaker) => {
  return <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1, duration: 0.4 }}
      className='w-card-w h-card-h rounded-3xl shadow-card hover:shadow-card-hover border border-white transition-all duration-200 ease-linear p-5.5'
    >
      <img
        src={image}
        alt={fullName}
        className='w-full h-img-h object-cover rounded-card mb-2.5'
      />
      <p
        style={{ color: styleColor }}
        className='text-p font-semibold reflect-below leading-3.5 mb-3'
      >
        {brand}
      </p>
      <h3 className='text-h3 font-medium mb-5'>
        {fullName}
      </h3>
      <div className="flex items-end justify-between">
        <p className='text-price'>{formatPrice(price)}</p>
        <Link to={id ? `sneaker/${id}` : '/'} className='link hover:scale-105'>Info</Link>
      </div>
    </motion.div>
  </>
};

// Props Valitation
OneSneaker.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  styleColor: PropTypes.string.isRequired,
};

export default OneSneaker;
