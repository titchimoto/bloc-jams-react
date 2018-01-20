import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';
import albumData from './../data/albums.js';
import '.././styles/Library.css';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
   return (
     <section className="library show-grid">
       {
         this.state.albums.map( (album, index) =>
           <Col xs={12} sm={4} md={3} key={index} className="library-album-section">
           <Link to={`/album/${album.slug}`} className="library-album-info">
              <Image responsive src={album.albumCover} alt={album.title} />
              <div className="library-album-artist">{album.artist}</div>
              <div>{album.title}</div>
            </Link>
        </Col>

      )
    }
      </section>
    );
  }
}

export default Library;
