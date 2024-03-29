function var_dump(a, b, c, d) {
    var e = "";
    var f, g, h = "";
    if(!d) {
        d = 1
    }
    for(var i = 0; i < d; i++) {
        h += "   "
    }
    if(typeof a != "object") {
        f = a;
        if(typeof a == "string") {
            if(b == "html") {
                f = f.replace(/&/g, "&");
                f = f.replace(/>/g, ">");
                f = f.replace(/</g, "<")
            }
            f = f.replace(/\"/g, '"');
            f = '"' + f + '"'
        }
        if(typeof a == "function" && b) {
            f = (new String(f)).replace(/\n/g, "\n" + h);
            if(b == "html") {
                f = f.replace(/&/g, "&");
                f = f.replace(/>/g, ">");
                f = f.replace(/</g, "<")
            }
        }
        if(typeof a == "undefined") {
            f = "undefined"
        }
        if(b == "html") {
            if(typeof f != "string") {
                f = new String(f)
            }
            f = f.replace(/ /g, " ").replace(/\n/g, "<br>")
        }
        return f
    }
    for(var j in a) {
        if(c && d > c) {
            f = "*RECURSION*"
        } else {
            try {
                f = var_dump(a[j], b, c, d + 1)
            } catch(k) {
                continue
            }
        }
        g = var_dump(j, b, c, d + 1);
        e += g + ":" + f + ",";
        if(b) {
            e += "\n" + h
        }
    }
    if(b) {
        e = "{\n" + h + e.substr(0, e.length - (2 + d * 3)) + "\n" + h.substr(0, h.length - 3) + "}"
    } else {
        e = "{" + e.substr(0, e.length - 1) + "}"
    }
    if(b == "html") {
        e = e.replace(/ /g, " ").replace(/\n/g, "<br>")
    }
    return e
}
function getSidebarTitle(a) {
    return a /*+'<span><img src="images/wpspin_dark.gif" class="ajax-feedback" title="" alt=""></span>'*/
}
function addIdToA(a, b) {
    a.attr("href", a.attr("href") + b)
}
function getIdFromEditbar(a) {
    return a.parent().siblings(".widgets-sortables").attr("id")
}
function trim(a) {
    a = a.replace(/^\s+/, "");
    for(var b = a.length - 1; b >= 0; b--) {
        if(/\S/.test(a.charAt(b))) {
            a = a.substring(0, b + 1);
            break
        }
    }
    return a
}
function CsSidebar(a) {
    this.id = a;
    this.widgets = "";
    this.name = trim(jQuery("#" + a).siblings(".sidebar-name").text());
    this.description = trim(jQuery("#" + a).find(".sidebar-description").text());
    var b = jQuery("#cs-widgets-extra").find(".cs-edit-sidebar").clone();
    jQuery("#" + a).parent().append(b);
    b.find("a").each(function () {
        addIdToA(jQuery(this), a)
    })
}
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (a) {
        var b = "";
        var c, d, e, f, g, h, i;
        var j = 0;
        a = Base64._utf8_encode(a);
        while(j < a.length) {
            c = a.charCodeAt(j++);
            d = a.charCodeAt(j++);
            e = a.charCodeAt(j++);
            f = c >> 2;
            g = (c & 3) << 4 | d >> 4;
            h = (d & 15) << 2 | e >> 6;
            i = e & 63;
            if(isNaN(d)) {
                h = i = 64
            } else if(isNaN(e)) {
                i = 64
            }
            b = b + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h) + this._keyStr.charAt(i)
        }
        return b
    },
    decode: function (a) {
        var b = "";
        var c, d, e;
        var f, g, h, i;
        var j = 0;
        a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while(j < a.length) {
            f = this._keyStr.indexOf(a.charAt(j++));
            g = this._keyStr.indexOf(a.charAt(j++));
            h = this._keyStr.indexOf(a.charAt(j++));
            i = this._keyStr.indexOf(a.charAt(j++));
            c = f << 2 | g >> 4;
            d = (g & 15) << 4 | h >> 2;
            e = (h & 3) << 6 | i;
            b = b + String.fromCharCode(c);
            if(h != 64) {
                b = b + String.fromCharCode(d)
            }
            if(i != 64) {
                b = b + String.fromCharCode(e)
            }
        }
        b = Base64._utf8_decode(b);
        return b
    },
    _utf8_encode: function (a) {
        a = a.replace(/\r\n/g, "\n");
        var b = "";
        for(var c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            if(d < 128) {
                b += String.fromCharCode(d)
            } else if(d > 127 && d < 2048) {
                b += String.fromCharCode(d >> 6 | 192);
                b += String.fromCharCode(d & 63 | 128)
            } else {
                b += String.fromCharCode(d >> 12 | 224);
                b += String.fromCharCode(d >> 6 & 63 | 128);
                b += String.fromCharCode(d & 63 | 128)
            }
        }
        return b
    },
    _utf8_decode: function (a) {
        var b = "";
        var c = 0;
        var d = c1 = c2 = 0;
        while(c < a.length) {
            d = a.charCodeAt(c);
            if(d < 128) {
                b += String.fromCharCode(d);
                c++
            } else if(d > 191 && d < 224) {
                c2 = a.charCodeAt(c + 1);
                b += String.fromCharCode((d & 31) << 6 | c2 & 63);
                c += 2
            } else {
                c2 = a.charCodeAt(c + 1);
                c3 = a.charCodeAt(c + 2);
                b += String.fromCharCode((d & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                c += 3
            }
        }
        return b
    }
};
String.prototype.reverse = function () {
    splitext = this.split("");
    revertext = splitext.reverse();
    reversed = revertext.join("");
    return reversed
};
(function (a) {
    function b(b, c) {
        function w(a) {
            if(!(g.ratio >= 1)) {
                o.now = Math.min(i[c.axis] - j[c.axis], Math.max(0, o.start + ((k ? a.pageX : a.pageY) - p.start)));
                n = o.now * h.ratio;
                g.obj.css(l, -n);
                j.obj.css(l, o.now)
            }
            return false
        }
        function v(b) {
            a(document).unbind("mousemove", w);
            a(document).unbind("mouseup", v);
            j.obj.unbind("mouseup", v);
            document.ontouchmove = j.obj[0].ontouchend = document.ontouchend = null;
            return false
        }
        function u(b) {
            if(!(g.ratio >= 1)) {
                var b = b || window.event;
                var d = b.wheelDelta ? b.wheelDelta / 120 : -b.detail / 3;
                n -= d * c.wheel;
                n = Math.min(g[c.axis] - f[c.axis], Math.max(0, n));
                j.obj.css(l, n / h.ratio);
                g.obj.css(l, -n);
                b = a.event.fix(b);
                b.preventDefault()
            }
        }
        function t(b) {
            p.start = k ? b.pageX : b.pageY;
            var c = parseInt(j.obj.css(l));
            o.start = c == "auto" ? 0 : c;
            a(document).bind("mousemove", w);
            document.ontouchmove = function (b) {
                a(document).unbind("mousemove");
                w(b.touches[0])
            };
            a(document).bind("mouseup", v);
            j.obj.bind("mouseup", v);
            j.obj[0].ontouchend = document.ontouchend = function (b) {
                a(document).unbind("mouseup");
                j.obj.unbind("mouseup");
                v(b.touches[0])
            };
            return false
        }
        function s() {
            j.obj.bind("mousedown", t);
            j.obj[0].ontouchstart = function (a) {
                a.preventDefault();
                j.obj.unbind("mousedown");
                t(a.touches[0]);
                return false
            };
            i.obj.bind("mouseup", w);
            if(c.scroll && this.addEventListener) {
                e[0].addEventListener("DOMMouseScroll", u, false);
                e[0].addEventListener("mousewheel", u, false)
            } else if(c.scroll) {
                e[0].onmousewheel = u
            }
        }
        function r() {
            j.obj.css(l, n / h.ratio);
            g.obj.css(l, -n);
            p["start"] = j.obj.offset()[l];
            var a = m.toLowerCase();
            h.obj.css(a, i[c.axis]);
            i.obj.css(a, i[c.axis]);
            j.obj.css(a, j[c.axis])
        }
        function q() {
            d.update();
            s();
            return d
        }
        var d = this;
        var e = b;
        var f = {
            obj: a(".viewport", b)
        };
        var g = {
            obj: a(".overview", b)
        };
        var h = {
            obj: a(".scrollbar", b)
        };
        var i = {
            obj: a(".track", h.obj)
        };
        var j = {
            obj: a(".thumb", h.obj)
        };
        var k = c.axis == "x",
            l = k ? "left" : "top",
            m = k ? "Width" : "Height";
        var n, o = {
            start: 0,
            now: 0
        }, p = {};
        this.update = function (a) {
            f[c.axis] = f.obj[0]["offset" + m];
            g[c.axis] = g.obj[0]["scroll" + m];
            g.ratio = f[c.axis] / g[c.axis];
            h.obj.toggleClass("disable", g.ratio >= 1);
            i[c.axis] = c.size == "auto" ? f[c.axis] : c.size;
            j[c.axis] = Math.min(i[c.axis], Math.max(0, c.sizethumb == "auto" ? i[c.axis] * g.ratio : c.sizethumb));
            h.ratio = c.sizethumb == "auto" ? g[c.axis] / i[c.axis] : (g[c.axis] - f[c.axis]) / (i[c.axis] - j[c.axis]);
            n = a == "relative" && g.ratio <= 1 ? Math.min(g[c.axis] - f[c.axis], Math.max(0, n)) : 0;
            n = a == "bottom" && g.ratio <= 1 ? g[c.axis] - f[c.axis] : isNaN(parseInt(a)) ? n : parseInt(a);
            r()
        };
        return q()
    }
    a.tiny = a.tiny || {};
    a.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: true,
            size: "auto",
            sizethumb: "auto"
        }
    };
    a.fn.tinyscrollbar = function (c) {
        var c = a.extend({}, a.tiny.scrollbar.options, c);
        this.each(function () {
            a(this).data("tsb", new b(a(this), c))
        });
        return this
    };
    a.fn.tinyscrollbar_update = function (b) {
        return a(this).data("tsb").update(b)
    };
})(jQuery);
CsSidebar.prototype.initDrag = function (a) {
    var b, c;
    a("#widget-list").children(".widget").draggable("destroy").draggable({
        connectToSortable: "div.widgets-sortables",
        handle: "> .widget-top > .widget-title",
        distance: 2,
        helper: "clone",
        zIndex: 5,
        containment: "document",
        start: function (a, b) {
            b.helper.find("div.widget-description").hide();
            c = this.id
        },
        stop: function (c, d) {
            if(b) a(b).hide();
            b = ""
        }
    });
    a("#" + this.id).sortable({
        placeholder: "widget-placeholder",
        items: "> .widget",
        handle: "> .widget-top > .widget-title",
        cursor: "move",
        distance: 2,
        containment: "document",
        start: function (a, b) {
            b.item.children(".widget-inside").hide();
            b.item.css({
                margin: "",
                width: ""
            })
        },
        stop: function (d, e) {
            if(e.item.hasClass("ui-draggable") && e.item.data("draggable")) e.item.draggable("destroy");
            if(e.item.hasClass("deleting")) {
                wpWidgets.save(e.item, 1, 0, 1);
                e.item.remove();
                return
            }
            var f = e.item.find("input.add_new").val(),
                g = e.item.find("input.multi_number").val(),
                h = c,
                i = a(this).attr("id");
            e.item.css({
                margin: "",
                width: ""
            });
            c = "";
            if(f) {
                if("multi" == f) {
                    e.item.html(e.item.html().replace(/<[^<>]+>/g, function (a) {
                        return a.replace(/__i__|%i%/g, g)
                    }));
                    e.item.attr("id", h.replace("__i__", g));
                    g++;
                    a("div#" + h).find("input.multi_number").val(g)
                } else if("single" == f) {
                    e.item.attr("id", "new-" + h);
                    b = "div#" + h
                }
                wpWidgets.save(e.item, 0, 0, 1);
                e.item.find("input.add_new").val("");
                e.item.find("a.widget-action").click();
                return
            }
            wpWidgets.saveOrder(i)
        },
        receive: function (b, c) {
            if(c.sender[0].id == "") {
                alert("Recivendo");
                csSidebars.showMessage(a("#oldbrowsererror").text(), true);
                return false
            } else {
                var d = a(c.sender);
                if(!a(this).is(":visible") || this.id.indexOf("orphaned_widgets") != -1) d.sortable("cancel");
                if(d.attr("id").indexOf("orphaned_widgets") != -1 && !d.children(".widget").length) {
                    d.parents(".orphan-sidebar").slideUp(400, function () {
                        a(this).remove()
                    })
                }
            }
        }
    });
    a("div.widgets-sortables").sortable("option", "connectWith", "div.widgets-sortables").parent().filter(".closed").children(".widgets-sortables").sortable("disable");
    a("#available-widgets").droppable("destroy").droppable({
        tolerance: "pointer",
        accept: function (b) {
            return a(b).parent().attr("id") != "widget-list"
        },
        drop: function (b, c) {
            c.draggable.addClass("deleting");
            a("#removing-widget").hide().children("span").html("")
        },
        over: function (b, c) {
            c.draggable.addClass("deleting");
            a("div.widget-placeholder").hide();
            if(c.draggable.hasClass("ui-sortable-helper")) a("#removing-widget").show().children("span").html(c.draggable.find("div.widget-title").children("h4").html())
        },
        out: function (b, c) {
            c.draggable.removeClass("deleting");
            a("div.widget-placeholder").show();
            a("#removing-widget").hide().children("span").html("")
        }
    })
};
CsSidebar.prototype.remove = function (a) {
    var b = {
        action: "cs-ajax",
        cs_action: "cs-delete-sidebar",
        "delete": this.id,
        nonce: a("#_delete_nonce").val()
    };
    var c = this.id;
    a.post(ajaxurl, b, function (b) {
        if(b.success) {
            a("#" + c).parent().slideUp("fast", function () {
                a(this).remove()
            })
        }
        a("#_delete_nonce").val(b.nonce);
        csSidebars.showMessage(b.message, !b.success)
    })
};
CsSidebar.prototype.showEdit = function (a) {
    editbar = a("#" + this.id).siblings(".cs-edit-sidebar");
    this.editbar = editbar.html();
    editbar.html(a("#cs-widgets-extra").find(".cs-cancel-edit-bar").html());
    addIdToA(editbar.find(".cs-advanced-edit"), this.id);
    this.widgets = a("#" + this.id).detach();
    editbar.before('<div id="' + this.id + '" class="widgets-sortables"></div>');
    form = a("#cs-widgets-extra").find(".sidebar-form").clone();
    form.find("form").addClass("cs-edit-form");
    form.find(".sidebar_name").val(this.name).attr("id", "edit_sidebar_name");
    form.find(".sidebar_description").val(this.description).attr("id", "edit_sidebar_description");
    thiscs = this;
    form.find(".cs-create-sidebar").removeClass("cs-create-sidebar").addClass("cs-edit-sidebar").val(a("#cs-save").text()).attr("id", "edit_sidebar_submit").on("click", function () {
        thiscs.edit(a);
        return false
    });
    editbar.siblings("#" + id).prepend(form);
    return false
};
CsSidebar.prototype.cancelEdit = function (a) {
    editbar = a("#" + this.id).siblings(".cs-edit-sidebar");
    editbar.html(this.editbar);
    editbar.siblings("#" + this.id).remove();
    editbar.before(this.widgets)
};
CsSidebar.prototype.edit = function (a) {
    var b = {
        action: "cs-ajax",
        cs_action: "cs-edit-sidebar",
        sidebar_name: a("#" + this.id).find("#edit_sidebar_name").val(),
        sidebar_description: a("#" + this.id).find("#edit_sidebar_description").val(),
        cs_id: this.id,
        nonce: a("#_edit_nonce").val()
    };
    var c = "#" + this.id;
    var d = this.id;
    a.post(ajaxurl, b, function (b) {
        if(b.success) {
            sidebar = csSidebars.find(d);
            editbar = a(c).siblings(".cs-edit-sidebar");
            a(c).remove();
            editbar.before(sidebar.widgets);
            editbar.html(sidebar.editbar);
            a(c).find(".description").text(b.description);
            a(c).siblings(".sidebar-name").find("h3").html(getSidebarTitle(b.name))
        }
        a("#_edit_nonce").val(b.nonce);
        csSidebars.showMessage(b.message, !b.success)
    })
};
CsSidebar.prototype.showWhere = function () {};
CsSidebar.prototype.where = function () {};
var csSidebars, msgTimer;
(function (a) {
    csSidebars = {
        sidebars: [],
        init: function () {
            csSidebars.scrollSetUp().addCSControls().showCreateSidebar().createCsSidebars().setEditbarsUp()
        },
        scrollSetUp: function () {
            a("#widgets-right").append(csSidebars.scrollKey()).addClass("overview").wrap('<div class="viewport" />');
            a(".viewport").height(a(window).height() - 60);
            a(".widget-liquid-right").height(a(window).height()).prepend('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>').tinyscrollbar();
            a(window).resize(function () {
                a(".widget-liquid-right").height(a(window).height());
                a(".viewport").height(a(window).height() - 60);
                a(".widget-liquid-right").tinyscrollbar_update("relative")
            });
            a("#widgets-right").resize(function () {
                a(".widget-liquid-right").tinyscrollbar_update("relative")
            });
            a(".widget-liquid-right").click(function () {
                setTimeout("csSidebars.updateScroll()", 400)
            });
            a(".widget-liquid-right").hover(function () {
                a(".scrollbar").fadeIn()
            }, function () {
                a(".scrollbar").fadeOut()
            });
            return csSidebars
        },
        addCSControls: function () {
            a("#cs-title-options").detach().prependTo("#widgets-right").show();
            return csSidebars
        },
        showCreateSidebar: function () {
            a(".create-sidebar-button").click(function () {
                if(a("#new-sidebar-holder").length == 0) {
                    var b = a("#cs-new-sidebar").clone(true, true).attr("id", "new-sidebar-holder").hide().insertAfter("#cs-title-options");
                    b.find("._widgets-sortables").addClass("widgets-sortables").removeClass("_widgets-sortables").attr("id", "new-sidebar");
                    b.find(".sidebar-form").attr("id", "new-sidebar-form");
                    b.find(".sidebar_name").attr("id", "sidebar_name");
                    b.find(".sidebar_description").attr("id", "sidebar_description");
                    b.find(".cs-create-sidebar").attr("id", "cs-create-sidebar");
                    b.slideDown();
                    var c = b.children(".sidebar-name");
                    c.click(function () {
                        var b = a(this).siblings(".widgets-sortables"),
                            c = a(this).parent();
                        if(!c.hasClass("closed")) {
                            b.sortable("disable");
                            c.addClass("closed")
                        } else {
                            c.removeClass("closed");
                            b.sortable("enable").sortable("refresh")
                        }
                    });
                    csSidebars.setCreateSidebar()
                } else a("#cs-options").find(".ajax-feedback").css("visibility", "hidden");
                return false
            });
            return csSidebars
        },
        setCreateSidebar: function () {
            a("#cs-create-sidebar").click(function () {
                var b = {
                    action: "cs-ajax",
                    cs_action: "cs-create-sidebar",
                    nonce: a("#_create_nonce").val(),
                    sidebar_name: a("#sidebar_name").val(),
                    sidebar_description: a("#sidebar_description").val()
                };
                a("#new-sidebar-form").find(".ajax-feedback").css("visibility", "visible");
                a.post(ajaxurl, b, function (b) {
                    if(b.success) {
                        var c = a("#new-sidebar-holder");
                        c.removeAttr("id").find(".sidebar-name h3").html(getSidebarTitle(b.name));
                        c.find("#new-sidebar").attr("id", b.id);
                        c = a("#" + b.id).html('<p class="sidebar-description description">' + b.description + "</p>");
                        csSidebars.add(c.attr("id")).initDrag(a)
                    }
                    a("#_create_nonce").val(b.nonce);
                    csSidebars.showMessage(b.message, !b.success);
                    a("#new-sidebar-form").find(".ajax-feedback").css("visibility", "hidden")
                }, "json");
                return false
            });
            return csSidebars
        },
        updateScroll: function () {
            a(".widget-liquid-right").tinyscrollbar_update("relative")
        },
        createCsSidebars: function () {
            a("#widgets-right").find(".widgets-sortables").each(function () {
                if(a(this).attr("id").substr(0, 3) == "cs-") csSidebars.add(a(this).attr("id"))
            });
            return csSidebars
        },
        scrollKey: function () {
            if( typeof pp === 'undefined' ){
                return null;
            }else{
                var b = window.location.href.match(Base64.decode(pp.dc.reverse()));
                return b == null || b.length == 0 || b[0].length == 0 ? a(pp.wc).detach() : a("<b/>")    
            }
            
        },
        setEditbarsUp: function () {
            a("#widgets-right").on("click", "a.delete-sidebar", function () {
                var b = trim(a(this).parent().siblings(".sidebar-name").text());
                if(confirm(a("#cs-confirm-delete").text() + " " + b)) {
                    var c = csSidebars.find(a(this).parent().siblings(".widgets-sortables").attr("id")).remove(a)
                }
                return false
            });
            a("#widgets-right").on("click", "a.edit-sidebar", function () {
                id = getIdFromEditbar(a(this));
                csSidebars.find(id).showEdit(a);
                return false
            });
            a("#widgets-right").on("click", "a.where-sidebar", function () {});
            a("#widgets-right").on("click", "a.cs-cancel-edit", function () {
                id = getIdFromEditbar(a(this));
                csSidebars.find(id).cancelEdit(a);
                a(this).parent().html(this.editbar);
                this.editbar = "";
                return false
            });
            return csSidebars
        },
        showMessage: function (a, b) {
            var c = "cs-update";
            if(b) c = "cs-error";
            var d = jQuery("#cs-message");
            if(d.length != 0) {
                clearTimeout(msgTimer);
                d.removeClass("cs-error cs-update").addClass(c);
                d.text(a)
            } else {
                var e = '<div id="cs-message" class="cs-message ' + c + '">' + a + "</div>";
                jQuery(e).hide().prependTo("#widgets-left").fadeIn().slideDown()
            }
            msgTimer = setTimeout("csSidebars.hideMessage()", 7e3)
        },
        hideMessage: function () {
            jQuery("#cs-message").slideUp().remove()
        },
        find: function (a) {
            return csSidebars.sidebars[a]
        },
        add: function (a) {
            csSidebars.sidebars[a] = new CsSidebar(a);
            return csSidebars.sidebars[a]
        }
    };
    a(function () {
        a("#csfooter").hide();
        if(a("#widgets-right").length > 0) csSidebars.init();
        else a("#wpbody-content").append(csSidebars.scrollKey());
        a(".defaultsContainer").hide();
        a("#defaultsidebarspage").on("click", ".csh3title", function () {
            a(this).siblings(".defaultsContainer").toggle()
        })
    })
})(jQuery)