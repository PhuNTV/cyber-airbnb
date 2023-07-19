import React, { useState } from 'react'
import Map from 'react-map-gl';

function MapLocation() {
  const [viewport, setViewport] = useState({
    width: '100%',
    maxHeight: '100%',
    latitude: 16.010,
    longitude: 108.229,
    zoom: 11,
  })
  return (
    <Map mapStyle='mapbox://styles/raymondnqt/clk5jze8n00ib01qr8l7m2v9q'
    mapboxAccessToken='pk.eyJ1IjoicmF5bW9uZG5xdCIsImEiOiJjbGs1anNhOHgwMnpoM2NwZjRyY29mdHU3In0.BgT2VgYx0d4Gi3yvAitxzQ'
    {...viewport}
    onMove={evt => setViewport(evt.viewport)}>
      
    </Map>
  )
}

export default MapLocation