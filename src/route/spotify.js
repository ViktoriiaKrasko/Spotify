// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const Track = require('../class/track')
const Playlist = require('../class/playlist')

// ================================================================
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const playlist = Playlist.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву контейнера
    name: 'index',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      playlist: playlist,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-search', function (req, res) {
  // res.render генерує нам HTML сторінку

  const value = ''

  const list = Playlist.findListByValue(value)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву контейнера
    name: 'spotify-search',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        count: tracks.length,
      })),
      value,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.post('/spotify-search', function (req, res) {
  // res.render генерує нам HTML сторінку

  const value = req.body.value || ''

  const list = Playlist.findListByValue(value)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву контейнера
    name: 'spotify-search',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        count: tracks.length,
      })),
      value,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

router.get('/spotify-choose', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву контейнера
    name: 'spotify-choose',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

//===========================================================================
router.get('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const isMix = !!req.query.isMix

  // console.log(isMix)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-create', {
    // вказуємо назву контейнера
    name: 'spotify-create',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      isMix,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

//===========================================================================
router.post('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку
  const isMix = !!req.query.isMix

  const name = req.body.name

  if (!name) {
    // ↙️ cюди вводимо назву файлу з сontainer
    res.render('alert', {
      // вказуємо назву контейнера
      name: 'alert',
      // вказуємо назву компонентів
      // component: ['heading'],

      // вказуємо назву сторінки
      title: 'Alert',
      // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

      // вказуємо дані,
      data: {
        message:
          'Please fill in the title of your playlist',
        info: 'Empty title',
        link: isMix
          ? '/spotify-create?isMix=true'
          : '/spotify-create',
      },
    })
  }

  const playlist = Playlist.create(name)

  if (isMix) {
    Playlist.makeMix(playlist)
  }

  // console.log(playlist)

  res.render('spotify-playlist', {
    name: 'spotify-playlist',
    title: 'Playlist',
    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })

  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-playlist', function (req, res) {
  // res.render генерує нам HTML сторінку
  const id = Number(req.query.id)
  const playlist = Playlist.getById(id)

  if (!playlist) {
    res.render('alert', {
      name: 'alert',

      data: {
        message: 'No tracks in playlist',
        info: 'Empty playlist',
        link: '/',
      },
    })
  }
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву контейнера
    name: 'spotify-playlist',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-track-delete', function (req, res) {
  // res.render генерує нам HTML сторінку
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = Playlist.getById(playlistId)

  if (!playlist) {
    res.render('alert', {
      name: 'alert',

      data: {
        message: 'Playlist is missing',
        info: 'No playlist',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  playlist.deleteTrackById(trackId)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву контейнера
    name: 'spotify-playlist',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-track-add', function (req, res) {
  // res.render генерує нам HTML сторінку
  const playlistId = Number(req.query.playlistId)
  const playlist = Playlist.getById(playlistId)

  const allTracks = Track.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-track-add', {
    // вказуємо назву контейнера
    name: 'spotify-track-add',
    // вказуємо назву компонентів
    // component: ['heading'],

    // вказуємо назву сторінки
    title: 'Spotify',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      playlistId: playlist.id,
      tracks: allTracks,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-track-new', function (req, res) {
  // res.render генерує нам HTML сторінку
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = Playlist.getById(playlistId)
  const trackToAdd = Track.getById(trackId)

  if (playlist && trackToAdd) {
    playlist.tracks.push(trackToAdd)
    return res.render('alert', {
      name: 'alert',

      data: {
        message: 'Soundtrack is added',
        info: 'Success',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  } else {
    return res.render('alert', {
      name: 'alert',

      data: {
        message: 'No such luck',
        info: 'Try again',
        link: `/spotify-track-add`,
      },
    })
  }
  // ↑↑ сюди вводимо JSON дані
})

// Підключаємо роутер до бек-енду
module.exports = router
