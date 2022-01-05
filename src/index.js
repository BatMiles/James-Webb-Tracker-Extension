import axios from 'axios';

const api = 'https://api.jwst-hub.com/track';

const loading = document.querySelector('.loading');
const error = document.querySelector('.error');
const results = document.querySelector('.results-container');

const stage = document.querySelector('.stage-title');
const distanceFromEarth = document.querySelector('.distance-from-earth');
const distanceFromL2 = document.querySelector('.distance-to-L2');
const timeSinceLaunch = document.querySelector('.time-since-launch');
const distancePercentComplete = document.querySelector('.distance-percent-complete');
const speed = document.querySelector('.speed-km-s');
const tempCold = document.querySelector('.temp-cold-side');
const tempWarm = document.querySelector('.temp-warm-side');
const image = document.querySelector('.webb-img');

// Fetcb data from JWST api
(async () => {
  loading.style.display = "none";
  error.style.display = "none";
  results.style.display = "none";

  try {
    loading.style.display = "block";

    const response = await axios.get(api);
    const data = response.data;
    console.log(data);

    results.style.display = "block";
    loading.style.display = "none";

    stage.textContent = data.currentDeploymentStep;
    distanceFromEarth.textContent = data.distanceEarthKm;
    distanceFromL2.textContent = data.distanceL2Km;
    timeSinceLaunch.textContent = data.launchElapsedTime;
    distancePercentComplete.textContent = data.percentageCompleted;
    speed.textContent = data.speedKmS;
    tempCold.textContent = data.tempC.tempCoolSide1C;
    tempWarm.textContent = data.tempC.tempWarmSide1C;
    image.src = data.deploymentImgURL;
  } catch(e) {
    loading.style.display = "none";
    results.style.display = "none";
    error.style.display = "block";
    error.innerHTML = `I'm sorry, there was an issue fetching Webb's data. You can always see it's progress on <a href='https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html'>JPL's site</a>`
  }
})();

