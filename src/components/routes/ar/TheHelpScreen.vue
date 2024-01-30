<template>
<div class="helpScreen">
  <div class="warningText">Kein Zugriff auf den Standort. Bitte schalten Sie den Standort frei und laden Sie neu</div>
  <video autoplay loop muted playsinline id="myVideo" class="videoPlayer">
    <source src="/help.mp4" type="video/mp4">
  </video>
</div>
</template>

<script>
export default {
  name: "HelpScreen"
}
</script>

<style scoped>
.helpScreen{
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
}

.warningText{
  bottom: 0%;
  color: #ff0000;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.videoPlayer{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
