interface Props {
  youtubeId: string
  start?: number
  end?: number
}

export default function YoutubeEmbed({ youtubeId, start, end }: Props) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    ...(start !== undefined ? { start: String(start) } : {}),
    ...(end !== undefined ? { end: String(end) } : {}),
  })

  const src = `https://www.youtube.com/embed/${youtubeId}?${params}`

  return (
    <div className="youtube-embed" onPointerDown={e => e.stopPropagation()}>
      <iframe
        src={src}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
