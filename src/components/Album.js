import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import Song from './Song';
import './../Album.css';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: '',
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 0,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

    componentDidMount() {
      this.eventListeners = {
        timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

    play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
    }

    pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false });
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
    }

    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      } else {
        if (!isSameSong) { this.setSong(song); }
        this.play();
      }
    }

    handlePrevClick() {
      const currentSongIndex = this.state.album.songs.indexOf(this.state.currentSong);
      const newSongIndex = Math.max(0, currentSongIndex - 1);
      const newSong = this.state.album.songs[newSongIndex];
      this.setSong(newSong);
      this.play(newSong);
    }

    handleNextClick() {
      const currentSongIndex = this.state.album.songs.indexOf(this.state.currentSong);
      const newSongIndex = Math.min(this.state.album.songs.length - 1, currentSongIndex + 1);
      const newSong = this.state.album.songs[newSongIndex];
      this.setSong(newSong);
      this.play(newSong);
    }

    handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
      const newVolume = e.target.value
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume });
    }

    formatTime(timeInS) {
      if (isNaN(timeInS)) { return "-:--" }
      const resultMin = Math.floor(timeInS / 60);
      const resultSecs = Math.floor(timeInS %60, -2);
      if (resultSecs < 10) {
        return resultMin + ": 0" + resultSecs;
      }
      return resultMin + ':' + resultSecs;
    };


  render() {
    return (

      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>



<div id="bottom-half">
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          { this.state.album.songs.map( (song, index) =>
            <Song song={song}
                  index={index}
                  handleSongClick={this.handleSongClick.bind(this)}
                  formatTime={this.formatTime}
                  isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong == song}
            />

            )
          }

          </tbody>
        </table>

        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.audioElement.volume}
          handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={ () => this.handlePrevClick()}
          handleNextClick={ () => this.handleNextClick()}
          handleTimeChange={ (e) => this.handleTimeChange(e)}
          handleVolumeChange={ (e) => this.handleVolumeChange(e)}
          formatTime={ (timeInS) => this.formatTime(timeInS)}
        />
          </div>
      </section>


    );
  }
}

export default Album;
