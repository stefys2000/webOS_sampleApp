/**
 * A remote control key variables
 */
let RC_LEFT,RC_UP,RC_RIGHT,RC_DOWN,RC_ENTER,RC_BACK,RC_EXIT;

let channel = 0
let hls_source = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';


/**
 * The root html element
 */
let root = null;

/**
 * Function for creating the application and getting it ready for the users to use
 */
function createApp() {
  console.log("Creating the app...");
  registerKeys();
  console.log("Initializing HLS...");
  playVideo();

  /**
   * Setting the root HTML element
  */
  root = document.getElementById("app");
  
  document.addEventListener("keydown", handleKeyPress);

  /**
   * Here you can start doing awesome things!
   */
  console.log("...and it's ready for use");
}

function playVideo(){
  var video = document.getElementById('video');
  if (Hls.isSupported()) {
    var hls = new Hls({
      debug: true,
    });
    console.log("Init hls successful");

    hls.loadSource(hls_source);
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      video.muted = true;
      video.play();
    });
    console.log("Video played successful");
  }
}

/**
 * Setting key event numeric value to variables, so you don't have to numeric values
 */
function registerKeys() {
  console.log("registerKeys is called");
  RC_LEFT = 37;
  RC_UP = 38;
  RC_RIGHT = 39;
  RC_DOWN = 40;
  RC_ENTER = 13;
  RC_BACK = 10009;
  RC_EXIT = 10182;
}

/**
 * Function which is called when a key is pressed
 */
function handleKeyPress(event) {
  switch(event.keyCode) {
    case RC_ENTER:
      selectItem();
      break;
    case RC_EXIT:
      break;
    case RC_LEFT:
      keyPressLeft();
      break;
    case RC_RIGHT:
      keyPressRight();
      break;
    case RC_UP:
      keyPressUp();
      break;
    case RC_DOWN:
      keyPressDown();
      break;
    default:
      console.log("You need to add some cases here, a key you pressed was", event.keyCode);
  }
}

/**
 * The key press functions
 */
function keyPressUp() {
  console.log("You pressed the up key");
  // root.innerHTML = "UP";
  nextChannel()
}

function keyPressDown() {
  console.log("You pressed the down key");
  // root.innerHTML = "DOWN";
  previousChannel()
}

function keyPressLeft() {
  console.log("You pressed the left key");
  // root.innerHTML = "LEFT";
}

function keyPressRight() {
  console.log("You pressed the right key");
  // root.innerHTML = "RIGHT";
}

function selectItem() {
  console.log("You pressed the enter key");
  // root.innerHTML = "ENTER";
}

function nextChannel() {
  if (channel !== 0) return;
  hls_source = 'https://test-streams.mux.dev/tos_ismc/main.m3u8';
  channel = 1;
  playVideo()
}

function previousChannel() {
  if (channel !== 1) return;
  hls_source = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  channel = 0;
  playVideo()
}