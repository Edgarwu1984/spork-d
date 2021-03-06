const restaurants = [
  {
    category: 'Asian',
    name: 'Coconut House',
    rating: 4.8,
    numReviews: 20,
    phoneNumber: '395323779',
    address: {
      street: '477 Warrigal Road',
      suburb: 'Moorabbin',
      state: 'VIC',
      postcode: '3189',
    },
    geolocation: '-37.945584531932155, 145.07775554957087',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/4/16585894/aee7e8fe1172aa0c4a80e1eb346b8030.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/pictures/4/16585894/acbc51bd43f03ec1e15e8504c2c10cc2.jpg',
      'https://b.zmtcdn.com/data/pictures/4/16585894/0e9fcc841ff427ed6d2b838f94ecc9bf.jpg',
      'https://b.zmtcdn.com/data/pictures/4/16585894/8106f8923a8b0bed44fe605d9db5aa36.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/894/16585894/c5f32e69178813f56f9cf14ad1fd0f86.jpg',
      'https://b.zmtcdn.com/data/menus/894/16585894/ea6b454e73933175d039e1819f44717d.jpg',
      'https://b.zmtcdn.com/data/menus/894/16585894/f1bb5f25196a26738297f93ba4faf292.jpg',
    ],
    description: 'A variety of Asian dishes.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Asian',
    name: 'Junior Tan Hawker Kitchen',
    rating: 4.3,
    numReviews: 5,
    phoneNumber: '397201935',
    address: {
      street: 'Mountain High Centre, Shop 25, 7 High Street',
      suburb: 'Bayswater',
      state: 'VIC',
      postcode: '3153',
    },
    geolocation: '-37.8431898621124, 145.26647729518325',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/3/16586163/cab5884dd8323177966e50b2132b278d_featured_v2.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/reviews_photos/b07/ccfb1760a6c36c3cd472f6280e2e6b07.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/be2/3b14beadf8639389a286d4e8e8c61be2_1503821840.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/2c7/7b0c8953c5b6e77c26f47e785a9372c7_1531124629.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/163/16586163/9aa004c349ffaa11d956f78dfb014ddc.jpg',
      'https://b.zmtcdn.com/data/menus/163/16586163/386cf8a99755708d02735b5987a50209.jpg',
      'https://b.zmtcdn.com/data/menus/163/16586163/8ae06ce04f4dde571e27ade9f7bfc866.jpg',
    ],
    description:
      'Authentic, flavourful Malaysian with plenty of options for all palates.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Japanese',
    name: 'Mogu Mogu',
    rating: 4.1,
    numReviews: 29,
    phoneNumber: '480260209',
    address: {
      street: '48 Jackson Court',
      suburb: 'Doncaster East',
      state: 'VIC',
      postcode: '3109',
    },
    geolocation: '-37.78815182744635, 145.15051240892717',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/chains/0/18260020/53ec28ff1985bcab893399e5c4eeb9b8.jpg',
    images: [
      'https://b.zmtcdn.com/data/pictures/chains/0/18260020/c478085e753d0e7b2a859784db5184f0.jpg',
      'https://b.zmtcdn.com/data/pictures/chains/0/18260020/c7188a80d6f6602fa6c157065bbe2d2d.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/f91/2868c3f86413af674762afef6c9e6f91_1503905282.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/020/18260020/11721b1cd79766a8cf50524c53f4ae88.jpg',
      'https://b.zmtcdn.com/data/menus/020/18260020/446f451d904ca23a548019b77c1b58f8.jpg',
      'https://b.zmtcdn.com/data/menus/020/18260020/34f31016064be46cf6413486c8ff8fa4.jpg',
    ],
    description:
      'Japanese cuisine by chef Hiroki Moya with 20 years of experience at his helm, from traditional sushi to Hiro???s signature kaisen don and charcoal grilled dishes',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Outdoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Japanese',
    name: 'Kenzan Japanese',
    rating: 4.6,
    numReviews: 274,
    phoneNumber: '396548933',
    address: {
      street: 'Lower Ground Level, 45 Collins Street',
      suburb: 'CBD, Melbourne',
      state: 'VIC',
      postcode: '3000',
    },
    geolocation: '-37.81154493192468, 144.9694430724554',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/chains/8/16571628/2e3ab1d44f4f6f9b3fcdfedfbe5fbe87.jpeg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/pictures/chains/8/16571628/3bb88ddeaec4c5ad086c1317b5176e31.jpg',
      'https://b.zmtcdn.com/data/pictures/chains/8/16571628/1ac7b93cfb149aa577a1c29a70b787c9.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/a4a/7dd7af66ee6a8d94c6539bae45e79a4a_1523266941.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/628/16571628/40637319eb38839ad6098a3719c4e3ce.jpg',
      'https://b.zmtcdn.com/data/menus/628/16571628/4d6bf4e70d30325cee87304962ced502.jpg',
      'https://b.zmtcdn.com/data/menus/628/16571628/2a71e2dc1dac261c0fe75af66d6d3aa1.jpg',
    ],
    description:
      'Name after an Edo period potter, dinner is a traditional affair from sushi and sashimi staples to sukiyaki amongst Japanese aesthetics and attentive service.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Outdoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Italian',
    name: 'Kaprica',
    rating: 4.5,
    numReviews: 520,
    phoneNumber: '393471138',
    address: {
      street: '19 Lincoln Square South',
      suburb: 'Carlton',
      state: 'VIC',
      postcode: '3053',
    },
    geolocation: '-37.80286487669005, 144.9605204493587',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/reviews_photos/ff1/b64c22321cd4a5fdb1d5245ef552eff1_1491092961.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/reviews_photos/857/992da2cf2b08f5bebe4b4fd9ad51d857_1509179944.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/3ba/040c108843e3bc57687cc0dd0703c3ba_1509179943.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/c01/407e4726f6e6eede345c80743224cc01_1499164142.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/477/16580477/27ae516a345eb10ea3bff65c09345342.jpg',
      'https://b.zmtcdn.com/data/menus/477/16580477/8895cb9f8ce5f2d316553797699d8e4d.jpg',
    ],
    description:
      'Behind an unassuming graffitied front, tall exposed wood beam ceilings and rustic bare brick wall interiors coupled with handwritten menus, Kaprica serves traditional home-style pizza and Italian.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Outdoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Italian',
    name: "Pepe's Italian & Liquor",
    rating: 4.7,
    numReviews: 47,
    phoneNumber: '396637994',
    address: {
      street: '275 Exhibition Street',
      suburb: 'CBD, Melbourne',
      state: 'VIC',
      postcode: '3000',
    },
    geolocation: '-37.80801878073069, 144.96781622105635',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/4/16572544/0ac1ce4ef9f7b699940f6f1db8bf5248.jpeg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/pictures/4/16572544/0ac1ce4ef9f7b699940f6f1db8bf5248.jpeg',
      'https://b.zmtcdn.com/data/pictures/4/16572544/1a0be27cd6b30fd14ed06eeda5ade8e0.jpeg',
      'https://b.zmtcdn.com/data/pictures/4/16572544/8903fbeec8693191d1b03f0a728c843f.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/544/16572544/671459c16391bd9b289bc7ea0da0be8d.jpg',
      'https://b.zmtcdn.com/data/menus/544/16572544/660c5f2a4a5e9bda5f25cfb686ae150f.jpg',
    ],
    description:
      'Boasting the largest outdoor beer garden in the city with a European food and pizza menu.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Outdoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Spanish',
    name: 'Bar Lourinh??',
    rating: 4.6,
    numReviews: 162,
    phoneNumber: '396637890',
    address: {
      street: '37 Little Collins Street',
      suburb: 'CBD, Melbourne',
      state: 'VIC',
      postcode: '3000',
    },
    geolocation: '-37.81307990564888, 144.97184202970652',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/1/16570811/3c724770fb0a3847b2a96beffcac8b2e.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/reviews_photos/873/a0ec662be5a1461e973d3f0daab88873_1499235287.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/f89/77cd2e5b9cded7fe73355102351e5f89_1499095840.jpg',
      'https://b.zmtcdn.com/data/reviews_photos/f34/cb537ce3c052385d0bce2773cea77f34.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/811/16570811/c4bc51e0f8f01ce88ddfb1d0ff1ad47e.jpg',
    ],
    description:
      'Rustic walls coloured stark white, adorned with an eclectic mismatch of mirrors and picture frames provides the backdrop for good mediterranean food and wine.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Outdoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
  {
    category: 'Spanish',
    name: 'Portello Rosso',
    rating: 4.5,
    numReviews: 162,
    phoneNumber: '396022273',
    address: {
      street: '15 Warburton Ln',
      suburb: 'CBD, Melbourne',
      state: 'VIC',
      postcode: '3000',
    },
    geolocation: '-37.81262986708975, 144.961298940391',
    openHour: {
      Monday: '11:00AM - 9:00PM',
      Tuesday: 'CLOSE',
      Wednesday: '11:00AM - 9:00PM',
      Thursday: '11:00AM - 10:00PM',
      Friday: '11:00AM - 9:00PM',
      Saturday: '11:00AM - 9:00PM',
      Sunday: '11:00AM - 9:00PM',
    },
    coverImage:
      'https://b.zmtcdn.com/data/pictures/chains/8/16572138/f14fb868523f09702528d2a572e166e6.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
    images: [
      'https://b.zmtcdn.com/data/pictures/chains/8/16572138/63837a76c98bb4c54142291aef4b384a.jpg',
      'https://b.zmtcdn.com/data/pictures/chains/8/16572138/27ac4998963b394303484480d7a43e74.jpg',
      'https://b.zmtcdn.com/data/pictures/chains/8/16572138/9787c700661a93a84ead98d787dda67b.jpg',
    ],
    menu: [
      'https://b.zmtcdn.com/data/menus/138/16572138/8baf144d052383db16599602ec7f6f61.jpg',
      'https://b.zmtcdn.com/data/menus/138/16572138/3e2a58c9aa5cf5a81431abecc4d68c40.jpg',
    ],
    description:
      'A red brick building along Warburton Lane, framed by an arched wooden door serving Spanish tapas amongst a backdrop of hyper modern interiors.',
    info: [
      'Takeaway Available',
      'Full Bar Available',
      'Kid Friendly',
      'Table booking recommended',
      'Wheelchair Accessible',
      'Indoor Seating',
      'Outdoor Seating',
      'Gluten Free Options',
      'Vegetarian Friendly',
    ],
  },
];

export default restaurants;
