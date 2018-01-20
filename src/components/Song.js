import React, { Component } from 'react';
import './../Album.css';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }


  render() {
    return(
      <tr className="song" key={this.props.index} onClick={() => this.props.handleSongClick(this.props.song) } onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()} >
       <td className="song-number" >
        <button id="song-buttons">
        { (this.props.currentSong) ? <span className={this.props.isPlaying ? "ion-pause" : "ion-play"}></span> :
        (this.state.hover) ? <span className="ion-play"></span> : <span className="song-number">{this.props.index + 1}</span> }
        </button>



       </td>
       <td className="song-title">{this.props.song.title}</td>
       <td className="song-duration">{this.props.formatTime(this.props.song.duration)}</td>
      </tr>
    )
  }
}

export default Song;
