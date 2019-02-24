// ToDo: Refactor all this mess into something testable ^^

/** [anonymous function]
 *  Auto-Executed. Encapsulates all the code to avoid console modifications or name collisions
 */
(function () {
  // Configuration
  var COOKIES_LOCALSTORAGE_KEY = 'oswCookies'
  var COOKIES_ACCEPTED_VALUE = 'accepted'
  var COOKIES_NOTICE_ID = 'osw_common__cookies_notice';
  var COOKIES_POLICY_URL = '#';
  var COOKIES_NOTICE_BUTTON_ID = COOKIES_NOTICE_ID + '__button';
  var COOKIES_ADVISE_TEXT = 'Este sitio utiliza cookies propias o/y de terceros para mejorar tu experiencia. Puedes ver cómo y para qué las usamos desde <a href="' + COOKIES_POLICY_URL + '">nuestra política de cookies</a>';
  var COOKIES_ACCEPT_TEXT = 'Acepto';
  var COOKIES_INSERTION_ELEMENT = document.getElementsByTagName('body')[0];

  /** cookieNotice
   *  Checks if cookies have been accepted or not, and render notice if necceesary
   */
  function cookieNotice() {
    var localStorageCookies = window.localStorage.getItem(COOKIES_LOCALSTORAGE_KEY);

    try {     
      if (JSON.parse(localStorageCookies).accepted !== COOKIES_ACCEPTED_VALUE) {
        window.localStorage.removeItem(COOKIES_LOCALSTORAGE_KEY)
        render(COOKIES_INSERTION_ELEMENT);
      }
    } catch (e) {
      window.localStorage.removeItem(COOKIES_LOCALSTORAGE_KEY)
      render(COOKIES_INSERTION_ELEMENT)
    }
  }

  /** render
   *  Create and draw the cookies notice in the screen. Also, call to decorations and listeners
   */
  function render(elem) {
    // Cookies notice text
    var text = document.createElement("span");
    text.innerHTML = COOKIES_ADVISE_TEXT;

    // Accept cookies button
    var button = document.createElement("div");
    button.id = COOKIES_NOTICE_BUTTON_ID;
    button.style.background = '#fff';
    button.style.color = '#333';
    button.style.cursor = 'pointer';
    button.style.display = 'inline-block';
    button.style.padding = '8px';
    button.style.margin = '0 8px';
    button.innerHTML = COOKIES_ACCEPT_TEXT;
    
    // Cookies notice element
    var notice = document.createElement("div");
    notice.id = COOKIES_NOTICE_ID;
    notice.style.position = "fixed";
    notice.style.bottom = "0px";
    notice.style.display = "flex";
    notice.style.justifyContent = 'center';
    notice.style.alignItems = 'center';
    notice.style.left = "0px";
    notice.style.width = "100%";
    notice.style.padding = "16px";
    notice.style.boxSizing = 'border-box';
    notice.style.background = "rgba(0, 0, 0, .8)";
    notice.style.color = "#fff";
    notice.appendChild(text);
    notice.appendChild(button);

    elem.appendChild(notice);

    decorations();
    listeners(elem);
  }

  /** decorations
   *  Add CSS styles to the notice.
   */
  function decorations() {
    var css = '#' + COOKIES_NOTICE_BUTTON_ID + ':hover { background-color: rgba(255, 255, 255, .8) !important; }';
    css += '#' + COOKIES_NOTICE_ID + ' a { color: #7eaeff; }';
    var style = document.createElement('style');

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
  }

  /** listeners
   *  Add button listeners for the 'accept cookies' button
   */
  function listeners() {
    var button = document.getElementById(COOKIES_NOTICE_BUTTON_ID);
    button.addEventListener('click', acceptCookies);
  }

  /** acceptCookies
   *  Store the cookie acception date, and remove the notice
   */
  function acceptCookies() {
    var notice = document.getElementById(COOKIES_NOTICE_ID);
    var acceptedCookies = {
      accepted: COOKIES_ACCEPTED_VALUE, 
      date: new Date()
    };

    // Add localstorage item
    window.localStorage.setItem('oswCookies', JSON.stringify(acceptedCookies));
    // Remove notice element
    COOKIES_INSERTION_ELEMENT.removeChild(notice);
  }

  // Execute code!
  cookieNotice(); 
})()

