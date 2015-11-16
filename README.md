# Home Mirror

> Web-based home mirror, inspired by [Hannah Mitt's project](https://github.com/HannahMitt/HomeMirror).

![](https://cldup.com/LJ6cSwHEjW.png)

![](https://cldup.com/DNBM8NSBSD.png)

## Install

1. [Install Meteor](https://www.meteor.com/install)
2. Clone this repo

    ```
    $ git clone git@github.com:lambtron/homemirror.git
    ```

3. Deploy to Meteor

    ```
    $ meteor deploy <your-name-here>.meteor.com
    ```

4. Point your tablet to the URL and enable Kiosk mode
5. Follow [Hannah Mitt's tutorial](https://github.com/HannahMitt/HomeMirror) for physically building the mirror or [mine below](#hardware)

## Customize

I decided to use Meteor for its real-time nature and ability to organize server and client side JavaScript in the same file.

Every "widget" on the screen can be found in the [`./widgets`](https://github.com/lambtron/homemirror/tree/master/widgets) folder. Let's look at the [`time`](https://github.com/lambtron/homemirror/tree/master/widgets/time) widget as an example:

1. Create the folder `time` with `./time/index.html` and `./time/index.js`

2. Define the `time` template in [`index.html`](https://github.com/lambtron/homemirror/blob/master/widgets/time/index.html)

    ```
    <template name="time">
      <div style="font-size: 3em">
        {{time}}
      </div>
    </template>
    ```

3. Define the logic for rendering the `time` template in [`index.js`](https://github.com/lambtron/homemirror/blob/master/widgets/time/index.js)

    ```
    if (Meteor.isClient) {
      Template.time.helpers({
        time: function() {
          return Chronos.liveMoment().format("hh:mma");
        }
      });
    }
    ```

4. Add the `time` template to [`./client/index.html`](https://github.com/lambtron/homemirror/blob/master/client/index.html#L7)

    ```
    <head>
      <title>Mirror</title>
    </head>

    <body>
      {{> date}}
      {{> time}}
      {{> weather}}
      {{> news}}
    </body>
    ```

Have fun!

## Hardware

I followed [Hannah's guide](https://github.com/HannahMitt/HomeMirror) pretty closely.

### Items

- 12 inch by 18 inch by 1/8 inch two way mirror from [TAP Plastics](http://www.tapplastics.com/product/plastics/cut_to_size_plastic/two_way_mirrored_acrylic/558)
- 7 inch used Samsung Galaxy Tab
- [12 inch by 18 inch black construction paper, 50 sheets](http://www.amazon.com/gp/product/B000F7ASAU)
- [Two-sided adhesive strips](http://www.amazon.com/gp/product/B0084M68IO)
- [3M General Purpose 4S Spray Adhesive](http://www.amazon.com/gp/product/B000PCWRMC)

### Directions

#### 1. Cut a hole in the black construction paper for the device's viewport

Make sure the size of the hole that you are cutting is the size of the device's _viewport_ and not the size of the device itself. You're going to put the two-sided adhesives along the edge of the construction paper that will stick to the device's bevel.

#### 2. Glue the construction paper onto the back of the mirror

Use the spray adhesive at about 6-8 inches away from the construction paper. Don't get the construction paper too wet. After several seconds, slowly stick the sprayed side onto the back side of the mirror.

#### 3. Add adhesive strips to the back of the construction paper around the edge of the device's viewport cutout

#### 4. Set the device up.. last chance to touch your device!

The two (free) apps I needed to download were:
- [Stay Alive!](https://play.google.com/store/apps/details?id=com.synetics.stay.alive&hl=en): for preventing the device from sleeping
- [Kiosk Browser](http://appcrawlr.com/android/kiosk-browser-2): so that you can set the browser to the Home Mirror web app in full screen mode (probably not even necessary, but this is my first Android device and I struggled with even the most basic navigation)

Set the Kiosk Browser to point to your Home Mirror web app domain.

#### 5. Stick the device onto the two-way adhesive strips

Voila!

---

If the final product is facing the ground, this is how and where the pieces fit together:

![](http://i.imgur.com/KXqUMOI.jpg)

The completed mirror:

![](http://i.imgur.com/IxgfxQx.jpg)

## License (MIT)

```
WWWWWW||WWWWWW
 W W W||W W W
      ||
    ( OO )__________
     /  |           \
    /o o|    MIT     \
    \___/||_||__||_|| *
         || ||  || ||
        _||_|| _||_||
       (__|__|(__|__|
```

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
