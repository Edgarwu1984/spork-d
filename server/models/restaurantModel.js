import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.Object,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const restaurantSchema = mongoose.Schema({
  category: {
    type: String,
    default: 'Uncategorized',
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  phoneNumber: {
    type: String,
    required: true,
    default: '400000000',
  },
  address: {
    type: String,
    required: true,
  },
  geolocation: {
    type: String,
    required: true,
  },
  openHour: {
    type: Object,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
    default: '/images/image_placeholder.jpg',
  },
  images: [
    {
      type: String,
      default: '/images/image_placeholder.jpg',
    },
  ],
  menu: [
    {
      type: String,
      default: '/images/image_placeholder.jpg',
    },
  ],
  description: {
    type: String,
    required: true,
  },
  info: [
    {
      type: String,
      required: true,
    },
  ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
