<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import IconDownload from "./components/icons/IconDownload.vue";
import ky from "ky";

let catUrls: Ref<string[]> = ref([]);
let pos: Ref<number> = ref(0);
const catApiUrl: string = "https://api.thecatapi.com/v1/images/search?limit=10";

onMounted(async () => {
  catUrls.value = await getCat();
});

function download() {
  window.open(catUrls.value[pos.value], '_blank');
}

function goNext() {
  if (pos.value === catUrls.value.length - 2) {
    console.log("change cat");
    pos.value++;
    changeCat();
  } else {
    pos.value++;
  }
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
      width: 100vw;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      margin: 0;
      border-radius: 0;
      border: none;
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
  width: 20%;
  height: 20%;
  border-radius: 50%;
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
    width: 10%;
    height: 10%;
    border-radius: 50%;
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
