<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import IconDownload from "./components/icons/IconDownload.vue";
import ky from "ky";
import { hasJSDocParameterTags } from "typescript";

let catUrls: Ref<string[]> = ref([]);
let pos: Ref<number> = ref(0);
let enventPos: Ref<number> = ref(100);
const catApiUrl: string = "https://api.thecatapi.com/v1/images/search?limit=10";

onMounted(async () => {
  catUrls.value = await getCat();
  window.addEventListener('keyup', (event) => handleKeyUp(event));
});

function handleKeyUp(event: KeyboardEvent) {
      // Check if the pressed key is "Space"
      if (event.key === ' ' || event.key === 'ArrowRight') {
        // Call the SayHello function or any other function you want
        goNext();
      } else if (event.key === 'ArrowLeft') {
        goBack();
      }
    }


function download() {
  window.open(catUrls.value[pos.value], '_blank');
}

function event (){
  if (pos.value === enventPos.value) {
    alert("Miaowww " + enventPos.value +" cats!");
    enventPos.value += 100;
  }

}

function goNext() {
  if (pos.value === catUrls.value.length - 2) {
    pos.value++;
    changeCat();
  } else {
    pos.value++;
  }
  event();
}

function goBack() {
  if (pos.value > 0) {
    pos.value--;
  }
}

async function getCat(): Promise<string[]> {
  const response = (await ky.get(catApiUrl).json()) as { url: string }[];
  return response.map((cat) => cat.url);
}

async function changeCat() {
  catUrls.value = [...catUrls.value, ...await getCat()];
}
</script>

<template>
  <main class="main">
    <div class="img-container">
      <img v-if="catUrls.length > 0" :src="catUrls[pos]" class="logo" alt="Chat" />
      <span v-else class="loader"></span>
    </div>
    <div class="button-container">
      <button @click="goBack" :class="{ 'disabled': pos === 0 }" class="secondary-button" id="goNextButton">Back</button>
      <button @click="download" id="download" class="primary-button custom-padding">
        <IconDownload />
      </button>
      <button @click="goNext" class="secondary-button" id="goBackButton">Next</button>
    </div>
  </main>
</template>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    overflow: hidden;
  }

  .img-container {
    margin-bottom: 30px;
    width: 40vw;
    height: 40vw;
    border: solid rgb(24, 24, 24) 3px;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(52, 52, 52);

    @media screen and (max-width: 768px) {
      position: absolute;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100vw;
      height: auto;
      z-index: -1;
      margin: 0;
      aspect-ratio: 9/16;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;

    .custom-padding {
      padding: 12px 15px 8px;
    }
  }
}


.primary-button {
  background-color: #ff5100;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  padding: 10px 15px;
  margin: 10px;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    scale: 1.05;
  }
}

.secondary-button {
  background-color: #dbdbdb;
  font-family: "Bungee Spice", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #141414;
  border: 1px solid #ff5100;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  font-family: "Bungee Spice", sans-serif;
  font-weight: 400;
  font-style: normal;

  &:hover {
    scale: 1.05;
  }
}

.disabled {
  opacity: 0.5;
  cursor: auto;

  &:hover {
    scale: 1;
  }
}

.loader {
  width: 80px;
  height: 80px;
  border-radius: 9999px;
  display: inline-block;
  position: relative;
  border: 3px solid #FF3D00;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 4px;
    top: 4px;
    border: 2px solid #FFF;
    width: 15px;
    height: 15px;
    border-radius: 9999px;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}</style>
