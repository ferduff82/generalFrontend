/**
 * @fileoverview Business logic for 'mobile_client.html' view.
 */

var channelConnect;
var sessionId;
var buttonSend;
var inputMessage;
var outputConsole;
var pageUnloaded = false;

function loadHandler() {
  buttonSend = document.getElementById('button-send');
  inputMessage = document.getElementById('input-message');
  outputConsole = document.getElementById('output-console');

  //addEvent(buttonSend, 'click', clickHandler);

  outputConsole.readOnly = true;

  channelConnect = studio.innovation.ChannelConnect.getInstance();
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.CHANNEL_READY,
      channelReadyHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.OPEN, openHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.MESSAGE, messageHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.ERROR, errorHandler);
  channelConnect.addEventListener(
      studio.innovation.ChannelEvent.CLOSE, closeHandler);
  channelConnect.getMobileChannel(getParameter('id'));
}
/*
function unloadHandler() {
  if (!pageUnloaded) {
    pageUnloaded = true;
    channelConnect.sendMessage(
        new studio.innovation.ChannelMessage('mobile_client_unload'));
  }
}
*/
function channelReadyHandler() {
  log('Channel Ready');
  channelConnect.connectToChannel();
}

function openHandler() {
  log('Channel Connected');
  channelConnect.sendMessage(
      new studio.innovation.ChannelMessage('mobile_client_ready'));
}

function messageHandler(event) {
  var jsonString = event.data.toString().replace('\\n', '');
  var jsonObject = eval('(' + jsonString + ')');
  log('Message Received:' + jsonString);
}

function errorHandler(event) {
  var error = event.data;
  log('Error: ' + error.description + ' (' + error.code + ')');
}

function closeHandler() {
  log('Connection Closed');
}

function clickHandler(eventData) {

  if (window.DeviceOrientationEvent) {

      // gamma is the left-to-right tilt in degrees, where right is positive
      var tiltLR = eventData.gamma;

      // beta is the front-to-back tilt in degrees, where front is positive
      var tiltFB = eventData.beta;

      // alpha is the compass direction the device is facing in degrees
      var dir = eventData.alpha

  } else {
    document.getElementById("doEvent").innerHTML = "Not supported."
  }

  var message =
      new studio.innovation.ChannelMessage(" "+ tiltLR +" "+ tiltFB +" "+ dir);
  channelConnect.sendMessage(message);
}

function log(message) {
  outputConsole.value += '[Mobile Client] - ' + message + '\n';
  outputConsole.scrollTop = outputConsole.scrollHeight;
}

/**
 * Gets a query string parameter by name.
 * @param name Parameter name.
 * @returns Parameter value.
 */
function getParameter(name) {
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  var pattern = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(pattern);
  var results = regex.exec(window.location.href);
  if (results == null) {
    return '';
  } else {
    return results[1];
  }
}

//-----------------------------------------------------------------------------
//Utility methods
//-----------------------------------------------------------------------------
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

addEvent(window, 'load', loadHandler);
//addEvent(window, 'unload', unloadHandler);
//addEvent(window, 'beforeunload', unloadHandler);
//addEvent(window, 'pagehide', unloadHandler);
addEvent(window, 'deviceorientation' , clickHandler);