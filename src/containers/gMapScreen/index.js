import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import GmapComponent from '../../components/gMap'
import './gmap.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const DEFAULT_CENTER = { lat: 18.590727879655105, lng: 73.74850060623852 }

const GmapScreen = () => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  // eslint-disable-next-line
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_CENTER)
  const currentLocationMarkerRef = useRef(null)
  const directionsRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat],
      zoom: 14,
    })

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    })

    mapRef.current.addControl(geolocateControl)

    directionsRef.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    })

    mapRef.current.addControl(directionsRef.current, 'top-left')

    navigator.geolocation.getCurrentPosition(
      position => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCurrentLocation(newLocation)

        mapRef.current.flyTo({
          center: [newLocation.lng, newLocation.lat],
          zoom: 15,
        })

        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.remove()
        }

        currentLocationMarkerRef.current = new mapboxgl.Marker()
          .setLngLat([newLocation.lng, newLocation.lat])
          .setPopup(new mapboxgl.Popup().setHTML('Your Current Location'))
          .addTo(mapRef.current)

        directionsRef.current.setOrigin([newLocation.lng, newLocation.lat])

        getPlaceName(newLocation).then(placeName => {
          directionsRef.current.setOrigin([newLocation.lng, newLocation.lat], {
            name: placeName,
          })
        })

        fetchNearbyHospitals(newLocation)
      },
      error => {
        console.error('Error getting geolocation:', error)
      },
      { enableHighAccuracy: true }
    )

    // Watch for location changes if user moves
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const updatedLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCurrentLocation(updatedLocation)
        mapRef.current.setCenter([updatedLocation.lng, updatedLocation.lat])

        if (currentLocationMarkerRef.current) {
          currentLocationMarkerRef.current.remove()
        }

        currentLocationMarkerRef.current = new mapboxgl.Marker()
          .setLngLat([updatedLocation.lng, updatedLocation.lat])
          .setPopup(new mapboxgl.Popup().setHTML('Your Updated Location'))
          .addTo(mapRef.current)

        directionsRef.current.setOrigin([
          updatedLocation.lng,
          updatedLocation.lat,
        ])

        getPlaceName(updatedLocation).then(placeName => {
          directionsRef.current.setOrigin(
            [updatedLocation.lng, updatedLocation.lat],
            { name: placeName }
          )
        })
      },
      error => {
        console.error('Error watching geolocation:', error)
      },
      { enableHighAccuracy: true }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
    // eslint-disable-next-line
  }, [])

  const getPlaceName = async coordinates => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name
      }
      return 'Unknown Location'
    } catch (error) {
      console.error('Error fetching place name:', error)
      return 'Unknown Location'
    }
  }

  const fetchNearbyHospitals = async center => {
    try {
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${center.lat},${center.lng})[amenity=hospital];out;`
      const response = await fetch(overpassUrl)
      if (!response.ok) throw new Error('Failed to fetch hospital data')
      const data = await response.json()
      const hospitalsData = data.elements ?? []

      hospitalsData.forEach(hospital => {
        const { lat, lon, tags } = hospital
        const name = tags?.name ?? 'Unknown Hospital'
        const vicinity =
          tags?.['addr:full'] ?? tags?.['addr:full'] ?? 'No address available'

        const markerElement = document.createElement('div')
        markerElement.className = 'custom-marker'
        markerElement.innerHTML = `<i class="pi pi-map-marker" style="font-size: 30px;"></i>`
        markerElement.style.cursor = 'pointer'

        // eslint-disable-next-line
        const marker = new mapboxgl.Marker({ element: markerElement })
          .setLngLat([lon, lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<strong>${name}</strong><br>${vicinity}`
            )
          )
          .addTo(mapRef.current)

        markerElement.addEventListener('click', () => {
          directionsRef.current.setDestination([lon, lat])

          getPlaceName({ lat, lng: lon }).then(placeName => {
            directionsRef.current.setDestination([lon, lat], {
              name: placeName,
            })
          })
        })
      })
    } catch (error) {
      console.error('Error fetching hospital data:', error)
    }
  }

  return <GmapComponent mapContainerRef={mapContainerRef} />
}

export default GmapScreen
