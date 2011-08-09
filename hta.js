/**
 * Hta.js - Security measures for an HTA environment
 *
 */
(function(h) {

    /**
    * Check if we are actually a HTA
    */
    h.isHTA = function() {
        return (document.all && top.document && (top.document.getElementsByTagName('application')[0]));
    };

    /**
    * Check if this is a text input
    */
    h.isText = function(e) {
        return (e.srcElement.type != "text" && e.srcElement.type != "textarea" && e.srcElement.type != "password");
    };

    /**
    * Resize the window to fullscreen (1024x768 always)
    */
    h.fullScreen = function () {
        window.resizeTo(screen.availWidth, screen.availHeight);
    };

    /**
    * Always keep the browser full screen
    */
    h.keepFullScreen = function () {
        var h = this;
        window.onresize = function() {
            h.fullScreen();
        };
    };

    /**
    * Disable right click so users cant copy
    */
    h.noRightClick = function () {
        var h = this;
        document.oncontextmenu = function() {
            return (!h.isText(event));
        };
    };

    /**
    * Disable users dragging things
    */
    h.noDrag = function () {
        document.ondragstart = function() {
            return false;
        };
    };

    /**
    * Disable users selecting text to they can't copy them
    */
    h.noSelect = function () {
        var h = this;
        document.onselectstart = function () {
            return (!h.isText(event));
        };
    };

    /**
    * Unload hijack
    * @param {string} msg optional message.
    */
    h.unloadHijack = function (msg) {
        var message = msg || "Unload being hijacked!";
        window.onunload=function() {
            function unloadHijack() {
                alert(message);
            }
            unloadHijack();
        };
    };

    /**
    * Disable users copying text via shortcuts
    */
    h.noCopy = function () {
        window.onkeydown = function(e) {
            if (e.ctrlKey) {
                return false;
            }
        };
    };

    /**
    * Refresh the page.
    */
    h.periodicRefresh = function() {
        setTimeout(function() {
            window.location = window.location;
        }, 1000*60);
    };

    /**
    * Prevent the dotted outlines from all links.
    */
    h.preventOutlines = function () {
      for (var i in (a = document.getElementsByTagName('a'))) {
          a[i].onmousedown = function() {
              this.hideFocus = true; // ie
          };
          a[i].onmouseout = a[i].onmouseup = function() {
              this.hideFocus = false; // ie
          };
      }
    };

    /*
    * Copy the current url or a message to the clipboard automatically.
    */
    h.copyToClipboard = function (msg) {
        var text = location.href || msg;
        if (window.clipboardData && clipboardData.setData) {
            clipboardData.setData('text', text);
        }
    };

    /**
    * Execute all the hta.js functions
    */
    h.init = function () {
        if (!this.isHTA()) {
            return;
        }
        this.noRightClick();
        this.noDrag();
        this.noSelect();
    };

    return h;
}({})).init();
