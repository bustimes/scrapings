/*v12.7.7 - 04-09-26 - 09:32 GMT+1*/function AFM_getParameterByName(t, e) {
  e ||= window.location.href;
  t = t.replace(/[\[\]]/g, "\\$&");
  var i = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
  if (i) {
    if (i[2]) {
      return decodeURIComponent(i[2].replace(/\+/g, " "));
    } else {
      return "";
    }
  } else {
    return null;
  }
}
function AFMpageManager() {
  function t(t, e) {
    if (e !== undefined) {
      try {
        return top.document.getElementsByClassName(t)[e];
      } catch (t) {}
    } else {
      try {
        return top.document.getElementById(t);
      } catch (t) {}
    }
  }
  if (window.location.pathname.length <= 1) {
    this.path = ["home"];
  } else {
    AM_urlTruncatedDot = window.location.pathname.split(".")[0];
    this.path = AM_urlTruncatedDot.split("/");
    this.path.shift();
    if (this.path[this.path.length - 1] == "") {
      this.path.pop();
    }
  }
  this.protocol = window.location.protocol;
  this.domain = window.location.host;
  this.getPageType = function () {
    if (this.path[0] === "home") {
      return "home";
    } else if (this.path[0] === "regions" && this.path.length === 2) {
      return "regions";
    } else if (this.path[0] === "operators" && this.path.length === 2) {
      return "operators";
    } else if (this.path[0] === "services" && this.path.length === 2) {
      return "services";
    } else if (this.path[0] === "stops" && this.path.length === 2) {
      return "stops";
    } else if (this.path[0] === "stations" && this.path.length === 2) {
      return "stations";
    } else if (this.path[0] === "areas" && this.path.length === 2) {
      return "areas";
    } else if (this.path[0] === "districts" && this.path.length === 2) {
      return "districts";
    } else if (this.path[0] === "localities" && this.path.length === 2) {
      return "localities";
    } else if (this.path[0] === "search") {
      return "searchResults";
    } else if (this.path[0] === "trips" && this.path.length === 2) {
      return "trips";
    } else if (this.path[0] === "map" && this.path.length === 1) {
      return "map";
    } else if (this.path[0] === "services" && this.path.length === 3 && this.path[2] === "vehicles") {
      return "serviceVehicles";
    } else if (this.path[0] === "vehicles" && this.path.length === 3 && this.path[2] === "tfl") {
      return "trackedVehicle";
    } else if (this.path[0] === "vehicles" && this.path.length === 2) {
      return "vehicles";
    } else if (this.path[0] === "registrations" && this.path.length === 3) {
      return "registrations";
    } else if (this.path[0] === "licences" && this.path.length === 2) {
      return "licences";
    } else if (this.path[0] === "vehicles" && this.path.length === 3 && this.path[2] === "history") {
      return "vehicleHistory";
    } else if (this.path[0] === "accounts" && this.path.length === 2) {
      return "accountLogin";
    } else if (this.path[0] === "accounts" && this.path.length === 3 && this.path[1] === "users") {
      return "userActivity";
    } else if (this.path[0] === "operators" && this.path.length === 3 && this.path[2] === "map") {
      return "operatorMap";
    } else if (this.path[0] === "operators" && this.path.length === 3 && this.path[2] === "vehicles") {
      return "operatorVehicles";
    } else if (this.path[0] === "contact" && this.path.length === 1) {
      return "contact";
    } else if (this.path[0] === "data" && this.path.length === 1) {
      return "data";
    } else if (this.path[0] === "cookies" && this.path.length === 1) {
      return "cookies";
    } else {
      return "default";
    }
  };
  this.pageType = this.getPageType();
  this.insertAfter = function (t, e) {
    try {
      e.parentNode.insertBefore(t, e.nextSibling);
    } catch (t) {}
  };
  this.insertBefore = function (t, e) {
    try {
      e.parentNode.insertBefore(t, e);
    } catch (t) {}
  };
  this.getRandomInt = function (t, e) {
    t = Math.ceil(t);
    e = Math.floor(e);
    return Math.floor(Math.random() * (e - t + 1) + t);
  };
  this.waitForElement = function (t) {
    return new Promise(function (e, i) {
      var s = document.querySelector(t);
      if (s) {
        e(s);
      } else {
        var n = new MutationObserver(function (i) {
          i.forEach(function (i) {
            for (var s = Array.from(i.addedNodes), a = 0; a < s.length; a++) {
              if (s[a].matches && s[a].matches(t)) {
                n.disconnect();
                e(s[a]);
                return;
              }
            }
          });
        });
        n.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
    });
  };
  this.generateAdOfSizeAndStyle = function (t, e, i, s) {
    const n = top.document.createElement("div");
    if (t) {
      n.setAttribute("id", t);
    }
    if (e) {
      n.setAttribute("style", e);
    }
    if (i) {
      if (Array.isArray(i)) {
        i.forEach(function (t) {
          n.classList.add(t);
        });
      } else {
        n.classList.add(i);
      }
    }
    if (s && typeof s == "string") {
      n.innerHTML = s;
      n.setAttribute("id", t + "_container");
    }
    return n;
  };
  this.insertAd = function (e) {
    const i = e.injectMap[this.getPageType()] || e.injectMap.all;
    e.divRef = this.generateAdOfSizeAndStyle(e.name, i[1], i[5] !== undefined && i[5], i[6] !== undefined && i[6]);
    var s = 0;
    if (i[4] === undefined || i[4] === false) {
      s = e.name !== "AFM_sidebarSticky_ad" ? t(i[2][0], i[2][1]) : t(i[2][0], i[2][1]).children[t("col col-12 col-md-4 sidebar", 0).childElementCount - 1];
    } else if (i[4] === true) {
      s = t(i[2][0], i[2][1]).children[function (e, i) {
        var s = 0;
        for (var n = 2; n > 0; n--) {
          if (t(e, i).children[n].firstElementChild === null) {
            s = n;
            break;
          }
        }
        return s;
      }(i[2][0], i[2][1])];
    }
    try {
      if (i[3] && typeof i[3] == "boolean") {
        s = s.firstChild;
      } else if (i[3] && typeof i[3] == "number") {
        s = s.children[i[3]];
      }
      this[i[0]](e.divRef, s);
      if (!e.disableLazyLoad) {
        e.lazyLoad();
      }
    } catch (t) {}
  };
  this.setResizeBreaks = function () {
    var t = [];
    var e = [];
    adUnits.AFMforEach(function (e) {
      if (e.gptSlot || e.injectMap) {
        e.slotSizeMap.forEach(function (e) {
          t.push(e[0][0]);
        });
      }
    });
    (t = t.filter(function (t, e, i) {
      return i.indexOf(t) === e;
    })).sort(function (t, e) {
      return t - e;
    });
    t.shift();
    t.unshift(t[0] - 1);
    i = 0;
    for (; i < t.length; i++) {
      if (i === 0) {
        e.push(window.matchMedia("(max-width: " + t[i] + "px)"));
      } else if (i === t.length - 1) {
        e.push(window.matchMedia("(min-width: " + t[i] + "px)"));
      } else {
        e.push(window.matchMedia("(min-width: " + t[i] + "px) and (max-width: " + (t[i + 1] - 1) + "px)"));
      }
      t[i];
    }
    var s = 0;
    function n() {
      clearTimeout(s);
      s = 0;
      refreshAds("windowResize");
    }
    e.forEach(function (t) {
      t.addListener(function (t) {
        if (t.matches) {
          if (s) {
            clearTimeout(s);
          }
          s = 0;
          s = setTimeout(n, 1500);
        }
      });
    });
  };
  this.isMobile = function () {
    try {
      return !!/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent);
    } catch (t) {}
  };
  this.relocateAd = function (e, i, s, n, a) {
    this.waitForElement("#" + e).then(function (r) {
      adUnits[e].divRef = r;
      if (typeof s == "string") {
        s = t(s);
      }
      AFM_page[i](adUnits[e].divRef, s);
      if (a) {
        adUnits[e].divRef.outerHTML = a;
      }
      if (n) {
        adUnits[e].divRef.setAttribute("style", n);
      }
    });
  };
  this.insertPrivSet = function () {
    this.waitForElement("#elFooterLinks").then(function (t) {
      var e = top.document.createElement("li");
      e.setAttribute("id", "privacySettings");
      e.setAttribute("style", "cursor:pointer");
      e.innerHTML = "<a>Privacy Settings</a>";
      t.appendChild(e);
      e.onclick = function () {
        window.__tcfapi("displayConsentUi", 2, function () {});
      };
    });
  };
  this.insertFootMargin = function () {
    t("ipsLayout_footer").style.marginBottom = "100px";
  };
}
var AFM_page = new AFMpageManager();
function getPageURLForPrebid() {
  let t = window.location.href;
  try {
    const e = document.querySelector("head link[rel=\"canonical\"]");
    if (e && e.href) {
      t = e.href;
    }
  } catch (t) {}
  return t;
}
function getContentTitleForPrebid(t = " - eFestivals") {
  let e = "";
  try {
    const i = document.querySelector("head title");
    if (i && i.textContent) {
      e = i.textContent.trim();
    } else if (document.title) {
      e = document.title.trim();
    }
    if (t && e.endsWith(t)) {
      e = e.substring(0, e.length - t.length).trim();
    }
  } catch (t) {}
  return e;
}
{
  const t = {
    complete: 1,
    ver: "1.0",
    nodes: [{
      asi: "adfirst.media",
      sid: "031",
      hp: 1
    }]
  };
  var pbDebugStatus = !!AFM_getParameterByName("pbdebug");
  if (AFM_getParameterByName("testpage")) {
    AFM_page.path.push(AFM_getParameterByName("testpage"));
  }
  var missHeadTest = false;
  function insertGE() {
    window.grumi = {
      key: "743a63be-4391-4edf-b398-4749ac9e681e"
    };
    var t = document.createElement("script");
    t.async = true;
    t.type = "text/javascript";
    t.src = "https://rumcdn.geoedge.be/743a63be-4391-4edf-b398-4749ac9e681e/grumi-ip.js";
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(t, e);
  }
  if (AFM_getParameterByName("missHeadTest")) {
    missHeadTest = true;
  }
  insertGE();
  (function () {
    var t = document.createElement("script");
    t.async = true;
    t.type = "text/javascript";
    t.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    var e = document.getElementsByTagName("script")[0];
    e.parentNode.insertBefore(t, e);
  })();
  (function (t, e, i, s, n, a, r) {
    function d(i, s) {
      e[t]._Q.push([i, s]);
    }
    if (!e[t]) {
      e[t] = {
        init: function () {
          d("i", arguments);
        },
        fetchBids: function () {
          d("f", arguments);
        },
        setDisplayBids: function () {},
        targetingKeys: function () {
          return [];
        },
        _Q: []
      };
      (a = i.createElement(s)).async = true;
      a.src = "https://c.amazon-adsystem.com/aax2/apstag.js";
      (r = i.getElementsByTagName(s)[0]).parentNode.insertBefore(a, r);
    }
  })("apstag", window, document, "script");
  apstag.init({
    pubID: "e0d916db-618d-4b79-a74c-cc9f1c34c4bc",
    adServer: "googletag",
    isSelfServePub: true,
    simplerGPT: true,
    schain: t
  });
  (function () {
    var t = document.createElement("script");
    t.type = "text/javascript";
    t.async = true;
    t.src = "https://ap.lijit.com/www/sovrn_beacon_standalone/sovrn_standalone_beacon.js?iid=13405474";
    t.id = "sBeacon";
    var e = document.getElementsByTagName("head")[0];
    e.insertBefore(t, e.firstChild);
  })();
  (function () {
    var t = document.createElement("script");
    t.type = "text/javascript";
    t.async = true;
    t.src = "https://csync.smilewanted.com?zoneCode=adfirstmedia.com_hb_display";
    var e = document.getElementsByTagName("head")[0];
    e.insertBefore(t, e.firstChild);
  })();
  (function () {
    var t = document.createElement("script");
    t.type = "text/javascript";
    t.async = true;
    t.src = "https://cdn.adfirst.media/hb/pb_11260_bta.js";
    var e = document.getElementsByTagName("head")[0];
    e.insertBefore(t, e.firstChild);
  })();
  var googletag = googletag || {};
  function afm_bidTimeout() {
    if (adAutorefreshCounter < 2) {
      return 1500;
    } else {
      return 3000;
    }
  }
  googletag.cmd = googletag.cmd || [];
  googletag.cmd.push(function () {
    googletag.pubads().disableInitialLoad();
  });
  Object.defineProperty(Object.prototype, "AFMforEach", {
    value: function (t, e) {
      if (this == null) {
        throw new TypeError("Not an object");
      }
      e = e || window;
      for (var i in this) {
        if (this.hasOwnProperty(i)) {
          t.call(e, this[i], i, this);
        }
      }
    }
  });
  var afm_limitedAds = true;
  var afm_limitedAdsActive = false;
  var AFMnetworkCode = "1269065";
  var childNetworkCode = "24087856";
  var siteGptPath = "/PUB031_BusTimes/PUB031_BusTimes_";
  var AMhouseColour = "#FFFF9E";
  var originalBidCSS = "font-weight: bold;";
  var makeNet85 = 0.85;
  var makeNet86 = 0.86;
  var usdRate = 0.7383;
  var euroRate = 0.8594;
  var adAutorefreshEnabled = 1;
  var adAutorefreshCounter = 1;
  var fruitlessRefreshAttempt = 0;
  var fruitlessRefreshLimit = 60;
  var globalAdRefreshLimit = 100;
  var AMfooterOn = true;
  window.innerWidth;
  var lazyLoadOffset = 700;
  function AuctionObject(t, e, i, s, n) {
    this.type = t;
    this.name = e;
    this.status = i;
    this.autorefresh = s;
    this.refreshWhenWindowResized = n;
  }
  function AdUnit(t, e, i, s, n, a, r, d) {
    AuctionObject.call(this, "adunit", t, e, i, s);
    this.refreshLimit = n;
    this.refreshCounter = 0;
    this.dismissed = false;
    this.divRef = e;
    this.gptSlot = false;
    this.slotSizeMap = [];
    this.pageType = a;
    this.adUnitPath = r;
    this.injectMap = d || false;
  }
  AuctionObject.prototype.setStatus = function (t) {
    this.status = t;
  };
  AuctionObject.prototype.getStatus = function () {
    if (this.type === "bidder") {
      return this.status;
    } else if (this.type === "adunit") {
      return "adUnitLive-" + (this.status === "live" || this.status === "dormant");
    } else {
      return undefined;
    }
  };
  AuctionObject.prototype.isActive = function () {
    if (this.type === "bidder") {
      return this.status === "active";
    } else if (this.type === "adunit") {
      return this.status;
    } else {
      return undefined;
    }
  };
  AuctionObject.prototype.willAutorefresh = function () {
    return this.autorefresh;
  };
  AuctionObject.prototype.setAutorefresh = function (t) {
    this.autorefresh = t;
  };
  AuctionObject.prototype.willRefreshWithWindowResize = function () {
    return this.refreshWhenWindowResized;
  };
  AuctionObject.prototype.setRefreshWithWindowResize = function (t) {
    this.refreshWhenWindowResized = t;
  };
  AuctionObject.prototype.determineStatusForRefresh = function (t) {
    if ((this.status !== "active" || t !== "auto" || this.autorefresh) && (this.status !== "active" || t !== "windowResize" || this.refreshWhenWindowResized)) {
      if (this.type === "bidder" && this.status === "active" && t === "windowResize") {
        if (!this.autorefresh) {
          this.status = "inactive";
        }
      }
    } else {
      this.status = "inactive";
    }
  };
  AdUnit.prototype = Object.create(AuctionObject.prototype);
  Object.defineProperty(AdUnit.prototype, "constructor", {
    value: AdUnit,
    enumerable: false,
    writable: true
  });
  AdUnit.prototype.adExistsInDom = function () {
    return !!this.divRef;
  };
  AdUnit.prototype.updateAdInDomStatus = function () {
    if (this.divRef != 0) {
      this.divRef = document.getElementById(this.name);
      if (this.adHidden()) {
        this.status = false;
      }
    }
    return !!this.divRef;
  };
  AdUnit.prototype.adHidden = function () {
    return !this.divRef || this.name !== "AFM_stickyFooter_ad" && (window.getComputedStyle(this.divRef).display === "none" || window.getComputedStyle(this.divRef).visibility === "hidden");
  };
  AdUnit.prototype.setGptSlot = function (t) {
    return this.gptSlot = t;
  };
  AdUnit.prototype.adHorizontalAlign = function (t) {
    if (this.adExistsInDom()) {
      this.divRef.style.textAlign = t;
    }
  };
  AdUnit.prototype.getRefreshLimit = function () {
    return this.refreshLimit;
  };
  AdUnit.prototype.getRefreshCount = function () {
    return this.refreshCounter;
  };
  AdUnit.prototype.incrementRefreshCounter = function () {
    this.refreshCounter++;
    if (this.refreshCounter === this.refreshLimit) {
      this.autorefresh = false;
    }
    if (this.refreshCounter > 10) {
      return "beyond10";
    } else {
      return this.refreshCounter;
    }
  };
  AdUnit.prototype.hasBeenDismissed = function () {
    return this.dismissed;
  };
  AdUnit.prototype.getSizes = function () {
    var t = window.innerWidth;
    var e = [];
    if (this.slotSizeMap.length > 0) {
      for (i = 0; i < this.slotSizeMap.length; i++) {
        if (t > this.slotSizeMap[i][0][0]) {
          e = this.slotSizeMap[i][1].length > 0 ? this.slotSizeMap[i][1] : [[0, 0]];
          break;
        }
      }
    }
    return e;
  };
  AdUnit.prototype.inSizeBracket = function () {
    return this.slotSizeMap.length > 0 && !!this.getSizes()[0][0];
  };
  AdUnit.prototype.foldOffset = function () {
    if (this.divRef) {
      return this.divRef.getBoundingClientRect().top - window.innerHeight;
    }
  };
  AdUnit.prototype.gptAssign = function () {
    var t = this;
    assignGptSlot(t, function () {
      fetchHeaderBids([t.gptSlot], typeof t.prebidAdUnit == "function" ? [t.prebidAdUnit()] : [], afm_bidTimeout(), false, ["active", "adUnitLive-true", stdAds], "lazy");
    });
  };
  AdUnit.prototype.lazyLoad = function () {
    var t = false;
    var e = this;
    window.addEventListener("scroll", function (i) {
      if (e.foldOffset() < lazyLoadOffset && !t) {
        this.removeEventListener("scroll", arguments.callee, false);
        t = true;
        e.gptAssign();
      }
    });
  };
  AdUnit.prototype.addClass = function (t) {
    if (t) {
      if (Array.isArray(t)) {
        t.forEach(function (t) {
          this.divRef.classList.add(t);
        });
      } else {
        this.divRef.classList.add(t);
      }
    }
  };
  var adUnits = {
    AFM_stickyFooter_ad: new AdUnit("AFM_stickyFooter_ad", true, true, true, globalAdRefreshLimit, ["all"], "1x1"),
    AFM_inContentTop_ad: new AdUnit("AFM_inContentTop_ad", true, true, true, globalAdRefreshLimit, ["home", "areas", "regions", "localities", "operators", "searchResults", "services", "stops", "stations", "operatorVehicles"], "unit1")
  };
  adUnits.AFM_stickyFooter_ad.slotSizeMap = [[[985, 100], [[1, 1], [970, 90], [728, 90], [468, 60], [320, 100], [320, 50], [300, 50]]], [[749, 100], [[1, 1], [728, 90], [468, 60], [320, 100], [320, 50], [300, 50]]], [[483, 100], [[1, 1], [468, 60], [320, 100], [320, 50], [300, 50]]], [[335, 0], [[1, 1], [320, 100], [320, 50], [300, 50]]], [[0, 0], [[1, 1], [300, 50]]]];
  adUnits.AFM_inContentTop_ad.slotSizeMap = [[[970, 100], [[970, 90], [728, 90], [468, 60], [320, 100], [320, 50], [300, 50]]], [[728, 100], [[728, 90], [468, 60], [320, 100], [320, 50], [300, 50]]], [[468, 100], [[468, 60], [320, 100], [320, 50], [300, 50]]], [[320, 100], [[320, 100], [320, 50], [300, 50]]], [[0, 0], [[300, 50]]]];
  var gptAdSlots = [];
  function AFM_generateNetworkCode() {
    if (AFM_page.domain.includes("bustimes")) {
      return AFMnetworkCode.concat(",", childNetworkCode);
    } else {
      adAutorefreshEnabled = 0;
      return AFMnetworkCode;
    }
  }
  var AFMprocessedNetworkCode = AFM_generateNetworkCode();
  function assignGptSlot(t, e) {
    googletag.cmd.push(function () {
      let i = JSON.parse(JSON.stringify(t.slotSizeMap));
      if (!t.name.includes("Footer")) {
        i.forEach(function (t) {
          t[1].push("fluid");
        });
      }
      gptAdSlots.push(t.setGptSlot(googletag.defineSlot("/" + AFMprocessedNetworkCode + siteGptPath + t.adUnitPath, [1, 1], t.name).defineSizeMapping(i).setCollapseEmptyDiv(true).addService(googletag.pubads())));
      if (typeof e == "function") {
        e();
      }
    });
  }
  var afm_deleteThese = [];
  adUnits.AFMforEach(function (t) {
    if (t.status === true && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && !t.injectMap) {
      assignGptSlot(t);
      t.status = "live";
    } else if (t.status === "dormant" && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && !t.injectMap) {
      t.lazyLoad();
    } else if (t.status === "dormant" && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && t.injectMap) {
      AFM_page.insertAd(t);
    } else if (t.status === true && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && t.injectMap && t.disableLazyLoad) {
      assignGptSlot(t);
      t.status = "live";
      AFM_page.insertAd(t);
    } else if (!t.status || !t.pageType.includes(AFM_page.pageType) && !t.pageType.includes("all")) {
      afm_deleteThese.push(t.name);
    }
  });
  googletag.cmd.push(function () {
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs(true, true);
    googletag.pubads().setTargeting("protocol", AFM_page.protocol).setTargeting("domain", AFM_page.domain).setTargeting("path", AFM_page.path).setTargeting("impression_type", "first").setTargeting("page_type", AFM_page.getPageType());
    googletag.enableServices();
  });
  var bidders = {
    adagio: new AuctionObject("bidder", "adagio", "active", true, true),
    adtelligent: new AuctionObject("bidder", "adtelligent", "active", true, true),
    amazon: new AuctionObject("bidder", "amazon", "active", true, true),
    conversant: new AuctionObject("bidder", "conversant", "active", true, true),
    gumgum: new AuctionObject("bidder", "gumgum", "active", true, true),
    inmobi: new AuctionObject("bidder", "inmobi", "active", true, true),
    kuantyx: new AuctionObject("bidder", "kuantyx", "active", true, true),
    medianet: new AuctionObject("bidder", "medianet", "active", true, true),
    missena: new AuctionObject("bidder", "missena", "active", true, true),
    ogury: new AuctionObject("bidder", "ogury", "active", true, true),
    onetag: new AuctionObject("bidder", "onetag", "active", true, true),
    richaudience: new AuctionObject("bidder", "richaudience", "active", true, true),
    rise: new AuctionObject("bidder", "rise", "active", true, true),
    rubicon: new AuctionObject("bidder", "rubicon", "active", true, true),
    seedtag: new AuctionObject("bidder", "seedtag", "active", true, true),
    smartadserver: new AuctionObject("bidder", "smartadserver", "inactive", true, true),
    smilewanted: new AuctionObject("bidder", "smilewanted", "active", true, true),
    sovrn: new AuctionObject("bidder", "sovrn", "active", true, true),
    sparteo: new AuctionObject("bidder", "sparteo", "active", true, true),
    triplelift: new AuctionObject("bidder", "triplelift", "inactive", true, true),
    waardex_ak: new AuctionObject("bidder", "waardex_ak", "active", true, true)
  };
  bidders.medianet.crid = AFM_page.isMobile() ? "815311453" : "633827357";
  var refreshPeriod = 27000;
  var afm_hour = new Date().getHours();
  if (afm_hour >= 3 && afm_hour <= 8) {
    refreshPeriod = 23000;
  } else if (afm_hour >= 9 && afm_hour <= 14) {
    refreshPeriod = 25000;
  } else if (afm_hour >= 15 && afm_hour <= 17) {
    refreshPeriod = 23000;
  } else if (afm_hour >= 18 && afm_hour <= 19) {
    refreshPeriod = 25000;
  }
  var adUnitsToRefreshGAM = [];
  var refreshPeriodAfterTabBackInFocus = 1500;
  var AMhbFooterAuctionWinner = 0;
  var AMrefreshLoop = null;
  var AMtabVisible = true;
  var AMattemptedRefreshButTabNotInFocus = false;
  var AMfooterDismissedByUser = false;
  var gamAmznID = 4776868705;
  var gamPbID = 4410509678;
  var AMfooterRiseSpeed = 500;
  function ggFloorBrackets() {
    let t = new Date().getHours();
    let e = 3;
    if (t >= 0 && t <= 4) {
      e = 3.75;
    } else if (t > 4 && t <= 11) {
      e = 4;
    } else if (t > 11 && t <= 16) {
      e = 3;
    } else if (t > 16 && t <= 18) {
      e = 3.5;
    } else if (t > 18) {
      e = 2.5;
    }
    return e;
  }
  adUnits.AFM_stickyFooter_ad.init = function () {
    this.originalParams = [this.autorefresh, this.refreshWhenWindowResized, this.status];
    this.lastWin = false;
    this.adType = "";
    this.zin = "2147483647";
    this.riseSpeed = 500;
    this.ready = false;
    this.bufferPx = 20;
    this.rebuilt = false;
    this.shellDiv = top.document.createElement("div");
    this.shellDiv.setAttribute("id", "stickyAdContainer");
    this.shellDiv.setAttribute("style", "text-align:center;position:fixed;bottom:-300px;width:100%;-webkit-transition: all " + this.riseSpeed + "ms ease-out;z-index:" + this.zin + ";");
    this.styleSheet = top.document.createElement("style");
    AFM_page.waitForElement("body").then(function (t) {
      t.appendChild(adUnits.AFM_stickyFooter_ad.shellDiv);
      t.appendChild(adUnits.AFM_stickyFooter_ad.styleSheet);
      adUnits.AFM_stickyFooter_ad.build();
    });
  };
  adUnits.AFM_stickyFooter_ad.applyClass = function (t) {
    this.divRef.classList.add(t);
  };
  adUnits.AFM_stickyFooter_ad.getStdStyle = function (t) {
    return "#stickyAdContainer {text-align:center;position:fixed;bottom:-" + (this.size[1] + this.bufferPx) + "px;width:100%;-webkit-transition: all " + AMfooterRiseSpeed + "ms ease-out;z-index:" + this.zin + ";pointer-events: none;display:block !important;} #AFM_stickyFooter_ad {display:inline-block !important;pointer-events: all;max-height:100px;transition:200ms ease-out;} #closeBox {display:inline-block;pointer-events: all;} .drawBorder {border-width:2px;border-color:" + AMhouseColour + ";border-style:solid;border-bottom: 0;-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);-moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);display:inline-block;background-color:white;} #closeBox:hover {transform: rotate(90deg); transition: transform 0.5s;} #body {padding-top:0px !important;}";
  };
  adUnits.AFM_stickyFooter_ad.getOopStyle = function (t) {
    return "#stickyAdContainer {position:fixed !important;bottom:0px !important;height:100px !important;width:100% !important;z-index:" + this.zin + " !important;pointer-events: none !important;display:block !important;} #AFM_stickyFooter_ad {display:inline-block !important;pointer-events: none !important;height:100px !important;width:100% !important;z-index:" + this.zin + " !important;} #body {padding-top:0px !important;}";
  };
  adUnits.AFM_stickyFooter_ad.build = function () {
    this.divRef = top.document.createElement("div");
    this.divRef.setAttribute("id", "AFM_stickyFooter_ad");
    this.divRef.setAttribute("style", "margin:auto;display:inline-block;");
    this.shellDiv.appendChild(this.divRef);
    this.ready = true;
  };
  adUnits.AFM_stickyFooter_ad.getCloseBox = function () {
    var t = top.document.createElement("div");
    t.setAttribute("id", "closeBox");
    t.setAttribute("style", "display:inline-block;position:absolute;cursor:pointer;z-index:" + this.zin + ";height:20px;width:20px;margin:-10px;line-height:0px;");
    t.innerHTML = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;\"><g id=\"Layer1\"><circle cx=\"256\" cy=\"257\" r=\"151.5\" style=\"fill:#000;\"/></g><path d=\"M256,33c-123.7,0 -224,100.3 -224,224c0,123.7 100.3,224 224,224c123.7,0 224,-100.3 224,-224c0,-123.7 -100.3,-224 -224,-224Zm108.3,299.5c1.5,1.5 2.3,3.5 2.3,5.6c0,2.1 -0.8,4.2 -2.3,5.6l-21.6,21.7c-1.6,1.6 -3.6,2.3 -5.6,2.3c-2,0 -4.1,-0.8 -5.6,-2.3l-75.5,-75.6l-75.4,75.7c-1.5,1.6 -3.6,2.3 -5.6,2.3c-2,0 -4.1,-0.8 -5.6,-2.3l-21.6,-21.7c-1.5,-1.5 -2.3,-3.5 -2.3,-5.6c0,-2.1 0.8,-4.2 2.3,-5.6l75.7,-76l-75.9,-75c-3.1,-3.1 -3.1,-8.2 0,-11.3l21.6,-21.7c1.5,-1.5 3.5,-2.3 5.6,-2.3c2.1,0 4.1,0.8 5.6,2.3l75.7,74.7l75.7,-74.7c1.5,-1.5 3.5,-2.3 5.6,-2.3c2.1,0 4.1,0.8 5.6,2.3l21.6,21.7c3.1,3.1 3.1,8.2 0,11.3l-75.9,75l75.6,75.9Z\" style=\"fill:" + AMhouseColour + ";fill-rule:nonzero;\"/></svg>";
    return t;
  };
  adUnits.AFM_stickyFooter_ad.show = function (t) {
    if (Array.isArray(t)) {
      if (t[0] == t[1]) {
        this.divRef.style.width = "unset";
        this.divRef.style.height = "unset";
      } else {
        this.divRef.style.width = t[0] + "px";
        this.divRef.style.height = t[1] + "px";
      }
    }
    if (this.adType === "oop") {
      this.clearOop(this.lastWin);
    }
    if (this.adType != "std") {
      this.closeBox = this.getCloseBox();
      this.shellDiv.appendChild(this.closeBox);
      this.closeBox.onclick = function () {
        adUnits.AFM_stickyFooter_ad.dismiss();
      };
      this.styleSheet.innerHTML = this.getStdStyle();
      this.applyClass("drawBorder");
      this.rise();
      this.adType = "std";
    }
    this.lastWin = this.winBidder;
  };
  adUnits.AFM_stickyFooter_ad.oopWinner = function () {
    if (this.adType === "oop") {
      adUnits.AFM_stickyFooter_ad.clearOop(this.lastWin);
    }
    if (this.adType != "oop") {
      if (this.closeBox) {
        this.closeBox.remove();
      }
      this.styleSheet.innerHTML = this.getOopStyle();
      this.adType = "oop";
    }
    this.lastWin = this.winBidder;
  };
  adUnits.AFM_stickyFooter_ad.sink = function () {
    this.shellDiv.style.bottom = "-" + (this.size[1] + this.bufferPx) + "px";
  };
  adUnits.AFM_stickyFooter_ad.rise = function () {
    this.shellDiv.style.bottom = "0px";
  };
  adUnits.AFM_stickyFooter_ad.flush = function () {
    this.shellDiv.innerHTML = "";
  };
  adUnits.AFM_stickyFooter_ad.clearOop = function (t) {
    var e = t || this.winBidder;
    if (e === "gumgum" && typeof GUMGUM == "object") {
      GUMGUM.InScreenAd.removeISAd();
    } else if (e === "justpremium") {
      document.querySelectorAll("[jpx-object-id]").forEach(function (t) {
        t.remove();
      });
    } else if (e === "sublime" && typeof sublime == "object") {
      sublime.cleanUp();
    }
  };
  adUnits.AFM_stickyFooter_ad.basta = function () {
    this.adType = "";
    this.clearOop();
    this.flush();
  };
  adUnits.AFM_stickyFooter_ad.rebuild = function () {
    if (this.dismissed) {
      this.dismissed = false;
      this.setAutorefresh(this.originalParams[0]);
      this.setRefreshWithWindowResize(this.originalParams[1]);
      this.status = this.originalParams[2];
    } else {
      this.basta();
    }
    this.build();
    this.refreshCounter = 0;
    this.rebuilt = true;
    this.gptSlot.setTargeting("impression_type", "first");
  };
  adUnits.AFM_stickyFooter_ad.dismiss = function () {
    if (this.dismissed === false) {
      this.dismissed = true;
      this.adType = "";
      this.sink();
      setTimeout(function () {
        adUnits.AFM_stickyFooter_ad.flush();
      }, 800);
      this.setAutorefresh(false);
      this.setRefreshWithWindowResize(false);
      this.status = false;
    }
  };
  if (AMfooterOn) {
    adUnits.AFM_stickyFooter_ad.init();
  }
  var stdAds = "stdAds";
  function AMcompileAdUnits(t) {
    var e = [];
    adUnits.AFMforEach(function (i) {
      if (i.status === "live" && i.prebidAdUnit !== undefined && t !== "auto") {
        e.push(i.prebidAdUnit());
      } else if (i.status === "live" && i.prebidAdUnit !== undefined && t === "auto" && (!!isInViewport(i.name) || (i.adType != null && i.adType) === "oop")) {
        e.push(i.prebidAdUnit());
      }
    });
    return e;
  }
  adUnits.AFM_stickyFooter_ad.prebidAdUnit = function () {
    return {
      code: "AFM_stickyFooter_ad",
      mediaTypes: {
        banner: {
          sizes: adUnits.AFM_stickyFooter_ad.getSizes()
        }
      },
      ortb2Imp: {
        metric: [{
          type: "viewability",
          value: 0.92,
          vendor: "BusTimes_GAM_Reporting"
        }],
        banner: {
          pos: 1
        },
        ext: {
          data: {
            divId: "AFM_stickyFooter_ad",
            placement: "AFM_stickyFooter_ad"
          }
        }
      },
      labelAll: [adUnits.AFM_stickyFooter_ad.getStatus()],
      bids: [{
        bidder: "rubicon",
        labelAll: [bidders.rubicon.getStatus(), stdAds],
        params: {
          accountId: "9906",
          siteId: "478854",
          zoneId: "2843708",
          position: "atf"
        }
      }, {
        bidder: "rubicon",
        labelAll: [bidders.rubicon.getStatus(), "limitedAds"],
        params: {
          accountId: "9906",
          siteId: "478854",
          zoneId: "2843708",
          position: "atf"
        }
      }, {
        bidder: "onetag",
        labelAll: [bidders.onetag.getStatus(), stdAds],
        params: {
          pubId: "6b84a4b65743e60"
        }
      }, {
        bidder: "adagio",
        labelAll: [bidders.adagio.getStatus(), stdAds],
        params: {
          organizationId: "1254",
          site: "bustimes"
        }
      }, {
        bidder: "adtelligent",
        labelAll: [bidders.adtelligent.getStatus(), stdAds],
        params: {
          aid: 765905
        }
      }, {
        bidder: "sovrn",
        labelAll: [bidders.sovrn.getStatus(), stdAds],
        params: {
          tagid: "1128818"
        }
      }, {
        bidder: "gumgum",
        labelAll: [bidders.gumgum.getStatus(), stdAds],
        params: {
          zone: "wp9kcvco",
          bidfloor: 2.5
        }
      }, {
        bidder: "gumgum",
        labelAll: [bidders.gumgum.getStatus(), "limitedAds"],
        params: {
          zone: "wp9kcvco",
          bidfloor: 1
        }
      }, bidders.ogury.getStatus() !== "inactive" && AFM_page.isMobile() ? {
        bidder: "ogury",
        labelAll: [bidders.ogury.getStatus(), stdAds],
        params: {
          assetKey: "OGY-2DF6DF686124",
          adUnitId: "3c71a836-d1ec-47c4-88f4-24f60803a133"
        }
      } : {}, {
        bidder: "richaudience",
        labelAll: [bidders.richaudience.getStatus(), stdAds],
        params: {
          pid: "Y6xAlkJvxW",
          supplyType: "site",
          bidfloor: 0.03
        }
      }, {
        bidder: "rise",
        labelAll: [bidders.rise.getStatus(), stdAds],
        params: {
          org: "65521a2351174d0001dbbd6f",
          floorPrice: 0.15
        }
      }, {
        bidder: "rise",
        labelAll: [bidders.rise.getStatus(), "limitedAds"],
        params: {
          org: "65521a2351174d0001dbbd6f",
          floorPrice: 0.05
        }
      }, {
        bidder: "conversant",
        labelAll: [bidders.conversant.getStatus(), stdAds],
        params: {
          site_id: "231091",
          bidfloor: 0.03,
          secure: 1
        }
      }, {
        bidder: "triplelift",
        labelAll: [bidders.triplelift.getStatus(), stdAds],
        params: {
          inventoryCode: "Bustimes_HDX_Prebid",
          floor: 0.03
        }
      }, {
        bidder: "medianet",
        labelAll: [bidders.medianet.getStatus(), stdAds],
        params: {
          cid: "8CUR4Y285",
          crid: bidders.medianet.crid,
          floor: 0.03
        }
      }, {
        bidder: "medianet",
        labelAll: [bidders.medianet.getStatus(), "limitedAds"],
        params: {
          cid: "8CUR4Y285",
          crid: bidders.medianet.crid,
          floor: 0.03
        }
      }, {
        bidder: "smartadserver",
        labelAll: [bidders.smartadserver.getStatus(), stdAds],
        params: {
          siteId: 652522,
          pageId: 1969098,
          formatId: 130313,
          bidfloor: 0.03
        }
      }, {
        bidder: "smilewanted",
        labelAll: [bidders.smilewanted.getStatus(), stdAds],
        params: {
          zoneId: "adfirstmedia.com_hb_display",
          bidfloor: 0.03
        }
      }, bidders.ogury.getStatus() === "inactive" || AFM_page.isMobile() ? {} : {
        bidder: "ogury",
        labelAll: [bidders.ogury.getStatus(), stdAds],
        params: {
          assetKey: "OGY-2DF6DF686124",
          adUnitId: "wd-hb-stdb-bustim-adfir-1j417ssl7wnx"
        }
      }, {
        bidder: "kuantyx",
        labelAll: [bidders.kuantyx.getStatus(), stdAds],
        params: {
          zone: 159116,
          server: "https://srv.kntxy.com"
        }
      }, {
        bidder: "sparteo",
        labelAll: [bidders.sparteo.getStatus(), stdAds],
        params: {
          networkId: "4b8a8a5f-2697-45f5-86b0-7a873963bde1"
        }
      }, {
        bidder: "missena",
        labelAll: [bidders.missena.getStatus(), stdAds],
        params: {
          apiKey: "PA-69746247",
          placement: "footer"
        }
      }, {
        bidder: "seedtag",
        labelAll: [bidders.seedtag.getStatus(), stdAds],
        params: {
          publisherId: "7032-6518-01",
          adUnitId: "37941293",
          placement: "inScreen"
        }
      }, {
        bidder: "waardex_ak",
        labelAll: [bidders.waardex_ak.getStatus(), stdAds],
        params: {
          host: "cpm.aserve1.net",
          zoneId: 389507
        }
      }, {
        bidder: "inmobi",
        labelAll: [bidders.inmobi.getStatus(), stdAds],
        params: {
          plc: "10000761569"
        }
      }]
    };
  };
  adUnits.AFM_inContentTop_ad.prebidAdUnit = function () {
    return {
      code: "AFM_inContentTop_ad",
      mediaTypes: {
        banner: {
          sizes: adUnits.AFM_inContentTop_ad.getSizes()
        }
      },
      ortb2Imp: {
        ext: {
          data: {
            divId: "AFM_inContentTop_ad",
            placement: "AFM_inContentTop_ad"
          }
        }
      },
      labelAll: [adUnits.AFM_inContentTop_ad.getStatus()],
      bids: [{
        bidder: "rubicon",
        labelAll: [bidders.rubicon.getStatus(), stdAds],
        params: {
          accountId: "9906",
          siteId: "478854",
          zoneId: "2843710",
          position: "atf"
        }
      }, {
        bidder: "rubicon",
        labelAll: [bidders.rubicon.getStatus(), "limitedAds"],
        params: {
          accountId: "9906",
          siteId: "478854",
          zoneId: "2843710",
          position: "atf"
        }
      }, {
        bidder: "onetag",
        labelAll: [bidders.onetag.getStatus(), stdAds],
        params: {
          pubId: "6b84a4b65743e60"
        }
      }, {
        bidder: "adagio",
        labelAll: [bidders.adagio.getStatus(), stdAds],
        params: {
          organizationId: "1254",
          site: "bustimes"
        }
      }, {
        bidder: "adtelligent",
        labelAll: [bidders.adtelligent.getStatus(), stdAds],
        params: {
          aid: 765905
        }
      }, {
        bidder: "sovrn",
        labelAll: [bidders.sovrn.getStatus(), stdAds],
        params: {
          tagid: "1128819"
        }
      }, {
        bidder: "gumgum",
        labelAll: [bidders.gumgum.getStatus(), stdAds],
        params: {
          zone: "wp9kcvco",
          slot: "989503",
          bidfloor: 0.03
        }
      }, {
        bidder: "gumgum",
        labelAll: [bidders.gumgum.getStatus(), "limitedAds"],
        params: {
          zone: "wp9kcvco",
          slot: "989503",
          bidfloor: 0.03
        }
      }, {
        bidder: "richaudience",
        labelAll: [bidders.richaudience.getStatus(), stdAds],
        params: {
          pid: "rK21whMWyM",
          supplyType: "site",
          bidfloor: 0.03
        }
      }, {
        bidder: "rise",
        labelAll: [bidders.rise.getStatus(), stdAds],
        params: {
          org: "65521a2351174d0001dbbd6f",
          floorPrice: 0.03
        }
      }, {
        bidder: "rise",
        labelAll: [bidders.rise.getStatus(), "limitedAds"],
        params: {
          org: "65521a2351174d0001dbbd6f",
          floorPrice: 0.03
        }
      }, {
        bidder: "conversant",
        labelAll: [bidders.conversant.getStatus(), stdAds],
        params: {
          site_id: "231091",
          bidfloor: 0.03,
          secure: 1
        }
      }, {
        bidder: "triplelift",
        labelAll: [bidders.triplelift.getStatus(), stdAds],
        params: {
          inventoryCode: "Bustimes_HDX_Prebid",
          floor: 0.03
        }
      }, {
        bidder: "medianet",
        labelAll: [bidders.medianet.getStatus(), stdAds],
        params: {
          cid: "8CUR4Y285",
          crid: bidders.medianet.crid,
          floor: 0.03
        }
      }, {
        bidder: "medianet",
        labelAll: [bidders.medianet.getStatus(), "limitedAds"],
        params: {
          cid: "8CUR4Y285",
          crid: bidders.medianet.crid,
          floor: 0.03
        }
      }, {
        bidder: "smartadserver",
        labelAll: [bidders.smartadserver.getStatus(), stdAds],
        params: {
          siteId: 652522,
          pageId: 1969099,
          formatId: 130337,
          bidfloor: 0.03
        }
      }, {
        bidder: "smilewanted",
        labelAll: [bidders.smilewanted.getStatus(), stdAds],
        params: {
          zoneId: "adfirstmedia.com_hb_display",
          bidfloor: 0.03
        }
      }, bidders.ogury.getStatus() === "inactive" || AFM_page.isMobile() ? {} : {
        bidder: "ogury",
        labelAll: [bidders.ogury.getStatus(), stdAds],
        params: {
          assetKey: "OGY-2DF6DF686124",
          adUnitId: "wd-hb-stdb-bustim-adfir-1j417ssl7wnx"
        }
      }, {
        bidder: "kuantyx",
        labelAll: [bidders.kuantyx.getStatus(), stdAds],
        params: {
          zone: 159116,
          server: "https://srv.kntxy.com"
        }
      }, {
        bidder: "sparteo",
        labelAll: [bidders.sparteo.getStatus(), stdAds],
        params: {
          networkId: "4b8a8a5f-2697-45f5-86b0-7a873963bde1"
        }
      }, {
        bidder: "missena",
        labelAll: [bidders.missena.getStatus(), stdAds],
        params: {
          apiKey: "PA-69746247",
          placement: "header"
        }
      }, {
        bidder: "seedtag",
        labelAll: [bidders.seedtag.getStatus(), stdAds],
        params: {
          publisherId: "7032-6518-01",
          adUnitId: "37941295",
          placement: "inBanner"
        }
      }, {
        bidder: "waardex_ak",
        labelAll: [bidders.waardex_ak.getStatus(), stdAds],
        params: {
          host: "cpm.aserve1.net",
          zoneId: 389507
        }
      }, {
        bidder: "inmobi",
        labelAll: [bidders.inmobi.getStatus(), stdAds],
        params: {
          plc: "10000761569"
        }
      }]
    };
  };
  var vis = function () {
    var t;
    var e;
    var i = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
    for (t in i) {
      if (t in document) {
        e = i[t];
        break;
      }
    }
    return function (i, s) {
      if (i) {
        document.addEventListener(e, i, s);
      }
      return !document[t];
    };
  }();
  vis(function () {
    if (vis()) {
      setTimeout(function () {
        AMtabVisible = true;
        if (AMattemptedRefreshButTabNotInFocus && AMrefreshLoop !== true) {
          AMattemptedRefreshButTabNotInFocus = false;
          setTimeout(function () {
            refreshBids("auto");
          }, refreshPeriodAfterTabBackInFocus);
        } else if (AMattemptedRefreshButTabNotInFocus && AMrefreshLoop === true) {
          AMattemptedRefreshButTabNotInFocus = false;
        }
      }, 300);
    } else {
      AMtabVisible = false;
    }
  });
  var pbjs = pbjs || {};
  function isInViewport(t) {
    var e = top.document.getElementById(t).getBoundingClientRect();
    return e.top + e.height * 0.33 >= 0 && e.left + e.width * 0.33 >= 0 && e.bottom - e.height * 0.33 <= (window.innerHeight || document.documentElement.clientHeight) && e.right - e.width * 0.33 <= (window.innerWidth || document.documentElement.clientWidth);
  }
  function fetchHeaderBids(t, e, i, s, n, a) {
    var r = bidders.amazon.getStatus();
    var d = ["prebid"];
    if (r === "active") {
      d.push("amazon");
    }
    if (s) {
      var o = {};
      t.forEach(function (t) {
        o[t.getSlotElementId()] = true;
      });
    }
    var l = {
      adserverRequestSent: false
    };
    function u(e) {
      if (l.adserverRequestSent !== true) {
        if (e === "amazon") {
          l.amazon = true;
        } else if (e === "prebid") {
          l.prebid = true;
        }
        if (d.map(function (t) {
          return l[t];
        }).filter(Boolean).length === d.length) {
          (function () {
            if (l.adserverRequestSent === true) {
              return;
            }
            l.adserverRequestSent = true;
            pbjs.adserverRequestSent = true;
            l.sendAdserverRequest = true;
            googletag.cmd.push(function () {
              function e(t) {
                apstag.setDisplayBids();
                pbjs.setTargetingForGPTAsync();
                if (!a) {
                  adRefreshManager.reset();
                  adRefreshManager.numberOfAdUnitsToRender = t.length;
                }
                t.forEach(function (t) {});
                googletag.pubads().refresh(t);
              }
              if (s) {
                if (s !== "auto" || AMrefreshLoop !== null && !afm_limitedAdsActive) {
                  if (s === "windowResize") {
                    t.forEach(function (t) {});
                    if (o.AFM_stickyFooter_ad === false || adUnits.AFM_stickyFooter_ad.hasBeenDismissed()) {
                      var i = t.findIndex(function (t) {
                        return t.getSlotElementId() === "AFM_stickyFooter_ad";
                      });
                      if (i !== -1) {
                        t.splice(i, 1);
                      }
                      t.forEach(function (t) {});
                      dismissFooter(false);
                    }
                    googletag.pubads().setTargeting("impression_type", "windowResize");
                    e(t);
                  }
                } else {
                  var n = [];
                  function r(t) {
                    var e = t.getSlotElementId();
                    o[e];
                    if (adUnits[e].hasBeenDismissed()) ;else if (o[e] === true && (isInViewport(e) || (adUnits[e].adType != null && adUnits[e].adType) === "oop")) {
                      var i = "refresh-" + adUnits[e].incrementRefreshCounter();
                      adAutorefreshCounter++;
                      t.setTargeting("impression_type", i);
                      n.push(t);
                    }
                  }
                  t.forEach(r);
                  if (n.length > 0) {
                    e(n);
                  } else if (++fruitlessRefreshAttempt <= fruitlessRefreshLimit) {
                    refreshAds("auto");
                  }
                }
              } else {
                var d = [];
                t.forEach(function (t) {
                  var e = t.getSlotElementId();
                  if (adUnits[e].updateAdInDomStatus() && adUnits[e].inSizeBracket()) {
                    d.push(t);
                  }
                });
                if (a) {
                  try {
                    d[0].setTargeting("impression_type", "first");
                    e(d);
                  } catch (l) {}
                } else {
                  googletag.display(d[0].getSlotElementId());
                  e(d);
                }
              }
            });
          })();
        }
      }
    }
    function c(s) {
      if (s && n.pop() === stdAds) {
        n.push("limitedAds");
      }
      if (r && !s) {
        googletag.cmd.push(function () {
          apstag.fetchBids({
            slots: t,
            timeout: i
          }, function (t) {
            t.forEach(function (t) {
              if (t.amzniid !== "") {
                adUnits[t.slotID].amznSize = t.size.split("x").map(Number);
              }
            });
            u("amazon");
          });
        });
      } else if (r) {
        u("amazon");
      }
      pbjs.que.push(function () {
        pbjs.requestBids({
          adUnits: e,
          labels: n,
          timeout: i,
          bidsBackHandler: function (t) {
            u("prebid");
          }
        });
      });
    }
    d.forEach(function (t) {
      l[t] = false;
    });
    __tcfapi("addEventListener", 2, function (t, e) {
      __uspapi("setUspDftData", 1, function (t, e) {});
      if (e && t.gdprApplies) {
        if (t.eventStatus !== "tcloaded" && t.eventStatus !== "useractioncomplete" || !t.purpose.consents[1]) {
          if (t.eventStatus !== "cmpuishown" && (t.eventStatus === "tcloaded" || t.eventStatus === "useractioncomplete") && !t.purpose.consents[1]) {
            if (afm_limitedAds) {
              googletag.cmd.push(function () {
                googletag.pubads().setTargeting("limitedAds", "true");
              });
              c(afm_limitedAdsActive = true);
            }
            __tcfapi("removeEventListener", 2, function (t) {}, t.listenerId);
          }
        } else {
          c();
          __tcfapi("removeEventListener", 2, function (t) {}, t.listenerId);
        }
      } else if (t.gdprApplies === false) {
        c();
        __tcfapi("removeEventListener", 2, function (t) {}, t.listenerId);
      } else {
        __tcfapi("removeEventListener", 2, function (t) {}, t.listenerId);
      }
    });
  }
  function refreshBids(t) {
    if (t === "auto" || t === "windowResize") {
      fetchHeaderBids(collateAdUnitsForRefresh(t), AMcompileAdUnits(t), afm_bidTimeout(), t, ["active", "adUnitLive-true", stdAds]);
    } else {
      adAutorefreshEnabled = 0;
    }
  }
  function refreshAds(t) {
    var e = collateAdUnitsForRefresh(t);
    if (t === "auto" && e && adAutorefreshEnabled) {
      AMrefreshLoop = setTimeout(function () {
        if (AMtabVisible) {
          refreshBids(t);
        } else {
          AMattemptedRefreshButTabNotInFocus = true;
        }
        AMrefreshLoop = null;
      }, refreshPeriod);
    } else if (t === "windowResize" && e) {
      if (AMrefreshLoop != null) {
        clearTimeout(AMrefreshLoop);
        AMrefreshLoop = true;
      }
      refreshBids(t);
    }
  }
  function collateAdUnitsForRefresh(t) {
    bidders.AFMforEach(function (e) {
      e.determineStatusForRefresh(t);
    });
    AMcompileAdUnits();
    adUnitsToRefreshGAM = [];
    if (t === "windowResize") {
      adUnits.AFMforEach(function (e) {
        e.determineStatusForRefresh(t);
        if (e.willRefreshWithWindowResize() && e.isActive() && e.gptSlot != 0) {
          adUnitsToRefreshGAM.push(e.gptSlot);
        }
      });
    } else if (t === "auto") {
      adUnits.AFMforEach(function (e) {
        e.updateAdInDomStatus();
        e.determineStatusForRefresh(t);
        if (e.willAutorefresh() && e.isActive() && e.gptSlot != 0) {
          adUnitsToRefreshGAM.push(e.gptSlot);
        }
      });
    }
    return adUnitsToRefreshGAM.length !== 0 && (adUnitsToRefreshGAM.forEach(function (t) {}), adUnitsToRefreshGAM);
  }
  function AdRefreshManager() {
    this.refreshTriggered = 0;
    this.adUnitsRendered = 0;
    this.numberOfAdUnitsToRender = 0;
    var t = true;
    this.tallyRenders = function () {
      this.adUnitsRendered++;
      if (this.numberOfAdUnitsToRender === this.adUnitsRendered) {
        if (t) {
          t = false;
          AFM_page.setResizeBreaks();
          googletag.pubads().clearTargeting("impression_type");
          pbjs.setConfig({
            bidderTimeout: afm_bidTimeout()
          });
        }
        this.triggerRefresh();
      } else {
        this.numberOfAdUnitsToRender;
        this.adUnitsRendered;
      }
    };
    this.triggerRefresh = function () {
      if (this.refreshTriggered === 0 && adAutorefreshEnabled) {
        this.refreshTriggered = 1;
        refreshAds("auto");
      }
    };
    this.reset = function () {
      this.refreshTriggered = 0;
      this.adUnitsRendered = 0;
      this.numberOfAdUnitsToRender = 0;
    };
  }
  pbjs.que = pbjs.que || [];
  pbjs.que.push(function () {
    var e = {
      winEntity: "prebid",
      winBidder: "unknown",
      size: [0, 0],
      bidNetGbp: 0
    };
    pbjs.onEvent("setTargeting", function (t) {
      if (t && typeof t == "object") {
        Object.keys(t).forEach(function (i) {
          var s = t[i] || {};
          var n = s.hb_bidder || e.winBidder;
          var a = function (t) {
            if (!t) {
              return null;
            }
            var e = Array.isArray(t) ? t[0] : t;
            var i = String(e).toLowerCase().split("x");
            if (i.length !== 2) {
              return null;
            }
            var s = parseInt(i[0], 10);
            var n = parseInt(i[1], 10);
            if (isNaN(s) || isNaN(n)) {
              return null;
            } else {
              return [s, n];
            }
          }(s.hb_size) || e.size;
          var r = function (t) {
            if (t == null) {
              return null;
            }
            var e = Array.isArray(t) ? t[0] : t;
            var i = parseFloat(e);
            if (isNaN(i)) {
              return null;
            } else {
              return i;
            }
          }(s.hb_pb);
          if (r == null) {
            r = e.bidNetGbp;
          }
          adUnits[i] = adUnits[i] || {};
          adUnits[i].winEntity = e.winEntity;
          adUnits[i].winBidder = n;
          adUnits[i].size = a;
          adUnits[i].bidNetGbp = r;
        });
      }
    });
    pbjs.setConfig({
      enableTIDs: true,
      consentManagement: {
        gdpr: {
          cmpApi: "iab",
          timeout: 5000,
          actionTimeout: 5000,
          defaultGdprScope: true
        },
        usp: {
          cmpApi: "iab",
          timeout: 10000
        },
        gpp: {
          cmpApi: "iab",
          timeout: 8000,
          actionTimeout: 8000
        }
      },
      deviceAccess: true,
      userSync: {
        filterSettings: {
          all: {
            bidders: "*",
            filter: "include"
          }
        },
        userIds: [{
          name: "id5Id",
          params: {
            partner: 1004
          },
          storage: {
            type: "html5",
            name: "id5id",
            expires: 90,
            refreshInSeconds: 28800
          }
        }, {
          name: "criteo"
        }, {
          name: "sharedId",
          storage: {
            type: "cookie",
            name: "_sharedid",
            expires: 365
          }
        }, {
          name: "lotamePanoramaId",
          params: {
            clientId: "17343"
          }
        }, {
          name: "33acrossId",
          params: {
            pid: "001Pg000003lGZ3IAM"
          },
          storage: {
            name: "33acrossId",
            type: "html5",
            expires: 90,
            refreshInSeconds: 28800
          }
        }],
        aliasSyncEnabled: true,
        auctionDelay: 50
      },
      gptPreAuction: {
        mcmEnabled: true
      },
      debug: pbDebugStatus,
      priceGranularity: "high",
      enableSendAllBids: false,
      bidderTimeout: afm_bidTimeout(),
      realTimeData: {
        dataProviders: [{
          name: "adagio",
          params: {
            organizationId: "1254",
            site: "bustimes"
          }
        }]
      },
      rubicon: {
        singleRequest: true
      },
      useBidCache: true,
      minBidCacheTTL: 0,
      ortb2: {
        source: {
          ext: {
            schain: t
          }
        },
        site: {
          name: "BusTimes",
          domain: "bustimes.org",
          cat: ["IAB18", "IAB18-4", "IAB9-30"],
          pagecat: ["IAB18", "IAB18-4", "IAB9-30"],
          page: getPageURLForPrebid(),
          publisher: {
            domain: "bustimes.org",
            name: "BusTimes",
            id: "031"
          },
          keywords: "bus travel, coach travel, bus times, bus schedules, bus timetables, bus maps, route planner, journey planner, holiday bus, bus trips, UK bus travel, intercity bus, local bus, public transport, bus map, live bus info, london busses, UK travel, UK holidays, commuting, commuter travel",
          content: {
            lang: "en-GB",
            title: getContentTitleForPrebid(),
            keywords: "bus travel, coach travel, bus times, bus schedules, bus timetables, bus maps, route planner, journey planner, holiday bus, bus trips, UK bus travel, intercity bus, local bus, public transport, bus map, live bus info, london busses, UK travel, UK holidays, commuting, commuter travel",
            url: getPageURLForPrebid(),
            context: 5
          },
          ext: {
            data: {
              pagetype: AFM_page.getPageType(),
              category: "Travel"
            }
          }
        }
      }
    });
    pbjs.bidderSettings = {
      standard: {
        storageAllowed: true
      },
      rubicon: {
        bidCpmAdjustment: function (t) {
          return t * makeNet85 * usdRate * 0.918;
        }
      },
      improvedigital: {
        bidCpmAdjustment: function (t) {
          return t * makeNet86 * usdRate * 0.98;
        }
      },
      sovrn: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.962;
        }
      },
      gumgum: {
        bidCpmAdjustment: function (t) {
          return t * 0.906;
        }
      },
      ogury: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.9;
        }
      },
      onetag: {
        bidCpmAdjustment: function (t) {
          return t * 0.967;
        }
      },
      adagio: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.96;
        }
      },
      adtelligent: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.95;
        }
      },
      unruly: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.94;
        }
      },
      richaudience: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.94;
        }
      },
      rise: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.966;
        }
      },
      conversant: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.98;
        }
      },
      medianet: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.986;
        }
      },
      smartadserver: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.455;
        }
      },
      smilewanted: {
        bidCpmAdjustment: function (t) {
          return t * euroRate * 0.916;
        }
      },
      kuantyx: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.938;
        }
      },
      equativ: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.455;
        }
      },
      sparteo: {
        bidCpmAdjustment: function (t) {
          return t * euroRate * 0.95;
        }
      },
      missena: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.922;
        }
      },
      seedtag: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.885;
        }
      },
      waardex_ak: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.95;
        }
      },
      inmobi: {
        bidCpmAdjustment: function (t) {
          return t * usdRate * 0.674;
        }
      }
    };
  });
  if (vis()) {
    fetchHeaderBids(gptAdSlots, AMcompileAdUnits(), afm_bidTimeout(), false, ["active", "adUnitLive-true", stdAds]);
  } else {
    vis(function () {
      if (vis()) {
        fetchHeaderBids(gptAdSlots, AMcompileAdUnits(), afm_bidTimeout(), false, ["active", "adUnitLive-true", stdAds]);
      }
    }, {
      once: true
    });
  }
  var adRefreshManager = new AdRefreshManager();
  adRefreshManager.numberOfAdUnitsToRender = gptAdSlots.length;
  googletag.cmd.push(function () {
    googletag.pubads().addEventListener("slotRenderEnded", function (t) {
      adUnits[t.slot.getSlotElementId()].rendered = true;
      adUnits[t.slot.getSlotElementId()].sizeGam = t.size;
      if (t.advertiserId == 0) {
        adUnits[t.slot.getSlotElementId()].winEntity = "google";
        adUnits[t.slot.getSlotElementId()].size = t.size;
        adUnits[t.slot.getSlotElementId()].winBidder = "google";
      } else if (t.advertiserId == gamAmznID) {
        adUnits[t.slot.getSlotElementId()].size = adUnits[t.slot.getSlotElementId()].amznSize;
        adUnits[t.slot.getSlotElementId()].winEntity = "amazon";
        adUnits[t.slot.getSlotElementId()].winBidder = "amazon";
      } else if (t.advertiserId != gamPbID) {
        adUnits[t.slot.getSlotElementId()].size = t.size;
      }
      if (t.slot.getSlotElementId() == "AFM_stickyFooter_ad" && !t.isEmpty && AMfooterOn) {
        if (adUnits.AFM_stickyFooter_ad.winBidder === "gumgum" || adUnits.AFM_stickyFooter_ad.winBidder === "seedtag" || adUnits.AFM_stickyFooter_ad.winBidder === "sublime" || adUnits.AFM_stickyFooter_ad.winBidder === "ogury" && adUnits.AFM_stickyFooter_ad.size[0] === 1 || adUnits.AFM_stickyFooter_ad.winBidder === "sparteo" && adUnits.AFM_stickyFooter_ad.size[0] === 1) {
          adUnits.AFM_stickyFooter_ad.oopWinner();
          adUnits.AFM_stickyFooter_ad.autorefresh = bidders[adUnits.AFM_stickyFooter_ad.winBidder].autorefresh;
        } else if (adUnits.AFM_stickyFooter_ad.winBidder === "missena") {
          adUnits.AFM_stickyFooter_ad.show([320, 100]);
          adUnits.AFM_stickyFooter_ad.divRef.style.maxWidth = AFM_page.isMobile() ? "320px" : "728px";
        } else {
          adUnits.AFM_stickyFooter_ad.show(adUnits.AFM_stickyFooter_ad.size);
          adUnits.AFM_stickyFooter_ad.divRef.style.maxWidth = "initial";
        }
      }
      if (adUnits[t.slot.getSlotElementId()].status === "live") {
        adRefreshManager.tallyRenders();
      } else if (adUnits[t.slot.getSlotElementId()].status === "dormant") {
        adUnits[t.slot.getSlotElementId()].status = "live";
      }
    });
    googletag.pubads().addEventListener("slotVisibilityChanged", function (t) {
      adUnits[t.slot.getSlotElementId()].inViewPerc = t.inViewPercentage;
      adUnits[t.slot.getSlotElementId()].inView = t.inViewPercentage >= 66;
    });
  });
}
