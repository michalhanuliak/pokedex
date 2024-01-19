export const createAudioUrl = async (
  arrayBuffer: ArrayBuffer,
): Promise<string> => {
  const blob = new Blob([arrayBuffer], { type: 'audio/mp3' })
  return URL.createObjectURL(blob)
}
