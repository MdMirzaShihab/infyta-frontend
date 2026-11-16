"use client";

import { useEffect, useRef, useState } from "react";

// The map loads only on request, so the page makes no third-party request until the visitor asks.
export default function MapLoader({ src, title, mapsUrl, address }) {
  const [shown, setShown] = useState(false);
  const frame = useRef(null);
  // The button that was focused is gone once the map shows, so move focus to the map.
  useEffect(() => { if (shown) frame.current?.focus(); }, [shown]);
  return (
    <div className="sheet mapbox">
      {shown ? (
        <iframe ref={frame} className="mapbox__frame" src={src} title={title} loading="lazy" />
      ) : (
        <div className="mapbox__idle">
          <p className="mapbox__addr">{address}</p>
          <div className="mapbox__actions">
            <a className="textlink" href={mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            <button className="btn btn--ghost" type="button" onClick={() => setShown(true)}>Show map</button>
          </div>
        </div>
      )}
    </div>
  );
}
