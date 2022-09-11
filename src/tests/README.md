# Audio Element Tests in WebKit

According to [W3C](https://www.w3.org/TR/html5/embedded-content-0.html#the-audio-element), the audio element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the source element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.

Furthermore, the specification states clearly that the audio element has a src attribute, which is a URL that points to the resource to use. The URL can use the Blob URL scheme to refer to a Blob object.

In Safari 15.3, however, including the src attribute on the audio element, regardless of its value, causes the audio element to be rendered with the word Error in the middle of the element. This is not the case in Chrome, Firefox, or Edge.

The following HTML variants should all be valid and render and behave equally (although the internal implementation may differ):

```html
<p>Fails in Safari
<audio controls src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav"></audio></p>

<p>Fails in Safari
<audio controls src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav"><source src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav" /></audio></p>

<p>Works in Safari
<audio controls><source src="573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav" /></audio></p>

```
<p>Fails in Safari
<audio controls src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav"></audio></p>

<p>Fails in Safari
<audio controls src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav"><source src="./573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav" /></audio></p>

<p>Works in Safari
<audio controls><source src="573840__msxp__jazz-bar-people-ambience-la-fontaine-copenhagen.wav" /></audio></p>


### Notes

- [Audio Source for this test](https://freesound.org/people/MSXP/sounds/573840/)