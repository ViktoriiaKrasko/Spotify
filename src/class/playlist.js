const Track = require('./track')

class Playlist {
  //static private field for playlists
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000 + Math.random() * 9000) //Generating random id
    this.name = name
    this.tracks = []
  }

  //static method for creating Playlist object and adding it to the list
  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  //static method of getting all playlists
  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()

    let randomTracks = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    playlist.tracks.push(...randomTracks)
  }

  static getById(id) {
    return (
      Playlist.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
  }
}

module.exports = Playlist
