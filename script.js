const inputFile = document.querySelector('#video-file');
const typeVideo = ['video/mp4', 'video/webm', 'video/ogg'];
const reader = new FileReader();

// comprobar formato del video
const handleFileInput = (e) => {
  hideMessage();
  hide('.main');
  const file = e.target.files[0];

  if (comprobarTypeVideo(file) < 0) {
    showMessage('El archivo no es un viedo válido.')
    return;
  }
  // 
  reader.readAsDataURL(file);
  addEventReader();
};

// comprobar tipo de video
const comprobarTypeVideo = (pFile) => {
  const typeVideoMatch = typeVideo.indexOf(pFile.type);
  return typeVideoMatch;
};

const showMessage = (msg) => {
  const el = document.querySelector('.message');
  el.innerHTML = msg;
  show('.message');
};

const hideMessage = () => {
  hide('.message');
}

const show = (selector) => {
  const el = document.querySelector(selector);
  el.classList.add('visible');
};

const hide = (selector) => {
  const el = document.querySelector(selector);
  el.classList.remove('visible');
};

// mostrar carga
const mostrarLoading = (e) => {
  showMessage('Cargando...')
};

//visualisar video
const mostrarVideo = () => {
  showMessage('El video se ha  cargado correctamente');
  show('.main')
  const videoFile = document.querySelector('#video');
  videoFile.volume = 0.5;
  videoFile.src = reader.result;
  const videoContainer = document.querySelector('#section');
  videoContainer.classList.remove('hidden');
  addControlBotones(videoFile);
};

//eventos botones
const addControlBotones = (file) => {
  const reproducirBtn = document.querySelector('#reproducir');
  const pausaBtn = document.querySelector('#pausa');
  const subirVolumBtn = document.querySelector('#subir-volumen');
  const bajarVolumBtn = document.querySelector('#bajar-volumen');
  reproducirBtn.addEventListener('click', () => {
    file.play();
  });
  pausaBtn.addEventListener('click', () => {
    file.pause();
  });
  subirVolumBtn.addEventListener('click', () => {
    console.log(file.volume);
    file.volume += 0.1;
  });
  bajarVolumBtn.addEventListener('click', () => {
    file.volume -= 0.1;
  });
};

const addEventReader = () => {
  console.log('adding events');
  reader.addEventListener('loadstart', mostrarLoading);
  reader.addEventListener('loadend', mostrarVideo);
  reader.addEventListener('progress', mostrarLoading);
};

inputFile.addEventListener('change', handleFileInput);

  