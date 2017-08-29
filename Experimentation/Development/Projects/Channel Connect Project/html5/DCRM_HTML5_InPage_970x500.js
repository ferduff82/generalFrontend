var LABEL_REOPEN_CONNECTION = 'Reopen Connection';
var LABEL_CLOSE_CONNECTION = 'Close Connection';
var mobileClientPage =
    'http://checkchannelconnect.eu.pn/mobile_client.html'

// Declaring elements from the HTML.
var container;
var content;
var buttonExit;
var buttonSend;
var buttonOpen;
var buttonConnection;
var labelLink;
var qrCode;
var outputConsole;

var channelConnect;
var hasUserInteracted = false;
var pageUnloaded = false;
var secretKey = '';

function channelReadyHandler() {
  log('Channel Ready');
  connectToChannel();
}

function clickHandler(event) {
  var target = (event.target ? event.target.id : event.srcElement.id);
  switch (target) {
    case 'button-send':
      if (!hasUserInteracted) {
        alert('you need interaction first!!!');
      }
      var message = new studio.innovation.ChannelMessage({
        message: 'Google Rocks!!!',
        name: 'DoubleClick',
        randomNumber: Math.random()});
      channelConnect.sendMessage(message);
      break;
    case 'button-open':
      openMobileClient();
      break;
    case 'button-connection':
      if (buttonConnection.innerText == LABEL_CLOSE_CONNECTION) {
        closeChannel();
      } else if (buttonConnection.innerText == LABEL_REOPEN_CONNECTION) {
        channelConnect.requestChannels(secretKey);
        buttonConnection.disabled = 'disabled';
      }
      break;
    case 'button-exit':
      Enabler.exit('ChannelConnect Template Exit');
      break;
  }
}

function closeChannel() {
  log('Close Channel');
  channelConnect.closeChannel();
  buttonConnection.disabled = 'disabled';
  Enabler.counter('Close Channel');
}

function closeHandler() {
  log('Connection Closed');
  buttonSend.disabled = 'disabled';
  buttonOpen.disabled = 'disabled';
  buttonConnection.disabled = null;
  buttonConnection.innerText = LABEL_REOPEN_CONNECTION;
  Enabler.counter('Channel Closed');
}

function connectToChannel() {
  log('Connect To Channel');
  channelConnect.connectToChannel();
}

function errorHandler(event) {
  log('Error: ' + event.data.description + ' (' + event.data.code + ')');
}

function getMobileClientUrl() {
  return mobileClientPage + '?id=' + channelConnect.getSessionId();
}

function getQrCodeUrl(url) {
  var chartUrl = 'https://chart.googleapis.com/chart?';
  chartUrl += 'chs=150x150&cht=qr&';
  chartUrl += 'chl=' + encodeURI(url);
  return chartUrl;
}

function loadHandler() {
  // Assign All the elements to the element on the page.
  container = document.getElementById('container-dc');
  content = document.getElementById('content-dc');
  buttonExit = document.getElementById('button-exit');
  buttonSend = document.getElementById('button-send');
  buttonOpen = document.getElementById('button-open');
  buttonConnection = document.getElementById('button-connection');
  labelLink = document.getElementById('label-link');
  qrCode = document.getElementById('qr-code');
  outputConsole = document.getElementById('output-console');

  container.style.display = 'block';
  buttonSend.disabled = 'disabled';
  buttonOpen.disabled = 'disabled';
  buttonConnection.disabled = 'disabled';
  addEvent(buttonSend, 'click', clickHandler);
  addEvent(buttonOpen, 'click', clickHandler);
  addEvent(buttonConnection, 'click', clickHandler);
  outputConsole.readOnly = true;

  buttonExit.addEventListener('click', clickHandler, false);
  Enabler.addEventListener(studio.events.StudioEvent.INTERACTION,
                           interactionHandler,
                           false);

  channelConnect = studio.innovation.ChannelConnect.getInstance();
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.CHANNEL_READY,
      channelReadyHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.OPEN,
      openHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.MESSAGE,
      messageHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.ERROR,
      errorHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.CLOSE,
      closeHandler);
  requestChannels(secretKey);
}

function log(message) {
  outputConsole.value += '[Web Client] - ' + message + '\n';
  outputConsole.scrollTop = outputConsole.scrollHeight;
}

function messageHandler(event) {
  var jsonString = event.data.toString().replace('\\n', '');
  log('Message: ' + jsonString);
  console.log(event.data);
  var str = event.data;
  var toStr = str.toString();
  var res = toStr.split(" ");
  console.log(res[1]);
  console.log(res[2]);
  console.log(res[3]);
  var logo = document.getElementById("imgLogo");
      logo.style.webkitTransform = "rotate("+ res[1] +"deg) rotate3d(1,0,0, "+ (res[2]*-1)+"deg)";
      logo.style.MozTransform = "rotate("+ res[1] +"deg)";
      logo.style.transform = "rotate("+ res[1] +"deg) rotate3d(1,0,0, "+ (res[2]*-1)+"deg)";
  var jsonObject = eval('(' + jsonString + ')');
  if (jsonObject.data == 'mobile_client_ready') {
    buttonSend.disabled = null;
  } else if (jsonObject.data == 'mobile_client_unload') {
    buttonSend.disabled = 'disabled';
  }
}

function openMobileClient() {
  if (channelConnect.isConnected()) {
    window.open(
        getMobileClientUrl(),
        'mobile_client',
        'location=1,status=1,menubar=1,resizable=1,width=370,height=250');
  }
}

function openHandler() {
  log('Channel Connected');
  buttonOpen.disabled = null;
  buttonConnection.disabled = null;
  buttonConnection.innerText = LABEL_CLOSE_CONNECTION;

  var longUrl = mobileClientPage + '?id=' + channelConnect.getSessionId();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = eval('(' + xhr.responseText + ')');
      qrCode.src = getQrCodeUrl(response.id);
      labelLink.innerText = response.id;
    }
  };
  xhr.open('GET',
           'https://dcrmstrat-channelconnect.appspot.com/shorten/?url=' +
           escape(longUrl),
           true);
  xhr.send();
  Enabler.counter('Connected To Channel');
}

function requestChannels(secretKey) {
  if (!channelConnect.isConnected()) {
    log('Get Channel');
    channelConnect.requestChannels(secretKey);
    Enabler.counter('Request Channel');
  }
}

function unloadHandler() {
  if (!pageUnloaded) {
    pageUnloaded = true;
    channelConnect.closeChannel();
  }
}

function interactionHandler(event) {
  hasUserInteracted = true;
}

// ----------------------------------------------------------------------------
// Utility methods
// ----------------------------------------------------------------------------
/**
 * Registers an event handler function (event listener) for the specified
 * event on a target object.
 * @param {Object} object Event source.
 * @param {string} eventType Specifies the name of the event to listen for.
 * @param {Function} handler Represents the event listener function to be called
 *     when the event occurs.
 * @return {boolean} 'true' if the 'handler' function has been attached to the
 *     'eventType' event; 'false' if failed to attach.
 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
 * @see http://msdn.microsoft.com/en-us/library/ms536343(VS.85).aspx
 */
var addEvent = function(object, eventType, handler) {
  if (object.addEventListener) {
    // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
    // version 9).
    object.addEventListener(eventType, handler, false);
    return true;
  } else if (object.attachEvent) {
    // Opera and Explorer (version < 9).
    return object.attachEvent('on' + eventType, handler);
  } else {
    return false;
  }
};

/**
 * Unregisters an event handler function (event listener) for the specified
 * event on a target object.
 * @param {Object} object Event source.
 * @param {string} eventType Specifies the name of the event to listen for.
 * @param {Function} handler Represents the event listener function to be called
 *     when the event occurs.
 * @return {boolean} 'true' if the 'handler' function has been attached to the
 *     'eventType' event; 'false' if failed to attach.
 * @see https://developer.mozilla.org/en/DOM/element.removeEventListener
 * @see http://msdn.microsoft.com/en-us/library/ms536411(VS.85).aspx
 */
var removeEvent = function(object, eventType, handler) {
  if (object.removeEventListener) {
    // Firefox, Google Chrome and Safari (and Opera and Internet Explorer from
    // version 9).
    object.removeEventListener(eventType, handler, false);
    return true;
  } else if (object.detachEvent) {
    // Opera and Explorer (version < 9).
    return object.detachEvent('on' + eventType, handler);
  } else {
    return false;
  }
};

/**
 * Gets a query string parameter by name.
 * @param name Parameter name.
 * @returns Parameter value.
 */
var getParameter = function(name) {
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  var pattern = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(pattern);
  var results = regex.exec(window.location.href);
  if (results == null) {
    return '';
  } else {
    return results[1];
  }
};

addEvent(window, 'load', loadHandler);
//addEvent(window, 'unload', unloadHandler);
//addEvent(window, 'beforeunload', unloadHandler);
//addEvent(window, 'pagehide', unloadHandler);
