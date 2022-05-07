export const notEmptyPayloadFields = (payload) => {
  const keys = Object.keys(payload)

  const newPayload = keys.reduce((acc, currentKey) => {
    if (payload[currentKey] !== ''
      || (Array.isArray(payload[currentKey]) && payload[currentKey].length > 0)) {
      return { ...acc, [currentKey]: payload[currentKey] }
    }
    return acc
  })

  return newPayload
}
