function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function calcAngle(lat1, lon1, lat2, lon2) {
  const phi1 = (lat1 * Math.PI) / 180
  const phi2 = (lat2 * Math.PI) / 180
  const deltaLamda = ((lon2 - lon1) * Math.PI) / 180

  const y = Math.sin(deltaLamda) * Math.cos(phi2)
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLamda)
  return (Math.atan2(y, x) * 180) / Math.PI
}

function getGPSPosition() {
  return new Promise((resolve, reject) => {
    function success(pos) {
      resolve(pos.coords)
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(success.bind(this), error, options)
  })
}

export { calcDistance, calcAngle, getGPSPosition }
