import { photo, slotSrc } from './photos.js'

// Hero mosaic — six photographs.
// To use your own: drop a file into src/photos/ and change the first
// argument of photo() to its filename (without extension). The Unsplash
// URL is only a fallback until your file exists.
export const photos = [
  {
    id: 1,
    name: 'Stillwater',
    description: 'A morning I nearly didn\'t wake up for. The lake held the sky better than the sky held itself.',
    category: 'Landscape',
    accent: 'teal',
    url: slotSrc('hero-1', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85'),
    size: 'large',
  },
  {
    id: 2,
    name: 'The Weight of Light',
    description: 'No direction given. Just two people and whatever the afternoon decided to do.',
    category: 'Portrait',
    accent: 'coral',
    url: slotSrc('hero-2', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85'),
    size: 'small',
  },
  {
    id: 3,
    name: 'Cathedral',
    description: 'Old-growth forest, two hours before it rained. Every shaft of light felt borrowed.',
    category: 'Landscape',
    accent: 'lime',
    url: slotSrc('hero-3', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85'),
    size: 'small',
  },
  {
    id: 4,
    name: 'After Midnight',
    description: 'The city empties out and becomes something else entirely. Something you can actually hear.',
    category: 'Street',
    accent: 'coral',
    url: slotSrc('hero-4', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85'),
    size: 'medium',
  },
  {
    id: 5,
    name: 'Presence',
    description: 'Shot in available light, no reflectors. He blinked once and this was the frame.',
    category: 'Portrait',
    accent: 'teal',
    url: slotSrc('hero-5', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=85'),
    size: 'medium',
  },
  {
    id: 6,
    name: 'Dissolved',
    description: 'Coast at low tide. The fog was moving faster than I could track. This was the last frame.',
    category: 'Landscape',
    accent: 'lime',
    url: slotSrc('hero-6', 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85'),
    size: 'medium',
  },
]

export const projects = [
  {
    id: 'blue-hour',
    title: 'Blue Hour',
    subtitle: 'Addis Ababa, 2024',
    accent: 'teal',
    thumbnail: photo('blue-hour', 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=900&q=85'),
    summary:
      'Every evening for thirty days I stood at a different corner of the city and waited for the twenty minutes between sunset and dark. The light in that window doesn\'t belong to any hour. It\'s borrowed from both.',
    photos: [
      {
        src: photo('blue-hour-1', 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=1400&q=90'),
        title: 'Mercato, Day One',
        description:
          'The market doesn\'t wind down so much as it shifts register. The vendors who sell in daylight give way to the ones who sell after dark, and for twenty minutes they overlap. I didn\'t know what I was looking for. I just kept the camera up.',
      },
      {
        src: photo('blue-hour-2', 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=90'),
        title: 'The Long Road Home',
        description:
          'Everyone who works across the city has to cross it again to get back. This particular junction handles about four directions of foot traffic simultaneously. The blue hour turns the tarmac into something almost reflective.',
      },
      {
        src: photo('blue-hour-3', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=90'),
        title: 'Reservoir, Week Three',
        description:
          'I drove forty minutes to find this view and nearly turned back when the clouds rolled in. Then the clouds became the photograph.',
      },
      {
        src: photo('blue-hour-4', 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1400&q=90'),
        title: 'The Coast Remembers',
        description:
          'Not Addis — a weekend outside the project\'s original scope. But the light was the same quality, just aimed differently. I included it because the series isn\'t really about a place.',
      },
    ],
  },
  {
    id: 'present-tense',
    title: 'Present Tense',
    subtitle: 'Portraits, 2023 – 2024',
    accent: 'coral',
    thumbnail: photo('present-tense', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85'),
    summary:
      'I\'ve been shooting portraits for twelve years and I still don\'t know exactly what happens in the moment someone decides to let you see them. These are the frames where it happened.',
    photos: [
      {
        src: photo('present-tense-1', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=90'),
        title: 'Yohannes',
        description:
          'We met through a mutual friend and he agreed on the spot, no hesitation, which made me immediately nervous. People who are too comfortable in front of a camera often give you the face they\'ve practiced. But he didn\'t. We talked for two hours and I shot for ten minutes.',
      },
      {
        src: photo('present-tense-2', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1400&q=90'),
        title: 'The Musician',
        description:
          'Available light only. I asked him to play something while I worked. He played for about forty minutes and this frame is from minute thirty-seven, when he\'d forgotten I was there.',
      },
      {
        src: photo('present-tense-3', 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1400&q=90'),
        title: 'Afternoon Session',
        description:
          'I\'ve shot in this stairwell three times now. The light hits a particular quality at 3pm in January. She arrived exactly when I needed her to.',
      },
    ],
  },
  {
    id: 'new-growth',
    title: 'New Growth',
    subtitle: 'Forest & Land, ongoing',
    accent: 'lime',
    thumbnail: photo('new-growth', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85'),
    summary:
      'I started this series without a thesis. I was just going to forests. After about a year I realized I kept returning to the same question: what does a place look like when it\'s in the middle of becoming something else?',
    photos: [
      {
        src: photo('new-growth-1', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=90'),
        title: 'Cathedral',
        description:
          'Old-growth in the south. Two hours before the rain that turned the road back into a river. The shafts of light lasted about four minutes. I got twelve frames.',
      },
      {
        src: photo('new-growth-2', 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=90'),
        title: 'After the Burn',
        description:
          'A section of managed forest six months after a controlled burn. The green that comes back first is almost aggressive. It doesn\'t wait for permission.',
      },
      {
        src: photo('new-growth-3', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=90'),
        title: 'Before the Clouds',
        description:
          'I\'ve stood on this ridge four times. This is the only morning the mountains were visible. I had about ninety seconds before the mist came back up.',
      },
    ],
  },
]

export const services = [
  {
    id: 1,
    title: 'Portraits',
    accent: 'teal',
    description:
      'Individual, couple, and family sessions. Editorial and natural light. One hour minimum, delivered within five days.',
    details: ['Studio & location', 'Full resolution files', 'Editing included'],
  },
  {
    id: 2,
    title: 'Events',
    accent: 'coral',
    description:
      'Weddings, openings, performances, and private gatherings. Unobtrusive documentary coverage from arrival to close.',
    details: ['8-hour coverage', 'Second shooter optional', 'Online gallery delivery'],
  },
  {
    id: 3,
    title: 'Commercial',
    accent: 'lime',
    description:
      'Product, editorial, and brand work. Clean or environmental — whichever serves the story you need to tell.',
    details: ['Usage licensing included', 'Art direction available', 'Rush turnaround on request'],
  },
]
