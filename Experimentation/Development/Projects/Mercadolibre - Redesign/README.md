# mobileCore
Cordova mobile app to get started.<br/>

Install Node packages
<pre>npm install</pre>
In case you need to work behing a proxy Run:
<pre>git config --global url."https://".insteadOf git://</pre>
(make sure you have installed GIT)<br/><br/>
Install Bower dependencies
<pre>bower install</pre>
<h5>Builds the project on browser and open port to work on Livereload</h5>
<pre>grunt</pre>
To Add an android/IOS platform to your project
<pre>cordova platform add android/IOS</pre>
<h5>Builds the project on mobile device</h5>
<pre>cordova run android</pre>
<strong>Important:</strong>
This Core project uses Angular as JS framework, if Backbone is what you need then use the <strong>mobileCore/Backbone</strong> core project.
