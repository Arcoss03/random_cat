<script lang="ts">
    import { onMount } from 'svelte';
    import ky from 'ky';

    let catUrls: string[] = [];
    let pos: number = 0;
    const catApiUrl:string = 'https://api.thecatapi.com/v1/images/search';

    onMount(async () => {
        const { url } = await getCat();
        catUrls = [url];
    });

    async function download() {
        try {
            const response = await ky.get(catUrls[pos]);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cat.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
        }
    }

    function goNext() {
        if (pos < catUrls.length - 1) {
            pos++;
        }
    }

    function goBack() {
        if (pos > 0) {
            pos--;
        }
    }

    async function getCat(): Promise<{ url: string }> {
        const response = await ky.get(catApiUrl).json() as { url: string }[];
        return response[0];
    }

    async function changeCat() {
        const { url } = await getCat();
        catUrls.push(url);
        pos = catUrls.length - 1;
    }
</script>

<main class="main">
    <div class="img-container">
        {#if catUrls.length > 0}
            <img src={catUrls[pos]} class="logo" alt="Chat" />
        {:else}
            <span class="loader"></span>
        {/if}
    </div>
    <div class="button-container">
        <button on:click={goBack} class:disabled={pos === 0} class="secondary-button" id="goNextButton">Back</button>
        <a class="primary-button custom-padding" href="{catUrls[pos]}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="24" fill="#fff"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
        </a>
        <button on:click={changeCat} class="primary-button" id="changeCatButton">Change cat image</button>
        <button on:click={goNext} class:disabled={pos === catUrls.length -1 } class="secondary-button" id="goBackButton">Next</button>
    </div>
</main>

<style lang="scss">
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        

        .img-container {
            margin-top: 10px;
            width: 40vw;
            height: 40vw;
            border: solid rgb(24, 24, 24) 3px;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(52, 52, 52);

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
            margin-top: 20px;

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
        &:hover {
            scale: 1.05;
        }
    }
    .disabled {
    opacity: 0.5; 
    cursor: auto;
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
} 

</style>