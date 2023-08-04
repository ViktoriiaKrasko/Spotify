class Track {
  //static private field for list of tracks
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000) //Generating random id
    this.name = name
    this.author = author
    this.image = image
  }

  //static method for creating Track and adding it to the list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  //static method of getting all tracks
  static getList() {
    return this.#list.reverse()
  }

  static getById(id) {
    return (
      this.#list.find((track) => track.id === id) || null
    )
  }
}

Track.create(
  'Clair De Lune',
  'Claude Debussy',
  'https://picsum.photos/id/39/100/100',
)

Track.create(
  'Chopin: Nocturne Op. 27 No. 2',
  'Frederic Chopin',
  'https://picsum.photos/id/1082/100/100',
)

Track.create(
  'Midwayer',
  'Joep Beving',
  'https://picsum.photos/id/1042/100/100',
)

Track.create(
  'Interstellar (Main Theme Piano) (Cover)',
  'Gacabe & Jecabe',
  'https://picsum.photos/id/357/100/100',
)

Track.create(
  'Experience',
  'Muppet DJ&SECA Records',
  'https://picsum.photos/id/304/100/100',
)

Track.create(
  'Numb',
  'GnuS Cello',
  'https://picsum.photos/id/473/100/100',
)

Track.create(
  'Sonata Claro De Luna',
  'Beethoven',
  'https://picsum.photos/id/903/100/100',
)

// console.log(Track.getList())

module.exports = Track
