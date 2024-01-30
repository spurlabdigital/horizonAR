<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalState } from '../../../js/store'
import AButton from './AButton.vue'

const globalState = useGlobalState()

const route = useRoute()
const router = useRouter()
const needsTrust = ref(false)

onMounted(() => {
  needsTrust.value = route.matched.some((record) => record.name === 'horizon')
})

router.beforeEach((to) => {
  needsTrust.value = to.matched.some((record) => record.name === 'horizon')
})

const showErrorMessage = ref(false)

function askForPermission() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission().then(() => {
      DeviceOrientationEvent.requestPermission().then(() => {
        navigator.geolocation.getCurrentPosition(
          success.bind(this),
          error.bind(this),
          options
        )
      })
    })
  } else if (navigator.userAgent.match(/Android/i)) {
    navigator.geolocation.getCurrentPosition(
      success.bind(this),
      error.bind(this),
      options
    )
  } else {
    globalState.isMobile = false
    navigator.geolocation.getCurrentPosition(
      success.bind(this),
      error.bind(this),
      options
    )
  }

  function success(obj) {
    globalState.setGPS(obj.coords)
    globalState.setTrusted(true)
    router.push({ name: 'hilfe' })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
    showErrorMessage.value = true
  }
}

function closeErrorMessage() {
  showErrorMessage.value = false
}

const isTrusted = computed(() => {
  return globalState.isTrusted
})
</script>

<template>
  <div
    class="Blocker"
    v-if="!isTrusted && needsTrust"
    @click="askForPermission"
  >
    <div class="textBlock">
      Um alle Funktionen nutzen zu können, benötigen wir die Freigabe von:
    </div>
    <div class="iconBox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          d="M4.6 9.40039L1 13.0004L4.6 16.6004"
          stroke="#767676"
          stroke-width="2.2s"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.3999 4.6L12.9999 1L16.5999 4.6"
          stroke="#767676"
          stroke-width="2.2s"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5999 21.4004L12.9999 25.0004L9.3999 21.4004"
          stroke="#767676"
          stroke-width="2.2s"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.3999 9.40039L24.9999 13.0004L21.3999 16.6004"
          stroke="#767676"
          stroke-width="2.2s"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 13H25"
          stroke="#767676"
          stroke-width="2.2s"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13 1V25"
          stroke="#767676"
          stroke-width="2.2s"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div>Bewegung</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="29"
        viewBox="0 0 30 29"
        fill="none"
      >
        <path
          d="M1 13.7895L29 1L15.7368 28L12.7895 16.6316L1 13.7895Z"
          stroke="#767676"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div>Standort</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="29"
        viewBox="0 0 33 29"
        fill="none"
      >
        <path
          d="M31.9993 24.2278C31.9993 24.9716 31.7039 25.685 31.1779 26.2109C30.652 26.7369 29.9386 27.0324 29.1948 27.0324H3.95395C3.21014 27.0324 2.4968 26.7369 1.97084 26.2109C1.44489 25.685 1.14941 24.9716 1.14941 24.2278V8.80285C1.14941 8.05904 1.44489 7.34569 1.97084 6.81974C2.4968 6.29379 3.21014 5.99831 3.95395 5.99831H9.56303L12.3676 1.7915H20.7812L23.5857 5.99831H29.1948C29.9386 5.99831 30.652 6.29379 31.1779 6.81974C31.7039 7.34569 31.9993 8.05904 31.9993 8.80285V24.2278Z"
          stroke="#767676"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5749 21.4232C19.6727 21.4232 22.184 18.912 22.184 15.8142C22.184 12.7163 19.6727 10.2051 16.5749 10.2051C13.4771 10.2051 10.9658 12.7163 10.9658 15.8142C10.9658 18.912 13.4771 21.4232 16.5749 21.4232Z"
          stroke="#767676"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
      <div>Kamera</div>
    </div>
    <AButton class="buttonPos" text="Weiter" />
  </div>

  <div v-if="showErrorMessage" class="Blocker right" @click="closeErrorMessage">
    <div class="headline">Ortungsdienste aktivieren</div>
    <div>
      Funktioniert nicht? Hier ist eine kurze Anleitung, wie du die
      Ortungsdienste für Safari auf deinem iPhone aktivieren kannst:

      <ol class="list">
        <li>Öffne die "Einstellungen" App auf deinem iPhone.</li>
        <li>Scrolle nach unten und tippe auf "Datenschutz".</li>
        <li>
          Wähle "Ortungsdienste" aus. Stelle sicher, dass die Ortungsdienste
          oben auf der Seite aktiviert sind (grüner Schalter).
        </li>
        <li>Scrolle nach unten und finde "Safari" in der Liste der Apps.</li>
        <li>Tippe auf "Safari".</li>
        <li>Wähle die Option: "Beim Verwenden der App".</li>
      </ol>

      <AButton class="buttonPosCenter" text="OK" />
    </div>
  </div>
</template>

<style scoped>
.Blocker {
  background: #e1d1cc;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: clip;
  text-align: center;
  align-items: center;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.textBlock {
  margin: 2rem;
  color: #767676;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 150.023%; /* 1.87531rem */
  letter-spacing: 0.0125rem;
}

.iconBox {
  display: flex;
  flex-direction: column;
  color: #767676;
  font-style: normal;
  font-weight: 700;
  line-height: 150.023%; /* 1.87531rem */
  letter-spacing: 0.0125rem;
}

.iconBox svg {
  margin: 1rem auto 0.5rem auto;
}

.right {
  overflow-y: auto;
  justify-self: left;
  justify-items: left;
  text-align: left;
  padding: 2rem;
  color: #494949;
  line-height: 120.523%; /* 1.22956rem */
  letter-spacing: 0.0525rem;
}

.headline {
  margin-bottom: 2rem;
}

.list {
  padding: 1rem;
  list-style: decimal;
  justify-self: right;
}

.list li {
  margin: 0.5rem 0;
}

.buttonPosCenter {
}
</style>
