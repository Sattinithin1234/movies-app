import "./TrailerModal.css"

function TrailerModal(props) {
  if (!props.videoKey) {
    return null
  }

  return (
    <div className="trailer-modal">
      <div className="trailer-content">

        <button
          className="trailer-close"
          onClick={props.onClose}
        >
          ✕
        </button>

        <div className="trailer-video">
          <iframe
            src={`https://www.youtube.com/embed/${props.videoKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </div>
  )
}

export default TrailerModal