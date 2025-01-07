/*v12.5.27 - 06-01-25 - 19:16 GMT+0*/
function AFM_getParameterByName(t, e) {
    e = e || window.location.href, t = t.replace(/[\[\]]/g, "\\$&");
    e = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
    return e ? e[2] ? decodeURIComponent(e[2].replace(/\+/g, " ")) : "" : null
}

function AFMpageManager() {
    function o(t, e) {
        if (void 0 !== e) try {
            return top.document.getElementsByClassName(t)[e]
        } catch (t) {} else try {
            return top.document.getElementById(t)
        } catch (t) {}
    }
    window.location.pathname.length <= 1 ? this.path = ["home"] : (AM_urlTruncatedDot = window.location.pathname.split(".")[0], this.path = AM_urlTruncatedDot.split("/"), this.path.shift(), "" == this.path[this.path.length - 1] && this.path.pop()), this.protocol = window.location.protocol, this.domain = window.location.host, this.getPageType = function() {
        return "home" === this.path[0] ? "home" : "regions" === this.path[0] && 2 === this.path.length ? "regions" : "operators" === this.path[0] && 2 === this.path.length ? "operators" : "services" === this.path[0] && 2 === this.path.length ? "services" : "stops" === this.path[0] && 2 === this.path.length ? "stops" : "stations" === this.path[0] && 2 === this.path.length ? "stations" : "areas" === this.path[0] && 2 === this.path.length ? "areas" : "districts" === this.path[0] && 2 === this.path.length ? "districts" : "localities" === this.path[0] && 2 === this.path.length ? "localities" : "search" === this.path[0] ? "searchResults" : "trips" === this.path[0] && 2 === this.path.length ? "trips" : "map" === this.path[0] && 1 === this.path.length ? "map" : "services" === this.path[0] && 3 === this.path.length && "vehicles" === this.path[2] ? "serviceVehicles" : "vehicles" === this.path[0] && 3 === this.path.length && "tfl" === this.path[2] ? "trackedVehicle" : "vehicles" === this.path[0] && 2 === this.path.length ? "vehicles" : "registrations" === this.path[0] && 3 === this.path.length ? "registrations" : "licences" === this.path[0] && 2 === this.path.length ? "licences" : "vehicles" === this.path[0] && 3 === this.path.length && "history" === this.path[2] ? "vehicleHistory" : "accounts" === this.path[0] && 2 === this.path.length ? "accountLogin" : "accounts" === this.path[0] && 3 === this.path.length && "users" === this.path[1] ? "userActivity" : "operators" === this.path[0] && 3 === this.path.length && "map" === this.path[2] ? "operatorMap" : "operators" === this.path[0] && 3 === this.path.length && "vehicles" === this.path[2] ? "operatorVehicles" : "contact" === this.path[0] && 1 === this.path.length ? "contact" : "data" === this.path[0] && 1 === this.path.length ? "data" : "cookies" === this.path[0] && 1 === this.path.length ? "cookies" : "default"
    }, this.pageType = this.getPageType(), this.insertAfter = function(t, e) {
        try {
            e.parentNode.insertBefore(t, e.nextSibling)
        } catch (t) {}
    }, this.insertBefore = function(t, e) {
        try {
            e.parentNode.insertBefore(t, e)
        } catch (t) {}
    }, this.getRandomInt = function(t, e) {
        return t = Math.ceil(t), e = Math.floor(e), Math.floor(Math.random() * (e - t + 1) + t)
    }, this.waitForElement = function(a) {
        return new Promise(function(s, t) {
            var n, e = document.querySelector(a);
            e ? s(e) : (n = new MutationObserver(function(t) {
                t.forEach(function(t) {
                    for (var e = Array.from(t.addedNodes), i = 0; i < e.length; i++)
                        if (e[i].matches && e[i].matches(a)) return n.disconnect(), void s(e[i])
                })
            })).observe(document.documentElement, {
                childList: !0,
                subtree: !0
            })
        })
    }, this.generateAdOfSizeAndStyle = function(t, e, i, s) {
        const n = top.document.createElement("div");
        return t && n.setAttribute("id", t), e && n.setAttribute("style", e), i && (Array.isArray(i) ? i.forEach(function(t) {
            n.classList.add(t)
        }) : n.classList.add(i)), s && "string" == typeof s && (n.innerHTML = s, n.setAttribute("id", t + "_container")), n
    }, this.insertAd = function(t) {
        var e = t.injectMap[this.getPageType()] || t.injectMap.all;
        t.divRef = this.generateAdOfSizeAndStyle(t.name, e[1], void 0 !== e[5] && e[5], void 0 !== e[6] && e[6]);
        var i = 0;
        void 0 === e[4] || !1 === e[4] ? i = "AFM_sidebarSticky_ad" !== t.name ? o(e[2][0], e[2][1]) : o(e[2][0], e[2][1]).children[o("col col-12 col-md-4 sidebar", 0).childElementCount - 1] : !0 === e[4] && (i = o(e[2][0], e[2][1]).children[function(t, e) {
            for (var i = 0, s = 2; 0 < s; s--)
                if (null === o(t, e).children[s].firstElementChild) {
                    i = s;
                    break
                } return i
        }(e[2][0], e[2][1])]);
        try {
            e[3] && "boolean" == typeof e[3] ? i = i.firstChild : e[3] && "number" == typeof e[3] && (i = i.children[e[3]]), this[e[0]](t.divRef, i), t.disableLazyLoad || t.lazyLoad()
        } catch (t) {}
    }, this.setResizeBreaks = function() {
        var e = [],
            t = [];
        for (adUnits.AFMforEach(function(t) {
                (t.gptSlot || t.injectMap) && t.slotSizeMap.forEach(function(t) {
                    e.push(t[0][0])
                })
            }), (e = e.filter(function(t, e, i) {
                return i.indexOf(t) === e
            })).sort(function(t, e) {
                return t - e
            }), e.shift(), e.unshift(e[0] - 1), i = 0; i < e.length; i++) 0 === i ? t.push(window.matchMedia("(max-width: " + e[i] + "px)")) : i === e.length - 1 ? t.push(window.matchMedia("(min-width: " + e[i] + "px)")) : t.push(window.matchMedia("(min-width: " + e[i] + "px) and (max-width: " + (e[i + 1] - 1) + "px)")), e[i];
        var s = 0;

        function n() {
            clearTimeout(s), s = 0, refreshAds("windowResize")
        }
        t.forEach(function(t) {
            t.addListener(function(t) {
                t.matches && (s && clearTimeout(s), s = 0, s = setTimeout(n, 1500))
            })
        })
    }, this.isMobile = function() {
        try {
            return !!/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)
        } catch (t) {}
    }, this.relocateAd = function(e, i, s, n, a) {
        this.waitForElement("#" + e).then(function(t) {
            adUnits[e].divRef = t, "string" == typeof s && (s = o(s)), AFM_page[i](adUnits[e].divRef, s), a && (adUnits[e].divRef.outerHTML = a), n && adUnits[e].divRef.setAttribute("style", n)
        })
    }, this.insertPrivSet = function() {
        this.waitForElement("#elFooterLinks").then(function(t) {
            var e = top.document.createElement("li");
            e.setAttribute("id", "privacySettings"), e.setAttribute("style", "cursor:pointer"), e.innerHTML = "<a>Privacy Settings</a>", t.appendChild(e), e.onclick = function() {
                window.__tcfapi("displayConsentUi", 2, function() {})
            }
        })
    }, this.insertFootMargin = function() {
        o("ipsLayout_footer").style.marginBottom = "100px"
    }
}
var AFM_page = new AFMpageManager;
{
    const pa = {
        complete: 1,
        ver: "1.0",
        nodes: [{
            asi: "adfirst.media",
            sid: "031",
            hp: 1
        }]
    };
    var pbDebugStatus = !!AFM_getParameterByName("pbdebug");
    AFM_getParameterByName("testpage") && AFM_page.path.push(AFM_getParameterByName("testpage")),
        function() {
            var t = document.createElement("script");
            t.async = !0, t.type = "text/javascript", t.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
            var e = document.getElementsByTagName("script")[0];
            e.parentNode.insertBefore(t, e)
        }(),
        function(i, s, t, e, n) {
            function a(t, e) {
                s[i]._Q.push([t, e])
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
            }, (e = t.createElement("script")).async = !0, e.src = "https://c.amazon-adsystem.com/aax2/apstag.js", (n = t.getElementsByTagName("script")[0]).parentNode.insertBefore(e, n))
        }("apstag", window, document), apstag.init({
            pubID: "e0d916db-618d-4b79-a74c-cc9f1c34c4bc",
            adServer: "googletag",
            isSelfServePub: !0,
            simplerGPT: !0,
            schain: pa
        }),
        function() {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://ap.lijit.com/www/sovrn_beacon_standalone/sovrn_standalone_beacon.js?iid=13405474", t.id = "sBeacon";
            var e = document.getElementsByTagName("head")[0];
            e.insertBefore(t, e.firstChild)
        }(),
        function() {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://csync.smilewanted.com?zoneCode=adfirstmedia.com_hb_display";
            var e = document.getElementsByTagName("head")[0];
            e.insertBefore(t, e.firstChild)
        }(),
        function() {
            var t = document.createElement("script");
            t.type = "text/javascript", t.async = !0, t.src = "https://cdn.adfirst.media/hb/pb_8450b_bt.js";
            var e = document.getElementsByTagName("head")[0];
            e.insertBefore(t, e.firstChild)
        }();
    var googletag = googletag || {};

    function afm_bidTimeout() {
        return adAutorefreshCounter < 2 ? 1500 : 3e3
    }
    googletag.cmd = googletag.cmd || [], googletag.cmd.push(function() {
        googletag.pubads().disableInitialLoad()
    }), Object.defineProperty(Object.prototype, "AFMforEach", {
        value: function(t, e) {
            if (null == this) throw new TypeError("Not an object");
            for (var i in e = e || window, this) this.hasOwnProperty(i) && t.call(e, this[i], i, this)
        }
    });
    var AFMnetworkCode = "1269065",
        childNetworkCode = "24087856",
        siteGptPath = "/PUB031_BusTimes/PUB031_BusTimes_",
        AMhouseColour = "#FFFF9E",
        originalBidCSS = "font-weight: bold;",
        makeNet85 = .85,
        makeNet86 = .86,
        usdRate = .81,
        euroRate = .83,
        adAutorefreshEnabled = 1,
        adAutorefreshCounter = 1,
        fruitlessRefreshAttempt = 0,
        fruitlessRefreshLimit = 60,
        globalAdRefreshLimit = 100,
        AMfooterOn = !0,
        lazyLoadOffset = (window.innerWidth, 700);

    function AuctionObject(t, e, i, s, n) {
        this.type = t, this.name = e, this.status = i, this.autorefresh = s, this.refreshWhenWindowResized = n
    }

    function AdUnit(t, e, i, s, n, a, o, r) {
        AuctionObject.call(this, "adunit", t, e, i, s), this.refreshLimit = n, this.refreshCounter = 0, this.dismissed = !1, this.divRef = e, this.gptSlot = !1, this.slotSizeMap = [], this.pageType = a, this.adUnitPath = o, this.injectMap = r || !1
    }
    AuctionObject.prototype.setStatus = function(t) {
        this.status = t
    }, AuctionObject.prototype.getStatus = function() {
        return "bidder" === this.type ? this.status : "adunit" === this.type ? "adUnitLive-" + ("live" === this.status || "dormant" === this.status) : void 0
    }, AuctionObject.prototype.isActive = function() {
        return "bidder" === this.type ? "active" === this.status : "adunit" === this.type ? this.status : void 0
    }, AuctionObject.prototype.willAutorefresh = function() {
        return this.autorefresh
    }, AuctionObject.prototype.setAutorefresh = function(t) {
        this.autorefresh = t
    }, AuctionObject.prototype.willRefreshWithWindowResize = function() {
        return this.refreshWhenWindowResized
    }, AuctionObject.prototype.setRefreshWithWindowResize = function(t) {
        this.refreshWhenWindowResized = t
    }, AuctionObject.prototype.determineStatusForRefresh = function(t) {
        ("active" !== this.status || "auto" !== t || this.autorefresh) && ("active" !== this.status || "windowResize" !== t || this.refreshWhenWindowResized) ? "bidder" === this.type && "active" === this.status && "windowResize" === t && (this.autorefresh || (this.status = "inactive")): this.status = "inactive"
    }, AdUnit.prototype = Object.create(AuctionObject.prototype), Object.defineProperty(AdUnit.prototype, "constructor", {
        value: AdUnit,
        enumerable: !1,
        writable: !0
    }), AdUnit.prototype.adExistsInDom = function() {
        return !!this.divRef
    }, AdUnit.prototype.updateAdInDomStatus = function() {
        return 0 != this.divRef && (this.divRef = document.getElementById(this.name), this.adHidden() && (this.status = !1)), !!this.divRef
    }, AdUnit.prototype.adHidden = function() {
        return !this.divRef || ("none" === window.getComputedStyle(this.divRef).display || "hidden" === window.getComputedStyle(this.divRef).visibility)
    }, AdUnit.prototype.setGptSlot = function(t) {
        return this.gptSlot = t
    }, AdUnit.prototype.adHorizontalAlign = function(t) {
        this.adExistsInDom() && (this.divRef.style.textAlign = t)
    }, AdUnit.prototype.getRefreshLimit = function() {
        return this.refreshLimit
    }, AdUnit.prototype.getRefreshCount = function() {
        return this.refreshCounter
    }, AdUnit.prototype.incrementRefreshCounter = function() {
        return this.refreshCounter++, this.refreshCounter === this.refreshLimit && (this.autorefresh = !1), 10 < this.refreshCounter ? "beyond10" : this.refreshCounter
    }, AdUnit.prototype.hasBeenDismissed = function() {
        return this.dismissed
    }, AdUnit.prototype.getSizes = function() {
        var t = window.innerWidth,
            e = [];
        if (0 < this.slotSizeMap.length)
            for (i = 0; i < this.slotSizeMap.length; i++)
                if (t > this.slotSizeMap[i][0][0]) {
                    e = 0 < this.slotSizeMap[i][1].length ? this.slotSizeMap[i][1] : [
                        [0, 0]
                    ];
                    break
                } return e
    }, AdUnit.prototype.inSizeBracket = function() {
        return 0 < this.slotSizeMap.length && !!this.getSizes()[0][0]
    }, AdUnit.prototype.foldOffset = function() {
        if (this.divRef) return this.divRef.getBoundingClientRect().top - window.innerHeight
    }, AdUnit.prototype.gptAssign = function() {
        var t = this;
        assignGptSlot(t, function() {
            fetchHeaderBids([t.gptSlot], "function" == typeof t.prebidAdUnit ? [t.prebidAdUnit()] : [], afm_bidTimeout(), !1, ["active", "adUnitLive-true"], "lazy")
        })
    }, AdUnit.prototype.lazyLoad = function() {
        var e = !1,
            i = this;
        window.addEventListener("scroll", function(t) {
            i.foldOffset() < lazyLoadOffset && !e && (this.removeEventListener("scroll", arguments.callee, !1), e = !0, i.gptAssign())
        })
    }, AdUnit.prototype.addClass = function(t) {
        t && (Array.isArray(t) ? t.forEach(function(t) {
            this.divRef.classList.add(t)
        }) : this.divRef.classList.add(t))
    };
    var adUnits = {
        AFM_stickyFooter_ad: new AdUnit("AFM_stickyFooter_ad", !0, !0, !0, globalAdRefreshLimit, ["all"], "1x1"),
        AFM_inContentTop_ad: new AdUnit("AFM_inContentTop_ad", !0, !0, !0, globalAdRefreshLimit, ["home", "areas", "regions", "localities", "operators", "searchResults", "services", "stops", "stations"], "unit1")
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

    function assignGptSlot(e, i) {
        googletag.cmd.push(function() {
            let t = JSON.parse(JSON.stringify(e.slotSizeMap));
            e.name.includes("Footer") || t.forEach(function(t) {
                t[1].push("fluid")
            }), gptAdSlots.push(e.setGptSlot(googletag.defineSlot("/" + AFMprocessedNetworkCode + siteGptPath + e.adUnitPath, [1, 1], e.name).defineSizeMapping(t).setCollapseEmptyDiv(!0).addService(googletag.pubads()))), "function" == typeof i && i()
        })
    }
    var afm_deleteThese = [];
    adUnits.AFMforEach(function(t) {
        !0 === t.status && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && !t.injectMap ? (assignGptSlot(t), t.status = "live") : "dormant" === t.status && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && !t.injectMap ? t.lazyLoad() : "dormant" === t.status && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && t.injectMap ? AFM_page.insertAd(t) : !0 === t.status && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) && t.inSizeBracket() && t.injectMap && t.disableLazyLoad ? (assignGptSlot(t), t.status = "live", AFM_page.insertAd(t)) : t.status && (t.pageType.includes(AFM_page.pageType) || t.pageType.includes("all")) || afm_deleteThese.push(t.name)
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
        ogury: new AuctionObject("bidder", "ogury", AFM_page.isMobile() ? "active" : "inactive", !0, !0),
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
        adUnitsToRefreshGAM = [],
        refreshPeriodAfterTabBackInFocus = 1500,
        AMhbFooterAuctionWinner = 0,
        AMrefreshLoop = null,
        AMtabVisible = !0,
        AMattemptedRefreshButTabNotInFocus = !1,
        AMfooterDismissedByUser = !1,
        gamAmznID = 4776868705,
        AMfooterRiseSpeed = 500;

    function ggFloorBrackets() {
        var t = (new Date).getHours();
        let e = 3;
        return 0 <= t && t <= 4 ? e = 3.75 : 4 < t && t <= 11 ? e = 4 : 11 < t && t <= 16 ? e = 3 : 16 < t && t <= 18 ? e = 3.5 : 18 < t && (e = 2.5), e
    }

    function AMcompileAdUnits(e) {
        var i = [];
        return adUnits.AFMforEach(function(t) {
            ("live" !== t.status || void 0 === t.prebidAdUnit || "auto" === e) && ("live" !== t.status || void 0 === t.prebidAdUnit || "auto" !== e || !isInViewport(t.name) && "oop" !== (null != t.adType && t.adType)) || i.push(t.prebidAdUnit())
        }), i
    }
    adUnits.AFM_stickyFooter_ad.init = function() {
        this.originalParams = [this.autorefresh, this.refreshWhenWindowResized, this.status], this.lastWin = !1, this.adType = "", this.zin = "2147483647", this.riseSpeed = 500, this.ready = !1, this.bufferPx = 20, this.rebuilt = !1, this.shellDiv = top.document.createElement("div"), this.shellDiv.setAttribute("id", "stickyAdContainer"), this.shellDiv.setAttribute("style", "text-align:center;position:fixed;bottom:-300px;width:100%;-webkit-transition: all " + this.riseSpeed + "ms ease-out;z-index:" + this.zin + ";"), this.styleSheet = top.document.createElement("style"), AFM_page.waitForElement("body").then(function(t) {
            t.appendChild(adUnits.AFM_stickyFooter_ad.shellDiv), t.appendChild(adUnits.AFM_stickyFooter_ad.styleSheet), adUnits.AFM_stickyFooter_ad.build()
        })
    }, adUnits.AFM_stickyFooter_ad.applyClass = function(t) {
        this.divRef.classList.add(t)
    }, adUnits.AFM_stickyFooter_ad.getStdStyle = function(t) {
        return "#stickyAdContainer {text-align:center;position:fixed;bottom:-" + (this.size[1] + this.bufferPx) + "px;width:100%;-webkit-transition: all " + AMfooterRiseSpeed + "ms ease-out;z-index:" + this.zin + ";pointer-events: none;display:block !important;} #AFM_stickyFooter_ad {display:inline-block !important;pointer-events: all;} #closeBox {display:inline-block;pointer-events: all;} .drawBorder {border-width:2px;border-color:" + AMhouseColour + ";border-style:solid;border-bottom: 0;-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);-moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.63);display:inline-block;background-color:white;} #closeBox:hover {transform: rotate(90deg); transition: transform 0.5s;} #body {padding-top:0px !important;}"
    }, adUnits.AFM_stickyFooter_ad.getOopStyle = function(t) {
        return "#stickyAdContainer {position:fixed !important;bottom:0px !important;height:100px !important;width:100% !important;z-index:" + this.zin + " !important;pointer-events: none !important;display:block !important;} #AFM_stickyFooter_ad {display:inline-block !important;pointer-events: none !important;height:100px !important;width:100% !important;z-index:" + this.zin + " !important;} #body {padding-top:0px !important;}"
    }, adUnits.AFM_stickyFooter_ad.build = function() {
        this.divRef = top.document.createElement("div"), this.divRef.setAttribute("id", "AFM_stickyFooter_ad"), this.divRef.setAttribute("style", "margin:auto;display:inline-block;"), this.shellDiv.appendChild(this.divRef), this.ready = !0
    }, adUnits.AFM_stickyFooter_ad.getCloseBox = function() {
        var t = top.document.createElement("div");
        return t.setAttribute("id", "closeBox"), t.setAttribute("style", "display:inline-block;position:absolute;cursor:pointer;z-index:" + this.zin + ";height:20px;width:20px;margin:-10px;line-height:0px;"), t.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="Layer1"><circle cx="256" cy="257" r="151.5" style="fill:#000;"/></g><path d="M256,33c-123.7,0 -224,100.3 -224,224c0,123.7 100.3,224 224,224c123.7,0 224,-100.3 224,-224c0,-123.7 -100.3,-224 -224,-224Zm108.3,299.5c1.5,1.5 2.3,3.5 2.3,5.6c0,2.1 -0.8,4.2 -2.3,5.6l-21.6,21.7c-1.6,1.6 -3.6,2.3 -5.6,2.3c-2,0 -4.1,-0.8 -5.6,-2.3l-75.5,-75.6l-75.4,75.7c-1.5,1.6 -3.6,2.3 -5.6,2.3c-2,0 -4.1,-0.8 -5.6,-2.3l-21.6,-21.7c-1.5,-1.5 -2.3,-3.5 -2.3,-5.6c0,-2.1 0.8,-4.2 2.3,-5.6l75.7,-76l-75.9,-75c-3.1,-3.1 -3.1,-8.2 0,-11.3l21.6,-21.7c1.5,-1.5 3.5,-2.3 5.6,-2.3c2.1,0 4.1,0.8 5.6,2.3l75.7,74.7l75.7,-74.7c1.5,-1.5 3.5,-2.3 5.6,-2.3c2.1,0 4.1,0.8 5.6,2.3l21.6,21.7c3.1,3.1 3.1,8.2 0,11.3l-75.9,75l75.6,75.9Z" style="fill:' + AMhouseColour + ';fill-rule:nonzero;"/></svg>', t
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
    }, adUnits.AFM_stickyFooter_ad.clearOop = function(t) {
        t = t || this.winBidder;
        "gumgum" === t && "object" == typeof GUMGUM ? GUMGUM.InScreenAd.removeISAd() : "justpremium" === t ? document.querySelectorAll("[jpx-object-id]").forEach(function(t) {
            t.remove()
        }) : "sublime" === t && "object" == typeof sublime && sublime.cleanUp()
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
                    site: "bustimes",
                    useAdUnitCodeAsAdUnitElementId: !0,
                    useAdUnitCodeAsPlacement: !0,
                    environment: AFM_page.isMobile() ? "mobile" : "desktop",
                    pagetype: AFM_page.getPageType(),
                    category: "travel"
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
                    bidfloor: 2
                }
            }, {
                bidder: "ogury",
                labelAll: [bidders.ogury.getStatus()],
                params: {
                    assetKey: "OGY-2DF6DF686124",
                    adUnitId: "3c71a836-d1ec-47c4-88f4-24f60803a133"
                }
            }, {
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
                    site: "bustimes",
                    useAdUnitCodeAsAdUnitElementId: !0,
                    useAdUnitCodeAsPlacement: !0,
                    environment: AFM_page.isMobile() ? "mobile" : "desktop",
                    pagetype: AFM_page.getPageType(),
                    category: "travel"
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
            }]
        }
    };
    var vis = function() {
        var i, s, t = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
        for (i in t)
            if (i in document) {
                s = t[i];
                break
            } return function(t, e) {
            return t && document.addEventListener(s, t, e), !document[i]
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

    function isInViewport(t) {
        t = top.document.getElementById(t).getBoundingClientRect();
        return 0 <= t.top + .33 * t.height && 0 <= t.left + .33 * t.width && t.bottom - .33 * t.height <= (window.innerHeight || document.documentElement.clientHeight) && t.right - .33 * t.width <= (window.innerWidth || document.documentElement.clientWidth)
    }

    function fetchHeaderBids(n, t, e, a, i, o) {
        var r, s = ["prebid"];
        "active" === bidders.amazon.getStatus() && s.push("amazon"), a && (r = {}, n.forEach(function(t) {
            r[t.getSlotElementId()] = !0
        }));
        var d = {
            adserverRequestSent: !1
        };

        function l(t) {
            !0 !== d.adserverRequestSent && ("amazon" === t ? d.amazon = !0 : "prebid" === t && (d.prebid = !0), s.map(function(t) {
                return d[t]
            }).filter(Boolean).length !== s.length || !0 !== d.adserverRequestSent && (d.adserverRequestSent = !0, pbjs.adserverRequestSent = !0, d.sendAdserverRequest = !0, googletag.cmd.push(function() {
                function t(t) {
                    apstag.setDisplayBids(), pbjs.setTargetingForGPTAsync(), o || (adRefreshManager.reset(), adRefreshManager.numberOfAdUnitsToRender = t.length), t.forEach(function(t) {}), googletag.pubads().refresh(t)
                }
                if (a) {
                    var i, e;
                    "auto" === a && null === AMrefreshLoop ? (i = [], n.forEach(function(t) {
                        var e = t.getSlotElementId();
                        r[e];
                        adUnits[e].hasBeenDismissed() || !0 !== r[e] || !isInViewport(e) && "oop" !== (null != adUnits[e].adType && adUnits[e].adType) || (e = "refresh-" + adUnits[e].incrementRefreshCounter(), adAutorefreshCounter++, t.setTargeting("impression_type", e), i.push(t))
                    }), 0 < i.length ? t(i) : ++fruitlessRefreshAttempt <= fruitlessRefreshLimit && refreshAds("auto")) : "windowResize" === a && (n.forEach(function(t) {}), !1 !== r.AFM_stickyFooter_ad && !adUnits.AFM_stickyFooter_ad.hasBeenDismissed() || (-1 !== (e = n.findIndex(function(t) {
                        return "AFM_stickyFooter_ad" === t.getSlotElementId()
                    })) && n.splice(e, 1), n.forEach(function(t) {}), dismissFooter(!1)), googletag.pubads().setTargeting("impression_type", "windowResize"), t(n))
                } else {
                    var s = [];
                    if (n.forEach(function(t) {
                            var e = t.getSlotElementId();
                            adUnits[e].updateAdInDomStatus() && adUnits[e].inSizeBracket() && s.push(t)
                        }), o) try {
                        s[0].setTargeting("impression_type", "first"), t(s)
                    } catch (t) {} else googletag.display(s[0].getSlotElementId()), t(s)
                }
            })))
        }

        function c() {
            googletag.cmd.push(function() {
                apstag.fetchBids({
                    slots: n,
                    timeout: e
                }, function(t) {
                    t.forEach(function(t) {
                        "" !== t.amzniid && (adUnits[t.slotID].size = t.size.split("x").map(Number))
                    }), l("amazon")
                })
            }), pbjs.que.push(function() {
                pbjs.requestBids({
                    adUnits: t,
                    labels: i,
                    timeout: e,
                    bidsBackHandler: function(t) {
                        l("prebid")
                    }
                })
            })
        }
        s.forEach(function(t) {
            d[t] = !1
        }), __tcfapi("addEventListener", 2, function(t, e) {
            __uspapi("setUspDftData", 1, function(t, e) {}), e && t.gdprApplies ? "tcloaded" !== t.eventStatus && "useractioncomplete" !== t.eventStatus || !t.purpose.consents[1] ? "cmpuishown" === t.eventStatus || t.purpose.consents[1] : (c(), __tcfapi("removeEventListener", 2, function(t) {}, t.listenerId)) : !1 === t.gdprApplies ? (c(), __tcfapi("removeEventListener", 2, function(t) {}, t.listenerId)) : __tcfapi("removeEventListener", 2, function(t) {}, t.listenerId)
        })
    }

    function refreshBids(t) {
        "auto" === t || "windowResize" === t ? fetchHeaderBids(collateAdUnitsForRefresh(t), AMcompileAdUnits(t), afm_bidTimeout(), t, ["active", "adUnitLive-true"]) : adAutorefreshEnabled = 0
    }

    function refreshAds(t) {
        var e = collateAdUnitsForRefresh(t);
        "auto" === t && e && adAutorefreshEnabled ? AMrefreshLoop = setTimeout(function() {
            AMtabVisible ? refreshBids(t) : AMattemptedRefreshButTabNotInFocus = !0, AMrefreshLoop = null
        }, refreshPeriod) : "windowResize" === t && e && (null != AMrefreshLoop && (clearTimeout(AMrefreshLoop), AMrefreshLoop = !0), refreshBids(t))
    }

    function collateAdUnitsForRefresh(e) {
        return bidders.AFMforEach(function(t) {
            t.determineStatusForRefresh(e)
        }), AMcompileAdUnits(), adUnitsToRefreshGAM = [], "windowResize" === e ? adUnits.AFMforEach(function(t) {
            t.determineStatusForRefresh(e), t.willRefreshWithWindowResize() && t.isActive() && 0 != t.gptSlot && adUnitsToRefreshGAM.push(t.gptSlot)
        }) : "auto" === e && adUnits.AFMforEach(function(t) {
            t.updateAdInDomStatus(), t.determineStatusForRefresh(e), t.willAutorefresh() && t.isActive() && 0 != t.gptSlot && adUnitsToRefreshGAM.push(t.gptSlot)
        }), 0 !== adUnitsToRefreshGAM.length && (adUnitsToRefreshGAM.forEach(function(t) {}), adUnitsToRefreshGAM)
    }

    function AdRefreshManager() {
        this.refreshTriggered = 0, this.adUnitsRendered = 0;
        var t = !(this.numberOfAdUnitsToRender = 0);
        this.tallyRenders = function() {
            this.adUnitsRendered++, this.numberOfAdUnitsToRender === this.adUnitsRendered ? (t && (t = !1, AFM_page.setResizeBreaks(), googletag.pubads().clearTargeting("impression_type"), pbjs.setConfig({
                bidderTimeout: afm_bidTimeout()
            })), this.triggerRefresh()) : (this.numberOfAdUnitsToRender, this.adUnitsRendered)
        }, this.triggerRefresh = function() {
            0 === this.refreshTriggered && adAutorefreshEnabled && (this.refreshTriggered = 1, refreshAds("auto"))
        }, this.reset = function() {
            this.refreshTriggered = 0, this.adUnitsRendered = 0, this.numberOfAdUnitsToRender = 0
        }
    }
    pbjs.que = pbjs.que || [], pbjs.que.push(function() {
        AMfooterOn && pbjs.onEvent("bidWon", function(t) {
            adUnits[t.adUnitCode].winEntity = "prebid", adUnits[t.adUnitCode].winBidder = t.bidder, adUnits[t.adUnitCode].size = [t.width, t.height], "AFM_stickyFooter_ad" == t.adUnitCode && (AMadHeight = t.height + 20, AMhbFooterSize = [t.width, t.height], AMhbFooterAuctionWinner = t.bidder)
        }), pbjs.setConfig({
            consentManagement: {
                gdpr: {
                    cmpApi: "iab",
                    timeout: 1e4,
                    defaultGdprScope: !0
                },
                usp: {
                    cmpApi: "iab",
                    timeout: 1e4
                }
            },
            schain: {
                validation: "strict",
                config: pa
            },
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
            rubicon: {
                singleRequest: !0
            },
            improvedigital: {
                usePrebidSizes: !0
            },
            useBidCache: !0
        }), pbjs.setBidderConfig({
            bidders: ["oftmedia"],
            config: {
                schain: {
                    validation: "relaxed",
                    config: {
                        ver: "1.0",
                        complete: 1,
                        nodes: [{
                            asi: "152media.info",
                            sid: "152M538",
                            hp: 1
                        }]
                    }
                }
            }
        }), pbjs.bidderSettings = {
            standard: {
                storageAllowed: !0
            },
            rubicon: {
                bidCpmAdjustment: function(t) {
                    return t * makeNet85 * usdRate * .99
                }
            },
            improvedigital: {
                bidCpmAdjustment: function(t) {
                    return t * makeNet86 * usdRate * .99
                }
            },
            sovrn: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .95
                }
            },
            gumgum: {
                bidCpmAdjustment: function(t) {
                    return .95 * t
                }
            },
            oftmedia: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .7
                }
            },
            ogury: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .89
                }
            },
            onetag: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * 1
                }
            },
            adagio: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * 1
                }
            },
            adtelligent: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .93
                }
            },
            triplelift: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .96
                }
            },
            adpone: {
                bidCpmAdjustment: function(t) {
                    return t * euroRate * .8009
                }
            },
            bcmssp: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .71
                }
            },
            unruly: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .97
                }
            },
            richaudience: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .945
                }
            },
            rise: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .98
                }
            },
            conversant: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .98
                }
            },
            medianet: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .96
                }
            },
            smartadserver: {
                bidCpmAdjustment: function(t) {
                    return t * usdRate * .91
                }
            },
            smilewanted: {
                bidCpmAdjustment: function(t) {
                    return t * euroRate * .96
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
        googletag.pubads().addEventListener("slotRenderEnded", function(t) {
            adUnits[t.slot.getSlotElementId()].rendered = !0, 0 == t.advertiserId ? (adUnits[t.slot.getSlotElementId()].winEntity = "google", adUnits[t.slot.getSlotElementId()].size = t.size, adUnits[t.slot.getSlotElementId()].winBidder = "google") : t.advertiserId == gamAmznID ? (adUnits[t.slot.getSlotElementId()].winEntity = "amazon", adUnits[t.slot.getSlotElementId()].winBidder = "amazon") : null == adUnits[t.slot.getSlotElementId()].size && (adUnits[t.slot.getSlotElementId()].size = t.size, adUnits[t.slot.getSlotElementId()].winEntity = "adserver", adUnits[t.slot.getSlotElementId()].winBidder = "direct"), "AFM_stickyFooter_ad" == t.slot.getSlotElementId() && !t.isEmpty && AMfooterOn && ("gumgum" === adUnits.AFM_stickyFooter_ad.winBidder || "justpremium" === adUnits.AFM_stickyFooter_ad.winBidder || "sublime" === adUnits.AFM_stickyFooter_ad.winBidder || "ogury" === adUnits.AFM_stickyFooter_ad.winBidder ? (adUnits.AFM_stickyFooter_ad.oopWinner(), adUnits.AFM_stickyFooter_ad.autorefresh = bidders[adUnits.AFM_stickyFooter_ad.winBidder].autorefresh) : adUnits.AFM_stickyFooter_ad.show()), "live" === adUnits[t.slot.getSlotElementId()].status ? adRefreshManager.tallyRenders() : "dormant" === adUnits[t.slot.getSlotElementId()].status && (adUnits[t.slot.getSlotElementId()].status = "live")
        }), googletag.pubads().addEventListener("slotVisibilityChanged", function(t) {
            adUnits[t.slot.getSlotElementId()].inViewPerc = t.inViewPercentage, adUnits[t.slot.getSlotElementId()].inView = 66 <= t.inViewPercentage
        })
    })
}