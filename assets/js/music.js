// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://duhandemirci.com/music/',
            extension = '',
            tracks = [
                {
                    "track": 1,
                    "name": "Alinin 8 günü (Ambiyans&Elektronik)",
                    "length": "3:02",
                    "file": "alinin-8-gunu-ambiyans-elektronik"
                },
                {
                    "track": 2,
                    "name": "Ambulance (Trance&Deep)",
                    "length": "2:24",
                    "file": "ambulance-trance-deep"
                },
                {
                    "track": 3,
                    "name": "Dokuz (Klasik&Piyano)",
                    "length": "1:40",
                    "file": "dokuz-klasik-piyano"
                },
                {
                    "track": 4,
                    "name": "Ellerin (Klasik&Piyano)",
                    "length": "2:42",
                    "file": "ellerin-klasik-piyano"
                },
                {
                    "track": 5,
                    "name": "Espia (Enstrümental&Klasik)",
                    "length": "0:48",
                    "file": "espia-enstrumental-klasik"
                },
                {
                    "track": 6,
                    "name": "Exposure (Piyano&Edm&Dance)",
                    "length": "1:42",
                    "file": "exposure-piyano-edm-dance"
                },
                {
                    "track": 7,
                    "name": "Gece (Elektronik&Indie)",
                    "length": "4:44",
                    "file": "gece-elektronik-indie"
                },
                {
                    "track": 8,
                    "name": "Hey Jude (Acapella&Vocals)",
                    "length": "2:12",
                    "file": "hey-jude-acapella-vocals"
                },
                {
                    "track": 9,
                    "name": "Ollie (Enstrümental&Hush)",
                    "length": "2:06",
                    "file": "ollie-enstrumental-hush"
                },
                {
                    "track": 10,
                    "name": "Public Call (Gerilim&Enstrümental)",
                    "length": "1:01",
                    "file": "public-call-gerilim-enstrumental"
                },
        ],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Çalıyor...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Durduruldu...');
            }).bind('ended', function () {
                npAction.text('Durduruldu...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

//initialize plyr
plyr.setup($('#audio1'), {});