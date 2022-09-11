# Audio Element Tests in WebKit

According to [W3C](https://www.w3.org/TR/html5/embedded-content-0.html#the-audio-element), the audio element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the source element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.

Furthermore, the specification states clearly that the audio element has a src attribute, which is a URL that points to the resource to use. The URL can use the Blob URL scheme to refer to a Blob object.

The following HTML variants should all be valid and render and behave equally (although the internal implementation may differ):

```html
<p>Fails in Safari
<audio controls src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav"></audio></p>

<p>Fails in Safari
<audio controls src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav"><source src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav" /></audio></p>

<p>Works in Safari
<audio controls><source src="573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav" /></audio></p>

```
When using plain HTML as shown above, everything works. 

As I was still experiencing issues when doing the above with pure JavaScript, I implemented [the following test page](https://tedsecretsource.github.io/sound-test/src/tests/sound-test.html) to experiment.

Now that I've managed to get it working even in plain JavaScript, I've moved that code to the main `App.tsx` file, and it still works!

While re-reading my notes, I realized that this new code was different depending on the browser. As my goal with all code is to write browser independent code, I started removing some of the vairables, the mimetype in particular, and that's when I discovered the anomaly.

Specifically, Safari requires the mimetype to be set to something valid when creating a new `Blob` object, and it must be one of the [supported MIME types](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers) for Safari browser (if the user is using Safari). It cannot be an empty string (the default) or it won't work.

If you want to play around with this repo and prove it for yourself, simply clone this repo and change line 45 of `App.tsx` to:

```javascript
recordedDataBlob = new Blob(stream) // note we've removed the second parameter
```

To test, `yarn start` and then open the app in Safari. Click the start button to record some audio, and then the stop button to stop recording. You should see the audio element, but it will not play and will say "Error" in it.

[Here is a link to the actual tests mentioned above](https://tedsecretsource.github.io/sound-test/src/tests/sound-test.html)

### Notes

- [Audio Source for this test](https://freesound.org/people/MSXP/sounds/573840/)
