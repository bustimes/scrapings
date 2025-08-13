/*v12.6.21 - 13-08-25 - 09:59 GMT+1*/
function AFM_getParameterByName(e, t) {
    t = t || window.location.href, e = e.replace(/[\[\]]/g, "\\$&");
    t = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return t ? t[2] ? decodeURIComponent(t[2].replace(/\+/g, " ")) : "" : null
}

function AFMpageManager() {
    function o(e, t) {
        if (void 0 !== t) try {
            return top.document.getElementsByClassName(e)[t]
        } catch (e) {} else try {
            return top.document.getElementById(e)
        } catch (e) {}
    }
    window.location.pathname.length <= 1 ? this.path = ["home"] : (AM_urlTruncatedDot = window.location.pathname.split(".")[0], this.path = AM_urlTruncatedDot.split("/"), this.path.shift(), "" == this.path[this.path.length - 1] && this.path.pop()), this.protocol = window.location.protocol, this.domain = window.location.host, this.getPageType = function() {
        return "home" === this.path[0] ? "home" : "regions" === this.path[0] && 2 === this.path.length ? "regions" : "operators" === this.path[0] && 2 === this.path.length ? "operators" : "services" === this.path[0] && 2 === this.path.length ? "services" : "stops" === this.path[0] && 2 === this.path.length ? "stops" : "stations" === this.path[0] && 2 === this.path.length ? "stations" : "areas" === this.path[0] && 2 === this.path.length ? "areas" : "districts" === this.path[0] && 2 === this.path.length ? "districts" : "localities" === this.path[0] && 2 === this.path.length ? "localities" : "search" === this.path[0] ? "searchResults" : "trips" === this.path[0] && 2 === this.path.length ? "trips" : "map" === this.path[0] && 1 === this.path.length ? "map" : "services" === this.path[0] && 3 === this.path.length && "vehicles" === this.path[2] ? "serviceVehicles" : "vehicles" === this.path[0] && 3 === this.path.length && "tfl" === this.path[2] ? "trackedVehicle" : "vehicles" === this.path[0] && 2 === this.path.length ? "vehicles" : "registrations" === this.path[0] && 3 === this.path.length ? "registrations" : "licences" === this.path[0] && 2 === this.path.length ? "licences" : "vehicles" === this.path[0] && 3 === this.path.length && "history" === this.path[2] ? "vehicleHistory" : "accounts" === this.path[0] && 2 === this.path.length ? "accountLogin" : "accounts" === this.path[0] && 3 === this.path.length && "users" === this.path[1] ? "userActivity" : "operators" === this.path[0] && 3 === this.path.length && "map" === this.path[2] ? "operatorMap" : "operators" === this.path[0] && 3 === this.path.length && "vehicles" === this.path[2] ? "operatorVehicles" : "contact" === this.path[0] && 1 === this.path.length ? "contact" : "data" === this.path[0] && 1 === this.path.length ? "data" : "cookies" === this.path[0] && 1 === this.path.length ? "cookies" : "default"
    }, this.pageType = this.getPageType(), this.insertAfter = function(e, t) {
        try {
            t.parentNode.insertBefore(e, t.nextSibling)
        } catch (e) {}
    }, this.insertBefore = function(e, t) {
        try {
            t.parentNode.insertBefore(e, t)
        } catch (e) {}
    }, this.getRandomInt = function(e, t) {
        return e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1) + e)
    }, this.waitForElement = function(a) {
        return new Promise(function(s, e) {
            var n, t = document.querySelector(a);
            t ? s(t) : (n = new MutationObserver(function(e) {
                e.forEach(function(e) {
                    for (var t = Array.from(e.addedNodes), i = 0; i < t.length; i++)
                        if (t[i].matches && t[i].matches(a)) return n.disconnect(), void s(t[i])
                })
            })).observe(document.documentElement, {
                childList: !0,
                subtree: !0
            })
        })
    }, this.generateAdOfSizeAndStyle = function(e, t, i, s) {
        const n = top.document.createElement("div");
        return e && n.setAttribute("id", e), t && n.setAttribute("style", t), i && (Array.isArray(i) ? i.forEach(function(e) {
            n.classList.add(e)
        }) : n.classList.add(i)), s && "string" == typeof s && (n.innerHTML = s, n.setAttribute("id", e + "_container")), n
    }, this.insertAd = function(e) {
        var t = e.injectMap[this.getPageType()] || e.injectMap.all;
        e.divRef = this.generateAdOfSizeAndStyle(e.name, t[1], void 0 !== t[5] && t[5], void 0 !== t[6] && t[6]);
        var i = 0;
        void 0 === t[4] || !1 === t[4] ? i = "AFM_sidebarSticky_ad" !== e.name ? o(t[2][0], t[2][1]) : o(t[2][0], t[2][1]).children[o("col col-12 col-md-4 sidebar", 0).childElementCount - 1] : !0 === t[4] && (i = o(t[2][0], t[2][1]).children[function(e, t) {
            for (var i = 0, s = 2; 0 < s; s--)
                if (null === o(e, t).children[s].firstElementChild) {
                    i = s;
                    break
                } return i
        }(t[2][0], t[2][1])]);
        try {
            t[3] && "boolean" == typeof t[3] ? i = i.firstChild : t[3] && "number" == typeof t[3] && (i = i.children[t[3]]), this[t[0]](e.divRef, i), e.disableLazyLoad || e.lazyLoad()
        } catch (e) {}
    }, this.setResizeBreaks = function() {
        var t = [],
            e = [];
        for (adUnits.AFMforEach(function(e) {
                (e.gptSlot || e.injectMap) && e.slotSizeMap.forEach(function(e) {
                    t.push(e[0][0])
                })
            }), (t = t.filter(function(e, t, i) {
                return i.indexOf(e) === t
            })).sort(function(e, t) {
                return e - t
            }), t.shift(), t.unshift(t[0] - 1), i = 0; i < t.length; i++) 0 === i ? e.push(window.matchMedia("(max-width: " + t[i] + "px)")) : i === t.length - 1 ? e.push(window.matchMedia("(min-width: " + t[i] + "px)")) : e.push(window.matchMedia("(min-width: " + t[i] + "px) and (max-width: " + (t[i + 1] - 1) + "px)")), t[i];
        var s = 0;

        function n() {
            clearTimeout(s), s = 0, refreshAds("windowResize")
        }
        e.forEach(function(e) {
            e.addListener(function(e) {
                e.matches && (s && clearTimeout(s), s = 0, s = setTimeout(n, 1500))
            })
        })
    }, this.isMobile = function() {
        try {
            return !!/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)
        } catch (e) {}
    }, this.relocateAd = function(t, i, s, n, a) {
        this.waitForElement("#" + t).then(function(e) {
            adUnits[t].divRef = e, "string" == typeof s && (s = o(s)), AFM_page[i](adUnits[t].divRef, s), a && (adUnits[t].divRef.outerHTML = a), n && adUnits[t].divRef.setAttribute("style", n)
        })
    }, this.insertPrivSet = function() {
        this.waitForElement("#elFooterLinks").then(function(e) {
            var t = top.document.createElement("li");
            t.setAttribute("id", "privacySettings"), t.setAttribute("style", "cursor:pointer"), t.innerHTML = "<a>Privacy Settings</a>", e.appendChild(t), t.onclick = function() {
                window.__tcfapi("displayConsentUi", 2, function() {})
            }
        })
    }, this.insertFootMargin = function() {
        o("ipsLayout_footer").style.marginBottom = "100px"
    }
}
var AFM_page = new AFMpageManager;

function getPageURLForPrebid() {
    let e = window.location.href;
    try {
        var t = document.querySelector('head link[rel="canonical"]');
        t && t.href && (e = t.href)
    } catch (e) {}
    return e
}

function getContentTitleForPrebid(e = " - eFestivals") {
    let t = "";
    try {
        const i = document.querySelector("head title");
        i && i.textContent ? t = i.textContent.trim() : document.title && (t = document.title.trim()), e && t.endsWith(e) && (t = t.substring(0, t.length - e.length).trim())
    } catch (e) {}
    return t
} {
    const wa = {
        complete: 1,
        ver: "1.0",
        nodes: [{
            asi: "adfirst.media",
            sid: "031",
            hp: 1
        }]
    };
    var pbDebugStatus = !!AFM_getParameterByName("pbdebug");

    function insertGE() {
        window.grumi = {
            key: "743a63be-4391-4edf-b398-4749ac9e681e"
        };
        var e = document.createElement("script");
        e.async = !0, e.type = "text/javascript", e.src = "https://rumcdn.geoedge.be/743a63be-4391-4edf-b398-4749ac9e681e/grumi-ip.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    }
    AFM_getParameterByName("testpage") && AFM_page.path.push(AFM_getParameterByName("testpage")), insertGE(),
        function() {
            var e = document.createElement("script");
            e.async = !0, e.type = "text/javascript", e.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        }(),
        function(i, s, e, t, n) {
            function a(e, t) {
                s[i]._Q.push([e, t])
            }
            s[i] || (s[i] = {
                init: function() {
                    a("i", arguments)
                },
                fetchBids: function() {
                    a("f", arguments)
                },
                setDisplayBids: function() {},
                targetingKeys: function() {
                    return []
                },
                _Q: []
            }, (t = e.createElement("script")).async = !0, t.src = "https://c.amazon-adsystem.com/aax2/apstag.js", (n = e.getElementsByTagName("script")[0]).parentNode.insertBefore(t, n))
        }("apstag", window, document), apstag.init({
            pubID: "e0d916db-618d-4b79-a74c-cc9f1c34c4bc",
            adServer: "googletag",
            isSelfServePub: !0,
            simplerGPT: !0,
            schain: wa
        }),
        function() {
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://ap.lijit.com/www/sovrn_beacon_standalone/sovrn_standalone_beacon.js?iid=13405474", e.id = "sBeacon";
            var t = document.getElementsByTagName("head")[0];
            t.insertBefore(e, t.firstChild)
        }(),
        function() {
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://csync.smilewanted.com?zoneCode=adfirstmedia.com_hb_display";
            var t = document.getElementsByTagName("head")[0];
            t.insertBefore(e, t.firstChild)
        }(),
        function() {
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = "https://cdn.adfirst.media/hb/pb_9420_bt.js";
            var t = document.getElementsByTagName("head")[0];
            t.insertBefore(e, t.firstChild)
        }();
    var googletag = googletag || {};

    function afm_bidTimeout() {
        return adAutorefreshCounter < 2 ? 1500 : 3e3
    }
    googletag.cmd = googletag.cmd || [], googletag.cmd.push(function() {
        googletag.pubads().disableInitialLoad()
    }), Object.defineProperty(Object.prototype, "AFMforEach", {
        value: function(e, t) {
            if (null == this) throw new TypeError("Not an object");
            for (var i in t = t || window, this) this.hasOwnProperty(i) && e.call(t, this[i], i, this)
        }
    });
    var afm_limitedAds = Math.random() < .5,
        afm_limitedAdsActive = !1,
        AFMnetworkCode = "1269065",
        childNetworkCode = "24087856",
        siteGptPath = "/PUB031_BusTimes/PUB031_BusTimes_",
        AMhouseColour = "#FFFF9E",
        originalBidCSS = "font-weight: bold;",
        makeNet85 = .85,
        makeNet86 = .86,
        usdRate = .74,
        euroRate = .86,
        adAutorefreshEnabled = 1,
        adAutorefreshCounter = 1,
        fruitlessRefreshAttempt = 0,
        fruitlessRefreshLimit = 60,
        globalAdRefreshLimit = 100,
        AMfooterOn = !0,
        lazyLoadOffset = (window.innerWidth, 700);

    function AuctionObject(e, t, i, s, n) {
        this.type = e, this.name = t, this.status = i, this.autorefresh = s, this.refreshWhenWindowResized = n
    }

    function AdUnit(e, t, i, s, n, a, o, r) {
        AuctionObject.call(this, "adunit", e, t, i, s), this.refreshLimit = n, this.refreshCounter = 0, this.dismissed = !1, this.divRef = t, this.gptSlot = !1, this.slotSizeMap = [], this.pageType = a, this.adUnitPath = o, this.injectMap = r || !1
    }
    AuctionObject.prototype.setStatus = function(e) {
        this.status = e
    }, AuctionObject.prototype.getStatus = function() {
        return "bidder" === this.type ? this.status : "adunit" === this.type ? "adUnitLive-" + ("live" === this.status || "dormant" === this.status) : void 0
    }, AuctionObject.prototype.isActive = function() {
        return "bidder" === this.type ? "active" === this.status : "adunit" === this.type ? this.status : void 0
    }, AuctionObject.prototype.willAutorefresh = function() {
        return this.autorefresh
    }, AuctionObject.prototype.setAutorefresh = function(e) {
        this.autorefresh = e
    }, AuctionObject.prototype.willRefreshWithWindowResize = function() {
        return this.refreshWhenWindowResized
    }, AuctionObject.prototype.setRefreshWithWindowResize = function(e) {
        this.refreshWhenWindowResized = e
    }, AuctionObject.prototype.determineStatusForRefresh = function(e) {
        ("active" !== this.status || "auto" !== e || this.autorefresh) && ("active" !== this.status || "windowResize" !== e || this.refreshWhenWindowResized) ? "bidder" === this.type && "active" === this.status && "windowResize" === e && (this.autorefresh || (this.status = "inactive")): this.status = "inactive"
    }, AdUnit.prototype = Object.create(AuctionObject.prototype), Object.defineProperty(AdUnit.prototype, "constructor", {
        value: AdUnit,
        enumerable: !1,
        writable: !0
    }), AdUnit.prototype.adExistsInDom = function() {
        return !!this.divRef
    }, AdUnit.prototype.updateAdInDomStatus = function() {
        return 0 != this.divRef && (this.divRef = document.getElementById(this.name), this.adHidden() && (this.status = !1)), !!this.divRef
    }, AdUnit.prototype.adHidden = function() {
        return !this.divRef || "AFM_stickyFooter_ad" !== this.name && ("none" === window.getComputedStyle(this.divRef).display || "hidden" === window.getComputedStyle(this.divRef).visibility)
    }, AdUnit.prototype.setGptSlot = function(e) {
        return this.gptSlot = e
    }, AdUnit.prototype.adHorizontalAlign = function(e) {
        this.adExistsInDom() && (this.divRef.style.textAlign = e)
    }, AdUnit.prototype.getRefreshLimit = function() {
        return this.refreshLimit
    }, AdUnit.prototype.getRefreshCount = function() {
        return this.refreshCounter
    }, AdUnit.prototype.incrementRefreshCounter = function() {
        return this.refreshCounter++, this.refreshCounter === this.refreshLimit && (this.autorefresh = !1), 10 < this.refreshCounter ? "beyond10" : this.refreshCounter
    }, AdUnit.prototype.hasBeenDismissed = function() {
        return this.dismissed
    }, AdUnit.prototype.getSizes = function() {
        var e = window.innerWidth,
            t = [];
        if (0 < this.slotSizeMap.length)
            for (i = 0; i < this.slotSizeMap.length; i++)
                if (e > this.slotSizeMap[i][0][0]) {
                    t = 0 < this.slotSizeMap[i][1].length ? this.slotSizeMap[i][1] : [
                        [0, 0]
                    ];
                    break
                } return t
    }, AdUnit.prototype.inSizeBracket = function() {
        return 0 < this.slotSizeMap.length && !!this.getSizes()[0][0]
    }, AdUnit.prototype.foldOffset = function() {
        if (this.divRef) return this.divRef.getBoundingClientRect().top - window.innerHeight
    }, AdUnit.prototype.gptAssign = function() {
        var e = this;
        assignGptSlot(e, function() {
            fetchHeaderBids([e.gptSlot], "function" == typeof e.prebidAdUnit ? [e.prebidAdUnit()] : [], afm_bidTimeout(), !1, ["active", "adUnitLive-true"], "lazy")
        })
    }, AdUnit.prototype.lazyLoad = function() {
        var t = !1,
            i = this;
        window.addEventListener("scroll", function(e) {
            i.foldOffset() < lazyLoadOffset && !t && (this.removeEventListener("scroll", arguments.callee, !1), t = !0, i.gptAssign())
        })
    }, AdUnit.prototype.addClass = function(e) {
        e && (Array.isArray(e) ? e.forEach(function(e) {
            this.divRef.classList.add(e)
        }) : this.divRef.classList.add(e))
    };
    var adUnits = {
        AFM_stickyFooter_ad: new AdUnit("AFM_stickyFooter_ad", !0, !0, !0, globalAdRefreshLimit, ["all"], "1x1"),
        AFM_inContentTop_ad: new AdUnit("AFM_inContentTop_ad", !0, !0, !0, globalAdRefreshLimit, ["home", "areas", "regions", "localities", "operators", "searchResults", "services", "stops", "stations", "operatorVehicles"], "unit1")
    };
    adUnits.AFM_stickyFooter_ad.slotSizeMap = [
        [
            [985, 100],
            [
                [1, 1],
                [970, 90],
                [728, 90],
                [468, 60],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [749, 100],
            [
                [1, 1],
                [728, 90],
                [468, 60],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [483, 100],
            [
                [1, 1],
                [468, 60],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [335, 0],
            [
                [1, 1],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [0, 0],
            [
                [1, 1],
                [300, 50]
            ]
        ]
    ], adUnits.AFM_inContentTop_ad.slotSizeMap = [
        [
            [970, 100],
            [
                [970, 90],
                [728, 90],
                [468, 60],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [728, 100],
            [
                [728, 90],
                [468, 60],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [468, 100],
            [
                [468, 60],
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [320, 100],
            [
                [320, 100],
                [320, 50],
                [300, 50]
            ]
        ],
        [
            [0, 0],
            [
                [300, 50]
            ]
        ]
    ];
    var gptAdSlots = [];

    function AFM_generateNetworkCode() {
        return AFM_page.domain.includes("bustimes") ? AFMnetworkCode.concat(",", childNetworkCode) : (adAutorefreshEnabled = 0, AFMnetworkCode)
    }
    var AFMprocessedNetworkCode = AFM_generateNetworkCode();

    function assignGptSlot(t, i) {
        googletag.cmd.push(function() {
            let e = JSON.parse(JSON.stringify(t.slotSizeMap));
            t.name.includes("Footer") || e.forEach(function(e) {
                e[1].push("fluid")
            }), gptAdSlots.push(t.setGptSlot(googletag.defineSlot("/" + AFMprocessedNetworkCode + siteGptPath + t.adUnitPath, [1, 1], t.name).defineSizeMapping(e).setCollapseEmptyDiv(!0).addService(googletag.pubads()))), "function" == typeof i && i()
        })
    }
    var afm_deleteThese = [];
    adUnits.AFMforEach(function(e) {
        !0 === e.status && (e.pageType.includes(AFM_page.pageType) || e.pageType.includes("all")) && e.inSizeBracket() && !e.injectMap ? (assignGptSlot(e), e.status = "live") : "dormant" === e.status && (e.pageType.includes(AFM_page.pageType) || e.pageType.includes("all")) && e.inSizeBracket() && !e.injectMap ? e.lazyLoad() : "dormant" === e.status && (e.pageType.includes(AFM_page.pageType) || e.pageType.includes("all")) && e.inSizeBracket() && e.injectMap ? AFM_page.insertAd(e) : !0 === e.status && (e.pageType.includes(AFM_page.pageType) || e.pageType.includes("all")) && e.inSizeBracket() && e.injectMap && e.disableLazyLoad ? (assignGptSlot(e), e.status = "live", AFM_page.insertAd(e)) : e.status && (e.pageType.includes(AFM_page.pageType) || e.pageType.includes("all")) || afm_deleteThese.push(e.name)
    }), googletag.cmd.push(function() {
        googletag.pubads().enableSingleRequest(), googletag.pubads().collapseEmptyDivs(!0, !0), googletag.pubads().setTargeting("protocol", AFM_page.protocol).setTargeting("domain", AFM_page.domain).setTargeting("path", AFM_page.path).setTargeting("impression_type", "first").setTargeting("page_type", AFM_page.getPageType()), googletag.enableServices()
    });
    var bidders = {
        adagio: new AuctionObject("bidder", "adagio", "active", !0, !0),
        adpone: new AuctionObject("bidder", "adpone", "inactive", !0, !0),
        adtelligent: new AuctionObject("bidder", "adtelligent", "active", !0, !0),
        amazon: new AuctionObject("bidder", "amazon", "active", !0, !0),
        brightcom: new AuctionObject("bidder", "brightcom", "inactive", !0, !0),
        conversant: new AuctionObject("bidder", "conversant", "active", !0, !0),
        gumgum: new AuctionObject("bidder", "gumgum", "active", !0, !0),
        improvedigital: new AuctionObject("bidder", "improvedigital", "active", !0, !0),
        medianet: new AuctionObject("bidder", "medianet", "active", !0, !0),
        nexxen: new AuctionObject("bidder", "nexxen", "active", !0, !0),
        oftmedia: new AuctionObject("bidder", "oftmedia", "inactive", !0, !0),
        ogury: new AuctionObject("bidder", "ogury", "active", !0, !0),
        onetag: new AuctionObject("bidder", "onetag", "active", !0, !0),
        richaudience: new AuctionObject("bidder", "richaudience", "active", !0, !0),
        rise: new AuctionObject("bidder", "rise", "active", !0, !0),
        rubicon: new AuctionObject("bidder", "rubicon", "active", !0, !0),
        smartadserver: new AuctionObject("bidder", "smartadserver", "active", !0, !0),
        smilewanted: new AuctionObject("bidder", "smilewanted", "active", !0, !0),
        sovrn: new AuctionObject("bidder", "sovrn", "active", !0, !0),
        sublime: new AuctionObject("bidder", "sublime", "inactive", !1, !0),
        triplelift: new AuctionObject("bidder", "triplelift", "inactive", !0, !0)
    };
    bidders.medianet.crid = AFM_page.isMobile() ? "815311453" : "633827357";
    var refreshPeriod = 3e4,
        afm_hour = (new Date).getHours();
    3 <= afm_hour && afm_hour <= 17 && (refreshPeriod = 2e4);
    var adUnitsToRefreshGAM = [],
        refreshPeriodAfterTabBackInFocus = 1500,
        AMhbFooterAuctionWinner = 0,
        AMrefreshLoop = null,
        AMtabVisible = !0,
        AMattemptedRefreshButTabNotInFocus = !1,
        AMfooterDismissedByUser = !1,
        gamAmznID = 4776868705,
        AMfooterRiseSpeed = 500;

    function ggFloorBrackets() {
        var e = (new Date).getHours();
        let t = 3;
        return 0 <= e && e <= 4 ? t = 3.75 : 4 < e && e <= 11 ? t = 4 : 11 < e && e <= 16 ? t = 3 : 16 < e && e <= 18 ? t = 3.5 : 18 < e && (t = 2.5), t
    }

    function AMcompileAdUnits(t) {
        var i = [];
        return adUnits.AFMforEach(function(e) {
            ("live" !== e.status || void 0 === e.prebidAdUnit || "auto" === t) && ("live" !== e.status || void 0 === e.prebidAdUnit || "auto" !== t || !isInViewport(e.name) && "oop" !== (null != e.adType && e.adType)) || i.push(e.prebidAdUnit())
        }), i
    }
    adUnits.AFM_stickyFooter_ad.init = function() {
        this.originalParams = [this.autorefresh, this.refreshWhenWindowResized, this.status], this.lastWin = !1, this.adType = "", this.zin = "2147483647", this.riseSpeed = 500, this.ready = !1, this.bufferPx = 20, this.rebuilt = !1, this.shellDiv = top.document.createElement("div"), this.shellDiv.setAttribute("id", "stickyAdContainer"), this.shellDiv.setAttribute("style", "text-align:center;position:fixed;bottom:-300px;width:100%;-webkit-transition: all " + this.riseSpeed + "ms ease-out;z-index:" + this.zin + ";"), this.styleSheet = top.document.createElement("style"), AFM_page.waitForElement("body").then(function(e) {
            e.appendChild(adUnits.AFM_stickyFooter_ad.shellDiv), e.appendChild(adUnits.AFM_stickyFooter_ad.styleSheet), adUnits.AFM_stickyFooter_ad.build()
        })
    }, adUnits.AFM_stickyFooter_ad.applyClass = function(e) {
        this.divRef.classList.add(e)
    }, adUnits.AFM_stickyFooter_ad.getStdStyle = function(e) {
        return "#stickyAdContainer {text-align:center;position:fixed;bottom:-" + (this.size[1] + this.bufferPx) + "px;width:100%;-webkit-transition: all " + AMfooterRiseSpeed + "ms ease-out;z-index:" + this.zin + ";pointer-events: none;display:block !important;} #AFM_stickyFooter_ad {display:inline-block !important;pointer-events: all;max-height:100px} #closeBox {display:inline-block;pointer-events: all;} .drawBorder {border-width:2px;border-color:" + AMhouseColour + ";border-style:solid;border-bottom: 0;-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);-moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);display:inline-block;background-color:white;} #closeBox:hover {transform: rotate(90deg); transition: transform 0.5s;} #body {padding-top:0px !important;}"
    }, adUnits.AFM_stickyFooter_ad.getOopStyle = function(e) {
        return "#stickyAdContainer {position:fixed !important;bottom:0px !important;height:100px !important;width:100% !important;z-index:" + this.zin + " !important;pointer-events: none !important;display:block !important;} #AFM_stickyFooter_ad {display:inline-block !important;pointer-events: none !important;height:100px !important;width:100% !important;z-index:" + this.zin + " !important;} #body {padding-top:0px !important;}"
    }, adUnits.AFM_stickyFooter_ad.build = function() {
        this.divRef = top.document.createElement("div"), this.divRef.setAttribute("id", "AFM_stickyFooter_ad"), this.divRef.setAttribute("style", "margin:auto;display:inline-block;"), this.shellDiv.appendChild(this.divRef), this.ready = !0
    }, adUnits.AFM_stickyFooter_ad.getCloseBox = function() {
        var e = top.document.createElement("div");
        return e.setAttribute("id", "closeBox"), e.setAttribute("style", "display:inline-block;position:absolute;cursor:pointer;z-index:" + this.zin + ";height:20px;width:20px;margin:-10px;line-height:0px;"), e.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="Layer1"><circle cx="256" cy="257" r="151.5" style="fill:#000;"/></g><path d="M256,33c-123.7,0 -224,100.3 -224,224c0,123.7 100.3,224 224,224c123.7,0 224,-100.3 224,-224c0,-123.7 -100.3,-224 -224,-224Zm108.3,299.5c1.5,1.5 2.3,3.5 2.3,5.6c0,2.1 -0.8,4.2 -2.3,5.6l-21.6,21.7c-1.6,1.6 -3.6,2.3 -5.6,2.3c-2,0 -4.1,-0.8 -5.6,-2.3l-75.5,-75.6l-75.4,75.7c-1.5,1.6 -3.6,2.3 -5.6,2.3c-2,0 -4.1,-0.8 -5.6,-2.3l-21.6,-21.7c-1.5,-1.5 -2.3,-3.5 -2.3,-5.6c0,-2.1 0.8,-4.2 2.3,-5.6l75.7,-76l-75.9,-75c-3.1,-3.1 -3.1,-8.2 0,-11.3l21.6,-21.7c1.5,-1.5 3.5,-2.3 5.6,-2.3c2.1,0 4.1,0.8 5.6,2.3l75.7,74.7l75.7,-74.7c1.5,-1.5 3.5,-2.3 5.6,-2.3c2.1,0 4.1,0.8 5.6,2.3l21.6,21.7c3.1,3.1 3.1,8.2 0,11.3l-75.9,75l75.6,75.9Z" style="fill:' + AMhouseColour + ';fill-rule:nonzero;"/></svg>', e
    }, adUnits.AFM_stickyFooter_ad.show = function() {
        "oop" === this.adType && this.clearOop(this.lastWin), "std" != this.adType && (this.closeBox = this.getCloseBox(), this.shellDiv.appendChild(this.closeBox), this.closeBox.onclick = function() {
            adUnits.AFM_stickyFooter_ad.dismiss()
        }, this.styleSheet.innerHTML = this.getStdStyle(), this.applyClass("drawBorder"), this.rise(), this.adType = "std"), this.lastWin = this.winBidder
    }, adUnits.AFM_stickyFooter_ad.oopWinner = function() {
        "oop" === this.adType && adUnits.AFM_stickyFooter_ad.clearOop(this.lastWin), "oop" != this.adType && (this.closeBox && this.closeBox.remove(), this.styleSheet.innerHTML = this.getOopStyle(), this.adType = "oop"), this.lastWin = this.winBidder
    }, adUnits.AFM_stickyFooter_ad.sink = function() {
        this.shellDiv.style.bottom = "-" + (this.size[1] + this.bufferPx) + "px"
    }, adUnits.AFM_stickyFooter_ad.rise = function() {
        this.shellDiv.style.bottom = "0px"
    }, adUnits.AFM_stickyFooter_ad.flush = function() {
        this.shellDiv.innerHTML = ""
    }, adUnits.AFM_stickyFooter_ad.clearOop = function(e) {
        e = e || this.winBidder;
        "gumgum" === e && "object" == typeof GUMGUM ? GUMGUM.InScreenAd.removeISAd() : "justpremium" === e ? document.querySelectorAll("[jpx-object-id]").forEach(function(e) {
            e.remove()
        }) : "sublime" === e && "object" == typeof sublime && sublime.cleanUp()
    }, adUnits.AFM_stickyFooter_ad.basta = function() {
        this.adType = "", this.clearOop(), this.flush()
    }, adUnits.AFM_stickyFooter_ad.rebuild = function() {
        this.dismissed ? (this.dismissed = !1, this.setAutorefresh(this.originalParams[0]), this.setRefreshWithWindowResize(this.originalParams[1]), this.status = this.originalParams[2]) : this.basta(), this.build(), this.refreshCounter = 0, this.rebuilt = !0, this.gptSlot.setTargeting("impression_type", "first")
    }, adUnits.AFM_stickyFooter_ad.dismiss = function() {
        !1 === this.dismissed && (this.dismissed = !0, this.adType = "", this.sink(), setTimeout(function() {
            adUnits.AFM_stickyFooter_ad.flush()
        }, 800), this.setAutorefresh(!1), this.setRefreshWithWindowResize(!1), this.status = !1)
    }, AMfooterOn && adUnits.AFM_stickyFooter_ad.init(), adUnits.AFM_stickyFooter_ad.prebidAdUnit = function() {
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
                    value: .92,
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
                labelAll: [bidders.rubicon.getStatus()],
                params: {
                    accountId: "9906",
                    siteId: "478854",
                    zoneId: "2843708",
                    position: "atf"
                }
            }, {
                bidder: "improvedigital",
                labelAll: [bidders.improvedigital.getStatus()],
                params: {
                    publisherId: 945,
                    placementId: 22978366
                }
            }, {
                bidder: "onetag",
                labelAll: [bidders.onetag.getStatus()],
                params: {
                    pubId: "6b84a4b65743e60"
                }
            }, {
                bidder: "adagio",
                labelAll: [bidders.adagio.getStatus()],
                params: {
                    organizationId: "1254",
                    site: "bustimes"
                }
            }, {
                bidder: "adtelligent",
                labelAll: [bidders.adtelligent.getStatus()],
                params: {
                    aid: 765905
                }
            }, {
                bidder: "sovrn",
                labelAll: [bidders.sovrn.getStatus()],
                params: {
                    tagid: "1128818"
                }
            }, {
                bidder: "gumgum",
                labelAll: [bidders.gumgum.getStatus()],
                params: {
                    zone: "wp9kcvco",
                    bidfloor: 4
                }
            }, "inactive" !== bidders.ogury.getStatus() && AFM_page.isMobile() ? {
                bidder: "ogury",
                labelAll: [bidders.ogury.getStatus()],
                params: {
                    assetKey: "OGY-2DF6DF686124",
                    adUnitId: "3c71a836-d1ec-47c4-88f4-24f60803a133"
                }
            } : {}, {
                bidder: "richaudience",
                labelAll: [bidders.richaudience.getStatus()],
                params: {
                    pid: "Y6xAlkJvxW",
                    supplyType: "site",
                    bidfloor: .03
                }
            }, {
                bidder: "unruly",
                labelAll: [bidders.nexxen.getStatus()],
                params: {
                    siteId: 263646
                }
            }, {
                bidder: "oftmedia",
                labelAll: [bidders.oftmedia.getStatus()],
                params: {
                    placementId: 30664625
                }
            }, {
                bidder: "rise",
                labelAll: [bidders.rise.getStatus()],
                params: {
                    org: "65521a2351174d0001dbbd6f",
                    floorPrice: .15
                }
            }, {
                bidder: "conversant",
                labelAll: [bidders.conversant.getStatus()],
                params: {
                    site_id: "231091",
                    bidfloor: .03,
                    secure: 1
                }
            }, {
                bidder: "triplelift",
                labelAll: [bidders.triplelift.getStatus()],
                params: {
                    inventoryCode: "Bustimes_HDX_Prebid",
                    floor: .03
                }
            }, {
                bidder: "medianet",
                labelAll: [bidders.medianet.getStatus()],
                params: {
                    cid: "8CUR4Y285",
                    crid: bidders.medianet.crid,
                    floor: .03
                }
            }, {
                bidder: "smartadserver",
                labelAll: [bidders.smartadserver.getStatus()],
                params: {
                    siteId: 652522,
                    pageId: 1969098,
                    formatId: 130313,
                    bidfloor: .03
                }
            }, {
                bidder: "smilewanted",
                labelAll: [bidders.smilewanted.getStatus()],
                params: {
                    zoneId: "adfirstmedia.com_hb_display",
                    bidfloor: .03
                }
            }, "inactive" === bidders.ogury.getStatus() || AFM_page.isMobile() ? {} : {
                bidder: "ogury",
                labelAll: [bidders.ogury.getStatus()],
                params: {
                    assetKey: "OGY-2DF6DF686124",
                    adUnitId: "wd-hb-stdb-bustim-adfir-1j417ssl7wnx"
                }
            }]
        }
    }, adUnits.AFM_inContentTop_ad.prebidAdUnit = function() {
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
                labelAll: [bidders.rubicon.getStatus()],
                params: {
                    accountId: "9906",
                    siteId: "478854",
                    zoneId: "2843710",
                    position: "atf"
                }
            }, {
                bidder: "improvedigital",
                labelAll: [bidders.improvedigital.getStatus()],
                params: {
                    publisherId: 945,
                    placementId: 22978365
                }
            }, {
                bidder: "onetag",
                labelAll: [bidders.onetag.getStatus()],
                params: {
                    pubId: "6b84a4b65743e60"
                }
            }, {
                bidder: "adagio",
                labelAll: [bidders.adagio.getStatus()],
                params: {
                    organizationId: "1254",
                    site: "bustimes"
                }
            }, {
                bidder: "adtelligent",
                labelAll: [bidders.adtelligent.getStatus()],
                params: {
                    aid: 765905
                }
            }, {
                bidder: "sovrn",
                labelAll: [bidders.sovrn.getStatus()],
                params: {
                    tagid: "1128819"
                }
            }, {
                bidder: "gumgum",
                labelAll: [bidders.gumgum.getStatus()],
                params: {
                    zone: "wp9kcvco",
                    slot: "989503",
                    bidfloor: .03
                }
            }, {
                bidder: "richaudience",
                labelAll: [bidders.richaudience.getStatus()],
                params: {
                    pid: "rK21whMWyM",
                    supplyType: "site",
                    bidfloor: .03
                }
            }, {
                bidder: "unruly",
                labelAll: [bidders.nexxen.getStatus()],
                params: {
                    siteId: 263646
                }
            }, {
                bidder: "oftmedia",
                labelAll: [bidders.oftmedia.getStatus()],
                params: {
                    placementId: 30664625
                }
            }, {
                bidder: "rise",
                labelAll: [bidders.rise.getStatus()],
                params: {
                    org: "65521a2351174d0001dbbd6f",
                    floorPrice: .03
                }
            }, {
                bidder: "conversant",
                labelAll: [bidders.conversant.getStatus()],
                params: {
                    site_id: "231091",
                    bidfloor: .03,
                    secure: 1
                }
            }, {
                bidder: "triplelift",
                labelAll: [bidders.triplelift.getStatus()],
                params: {
                    inventoryCode: "Bustimes_HDX_Prebid",
                    floor: .03
                }
            }, {
                bidder: "medianet",
                labelAll: [bidders.medianet.getStatus()],
                params: {
                    cid: "8CUR4Y285",
                    crid: bidders.medianet.crid,
                    floor: .03
                }
            }, {
                bidder: "smartadserver",
                labelAll: [bidders.smartadserver.getStatus()],
                params: {
                    siteId: 652522,
                    pageId: 1969099,
                    formatId: 130337,
                    bidfloor: .03
                }
            }, {
                bidder: "smilewanted",
                labelAll: [bidders.smilewanted.getStatus()],
                params: {
                    zoneId: "adfirstmedia.com_hb_display",
                    bidfloor: .03
                }
            }, "inactive" === bidders.ogury.getStatus() || AFM_page.isMobile() ? {} : {
                bidder: "ogury",
                labelAll: [bidders.ogury.getStatus()],
                params: {
                    assetKey: "OGY-2DF6DF686124",
                    adUnitId: "wd-hb-stdb-bustim-adfir-1j417ssl7wnx"
                }
            }]
        }
    };
    var vis = function() {
        var i, s, e = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        for (i in e)
            if (i in document) {
                s = e[i];
                break
            } return function(e, t) {
            return e && document.addEventListener(s, e, t), !document[i]
        }
    }();
    vis(function() {
        vis() ? setTimeout(function() {
            AMtabVisible = !0, AMattemptedRefreshButTabNotInFocus && !0 !== AMrefreshLoop ? (AMattemptedRefreshButTabNotInFocus = !1, setTimeout(function() {
                refreshBids("auto")
            }, refreshPeriodAfterTabBackInFocus)) : AMattemptedRefreshButTabNotInFocus && !0 === AMrefreshLoop && (AMattemptedRefreshButTabNotInFocus = !1)
        }, 300) : AMtabVisible = !1
    });
    var pbjs = pbjs || {};

    function isInViewport(e) {
        e = top.document.getElementById(e).getBoundingClientRect();
        return 0 <= e.top + .33 * e.height && 0 <= e.left + .33 * e.width && e.bottom - .33 * e.height <= (window.innerHeight || document.documentElement.clientHeight) && e.right - .33 * e.width <= (window.innerWidth || document.documentElement.clientWidth)
    }

    function fetchHeaderBids(n, e, t, a, i, o) {
        var r, s = ["prebid"];
        "active" === bidders.amazon.getStatus() && s.push("amazon"), a && (r = {}, n.forEach(function(e) {
            r[e.getSlotElementId()] = !0
        }));
        var d = {
            adserverRequestSent: !1
        };

        function l(e) {
            !0 !== d.adserverRequestSent && ("amazon" === e ? d.amazon = !0 : "prebid" === e && (d.prebid = !0), s.map(function(e) {
                return d[e]
            }).filter(Boolean).length === s.length && c())
        }

        function c() {
            !0 !== d.adserverRequestSent && (d.adserverRequestSent = !0, pbjs.adserverRequestSent = !0, d.sendAdserverRequest = !0, googletag.cmd.push(function() {
                function e(e) {
                    apstag.setDisplayBids(), pbjs.setTargetingForGPTAsync(), o || (adRefreshManager.reset(), adRefreshManager.numberOfAdUnitsToRender = e.length), e.forEach(function(e) {}), googletag.pubads().refresh(e)
                }
                if (a) {
                    var t, i;
                    "auto" !== a || null !== AMrefreshLoop && !afm_limitedAdsActive ? "windowResize" === a && (n.forEach(function(e) {}), !1 !== r.AFM_stickyFooter_ad && !adUnits.AFM_stickyFooter_ad.hasBeenDismissed() || (-1 !== (t = n.findIndex(function(e) {
                        return "AFM_stickyFooter_ad" === e.getSlotElementId()
                    })) && n.splice(t, 1), n.forEach(function(e) {}), dismissFooter(!1)), googletag.pubads().setTargeting("impression_type", "windowResize"), e(n)) : (i = [], n.forEach(function(e) {
                        var t = e.getSlotElementId();
                        r[t];
                        adUnits[t].hasBeenDismissed() || !0 !== r[t] || !isInViewport(t) && "oop" !== (null != adUnits[t].adType && adUnits[t].adType) || (t = "refresh-" + adUnits[t].incrementRefreshCounter(), adAutorefreshCounter++, e.setTargeting("impression_type", t), i.push(e))
                    }), 0 < i.length ? e(i) : ++fruitlessRefreshAttempt <= fruitlessRefreshLimit && refreshAds("auto"))
                } else {
                    var s = [];
                    if (n.forEach(function(e) {
                            var t = e.getSlotElementId();
                            adUnits[t].updateAdInDomStatus() && adUnits[t].inSizeBracket() && s.push(e)
                        }), o) try {
                        s[0].setTargeting("impression_type", "first"), e(s)
                    } catch (e) {} else googletag.display(s[0].getSlotElementId()), e(s)
                }
            }))
        }

        function u() {
            googletag.cmd.push(function() {
                apstag.fetchBids({
                    slots: n,
                    timeout: t
                }, function(e) {
                    e.forEach(function(e) {
                        "" !== e.amzniid && (adUnits[e.slotID].size = e.size.split("x").map(Number))
                    }), l("amazon")
                })
            }), pbjs.que.push(function() {
                pbjs.requestBids({
                    adUnits: e,
                    labels: i,
                    timeout: t,
                    bidsBackHandler: function(e) {
                        l("prebid")
                    }
                })
            })
        }
        s.forEach(function(e) {
            d[e] = !1
        }), __tcfapi("addEventListener", 2, function(e, t) {
            __uspapi("setUspDftData", 1, function(e, t) {}), t && e.gdprApplies ? "tcloaded" !== e.eventStatus && "useractioncomplete" !== e.eventStatus || !e.purpose.consents[1] ? "cmpuishown" === e.eventStatus || "tcloaded" !== e.eventStatus && "useractioncomplete" !== e.eventStatus || e.purpose.consents[1] || (afm_limitedAds && (googletag.cmd.push(function() {
                googletag.pubads().setTargeting("limitedAds", "true")
            }), afm_limitedAdsActive = !0, c()), __tcfapi("removeEventListener", 2, function(e) {}, e.listenerId)) : (u(), __tcfapi("removeEventListener", 2, function(e) {}, e.listenerId)) : !1 === e.gdprApplies ? (u(), __tcfapi("removeEventListener", 2, function(e) {}, e.listenerId)) : __tcfapi("removeEventListener", 2, function(e) {}, e.listenerId)
        })
    }

    function refreshBids(e) {
        "auto" === e || "windowResize" === e ? fetchHeaderBids(collateAdUnitsForRefresh(e), AMcompileAdUnits(e), afm_bidTimeout(), e, ["active", "adUnitLive-true"]) : adAutorefreshEnabled = 0
    }

    function refreshAds(e) {
        var t = collateAdUnitsForRefresh(e);
        "auto" === e && t && adAutorefreshEnabled ? AMrefreshLoop = setTimeout(function() {
            AMtabVisible ? refreshBids(e) : AMattemptedRefreshButTabNotInFocus = !0, AMrefreshLoop = null
        }, refreshPeriod) : "windowResize" === e && t && (null != AMrefreshLoop && (clearTimeout(AMrefreshLoop), AMrefreshLoop = !0), refreshBids(e))
    }

    function collateAdUnitsForRefresh(t) {
        return bidders.AFMforEach(function(e) {
            e.determineStatusForRefresh(t)
        }), AMcompileAdUnits(), adUnitsToRefreshGAM = [], "windowResize" === t ? adUnits.AFMforEach(function(e) {
            e.determineStatusForRefresh(t), e.willRefreshWithWindowResize() && e.isActive() && 0 != e.gptSlot && adUnitsToRefreshGAM.push(e.gptSlot)
        }) : "auto" === t && adUnits.AFMforEach(function(e) {
            e.updateAdInDomStatus(), e.determineStatusForRefresh(t), e.willAutorefresh() && e.isActive() && 0 != e.gptSlot && adUnitsToRefreshGAM.push(e.gptSlot)
        }), 0 !== adUnitsToRefreshGAM.length && (adUnitsToRefreshGAM.forEach(function(e) {}), adUnitsToRefreshGAM)
    }

    function AdRefreshManager() {
        this.refreshTriggered = 0, this.adUnitsRendered = 0;
        var e = !(this.numberOfAdUnitsToRender = 0);
        this.tallyRenders = function() {
            this.adUnitsRendered++, this.numberOfAdUnitsToRender === this.adUnitsRendered ? (e && (e = !1, AFM_page.setResizeBreaks(), googletag.pubads().clearTargeting("impression_type"), pbjs.setConfig({
                bidderTimeout: afm_bidTimeout()
            })), this.triggerRefresh()) : (this.numberOfAdUnitsToRender, this.adUnitsRendered)
        }, this.triggerRefresh = function() {
            0 === this.refreshTriggered && adAutorefreshEnabled && (this.refreshTriggered = 1, refreshAds("auto"))
        }, this.reset = function() {
            this.refreshTriggered = 0, this.adUnitsRendered = 0, this.numberOfAdUnitsToRender = 0
        }
    }
    pbjs.que = pbjs.que || [], pbjs.que.push(function() {
        AMfooterOn && pbjs.onEvent("bidWon", function(e) {
            adUnits[e.adUnitCode].winEntity = "prebid", adUnits[e.adUnitCode].winBidder = e.bidder, adUnits[e.adUnitCode].size = [e.width, e.height], "AFM_stickyFooter_ad" == e.adUnitCode && (AMadHeight = e.height + 20, AMhbFooterSize = [e.width, e.height], AMhbFooterAuctionWinner = e.bidder)
        }), pbjs.setConfig({
            enableTIDs: !0,
            consentManagement: {
                gdpr: {
                    cmpApi: "iab",
                    timeout: 5e3,
                    actionTimeout: 5e3,
                    defaultGdprScope: !0
                },
                usp: {
                    cmpApi: "iab",
                    timeout: 1e4
                }
            },
            schain: {
                validation: "strict",
                config: wa
            },
            deviceAccess: !0,
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
                    name: "quantcastId"
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
                auctionDelay: 50
            },
            gptPreAuction: {
                mcmEnabled: !0
            },
            debug: pbDebugStatus,
            priceGranularity: "high",
            enableSendAllBids: !1,
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
                singleRequest: !0
            },
            improvedigital: {
                singleRequest: !0
            },
            useBidCache: !0,
            ortb2: {
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
        }), pbjs.bidderSettings = {
            standard: {
                storageAllowed: !0
            },
            rubicon: {
                bidCpmAdjustment: function(e) {
                    return e * makeNet85 * usdRate * .87
                }
            },
            improvedigital: {
                bidCpmAdjustment: function(e) {
                    return e * makeNet86 * usdRate * .977
                }
            },
            sovrn: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .938
                }
            },
            gumgum: {
                bidCpmAdjustment: function(e) {
                    return .94 * e
                }
            },
            ogury: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .9
                }
            },
            onetag: {
                bidCpmAdjustment: function(e) {
                    return .95 * e
                }
            },
            adagio: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .74
                }
            },
            adtelligent: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .945
                }
            },
            richaudience: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .68985
                }
            },
            rise: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .966
                }
            },
            conversant: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .961
                }
            },
            medianet: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .97
                }
            },
            smartadserver: {
                bidCpmAdjustment: function(e) {
                    return e * usdRate * .65
                }
            },
            smilewanted: {
                bidCpmAdjustment: function(e) {
                    return e * euroRate * .95
                }
            }
        }
    }), vis() ? fetchHeaderBids(gptAdSlots, AMcompileAdUnits(), afm_bidTimeout(), !1, ["active", "adUnitLive-true"]) : vis(function() {
        vis() && fetchHeaderBids(gptAdSlots, AMcompileAdUnits(), afm_bidTimeout(), !1, ["active", "adUnitLive-true"])
    }, {
        once: !0
    });
    var adRefreshManager = new AdRefreshManager;
    adRefreshManager.numberOfAdUnitsToRender = gptAdSlots.length, googletag.cmd.push(function() {
        googletag.pubads().addEventListener("slotRenderEnded", function(e) {
            adUnits[e.slot.getSlotElementId()].rendered = !0, 0 == e.advertiserId ? (adUnits[e.slot.getSlotElementId()].winEntity = "google", adUnits[e.slot.getSlotElementId()].size = e.size, adUnits[e.slot.getSlotElementId()].winBidder = "google") : e.advertiserId == gamAmznID ? (adUnits[e.slot.getSlotElementId()].winEntity = "amazon", adUnits[e.slot.getSlotElementId()].winBidder = "amazon") : null == adUnits[e.slot.getSlotElementId()].size && (adUnits[e.slot.getSlotElementId()].size = e.size, adUnits[e.slot.getSlotElementId()].winEntity = "adserver", adUnits[e.slot.getSlotElementId()].winBidder = "direct"), "AFM_stickyFooter_ad" == e.slot.getSlotElementId() && !e.isEmpty && AMfooterOn && ("gumgum" === adUnits.AFM_stickyFooter_ad.winBidder || "justpremium" === adUnits.AFM_stickyFooter_ad.winBidder || "sublime" === adUnits.AFM_stickyFooter_ad.winBidder || "ogury" === adUnits.AFM_stickyFooter_ad.winBidder && 1 === adUnits.AFM_stickyFooter_ad.size[0] ? (adUnits.AFM_stickyFooter_ad.oopWinner(), adUnits.AFM_stickyFooter_ad.autorefresh = bidders[adUnits.AFM_stickyFooter_ad.winBidder].autorefresh) : adUnits.AFM_stickyFooter_ad.show()), "live" === adUnits[e.slot.getSlotElementId()].status ? adRefreshManager.tallyRenders() : "dormant" === adUnits[e.slot.getSlotElementId()].status && (adUnits[e.slot.getSlotElementId()].status = "live")
        }), googletag.pubads().addEventListener("slotVisibilityChanged", function(e) {
            adUnits[e.slot.getSlotElementId()].inViewPerc = e.inViewPercentage, adUnits[e.slot.getSlotElementId()].inView = 66 <= e.inViewPercentage
        })
    })
}