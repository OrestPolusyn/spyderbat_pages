! function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self)["lottie-player"] = {})
}(this, (function (exports) {
  "use strict";

  function asyncGeneratorStep(t, e, r, i, a, s, n) {
    try {
      var o = t[s](n),
        h = o.value
    } catch (t) {
      return void r(t)
    }
    o.done ? e(h) : Promise.resolve(h).then(i, a)
  }

  function _asyncToGenerator(t) {
    return function () {
      var e = this,
        r = arguments;
      return new Promise((function (i, a) {
        var s = t.apply(e, r);

        function n(t) {
          asyncGeneratorStep(s, i, a, n, o, "next", t)
        }

        function o(t) {
          asyncGeneratorStep(s, i, a, n, o, "throw", t)
        }
        n(void 0)
      }))
    }
  }

  function _taggedTemplateLiteral(t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
      raw: {
        value: Object.freeze(e)
      }
    }))
  }
  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
  function __decorate(t, e, r, i) {
    var a, s = arguments.length,
      n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i);
    else
      for (var o = t.length - 1; o >= 0; o--)(a = t[o]) && (n = (s < 3 ? a(n) : s > 3 ? a(e, r, n) : a(e, r)) || n);
    return s > 3 && n && Object.defineProperty(e, r, n), n
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
  }
  var isCEPolyfill = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
    removeNodes = function (t, e) {
      for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null; e !== r;) {
        var i = e.nextSibling;
        t.removeChild(e), e = i
      }
    },
    marker = "{{lit-".concat(String(Math.random()).slice(2), "}}"),
    nodeMarker = "\x3c!--".concat(marker, "--\x3e"),
    markerRegex = new RegExp("".concat(marker, "|").concat(nodeMarker)),
    boundAttributeSuffix = "$lit$";
  class Template {
    constructor(t, e) {
      this.parts = [], this.element = e;
      for (var r = [], i = [], a = document.createTreeWalker(e.content, 133, null, !1), s = 0, n = -1, o = 0, {
          strings: h,
          values: {
            length: l
          }
        } = t; o < l;) {
        var p = a.nextNode();
        if (null !== p) {
          if (n++, 1 === p.nodeType) {
            if (p.hasAttributes()) {
              for (var d = p.attributes, {
                  length: c
                } = d, f = 0, m = 0; m < c; m++) endsWith(d[m].name, boundAttributeSuffix) && f++;
              for (; f-- > 0;) {
                var u = h[o],
                  y = lastAttributeNameRegex.exec(u)[2],
                  g = y.toLowerCase() + boundAttributeSuffix,
                  _ = p.getAttribute(g);
                p.removeAttribute(g);
                var v = _.split(markerRegex);
                this.parts.push({
                  type: "attribute",
                  index: n,
                  name: y,
                  strings: v
                }), o += v.length - 1
              }
            }
            "TEMPLATE" === p.tagName && (i.push(p), a.currentNode = p.content)
          } else if (3 === p.nodeType) {
            var b = p.data;
            if (b.indexOf(marker) >= 0) {
              for (var E = p.parentNode, S = b.split(markerRegex), P = S.length - 1, x = 0; x < P; x++) {
                var T = void 0,
                  A = S[x];
                if ("" === A) T = createMarker();
                else {
                  var C = lastAttributeNameRegex.exec(A);
                  null !== C && endsWith(C[2], boundAttributeSuffix) && (A = A.slice(0, C.index) + C[1] + C[2].slice(0, -boundAttributeSuffix.length) + C[3]), T = document.createTextNode(A)
                }
                E.insertBefore(T, p), this.parts.push({
                  type: "node",
                  index: ++n
                })
              }
              "" === S[P] ? (E.insertBefore(createMarker(), p), r.push(p)) : p.data = S[P], o += P
            }
          } else if (8 === p.nodeType)
            if (p.data === marker) {
              var w = p.parentNode;
              null !== p.previousSibling && n !== s || (n++, w.insertBefore(createMarker(), p)), s = n, this.parts.push({
                type: "node",
                index: n
              }), null === p.nextSibling ? p.data = "" : (r.push(p), n--), o++
            } else
              for (var k = -1; - 1 !== (k = p.data.indexOf(marker, k + 1));) this.parts.push({
                type: "node",
                index: -1
              }), o++
        } else a.currentNode = i.pop()
      }
      for (var D of r) D.parentNode.removeChild(D)
    }
  }
  var endsWith = (t, e) => {
      var r = t.length - e.length;
      return r >= 0 && t.slice(r) === e
    },
    isTemplatePartActive = t => -1 !== t.index,
    createMarker = () => document.createComment(""),
    lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,
    walkerNodeFilter = 133;

  function removeNodesFromTemplate(t, e) {
    for (var {
        element: {
          content: r
        },
        parts: i
      } = t, a = document.createTreeWalker(r, walkerNodeFilter, null, !1), s = nextActiveIndexInTemplateParts(i), n = i[s], o = -1, h = 0, l = [], p = null; a.nextNode();) {
      o++;
      var d = a.currentNode;
      for (d.previousSibling === p && (p = null), e.has(d) && (l.push(d), null === p && (p = d)), null !== p && h++; void 0 !== n && n.index === o;) n.index = null !== p ? -1 : n.index - h, n = i[s = nextActiveIndexInTemplateParts(i, s)]
    }
    l.forEach(t => t.parentNode.removeChild(t))
  }
  var countNodes = t => {
      for (var e = 11 === t.nodeType ? 0 : 1, r = document.createTreeWalker(t, walkerNodeFilter, null, !1); r.nextNode();) e++;
      return e
    },
    nextActiveIndexInTemplateParts = function (t) {
      for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, r = e + 1; r < t.length; r++) {
        var i = t[r];
        if (isTemplatePartActive(i)) return r
      }
      return -1
    };

  function insertNodeIntoTemplate(t, e) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
      {
        element: {
          content: i
        },
        parts: a
      } = t;
    if (null != r)
      for (var s = document.createTreeWalker(i, walkerNodeFilter, null, !1), n = nextActiveIndexInTemplateParts(a), o = 0, h = -1; s.nextNode();) {
        h++;
        var l = s.currentNode;
        for (l === r && (o = countNodes(e), r.parentNode.insertBefore(e, r)); - 1 !== n && a[n].index === h;) {
          if (o > 0) {
            for (; - 1 !== n;) a[n].index += o, n = nextActiveIndexInTemplateParts(a, n);
            return
          }
          n = nextActiveIndexInTemplateParts(a, n)
        }
      } else i.appendChild(e)
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var directives = new WeakMap,
    isDirective = t => "function" == typeof t && directives.has(t),
    noChange = {},
    nothing = {};
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class TemplateInstance {
    constructor(t, e, r) {
      this.__parts = [], this.template = t, this.processor = e, this.options = r
    }
    update(t) {
      var e = 0;
      for (var r of this.__parts) void 0 !== r && r.setValue(t[e]), e++;
      for (var i of this.__parts) void 0 !== i && i.commit()
    }
    _clone() {
      for (var t, e = isCEPolyfill ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0), r = [], i = this.template.parts, a = document.createTreeWalker(e, 133, null, !1), s = 0, n = 0, o = a.nextNode(); s < i.length;)
        if (t = i[s], isTemplatePartActive(t)) {
          for (; n < t.index;) n++, "TEMPLATE" === o.nodeName && (r.push(o), a.currentNode = o.content), null === (o = a.nextNode()) && (a.currentNode = r.pop(), o = a.nextNode());
          if ("node" === t.type) {
            var h = this.processor.handleTextExpression(this.options);
            h.insertAfterNode(o.previousSibling), this.__parts.push(h)
          } else this.__parts.push(...this.processor.handleAttributeExpressions(o, t.name, t.strings, this.options));
          s++
        } else this.__parts.push(void 0), s++;
      return isCEPolyfill && (document.adoptNode(e), customElements.upgrade(e)), e
    }
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", {
      createHTML: t => t
    }),
    commentMarker = " ".concat(marker, " ");
  class TemplateResult {
    constructor(t, e, r, i) {
      this.strings = t, this.values = e, this.type = r, this.processor = i
    }
    getHTML() {
      for (var t = this.strings.length - 1, e = "", r = !1, i = 0; i < t; i++) {
        var a = this.strings[i],
          s = a.lastIndexOf("\x3c!--");
        r = (s > -1 || r) && -1 === a.indexOf("--\x3e", s + 1);
        var n = lastAttributeNameRegex.exec(a);
        e += null === n ? a + (r ? commentMarker : nodeMarker) : a.substr(0, n.index) + n[1] + n[2] + boundAttributeSuffix + n[3] + marker
      }
      return e += this.strings[t]
    }
    getTemplateElement() {
      var t = document.createElement("template"),
        e = this.getHTML();
      return void 0 !== policy && (e = policy.createHTML(e)), t.innerHTML = e, t
    }
  }
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var isPrimitive = t => null === t || !("object" == typeof t || "function" == typeof t),
    isIterable = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
  class AttributeCommitter {
    constructor(t, e, r) {
      this.dirty = !0, this.element = t, this.name = e, this.strings = r, this.parts = [];
      for (var i = 0; i < r.length - 1; i++) this.parts[i] = this._createPart()
    }
    _createPart() {
      return new AttributePart(this)
    }
    _getValue() {
      var t = this.strings,
        e = t.length - 1,
        r = this.parts;
      if (1 === e && "" === t[0] && "" === t[1]) {
        var i = r[0].value;
        if ("symbol" == typeof i) return String(i);
        if ("string" == typeof i || !isIterable(i)) return i
      }
      for (var a = "", s = 0; s < e; s++) {
        a += t[s];
        var n = r[s];
        if (void 0 !== n) {
          var o = n.value;
          if (isPrimitive(o) || !isIterable(o)) a += "string" == typeof o ? o : String(o);
          else
            for (var h of o) a += "string" == typeof h ? h : String(h)
        }
      }
      return a += t[e]
    }
    commit() {
      this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()))
    }
  }
  class AttributePart {
    constructor(t) {
      this.value = void 0, this.committer = t
    }
    setValue(t) {
      t === noChange || isPrimitive(t) && t === this.value || (this.value = t, isDirective(t) || (this.committer.dirty = !0))
    }
    commit() {
      for (; isDirective(this.value);) {
        var t = this.value;
        this.value = noChange, t(this)
      }
      this.value !== noChange && this.committer.commit()
    }
  }
  class NodePart {
    constructor(t) {
      this.value = void 0, this.__pendingValue = void 0, this.options = t
    }
    appendInto(t) {
      this.startNode = t.appendChild(createMarker()), this.endNode = t.appendChild(createMarker())
    }
    insertAfterNode(t) {
      this.startNode = t, this.endNode = t.nextSibling
    }
    appendIntoPart(t) {
      t.__insert(this.startNode = createMarker()), t.__insert(this.endNode = createMarker())
    }
    insertAfterPart(t) {
      t.__insert(this.startNode = createMarker()), this.endNode = t.endNode, t.endNode = this.startNode
    }
    setValue(t) {
      this.__pendingValue = t
    }
    commit() {
      if (null !== this.startNode.parentNode) {
        for (; isDirective(this.__pendingValue);) {
          var t = this.__pendingValue;
          this.__pendingValue = noChange, t(this)
        }
        var e = this.__pendingValue;
        e !== noChange && (isPrimitive(e) ? e !== this.value && this.__commitText(e) : e instanceof TemplateResult ? this.__commitTemplateResult(e) : e instanceof Node ? this.__commitNode(e) : isIterable(e) ? this.__commitIterable(e) : e === nothing ? (this.value = nothing, this.clear()) : this.__commitText(e))
      }
    }
    __insert(t) {
      this.endNode.parentNode.insertBefore(t, this.endNode)
    }
    __commitNode(t) {
      this.value !== t && (this.clear(), this.__insert(t), this.value = t)
    }
    __commitText(t) {
      var e = this.startNode.nextSibling,
        r = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
      e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = r : this.__commitNode(document.createTextNode(r)), this.value = t
    }
    __commitTemplateResult(t) {
      var e = this.options.templateFactory(t);
      if (this.value instanceof TemplateInstance && this.value.template === e) this.value.update(t.values);
      else {
        var r = new TemplateInstance(e, t.processor, this.options),
          i = r._clone();
        r.update(t.values), this.__commitNode(i), this.value = r
      }
    }
    __commitIterable(t) {
      Array.isArray(this.value) || (this.value = [], this.clear());
      var e, r = this.value,
        i = 0;
      for (var a of t) void 0 === (e = r[i]) && (e = new NodePart(this.options), r.push(e), 0 === i ? e.appendIntoPart(this) : e.insertAfterPart(r[i - 1])), e.setValue(a), e.commit(), i++;
      i < r.length && (r.length = i, this.clear(e && e.endNode))
    }
    clear() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.startNode;
      removeNodes(this.startNode.parentNode, t.nextSibling, this.endNode)
    }
  }
  class BooleanAttributePart {
    constructor(t, e, r) {
      if (this.value = void 0, this.__pendingValue = void 0, 2 !== r.length || "" !== r[0] || "" !== r[1]) throw new Error("Boolean attributes can only contain a single expression");
      this.element = t, this.name = e, this.strings = r
    }
    setValue(t) {
      this.__pendingValue = t
    }
    commit() {
      for (; isDirective(this.__pendingValue);) {
        var t = this.__pendingValue;
        this.__pendingValue = noChange, t(this)
      }
      if (this.__pendingValue !== noChange) {
        var e = !!this.__pendingValue;
        this.value !== e && (e ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = e), this.__pendingValue = noChange
      }
    }
  }
  class PropertyCommitter extends AttributeCommitter {
    constructor(t, e, r) {
      super(t, e, r), this.single = 2 === r.length && "" === r[0] && "" === r[1]
    }
    _createPart() {
      return new PropertyPart(this)
    }
    _getValue() {
      return this.single ? this.parts[0].value : super._getValue()
    }
    commit() {
      this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue())
    }
  }
  class PropertyPart extends AttributePart {}
  var eventOptionsSupported = !1;
  (() => {
    try {
      var t = {
        get capture() {
          return eventOptionsSupported = !0, !1
        }
      };
      window.addEventListener("test", t, t), window.removeEventListener("test", t, t)
    } catch (t) {}
  })();
  class EventPart {
    constructor(t, e, r) {
      this.value = void 0, this.__pendingValue = void 0, this.element = t, this.eventName = e, this.eventContext = r, this.__boundHandleEvent = t => this.handleEvent(t)
    }
    setValue(t) {
      this.__pendingValue = t
    }
    commit() {
      for (; isDirective(this.__pendingValue);) {
        var t = this.__pendingValue;
        this.__pendingValue = noChange, t(this)
      }
      if (this.__pendingValue !== noChange) {
        var e = this.__pendingValue,
          r = this.value,
          i = null == e || null != r && (e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive),
          a = null != e && (null == r || i);
        i && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options), a && (this.__options = getOptions(e), this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)), this.value = e, this.__pendingValue = noChange
      }
    }
    handleEvent(t) {
      "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t)
    }
  }
  var getOptions = t => t && (eventOptionsSupported ? {
    capture: t.capture,
    passive: t.passive,
    once: t.once
  } : t.capture)
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  ;

  function templateFactory(t) {
    var e = templateCaches.get(t.type);
    void 0 === e && (e = {
      stringsArray: new WeakMap,
      keyString: new Map
    }, templateCaches.set(t.type, e));
    var r = e.stringsArray.get(t.strings);
    if (void 0 !== r) return r;
    var i = t.strings.join(marker);
    return void 0 === (r = e.keyString.get(i)) && (r = new Template(t, t.getTemplateElement()), e.keyString.set(i, r)), e.stringsArray.set(t.strings, r), r
  }
  var templateCaches = new Map,
    parts = new WeakMap,
    render$1 = (t, e, r) => {
      var i = parts.get(e);
      void 0 === i && (removeNodes(e, e.firstChild), parts.set(e, i = new NodePart(Object.assign({
        templateFactory: templateFactory
      }, r))), i.appendInto(e)), i.setValue(t), i.commit()
    };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class DefaultTemplateProcessor {
    handleAttributeExpressions(t, e, r, i) {
      var a = e[0];
      return "." === a ? new PropertyCommitter(t, e.slice(1), r).parts : "@" === a ? [new EventPart(t, e.slice(1), i.eventContext)] : "?" === a ? [new BooleanAttributePart(t, e.slice(1), r)] : new AttributeCommitter(t, e, r).parts
    }
    handleTextExpression(t) {
      return new NodePart(t)
    }
  }
  var defaultTemplateProcessor = new DefaultTemplateProcessor;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  "undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.3.0");
  var html = function (t) {
      for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
      return new TemplateResult(t, r, "html", defaultTemplateProcessor)
    },
    getTemplateCacheKey = (t, e) => "".concat(t, "--").concat(e),
    compatibleShadyCSSVersion = !0;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  void 0 === window.ShadyCSS ? compatibleShadyCSSVersion = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), compatibleShadyCSSVersion = !1);
  var shadyTemplateFactory = t => e => {
      var r = getTemplateCacheKey(e.type, t),
        i = templateCaches.get(r);
      void 0 === i && (i = {
        stringsArray: new WeakMap,
        keyString: new Map
      }, templateCaches.set(r, i));
      var a = i.stringsArray.get(e.strings);
      if (void 0 !== a) return a;
      var s = e.strings.join(marker);
      if (void 0 === (a = i.keyString.get(s))) {
        var n = e.getTemplateElement();
        compatibleShadyCSSVersion && window.ShadyCSS.prepareTemplateDom(n, t), a = new Template(e, n), i.keyString.set(s, a)
      }
      return i.stringsArray.set(e.strings, a), a
    },
    TEMPLATE_TYPES = ["html", "svg"],
    removeStylesFromLitTemplates = t => {
      TEMPLATE_TYPES.forEach(e => {
        var r = templateCaches.get(getTemplateCacheKey(e, t));
        void 0 !== r && r.keyString.forEach(t => {
          var {
            element: {
              content: e
            }
          } = t, r = new Set;
          Array.from(e.querySelectorAll("style")).forEach(t => {
            r.add(t)
          }), removeNodesFromTemplate(t, r)
        })
      })
    },
    shadyRenderSet = new Set,
    prepareTemplateStyles = (t, e, r) => {
      shadyRenderSet.add(t);
      var i = r ? r.element : document.createElement("template"),
        a = e.querySelectorAll("style"),
        {
          length: s
        } = a;
      if (0 !== s) {
        for (var n = document.createElement("style"), o = 0; o < s; o++) {
          var h = a[o];
          h.parentNode.removeChild(h), n.textContent += h.textContent
        }
        removeStylesFromLitTemplates(t);
        var l = i.content;
        r ? insertNodeIntoTemplate(r, n, l.firstChild) : l.insertBefore(n, l.firstChild), window.ShadyCSS.prepareTemplateStyles(i, t);
        var p = l.querySelector("style");
        if (window.ShadyCSS.nativeShadow && null !== p) e.insertBefore(p.cloneNode(!0), e.firstChild);
        else if (r) {
          l.insertBefore(n, l.firstChild);
          var d = new Set;
          d.add(n), removeNodesFromTemplate(r, d)
        }
      } else window.ShadyCSS.prepareTemplateStyles(i, t)
    },
    render = (t, e, r) => {
      if (!r || "object" != typeof r || !r.scopeName) throw new Error("The `scopeName` option is required.");
      var i = r.scopeName,
        a = parts.has(e),
        s = compatibleShadyCSSVersion && 11 === e.nodeType && !!e.host,
        n = s && !shadyRenderSet.has(i),
        o = n ? document.createDocumentFragment() : e;
      if (render$1(t, o, Object.assign({
          templateFactory: shadyTemplateFactory(i)
        }, r)), n) {
        var h = parts.get(o);
        parts.delete(o);
        var l = h.value instanceof TemplateInstance ? h.value.template : void 0;
        prepareTemplateStyles(i, o, l), removeNodes(e, e.firstChild), e.appendChild(o), parts.set(e, h)
      }!a && s && window.ShadyCSS.styleElement(e.host)
    },
    _a;
  window.JSCompiler_renameProperty = (t, e) => t;
  var defaultConverter = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            return t ? "" : null;
          case Object:
          case Array:
            return null == t ? t : JSON.stringify(t)
        }
        return t
      },
      fromAttribute(t, e) {
        switch (e) {
          case Boolean:
            return null !== t;
          case Number:
            return null === t ? null : Number(t);
          case Object:
          case Array:
            return JSON.parse(t)
        }
        return t
      }
    },
    notEqual = (t, e) => e !== t && (e == e || t == t),
    defaultPropertyDeclaration = {
      attribute: !0,
      type: String,
      converter: defaultConverter,
      reflect: !1,
      hasChanged: notEqual
    },
    STATE_HAS_UPDATED = 1,
    STATE_UPDATE_REQUESTED = 4,
    STATE_IS_REFLECTING_TO_ATTRIBUTE = 8,
    STATE_IS_REFLECTING_TO_PROPERTY = 16,
    finalized = "finalized";
  class UpdatingElement extends HTMLElement {
    constructor() {
      super(), this.initialize()
    }
    static get observedAttributes() {
      this.finalize();
      var t = [];
      return this._classProperties.forEach((e, r) => {
        var i = this._attributeNameForProperty(r, e);
        void 0 !== i && (this._attributeToPropertyMap.set(i, r), t.push(i))
      }), t
    }
    static _ensureClassProperties() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
        this._classProperties = new Map;
        var t = Object.getPrototypeOf(this)._classProperties;
        void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t))
      }
    }
    static createProperty(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : defaultPropertyDeclaration;
      if (this._ensureClassProperties(), this._classProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
        var r = "symbol" == typeof t ? Symbol() : "__".concat(t),
          i = this.getPropertyDescriptor(t, r, e);
        void 0 !== i && Object.defineProperty(this.prototype, t, i)
      }
    }
    static getPropertyDescriptor(t, e, r) {
      return {
        get() {
          return this[e]
        },
        set(i) {
          var a = this[t];
          this[e] = i, this.requestUpdateInternal(t, a, r)
        },
        configurable: !0,
        enumerable: !0
      }
    }
    static getPropertyOptions(t) {
      return this._classProperties && this._classProperties.get(t) || defaultPropertyDeclaration
    }
    static finalize() {
      var t = Object.getPrototypeOf(this);
      if (t.hasOwnProperty(finalized) || t.finalize(), this[finalized] = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map, this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
        var e = this.properties,
          r = [...Object.getOwnPropertyNames(e), ..."function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : []];
        for (var i of r) this.createProperty(i, e[i])
      }
    }
    static _attributeNameForProperty(t, e) {
      var r = e.attribute;
      return !1 === r ? void 0 : "string" == typeof r ? r : "string" == typeof t ? t.toLowerCase() : void 0
    }
    static _valueHasChanged(t, e) {
      return (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : notEqual)(t, e)
    }
    static _propertyValueFromAttribute(t, e) {
      var r = e.type,
        i = e.converter || defaultConverter,
        a = "function" == typeof i ? i : i.fromAttribute;
      return a ? a(t, r) : t
    }
    static _propertyValueToAttribute(t, e) {
      if (void 0 !== e.reflect) {
        var r = e.type,
          i = e.converter;
        return (i && i.toAttribute || defaultConverter.toAttribute)(t, r)
      }
    }
    initialize() {
      this._updateState = 0, this._updatePromise = new Promise(t => this._enableUpdatingResolver = t), this._changedProperties = new Map, this._saveInstanceProperties(), this.requestUpdateInternal()
    }
    _saveInstanceProperties() {
      this.constructor._classProperties.forEach((t, e) => {
        if (this.hasOwnProperty(e)) {
          var r = this[e];
          delete this[e], this._instanceProperties || (this._instanceProperties = new Map), this._instanceProperties.set(e, r)
        }
      })
    }
    _applyInstanceProperties() {
      this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0
    }
    connectedCallback() {
      this.enableUpdating()
    }
    enableUpdating() {
      void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0)
    }
    disconnectedCallback() {}
    attributeChangedCallback(t, e, r) {
      e !== r && this._attributeToProperty(t, r)
    }
    _propertyToAttribute(t, e) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : defaultPropertyDeclaration,
        i = this.constructor,
        a = i._attributeNameForProperty(t, r);
      if (void 0 !== a) {
        var s = i._propertyValueToAttribute(e, r);
        if (void 0 === s) return;
        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE, null == s ? this.removeAttribute(a) : this.setAttribute(a, s), this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE
      }
    }
    _attributeToProperty(t, e) {
      if (!(this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE)) {
        var r = this.constructor,
          i = r._attributeToPropertyMap.get(t);
        if (void 0 !== i) {
          var a = r.getPropertyOptions(i);
          this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY, this[i] = r._propertyValueFromAttribute(e, a), this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY
        }
      }
    }
    requestUpdateInternal(t, e, r) {
      var i = !0;
      if (void 0 !== t) {
        var a = this.constructor;
        r = r || a.getPropertyOptions(t), a._valueHasChanged(this[t], e, r.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== r.reflect || this._updateState & STATE_IS_REFLECTING_TO_PROPERTY || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map), this._reflectingProperties.set(t, r))) : i = !1
      }!this._hasRequestedUpdate && i && (this._updatePromise = this._enqueueUpdate())
    }
    requestUpdate(t, e) {
      return this.requestUpdateInternal(t, e), this.updateComplete
    }
    _enqueueUpdate() {
      var t = this;
      return _asyncToGenerator((function* () {
        t._updateState = t._updateState | STATE_UPDATE_REQUESTED;
        try {
          yield t._updatePromise
        } catch (t) {}
        var e = t.performUpdate();
        return null != e && (yield e), !t._hasRequestedUpdate
      }))()
    }
    get _hasRequestedUpdate() {
      return this._updateState & STATE_UPDATE_REQUESTED
    }
    get hasUpdated() {
      return this._updateState & STATE_HAS_UPDATED
    }
    performUpdate() {
      if (this._hasRequestedUpdate) {
        this._instanceProperties && this._applyInstanceProperties();
        var t = !1,
          e = this._changedProperties;
        try {
          (t = this.shouldUpdate(e)) ? this.update(e): this._markUpdated()
        } catch (e) {
          throw t = !1, this._markUpdated(), e
        }
        t && (this._updateState & STATE_HAS_UPDATED || (this._updateState = this._updateState | STATE_HAS_UPDATED, this.firstUpdated(e)), this.updated(e))
      }
    }
    _markUpdated() {
      this._changedProperties = new Map, this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED
    }
    get updateComplete() {
      return this._getUpdateComplete()
    }
    _getUpdateComplete() {
      return this._updatePromise
    }
    shouldUpdate(t) {
      return !0
    }
    update(t) {
      void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0), this._markUpdated()
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  _a = finalized, UpdatingElement[_a] = !0;
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var legacyCustomElement = (t, e) => (window.customElements.define(t, e), e),
    standardCustomElement = (t, e) => {
      var {
        kind: r,
        elements: i
      } = e;
      return {
        kind: r,
        elements: i,
        finisher(e) {
          window.customElements.define(t, e)
        }
      }
    },
    customElement = t => e => "function" == typeof e ? legacyCustomElement(t, e) : standardCustomElement(t, e),
    standardProperty = (t, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? Object.assign(Object.assign({}, e), {
      finisher(r) {
        r.createProperty(e.key, t)
      }
    }) : {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      initializer() {
        "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this))
      },
      finisher(r) {
        r.createProperty(e.key, t)
      }
    },
    legacyProperty = (t, e, r) => {
      e.constructor.createProperty(r, t)
    };

  function property(t) {
    return (e, r) => void 0 !== r ? legacyProperty(t, e, r) : standardProperty(t, e)
  }

  function query(t, e) {
    return (r, i) => {
      var a = {
        get() {
          return this.renderRoot.querySelector(t)
        },
        enumerable: !0,
        configurable: !0
      };
      if (e) {
        var s = "symbol" == typeof i ? Symbol() : "__".concat(i);
        a.get = function () {
          return void 0 === this[s] && (this[s] = this.renderRoot.querySelector(t)), this[s]
        }
      }
      return void 0 !== i ? legacyQuery(a, r, i) : standardQuery(a, r)
    }
  }
  var legacyQuery = (t, e, r) => {
      Object.defineProperty(e, r, t)
    },
    standardQuery = (t, e) => ({
      kind: "method",
      placement: "prototype",
      key: e.key,
      descriptor: t
    })
    /**
      @license
      Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
      This code may only be used under the BSD style license found at
      http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
      http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
      found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
      part of the polymer project is also subject to an additional IP rights grant
      found at http://polymer.github.io/PATENTS.txt
      */
    ,
    supportsAdoptingStyleSheets = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
    constructionToken = Symbol();
  class CSSResult {
    constructor(t, e) {
      if (e !== constructionToken) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t
    }
    get styleSheet() {
      return void 0 === this._styleSheet && (supportsAdoptingStyleSheets ? (this._styleSheet = new CSSStyleSheet, this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet
    }
    toString() {
      return this.cssText
    }
  }
  var unsafeCSS = t => new CSSResult(String(t), constructionToken),
    textFromCSSResult = t => {
      if (t instanceof CSSResult) return t.cssText;
      if ("number" == typeof t) return t;
      throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(t, ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."))
    },
    css = function (t) {
      for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++) r[i - 1] = arguments[i];
      var a = r.reduce((e, r, i) => e + textFromCSSResult(r) + t[i + 1], t[0]);
      return new CSSResult(a, constructionToken)
    };
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  (window.litElementVersions || (window.litElementVersions = [])).push("2.4.0");
  var renderNotImplemented = {};
  class LitElement extends UpdatingElement {
    static getStyles() {
      return this.styles
    }
    static _getUniqueStyles() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) {
        var t = this.getStyles();
        if (Array.isArray(t)) {
          var e = (t, r) => t.reduceRight((t, r) => Array.isArray(r) ? e(r, t) : (t.add(r), t), r),
            r = e(t, new Set),
            i = [];
          r.forEach(t => i.unshift(t)), this._styles = i
        } else this._styles = void 0 === t ? [] : [t];
        this._styles = this._styles.map(t => {
          if (t instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
            var e = Array.prototype.slice.call(t.cssRules).reduce((t, e) => t + e.cssText, "");
            return unsafeCSS(e)
          }
          return t
        })
      }
    }
    initialize() {
      super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles()
    }
    createRenderRoot() {
      return this.attachShadow({
        mode: "open"
      })
    }
    adoptStyles() {
      var t = this.constructor._styles;
      0 !== t.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? supportsAdoptingStyleSheets ? this.renderRoot.adoptedStyleSheets = t.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t => t.cssText), this.localName))
    }
    connectedCallback() {
      super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this)
    }
    update(t) {
      var e = this.render();
      super.update(t), e !== renderNotImplemented && this.constructor.render(e, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(t => {
        var e = document.createElement("style");
        e.textContent = t.cssText, this.renderRoot.appendChild(e)
      }))
    }
    render() {
      return renderNotImplemented
    }
  }

  function createCommonjsModule(t, e, r) {
    return t(r = {
      path: e,
      exports: {},
      require: function (t, e) {
        return commonjsRequire(t, null == e ? r.path : e)
      }
    }, r.exports), r.exports
  }

  function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
  }
  LitElement.finalized = !0, LitElement.render = render;
  var common = createCommonjsModule((function (t, e) {
      var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

      function i(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }
      e.assign = function (t) {
        for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
          var r = e.shift();
          if (r) {
            if ("object" != typeof r) throw new TypeError(r + "must be non-object");
            for (var a in r) i(r, a) && (t[a] = r[a])
          }
        }
        return t
      }, e.shrinkBuf = function (t, e) {
        return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
      };
      var a = {
          arraySet: function (t, e, r, i, a) {
            if (e.subarray && t.subarray) t.set(e.subarray(r, r + i), a);
            else
              for (var s = 0; s < i; s++) t[a + s] = e[r + s]
          },
          flattenChunks: function (t) {
            var e, r, i, a, s, n;
            for (i = 0, e = 0, r = t.length; e < r; e++) i += t[e].length;
            for (n = new Uint8Array(i), a = 0, e = 0, r = t.length; e < r; e++) s = t[e], n.set(s, a), a += s.length;
            return n
          }
        },
        s = {
          arraySet: function (t, e, r, i, a) {
            for (var s = 0; s < i; s++) t[a + s] = e[r + s]
          },
          flattenChunks: function (t) {
            return [].concat.apply([], t)
          }
        };
      e.setTyped = function (t) {
        t ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, a)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, s))
      }, e.setTyped(r)
    })),
    Z_FIXED$1 = 4,
    Z_BINARY = 0,
    Z_TEXT = 1,
    Z_UNKNOWN$1 = 2;

  function zero$1(t) {
    for (var e = t.length; --e >= 0;) t[e] = 0
  }
  var STORED_BLOCK = 0,
    STATIC_TREES = 1,
    DYN_TREES = 2,
    MIN_MATCH$1 = 3,
    MAX_MATCH$1 = 258,
    LENGTH_CODES$1 = 29,
    LITERALS$1 = 256,
    L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1,
    D_CODES$1 = 30,
    BL_CODES$1 = 19,
    HEAP_SIZE$1 = 2 * L_CODES$1 + 1,
    MAX_BITS$1 = 15,
    Buf_size = 16,
    MAX_BL_BITS = 7,
    END_BLOCK = 256,
    REP_3_6 = 16,
    REPZ_3_10 = 17,
    REPZ_11_138 = 18,
    extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
    extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
    extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
    bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
    DIST_CODE_LEN = 512,
    static_ltree = new Array(2 * (L_CODES$1 + 2));
  zero$1(static_ltree);
  var static_dtree = new Array(2 * D_CODES$1);
  zero$1(static_dtree);
  var _dist_code = new Array(DIST_CODE_LEN);
  zero$1(_dist_code);
  var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
  zero$1(_length_code);
  var base_length = new Array(LENGTH_CODES$1);
  zero$1(base_length);
  var base_dist = new Array(D_CODES$1),
    static_l_desc, static_d_desc, static_bl_desc;

  function StaticTreeDesc(t, e, r, i, a) {
    this.static_tree = t, this.extra_bits = e, this.extra_base = r, this.elems = i, this.max_length = a, this.has_stree = t && t.length
  }

  function TreeDesc(t, e) {
    this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
  }

  function d_code(t) {
    return t < 256 ? _dist_code[t] : _dist_code[256 + (t >>> 7)]
  }

  function put_short(t, e) {
    t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
  }

  function send_bits(t, e, r) {
    t.bi_valid > Buf_size - r ? (t.bi_buf |= e << t.bi_valid & 65535, put_short(t, t.bi_buf), t.bi_buf = e >> Buf_size - t.bi_valid, t.bi_valid += r - Buf_size) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += r)
  }

  function send_code(t, e, r) {
    send_bits(t, r[2 * e], r[2 * e + 1])
  }

  function bi_reverse(t, e) {
    var r = 0;
    do {
      r |= 1 & t, t >>>= 1, r <<= 1
    } while (--e > 0);
    return r >>> 1
  }

  function bi_flush(t) {
    16 === t.bi_valid ? (put_short(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
  }

  function gen_bitlen(t, e) {
    var r, i, a, s, n, o, h = e.dyn_tree,
      l = e.max_code,
      p = e.stat_desc.static_tree,
      d = e.stat_desc.has_stree,
      c = e.stat_desc.extra_bits,
      f = e.stat_desc.extra_base,
      m = e.stat_desc.max_length,
      u = 0;
    for (s = 0; s <= MAX_BITS$1; s++) t.bl_count[s] = 0;
    for (h[2 * t.heap[t.heap_max] + 1] = 0, r = t.heap_max + 1; r < HEAP_SIZE$1; r++)(s = h[2 * h[2 * (i = t.heap[r]) + 1] + 1] + 1) > m && (s = m, u++), h[2 * i + 1] = s, i > l || (t.bl_count[s]++, n = 0, i >= f && (n = c[i - f]), o = h[2 * i], t.opt_len += o * (s + n), d && (t.static_len += o * (p[2 * i + 1] + n)));
    if (0 !== u) {
      do {
        for (s = m - 1; 0 === t.bl_count[s];) s--;
        t.bl_count[s]--, t.bl_count[s + 1] += 2, t.bl_count[m]--, u -= 2
      } while (u > 0);
      for (s = m; 0 !== s; s--)
        for (i = t.bl_count[s]; 0 !== i;)(a = t.heap[--r]) > l || (h[2 * a + 1] !== s && (t.opt_len += (s - h[2 * a + 1]) * h[2 * a], h[2 * a + 1] = s), i--)
    }
  }

  function gen_codes(t, e, r) {
    var i, a, s = new Array(MAX_BITS$1 + 1),
      n = 0;
    for (i = 1; i <= MAX_BITS$1; i++) s[i] = n = n + r[i - 1] << 1;
    for (a = 0; a <= e; a++) {
      var o = t[2 * a + 1];
      0 !== o && (t[2 * a] = bi_reverse(s[o]++, o))
    }
  }

  function tr_static_init() {
    var t, e, r, i, a, s = new Array(MAX_BITS$1 + 1);
    for (r = 0, i = 0; i < LENGTH_CODES$1 - 1; i++)
      for (base_length[i] = r, t = 0; t < 1 << extra_lbits[i]; t++) _length_code[r++] = i;
    for (_length_code[r - 1] = i, a = 0, i = 0; i < 16; i++)
      for (base_dist[i] = a, t = 0; t < 1 << extra_dbits[i]; t++) _dist_code[a++] = i;
    for (a >>= 7; i < D_CODES$1; i++)
      for (base_dist[i] = a << 7, t = 0; t < 1 << extra_dbits[i] - 7; t++) _dist_code[256 + a++] = i;
    for (e = 0; e <= MAX_BITS$1; e++) s[e] = 0;
    for (t = 0; t <= 143;) static_ltree[2 * t + 1] = 8, t++, s[8]++;
    for (; t <= 255;) static_ltree[2 * t + 1] = 9, t++, s[9]++;
    for (; t <= 279;) static_ltree[2 * t + 1] = 7, t++, s[7]++;
    for (; t <= 287;) static_ltree[2 * t + 1] = 8, t++, s[8]++;
    for (gen_codes(static_ltree, L_CODES$1 + 1, s), t = 0; t < D_CODES$1; t++) static_dtree[2 * t + 1] = 5, static_dtree[2 * t] = bi_reverse(t, 5);
    static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1), static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1), static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS)
  }

  function init_block(t) {
    var e;
    for (e = 0; e < L_CODES$1; e++) t.dyn_ltree[2 * e] = 0;
    for (e = 0; e < D_CODES$1; e++) t.dyn_dtree[2 * e] = 0;
    for (e = 0; e < BL_CODES$1; e++) t.bl_tree[2 * e] = 0;
    t.dyn_ltree[2 * END_BLOCK] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
  }

  function bi_windup(t) {
    t.bi_valid > 8 ? put_short(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
  }

  function copy_block(t, e, r, i) {
    bi_windup(t), i && (put_short(t, r), put_short(t, ~r)), common.arraySet(t.pending_buf, t.window, e, r, t.pending), t.pending += r
  }

  function smaller(t, e, r, i) {
    var a = 2 * e,
      s = 2 * r;
    return t[a] < t[s] || t[a] === t[s] && i[e] <= i[r]
  }

  function pqdownheap(t, e, r) {
    for (var i = t.heap[r], a = r << 1; a <= t.heap_len && (a < t.heap_len && smaller(e, t.heap[a + 1], t.heap[a], t.depth) && a++, !smaller(e, i, t.heap[a], t.depth));) t.heap[r] = t.heap[a], r = a, a <<= 1;
    t.heap[r] = i
  }

  function compress_block(t, e, r) {
    var i, a, s, n, o = 0;
    if (0 !== t.last_lit)
      do {
        i = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], a = t.pending_buf[t.l_buf + o], o++, 0 === i ? send_code(t, a, e) : (send_code(t, (s = _length_code[a]) + LITERALS$1 + 1, e), 0 !== (n = extra_lbits[s]) && send_bits(t, a -= base_length[s], n), send_code(t, s = d_code(--i), r), 0 !== (n = extra_dbits[s]) && send_bits(t, i -= base_dist[s], n))
      } while (o < t.last_lit);
    send_code(t, END_BLOCK, e)
  }

  function build_tree(t, e) {
    var r, i, a, s = e.dyn_tree,
      n = e.stat_desc.static_tree,
      o = e.stat_desc.has_stree,
      h = e.stat_desc.elems,
      l = -1;
    for (t.heap_len = 0, t.heap_max = HEAP_SIZE$1, r = 0; r < h; r++) 0 !== s[2 * r] ? (t.heap[++t.heap_len] = l = r, t.depth[r] = 0) : s[2 * r + 1] = 0;
    for (; t.heap_len < 2;) s[2 * (a = t.heap[++t.heap_len] = l < 2 ? ++l : 0)] = 1, t.depth[a] = 0, t.opt_len--, o && (t.static_len -= n[2 * a + 1]);
    for (e.max_code = l, r = t.heap_len >> 1; r >= 1; r--) pqdownheap(t, s, r);
    a = h;
    do {
      r = t.heap[1], t.heap[1] = t.heap[t.heap_len--], pqdownheap(t, s, 1), i = t.heap[1], t.heap[--t.heap_max] = r, t.heap[--t.heap_max] = i, s[2 * a] = s[2 * r] + s[2 * i], t.depth[a] = (t.depth[r] >= t.depth[i] ? t.depth[r] : t.depth[i]) + 1, s[2 * r + 1] = s[2 * i + 1] = a, t.heap[1] = a++, pqdownheap(t, s, 1)
    } while (t.heap_len >= 2);
    t.heap[--t.heap_max] = t.heap[1], gen_bitlen(t, e), gen_codes(s, l, t.bl_count)
  }

  function scan_tree(t, e, r) {
    var i, a, s = -1,
      n = e[1],
      o = 0,
      h = 7,
      l = 4;
    for (0 === n && (h = 138, l = 3), e[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) a = n, n = e[2 * (i + 1) + 1], ++o < h && a === n || (o < l ? t.bl_tree[2 * a] += o : 0 !== a ? (a !== s && t.bl_tree[2 * a]++, t.bl_tree[2 * REP_3_6]++) : o <= 10 ? t.bl_tree[2 * REPZ_3_10]++ : t.bl_tree[2 * REPZ_11_138]++, o = 0, s = a, 0 === n ? (h = 138, l = 3) : a === n ? (h = 6, l = 3) : (h = 7, l = 4))
  }

  function send_tree(t, e, r) {
    var i, a, s = -1,
      n = e[1],
      o = 0,
      h = 7,
      l = 4;
    for (0 === n && (h = 138, l = 3), i = 0; i <= r; i++)
      if (a = n, n = e[2 * (i + 1) + 1], !(++o < h && a === n)) {
        if (o < l)
          do {
            send_code(t, a, t.bl_tree)
          } while (0 != --o);
        else 0 !== a ? (a !== s && (send_code(t, a, t.bl_tree), o--), send_code(t, REP_3_6, t.bl_tree), send_bits(t, o - 3, 2)) : o <= 10 ? (send_code(t, REPZ_3_10, t.bl_tree), send_bits(t, o - 3, 3)) : (send_code(t, REPZ_11_138, t.bl_tree), send_bits(t, o - 11, 7));
        o = 0, s = a, 0 === n ? (h = 138, l = 3) : a === n ? (h = 6, l = 3) : (h = 7, l = 4)
      }
  }

  function build_bl_tree(t) {
    var e;
    for (scan_tree(t, t.dyn_ltree, t.l_desc.max_code), scan_tree(t, t.dyn_dtree, t.d_desc.max_code), build_tree(t, t.bl_desc), e = BL_CODES$1 - 1; e >= 3 && 0 === t.bl_tree[2 * bl_order[e] + 1]; e--);
    return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
  }

  function send_all_trees(t, e, r, i) {
    var a;
    for (send_bits(t, e - 257, 5), send_bits(t, r - 1, 5), send_bits(t, i - 4, 4), a = 0; a < i; a++) send_bits(t, t.bl_tree[2 * bl_order[a] + 1], 3);
    send_tree(t, t.dyn_ltree, e - 1), send_tree(t, t.dyn_dtree, r - 1)
  }

  function detect_data_type(t) {
    var e, r = 4093624447;
    for (e = 0; e <= 31; e++, r >>>= 1)
      if (1 & r && 0 !== t.dyn_ltree[2 * e]) return Z_BINARY;
    if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return Z_TEXT;
    for (e = 32; e < LITERALS$1; e++)
      if (0 !== t.dyn_ltree[2 * e]) return Z_TEXT;
    return Z_BINARY
  }
  zero$1(base_dist);
  var static_init_done = !1;

  function _tr_init(t) {
    static_init_done || (tr_static_init(), static_init_done = !0), t.l_desc = new TreeDesc(t.dyn_ltree, static_l_desc), t.d_desc = new TreeDesc(t.dyn_dtree, static_d_desc), t.bl_desc = new TreeDesc(t.bl_tree, static_bl_desc), t.bi_buf = 0, t.bi_valid = 0, init_block(t)
  }

  function _tr_stored_block(t, e, r, i) {
    send_bits(t, (STORED_BLOCK << 1) + (i ? 1 : 0), 3), copy_block(t, e, r, !0)
  }

  function _tr_align(t) {
    send_bits(t, STATIC_TREES << 1, 3), send_code(t, END_BLOCK, static_ltree), bi_flush(t)
  }

  function _tr_flush_block(t, e, r, i) {
    var a, s, n = 0;
    t.level > 0 ? (t.strm.data_type === Z_UNKNOWN$1 && (t.strm.data_type = detect_data_type(t)), build_tree(t, t.l_desc), build_tree(t, t.d_desc), n = build_bl_tree(t), a = t.opt_len + 3 + 7 >>> 3, (s = t.static_len + 3 + 7 >>> 3) <= a && (a = s)) : a = s = r + 5, r + 4 <= a && -1 !== e ? _tr_stored_block(t, e, r, i) : t.strategy === Z_FIXED$1 || s === a ? (send_bits(t, (STATIC_TREES << 1) + (i ? 1 : 0), 3), compress_block(t, static_ltree, static_dtree)) : (send_bits(t, (DYN_TREES << 1) + (i ? 1 : 0), 3), send_all_trees(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, n + 1), compress_block(t, t.dyn_ltree, t.dyn_dtree)), init_block(t), i && bi_windup(t)
  }

  function _tr_tally(t, e, r) {
    return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & r, t.last_lit++, 0 === e ? t.dyn_ltree[2 * r]++ : (t.matches++, e--, t.dyn_ltree[2 * (_length_code[r] + LITERALS$1 + 1)]++, t.dyn_dtree[2 * d_code(e)]++), t.last_lit === t.lit_bufsize - 1
  }
  var _tr_init_1 = _tr_init,
    _tr_stored_block_1 = _tr_stored_block,
    _tr_flush_block_1 = _tr_flush_block,
    _tr_tally_1 = _tr_tally,
    _tr_align_1 = _tr_align,
    trees = {
      _tr_init: _tr_init_1,
      _tr_stored_block: _tr_stored_block_1,
      _tr_flush_block: _tr_flush_block_1,
      _tr_tally: _tr_tally_1,
      _tr_align: _tr_align_1
    };

  function adler32(t, e, r, i) {
    for (var a = 65535 & t | 0, s = t >>> 16 & 65535 | 0, n = 0; 0 !== r;) {
      r -= n = r > 2e3 ? 2e3 : r;
      do {
        s = s + (a = a + e[i++] | 0) | 0
      } while (--n);
      a %= 65521, s %= 65521
    }
    return a | s << 16 | 0
  }
  var adler32_1 = adler32;

  function makeTable() {
    for (var t, e = [], r = 0; r < 256; r++) {
      t = r;
      for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
      e[r] = t
    }
    return e
  }
  var crcTable = makeTable();

  function crc32(t, e, r, i) {
    var a = crcTable,
      s = i + r;
    t ^= -1;
    for (var n = i; n < s; n++) t = t >>> 8 ^ a[255 & (t ^ e[n])];
    return -1 ^ t
  }
  var crc32_1 = crc32,
    messages = {
      2: "need dictionary",
      1: "stream end",
      0: "",
      "-1": "file error",
      "-2": "stream error",
      "-3": "data error",
      "-4": "insufficient memory",
      "-5": "buffer error",
      "-6": "incompatible version"
    },
    Z_NO_FLUSH$1 = 0,
    Z_PARTIAL_FLUSH = 1,
    Z_FULL_FLUSH = 3,
    Z_FINISH$2 = 4,
    Z_BLOCK$1 = 5,
    Z_OK$2 = 0,
    Z_STREAM_END$2 = 1,
    Z_STREAM_ERROR$1 = -2,
    Z_DATA_ERROR$1 = -3,
    Z_BUF_ERROR$1 = -5,
    Z_DEFAULT_COMPRESSION$1 = -1,
    Z_FILTERED = 1,
    Z_HUFFMAN_ONLY = 2,
    Z_RLE = 3,
    Z_FIXED = 4,
    Z_DEFAULT_STRATEGY$1 = 0,
    Z_UNKNOWN = 2,
    Z_DEFLATED$2 = 8,
    MAX_MEM_LEVEL = 9,
    MAX_WBITS$1 = 15,
    DEF_MEM_LEVEL = 8,
    LENGTH_CODES = 29,
    LITERALS = 256,
    L_CODES = LITERALS + 1 + LENGTH_CODES,
    D_CODES = 30,
    BL_CODES = 19,
    HEAP_SIZE = 2 * L_CODES + 1,
    MAX_BITS = 15,
    MIN_MATCH = 3,
    MAX_MATCH = 258,
    MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1,
    PRESET_DICT = 32,
    INIT_STATE = 42,
    EXTRA_STATE = 69,
    NAME_STATE = 73,
    COMMENT_STATE = 91,
    HCRC_STATE = 103,
    BUSY_STATE = 113,
    FINISH_STATE = 666,
    BS_NEED_MORE = 1,
    BS_BLOCK_DONE = 2,
    BS_FINISH_STARTED = 3,
    BS_FINISH_DONE = 4,
    OS_CODE = 3,
    configuration_table;

  function err(t, e) {
    return t.msg = messages[e], e
  }

  function rank(t) {
    return (t << 1) - (t > 4 ? 9 : 0)
  }

  function zero(t) {
    for (var e = t.length; --e >= 0;) t[e] = 0
  }

  function flush_pending(t) {
    var e = t.state,
      r = e.pending;
    r > t.avail_out && (r = t.avail_out), 0 !== r && (common.arraySet(t.output, e.pending_buf, e.pending_out, r, t.next_out), t.next_out += r, e.pending_out += r, t.total_out += r, t.avail_out -= r, e.pending -= r, 0 === e.pending && (e.pending_out = 0))
  }

  function flush_block_only(t, e) {
    trees._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, flush_pending(t.strm)
  }

  function put_byte(t, e) {
    t.pending_buf[t.pending++] = e
  }

  function putShortMSB(t, e) {
    t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
  }

  function read_buf(t, e, r, i) {
    var a = t.avail_in;
    return a > i && (a = i), 0 === a ? 0 : (t.avail_in -= a, common.arraySet(e, t.input, t.next_in, a, r), 1 === t.state.wrap ? t.adler = adler32_1(t.adler, e, a, r) : 2 === t.state.wrap && (t.adler = crc32_1(t.adler, e, a, r)), t.next_in += a, t.total_in += a, a)
  }

  function longest_match(t, e) {
    var r, i, a = t.max_chain_length,
      s = t.strstart,
      n = t.prev_length,
      o = t.nice_match,
      h = t.strstart > t.w_size - MIN_LOOKAHEAD ? t.strstart - (t.w_size - MIN_LOOKAHEAD) : 0,
      l = t.window,
      p = t.w_mask,
      d = t.prev,
      c = t.strstart + MAX_MATCH,
      f = l[s + n - 1],
      m = l[s + n];
    t.prev_length >= t.good_match && (a >>= 2), o > t.lookahead && (o = t.lookahead);
    do {
      if (l[(r = e) + n] === m && l[r + n - 1] === f && l[r] === l[s] && l[++r] === l[s + 1]) {
        s += 2, r++;
        do {} while (l[++s] === l[++r] && l[++s] === l[++r] && l[++s] === l[++r] && l[++s] === l[++r] && l[++s] === l[++r] && l[++s] === l[++r] && l[++s] === l[++r] && l[++s] === l[++r] && s < c);
        if (i = MAX_MATCH - (c - s), s = c - MAX_MATCH, i > n) {
          if (t.match_start = e, n = i, i >= o) break;
          f = l[s + n - 1], m = l[s + n]
        }
      }
    } while ((e = d[e & p]) > h && 0 != --a);
    return n <= t.lookahead ? n : t.lookahead
  }

  function fill_window(t) {
    var e, r, i, a, s, n = t.w_size;
    do {
      if (a = t.window_size - t.lookahead - t.strstart, t.strstart >= n + (n - MIN_LOOKAHEAD)) {
        common.arraySet(t.window, t.window, n, n, 0), t.match_start -= n, t.strstart -= n, t.block_start -= n, e = r = t.hash_size;
        do {
          i = t.head[--e], t.head[e] = i >= n ? i - n : 0
        } while (--r);
        e = r = n;
        do {
          i = t.prev[--e], t.prev[e] = i >= n ? i - n : 0
        } while (--r);
        a += n
      }
      if (0 === t.strm.avail_in) break;
      if (r = read_buf(t.strm, t.window, t.strstart + t.lookahead, a), t.lookahead += r, t.lookahead + t.insert >= MIN_MATCH)
        for (s = t.strstart - t.insert, t.ins_h = t.window[s], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[s + MIN_MATCH - 1]) & t.hash_mask, t.prev[s & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = s, s++, t.insert--, !(t.lookahead + t.insert < MIN_MATCH)););
    } while (t.lookahead < MIN_LOOKAHEAD && 0 !== t.strm.avail_in)
  }

  function deflate_stored(t, e) {
    var r = 65535;
    for (r > t.pending_buf_size - 5 && (r = t.pending_buf_size - 5);;) {
      if (t.lookahead <= 1) {
        if (fill_window(t), 0 === t.lookahead && e === Z_NO_FLUSH$1) return BS_NEED_MORE;
        if (0 === t.lookahead) break
      }
      t.strstart += t.lookahead, t.lookahead = 0;
      var i = t.block_start + r;
      if ((0 === t.strstart || t.strstart >= i) && (t.lookahead = t.strstart - i, t.strstart = i, flush_block_only(t, !1), 0 === t.strm.avail_out)) return BS_NEED_MORE;
      if (t.strstart - t.block_start >= t.w_size - MIN_LOOKAHEAD && (flush_block_only(t, !1), 0 === t.strm.avail_out)) return BS_NEED_MORE
    }
    return t.insert = 0, e === Z_FINISH$2 ? (flush_block_only(t, !0), 0 === t.strm.avail_out ? BS_FINISH_STARTED : BS_FINISH_DONE) : (t.strstart > t.block_start && (flush_block_only(t, !1), t.strm.avail_out), BS_NEED_MORE)
  }

  function deflate_fast(t, e) {
    for (var r, i;;) {
      if (t.lookahead < MIN_LOOKAHEAD) {
        if (fill_window(t), t.lookahead < MIN_LOOKAHEAD && e === Z_NO_FLUSH$1) return BS_NEED_MORE;
        if (0 === t.lookahead) break
      }
      if (r = 0, t.lookahead >= MIN_MATCH && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + MIN_MATCH - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== r && t.strstart - r <= t.w_size - MIN_LOOKAHEAD && (t.match_length = longest_match(t, r)), t.match_length >= MIN_MATCH)
        if (i = trees._tr_tally(t, t.strstart - t.match_start, t.match_length - MIN_MATCH), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= MIN_MATCH) {
          t.match_length--;
          do {
            t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + MIN_MATCH - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart
          } while (0 != --t.match_length);
          t.strstart++
        } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
      else i = trees._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
      if (i && (flush_block_only(t, !1), 0 === t.strm.avail_out)) return BS_NEED_MORE
    }
    return t.insert = t.strstart < MIN_MATCH - 1 ? t.strstart : MIN_MATCH - 1, e === Z_FINISH$2 ? (flush_block_only(t, !0), 0 === t.strm.avail_out ? BS_FINISH_STARTED : BS_FINISH_DONE) : t.last_lit && (flush_block_only(t, !1), 0 === t.strm.avail_out) ? BS_NEED_MORE : BS_BLOCK_DONE
  }

  function deflate_slow(t, e) {
    for (var r, i, a;;) {
      if (t.lookahead < MIN_LOOKAHEAD) {
        if (fill_window(t), t.lookahead < MIN_LOOKAHEAD && e === Z_NO_FLUSH$1) return BS_NEED_MORE;
        if (0 === t.lookahead) break
      }
      if (r = 0, t.lookahead >= MIN_MATCH && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + MIN_MATCH - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = MIN_MATCH - 1, 0 !== r && t.prev_length < t.max_lazy_match && t.strstart - r <= t.w_size - MIN_LOOKAHEAD && (t.match_length = longest_match(t, r), t.match_length <= 5 && (t.strategy === Z_FILTERED || t.match_length === MIN_MATCH && t.strstart - t.match_start > 4096) && (t.match_length = MIN_MATCH - 1)), t.prev_length >= MIN_MATCH && t.match_length <= t.prev_length) {
        a = t.strstart + t.lookahead - MIN_MATCH, i = trees._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - MIN_MATCH), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
        do {
          ++t.strstart <= a && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + MIN_MATCH - 1]) & t.hash_mask, r = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart)
        } while (0 != --t.prev_length);
        if (t.match_available = 0, t.match_length = MIN_MATCH - 1, t.strstart++, i && (flush_block_only(t, !1), 0 === t.strm.avail_out)) return BS_NEED_MORE
      } else if (t.match_available) {
        if ((i = trees._tr_tally(t, 0, t.window[t.strstart - 1])) && flush_block_only(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return BS_NEED_MORE
      } else t.match_available = 1, t.strstart++, t.lookahead--
    }
    return t.match_available && (i = trees._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < MIN_MATCH - 1 ? t.strstart : MIN_MATCH - 1, e === Z_FINISH$2 ? (flush_block_only(t, !0), 0 === t.strm.avail_out ? BS_FINISH_STARTED : BS_FINISH_DONE) : t.last_lit && (flush_block_only(t, !1), 0 === t.strm.avail_out) ? BS_NEED_MORE : BS_BLOCK_DONE
  }

  function deflate_rle(t, e) {
    for (var r, i, a, s, n = t.window;;) {
      if (t.lookahead <= MAX_MATCH) {
        if (fill_window(t), t.lookahead <= MAX_MATCH && e === Z_NO_FLUSH$1) return BS_NEED_MORE;
        if (0 === t.lookahead) break
      }
      if (t.match_length = 0, t.lookahead >= MIN_MATCH && t.strstart > 0 && (i = n[a = t.strstart - 1]) === n[++a] && i === n[++a] && i === n[++a]) {
        s = t.strstart + MAX_MATCH;
        do {} while (i === n[++a] && i === n[++a] && i === n[++a] && i === n[++a] && i === n[++a] && i === n[++a] && i === n[++a] && i === n[++a] && a < s);
        t.match_length = MAX_MATCH - (s - a), t.match_length > t.lookahead && (t.match_length = t.lookahead)
      }
      if (t.match_length >= MIN_MATCH ? (r = trees._tr_tally(t, 1, t.match_length - MIN_MATCH), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (r = trees._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), r && (flush_block_only(t, !1), 0 === t.strm.avail_out)) return BS_NEED_MORE
    }
    return t.insert = 0, e === Z_FINISH$2 ? (flush_block_only(t, !0), 0 === t.strm.avail_out ? BS_FINISH_STARTED : BS_FINISH_DONE) : t.last_lit && (flush_block_only(t, !1), 0 === t.strm.avail_out) ? BS_NEED_MORE : BS_BLOCK_DONE
  }

  function deflate_huff(t, e) {
    for (var r;;) {
      if (0 === t.lookahead && (fill_window(t), 0 === t.lookahead)) {
        if (e === Z_NO_FLUSH$1) return BS_NEED_MORE;
        break
      }
      if (t.match_length = 0, r = trees._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, r && (flush_block_only(t, !1), 0 === t.strm.avail_out)) return BS_NEED_MORE
    }
    return t.insert = 0, e === Z_FINISH$2 ? (flush_block_only(t, !0), 0 === t.strm.avail_out ? BS_FINISH_STARTED : BS_FINISH_DONE) : t.last_lit && (flush_block_only(t, !1), 0 === t.strm.avail_out) ? BS_NEED_MORE : BS_BLOCK_DONE
  }

  function Config(t, e, r, i, a) {
    this.good_length = t, this.max_lazy = e, this.nice_length = r, this.max_chain = i, this.func = a
  }

  function lm_init(t) {
    t.window_size = 2 * t.w_size, zero(t.head), t.max_lazy_match = configuration_table[t.level].max_lazy, t.good_match = configuration_table[t.level].good_length, t.nice_match = configuration_table[t.level].nice_length, t.max_chain_length = configuration_table[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = MIN_MATCH - 1, t.match_available = 0, t.ins_h = 0
  }

  function DeflateState() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Z_DEFLATED$2, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new common.Buf16(2 * HEAP_SIZE), this.dyn_dtree = new common.Buf16(2 * (2 * D_CODES + 1)), this.bl_tree = new common.Buf16(2 * (2 * BL_CODES + 1)), zero(this.dyn_ltree), zero(this.dyn_dtree), zero(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new common.Buf16(MAX_BITS + 1), this.heap = new common.Buf16(2 * L_CODES + 1), zero(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new common.Buf16(2 * L_CODES + 1), zero(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
  }

  function deflateResetKeep(t) {
    var e;
    return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = Z_UNKNOWN, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? INIT_STATE : BUSY_STATE, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = Z_NO_FLUSH$1, trees._tr_init(e), Z_OK$2) : err(t, Z_STREAM_ERROR$1)
  }

  function deflateReset(t) {
    var e = deflateResetKeep(t);
    return e === Z_OK$2 && lm_init(t.state), e
  }

  function deflateSetHeader(t, e) {
    return t && t.state ? 2 !== t.state.wrap ? Z_STREAM_ERROR$1 : (t.state.gzhead = e, Z_OK$2) : Z_STREAM_ERROR$1
  }

  function deflateInit2(t, e, r, i, a, s) {
    if (!t) return Z_STREAM_ERROR$1;
    var n = 1;
    if (e === Z_DEFAULT_COMPRESSION$1 && (e = 6), i < 0 ? (n = 0, i = -i) : i > 15 && (n = 2, i -= 16), a < 1 || a > MAX_MEM_LEVEL || r !== Z_DEFLATED$2 || i < 8 || i > 15 || e < 0 || e > 9 || s < 0 || s > Z_FIXED) return err(t, Z_STREAM_ERROR$1);
    8 === i && (i = 9);
    var o = new DeflateState;
    return t.state = o, o.strm = t, o.wrap = n, o.gzhead = null, o.w_bits = i, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = a + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + MIN_MATCH - 1) / MIN_MATCH), o.window = new common.Buf8(2 * o.w_size), o.head = new common.Buf16(o.hash_size), o.prev = new common.Buf16(o.w_size), o.lit_bufsize = 1 << a + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new common.Buf8(o.pending_buf_size), o.d_buf = 1 * o.lit_bufsize, o.l_buf = 3 * o.lit_bufsize, o.level = e, o.strategy = s, o.method = r, deflateReset(t)
  }

  function deflateInit(t, e) {
    return deflateInit2(t, e, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1)
  }

  function deflate$1(t, e) {
    var r, i, a, s;
    if (!t || !t.state || e > Z_BLOCK$1 || e < 0) return t ? err(t, Z_STREAM_ERROR$1) : Z_STREAM_ERROR$1;
    if (i = t.state, !t.output || !t.input && 0 !== t.avail_in || i.status === FINISH_STATE && e !== Z_FINISH$2) return err(t, 0 === t.avail_out ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$1);
    if (i.strm = t, r = i.last_flush, i.last_flush = e, i.status === INIT_STATE)
      if (2 === i.wrap) t.adler = 0, put_byte(i, 31), put_byte(i, 139), put_byte(i, 8), i.gzhead ? (put_byte(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), put_byte(i, 255 & i.gzhead.time), put_byte(i, i.gzhead.time >> 8 & 255), put_byte(i, i.gzhead.time >> 16 & 255), put_byte(i, i.gzhead.time >> 24 & 255), put_byte(i, 9 === i.level ? 2 : i.strategy >= Z_HUFFMAN_ONLY || i.level < 2 ? 4 : 0), put_byte(i, 255 & i.gzhead.os), i.gzhead.extra && i.gzhead.extra.length && (put_byte(i, 255 & i.gzhead.extra.length), put_byte(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = EXTRA_STATE) : (put_byte(i, 0), put_byte(i, 0), put_byte(i, 0), put_byte(i, 0), put_byte(i, 0), put_byte(i, 9 === i.level ? 2 : i.strategy >= Z_HUFFMAN_ONLY || i.level < 2 ? 4 : 0), put_byte(i, OS_CODE), i.status = BUSY_STATE);
      else {
        var n = Z_DEFLATED$2 + (i.w_bits - 8 << 4) << 8;
        n |= (i.strategy >= Z_HUFFMAN_ONLY || i.level < 2 ? 0 : i.level < 6 ? 1 : 6 === i.level ? 2 : 3) << 6, 0 !== i.strstart && (n |= PRESET_DICT), n += 31 - n % 31, i.status = BUSY_STATE, putShortMSB(i, n), 0 !== i.strstart && (putShortMSB(i, t.adler >>> 16), putShortMSB(i, 65535 & t.adler)), t.adler = 1
      } if (i.status === EXTRA_STATE)
      if (i.gzhead.extra) {
        for (a = i.pending; i.gzindex < (65535 & i.gzhead.extra.length) && (i.pending !== i.pending_buf_size || (i.gzhead.hcrc && i.pending > a && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending - a, a)), flush_pending(t), a = i.pending, i.pending !== i.pending_buf_size));) put_byte(i, 255 & i.gzhead.extra[i.gzindex]), i.gzindex++;
        i.gzhead.hcrc && i.pending > a && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending - a, a)), i.gzindex === i.gzhead.extra.length && (i.gzindex = 0, i.status = NAME_STATE)
      } else i.status = NAME_STATE;
    if (i.status === NAME_STATE)
      if (i.gzhead.name) {
        a = i.pending;
        do {
          if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > a && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending - a, a)), flush_pending(t), a = i.pending, i.pending === i.pending_buf_size)) {
            s = 1;
            break
          }
          s = i.gzindex < i.gzhead.name.length ? 255 & i.gzhead.name.charCodeAt(i.gzindex++) : 0, put_byte(i, s)
        } while (0 !== s);
        i.gzhead.hcrc && i.pending > a && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending - a, a)), 0 === s && (i.gzindex = 0, i.status = COMMENT_STATE)
      } else i.status = COMMENT_STATE;
    if (i.status === COMMENT_STATE)
      if (i.gzhead.comment) {
        a = i.pending;
        do {
          if (i.pending === i.pending_buf_size && (i.gzhead.hcrc && i.pending > a && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending - a, a)), flush_pending(t), a = i.pending, i.pending === i.pending_buf_size)) {
            s = 1;
            break
          }
          s = i.gzindex < i.gzhead.comment.length ? 255 & i.gzhead.comment.charCodeAt(i.gzindex++) : 0, put_byte(i, s)
        } while (0 !== s);
        i.gzhead.hcrc && i.pending > a && (t.adler = crc32_1(t.adler, i.pending_buf, i.pending - a, a)), 0 === s && (i.status = HCRC_STATE)
      } else i.status = HCRC_STATE;
    if (i.status === HCRC_STATE && (i.gzhead.hcrc ? (i.pending + 2 > i.pending_buf_size && flush_pending(t), i.pending + 2 <= i.pending_buf_size && (put_byte(i, 255 & t.adler), put_byte(i, t.adler >> 8 & 255), t.adler = 0, i.status = BUSY_STATE)) : i.status = BUSY_STATE), 0 !== i.pending) {
      if (flush_pending(t), 0 === t.avail_out) return i.last_flush = -1, Z_OK$2
    } else if (0 === t.avail_in && rank(e) <= rank(r) && e !== Z_FINISH$2) return err(t, Z_BUF_ERROR$1);
    if (i.status === FINISH_STATE && 0 !== t.avail_in) return err(t, Z_BUF_ERROR$1);
    if (0 !== t.avail_in || 0 !== i.lookahead || e !== Z_NO_FLUSH$1 && i.status !== FINISH_STATE) {
      var o = i.strategy === Z_HUFFMAN_ONLY ? deflate_huff(i, e) : i.strategy === Z_RLE ? deflate_rle(i, e) : configuration_table[i.level].func(i, e);
      if (o !== BS_FINISH_STARTED && o !== BS_FINISH_DONE || (i.status = FINISH_STATE), o === BS_NEED_MORE || o === BS_FINISH_STARTED) return 0 === t.avail_out && (i.last_flush = -1), Z_OK$2;
      if (o === BS_BLOCK_DONE && (e === Z_PARTIAL_FLUSH ? trees._tr_align(i) : e !== Z_BLOCK$1 && (trees._tr_stored_block(i, 0, 0, !1), e === Z_FULL_FLUSH && (zero(i.head), 0 === i.lookahead && (i.strstart = 0, i.block_start = 0, i.insert = 0))), flush_pending(t), 0 === t.avail_out)) return i.last_flush = -1, Z_OK$2
    }
    return e !== Z_FINISH$2 ? Z_OK$2 : i.wrap <= 0 ? Z_STREAM_END$2 : (2 === i.wrap ? (put_byte(i, 255 & t.adler), put_byte(i, t.adler >> 8 & 255), put_byte(i, t.adler >> 16 & 255), put_byte(i, t.adler >> 24 & 255), put_byte(i, 255 & t.total_in), put_byte(i, t.total_in >> 8 & 255), put_byte(i, t.total_in >> 16 & 255), put_byte(i, t.total_in >> 24 & 255)) : (putShortMSB(i, t.adler >>> 16), putShortMSB(i, 65535 & t.adler)), flush_pending(t), i.wrap > 0 && (i.wrap = -i.wrap), 0 !== i.pending ? Z_OK$2 : Z_STREAM_END$2)
  }

  function deflateEnd(t) {
    var e;
    return t && t.state ? (e = t.state.status) !== INIT_STATE && e !== EXTRA_STATE && e !== NAME_STATE && e !== COMMENT_STATE && e !== HCRC_STATE && e !== BUSY_STATE && e !== FINISH_STATE ? err(t, Z_STREAM_ERROR$1) : (t.state = null, e === BUSY_STATE ? err(t, Z_DATA_ERROR$1) : Z_OK$2) : Z_STREAM_ERROR$1
  }

  function deflateSetDictionary(t, e) {
    var r, i, a, s, n, o, h, l, p = e.length;
    if (!t || !t.state) return Z_STREAM_ERROR$1;
    if (2 === (s = (r = t.state).wrap) || 1 === s && r.status !== INIT_STATE || r.lookahead) return Z_STREAM_ERROR$1;
    for (1 === s && (t.adler = adler32_1(t.adler, e, p, 0)), r.wrap = 0, p >= r.w_size && (0 === s && (zero(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0), l = new common.Buf8(r.w_size), common.arraySet(l, e, p - r.w_size, r.w_size, 0), e = l, p = r.w_size), n = t.avail_in, o = t.next_in, h = t.input, t.avail_in = p, t.next_in = 0, t.input = e, fill_window(r); r.lookahead >= MIN_MATCH;) {
      i = r.strstart, a = r.lookahead - (MIN_MATCH - 1);
      do {
        r.ins_h = (r.ins_h << r.hash_shift ^ r.window[i + MIN_MATCH - 1]) & r.hash_mask, r.prev[i & r.w_mask] = r.head[r.ins_h], r.head[r.ins_h] = i, i++
      } while (--a);
      r.strstart = i, r.lookahead = MIN_MATCH - 1, fill_window(r)
    }
    return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = MIN_MATCH - 1, r.match_available = 0, t.next_in = o, t.input = h, t.avail_in = n, r.wrap = s, Z_OK$2
  }
  configuration_table = [new Config(0, 0, 0, 0, deflate_stored), new Config(4, 4, 8, 4, deflate_fast), new Config(4, 5, 16, 8, deflate_fast), new Config(4, 6, 32, 32, deflate_fast), new Config(4, 4, 16, 16, deflate_slow), new Config(8, 16, 32, 32, deflate_slow), new Config(8, 16, 128, 128, deflate_slow), new Config(8, 32, 128, 256, deflate_slow), new Config(32, 128, 258, 1024, deflate_slow), new Config(32, 258, 258, 4096, deflate_slow)];
  var deflateInit_1 = deflateInit,
    deflateInit2_1 = deflateInit2,
    deflateReset_1 = deflateReset,
    deflateResetKeep_1 = deflateResetKeep,
    deflateSetHeader_1 = deflateSetHeader,
    deflate_2$1 = deflate$1,
    deflateEnd_1 = deflateEnd,
    deflateSetDictionary_1 = deflateSetDictionary,
    deflateInfo = "pako deflate (from Nodeca project)",
    deflate_1$1 = {
      deflateInit: deflateInit_1,
      deflateInit2: deflateInit2_1,
      deflateReset: deflateReset_1,
      deflateResetKeep: deflateResetKeep_1,
      deflateSetHeader: deflateSetHeader_1,
      deflate: deflate_2$1,
      deflateEnd: deflateEnd_1,
      deflateSetDictionary: deflateSetDictionary_1,
      deflateInfo: deflateInfo
    },
    STR_APPLY_OK = !0,
    STR_APPLY_UIA_OK = !0;
  try {
    String.fromCharCode.apply(null, [0])
  } catch (t) {
    STR_APPLY_OK = !1
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1))
  } catch (t) {
    STR_APPLY_UIA_OK = !1
  }
  for (var _utf8len = new common.Buf8(256), q = 0; q < 256; q++) _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
  _utf8len[254] = _utf8len[254] = 1;
  var string2buf = function (t) {
    var e, r, i, a, s, n = t.length,
      o = 0;
    for (a = 0; a < n; a++) 55296 == (64512 & (r = t.charCodeAt(a))) && a + 1 < n && 56320 == (64512 & (i = t.charCodeAt(a + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), a++), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
    for (e = new common.Buf8(o), s = 0, a = 0; s < o; a++) 55296 == (64512 & (r = t.charCodeAt(a))) && a + 1 < n && 56320 == (64512 & (i = t.charCodeAt(a + 1))) && (r = 65536 + (r - 55296 << 10) + (i - 56320), a++), r < 128 ? e[s++] = r : r < 2048 ? (e[s++] = 192 | r >>> 6, e[s++] = 128 | 63 & r) : r < 65536 ? (e[s++] = 224 | r >>> 12, e[s++] = 128 | r >>> 6 & 63, e[s++] = 128 | 63 & r) : (e[s++] = 240 | r >>> 18, e[s++] = 128 | r >>> 12 & 63, e[s++] = 128 | r >>> 6 & 63, e[s++] = 128 | 63 & r);
    return e
  };

  function buf2binstring(t, e) {
    if (e < 65534 && (t.subarray && STR_APPLY_UIA_OK || !t.subarray && STR_APPLY_OK)) return String.fromCharCode.apply(null, common.shrinkBuf(t, e));
    for (var r = "", i = 0; i < e; i++) r += String.fromCharCode(t[i]);
    return r
  }
  var buf2binstring_1 = function (t) {
      return buf2binstring(t, t.length)
    },
    binstring2buf = function (t) {
      for (var e = new common.Buf8(t.length), r = 0, i = e.length; r < i; r++) e[r] = t.charCodeAt(r);
      return e
    },
    buf2string = function (t, e) {
      var r, i, a, s, n = e || t.length,
        o = new Array(2 * n);
      for (i = 0, r = 0; r < n;)
        if ((a = t[r++]) < 128) o[i++] = a;
        else if ((s = _utf8len[a]) > 4) o[i++] = 65533, r += s - 1;
      else {
        for (a &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && r < n;) a = a << 6 | 63 & t[r++], s--;
        s > 1 ? o[i++] = 65533 : a < 65536 ? o[i++] = a : (a -= 65536, o[i++] = 55296 | a >> 10 & 1023, o[i++] = 56320 | 1023 & a)
      }
      return buf2binstring(o, i)
    },
    utf8border = function (t, e) {
      var r;
      for ((e = e || t.length) > t.length && (e = t.length), r = e - 1; r >= 0 && 128 == (192 & t[r]);) r--;
      return r < 0 || 0 === r ? e : r + _utf8len[t[r]] > e ? r : e
    },
    strings = {
      string2buf: string2buf,
      buf2binstring: buf2binstring_1,
      binstring2buf: binstring2buf,
      buf2string: buf2string,
      utf8border: utf8border
    };

  function ZStream() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
  }
  var zstream = ZStream,
    toString$1 = Object.prototype.toString,
    Z_NO_FLUSH = 0,
    Z_FINISH$1 = 4,
    Z_OK$1 = 0,
    Z_STREAM_END$1 = 1,
    Z_SYNC_FLUSH = 2,
    Z_DEFAULT_COMPRESSION = -1,
    Z_DEFAULT_STRATEGY = 0,
    Z_DEFLATED$1 = 8;

  function Deflate(t) {
    if (!(this instanceof Deflate)) return new Deflate(t);
    this.options = common.assign({
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
      to: ""
    }, t || {});
    var e = this.options;
    e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new zstream, this.strm.avail_out = 0;
    var r = deflate_1$1.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
    if (r !== Z_OK$1) throw new Error(messages[r]);
    if (e.header && deflate_1$1.deflateSetHeader(this.strm, e.header), e.dictionary) {
      var i;
      if (i = "string" == typeof e.dictionary ? strings.string2buf(e.dictionary) : "[object ArrayBuffer]" === toString$1.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, (r = deflate_1$1.deflateSetDictionary(this.strm, i)) !== Z_OK$1) throw new Error(messages[r]);
      this._dict_set = !0
    }
  }

  function deflate(t, e) {
    var r = new Deflate(e);
    if (r.push(t, !0), r.err) throw r.msg || messages[r.err];
    return r.result
  }

  function deflateRaw(t, e) {
    return (e = e || {}).raw = !0, deflate(t, e)
  }

  function gzip(t, e) {
    return (e = e || {}).gzip = !0, deflate(t, e)
  }
  Deflate.prototype.push = function (t, e) {
    var r, i, a = this.strm,
      s = this.options.chunkSize;
    if (this.ended) return !1;
    i = e === ~~e ? e : !0 === e ? Z_FINISH$1 : Z_NO_FLUSH, "string" == typeof t ? a.input = strings.string2buf(t) : "[object ArrayBuffer]" === toString$1.call(t) ? a.input = new Uint8Array(t) : a.input = t, a.next_in = 0, a.avail_in = a.input.length;
    do {
      if (0 === a.avail_out && (a.output = new common.Buf8(s), a.next_out = 0, a.avail_out = s), (r = deflate_1$1.deflate(a, i)) !== Z_STREAM_END$1 && r !== Z_OK$1) return this.onEnd(r), this.ended = !0, !1;
      0 !== a.avail_out && (0 !== a.avail_in || i !== Z_FINISH$1 && i !== Z_SYNC_FLUSH) || ("string" === this.options.to ? this.onData(strings.buf2binstring(common.shrinkBuf(a.output, a.next_out))) : this.onData(common.shrinkBuf(a.output, a.next_out)))
    } while ((a.avail_in > 0 || 0 === a.avail_out) && r !== Z_STREAM_END$1);
    return i === Z_FINISH$1 ? (r = deflate_1$1.deflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === Z_OK$1) : i !== Z_SYNC_FLUSH || (this.onEnd(Z_OK$1), a.avail_out = 0, !0)
  }, Deflate.prototype.onData = function (t) {
    this.chunks.push(t)
  }, Deflate.prototype.onEnd = function (t) {
    t === Z_OK$1 && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = common.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
  };
  var Deflate_1 = Deflate,
    deflate_2 = deflate,
    deflateRaw_1 = deflateRaw,
    gzip_1 = gzip,
    deflate_1 = {
      Deflate: Deflate_1,
      deflate: deflate_2,
      deflateRaw: deflateRaw_1,
      gzip: gzip_1
    },
    BAD$1 = 30,
    TYPE$1 = 12,
    inffast = function (t, e) {
      var r, i, a, s, n, o, h, l, p, d, c, f, m, u, y, g, _, v, b, E, S, P, x, T, A;
      r = t.state, i = t.next_in, T = t.input, a = i + (t.avail_in - 5), s = t.next_out, A = t.output, n = s - (e - t.avail_out), o = s + (t.avail_out - 257), h = r.dmax, l = r.wsize, p = r.whave, d = r.wnext, c = r.window, f = r.hold, m = r.bits, u = r.lencode, y = r.distcode, g = (1 << r.lenbits) - 1, _ = (1 << r.distbits) - 1;
      t: do {
        m < 15 && (f += T[i++] << m, m += 8, f += T[i++] << m, m += 8), v = u[f & g];
        e: for (;;) {
          if (f >>>= b = v >>> 24, m -= b, 0 === (b = v >>> 16 & 255)) A[s++] = 65535 & v;
          else {
            if (!(16 & b)) {
              if (0 == (64 & b)) {
                v = u[(65535 & v) + (f & (1 << b) - 1)];
                continue e
              }
              if (32 & b) {
                r.mode = TYPE$1;
                break t
              }
              t.msg = "invalid literal/length code", r.mode = BAD$1;
              break t
            }
            E = 65535 & v, (b &= 15) && (m < b && (f += T[i++] << m, m += 8), E += f & (1 << b) - 1, f >>>= b, m -= b), m < 15 && (f += T[i++] << m, m += 8, f += T[i++] << m, m += 8), v = y[f & _];
            r: for (;;) {
              if (f >>>= b = v >>> 24, m -= b, !(16 & (b = v >>> 16 & 255))) {
                if (0 == (64 & b)) {
                  v = y[(65535 & v) + (f & (1 << b) - 1)];
                  continue r
                }
                t.msg = "invalid distance code", r.mode = BAD$1;
                break t
              }
              if (S = 65535 & v, m < (b &= 15) && (f += T[i++] << m, (m += 8) < b && (f += T[i++] << m, m += 8)), (S += f & (1 << b) - 1) > h) {
                t.msg = "invalid distance too far back", r.mode = BAD$1;
                break t
              }
              if (f >>>= b, m -= b, S > (b = s - n)) {
                if ((b = S - b) > p && r.sane) {
                  t.msg = "invalid distance too far back", r.mode = BAD$1;
                  break t
                }
                if (P = 0, x = c, 0 === d) {
                  if (P += l - b, b < E) {
                    E -= b;
                    do {
                      A[s++] = c[P++]
                    } while (--b);
                    P = s - S, x = A
                  }
                } else if (d < b) {
                  if (P += l + d - b, (b -= d) < E) {
                    E -= b;
                    do {
                      A[s++] = c[P++]
                    } while (--b);
                    if (P = 0, d < E) {
                      E -= b = d;
                      do {
                        A[s++] = c[P++]
                      } while (--b);
                      P = s - S, x = A
                    }
                  }
                } else if (P += d - b, b < E) {
                  E -= b;
                  do {
                    A[s++] = c[P++]
                  } while (--b);
                  P = s - S, x = A
                }
                for (; E > 2;) A[s++] = x[P++], A[s++] = x[P++], A[s++] = x[P++], E -= 3;
                E && (A[s++] = x[P++], E > 1 && (A[s++] = x[P++]))
              } else {
                P = s - S;
                do {
                  A[s++] = A[P++], A[s++] = A[P++], A[s++] = A[P++], E -= 3
                } while (E > 2);
                E && (A[s++] = A[P++], E > 1 && (A[s++] = A[P++]))
              }
              break
            }
          }
          break
        }
      } while (i < a && s < o);
      i -= E = m >> 3, f &= (1 << (m -= E << 3)) - 1, t.next_in = i, t.next_out = s, t.avail_in = i < a ? a - i + 5 : 5 - (i - a), t.avail_out = s < o ? o - s + 257 : 257 - (s - o), r.hold = f, r.bits = m
    },
    MAXBITS = 15,
    ENOUGH_LENS$1 = 852,
    ENOUGH_DISTS$1 = 592,
    CODES$1 = 0,
    LENS$1 = 1,
    DISTS$1 = 2,
    lbase = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
    lext = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
    dbase = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
    dext = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64],
    inftrees = function (t, e, r, i, a, s, n, o) {
      var h, l, p, d, c, f, m, u, y, g = o.bits,
        _ = 0,
        v = 0,
        b = 0,
        E = 0,
        S = 0,
        P = 0,
        x = 0,
        T = 0,
        A = 0,
        C = 0,
        w = null,
        k = 0,
        D = new common.Buf16(MAXBITS + 1),
        M = new common.Buf16(MAXBITS + 1),
        I = null,
        F = 0;
      for (_ = 0; _ <= MAXBITS; _++) D[_] = 0;
      for (v = 0; v < i; v++) D[e[r + v]]++;
      for (S = g, E = MAXBITS; E >= 1 && 0 === D[E]; E--);
      if (S > E && (S = E), 0 === E) return a[s++] = 20971520, a[s++] = 20971520, o.bits = 1, 0;
      for (b = 1; b < E && 0 === D[b]; b++);
      for (S < b && (S = b), T = 1, _ = 1; _ <= MAXBITS; _++)
        if (T <<= 1, (T -= D[_]) < 0) return -1;
      if (T > 0 && (t === CODES$1 || 1 !== E)) return -1;
      for (M[1] = 0, _ = 1; _ < MAXBITS; _++) M[_ + 1] = M[_] + D[_];
      for (v = 0; v < i; v++) 0 !== e[r + v] && (n[M[e[r + v]]++] = v);
      if (t === CODES$1 ? (w = I = n, f = 19) : t === LENS$1 ? (w = lbase, k -= 257, I = lext, F -= 257, f = 256) : (w = dbase, I = dext, f = -1), C = 0, v = 0, _ = b, c = s, P = S, x = 0, p = -1, d = (A = 1 << S) - 1, t === LENS$1 && A > ENOUGH_LENS$1 || t === DISTS$1 && A > ENOUGH_DISTS$1) return 1;
      for (;;) {
        m = _ - x, n[v] < f ? (u = 0, y = n[v]) : n[v] > f ? (u = I[F + n[v]], y = w[k + n[v]]) : (u = 96, y = 0), h = 1 << _ - x, b = l = 1 << P;
        do {
          a[c + (C >> x) + (l -= h)] = m << 24 | u << 16 | y | 0
        } while (0 !== l);
        for (h = 1 << _ - 1; C & h;) h >>= 1;
        if (0 !== h ? (C &= h - 1, C += h) : C = 0, v++, 0 == --D[_]) {
          if (_ === E) break;
          _ = e[r + n[v]]
        }
        if (_ > S && (C & d) !== p) {
          for (0 === x && (x = S), c += b, T = 1 << (P = _ - x); P + x < E && !((T -= D[P + x]) <= 0);) P++, T <<= 1;
          if (A += 1 << P, t === LENS$1 && A > ENOUGH_LENS$1 || t === DISTS$1 && A > ENOUGH_DISTS$1) return 1;
          a[p = C & d] = S << 24 | P << 16 | c - s | 0
        }
      }
      return 0 !== C && (a[c + C] = _ - x << 24 | 64 << 16 | 0), o.bits = S, 0
    },
    CODES = 0,
    LENS = 1,
    DISTS = 2,
    Z_FINISH = 4,
    Z_BLOCK = 5,
    Z_TREES = 6,
    Z_OK = 0,
    Z_STREAM_END = 1,
    Z_NEED_DICT = 2,
    Z_STREAM_ERROR = -2,
    Z_DATA_ERROR = -3,
    Z_MEM_ERROR = -4,
    Z_BUF_ERROR = -5,
    Z_DEFLATED = 8,
    HEAD = 1,
    FLAGS = 2,
    TIME = 3,
    OS = 4,
    EXLEN = 5,
    EXTRA = 6,
    NAME = 7,
    COMMENT = 8,
    HCRC = 9,
    DICTID = 10,
    DICT = 11,
    TYPE = 12,
    TYPEDO = 13,
    STORED = 14,
    COPY_ = 15,
    COPY = 16,
    TABLE = 17,
    LENLENS = 18,
    CODELENS = 19,
    LEN_ = 20,
    LEN = 21,
    LENEXT = 22,
    DIST = 23,
    DISTEXT = 24,
    MATCH = 25,
    LIT = 26,
    CHECK = 27,
    LENGTH = 28,
    DONE = 29,
    BAD = 30,
    MEM = 31,
    SYNC = 32,
    ENOUGH_LENS = 852,
    ENOUGH_DISTS = 592,
    MAX_WBITS = 15,
    DEF_WBITS = MAX_WBITS;

  function zswap32(t) {
    return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
  }

  function InflateState() {
    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new common.Buf16(320), this.work = new common.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
  }

  function inflateResetKeep(t) {
    var e;
    return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = HEAD, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new common.Buf32(ENOUGH_LENS), e.distcode = e.distdyn = new common.Buf32(ENOUGH_DISTS), e.sane = 1, e.back = -1, Z_OK) : Z_STREAM_ERROR
  }

  function inflateReset(t) {
    var e;
    return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, inflateResetKeep(t)) : Z_STREAM_ERROR
  }

  function inflateReset2(t, e) {
    var r, i;
    return t && t.state ? (i = t.state, e < 0 ? (r = 0, e = -e) : (r = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Z_STREAM_ERROR : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = r, i.wbits = e, inflateReset(t))) : Z_STREAM_ERROR
  }

  function inflateInit2(t, e) {
    var r, i;
    return t ? (i = new InflateState, t.state = i, i.window = null, (r = inflateReset2(t, e)) !== Z_OK && (t.state = null), r) : Z_STREAM_ERROR
  }

  function inflateInit(t) {
    return inflateInit2(t, DEF_WBITS)
  }
  var virgin = !0,
    lenfix, distfix;

  function fixedtables(t) {
    if (virgin) {
      var e;
      for (lenfix = new common.Buf32(512), distfix = new common.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;
      for (; e < 256;) t.lens[e++] = 9;
      for (; e < 280;) t.lens[e++] = 7;
      for (; e < 288;) t.lens[e++] = 8;
      for (inftrees(LENS, t.lens, 0, 288, lenfix, 0, t.work, {
          bits: 9
        }), e = 0; e < 32;) t.lens[e++] = 5;
      inftrees(DISTS, t.lens, 0, 32, distfix, 0, t.work, {
        bits: 5
      }), virgin = !1
    }
    t.lencode = lenfix, t.lenbits = 9, t.distcode = distfix, t.distbits = 5
  }

  function updatewindow(t, e, r, i) {
    var a, s = t.state;
    return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new common.Buf8(s.wsize)), i >= s.wsize ? (common.arraySet(s.window, e, r - s.wsize, s.wsize, 0), s.wnext = 0, s.whave = s.wsize) : ((a = s.wsize - s.wnext) > i && (a = i), common.arraySet(s.window, e, r - i, a, s.wnext), (i -= a) ? (common.arraySet(s.window, e, r - i, i, 0), s.wnext = i, s.whave = s.wsize) : (s.wnext += a, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += a))), 0
  }

  function inflate$1(t, e) {
    var r, i, a, s, n, o, h, l, p, d, c, f, m, u, y, g, _, v, b, E, S, P, x, T, A = 0,
      C = new common.Buf8(4),
      w = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return Z_STREAM_ERROR;
    (r = t.state).mode === TYPE && (r.mode = TYPEDO), n = t.next_out, a = t.output, h = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, l = r.hold, p = r.bits, d = o, c = h, P = Z_OK;
    t: for (;;) switch (r.mode) {
      case HEAD:
        if (0 === r.wrap) {
          r.mode = TYPEDO;
          break
        }
        for (; p < 16;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        if (2 & r.wrap && 35615 === l) {
          r.check = 0, C[0] = 255 & l, C[1] = l >>> 8 & 255, r.check = crc32_1(r.check, C, 2, 0), l = 0, p = 0, r.mode = FLAGS;
          break
        }
        if (r.flags = 0, r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & l) << 8) + (l >> 8)) % 31) {
          t.msg = "incorrect header check", r.mode = BAD;
          break
        }
        if ((15 & l) !== Z_DEFLATED) {
          t.msg = "unknown compression method", r.mode = BAD;
          break
        }
        if (p -= 4, S = 8 + (15 & (l >>>= 4)), 0 === r.wbits) r.wbits = S;
        else if (S > r.wbits) {
          t.msg = "invalid window size", r.mode = BAD;
          break
        }
        r.dmax = 1 << S, t.adler = r.check = 1, r.mode = 512 & l ? DICTID : TYPE, l = 0, p = 0;
        break;
      case FLAGS:
        for (; p < 16;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        if (r.flags = l, (255 & r.flags) !== Z_DEFLATED) {
          t.msg = "unknown compression method", r.mode = BAD;
          break
        }
        if (57344 & r.flags) {
          t.msg = "unknown header flags set", r.mode = BAD;
          break
        }
        r.head && (r.head.text = l >> 8 & 1), 512 & r.flags && (C[0] = 255 & l, C[1] = l >>> 8 & 255, r.check = crc32_1(r.check, C, 2, 0)), l = 0, p = 0, r.mode = TIME;
      case TIME:
        for (; p < 32;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        r.head && (r.head.time = l), 512 & r.flags && (C[0] = 255 & l, C[1] = l >>> 8 & 255, C[2] = l >>> 16 & 255, C[3] = l >>> 24 & 255, r.check = crc32_1(r.check, C, 4, 0)), l = 0, p = 0, r.mode = OS;
      case OS:
        for (; p < 16;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        r.head && (r.head.xflags = 255 & l, r.head.os = l >> 8), 512 & r.flags && (C[0] = 255 & l, C[1] = l >>> 8 & 255, r.check = crc32_1(r.check, C, 2, 0)), l = 0, p = 0, r.mode = EXLEN;
      case EXLEN:
        if (1024 & r.flags) {
          for (; p < 16;) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          r.length = l, r.head && (r.head.extra_len = l), 512 & r.flags && (C[0] = 255 & l, C[1] = l >>> 8 & 255, r.check = crc32_1(r.check, C, 2, 0)), l = 0, p = 0
        } else r.head && (r.head.extra = null);
        r.mode = EXTRA;
      case EXTRA:
        if (1024 & r.flags && ((f = r.length) > o && (f = o), f && (r.head && (S = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Array(r.head.extra_len)), common.arraySet(r.head.extra, i, s, f, S)), 512 & r.flags && (r.check = crc32_1(r.check, i, f, s)), o -= f, s += f, r.length -= f), r.length)) break t;
        r.length = 0, r.mode = NAME;
      case NAME:
        if (2048 & r.flags) {
          if (0 === o) break t;
          f = 0;
          do {
            S = i[s + f++], r.head && S && r.length < 65536 && (r.head.name += String.fromCharCode(S))
          } while (S && f < o);
          if (512 & r.flags && (r.check = crc32_1(r.check, i, f, s)), o -= f, s += f, S) break t
        } else r.head && (r.head.name = null);
        r.length = 0, r.mode = COMMENT;
      case COMMENT:
        if (4096 & r.flags) {
          if (0 === o) break t;
          f = 0;
          do {
            S = i[s + f++], r.head && S && r.length < 65536 && (r.head.comment += String.fromCharCode(S))
          } while (S && f < o);
          if (512 & r.flags && (r.check = crc32_1(r.check, i, f, s)), o -= f, s += f, S) break t
        } else r.head && (r.head.comment = null);
        r.mode = HCRC;
      case HCRC:
        if (512 & r.flags) {
          for (; p < 16;) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          if (l !== (65535 & r.check)) {
            t.msg = "header crc mismatch", r.mode = BAD;
            break
          }
          l = 0, p = 0
        }
        r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), t.adler = r.check = 0, r.mode = TYPE;
        break;
      case DICTID:
        for (; p < 32;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        t.adler = r.check = zswap32(l), l = 0, p = 0, r.mode = DICT;
      case DICT:
        if (0 === r.havedict) return t.next_out = n, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = l, r.bits = p, Z_NEED_DICT;
        t.adler = r.check = 1, r.mode = TYPE;
      case TYPE:
        if (e === Z_BLOCK || e === Z_TREES) break t;
      case TYPEDO:
        if (r.last) {
          l >>>= 7 & p, p -= 7 & p, r.mode = CHECK;
          break
        }
        for (; p < 3;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        switch (r.last = 1 & l, p -= 1, 3 & (l >>>= 1)) {
          case 0:
            r.mode = STORED;
            break;
          case 1:
            if (fixedtables(r), r.mode = LEN_, e === Z_TREES) {
              l >>>= 2, p -= 2;
              break t
            }
            break;
          case 2:
            r.mode = TABLE;
            break;
          case 3:
            t.msg = "invalid block type", r.mode = BAD
        }
        l >>>= 2, p -= 2;
        break;
      case STORED:
        for (l >>>= 7 & p, p -= 7 & p; p < 32;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        if ((65535 & l) != (l >>> 16 ^ 65535)) {
          t.msg = "invalid stored block lengths", r.mode = BAD;
          break
        }
        if (r.length = 65535 & l, l = 0, p = 0, r.mode = COPY_, e === Z_TREES) break t;
      case COPY_:
        r.mode = COPY;
      case COPY:
        if (f = r.length) {
          if (f > o && (f = o), f > h && (f = h), 0 === f) break t;
          common.arraySet(a, i, s, f, n), o -= f, s += f, h -= f, n += f, r.length -= f;
          break
        }
        r.mode = TYPE;
        break;
      case TABLE:
        for (; p < 14;) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        if (r.nlen = 257 + (31 & l), l >>>= 5, p -= 5, r.ndist = 1 + (31 & l), l >>>= 5, p -= 5, r.ncode = 4 + (15 & l), l >>>= 4, p -= 4, r.nlen > 286 || r.ndist > 30) {
          t.msg = "too many length or distance symbols", r.mode = BAD;
          break
        }
        r.have = 0, r.mode = LENLENS;
      case LENLENS:
        for (; r.have < r.ncode;) {
          for (; p < 3;) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          r.lens[w[r.have++]] = 7 & l, l >>>= 3, p -= 3
        }
        for (; r.have < 19;) r.lens[w[r.have++]] = 0;
        if (r.lencode = r.lendyn, r.lenbits = 7, x = {
            bits: r.lenbits
          }, P = inftrees(CODES, r.lens, 0, 19, r.lencode, 0, r.work, x), r.lenbits = x.bits, P) {
          t.msg = "invalid code lengths set", r.mode = BAD;
          break
        }
        r.have = 0, r.mode = CODELENS;
      case CODELENS:
        for (; r.have < r.nlen + r.ndist;) {
          for (; g = (A = r.lencode[l & (1 << r.lenbits) - 1]) >>> 16 & 255, _ = 65535 & A, !((y = A >>> 24) <= p);) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          if (_ < 16) l >>>= y, p -= y, r.lens[r.have++] = _;
          else {
            if (16 === _) {
              for (T = y + 2; p < T;) {
                if (0 === o) break t;
                o--, l += i[s++] << p, p += 8
              }
              if (l >>>= y, p -= y, 0 === r.have) {
                t.msg = "invalid bit length repeat", r.mode = BAD;
                break
              }
              S = r.lens[r.have - 1], f = 3 + (3 & l), l >>>= 2, p -= 2
            } else if (17 === _) {
              for (T = y + 3; p < T;) {
                if (0 === o) break t;
                o--, l += i[s++] << p, p += 8
              }
              p -= y, S = 0, f = 3 + (7 & (l >>>= y)), l >>>= 3, p -= 3
            } else {
              for (T = y + 7; p < T;) {
                if (0 === o) break t;
                o--, l += i[s++] << p, p += 8
              }
              p -= y, S = 0, f = 11 + (127 & (l >>>= y)), l >>>= 7, p -= 7
            }
            if (r.have + f > r.nlen + r.ndist) {
              t.msg = "invalid bit length repeat", r.mode = BAD;
              break
            }
            for (; f--;) r.lens[r.have++] = S
          }
        }
        if (r.mode === BAD) break;
        if (0 === r.lens[256]) {
          t.msg = "invalid code -- missing end-of-block", r.mode = BAD;
          break
        }
        if (r.lenbits = 9, x = {
            bits: r.lenbits
          }, P = inftrees(LENS, r.lens, 0, r.nlen, r.lencode, 0, r.work, x), r.lenbits = x.bits, P) {
          t.msg = "invalid literal/lengths set", r.mode = BAD;
          break
        }
        if (r.distbits = 6, r.distcode = r.distdyn, x = {
            bits: r.distbits
          }, P = inftrees(DISTS, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, x), r.distbits = x.bits, P) {
          t.msg = "invalid distances set", r.mode = BAD;
          break
        }
        if (r.mode = LEN_, e === Z_TREES) break t;
      case LEN_:
        r.mode = LEN;
      case LEN:
        if (o >= 6 && h >= 258) {
          t.next_out = n, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = l, r.bits = p, inffast(t, c), n = t.next_out, a = t.output, h = t.avail_out, s = t.next_in, i = t.input, o = t.avail_in, l = r.hold, p = r.bits, r.mode === TYPE && (r.back = -1);
          break
        }
        for (r.back = 0; g = (A = r.lencode[l & (1 << r.lenbits) - 1]) >>> 16 & 255, _ = 65535 & A, !((y = A >>> 24) <= p);) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        if (g && 0 == (240 & g)) {
          for (v = y, b = g, E = _; g = (A = r.lencode[E + ((l & (1 << v + b) - 1) >> v)]) >>> 16 & 255, _ = 65535 & A, !(v + (y = A >>> 24) <= p);) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          l >>>= v, p -= v, r.back += v
        }
        if (l >>>= y, p -= y, r.back += y, r.length = _, 0 === g) {
          r.mode = LIT;
          break
        }
        if (32 & g) {
          r.back = -1, r.mode = TYPE;
          break
        }
        if (64 & g) {
          t.msg = "invalid literal/length code", r.mode = BAD;
          break
        }
        r.extra = 15 & g, r.mode = LENEXT;
      case LENEXT:
        if (r.extra) {
          for (T = r.extra; p < T;) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          r.length += l & (1 << r.extra) - 1, l >>>= r.extra, p -= r.extra, r.back += r.extra
        }
        r.was = r.length, r.mode = DIST;
      case DIST:
        for (; g = (A = r.distcode[l & (1 << r.distbits) - 1]) >>> 16 & 255, _ = 65535 & A, !((y = A >>> 24) <= p);) {
          if (0 === o) break t;
          o--, l += i[s++] << p, p += 8
        }
        if (0 == (240 & g)) {
          for (v = y, b = g, E = _; g = (A = r.distcode[E + ((l & (1 << v + b) - 1) >> v)]) >>> 16 & 255, _ = 65535 & A, !(v + (y = A >>> 24) <= p);) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          l >>>= v, p -= v, r.back += v
        }
        if (l >>>= y, p -= y, r.back += y, 64 & g) {
          t.msg = "invalid distance code", r.mode = BAD;
          break
        }
        r.offset = _, r.extra = 15 & g, r.mode = DISTEXT;
      case DISTEXT:
        if (r.extra) {
          for (T = r.extra; p < T;) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          r.offset += l & (1 << r.extra) - 1, l >>>= r.extra, p -= r.extra, r.back += r.extra
        }
        if (r.offset > r.dmax) {
          t.msg = "invalid distance too far back", r.mode = BAD;
          break
        }
        r.mode = MATCH;
      case MATCH:
        if (0 === h) break t;
        if (f = c - h, r.offset > f) {
          if ((f = r.offset - f) > r.whave && r.sane) {
            t.msg = "invalid distance too far back", r.mode = BAD;
            break
          }
          f > r.wnext ? (f -= r.wnext, m = r.wsize - f) : m = r.wnext - f, f > r.length && (f = r.length), u = r.window
        } else u = a, m = n - r.offset, f = r.length;
        f > h && (f = h), h -= f, r.length -= f;
        do {
          a[n++] = u[m++]
        } while (--f);
        0 === r.length && (r.mode = LEN);
        break;
      case LIT:
        if (0 === h) break t;
        a[n++] = r.length, h--, r.mode = LEN;
        break;
      case CHECK:
        if (r.wrap) {
          for (; p < 32;) {
            if (0 === o) break t;
            o--, l |= i[s++] << p, p += 8
          }
          if (c -= h, t.total_out += c, r.total += c, c && (t.adler = r.check = r.flags ? crc32_1(r.check, a, c, n - c) : adler32_1(r.check, a, c, n - c)), c = h, (r.flags ? l : zswap32(l)) !== r.check) {
            t.msg = "incorrect data check", r.mode = BAD;
            break
          }
          l = 0, p = 0
        }
        r.mode = LENGTH;
      case LENGTH:
        if (r.wrap && r.flags) {
          for (; p < 32;) {
            if (0 === o) break t;
            o--, l += i[s++] << p, p += 8
          }
          if (l !== (4294967295 & r.total)) {
            t.msg = "incorrect length check", r.mode = BAD;
            break
          }
          l = 0, p = 0
        }
        r.mode = DONE;
      case DONE:
        P = Z_STREAM_END;
        break t;
      case BAD:
        P = Z_DATA_ERROR;
        break t;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
      default:
        return Z_STREAM_ERROR
    }
    return t.next_out = n, t.avail_out = h, t.next_in = s, t.avail_in = o, r.hold = l, r.bits = p, (r.wsize || c !== t.avail_out && r.mode < BAD && (r.mode < CHECK || e !== Z_FINISH)) && updatewindow(t, t.output, t.next_out, c - t.avail_out), d -= t.avail_in, c -= t.avail_out, t.total_in += d, t.total_out += c, r.total += c, r.wrap && c && (t.adler = r.check = r.flags ? crc32_1(r.check, a, c, t.next_out - c) : adler32_1(r.check, a, c, t.next_out - c)), t.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === TYPE ? 128 : 0) + (r.mode === LEN_ || r.mode === COPY_ ? 256 : 0), (0 === d && 0 === c || e === Z_FINISH) && P === Z_OK && (P = Z_BUF_ERROR), P
  }

  function inflateEnd(t) {
    if (!t || !t.state) return Z_STREAM_ERROR;
    var e = t.state;
    return e.window && (e.window = null), t.state = null, Z_OK
  }

  function inflateGetHeader(t, e) {
    var r;
    return t && t.state ? 0 == (2 & (r = t.state).wrap) ? Z_STREAM_ERROR : (r.head = e, e.done = !1, Z_OK) : Z_STREAM_ERROR
  }

  function inflateSetDictionary(t, e) {
    var r, i = e.length;
    return t && t.state ? 0 !== (r = t.state).wrap && r.mode !== DICT ? Z_STREAM_ERROR : r.mode === DICT && adler32_1(1, e, i, 0) !== r.check ? Z_DATA_ERROR : updatewindow(t, e, i, i) ? (r.mode = MEM, Z_MEM_ERROR) : (r.havedict = 1, Z_OK) : Z_STREAM_ERROR
  }
  var inflateReset_1 = inflateReset,
    inflateReset2_1 = inflateReset2,
    inflateResetKeep_1 = inflateResetKeep,
    inflateInit_1 = inflateInit,
    inflateInit2_1 = inflateInit2,
    inflate_2$1 = inflate$1,
    inflateEnd_1 = inflateEnd,
    inflateGetHeader_1 = inflateGetHeader,
    inflateSetDictionary_1 = inflateSetDictionary,
    inflateInfo = "pako inflate (from Nodeca project)",
    inflate_1$1 = {
      inflateReset: inflateReset_1,
      inflateReset2: inflateReset2_1,
      inflateResetKeep: inflateResetKeep_1,
      inflateInit: inflateInit_1,
      inflateInit2: inflateInit2_1,
      inflate: inflate_2$1,
      inflateEnd: inflateEnd_1,
      inflateGetHeader: inflateGetHeader_1,
      inflateSetDictionary: inflateSetDictionary_1,
      inflateInfo: inflateInfo
    },
    constants = {
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_BUF_ERROR: -5,
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      Z_BINARY: 0,
      Z_TEXT: 1,
      Z_UNKNOWN: 2,
      Z_DEFLATED: 8
    };

  function GZheader() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
  }
  var gzheader = GZheader,
    toString = Object.prototype.toString;

  function Inflate(t) {
    if (!(this instanceof Inflate)) return new Inflate(t);
    this.options = common.assign({
      chunkSize: 16384,
      windowBits: 0,
      to: ""
    }, t || {});
    var e = this.options;
    e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(e.windowBits >= 0 && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new zstream, this.strm.avail_out = 0;
    var r = inflate_1$1.inflateInit2(this.strm, e.windowBits);
    if (r !== constants.Z_OK) throw new Error(messages[r]);
    if (this.header = new gzheader, inflate_1$1.inflateGetHeader(this.strm, this.header), e.dictionary && ("string" == typeof e.dictionary ? e.dictionary = strings.string2buf(e.dictionary) : "[object ArrayBuffer]" === toString.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (r = inflate_1$1.inflateSetDictionary(this.strm, e.dictionary)) !== constants.Z_OK)) throw new Error(messages[r])
  }

  function inflate(t, e) {
    var r = new Inflate(e);
    if (r.push(t, !0), r.err) throw r.msg || messages[r.err];
    return r.result
  }

  function inflateRaw(t, e) {
    return (e = e || {}).raw = !0, inflate(t, e)
  }
  Inflate.prototype.push = function (t, e) {
    var r, i, a, s, n, o = this.strm,
      h = this.options.chunkSize,
      l = this.options.dictionary,
      p = !1;
    if (this.ended) return !1;
    i = e === ~~e ? e : !0 === e ? constants.Z_FINISH : constants.Z_NO_FLUSH, "string" == typeof t ? o.input = strings.binstring2buf(t) : "[object ArrayBuffer]" === toString.call(t) ? o.input = new Uint8Array(t) : o.input = t, o.next_in = 0, o.avail_in = o.input.length;
    do {
      if (0 === o.avail_out && (o.output = new common.Buf8(h), o.next_out = 0, o.avail_out = h), (r = inflate_1$1.inflate(o, constants.Z_NO_FLUSH)) === constants.Z_NEED_DICT && l && (r = inflate_1$1.inflateSetDictionary(this.strm, l)), r === constants.Z_BUF_ERROR && !0 === p && (r = constants.Z_OK, p = !1), r !== constants.Z_STREAM_END && r !== constants.Z_OK) return this.onEnd(r), this.ended = !0, !1;
      o.next_out && (0 !== o.avail_out && r !== constants.Z_STREAM_END && (0 !== o.avail_in || i !== constants.Z_FINISH && i !== constants.Z_SYNC_FLUSH) || ("string" === this.options.to ? (a = strings.utf8border(o.output, o.next_out), s = o.next_out - a, n = strings.buf2string(o.output, a), o.next_out = s, o.avail_out = h - s, s && common.arraySet(o.output, o.output, a, s, 0), this.onData(n)) : this.onData(common.shrinkBuf(o.output, o.next_out)))), 0 === o.avail_in && 0 === o.avail_out && (p = !0)
    } while ((o.avail_in > 0 || 0 === o.avail_out) && r !== constants.Z_STREAM_END);
    return r === constants.Z_STREAM_END && (i = constants.Z_FINISH), i === constants.Z_FINISH ? (r = inflate_1$1.inflateEnd(this.strm), this.onEnd(r), this.ended = !0, r === constants.Z_OK) : i !== constants.Z_SYNC_FLUSH || (this.onEnd(constants.Z_OK), o.avail_out = 0, !0)
  }, Inflate.prototype.onData = function (t) {
    this.chunks.push(t)
  }, Inflate.prototype.onEnd = function (t) {
    t === constants.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = common.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
  };
  var Inflate_1 = Inflate,
    inflate_2 = inflate,
    inflateRaw_1 = inflateRaw,
    ungzip = inflate,
    inflate_1 = {
      Inflate: Inflate_1,
      inflate: inflate_2,
      inflateRaw: inflateRaw_1,
      ungzip: ungzip
    },
    assign = common.assign,
    pako = {};
  assign(pako, deflate_1, inflate_1, constants);
  var pako_1 = pako,
    lottie = createCommonjsModule((function (module) {
      "undefined" != typeof navigator && function (t, e) {
        module.exports ? module.exports = e(t) : (t.lottie = e(t), t.bodymovin = t.lottie)
      }(window || {}, (function (window) {
        var svgNS = "http://www.w3.org/2000/svg",
          locationHref = "",
          initialDefaultFrame = -999999,
          _useWebWorker = !1,
          subframeEnabled = !0,
          idPrefix = "",
          expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
          bmPow = Math.pow,
          bmSqrt = Math.sqrt,
          bmFloor = Math.floor,
          bmMax = Math.max,
          bmMin = Math.min,
          BMMath = {};

        function ProjectInterface() {
          return {}
        }! function () {
          var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
            r = e.length;
          for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]]
        }(), BMMath.random = Math.random, BMMath.abs = function (t) {
          if ("object" === typeof t && t.length) {
            var e, r = createSizedArray(t.length),
              i = t.length;
            for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
            return r
          }
          return Math.abs(t)
        };
        var defaultCurveSegments = 150,
          degToRads = Math.PI / 180,
          roundCorner = .5519;

        function styleDiv(t) {
          t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = "0 0", t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = "visible", t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = "preserve-3d", t.style.webkitTransformStyle = "preserve-3d", t.style.mozTransformStyle = "preserve-3d"
        }

        function BMEnterFrameEvent(t, e, r, i) {
          this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1
        }

        function BMCompleteEvent(t, e) {
          this.type = t, this.direction = e < 0 ? -1 : 1
        }

        function BMCompleteLoopEvent(t, e, r, i) {
          this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
        }

        function BMSegmentStartEvent(t, e, r) {
          this.type = t, this.firstFrame = e, this.totalFrames = r
        }

        function BMDestroyEvent(t, e) {
          this.type = t, this.target = e
        }

        function BMRenderFrameErrorEvent(t, e) {
          this.type = "renderFrameError", this.nativeError = t, this.currentTime = e
        }

        function BMConfigErrorEvent(t) {
          this.type = "configError", this.nativeError = t
        }
        var createElementID = (_count = 0, function () {
            return idPrefix + "__lottie_element_" + (_count += 1)
          }),
          _count;

        function HSVtoRGB(t, e, r) {
          var i, a, s, n, o, h, l, p;
          switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (n = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), n % 6) {
            case 0:
              i = r, a = p, s = h;
              break;
            case 1:
              i = l, a = r, s = h;
              break;
            case 2:
              i = h, a = r, s = p;
              break;
            case 3:
              i = h, a = l, s = r;
              break;
            case 4:
              i = p, a = h, s = r;
              break;
            case 5:
              i = r, a = h, s = l
          }
          return [i, a, s]
        }

        function RGBtoHSV(t, e, r) {
          var i, a = Math.max(t, e, r),
            s = Math.min(t, e, r),
            n = a - s,
            o = 0 === a ? 0 : n / a,
            h = a / 255;
          switch (a) {
            case s:
              i = 0;
              break;
            case t:
              i = e - r + n * (e < r ? 6 : 0), i /= 6 * n;
              break;
            case e:
              i = r - t + 2 * n, i /= 6 * n;
              break;
            case r:
              i = t - e + 4 * n, i /= 6 * n
          }
          return [i, o, h]
        }

        function addSaturationToRGB(t, e) {
          var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
          return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2])
        }

        function addBrightnessToRGB(t, e) {
          var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
          return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2])
        }

        function addHueToRGB(t, e) {
          var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
          return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2])
        }
        var rgbToHex = function () {
          var t, e, r = [];
          for (t = 0; t < 256; t += 1) e = t.toString(16), r[t] = 1 === e.length ? "0" + e : e;
          return function (t, e, i) {
            return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + r[t] + r[e] + r[i]
          }
        }();

        function BaseEvent() {}
        BaseEvent.prototype = {
          triggerEvent: function (t, e) {
            if (this._cbs[t])
              for (var r = this._cbs[t], i = 0; i < r.length; i += 1) r[i](e)
          },
          addEventListener: function (t, e) {
            return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
              function () {
                this.removeEventListener(t, e)
              }.bind(this)
          },
          removeEventListener: function (t, e) {
            if (e) {
              if (this._cbs[t]) {
                for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
                this._cbs[t].length || (this._cbs[t] = null)
              }
            } else this._cbs[t] = null
          }
        };
        var createTypedArray = function () {
          function t(t, e) {
            var r, i = 0,
              a = [];
            switch (t) {
              case "int16":
              case "uint8c":
                r = 1;
                break;
              default:
                r = 1.1
            }
            for (i = 0; i < e; i += 1) a.push(r);
            return a
          }
          return "function" == typeof Uint8ClampedArray && "function" == typeof Float32Array ? function (e, r) {
            return "float32" === e ? new Float32Array(r) : "int16" === e ? new Int16Array(r) : "uint8c" === e ? new Uint8ClampedArray(r) : t(e, r)
          } : t
        }();

        function createSizedArray(t) {
          return Array.apply(null, {
            length: t
          })
        }

        function createNS(t) {
          return document.createElementNS(svgNS, t)
        }

        function createTag(t) {
          return document.createElement(t)
        }

        function DynamicPropertyContainer() {}
        DynamicPropertyContainer.prototype = {
          addDynamicProperty: function (t) {
            -1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
          },
          iterateDynamicProperties: function () {
            var t;
            this._mdf = !1;
            var e = this.dynamicProperties.length;
            for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
          },
          initDynamicPropertyContainer: function (t) {
            this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
          }
        };
        var getBlendMode = (blendModeEnums = {
            0: "source-over",
            1: "multiply",
            2: "screen",
            3: "overlay",
            4: "darken",
            5: "lighten",
            6: "color-dodge",
            7: "color-burn",
            8: "hard-light",
            9: "soft-light",
            10: "difference",
            11: "exclusion",
            12: "hue",
            13: "saturation",
            14: "color",
            15: "luminosity"
          }, function (t) {
            return blendModeEnums[t] || ""
          }),
          blendModeEnums, lineCapEnum = {
            1: "butt",
            2: "round",
            3: "square"
          },
          lineJoinEnum = {
            1: "miter",
            2: "round",
            3: "bevel"
          },
          Matrix = function () {
            var t = Math.cos,
              e = Math.sin,
              r = Math.tan,
              i = Math.round;

            function a() {
              return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
            }

            function s(r) {
              if (0 === r) return this;
              var i = t(r),
                a = e(r);
              return this._t(i, -a, 0, 0, a, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function n(r) {
              if (0 === r) return this;
              var i = t(r),
                a = e(r);
              return this._t(1, 0, 0, 0, 0, i, -a, 0, 0, a, i, 0, 0, 0, 0, 1)
            }

            function o(r) {
              if (0 === r) return this;
              var i = t(r),
                a = e(r);
              return this._t(i, 0, a, 0, 0, 1, 0, 0, -a, 0, i, 0, 0, 0, 0, 1)
            }

            function h(r) {
              if (0 === r) return this;
              var i = t(r),
                a = e(r);
              return this._t(i, -a, 0, 0, a, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function l(t, e) {
              return this._t(1, e, t, 1, 0, 0)
            }

            function p(t, e) {
              return this.shear(r(t), r(e))
            }

            function d(i, a) {
              var s = t(a),
                n = e(a);
              return this._t(s, n, 0, 0, -n, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(s, -n, 0, 0, n, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
            }

            function c(t, e, r) {
              return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
            }

            function f(t, e, r, i, a, s, n, o, h, l, p, d, c, f, m, u) {
              return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = a, this.props[5] = s, this.props[6] = n, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = d, this.props[12] = c, this.props[13] = f, this.props[14] = m, this.props[15] = u, this
            }

            function m(t, e, r) {
              return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
            }

            function u(t, e, r, i, a, s, n, o, h, l, p, d, c, f, m, u) {
              var y = this.props;
              if (1 === t && 0 === e && 0 === r && 0 === i && 0 === a && 1 === s && 0 === n && 0 === o && 0 === h && 0 === l && 1 === p && 0 === d) return y[12] = y[12] * t + y[15] * c, y[13] = y[13] * s + y[15] * f, y[14] = y[14] * p + y[15] * m, y[15] *= u, this._identityCalculated = !1, this;
              var g = y[0],
                _ = y[1],
                v = y[2],
                b = y[3],
                E = y[4],
                S = y[5],
                P = y[6],
                x = y[7],
                T = y[8],
                A = y[9],
                C = y[10],
                w = y[11],
                k = y[12],
                D = y[13],
                M = y[14],
                I = y[15];
              return y[0] = g * t + _ * a + v * h + b * c, y[1] = g * e + _ * s + v * l + b * f, y[2] = g * r + _ * n + v * p + b * m, y[3] = g * i + _ * o + v * d + b * u, y[4] = E * t + S * a + P * h + x * c, y[5] = E * e + S * s + P * l + x * f, y[6] = E * r + S * n + P * p + x * m, y[7] = E * i + S * o + P * d + x * u, y[8] = T * t + A * a + C * h + w * c, y[9] = T * e + A * s + C * l + w * f, y[10] = T * r + A * n + C * p + w * m, y[11] = T * i + A * o + C * d + w * u, y[12] = k * t + D * a + M * h + I * c, y[13] = k * e + D * s + M * l + I * f, y[14] = k * r + D * n + M * p + I * m, y[15] = k * i + D * o + M * d + I * u, this._identityCalculated = !1, this
            }

            function y() {
              return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
            }

            function g(t) {
              for (var e = 0; e < 16;) {
                if (t.props[e] !== this.props[e]) return !1;
                e += 1
              }
              return !0
            }

            function _(t) {
              var e;
              for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
              return t
            }

            function v(t) {
              var e;
              for (e = 0; e < 16; e += 1) this.props[e] = t[e]
            }

            function b(t, e, r) {
              return {
                x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
                y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
                z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
              }
            }

            function E(t, e, r) {
              return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
            }

            function S(t, e, r) {
              return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
            }

            function P(t, e, r) {
              return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
            }

            function x() {
              var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                e = this.props[5] / t,
                r = -this.props[1] / t,
                i = -this.props[4] / t,
                a = this.props[0] / t,
                s = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
                n = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
                o = new Matrix;
              return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = a, o.props[12] = s, o.props[13] = n, o
            }

            function T(t) {
              return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0)
            }

            function A(t) {
              var e, r = t.length,
                i = [];
              for (e = 0; e < r; e += 1) i[e] = T(t[e]);
              return i
            }

            function C(t, e, r) {
              var i = createTypedArray("float32", 6);
              if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];
              else {
                var a = this.props[0],
                  s = this.props[1],
                  n = this.props[4],
                  o = this.props[5],
                  h = this.props[12],
                  l = this.props[13];
                i[0] = t[0] * a + t[1] * n + h, i[1] = t[0] * s + t[1] * o + l, i[2] = e[0] * a + e[1] * n + h, i[3] = e[0] * s + e[1] * o + l, i[4] = r[0] * a + r[1] * n + h, i[5] = r[0] * s + r[1] * o + l
              }
              return i
            }

            function w(t, e, r) {
              return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
            }

            function k(t, e) {
              if (this.isIdentity()) return t + "," + e;
              var r = this.props;
              return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
            }

            function D() {
              for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
              return r
            }

            function M(t) {
              return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t
            }

            function I() {
              var t = this.props;
              return "matrix(" + M(t[0]) + "," + M(t[1]) + "," + M(t[4]) + "," + M(t[5]) + "," + M(t[12]) + "," + M(t[13]) + ")"
            }
            return function () {
              this.reset = a, this.rotate = s, this.rotateX = n, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = d, this.shear = l, this.scale = c, this.setTransform = f, this.translate = m, this.transform = u, this.applyToPoint = b, this.applyToX = E, this.applyToY = S, this.applyToZ = P, this.applyToPointArray = w, this.applyToTriplePoints = C, this.applyToPointStringified = k, this.toCSS = D, this.to2dCSS = I, this.clone = _, this.cloneFromProps = v, this.equals = g, this.inversePoints = A, this.inversePoint = T, this.getInverseMatrix = x, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
            }
          }();
        ! function (t, e) {
          var r = this,
            i = e.pow(256, 6),
            a = e.pow(2, 52),
            s = 2 * a;

          function n(t) {
            var e, r = t.length,
              i = this,
              a = 0,
              s = i.i = i.j = 0,
              n = i.S = [];
            for (r || (t = [r++]); a < 256;) n[a] = a++;
            for (a = 0; a < 256; a++) n[a] = n[s = 255 & s + t[a % r] + (e = n[a])], n[s] = e;
            i.g = function (t) {
              for (var e, r = 0, a = i.i, s = i.j, n = i.S; t--;) e = n[a = 255 & a + 1], r = 256 * r + n[255 & (n[a] = n[s = 255 & s + e]) + (n[s] = e)];
              return i.i = a, i.j = s, r
            }
          }

          function o(t, e) {
            return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
          }

          function h(t, e) {
            for (var r, i = t + "", a = 0; a < i.length;) e[255 & a] = 255 & (r ^= 19 * e[255 & a]) + i.charCodeAt(a++);
            return l(e)
          }

          function l(t) {
            return String.fromCharCode.apply(0, t)
          }
          e.seedrandom = function (p, d, c) {
            var f = [],
              m = h(function t(e, r) {
                var i, a = [],
                  s = typeof e;
                if (r && "object" == s)
                  for (i in e) try {
                    a.push(t(e[i], r - 1))
                  } catch (t) {}
                return a.length ? a : "string" == s ? e : e + "\0"
              }((d = !0 === d ? {
                entropy: !0
              } : d || {}).entropy ? [p, l(t)] : null === p ? function () {
                try {
                  void 0;
                  var e = new Uint8Array(256);
                  return (r.crypto || r.msCrypto).getRandomValues(e), l(e)
                } catch (e) {
                  var i = r.navigator,
                    a = i && i.plugins;
                  return [+new Date, r, a, r.screen, l(t)]
                }
              }() : p, 3), f),
              u = new n(f),
              y = function () {
                for (var t = u.g(6), e = i, r = 0; t < a;) t = 256 * (t + r), e *= 256, r = u.g(1);
                for (; t >= s;) t /= 2, e /= 2, r >>>= 1;
                return (t + r) / e
              };
            return y.int32 = function () {
              return 0 | u.g(4)
            }, y.quick = function () {
              return u.g(4) / 4294967296
            }, y.double = y, h(l(u.S), t), (d.pass || c || function (t, r, i, a) {
              return a && (a.S && o(a, u), t.state = function () {
                return o(u, {})
              }), i ? (e.random = t, r) : t
            })(y, m, "global" in d ? d.global : this == e, d.state)
          }, h(e.random(), t)
        }([], BMMath);
        var BezierFactory = function () {
          var t = {
              getBezierEasing: function (t, r, i, a, s) {
                var n = s || ("bez_" + t + "_" + r + "_" + i + "_" + a).replace(/\./g, "p");
                if (e[n]) return e[n];
                var o = new h([t, r, i, a]);
                return e[n] = o, o
              }
            },
            e = {};
          var r = "function" == typeof Float32Array;

          function i(t, e) {
            return 1 - 3 * e + 3 * t
          }

          function a(t, e) {
            return 3 * e - 6 * t
          }

          function s(t) {
            return 3 * t
          }

          function n(t, e, r) {
            return ((i(e, r) * t + a(e, r)) * t + s(e)) * t
          }

          function o(t, e, r) {
            return 3 * i(e, r) * t * t + 2 * a(e, r) * t + s(e)
          }

          function h(t) {
            this._p = t, this._mSampleValues = r ? new Float32Array(11) : new Array(11), this._precomputed = !1, this.get = this.get.bind(this)
          }
          return h.prototype = {
            get: function (t) {
              var e = this._p[0],
                r = this._p[1],
                i = this._p[2],
                a = this._p[3];
              return this._precomputed || this._precompute(), e === r && i === a ? t : 0 === t ? 0 : 1 === t ? 1 : n(this._getTForX(t), r, a)
            },
            _precompute: function () {
              var t = this._p[0],
                e = this._p[1],
                r = this._p[2],
                i = this._p[3];
              this._precomputed = !0, t === e && r === i || this._calcSampleValues()
            },
            _calcSampleValues: function () {
              for (var t = this._p[0], e = this._p[2], r = 0; r < 11; ++r) this._mSampleValues[r] = n(.1 * r, t, e)
            },
            _getTForX: function (t) {
              for (var e = this._p[0], r = this._p[2], i = this._mSampleValues, a = 0, s = 1; 10 !== s && i[s] <= t; ++s) a += .1;
              var h = a + .1 * ((t - i[--s]) / (i[s + 1] - i[s])),
                l = o(h, e, r);
              return l >= .001 ? function (t, e, r, i) {
                for (var a = 0; a < 4; ++a) {
                  var s = o(e, r, i);
                  if (0 === s) return e;
                  e -= (n(e, r, i) - t) / s
                }
                return e
              }(t, h, e, r) : 0 === l ? h : function (t, e, r, i, a) {
                var s, o, h = 0;
                do {
                  (s = n(o = e + (r - e) / 2, i, a) - t) > 0 ? r = o : e = o
                } while (Math.abs(s) > 1e-7 && ++h < 10);
                return o
              }(t, a, a + .1, e, r)
            }
          }, t
        }();

        function extendPrototype(t, e) {
          var r, i, a = t.length;
          for (r = 0; r < a; r += 1)
            for (var s in i = t[r].prototype) Object.prototype.hasOwnProperty.call(i, s) && (e.prototype[s] = i[s])
        }

        function getDescriptor(t, e) {
          return Object.getOwnPropertyDescriptor(t, e)
        }

        function createProxyFunction(t) {
          function e() {}
          return e.prototype = t, e
        }

        function bezFunction() {
          var t = Math;

          function e(t, e, r, i, a, s) {
            var n = t * i + e * a + r * s - a * i - s * t - r * e;
            return n > -.001 && n < .001
          }
          var r = function (t, e, r, i) {
            var a, s, n, o, h, l, p = defaultCurveSegments,
              d = 0,
              c = [],
              f = [],
              m = bezierLengthPool.newElement();
            for (n = r.length, a = 0; a < p; a += 1) {
              for (h = a / (p - 1), l = 0, s = 0; s < n; s += 1) o = bmPow(1 - h, 3) * t[s] + 3 * bmPow(1 - h, 2) * h * r[s] + 3 * (1 - h) * bmPow(h, 2) * i[s] + bmPow(h, 3) * e[s], c[s] = o, null !== f[s] && (l += bmPow(c[s] - f[s], 2)), f[s] = c[s];
              l && (d += l = bmSqrt(l)), m.percents[a] = h, m.lengths[a] = d
            }
            return m.addedLength = d, m
          };

          function i(t) {
            this.segmentLength = 0, this.points = new Array(t)
          }

          function a(t, e) {
            this.partialLength = t, this.point = e
          }
          var s, n = (s = {}, function (t, r, n, o) {
            var h = (t[0] + "_" + t[1] + "_" + r[0] + "_" + r[1] + "_" + n[0] + "_" + n[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
            if (!s[h]) {
              var l, p, d, c, f, m, u, y = defaultCurveSegments,
                g = 0,
                _ = null;
              2 === t.length && (t[0] !== r[0] || t[1] !== r[1]) && e(t[0], t[1], r[0], r[1], t[0] + n[0], t[1] + n[1]) && e(t[0], t[1], r[0], r[1], r[0] + o[0], r[1] + o[1]) && (y = 2);
              var v = new i(y);
              for (d = n.length, l = 0; l < y; l += 1) {
                for (u = createSizedArray(d), f = l / (y - 1), m = 0, p = 0; p < d; p += 1) c = bmPow(1 - f, 3) * t[p] + 3 * bmPow(1 - f, 2) * f * (t[p] + n[p]) + 3 * (1 - f) * bmPow(f, 2) * (r[p] + o[p]) + bmPow(f, 3) * r[p], u[p] = c, null !== _ && (m += bmPow(u[p] - _[p], 2));
                g += m = bmSqrt(m), v.points[l] = new a(m, u), _ = u
              }
              v.segmentLength = g, s[h] = v
            }
            return s[h]
          });

          function o(t, e) {
            var r = e.percents,
              i = e.lengths,
              a = r.length,
              s = bmFloor((a - 1) * t),
              n = t * e.addedLength,
              o = 0;
            if (s === a - 1 || 0 === s || n === i[s]) return r[s];
            for (var h = i[s] > n ? -1 : 1, l = !0; l;)
              if (i[s] <= n && i[s + 1] > n ? (o = (n - i[s]) / (i[s + 1] - i[s]), l = !1) : s += h, s < 0 || s >= a - 1) {
                if (s === a - 1) return r[s];
                l = !1
              } return r[s] + (r[s + 1] - r[s]) * o
          }
          var h = createTypedArray("float32", 8);
          return {
            getSegmentsLength: function (t) {
              var e, i = segmentsLengthPool.newElement(),
                a = t.c,
                s = t.v,
                n = t.o,
                o = t.i,
                h = t._length,
                l = i.lengths,
                p = 0;
              for (e = 0; e < h - 1; e += 1) l[e] = r(s[e], s[e + 1], n[e], o[e + 1]), p += l[e].addedLength;
              return a && h && (l[e] = r(s[e], s[0], n[e], o[0]), p += l[e].addedLength), i.totalLength = p, i
            },
            getNewSegment: function (e, r, i, a, s, n, l) {
              s < 0 ? s = 0 : s > 1 && (s = 1);
              var p, d = o(s, l),
                c = o(n = n > 1 ? 1 : n, l),
                f = e.length,
                m = 1 - d,
                u = 1 - c,
                y = m * m * m,
                g = d * m * m * 3,
                _ = d * d * m * 3,
                v = d * d * d,
                b = m * m * u,
                E = d * m * u + m * d * u + m * m * c,
                S = d * d * u + m * d * c + d * m * c,
                P = d * d * c,
                x = m * u * u,
                T = d * u * u + m * c * u + m * u * c,
                A = d * c * u + m * c * c + d * u * c,
                C = d * c * c,
                w = u * u * u,
                k = c * u * u + u * c * u + u * u * c,
                D = c * c * u + u * c * c + c * u * c,
                M = c * c * c;
              for (p = 0; p < f; p += 1) h[4 * p] = t.round(1e3 * (y * e[p] + g * i[p] + _ * a[p] + v * r[p])) / 1e3, h[4 * p + 1] = t.round(1e3 * (b * e[p] + E * i[p] + S * a[p] + P * r[p])) / 1e3, h[4 * p + 2] = t.round(1e3 * (x * e[p] + T * i[p] + A * a[p] + C * r[p])) / 1e3, h[4 * p + 3] = t.round(1e3 * (w * e[p] + k * i[p] + D * a[p] + M * r[p])) / 1e3;
              return h
            },
            getPointInSegment: function (e, r, i, a, s, n) {
              var h = o(s, n),
                l = 1 - h;
              return [t.round(1e3 * (l * l * l * e[0] + (h * l * l + l * h * l + l * l * h) * i[0] + (h * h * l + l * h * h + h * l * h) * a[0] + h * h * h * r[0])) / 1e3, t.round(1e3 * (l * l * l * e[1] + (h * l * l + l * h * l + l * l * h) * i[1] + (h * h * l + l * h * h + h * l * h) * a[1] + h * h * h * r[1])) / 1e3]
            },
            buildBezierData: n,
            pointOnLine2D: e,
            pointOnLine3D: function (r, i, a, s, n, o, h, l, p) {
              if (0 === a && 0 === o && 0 === p) return e(r, i, s, n, h, l);
              var d, c = t.sqrt(t.pow(s - r, 2) + t.pow(n - i, 2) + t.pow(o - a, 2)),
                f = t.sqrt(t.pow(h - r, 2) + t.pow(l - i, 2) + t.pow(p - a, 2)),
                m = t.sqrt(t.pow(h - s, 2) + t.pow(l - n, 2) + t.pow(p - o, 2));
              return (d = c > f ? c > m ? c - f - m : m - f - c : m > f ? m - f - c : f - c - m) > -1e-4 && d < 1e-4
            }
          }
        }! function () {
          for (var t = 0, e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[e[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[r] + "CancelAnimationFrame"] || window[e[r] + "CancelRequestAnimationFrame"];
          window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
            var r = (new Date).getTime(),
              i = Math.max(0, 16 - (r - t)),
              a = setTimeout((function () {
                e(r + i)
              }), i);
            return t = r + i, a
          }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
            clearTimeout(t)
          })
        }();
        var bez = bezFunction(),
          dataManager = function () {
            var t, e, r = 1,
              i = [],
              a = {
                onmessage: function () {},
                postMessage: function (e) {
                  t({
                    data: e
                  })
                }
              },
              s = {
                postMessage: function (t) {
                  a.onmessage({
                    data: t
                  })
                }
              };

            function n() {
              e || ((e = function (e) {
                if (window.Worker && window.Blob && _useWebWorker) {
                  var r = new Blob(["var _workerSelf = self; self.onmessage = ", e.toString()], {
                      type: "text/javascript"
                    }),
                    i = URL.createObjectURL(r);
                  return new Worker(i)
                }
                return t = e, a
              }((function (t) {
                if (s.dataManager || (s.dataManager = function () {
                    function t(a, s) {
                      var n, o, h, l, p, c, f = a.length;
                      for (o = 0; o < f; o += 1)
                        if ("ks" in (n = a[o]) && !n.completed) {
                          if (n.completed = !0, n.tt && (a[o - 1].td = n.tt), n.hasMask) {
                            var m = n.masksProperties;
                            for (l = m.length, h = 0; h < l; h += 1)
                              if (m[h].pt.k.i) i(m[h].pt.k);
                              else
                                for (c = m[h].pt.k.length, p = 0; p < c; p += 1) m[h].pt.k[p].s && i(m[h].pt.k[p].s[0]), m[h].pt.k[p].e && i(m[h].pt.k[p].e[0])
                          }
                          0 === n.ty ? (n.layers = e(n.refId, s), t(n.layers, s)) : 4 === n.ty ? r(n.shapes) : 5 === n.ty && d(n)
                        }
                    }

                    function e(t, e) {
                      for (var r = 0, i = e.length; r < i;) {
                        if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
                        r += 1
                      }
                      return null
                    }

                    function r(t) {
                      var e, a, s;
                      for (e = t.length - 1; e >= 0; e -= 1)
                        if ("sh" === t[e].ty)
                          if (t[e].ks.k.i) i(t[e].ks.k);
                          else
                            for (s = t[e].ks.k.length, a = 0; a < s; a += 1) t[e].ks.k[a].s && i(t[e].ks.k[a].s[0]), t[e].ks.k[a].e && i(t[e].ks.k[a].e[0]);
                      else "gr" === t[e].ty && r(t[e].it)
                    }

                    function i(t) {
                      var e, r = t.i.length;
                      for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
                    }

                    function a(t, e) {
                      var r = e ? e.split(".") : [100, 100, 100];
                      return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && null))
                    }
                    var s, n = function () {
                        var t = [4, 4, 14];

                        function e(t) {
                          var e, r, i, a = t.length;
                          for (e = 0; e < a; e += 1) 5 === t[e].ty && (r = t[e], i = void 0, i = r.t.d, r.t.d = {
                            k: [{
                              s: i,
                              t: 0
                            }]
                          })
                        }
                        return function (r) {
                          if (a(t, r.v) && (e(r.layers), r.assets)) {
                            var i, s = r.assets.length;
                            for (i = 0; i < s; i += 1) r.assets[i].layers && e(r.assets[i].layers)
                          }
                        }
                      }(),
                      o = (s = [4, 7, 99], function (t) {
                        if (t.chars && !a(s, t.v)) {
                          var e, r, n, o, h, l = t.chars.length;
                          for (e = 0; e < l; e += 1)
                            if (t.chars[e].data && t.chars[e].data.shapes)
                              for (n = (h = t.chars[e].data.shapes[0].it).length, r = 0; r < n; r += 1)(o = h[r].ks.k).__converted || (i(h[r].ks.k), o.__converted = !0)
                        }
                      }),
                      h = function () {
                        var t = [5, 7, 15];

                        function e(t) {
                          var e, r, i, a = t.length;
                          for (e = 0; e < a; e += 1) 5 === t[e].ty && (r = t[e], i = void 0, "number" == typeof (i = r.t.p).a && (i.a = {
                            a: 0,
                            k: i.a
                          }), "number" == typeof i.p && (i.p = {
                            a: 0,
                            k: i.p
                          }), "number" == typeof i.r && (i.r = {
                            a: 0,
                            k: i.r
                          }))
                        }
                        return function (r) {
                          if (a(t, r.v) && (e(r.layers), r.assets)) {
                            var i, s = r.assets.length;
                            for (i = 0; i < s; i += 1) r.assets[i].layers && e(r.assets[i].layers)
                          }
                        }
                      }(),
                      l = function () {
                        var t = [4, 1, 9];

                        function e(t) {
                          var r, i, a, s = t.length;
                          for (r = 0; r < s; r += 1)
                            if ("gr" === t[r].ty) e(t[r].it);
                            else if ("fl" === t[r].ty || "st" === t[r].ty)
                            if (t[r].c.k && t[r].c.k[0].i)
                              for (a = t[r].c.k.length, i = 0; i < a; i += 1) t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255, t[r].c.k[i].s[1] /= 255, t[r].c.k[i].s[2] /= 255, t[r].c.k[i].s[3] /= 255), t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255, t[r].c.k[i].e[1] /= 255, t[r].c.k[i].e[2] /= 255, t[r].c.k[i].e[3] /= 255);
                            else t[r].c.k[0] /= 255, t[r].c.k[1] /= 255, t[r].c.k[2] /= 255, t[r].c.k[3] /= 255
                        }

                        function r(t) {
                          var r, i = t.length;
                          for (r = 0; r < i; r += 1) 4 === t[r].ty && e(t[r].shapes)
                        }
                        return function (e) {
                          if (a(t, e.v) && (r(e.layers), e.assets)) {
                            var i, s = e.assets.length;
                            for (i = 0; i < s; i += 1) e.assets[i].layers && r(e.assets[i].layers)
                          }
                        }
                      }(),
                      p = function () {
                        var t = [4, 4, 18];

                        function e(t) {
                          var r, i, a;
                          for (r = t.length - 1; r >= 0; r -= 1)
                            if ("sh" === t[r].ty)
                              if (t[r].ks.k.i) t[r].ks.k.c = t[r].closed;
                              else
                                for (a = t[r].ks.k.length, i = 0; i < a; i += 1) t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed), t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
                          else "gr" === t[r].ty && e(t[r].it)
                        }

                        function r(t) {
                          var r, i, a, s, n, o, h = t.length;
                          for (i = 0; i < h; i += 1) {
                            if ((r = t[i]).hasMask) {
                              var l = r.masksProperties;
                              for (s = l.length, a = 0; a < s; a += 1)
                                if (l[a].pt.k.i) l[a].pt.k.c = l[a].cl;
                                else
                                  for (o = l[a].pt.k.length, n = 0; n < o; n += 1) l[a].pt.k[n].s && (l[a].pt.k[n].s[0].c = l[a].cl), l[a].pt.k[n].e && (l[a].pt.k[n].e[0].c = l[a].cl)
                            }
                            4 === r.ty && e(r.shapes)
                          }
                        }
                        return function (e) {
                          if (a(t, e.v) && (r(e.layers), e.assets)) {
                            var i, s = e.assets.length;
                            for (i = 0; i < s; i += 1) e.assets[i].layers && r(e.assets[i].layers)
                          }
                        }
                      }();

                    function d(t) {
                      0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0)
                    }
                    var c = {
                      completeData: function (e) {
                        e.__complete || (l(e), n(e), o(e), h(e), p(e), t(e.layers, e.assets), e.__complete = !0)
                      }
                    };
                    return c.checkColors = l, c.checkChars = o, c.checkPathProperties = h, c.checkShapes = p, c.completeLayers = t, c
                  }()), s.assetLoader || (s.assetLoader = function () {
                    function t(t) {
                      var e = t.getResponseHeader("content-type");
                      return e && "json" === t.responseType && -1 !== e.indexOf("json") || t.response && "object" == typeof t.response ? t.response : t.response && "string" == typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : null
                    }
                    return {
                      load: function (e, r, i, a) {
                        var s, n = new XMLHttpRequest;
                        try {
                          n.responseType = "json"
                        } catch (t) {}
                        n.onreadystatechange = function () {
                          if (4 === n.readyState)
                            if (200 === n.status) s = t(n), i(s);
                            else try {
                              s = t(n), i(s)
                            } catch (t) {
                              a && a(t)
                            }
                        };
                        try {
                          n.open("GET", e, !0)
                        } catch (t) {
                          n.open("GET", r + "/" + e, !0)
                        }
                        n.send()
                      }
                    }
                  }()), "loadAnimation" === t.data.type) s.assetLoader.load(t.data.path, t.data.fullPath, (function (e) {
                  s.dataManager.completeData(e), s.postMessage({
                    id: t.data.id,
                    payload: e,
                    status: "success"
                  })
                }), (function () {
                  s.postMessage({
                    id: t.data.id,
                    status: "error"
                  })
                }));
                else if ("complete" === t.data.type) {
                  var e = t.data.animation;
                  s.dataManager.completeData(e), s.postMessage({
                    id: t.data.id,
                    payload: e,
                    status: "success"
                  })
                } else "loadData" === t.data.type && s.assetLoader.load(t.data.path, t.data.fullPath, (function (e) {
                  s.postMessage({
                    id: t.data.id,
                    payload: e,
                    status: "success"
                  })
                }), (function () {
                  s.postMessage({
                    id: t.data.id,
                    status: "error"
                  })
                }))
              }))).onmessage = function (t) {
                var e = t.data,
                  r = e.id,
                  a = i[r];
                i[r] = null, "success" === e.status ? a.onComplete(e.payload) : a.onError && a.onError()
              })
            }

            function o(t, e) {
              var a = "processId_" + (r += 1);
              return i[a] = {
                onComplete: t,
                onError: e
              }, a
            }
            return {
              loadAnimation: function (t, r, i) {
                n();
                var a = o(r, i);
                e.postMessage({
                  type: "loadAnimation",
                  path: t,
                  fullPath: window.location.origin + window.location.pathname,
                  id: a
                })
              },
              loadData: function (t, r, i) {
                n();
                var a = o(r, i);
                e.postMessage({
                  type: "loadData",
                  path: t,
                  fullPath: window.location.origin + window.location.pathname,
                  id: a
                })
              },
              completeAnimation: function (t, r, i) {
                n();
                var a = o(r, i);
                e.postMessage({
                  type: "complete",
                  animation: t,
                  id: a
                })
              }
            }
          }();

        function getFontProperties(t) {
          for (var e = t.fStyle ? t.fStyle.split(" ") : [], r = "normal", i = "normal", a = e.length, s = 0; s < a; s += 1) switch (e[s].toLowerCase()) {
            case "italic":
              i = "italic";
              break;
            case "bold":
              r = "700";
              break;
            case "black":
              r = "900";
              break;
            case "medium":
              r = "500";
              break;
            case "regular":
            case "normal":
              r = "400";
              break;
            case "light":
            case "thin":
              r = "200"
          }
          return {
            style: i,
            weight: t.fWeight || r
          }
        }
        var FontManager = function () {
            var t = {
                w: 0,
                size: 0,
                shapes: []
              },
              e = [];
            e = e.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
            var r = ["d83cdffb", "d83cdffc", "d83cdffd", "d83cdffe", "d83cdfff"],
              i = [65039, 8205];

            function a(t, e) {
              var r = createTag("span");
              r.setAttribute("aria-hidden", !0), r.style.fontFamily = e;
              var i = createTag("span");
              i.innerText = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
              var a = i.offsetWidth;
              return i.style.fontFamily = function (t) {
                var e, r = t.split(","),
                  i = r.length,
                  a = [];
                for (e = 0; e < i; e += 1) "sans-serif" !== r[e] && "monospace" !== r[e] && a.push(r[e]);
                return a.join(",")
              }(t) + ", " + e, {
                node: i,
                w: a,
                parent: r
              }
            }

            function s(t, e) {
              var r = createNS("text");
              r.style.fontSize = "100px";
              var i = getFontProperties(e);
              return r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", i.style), r.setAttribute("font-weight", i.weight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r
            }
            var n = function () {
              this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this._warned = !1, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this)
            };
            return n.isModifier = function (t, e) {
              var i = t.toString(16) + e.toString(16);
              return -1 !== r.indexOf(i)
            }, n.isZeroWidthJoiner = function (t, e) {
              return e ? t === i[0] && e === i[1] : t === i[1]
            }, n.isCombinedCharacter = function (t) {
              return -1 !== e.indexOf(t)
            }, n.prototype = {
              addChars: function (t) {
                if (t) {
                  var e;
                  this.chars || (this.chars = []);
                  var r, i, a = t.length,
                    s = this.chars.length;
                  for (e = 0; e < a; e += 1) {
                    for (r = 0, i = !1; r < s;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
                    i || (this.chars.push(t[e]), s += 1)
                  }
                }
              },
              addFonts: function (t, e) {
                if (t) {
                  if (this.chars) return this.isLoaded = !0, void(this.fonts = t.list);
                  var r, i = t.list,
                    n = i.length,
                    o = n;
                  for (r = 0; r < n; r += 1) {
                    var h, l, p = !0;
                    if (i[r].loaded = !1, i[r].monoCase = a(i[r].fFamily, "monospace"), i[r].sansCase = a(i[r].fFamily, "sans-serif"), i[r].fPath) {
                      if ("p" === i[r].fOrigin || 3 === i[r].origin) {
                        if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + i[r].fFamily + '"], style[f-origin="3"][f-family="' + i[r].fFamily + '"]')).length > 0 && (p = !1), p) {
                          var d = createTag("style");
                          d.setAttribute("f-forigin", i[r].fOrigin), d.setAttribute("f-origin", i[r].origin), d.setAttribute("f-family", i[r].fFamily), d.type = "text/css", d.innerText = "@font-face {font-family: " + i[r].fFamily + "; font-style: normal; src: url('" + i[r].fPath + "');}", e.appendChild(d)
                        }
                      } else if ("g" === i[r].fOrigin || 1 === i[r].origin) {
                        for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l += 1) - 1 !== h[l].href.indexOf(i[r].fPath) && (p = !1);
                        if (p) {
                          var c = createTag("link");
                          c.setAttribute("f-forigin", i[r].fOrigin), c.setAttribute("f-origin", i[r].origin), c.type = "text/css", c.rel = "stylesheet", c.href = i[r].fPath, document.body.appendChild(c)
                        }
                      } else if ("t" === i[r].fOrigin || 2 === i[r].origin) {
                        for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l += 1) i[r].fPath === h[l].src && (p = !1);
                        if (p) {
                          var f = createTag("link");
                          f.setAttribute("f-forigin", i[r].fOrigin), f.setAttribute("f-origin", i[r].origin), f.setAttribute("rel", "stylesheet"), f.setAttribute("href", i[r].fPath), e.appendChild(f)
                        }
                      }
                    } else i[r].loaded = !0, o -= 1;
                    i[r].helper = s(e, i[r]), i[r].cache = {}, this.fonts.push(i[r])
                  }
                  0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
                } else this.isLoaded = !0
              },
              getCharData: function (e, r, i) {
                for (var a = 0, s = this.chars.length; a < s;) {
                  if (this.chars[a].ch === e && this.chars[a].style === r && this.chars[a].fFamily === i) return this.chars[a];
                  a += 1
                }
                return ("string" == typeof e && 13 !== e.charCodeAt(0) || !e) && console && console.warn && !this._warned && (this._warned = !0, console.warn("Missing character from exported characters list: ", e, r, i)), t
              },
              getFontByName: function (t) {
                for (var e = 0, r = this.fonts.length; e < r;) {
                  if (this.fonts[e].fName === t) return this.fonts[e];
                  e += 1
                }
                return this.fonts[0]
              },
              measureText: function (t, e, r) {
                var i = this.getFontByName(e),
                  a = t.charCodeAt(0);
                if (!i.cache[a + 1]) {
                  var s = i.helper;
                  if (" " === t) {
                    s.textContent = "|" + t + "|";
                    var n = s.getComputedTextLength();
                    s.textContent = "||";
                    var o = s.getComputedTextLength();
                    i.cache[a + 1] = (n - o) / 100
                  } else s.textContent = t, i.cache[a + 1] = s.getComputedTextLength() / 100
                }
                return i.cache[a + 1] * r
              },
              checkLoadedFonts: function () {
                var t, e, r, i = this.fonts.length,
                  a = i;
                for (t = 0; t < i; t += 1) this.fonts[t].loaded ? a -= 1 : "n" === this.fonts[t].fOrigin || 0 === this.fonts[t].origin ? this.fonts[t].loaded = !0 : (e = this.fonts[t].monoCase.node, r = this.fonts[t].monoCase.w, e.offsetWidth !== r ? (a -= 1, this.fonts[t].loaded = !0) : (e = this.fonts[t].sansCase.node, r = this.fonts[t].sansCase.w, e.offsetWidth !== r && (a -= 1, this.fonts[t].loaded = !0)), this.fonts[t].loaded && (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent), this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
                0 !== a && Date.now() - this.initTime < 5e3 ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10)
              },
              setIsLoaded: function () {
                this.isLoaded = !0
              }
            }, n
          }(),
          PropertyFactory = function () {
            var t = initialDefaultFrame,
              e = Math.abs;

            function r(t, e) {
              var r, a = this.offsetTime;
              "multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
              for (var s, n, o, h, l, p, d, c, f, m = e.lastIndex, u = m, y = this.keyframes.length - 1, g = !0; g;) {
                if (s = this.keyframes[u], n = this.keyframes[u + 1], u === y - 1 && t >= n.t - a) {
                  s.h && (s = n), m = 0;
                  break
                }
                if (n.t - a > t) {
                  m = u;
                  break
                }
                u < y - 1 ? u += 1 : (m = 0, g = !1)
              }
              o = this.keyframesMetadata[u] || {};
              var _, v = n.t - a,
                b = s.t - a;
              if (s.to) {
                o.bezierData || (o.bezierData = bez.buildBezierData(s.s, n.s || s.e, s.to, s.ti));
                var E = o.bezierData;
                if (t >= v || t < b) {
                  var S = t >= v ? E.points.length - 1 : 0;
                  for (l = E.points[S].point.length, h = 0; h < l; h += 1) r[h] = E.points[S].point[h]
                } else {
                  o.__fnct ? f = o.__fnct : (f = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, o.__fnct = f), p = f((t - b) / (v - b));
                  var P, x = E.segmentLength * p,
                    T = e.lastFrame < t && e._lastKeyframeIndex === u ? e._lastAddedLength : 0;
                  for (c = e.lastFrame < t && e._lastKeyframeIndex === u ? e._lastPoint : 0, g = !0, d = E.points.length; g;) {
                    if (T += E.points[c].partialLength, 0 === x || 0 === p || c === E.points.length - 1) {
                      for (l = E.points[c].point.length, h = 0; h < l; h += 1) r[h] = E.points[c].point[h];
                      break
                    }
                    if (x >= T && x < T + E.points[c + 1].partialLength) {
                      for (P = (x - T) / E.points[c + 1].partialLength, l = E.points[c].point.length, h = 0; h < l; h += 1) r[h] = E.points[c].point[h] + (E.points[c + 1].point[h] - E.points[c].point[h]) * P;
                      break
                    }
                    c < d - 1 ? c += 1 : g = !1
                  }
                  e._lastPoint = c, e._lastAddedLength = T - E.points[c].partialLength, e._lastKeyframeIndex = u
                }
              } else {
                var A, C, w, k, D;
                if (y = s.s.length, _ = n.s || s.e, this.sh && 1 !== s.h)
                  if (t >= v) r[0] = _[0], r[1] = _[1], r[2] = _[2];
                  else if (t <= b) r[0] = s.s[0], r[1] = s.s[1], r[2] = s.s[2];
                else {
                  ! function (t, e) {
                    var r = e[0],
                      i = e[1],
                      a = e[2],
                      s = e[3],
                      n = Math.atan2(2 * i * s - 2 * r * a, 1 - 2 * i * i - 2 * a * a),
                      o = Math.asin(2 * r * i + 2 * a * s),
                      h = Math.atan2(2 * r * s - 2 * i * a, 1 - 2 * r * r - 2 * a * a);
                    t[0] = n / degToRads, t[1] = o / degToRads, t[2] = h / degToRads
                  }(r, function (t, e, r) {
                    var i, a, s, n, o, h = [],
                      l = t[0],
                      p = t[1],
                      d = t[2],
                      c = t[3],
                      f = e[0],
                      m = e[1],
                      u = e[2],
                      y = e[3];
                    (a = l * f + p * m + d * u + c * y) < 0 && (a = -a, f = -f, m = -m, u = -u, y = -y);
                    1 - a > 1e-6 ? (i = Math.acos(a), s = Math.sin(i), n = Math.sin((1 - r) * i) / s, o = Math.sin(r * i) / s) : (n = 1 - r, o = r);
                    return h[0] = n * l + o * f, h[1] = n * p + o * m, h[2] = n * d + o * u, h[3] = n * c + o * y, h
                  }(i(s.s), i(_), (t - b) / (v - b)))
                } else
                  for (u = 0; u < y; u += 1) 1 !== s.h && (t >= v ? p = 1 : t < b ? p = 0 : (s.o.x.constructor === Array ? (o.__fnct || (o.__fnct = []), o.__fnct[u] ? f = o.__fnct[u] : (A = void 0 === s.o.x[u] ? s.o.x[0] : s.o.x[u], C = void 0 === s.o.y[u] ? s.o.y[0] : s.o.y[u], w = void 0 === s.i.x[u] ? s.i.x[0] : s.i.x[u], k = void 0 === s.i.y[u] ? s.i.y[0] : s.i.y[u], f = BezierFactory.getBezierEasing(A, C, w, k).get, o.__fnct[u] = f)) : o.__fnct ? f = o.__fnct : (A = s.o.x, C = s.o.y, w = s.i.x, k = s.i.y, f = BezierFactory.getBezierEasing(A, C, w, k).get, s.keyframeMetadata = f), p = f((t - b) / (v - b)))), _ = n.s || s.e, D = 1 === s.h ? s.s[u] : s.s[u] + (_[u] - s.s[u]) * p, "multidimensional" === this.propType ? r[u] = D : r = D
              }
              return e.lastIndex = m, r
            }

            function i(t) {
              var e = t[0] * degToRads,
                r = t[1] * degToRads,
                i = t[2] * degToRads,
                a = Math.cos(e / 2),
                s = Math.cos(r / 2),
                n = Math.cos(i / 2),
                o = Math.sin(e / 2),
                h = Math.sin(r / 2),
                l = Math.sin(i / 2);
              return [o * h * n + a * s * l, o * s * n + a * h * l, a * h * n - o * s * l, a * s * n - o * h * l]
            }

            function a() {
              var e = this.comp.renderedFrame - this.offsetTime,
                r = this.keyframes[0].t - this.offsetTime,
                i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
              if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && e >= i || this._caching.lastFrame < r && e < r))) {
                this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
                var a = this.interpolateValue(e, this._caching);
                this.pv = a
              }
              return this._caching.lastFrame = e, this.pv
            }

            function s(t) {
              var r;
              if ("unidimensional" === this.propType) r = t * this.mult, e(this.v - r) > 1e-5 && (this.v = r, this._mdf = !0);
              else
                for (var i = 0, a = this.v.length; i < a;) r = t[i] * this.mult, e(this.v[i] - r) > 1e-5 && (this.v[i] = r, this._mdf = !0), i += 1
            }

            function n() {
              if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
                if (this.lock) this.setVValue(this.pv);
                else {
                  var t;
                  this.lock = !0, this._mdf = this._isFirstFrame;
                  var e = this.effectsSequence.length,
                    r = this.kf ? this.pv : this.data.k;
                  for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
                  this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
                }
            }

            function o(t) {
              this.effectsSequence.push(t), this.container.addDynamicProperty(this)
            }

            function h(t, e, r, i) {
              this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = n, this.setVValue = s, this.addEffect = o
            }

            function l(t, e, r, i) {
              var a;
              this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
              var h = e.k.length;
              for (this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h), this.vel = createTypedArray("float32", h), a = 0; a < h; a += 1) this.v[a] = e.k[a] * this.mult, this.pv[a] = e.k[a];
              this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = n, this.setVValue = s, this.addEffect = o
            }

            function p(e, i, h, l) {
              this.propType = "unidimensional", this.keyframes = i.k, this.keyframesMetadata = [], this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
                lastFrame: t,
                lastIndex: 0,
                value: 0,
                _lastKeyframeIndex: -1
              }, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = n, this.setVValue = s, this.interpolateValue = r, this.effectsSequence = [a.bind(this)], this.addEffect = o
            }

            function d(e, i, h, l) {
              var p;
              this.propType = "multidimensional";
              var d, c, f, m, u = i.k.length;
              for (p = 0; p < u - 1; p += 1) i.k[p].to && i.k[p].s && i.k[p + 1] && i.k[p + 1].s && (d = i.k[p].s, c = i.k[p + 1].s, f = i.k[p].to, m = i.k[p].ti, (2 === d.length && (d[0] !== c[0] || d[1] !== c[1]) && bez.pointOnLine2D(d[0], d[1], c[0], c[1], d[0] + f[0], d[1] + f[1]) && bez.pointOnLine2D(d[0], d[1], c[0], c[1], c[0] + m[0], c[1] + m[1]) || 3 === d.length && (d[0] !== c[0] || d[1] !== c[1] || d[2] !== c[2]) && bez.pointOnLine3D(d[0], d[1], d[2], c[0], c[1], c[2], d[0] + f[0], d[1] + f[1], d[2] + f[2]) && bez.pointOnLine3D(d[0], d[1], d[2], c[0], c[1], c[2], c[0] + m[0], c[1] + m[1], c[2] + m[2])) && (i.k[p].to = null, i.k[p].ti = null), d[0] === c[0] && d[1] === c[1] && 0 === f[0] && 0 === f[1] && 0 === m[0] && 0 === m[1] && (2 === d.length || d[2] === c[2] && 0 === f[2] && 0 === m[2]) && (i.k[p].to = null, i.k[p].ti = null));
              this.effectsSequence = [a.bind(this)], this.data = i, this.keyframes = i.k, this.keyframesMetadata = [], this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = n, this.setVValue = s, this.interpolateValue = r, this.frameId = -1;
              var y = i.k[0].s.length;
              for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) this.v[p] = t, this.pv[p] = t;
              this._caching = {
                lastFrame: t,
                lastIndex: 0,
                value: createTypedArray("float32", y)
              }, this.addEffect = o
            }
            return {
              getProp: function (t, e, r, i, a) {
                var s;
                if (e.k.length)
                  if ("number" == typeof e.k[0]) s = new l(t, e, i, a);
                  else switch (r) {
                    case 0:
                      s = new p(t, e, i, a);
                      break;
                    case 1:
                      s = new d(t, e, i, a)
                  } else s = new h(t, e, i, a);
                return s.effectsSequence.length && a.addDynamicProperty(s), s
              }
            }
          }(),
          TransformPropertyFactory = function () {
            var t = [0, 0];

            function e(t, e, r) {
              if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
                  k: [0, 0, 0]
                }, 1, 0, this), e.rx) {
                if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
                  var i, a = e.or.k.length;
                  for (i = 0; i < a; i += 1) e.or.k[i].to = null, e.or.k[i].ti = null
                }
                this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
              } else this.r = PropertyFactory.getProp(t, e.r || {
                k: 0
              }, 0, degToRads, this);
              e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
                k: [0, 0, 0]
              }, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
                k: [100, 100, 100]
              }, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
                _mdf: !1,
                v: 1
              }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
            }
            return e.prototype = {
              applyToMatrix: function (t) {
                var e = this._mdf;
                this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
              },
              getValue: function (e) {
                if (this.elem.globalData.frameId !== this.frameId) {
                  if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || e) {
                    var r;
                    if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                      var i, a;
                      if (r = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (i = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / r, 0), a = this.p.getValueAtTime(this.p.keyframes[0].t / r, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (i = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / r, 0), a = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / r, 0)) : (i = this.p.pv, a = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / r, this.p.offsetTime));
                      else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                        i = [], a = [];
                        var s = this.px,
                          n = this.py;
                        s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (i[0] = s.getValueAtTime((s.keyframes[0].t + .01) / r, 0), i[1] = n.getValueAtTime((n.keyframes[0].t + .01) / r, 0), a[0] = s.getValueAtTime(s.keyframes[0].t / r, 0), a[1] = n.getValueAtTime(n.keyframes[0].t / r, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (i[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / r, 0), i[1] = n.getValueAtTime(n.keyframes[n.keyframes.length - 1].t / r, 0), a[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / r, 0), a[1] = n.getValueAtTime((n.keyframes[n.keyframes.length - 1].t - .01) / r, 0)) : (i = [s.pv, n.pv], a[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / r, s.offsetTime), a[1] = n.getValueAtTime((n._caching.lastFrame + n.offsetTime - .01) / r, n.offsetTime))
                      } else i = a = t;
                      this.v.rotate(-Math.atan2(i[1] - a[1], i[0] - a[0]))
                    }
                    this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                  }
                  this.frameId = this.elem.globalData.frameId
                }
              },
              precalculateMatrix: function () {
                if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
                  if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
                    if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                    this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
                  }
                  this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
                }
              },
              autoOrient: function () {}
            }, extendPrototype([DynamicPropertyContainer], e), e.prototype.addDynamicProperty = function (t) {
              this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
            }, e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
              getTransformProperty: function (t, r, i) {
                return new e(t, r, i)
              }
            }
          }();

        function ShapePath() {
          this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
        }
        ShapePath.prototype.setPathData = function (t, e) {
          this.c = t, this.setLength(e);
          for (var r = 0; r < e;) this.v[r] = pointPool.newElement(), this.o[r] = pointPool.newElement(), this.i[r] = pointPool.newElement(), r += 1
        }, ShapePath.prototype.setLength = function (t) {
          for (; this._maxLength < t;) this.doubleArrayLength();
          this._length = t
        }, ShapePath.prototype.doubleArrayLength = function () {
          this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
        }, ShapePath.prototype.setXYAt = function (t, e, r, i, a) {
          var s;
          switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
            case "v":
              s = this.v;
              break;
            case "i":
              s = this.i;
              break;
            case "o":
              s = this.o;
              break;
            default:
              s = []
          }(!s[i] || s[i] && !a) && (s[i] = pointPool.newElement()), s[i][0] = t, s[i][1] = e
        }, ShapePath.prototype.setTripleAt = function (t, e, r, i, a, s, n, o) {
          this.setXYAt(t, e, "v", n, o), this.setXYAt(r, i, "o", n, o), this.setXYAt(a, s, "i", n, o)
        }, ShapePath.prototype.reverse = function () {
          var t = new ShapePath;
          t.setPathData(this.c, this._length);
          var e = this.v,
            r = this.o,
            i = this.i,
            a = 0;
          this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), a = 1);
          var s, n = this._length - 1,
            o = this._length;
          for (s = a; s < o; s += 1) t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], s, !1), n -= 1;
          return t
        };
        var ShapePropertyFactory = function () {
            function t(t, e, r) {
              var i, a, s, n, o, h, l, p, d, c = r.lastIndex,
                f = this.keyframes;
              if (t < f[0].t - this.offsetTime) i = f[0].s[0], s = !0, c = 0;
              else if (t >= f[f.length - 1].t - this.offsetTime) i = f[f.length - 1].s ? f[f.length - 1].s[0] : f[f.length - 2].e[0], s = !0;
              else {
                for (var m, u, y, g = c, _ = f.length - 1, v = !0; v && (m = f[g], !((u = f[g + 1]).t - this.offsetTime > t));) g < _ - 1 ? g += 1 : v = !1;
                if (y = this.keyframesMetadata[g] || {}, c = g, !(s = 1 === m.h)) {
                  if (t >= u.t - this.offsetTime) p = 1;
                  else if (t < m.t - this.offsetTime) p = 0;
                  else {
                    var b;
                    y.__fnct ? b = y.__fnct : (b = BezierFactory.getBezierEasing(m.o.x, m.o.y, m.i.x, m.i.y).get, y.__fnct = b), p = b((t - (m.t - this.offsetTime)) / (u.t - this.offsetTime - (m.t - this.offsetTime)))
                  }
                  a = u.s ? u.s[0] : m.e[0]
                }
                i = m.s[0]
              }
              for (h = e._length, l = i.i[0].length, r.lastIndex = c, n = 0; n < h; n += 1)
                for (o = 0; o < l; o += 1) d = s ? i.i[n][o] : i.i[n][o] + (a.i[n][o] - i.i[n][o]) * p, e.i[n][o] = d, d = s ? i.o[n][o] : i.o[n][o] + (a.o[n][o] - i.o[n][o]) * p, e.o[n][o] = d, d = s ? i.v[n][o] : i.v[n][o] + (a.v[n][o] - i.v[n][o]) * p, e.v[n][o] = d
            }

            function e() {
              var t = this.comp.renderedFrame - this.offsetTime,
                e = this.keyframes[0].t - this.offsetTime,
                r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                i = this._caching.lastFrame;
              return -999999 !== i && (i < e && t < e || i > r && t > r) || (this._caching.lastIndex = i < t ? this._caching.lastIndex : 0, this.interpolateShape(t, this.pv, this._caching)), this._caching.lastFrame = t, this.pv
            }

            function r() {
              this.paths = this.localShapeCollection
            }

            function i(t) {
              (function (t, e) {
                if (t._length !== e._length || t.c !== e.c) return !1;
                var r, i = t._length;
                for (r = 0; r < i; r += 1)
                  if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
                return !0
              })(this.v, t) || (this.v = shapePool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
            }

            function a() {
              if (this.elem.globalData.frameId !== this.frameId)
                if (this.effectsSequence.length)
                  if (this.lock) this.setVValue(this.pv);
                  else {
                    var t, e;
                    this.lock = !0, this._mdf = !1, t = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k;
                    var r = this.effectsSequence.length;
                    for (e = 0; e < r; e += 1) t = this.effectsSequence[e](t);
                    this.setVValue(t), this.lock = !1, this.frameId = this.elem.globalData.frameId
                  }
              else this._mdf = !1
            }

            function s(t, e, i) {
              this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
              var a = 3 === i ? e.pt.k : e.ks.k;
              this.v = shapePool.clone(a), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = r, this.effectsSequence = []
            }

            function n(t) {
              this.effectsSequence.push(t), this.container.addDynamicProperty(this)
            }

            function o(t, i, a) {
              this.propType = "shape", this.comp = t.comp, this.elem = t, this.container = t, this.offsetTime = t.data.st, this.keyframes = 3 === a ? i.pt.k : i.ks.k, this.keyframesMetadata = [], this.k = !0, this.kf = !0;
              var s = this.keyframes[0].s[0].i.length;
              this.v = shapePool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, s), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = -999999, this.reset = r, this._caching = {
                lastFrame: -999999,
                lastIndex: 0
              }, this.effectsSequence = [e.bind(this)]
            }
            s.prototype.interpolateShape = t, s.prototype.getValue = a, s.prototype.setVValue = i, s.prototype.addEffect = n, o.prototype.getValue = a, o.prototype.interpolateShape = t, o.prototype.setVValue = i, o.prototype.addEffect = n;
            var h = function () {
                var t = roundCorner;

                function e(t, e) {
                  this.v = shapePool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
                }
                return e.prototype = {
                  reset: r,
                  getValue: function () {
                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
                  },
                  convertEllToPath: function () {
                    var e = this.p.v[0],
                      r = this.p.v[1],
                      i = this.s.v[0] / 2,
                      a = this.s.v[1] / 2,
                      s = 3 !== this.d,
                      n = this.v;
                    n.v[0][0] = e, n.v[0][1] = r - a, n.v[1][0] = s ? e + i : e - i, n.v[1][1] = r, n.v[2][0] = e, n.v[2][1] = r + a, n.v[3][0] = s ? e - i : e + i, n.v[3][1] = r, n.i[0][0] = s ? e - i * t : e + i * t, n.i[0][1] = r - a, n.i[1][0] = s ? e + i : e - i, n.i[1][1] = r - a * t, n.i[2][0] = s ? e + i * t : e - i * t, n.i[2][1] = r + a, n.i[3][0] = s ? e - i : e + i, n.i[3][1] = r + a * t, n.o[0][0] = s ? e + i * t : e - i * t, n.o[0][1] = r - a, n.o[1][0] = s ? e + i : e - i, n.o[1][1] = r + a * t, n.o[2][0] = s ? e - i * t : e + i * t, n.o[2][1] = r + a, n.o[3][0] = s ? e - i : e + i, n.o[3][1] = r - a * t
                  }
                }, extendPrototype([DynamicPropertyContainer], e), e
              }(),
              l = function () {
                function t(t, e) {
                  this.v = shapePool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
                }
                return t.prototype = {
                  reset: r,
                  getValue: function () {
                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
                  },
                  convertStarToPath: function () {
                    var t, e, r, i, a = 2 * Math.floor(this.pt.v),
                      s = 2 * Math.PI / a,
                      n = !0,
                      o = this.or.v,
                      h = this.ir.v,
                      l = this.os.v,
                      p = this.is.v,
                      d = 2 * Math.PI * o / (2 * a),
                      c = 2 * Math.PI * h / (2 * a),
                      f = -Math.PI / 2;
                    f += this.r.v;
                    var m = 3 === this.data.d ? -1 : 1;
                    for (this.v._length = 0, t = 0; t < a; t += 1) {
                      r = n ? l : p, i = n ? d : c;
                      var u = (e = n ? o : h) * Math.cos(f),
                        y = e * Math.sin(f),
                        g = 0 === u && 0 === y ? 0 : y / Math.sqrt(u * u + y * y),
                        _ = 0 === u && 0 === y ? 0 : -u / Math.sqrt(u * u + y * y);
                      u += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(u, y, u - g * i * r * m, y - _ * i * r * m, u + g * i * r * m, y + _ * i * r * m, t, !0), n = !n, f += s * m
                    }
                  },
                  convertPolygonToPath: function () {
                    var t, e = Math.floor(this.pt.v),
                      r = 2 * Math.PI / e,
                      i = this.or.v,
                      a = this.os.v,
                      s = 2 * Math.PI * i / (4 * e),
                      n = .5 * -Math.PI,
                      o = 3 === this.data.d ? -1 : 1;
                    for (n += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                      var h = i * Math.cos(n),
                        l = i * Math.sin(n),
                        p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
                        d = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
                      h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * s * a * o, l - d * s * a * o, h + p * s * a * o, l + d * s * a * o, t, !0), n += r * o
                    }
                    this.paths.length = 0, this.paths[0] = this.v
                  }
                }, extendPrototype([DynamicPropertyContainer], t), t
              }(),
              p = function () {
                function t(t, e) {
                  this.v = shapePool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
                }
                return t.prototype = {
                  convertRectToPath: function () {
                    var t = this.p.v[0],
                      e = this.p.v[1],
                      r = this.s.v[0] / 2,
                      i = this.s.v[1] / 2,
                      a = bmMin(r, i, this.r.v),
                      s = a * (1 - roundCorner);
                    this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + a, t + r, e - i + a, t + r, e - i + s, 0, !0), this.v.setTripleAt(t + r, e + i - a, t + r, e + i - s, t + r, e + i - a, 1, !0), 0 !== a ? (this.v.setTripleAt(t + r - a, e + i, t + r - a, e + i, t + r - s, e + i, 2, !0), this.v.setTripleAt(t - r + a, e + i, t - r + s, e + i, t - r + a, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - a, t - r, e + i - a, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r, e - i + a, t - r, e - i + s, t - r, e - i + a, 5, !0), this.v.setTripleAt(t - r + a, e - i, t - r + a, e - i, t - r + s, e - i, 6, !0), this.v.setTripleAt(t + r - a, e - i, t + r - s, e - i, t + r - a, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + s, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + s, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + a, t + r, e - i + s, t + r, e - i + a, 0, !0), 0 !== a ? (this.v.setTripleAt(t + r - a, e - i, t + r - a, e - i, t + r - s, e - i, 1, !0), this.v.setTripleAt(t - r + a, e - i, t - r + s, e - i, t - r + a, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + a, t - r, e - i + a, t - r, e - i + s, 3, !0), this.v.setTripleAt(t - r, e + i - a, t - r, e + i - s, t - r, e + i - a, 4, !0), this.v.setTripleAt(t - r + a, e + i, t - r + a, e + i, t - r + s, e + i, 5, !0), this.v.setTripleAt(t + r - a, e + i, t + r - s, e + i, t + r - a, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - a, t + r, e + i - a, t + r, e + i - s, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + s, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - s, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - s, e + i, t + r, e + i, 3, !0)))
                  },
                  getValue: function () {
                    this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
                  },
                  reset: r
                }, extendPrototype([DynamicPropertyContainer], t), t
              }();
            var d = {
              getShapeProp: function (t, e, r) {
                var i;
                return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new o(t, e, r) : new s(t, e, r) : 5 === r ? i = new p(t, e) : 6 === r ? i = new h(t, e) : 7 === r && (i = new l(t, e)), i.k && t.addDynamicProperty(i), i
              },
              getConstructorFunction: function () {
                return s
              },
              getKeyframedConstructorFunction: function () {
                return o
              }
            };
            return d
          }(),
          ShapeModifiers = (ob = {}, modifiers = {}, ob.registerModifier = function (t, e) {
            modifiers[t] || (modifiers[t] = e)
          }, ob.getModifier = function (t, e, r) {
            return new modifiers[t](e, r)
          }, ob),
          ob, modifiers;

        function ShapeModifier() {}

        function TrimModifier() {}

        function RoundCornersModifier() {}

        function PuckerAndBloatModifier() {}

        function RepeaterModifier() {}

        function ShapeCollection() {
          this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
        }

        function DashProperty(t, e, r, i) {
          var a;
          this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
          var s, n = e.length || 0;
          for (a = 0; a < n; a += 1) s = PropertyFactory.getProp(t, e[a].v, 0, 0, this), this.k = s.k || this.k, this.dataProps[a] = {
            n: e[a].n,
            p: s
          };
          this.k || this.getValue(!0), this._isAnimated = this.k
        }

        function GradientProperty(t, e, r) {
          this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
          var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
          this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
        }
        ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
          if (!this.closed) {
            t.sh.container.addDynamicProperty(t.sh);
            var e = {
              shape: t.sh,
              data: t,
              localShapeCollection: shapeCollectionPool.newShapeCollection()
            };
            this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
          }
        }, ShapeModifier.prototype.init = function (t, e) {
          this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
        }, ShapeModifier.prototype.processKeys = function () {
          this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
        }, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
          this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
        }, TrimModifier.prototype.addShapeToModifier = function (t) {
          t.pathsData = []
        }, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, a) {
          var s = [];
          e <= 1 ? s.push({
            s: t,
            e: e
          }) : t >= 1 ? s.push({
            s: t - 1,
            e: e - 1
          }) : (s.push({
            s: t,
            e: 1
          }), s.push({
            s: 0,
            e: e - 1
          }));
          var n, o, h = [],
            l = s.length;
          for (n = 0; n < l; n += 1) {
            var p, d;
            if (!((o = s[n]).e * a < i || o.s * a > i + r)) p = o.s * a <= i ? 0 : (o.s * a - i) / r, d = o.e * a >= i + r ? 1 : (o.e * a - i) / r, h.push([p, d])
          }
          return h.length || h.push([0, 0]), h
        }, TrimModifier.prototype.releasePathsData = function (t) {
          var e, r = t.length;
          for (e = 0; e < r; e += 1) segmentsLengthPool.release(t[e]);
          return t.length = 0, t
        }, TrimModifier.prototype.processShapes = function (t) {
          var e, r, i, a;
          if (this._mdf || t) {
            var s = this.o.v % 360 / 360;
            if (s < 0 && (s += 1), (e = this.s.v > 1 ? 1 + s : this.s.v < 0 ? 0 + s : this.s.v + s) > (r = this.e.v > 1 ? 1 + s : this.e.v < 0 ? 0 + s : this.e.v + s)) {
              var n = e;
              e = r, r = n
            }
            e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r
          } else e = this.sValue, r = this.eValue;
          var o, h, l, p, d, c = this.shapes.length,
            f = 0;
          if (r === e)
            for (a = 0; a < c; a += 1) this.shapes[a].localShapeCollection.releaseShapes(), this.shapes[a].shape._mdf = !0, this.shapes[a].shape.paths = this.shapes[a].localShapeCollection, this._mdf && (this.shapes[a].pathsData.length = 0);
          else if (1 === r && 0 === e || 0 === r && 1 === e) {
            if (this._mdf)
              for (a = 0; a < c; a += 1) this.shapes[a].pathsData.length = 0, this.shapes[a].shape._mdf = !0
          } else {
            var m, u, y = [];
            for (a = 0; a < c; a += 1)
              if ((m = this.shapes[a]).shape._mdf || this._mdf || t || 2 === this.m) {
                if (h = (i = m.shape.paths)._length, d = 0, !m.shape._mdf && m.pathsData.length) d = m.totalShapeLength;
                else {
                  for (l = this.releasePathsData(m.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), d += p.totalLength;
                  m.totalShapeLength = d, m.pathsData = l
                }
                f += d, m.shape._mdf = !0
              } else m.shape.paths = m.localShapeCollection;
            var g, _ = e,
              v = r,
              b = 0;
            for (a = c - 1; a >= 0; a -= 1)
              if ((m = this.shapes[a]).shape._mdf) {
                for ((u = m.localShapeCollection).releaseShapes(), 2 === this.m && c > 1 ? (g = this.calculateShapeEdges(e, r, m.totalShapeLength, b, f), b += m.totalShapeLength) : g = [
                    [_, v]
                  ], h = g.length, o = 0; o < h; o += 1) {
                  _ = g[o][0], v = g[o][1], y.length = 0, v <= 1 ? y.push({
                    s: m.totalShapeLength * _,
                    e: m.totalShapeLength * v
                  }) : _ >= 1 ? y.push({
                    s: m.totalShapeLength * (_ - 1),
                    e: m.totalShapeLength * (v - 1)
                  }) : (y.push({
                    s: m.totalShapeLength * _,
                    e: m.totalShapeLength
                  }), y.push({
                    s: 0,
                    e: m.totalShapeLength * (v - 1)
                  }));
                  var E = this.addShapes(m, y[0]);
                  if (y[0].s !== y[0].e) {
                    if (y.length > 1)
                      if (m.shape.paths.shapes[m.shape.paths._length - 1].c) {
                        var S = E.pop();
                        this.addPaths(E, u), E = this.addShapes(m, y[1], S)
                      } else this.addPaths(E, u), E = this.addShapes(m, y[1]);
                    this.addPaths(E, u)
                  }
                }
                m.shape.paths = u
              }
          }
        }, TrimModifier.prototype.addPaths = function (t, e) {
          var r, i = t.length;
          for (r = 0; r < i; r += 1) e.addShape(t[r])
        }, TrimModifier.prototype.addSegment = function (t, e, r, i, a, s, n) {
          a.setXYAt(e[0], e[1], "o", s), a.setXYAt(r[0], r[1], "i", s + 1), n && a.setXYAt(t[0], t[1], "v", s), a.setXYAt(i[0], i[1], "v", s + 1)
        }, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
          e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1)
        }, TrimModifier.prototype.addShapes = function (t, e, r) {
          var i, a, s, n, o, h, l, p, d = t.pathsData,
            c = t.shape.paths.shapes,
            f = t.shape.paths._length,
            m = 0,
            u = [],
            y = !0;
          for (r ? (o = r._length, p = r._length) : (r = shapePool.newElement(), o = 0, p = 0), u.push(r), i = 0; i < f; i += 1) {
            for (h = d[i].lengths, r.c = c[i].c, s = c[i].c ? h.length : h.length + 1, a = 1; a < s; a += 1)
              if (m + (n = h[a - 1]).addedLength < e.s) m += n.addedLength, r.c = !1;
              else {
                if (m > e.e) {
                  r.c = !1;
                  break
                }
                e.s <= m && e.e >= m + n.addedLength ? (this.addSegment(c[i].v[a - 1], c[i].o[a - 1], c[i].i[a], c[i].v[a], r, o, y), y = !1) : (l = bez.getNewSegment(c[i].v[a - 1], c[i].v[a], c[i].o[a - 1], c[i].i[a], (e.s - m) / n.addedLength, (e.e - m) / n.addedLength, h[a - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), m += n.addedLength, o += 1
              } if (c[i].c && h.length) {
              if (n = h[a - 1], m <= e.e) {
                var g = h[a - 1].addedLength;
                e.s <= m && e.e >= m + g ? (this.addSegment(c[i].v[a - 1], c[i].o[a - 1], c[i].i[0], c[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(c[i].v[a - 1], c[i].v[0], c[i].o[a - 1], c[i].i[0], (e.s - m) / g, (e.e - m) / g, h[a - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1)
              } else r.c = !1;
              m += n.addedLength, o += 1
            }
            if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), m > e.e) break;
            i < f - 1 && (r = shapePool.newElement(), y = !0, u.push(r), o = 0)
          }
          return u
        }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
          this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
        }, RoundCornersModifier.prototype.processPath = function (t, e) {
          var r, i = shapePool.newElement();
          i.c = t.c;
          var a, s, n, o, h, l, p, d, c, f, m, u, y = t._length,
            g = 0;
          for (r = 0; r < y; r += 1) a = t.v[r], n = t.o[r], s = t.i[r], a[0] === n[0] && a[1] === n[1] && a[0] === s[0] && a[1] === s[1] ? 0 !== r && r !== y - 1 || t.c ? (o = 0 === r ? t.v[y - 1] : t.v[r - 1], l = (h = Math.sqrt(Math.pow(a[0] - o[0], 2) + Math.pow(a[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = m = a[0] + (o[0] - a[0]) * l, d = u = a[1] - (a[1] - o[1]) * l, c = p - (p - a[0]) * roundCorner, f = d - (d - a[1]) * roundCorner, i.setTripleAt(p, d, c, f, m, u, g), g += 1, o = r === y - 1 ? t.v[0] : t.v[r + 1], l = (h = Math.sqrt(Math.pow(a[0] - o[0], 2) + Math.pow(a[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = c = a[0] + (o[0] - a[0]) * l, d = f = a[1] + (o[1] - a[1]) * l, m = p - (p - a[0]) * roundCorner, u = d - (d - a[1]) * roundCorner, i.setTripleAt(p, d, c, f, m, u, g), g += 1) : (i.setTripleAt(a[0], a[1], n[0], n[1], s[0], s[1], g), g += 1) : (i.setTripleAt(t.v[r][0], t.v[r][1], t.o[r][0], t.o[r][1], t.i[r][0], t.i[r][1], g), g += 1);
          return i
        }, RoundCornersModifier.prototype.processShapes = function (t) {
          var e, r, i, a, s, n, o = this.shapes.length,
            h = this.rd.v;
          if (0 !== h)
            for (r = 0; r < o; r += 1) {
              if (n = (s = this.shapes[r]).localShapeCollection, s.shape._mdf || this._mdf || t)
                for (n.releaseShapes(), s.shape._mdf = !0, e = s.shape.paths.shapes, a = s.shape.paths._length, i = 0; i < a; i += 1) n.addShape(this.processPath(e[i], h));
              s.shape.paths = s.localShapeCollection
            }
          this.dynamicProperties.length || (this._mdf = !1)
        }, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], PuckerAndBloatModifier), PuckerAndBloatModifier.prototype.initModifierProperties = function (t, e) {
          this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(t, e.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length
        }, PuckerAndBloatModifier.prototype.processPath = function (t, e) {
          var r = e / 100,
            i = [0, 0],
            a = t._length,
            s = 0;
          for (s = 0; s < a; s += 1) i[0] += t.v[s][0], i[1] += t.v[s][1];
          i[0] /= a, i[1] /= a;
          var n, o, h, l, p, d, c = shapePool.newElement();
          for (c.c = t.c, s = 0; s < a; s += 1) n = t.v[s][0] + (i[0] - t.v[s][0]) * r, o = t.v[s][1] + (i[1] - t.v[s][1]) * r, h = t.o[s][0] + (i[0] - t.o[s][0]) * -r, l = t.o[s][1] + (i[1] - t.o[s][1]) * -r, p = t.i[s][0] + (i[0] - t.i[s][0]) * -r, d = t.i[s][1] + (i[1] - t.i[s][1]) * -r, c.setTripleAt(n, o, h, l, p, d, s);
          return c
        }, PuckerAndBloatModifier.prototype.processShapes = function (t) {
          var e, r, i, a, s, n, o = this.shapes.length,
            h = this.amount.v;
          if (0 !== h)
            for (r = 0; r < o; r += 1) {
              if (n = (s = this.shapes[r]).localShapeCollection, s.shape._mdf || this._mdf || t)
                for (n.releaseShapes(), s.shape._mdf = !0, e = s.shape.paths.shapes, a = s.shape.paths._length, i = 0; i < a; i += 1) n.addShape(this.processPath(e[i], h));
              s.shape.paths = s.localShapeCollection
            }
          this.dynamicProperties.length || (this._mdf = !1)
        }, ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
          this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
        }, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, a, s) {
          var n = s ? -1 : 1,
            o = i.s.v[0] + (1 - i.s.v[0]) * (1 - a),
            h = i.s.v[1] + (1 - i.s.v[1]) * (1 - a);
          t.translate(i.p.v[0] * n * a, i.p.v[1] * n * a, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * n * a), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(s ? 1 / o : o, s ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
        }, RepeaterModifier.prototype.init = function (t, e, r, i) {
          for (this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]); r > 0;) r -= 1, this._elements.unshift(e[r]);
          this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
        }, RepeaterModifier.prototype.resetElements = function (t) {
          var e, r = t.length;
          for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
        }, RepeaterModifier.prototype.cloneElements = function (t) {
          var e = JSON.parse(JSON.stringify(t));
          return this.resetElements(e), e
        }, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
          var r, i = t.length;
          for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e)
        }, RepeaterModifier.prototype.processShapes = function (t) {
          var e, r, i, a, s, n = !1;
          if (this._mdf || t) {
            var o, h = Math.ceil(this.c.v);
            if (this._groups.length < h) {
              for (; this._groups.length < h;) {
                var l = {
                  it: this.cloneElements(this._elements),
                  ty: "gr"
                };
                l.it.push({
                  a: {
                    a: 0,
                    ix: 1,
                    k: [0, 0]
                  },
                  nm: "Transform",
                  o: {
                    a: 0,
                    ix: 7,
                    k: 100
                  },
                  p: {
                    a: 0,
                    ix: 2,
                    k: [0, 0]
                  },
                  r: {
                    a: 1,
                    ix: 6,
                    k: [{
                      s: 0,
                      e: 0,
                      t: 0
                    }, {
                      s: 0,
                      e: 0,
                      t: 1
                    }]
                  },
                  s: {
                    a: 0,
                    ix: 3,
                    k: [100, 100]
                  },
                  sa: {
                    a: 0,
                    ix: 5,
                    k: 0
                  },
                  sk: {
                    a: 0,
                    ix: 4,
                    k: 0
                  },
                  ty: "tr"
                }), this.arr.splice(0, 0, l), this._groups.splice(0, 0, l), this._currentCopies += 1
              }
              this.elem.reloadShapes(), n = !0
            }
            for (s = 0, i = 0; i <= this._groups.length - 1; i += 1) {
              if (o = s < h, this._groups[i]._render = o, this.changeGroupRender(this._groups[i].it, o), !o) {
                var p = this.elemsData[i].it,
                  d = p[p.length - 1];
                0 !== d.transform.op.v ? (d.transform.op._mdf = !0, d.transform.op.v = 0) : d.transform.op._mdf = !1
              }
              s += 1
            }
            this._currentCopies = h;
            var c = this.o.v,
              f = c % 1,
              m = c > 0 ? Math.floor(c) : Math.ceil(c),
              u = this.pMatrix.props,
              y = this.rMatrix.props,
              g = this.sMatrix.props;
            this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
            var _, v, b = 0;
            if (c > 0) {
              for (; b < m;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), b += 1;
              f && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, f, !1), b += f)
            } else if (c < 0) {
              for (; b > m;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), b -= 1;
              f && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -f, !0), b -= f)
            }
            for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, a = 1 === this.data.m ? 1 : -1, s = this._currentCopies; s;) {
              if (v = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = 1 === this._currentCopies ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== b) {
                for ((0 !== i && 1 === a || i !== this._currentCopies - 1 && -1 === a) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8], y[9], y[10], y[11], y[12], y[13], y[14], y[15]), this.matrix.transform(g[0], g[1], g[2], g[3], g[4], g[5], g[6], g[7], g[8], g[9], g[10], g[11], g[12], g[13], g[14], g[15]), this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), _ = 0; _ < v; _ += 1) r[_] = this.matrix.props[_];
                this.matrix.reset()
              } else
                for (this.matrix.reset(), _ = 0; _ < v; _ += 1) r[_] = this.matrix.props[_];
              b += 1, s -= 1, i += a
            }
          } else
            for (s = this._currentCopies, i = 0, a = 1; s;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, s -= 1, i += a;
          return n
        }, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
          this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
        }, ShapeCollection.prototype.releaseShapes = function () {
          var t;
          for (t = 0; t < this._length; t += 1) shapePool.release(this.shapes[t]);
          this._length = 0
        }, DashProperty.prototype.getValue = function (t) {
          if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
            var e = 0,
              r = this.dataProps.length;
            for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" !== this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
          }
        }, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
          for (var r = 0, i = this.o.length / 2; r < i;) {
            if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01) return !1;
            r += 1
          }
          return !0
        }, GradientProperty.prototype.checkCollapsable = function () {
          if (this.o.length / 2 != this.c.length / 4) return !1;
          if (this.data.k.k[0].s)
            for (var t = 0, e = this.data.k.k.length; t < e;) {
              if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
              t += 1
            } else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
          return !0
        }, GradientProperty.prototype.getValue = function (t) {
          if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
            var e, r, i, a = 4 * this.data.p;
            for (e = 0; e < a; e += 1) r = e % 4 == 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
            if (this.o.length)
              for (a = this.prop.v.length, e = 4 * this.data.p; e < a; e += 1) r = e % 2 == 0 ? 100 : 1, i = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
            this._mdf = !t
          }
        }, extendPrototype([DynamicPropertyContainer], GradientProperty);
        var buildShapeString = function (t, e, r, i) {
            if (0 === e) return "";
            var a, s = t.o,
              n = t.i,
              o = t.v,
              h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
            for (a = 1; a < e; a += 1) h += " C" + i.applyToPointStringified(s[a - 1][0], s[a - 1][1]) + " " + i.applyToPointStringified(n[a][0], n[a][1]) + " " + i.applyToPointStringified(o[a][0], o[a][1]);
            return r && e && (h += " C" + i.applyToPointStringified(s[a - 1][0], s[a - 1][1]) + " " + i.applyToPointStringified(n[0][0], n[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
          },
          audioControllerFactory = function () {
            function t(t) {
              this.audios = [], this.audioFactory = t, this._volume = 1, this._isMuted = !1
            }
            return t.prototype = {
                addAudio: function (t) {
                  this.audios.push(t)
                },
                pause: function () {
                  var t, e = this.audios.length;
                  for (t = 0; t < e; t += 1) this.audios[t].pause()
                },
                resume: function () {
                  var t, e = this.audios.length;
                  for (t = 0; t < e; t += 1) this.audios[t].resume()
                },
                setRate: function (t) {
                  var e, r = this.audios.length;
                  for (e = 0; e < r; e += 1) this.audios[e].setRate(t)
                },
                createAudio: function (t) {
                  return this.audioFactory ? this.audioFactory(t) : Howl ? new Howl({
                    src: [t]
                  }) : {
                    isPlaying: !1,
                    play: function () {
                      this.isPlaying = !0
                    },
                    seek: function () {
                      this.isPlaying = !1
                    },
                    playing: function () {},
                    rate: function () {},
                    setVolume: function () {}
                  }
                },
                setAudioFactory: function (t) {
                  this.audioFactory = t
                },
                setVolume: function (t) {
                  this._volume = t, this._updateVolume()
                },
                mute: function () {
                  this._isMuted = !0, this._updateVolume()
                },
                unmute: function () {
                  this._isMuted = !1, this._updateVolume()
                },
                getVolume: function () {
                  return this._volume
                },
                _updateVolume: function () {
                  var t, e = this.audios.length;
                  for (t = 0; t < e; t += 1) this.audios[t].volume(this._volume * (this._isMuted ? 0 : 1))
                }
              },
              function () {
                return new t
              }
          }(),
          ImagePreloader = function () {
            var t = function () {
              var t = createTag("canvas");
              t.width = 1, t.height = 1;
              var e = t.getContext("2d");
              return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t
            }();

            function e() {
              this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null)
            }

            function r() {
              this.loadedFootagesCount += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null)
            }

            function i(t, e, r) {
              var i = "";
              if (t.e) i = t.p;
              else if (e) {
                var a = t.p; - 1 !== a.indexOf("images/") && (a = a.split("/")[1]), i = e + a
              } else i = r, i += t.u ? t.u : "", i += t.p;
              return i
            }

            function a(t) {
              var e = 0,
                r = setInterval(function () {
                  (t.getBBox().width || e > 500) && (this._imageLoaded(), clearInterval(r)), e += 1
                }.bind(this), 50)
            }

            function s(t) {
              var e = {
                  assetData: t
                },
                r = i(t, this.assetsPath, this.path);
              return dataManager.loadData(r, function (t) {
                e.img = t, this._footageLoaded()
              }.bind(this), function () {
                e.img = {}, this._footageLoaded()
              }.bind(this)), e
            }

            function n() {
              this._imageLoaded = e.bind(this), this._footageLoaded = r.bind(this), this.testImageLoaded = a.bind(this), this.createFootageData = s.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.totalFootages = 0, this.loadedAssets = 0, this.loadedFootagesCount = 0, this.imagesLoadedCb = null, this.images = []
            }
            return n.prototype = {
              loadAssets: function (t, e) {
                var r;
                this.imagesLoadedCb = e;
                var i = t.length;
                for (r = 0; r < i; r += 1) t[r].layers || (t[r].t && "seq" !== t[r].t ? 3 === t[r].t && (this.totalFootages += 1, this.images.push(this.createFootageData(t[r]))) : (this.totalImages += 1, this.images.push(this._createImageData(t[r]))))
              },
              setAssetsPath: function (t) {
                this.assetsPath = t || ""
              },
              setPath: function (t) {
                this.path = t || ""
              },
              loadedImages: function () {
                return this.totalImages === this.loadedAssets
              },
              loadedFootages: function () {
                return this.totalFootages === this.loadedFootagesCount
              },
              destroy: function () {
                this.imagesLoadedCb = null, this.images.length = 0
              },
              getAsset: function (t) {
                for (var e = 0, r = this.images.length; e < r;) {
                  if (this.images[e].assetData === t) return this.images[e].img;
                  e += 1
                }
                return null
              },
              createImgData: function (e) {
                var r = i(e, this.assetsPath, this.path),
                  a = createTag("img");
                a.crossOrigin = "anonymous", a.addEventListener("load", this._imageLoaded, !1), a.addEventListener("error", function () {
                  s.img = t, this._imageLoaded()
                }.bind(this), !1), a.src = r;
                var s = {
                  img: a,
                  assetData: e
                };
                return s
              },
              createImageData: function (e) {
                var r = i(e, this.assetsPath, this.path),
                  a = createNS("image");
                isSafari ? this.testImageLoaded(a) : a.addEventListener("load", this._imageLoaded, !1), a.addEventListener("error", function () {
                  s.img = t, this._imageLoaded()
                }.bind(this), !1), a.setAttributeNS("http://www.w3.org/1999/xlink", "href", r), this._elementHelper.append ? this._elementHelper.append(a) : this._elementHelper.appendChild(a);
                var s = {
                  img: a,
                  assetData: e
                };
                return s
              },
              imageLoaded: e,
              footageLoaded: r,
              setCacheType: function (t, e) {
                "svg" === t ? (this._elementHelper = e, this._createImageData = this.createImageData.bind(this)) : this._createImageData = this.createImgData.bind(this)
              }
            }, n
          }(),
          featureSupport = function () {
            var t = {
              maskType: !0
            };
            return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t
          }(),
          filtersFactory = function () {
            var t = {};
            return t.createFilter = function (t, e) {
              var r = createNS("filter");
              r.setAttribute("id", t), !0 !== e && (r.setAttribute("filterUnits", "objectBoundingBox"), r.setAttribute("x", "0%"), r.setAttribute("y", "0%"), r.setAttribute("width", "100%"), r.setAttribute("height", "100%"));
              return r
            }, t.createAlphaToLuminanceFilter = function () {
              var t = createNS("feColorMatrix");
              return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
            }, t
          }();

        function TextAnimatorProperty(t, e, r) {
          this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
            alignment: {}
          }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r)
        }

        function TextAnimatorDataProperty(t, e, r) {
          var i = {
              propType: !1
            },
            a = PropertyFactory.getProp,
            s = e.a;
          this.a = {
            r: s.r ? a(t, s.r, 0, degToRads, r) : i,
            rx: s.rx ? a(t, s.rx, 0, degToRads, r) : i,
            ry: s.ry ? a(t, s.ry, 0, degToRads, r) : i,
            sk: s.sk ? a(t, s.sk, 0, degToRads, r) : i,
            sa: s.sa ? a(t, s.sa, 0, degToRads, r) : i,
            s: s.s ? a(t, s.s, 1, .01, r) : i,
            a: s.a ? a(t, s.a, 1, 0, r) : i,
            o: s.o ? a(t, s.o, 0, .01, r) : i,
            p: s.p ? a(t, s.p, 1, 0, r) : i,
            sw: s.sw ? a(t, s.sw, 0, 0, r) : i,
            sc: s.sc ? a(t, s.sc, 1, 0, r) : i,
            fc: s.fc ? a(t, s.fc, 1, 0, r) : i,
            fh: s.fh ? a(t, s.fh, 0, 0, r) : i,
            fs: s.fs ? a(t, s.fs, 0, .01, r) : i,
            fb: s.fb ? a(t, s.fb, 0, .01, r) : i,
            t: s.t ? a(t, s.t, 0, 0, r) : i
          }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t
        }

        function LetterProps(t, e, r, i, a, s) {
          this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = a, this.p = s, this._mdf = {
            o: !0,
            sw: !!e,
            sc: !!r,
            fc: !!i,
            m: !0,
            p: !0
          }
        }

        function TextProperty(t, e) {
          this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
            ascent: 0,
            boxWidth: this.defaultBoxWidth,
            f: "",
            fStyle: "",
            fWeight: "",
            fc: "",
            j: "",
            justifyOffset: "",
            l: [],
            lh: 0,
            lineWidths: [],
            ls: "",
            of: "",
            s: "",
            sc: "",
            sw: 0,
            t: 0,
            tr: 0,
            sz: 0,
            ps: null,
            fillColorAnim: !1,
            strokeColorAnim: !1,
            strokeWidthAnim: !1,
            yOffset: 0,
            finalSize: 0,
            finalText: [],
            finalLineHeight: 0,
            __complete: !1
          }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
        }
        TextAnimatorProperty.prototype.searchProperties = function () {
          var t, e, r = this._textData.a.length,
            i = PropertyFactory.getProp;
          for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
          this._textData.p && "m" in this._textData.p ? (this._pathData = {
            a: i(this._elem, this._textData.p.a, 0, 0, this),
            f: i(this._elem, this._textData.p.f, 0, 0, this),
            l: i(this._elem, this._textData.p.l, 0, 0, this),
            r: i(this._elem, this._textData.p.r, 0, 0, this),
            p: i(this._elem, this._textData.p.p, 0, 0, this),
            m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
          }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
        }, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
          if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
            this._isFirstFrame = !1;
            var r, i, a, s, n, o, h, l, p, d, c, f, m, u, y, g, _, v, b, E = this._moreOptions.alignment.v,
              S = this._animatorsData,
              P = this._textData,
              x = this.mHelper,
              T = this._renderType,
              A = this.renderedLetters.length,
              C = t.l;
            if (this._hasMaskedPath) {
              if (b = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
                var w, k = b.v;
                for (this._pathData.r.v && (k = k.reverse()), n = {
                    tLength: 0,
                    segments: []
                  }, s = k._length - 1, g = 0, a = 0; a < s; a += 1) w = bez.buildBezierData(k.v[a], k.v[a + 1], [k.o[a][0] - k.v[a][0], k.o[a][1] - k.v[a][1]], [k.i[a + 1][0] - k.v[a + 1][0], k.i[a + 1][1] - k.v[a + 1][1]]), n.tLength += w.segmentLength, n.segments.push(w), g += w.segmentLength;
                a = s, b.v.c && (w = bez.buildBezierData(k.v[a], k.v[0], [k.o[a][0] - k.v[a][0], k.o[a][1] - k.v[a][1]], [k.i[0][0] - k.v[0][0], k.i[0][1] - k.v[0][1]]), n.tLength += w.segmentLength, n.segments.push(w), g += w.segmentLength), this._pathData.pi = n
              }
              if (n = this._pathData.pi, o = this._pathData.f.v, c = 0, d = 1, l = 0, p = !0, u = n.segments, o < 0 && b.v.c)
                for (n.tLength < Math.abs(o) && (o = -Math.abs(o) % n.tLength), d = (m = u[c = u.length - 1].points).length - 1; o < 0;) o += m[d].partialLength, (d -= 1) < 0 && (d = (m = u[c -= 1].points).length - 1);
              f = (m = u[c].points)[d - 1], y = (h = m[d]).partialLength
            }
            s = C.length, r = 0, i = 0;
            var D, M, I, F, R, B = 1.2 * t.finalSize * .714,
              L = !0;
            I = S.length;
            var N, O, V, z, H, G, Z, $, j, U, q, Y, K = -1,
              X = o,
              W = c,
              J = d,
              Q = -1,
              tt = "",
              et = this.defaultPropsArray;
            if (2 === t.j || 1 === t.j) {
              var rt = 0,
                it = 0,
                at = 2 === t.j ? -.5 : -1,
                st = 0,
                nt = !0;
              for (a = 0; a < s; a += 1)
                if (C[a].n) {
                  for (rt && (rt += it); st < a;) C[st].animatorJustifyOffset = rt, st += 1;
                  rt = 0, nt = !0
                } else {
                  for (M = 0; M < I; M += 1)(D = S[M].a).t.propType && (nt && 2 === t.j && (it += D.t.v * at), (R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars)).length ? rt += D.t.v * R[0] * at : rt += D.t.v * R * at);
                  nt = !1
                } for (rt && (rt += it); st < a;) C[st].animatorJustifyOffset = rt, st += 1
            }
            for (a = 0; a < s; a += 1) {
              if (x.reset(), z = 1, C[a].n) r = 0, i += t.yOffset, i += L ? 1 : 0, o = X, L = !1, this._hasMaskedPath && (d = J, f = (m = u[c = W].points)[d - 1], y = (h = m[d]).partialLength, l = 0), tt = "", q = "", j = "", Y = "", et = this.defaultPropsArray;
              else {
                if (this._hasMaskedPath) {
                  if (Q !== C[a].line) {
                    switch (t.j) {
                      case 1:
                        o += g - t.lineWidths[C[a].line];
                        break;
                      case 2:
                        o += (g - t.lineWidths[C[a].line]) / 2
                    }
                    Q = C[a].line
                  }
                  K !== C[a].ind && (C[K] && (o += C[K].extra), o += C[a].an / 2, K = C[a].ind), o += E[0] * C[a].an * .005;
                  var ot = 0;
                  for (M = 0; M < I; M += 1)(D = S[M].a).p.propType && ((R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars)).length ? ot += D.p.v[0] * R[0] : ot += D.p.v[0] * R), D.a.propType && ((R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars)).length ? ot += D.a.v[0] * R[0] : ot += D.a.v[0] * R);
                  for (p = !0, this._pathData.a.v && (o = .5 * C[0].an + (g - this._pathData.f.v - .5 * C[0].an - .5 * C[C.length - 1].an) * K / (s - 1), o += this._pathData.f.v); p;) l + y >= o + ot || !m ? (_ = (o + ot - l) / h.partialLength, O = f.point[0] + (h.point[0] - f.point[0]) * _, V = f.point[1] + (h.point[1] - f.point[1]) * _, x.translate(-E[0] * C[a].an * .005, -E[1] * B * .01), p = !1) : m && (l += h.partialLength, (d += 1) >= m.length && (d = 0, u[c += 1] ? m = u[c].points : b.v.c ? (d = 0, m = u[c = 0].points) : (l -= h.partialLength, m = null)), m && (f = h, y = (h = m[d]).partialLength));
                  N = C[a].an / 2 - C[a].add, x.translate(-N, 0, 0)
                } else N = C[a].an / 2 - C[a].add, x.translate(-N, 0, 0), x.translate(-E[0] * C[a].an * .005, -E[1] * B * .01, 0);
                for (M = 0; M < I; M += 1)(D = S[M].a).t.propType && (R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? R.length ? o += D.t.v * R[0] : o += D.t.v * R : R.length ? r += D.t.v * R[0] : r += D.t.v * R));
                for (t.strokeWidthAnim && (G = t.sw || 0), t.strokeColorAnim && (H = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (Z = [t.fc[0], t.fc[1], t.fc[2]]), M = 0; M < I; M += 1)(D = S[M].a).a.propType && ((R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars)).length ? x.translate(-D.a.v[0] * R[0], -D.a.v[1] * R[1], D.a.v[2] * R[2]) : x.translate(-D.a.v[0] * R, -D.a.v[1] * R, D.a.v[2] * R));
                for (M = 0; M < I; M += 1)(D = S[M].a).s.propType && ((R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars)).length ? x.scale(1 + (D.s.v[0] - 1) * R[0], 1 + (D.s.v[1] - 1) * R[1], 1) : x.scale(1 + (D.s.v[0] - 1) * R, 1 + (D.s.v[1] - 1) * R, 1));
                for (M = 0; M < I; M += 1) {
                  if (D = S[M].a, R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars), D.sk.propType && (R.length ? x.skewFromAxis(-D.sk.v * R[0], D.sa.v * R[1]) : x.skewFromAxis(-D.sk.v * R, D.sa.v * R)), D.r.propType && (R.length ? x.rotateZ(-D.r.v * R[2]) : x.rotateZ(-D.r.v * R)), D.ry.propType && (R.length ? x.rotateY(D.ry.v * R[1]) : x.rotateY(D.ry.v * R)), D.rx.propType && (R.length ? x.rotateX(D.rx.v * R[0]) : x.rotateX(D.rx.v * R)), D.o.propType && (R.length ? z += (D.o.v * R[0] - z) * R[0] : z += (D.o.v * R - z) * R), t.strokeWidthAnim && D.sw.propType && (R.length ? G += D.sw.v * R[0] : G += D.sw.v * R), t.strokeColorAnim && D.sc.propType)
                    for ($ = 0; $ < 3; $ += 1) R.length ? H[$] += (D.sc.v[$] - H[$]) * R[0] : H[$] += (D.sc.v[$] - H[$]) * R;
                  if (t.fillColorAnim && t.fc) {
                    if (D.fc.propType)
                      for ($ = 0; $ < 3; $ += 1) R.length ? Z[$] += (D.fc.v[$] - Z[$]) * R[0] : Z[$] += (D.fc.v[$] - Z[$]) * R;
                    D.fh.propType && (Z = R.length ? addHueToRGB(Z, D.fh.v * R[0]) : addHueToRGB(Z, D.fh.v * R)), D.fs.propType && (Z = R.length ? addSaturationToRGB(Z, D.fs.v * R[0]) : addSaturationToRGB(Z, D.fs.v * R)), D.fb.propType && (Z = R.length ? addBrightnessToRGB(Z, D.fb.v * R[0]) : addBrightnessToRGB(Z, D.fb.v * R))
                  }
                }
                for (M = 0; M < I; M += 1)(D = S[M].a).p.propType && (R = S[M].s.getMult(C[a].anIndexes[M], P.a[M].s.totalChars), this._hasMaskedPath ? R.length ? x.translate(0, D.p.v[1] * R[0], -D.p.v[2] * R[1]) : x.translate(0, D.p.v[1] * R, -D.p.v[2] * R) : R.length ? x.translate(D.p.v[0] * R[0], D.p.v[1] * R[1], -D.p.v[2] * R[2]) : x.translate(D.p.v[0] * R, D.p.v[1] * R, -D.p.v[2] * R));
                if (t.strokeWidthAnim && (j = G < 0 ? 0 : G), t.strokeColorAnim && (U = "rgb(" + Math.round(255 * H[0]) + "," + Math.round(255 * H[1]) + "," + Math.round(255 * H[2]) + ")"), t.fillColorAnim && t.fc && (q = "rgb(" + Math.round(255 * Z[0]) + "," + Math.round(255 * Z[1]) + "," + Math.round(255 * Z[2]) + ")"), this._hasMaskedPath) {
                  if (x.translate(0, -t.ls), x.translate(0, E[1] * B * .01 + i, 0), this._pathData.p.v) {
                    v = (h.point[1] - f.point[1]) / (h.point[0] - f.point[0]);
                    var ht = 180 * Math.atan(v) / Math.PI;
                    h.point[0] < f.point[0] && (ht += 180), x.rotate(-ht * Math.PI / 180)
                  }
                  x.translate(O, V, 0), o -= E[0] * C[a].an * .005, C[a + 1] && K !== C[a + 1].ind && (o += C[a].an / 2, o += .001 * t.tr * t.finalSize)
                } else {
                  switch (x.translate(r, i, 0), t.ps && x.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                    case 1:
                      x.translate(C[a].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[C[a].line]), 0, 0);
                      break;
                    case 2:
                      x.translate(C[a].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[C[a].line]) / 2, 0, 0)
                  }
                  x.translate(0, -t.ls), x.translate(N, 0, 0), x.translate(E[0] * C[a].an * .005, E[1] * B * .01, 0), r += C[a].l + .001 * t.tr * t.finalSize
                }
                "html" === T ? tt = x.toCSS() : "svg" === T ? tt = x.to2dCSS() : et = [x.props[0], x.props[1], x.props[2], x.props[3], x.props[4], x.props[5], x.props[6], x.props[7], x.props[8], x.props[9], x.props[10], x.props[11], x.props[12], x.props[13], x.props[14], x.props[15]], Y = z
              }
              A <= a ? (F = new LetterProps(Y, j, U, q, tt, et), this.renderedLetters.push(F), A += 1, this.lettersChangedFlag = !0) : (F = this.renderedLetters[a], this.lettersChangedFlag = F.update(Y, j, U, q, tt, et) || this.lettersChangedFlag)
            }
          }
        }, TextAnimatorProperty.prototype.getValue = function () {
          this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
        }, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, a, s) {
          this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
          var n = !1;
          return this.o !== t && (this.o = t, this._mdf.o = !0, n = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, n = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, n = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, n = !0), this.m !== a && (this.m = a, this._mdf.m = !0, n = !0), !s.length || this.p[0] === s[0] && this.p[1] === s[1] && this.p[4] === s[4] && this.p[5] === s[5] && this.p[12] === s[12] && this.p[13] === s[13] || (this.p = s, this._mdf.p = !0, n = !0), n
        }, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
          return t
        }, TextProperty.prototype.setCurrentData = function (t) {
          t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
        }, TextProperty.prototype.searchProperty = function () {
          return this.searchKeyframes()
        }, TextProperty.prototype.searchKeyframes = function () {
          return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
        }, TextProperty.prototype.addEffect = function (t) {
          this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
        }, TextProperty.prototype.getValue = function (t) {
          if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
            this.currentData.t = this.data.d.k[this.keysIndex].s.t;
            var e = this.currentData,
              r = this.keysIndex;
            if (this.lock) this.setCurrentData(this.currentData);
            else {
              var i;
              this.lock = !0, this._mdf = !1;
              var a = this.effectsSequence.length,
                s = t || this.data.d.k[this.keysIndex].s;
              for (i = 0; i < a; i += 1) s = r !== this.keysIndex ? this.effectsSequence[i](s, s.t) : this.effectsSequence[i](this.currentData, s.t);
              e !== s && this.setCurrentData(s), this.v = this.currentData, this.pv = this.v, this.lock = !1, this.frameId = this.elem.globalData.frameId
            }
          }
        }, TextProperty.prototype.getKeyframeValue = function () {
          for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && !(r === i - 1 || t[r + 1].t > e);) r += 1;
          return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
        }, TextProperty.prototype.buildFinalText = function (t) {
          for (var e, r, i = [], a = 0, s = t.length, n = !1; a < s;) e = t.charCodeAt(a), FontManager.isCombinedCharacter(e) ? i[i.length - 1] += t.charAt(a) : e >= 55296 && e <= 56319 ? (r = t.charCodeAt(a + 1)) >= 56320 && r <= 57343 ? (n || FontManager.isModifier(e, r) ? (i[i.length - 1] += t.substr(a, 2), n = !1) : i.push(t.substr(a, 2)), a += 1) : i.push(t.charAt(a)) : e > 56319 ? (r = t.charCodeAt(a + 1), FontManager.isZeroWidthJoiner(e, r) ? (n = !0, i[i.length - 1] += t.substr(a, 2), a += 1) : i.push(t.charAt(a))) : FontManager.isZeroWidthJoiner(e) ? (i[i.length - 1] += t.charAt(a), n = !0) : i.push(t.charAt(a)), a += 1;
          return i
        }, TextProperty.prototype.completeTextData = function (t) {
          t.__complete = !0;
          var e, r, i, a, s, n, o, h = this.elem.globalData.fontManager,
            l = this.data,
            p = [],
            d = 0,
            c = l.m.g,
            f = 0,
            m = 0,
            u = 0,
            y = [],
            g = 0,
            _ = 0,
            v = h.getFontByName(t.f),
            b = 0,
            E = getFontProperties(v);
          t.fWeight = E.weight, t.fStyle = E.style, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
          var S, P = t.tr / 1e3 * t.finalSize;
          if (t.sz)
            for (var x, T, A = !0, C = t.sz[0], w = t.sz[1]; A;) {
              x = 0, g = 0, r = (T = this.buildFinalText(t.t)).length, P = t.tr / 1e3 * t.finalSize;
              var k = -1;
              for (e = 0; e < r; e += 1) S = T[e].charCodeAt(0), i = !1, " " === T[e] ? k = e : 13 !== S && 3 !== S || (g = 0, i = !0, x += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(T[e], v.fStyle, v.fFamily), b = i ? 0 : o.w * t.finalSize / 100) : b = h.measureText(T[e], t.f, t.finalSize), g + b > C && " " !== T[e] ? (-1 === k ? r += 1 : e = k, x += t.finalLineHeight || 1.2 * t.finalSize, T.splice(e, k === e ? 1 : 0, "\r"), k = -1, g = 0) : (g += b, g += P);
              x += v.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && w < x ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = T, r = t.finalText.length, A = !1)
            }
          g = -P, b = 0;
          var D, M = 0;
          for (e = 0; e < r; e += 1)
            if (i = !1, 13 === (S = (D = t.finalText[e]).charCodeAt(0)) || 3 === S ? (M = 0, y.push(g), _ = g > _ ? g : _, g = -2 * P, a = "", i = !0, u += 1) : a = D, h.chars ? (o = h.getCharData(D, v.fStyle, h.getFontByName(t.f).fFamily), b = i ? 0 : o.w * t.finalSize / 100) : b = h.measureText(a, t.f, t.finalSize), " " === D ? M += b + P : (g += b + P + M, M = 0), p.push({
                l: b,
                an: b,
                add: f,
                n: i,
                anIndexes: [],
                val: a,
                line: u,
                animatorJustifyOffset: 0
              }), 2 == c) {
              if (f += b, "" === a || " " === a || e === r - 1) {
                for ("" !== a && " " !== a || (f -= b); m <= e;) p[m].an = f, p[m].ind = d, p[m].extra = b, m += 1;
                d += 1, f = 0
              }
            } else if (3 == c) {
            if (f += b, "" === a || e === r - 1) {
              for ("" === a && (f -= b); m <= e;) p[m].an = f, p[m].ind = d, p[m].extra = b, m += 1;
              f = 0, d += 1
            }
          } else p[d].ind = d, p[d].extra = 0, d += 1;
          if (t.l = p, _ = g > _ ? g : _, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
          else switch (t.boxWidth = _, t.j) {
            case 1:
              t.justifyOffset = -t.boxWidth;
              break;
            case 2:
              t.justifyOffset = -t.boxWidth / 2;
              break;
            default:
              t.justifyOffset = 0
          }
          t.lineWidths = y;
          var I, F, R, B, L = l.a;
          n = L.length;
          var N = [];
          for (s = 0; s < n; s += 1) {
            for ((I = L[s]).a.sc && (t.strokeColorAnim = !0), I.a.sw && (t.strokeWidthAnim = !0), (I.a.fc || I.a.fh || I.a.fs || I.a.fb) && (t.fillColorAnim = !0), B = 0, R = I.s.b, e = 0; e < r; e += 1)(F = p[e]).anIndexes[s] = B, (1 == R && "" !== F.val || 2 == R && "" !== F.val && " " !== F.val || 3 == R && (F.n || " " == F.val || e == r - 1) || 4 == R && (F.n || e == r - 1)) && (1 === I.s.rn && N.push(B), B += 1);
            l.a[s].s.totalChars = B;
            var O, V = -1;
            if (1 === I.s.rn)
              for (e = 0; e < r; e += 1) V != (F = p[e]).anIndexes[s] && (V = F.anIndexes[s], O = N.splice(Math.floor(Math.random() * N.length), 1)[0]), F.anIndexes[s] = O
          }
          t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = v.ascent * t.finalSize / 100
        }, TextProperty.prototype.updateDocumentData = function (t, e) {
          e = void 0 === e ? this.keysIndex : e;
          var r = this.copyData({}, this.data.d.k[e].s);
          r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this)
        }, TextProperty.prototype.recalculate = function (t) {
          var e = this.data.d.k[t].s;
          e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
        }, TextProperty.prototype.canResizeFont = function (t) {
          this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
        }, TextProperty.prototype.setMinimumFontSize = function (t) {
          this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
        };
        var TextSelectorProp = function () {
            var t = Math.max,
              e = Math.min,
              r = Math.floor;

            function i(t, e) {
              this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
                k: 0
              }, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
                v: 100
              }, this.o = PropertyFactory.getProp(t, e.o || {
                k: 0
              }, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
                k: 0
              }, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
                k: 0
              }, 0, 0, this), this.sm = PropertyFactory.getProp(t, e.sm || {
                k: 100
              }, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
            }
            return i.prototype = {
              getMult: function (i) {
                this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                var a = 0,
                  s = 0,
                  n = 1,
                  o = 1;
                this.ne.v > 0 ? a = this.ne.v / 100 : s = -this.ne.v / 100, this.xe.v > 0 ? n = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
                var h = BezierFactory.getBezierEasing(a, s, n, o).get,
                  l = 0,
                  p = this.finalS,
                  d = this.finalE,
                  c = this.data.sh;
                if (2 === c) l = h(l = d === p ? i >= d ? 1 : 0 : t(0, e(.5 / (d - p) + (i - p) / (d - p), 1)));
                else if (3 === c) l = h(l = d === p ? i >= d ? 0 : 1 : 1 - t(0, e(.5 / (d - p) + (i - p) / (d - p), 1)));
                else if (4 === c) d === p ? l = 0 : (l = t(0, e(.5 / (d - p) + (i - p) / (d - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5), l = h(l);
                else if (5 === c) {
                  if (d === p) l = 0;
                  else {
                    var f = d - p,
                      m = -f / 2 + (i = e(t(0, i + .5 - p), d - p)),
                      u = f / 2;
                    l = Math.sqrt(1 - m * m / (u * u))
                  }
                  l = h(l)
                } else 6 === c ? (d === p ? l = 0 : (i = e(t(0, i + .5 - p), d - p), l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (d - p))) / 2), l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(d, 1) - (p - i) : d - i, 1))), l = h(l));
                if (100 !== this.sm.v) {
                  var y = .01 * this.sm.v;
                  0 === y && (y = 1e-8);
                  var g = .5 - .5 * y;
                  l < g ? l = 0 : (l = (l - g) / y) > 1 && (l = 1)
                }
                return l * this.a.v
              },
              getValue: function (t) {
                this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                  r = this.o.v / e,
                  i = this.s.v / e + r,
                  a = this.e.v / e + r;
                if (i > a) {
                  var s = i;
                  i = a, a = s
                }
                this.finalS = i, this.finalE = a
              }
            }, extendPrototype([DynamicPropertyContainer], i), {
              getTextSelectorProp: function (t, e, r) {
                return new i(t, e, r)
              }
            }
          }(),
          poolFactory = function (t, e, r) {
            var i = 0,
              a = t,
              s = createSizedArray(a);
            return {
              newElement: function () {
                return i ? s[i -= 1] : e()
              },
              release: function (t) {
                i === a && (s = pooling.double(s), a *= 2), r && r(t), s[i] = t, i += 1
              }
            }
          },
          pooling = {
            double: function (t) {
              return t.concat(createSizedArray(t.length))
            }
          },
          pointPool = poolFactory(8, (function () {
            return createTypedArray("float32", 2)
          })),
          shapePool = (factory = poolFactory(4, (function () {
            return new ShapePath
          }), (function (t) {
            var e, r = t._length;
            for (e = 0; e < r; e += 1) pointPool.release(t.v[e]), pointPool.release(t.i[e]), pointPool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
            t._length = 0, t.c = !1
          })), factory.clone = function (t) {
            var e, r = factory.newElement(),
              i = void 0 === t._length ? t.v.length : t._length;
            for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
            return r
          }, factory),
          factory, shapeCollectionPool = function () {
            var t = {
                newShapeCollection: function () {
                  var t;
                  t = e ? i[e -= 1] : new ShapeCollection;
                  return t
                },
                release: function (t) {
                  var a, s = t._length;
                  for (a = 0; a < s; a += 1) shapePool.release(t.shapes[a]);
                  t._length = 0, e === r && (i = pooling.double(i), r *= 2);
                  i[e] = t, e += 1
                }
              },
              e = 0,
              r = 4,
              i = createSizedArray(r);
            return t
          }(),
          segmentsLengthPool = poolFactory(8, (function () {
            return {
              lengths: [],
              totalLength: 0
            }
          }), (function (t) {
            var e, r = t.lengths.length;
            for (e = 0; e < r; e += 1) bezierLengthPool.release(t.lengths[e]);
            t.lengths.length = 0
          })),
          bezierLengthPool = poolFactory(8, (function () {
            return {
              addedLength: 0,
              percents: createTypedArray("float32", defaultCurveSegments),
              lengths: createTypedArray("float32", defaultCurveSegments)
            }
          })),
          markerParser = function () {
            function t(t) {
              for (var e, r = t.split("\r\n"), i = {}, a = 0, s = 0; s < r.length; s += 1) 2 === (e = r[s].split(":")).length && (i[e[0]] = e[1].trim(), a += 1);
              if (0 === a) throw new Error;
              return i
            }
            return function (e) {
              for (var r = [], i = 0; i < e.length; i += 1) {
                var a = e[i],
                  s = {
                    time: a.tm,
                    duration: a.dr
                  };
                try {
                  s.payload = JSON.parse(e[i].cm)
                } catch (r) {
                  try {
                    s.payload = t(e[i].cm)
                  } catch (t) {
                    s.payload = {
                      name: e[i]
                    }
                  }
                }
                r.push(s)
              }
              return r
            }
          }();

        function BaseRenderer() {}

        function SVGRenderer(t, e) {
          this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
          var r = "";
          if (e && e.title) {
            var i = createNS("title"),
              a = createElementID();
            i.setAttribute("id", a), i.textContent = e.title, this.svgElement.appendChild(i), r += a
          }
          if (e && e.description) {
            var s = createNS("desc"),
              n = createElementID();
            s.setAttribute("id", n), s.textContent = e.description, this.svgElement.appendChild(s), r += " " + n
          }
          r && this.svgElement.setAttribute("aria-labelledby", r);
          var o = createNS("defs");
          this.svgElement.appendChild(o);
          var h = createNS("g");
          this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
            imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
            contentVisibility: e && e.contentVisibility || "visible",
            progressiveLoad: e && e.progressiveLoad || !1,
            hideOnTransparent: !(e && !1 === e.hideOnTransparent),
            viewBoxOnly: e && e.viewBoxOnly || !1,
            viewBoxSize: e && e.viewBoxSize || !1,
            className: e && e.className || "",
            id: e && e.id || "",
            focusable: e && e.focusable,
            filterSize: {
              width: e && e.filterSize && e.filterSize.width || "100%",
              height: e && e.filterSize && e.filterSize.height || "100%",
              x: e && e.filterSize && e.filterSize.x || "0%",
              y: e && e.filterSize && e.filterSize.y || "0%"
            }
          }, this.globalData = {
            _mdf: !1,
            frameNum: -1,
            defs: o,
            renderConfig: this.renderConfig
          }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
        }

        function CanvasRenderer(t, e) {
          this.animationItem = t, this.renderConfig = {
            clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
            context: e && e.context || null,
            progressiveLoad: e && e.progressiveLoad || !1,
            preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
            imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
            contentVisibility: e && e.contentVisibility || "visible",
            className: e && e.className || "",
            id: e && e.id || ""
          }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
            frameNum: -1,
            _mdf: !1,
            renderConfig: this.renderConfig,
            currentGlobalAlpha: -1
          }, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
        }

        function HybridRenderer(t, e) {
          this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
            className: e && e.className || "",
            imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
            hideOnTransparent: !(e && !1 === e.hideOnTransparent),
            filterSize: {
              width: e && e.filterSize && e.filterSize.width || "400%",
              height: e && e.filterSize && e.filterSize.height || "400%",
              x: e && e.filterSize && e.filterSize.x || "-100%",
              y: e && e.filterSize && e.filterSize.y || "-100%"
            }
          }, this.globalData = {
            _mdf: !1,
            frameNum: -1,
            renderConfig: this.renderConfig
          }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
        }

        function MaskElement(t, e, r) {
          this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
          var i, a, s = this.globalData.defs,
            n = this.masksProperties ? this.masksProperties.length : 0;
          this.viewData = createSizedArray(n), this.solidPath = "";
          var o, h, l, p, d, c, f = this.masksProperties,
            m = 0,
            u = [],
            y = createElementID(),
            g = "clipPath",
            _ = "clip-path";
          for (i = 0; i < n; i += 1)
            if (("a" !== f[i].mode && "n" !== f[i].mode || f[i].inv || 100 !== f[i].o.k || f[i].o.x) && (g = "mask", _ = "mask"), "s" !== f[i].mode && "i" !== f[i].mode || 0 !== m ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), u.push(l)), a = createNS("path"), "n" === f[i].mode) this.viewData[i] = {
              op: PropertyFactory.getProp(this.element, f[i].o, 0, .01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, f[i], 3),
              elem: a,
              lastPath: ""
            }, s.appendChild(a);
            else {
              var v;
              if (m += 1, a.setAttribute("fill", "s" === f[i].mode ? "#000000" : "#ffffff"), a.setAttribute("clip-rule", "nonzero"), 0 !== f[i].x.k ? (g = "mask", _ = "mask", c = PropertyFactory.getProp(this.element, f[i].x, 0, null, this.element), v = createElementID(), (p = createNS("filter")).setAttribute("id", v), (d = createNS("feMorphology")).setAttribute("operator", "erode"), d.setAttribute("in", "SourceGraphic"), d.setAttribute("radius", "0"), p.appendChild(d), s.appendChild(p), a.setAttribute("stroke", "s" === f[i].mode ? "#000000" : "#ffffff")) : (d = null, c = null), this.storedData[i] = {
                  elem: a,
                  x: c,
                  expan: d,
                  lastPath: "",
                  lastOperator: "",
                  filterId: v,
                  lastRadius: 0
                }, "i" === f[i].mode) {
                h = u.length;
                var b = createNS("g");
                for (o = 0; o < h; o += 1) b.appendChild(u[o]);
                var E = createNS("mask");
                E.setAttribute("mask-type", "alpha"), E.setAttribute("id", y + "_" + m), E.appendChild(a), s.appendChild(E), b.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + m + ")"), u.length = 0, u.push(b)
              } else u.push(a);
              f[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
                elem: a,
                lastPath: "",
                op: PropertyFactory.getProp(this.element, f[i].o, 0, .01, this.element),
                prop: ShapePropertyFactory.getShapeProp(this.element, f[i], 3),
                invRect: l
              }, this.viewData[i].prop.k || this.drawPath(f[i], this.viewData[i].prop.v, this.viewData[i])
            } for (this.maskElement = createNS(g), n = u.length, i = 0; i < n; i += 1) this.maskElement.appendChild(u[i]);
          m > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(_, "url(" + locationHref + "#" + y + ")"), s.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
        }

        function HierarchyElement() {}

        function FrameElement() {}

        function TransformElement() {}

        function RenderableElement() {}

        function RenderableDOMElement() {}

        function ProcessedElement(t, e) {
          this.elem = t, this.pos = e
        }

        function SVGStyleData(t, e) {
          this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null
        }

        function SVGShapeData(t, e, r) {
          this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
          for (var i = 0, a = t.length; i < a;) {
            if (t[i].mProps.dynamicProperties.length) {
              this._isAnimated = !0;
              break
            }
            i += 1
          }
        }

        function SVGTransformData(t, e, r) {
          this.transform = {
            mProps: t,
            op: e,
            container: r
          }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
        }

        function SVGStrokeStyleData(t, e, r) {
          this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated
        }

        function SVGFillStyleData(t, e, r) {
          this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r
        }

        function SVGGradientFillStyleData(t, e, r) {
          this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r)
        }

        function SVGGradientStrokeStyleData(t, e, r) {
          this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated
        }

        function ShapeGroupData() {
          this.it = [], this.prevViewData = [], this.gr = createNS("g")
        }
        BaseRenderer.prototype.checkLayers = function (t) {
          var e, r, i = this.layers.length;
          for (this.completeLayers = !0, e = i - 1; e >= 0; e -= 1) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
          this.checkPendingElements()
        }, BaseRenderer.prototype.createItem = function (t) {
          switch (t.ty) {
            case 2:
              return this.createImage(t);
            case 0:
              return this.createComp(t);
            case 1:
              return this.createSolid(t);
            case 3:
              return this.createNull(t);
            case 4:
              return this.createShape(t);
            case 5:
              return this.createText(t);
            case 6:
              return this.createAudio(t);
            case 13:
              return this.createCamera(t);
            case 15:
              return this.createFootage(t);
            default:
              return this.createNull(t)
          }
        }, BaseRenderer.prototype.createCamera = function () {
          throw new Error("You're using a 3d camera. Try the html renderer.")
        }, BaseRenderer.prototype.createAudio = function (t) {
          return new AudioElement(t, this.globalData, this)
        }, BaseRenderer.prototype.createFootage = function (t) {
          return new FootageElement(t, this.globalData, this)
        }, BaseRenderer.prototype.buildAllItems = function () {
          var t, e = this.layers.length;
          for (t = 0; t < e; t += 1) this.buildItem(t);
          this.checkPendingElements()
        }, BaseRenderer.prototype.includeLayers = function (t) {
          var e;
          this.completeLayers = !1;
          var r, i = t.length,
            a = this.layers.length;
          for (e = 0; e < i; e += 1)
            for (r = 0; r < a;) {
              if (this.layers[r].id === t[e].id) {
                this.layers[r] = t[e];
                break
              }
              r += 1
            }
        }, BaseRenderer.prototype.setProjectInterface = function (t) {
          this.globalData.projectInterface = t
        }, BaseRenderer.prototype.initItems = function () {
          this.globalData.progressiveLoad || this.buildAllItems()
        }, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
          for (var i = this.elements, a = this.layers, s = 0, n = a.length; s < n;) a[s].ind == e && (i[s] && !0 !== i[s] ? (r.push(i[s]), i[s].setAsParent(), void 0 !== a[s].parent ? this.buildElementParenting(t, a[s].parent, r) : t.setHierarchy(r)) : (this.buildItem(s), this.addPendingElement(t))), s += 1
        }, BaseRenderer.prototype.addPendingElement = function (t) {
          this.pendingElements.push(t)
        }, BaseRenderer.prototype.searchExtraCompositions = function (t) {
          var e, r = t.length;
          for (e = 0; e < r; e += 1)
            if (t[e].xt) {
              var i = this.createComp(t[e]);
              i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
            }
        }, BaseRenderer.prototype.setupGlobalData = function (t, e) {
          this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.audioController = this.animationItem.audioController, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
            w: t.w,
            h: t.h
          }
        }, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
          return new NullElement(t, this.globalData, this)
        }, SVGRenderer.prototype.createShape = function (t) {
          return new SVGShapeElement(t, this.globalData, this)
        }, SVGRenderer.prototype.createText = function (t) {
          return new SVGTextLottieElement(t, this.globalData, this)
        }, SVGRenderer.prototype.createImage = function (t) {
          return new IImageElement(t, this.globalData, this)
        }, SVGRenderer.prototype.createComp = function (t) {
          return new SVGCompElement(t, this.globalData, this)
        }, SVGRenderer.prototype.createSolid = function (t) {
          return new ISolidElement(t, this.globalData, this)
        }, SVGRenderer.prototype.configAnimation = function (t) {
          this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)", this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
          var e = this.globalData.defs;
          this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
          var r = createNS("clipPath"),
            i = createNS("rect");
          i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
          var a = createElementID();
          r.setAttribute("id", a), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + a + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
        }, SVGRenderer.prototype.destroy = function () {
          var t;
          this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.layerElement = null, this.globalData.defs = null;
          var e = this.layers ? this.layers.length : 0;
          for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
          this.elements.length = 0, this.destroyed = !0, this.animationItem = null
        }, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
          var e = this.elements;
          if (!e[t] && 99 !== this.layers[t].ty) {
            e[t] = !0;
            var r = this.createItem(this.layers[t]);
            e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)))
          }
        }, SVGRenderer.prototype.checkPendingElements = function () {
          for (; this.pendingElements.length;) {
            var t = this.pendingElements.pop();
            if (t.checkParenting(), t.data.tt)
              for (var e = 0, r = this.elements.length; e < r;) {
                if (this.elements[e] === t) {
                  t.setMatte(this.elements[e - 1].layerId);
                  break
                }
                e += 1
              }
          }
        }, SVGRenderer.prototype.renderFrame = function (t) {
          if (this.renderedFrame !== t && !this.destroyed) {
            var e;
            null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
            var r = this.layers.length;
            for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e -= 1)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
            if (this.globalData._mdf)
              for (e = 0; e < r; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
          }
        }, SVGRenderer.prototype.appendElementInPos = function (t, e) {
          var r = t.getBaseElement();
          if (r) {
            for (var i, a = 0; a < e;) this.elements[a] && !0 !== this.elements[a] && this.elements[a].getBaseElement() && (i = this.elements[a].getBaseElement()), a += 1;
            i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r)
          }
        }, SVGRenderer.prototype.hide = function () {
          this.layerElement.style.display = "none"
        }, SVGRenderer.prototype.show = function () {
          this.layerElement.style.display = "block"
        }, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
          return new CVShapeElement(t, this.globalData, this)
        }, CanvasRenderer.prototype.createText = function (t) {
          return new CVTextElement(t, this.globalData, this)
        }, CanvasRenderer.prototype.createImage = function (t) {
          return new CVImageElement(t, this.globalData, this)
        }, CanvasRenderer.prototype.createComp = function (t) {
          return new CVCompElement(t, this.globalData, this)
        }, CanvasRenderer.prototype.createSolid = function (t) {
          return new CVSolidElement(t, this.globalData, this)
        }, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
          if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13])
            if (this.renderConfig.clearCanvas) {
              this.transformMat.cloneFromProps(t);
              var e = this.contextData.cTr.props;
              this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
              var r = this.contextData.cTr.props;
              this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13])
            } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
        }, CanvasRenderer.prototype.ctxOpacity = function (t) {
          if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void(this.globalData.currentGlobalAlpha = this.contextData.cO);
          this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)
        }, CanvasRenderer.prototype.reset = function () {
          this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
        }, CanvasRenderer.prototype.save = function (t) {
          if (this.renderConfig.clearCanvas) {
            t && this.canvasContext.save();
            var e, r = this.contextData.cTr.props;
            this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
            var i = this.contextData.saved[this.contextData.cArrPos];
            for (e = 0; e < 16; e += 1) i[e] = r[e];
            this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
          } else this.canvasContext.save()
        }, CanvasRenderer.prototype.restore = function (t) {
          if (this.renderConfig.clearCanvas) {
            t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
            var e, r = this.contextData.saved[this.contextData.cArrPos],
              i = this.contextData.cTr.props;
            for (e = 0; e < 16; e += 1) i[e] = r[e];
            this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r)
          } else this.canvasContext.restore()
        }, CanvasRenderer.prototype.configAnimation = function (t) {
          if (this.animationItem.wrapper) {
            this.animationItem.container = createTag("canvas");
            var e = this.animationItem.container.style;
            e.width = "100%", e.height = "100%";
            var r = "0px 0px 0px";
            e.transformOrigin = r, e.mozTransformOrigin = r, e.webkitTransformOrigin = r, e["-webkit-transform"] = r, e.contentVisibility = this.renderConfig.contentVisibility, this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id)
          } else this.canvasContext = this.renderConfig.context;
          this.data = t, this.layers = t.layers, this.transformCanvas = {
            w: t.w,
            h: t.h,
            sx: 0,
            sy: 0,
            tx: 0,
            ty: 0
          }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
        }, CanvasRenderer.prototype.updateContainerSize = function () {
          var t, e, r, i;
          if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
            var a = this.renderConfig.preserveAspectRatio.split(" "),
              s = a[1] || "meet",
              n = a[0] || "xMidYMid",
              o = n.substr(0, 4),
              h = n.substr(4);
            r = t / e, (i = this.transformCanvas.w / this.transformCanvas.h) > r && "meet" === s || i < r && "slice" === s ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === s || i > r && "slice" === s) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === s || i > r && "slice" === s) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (i > r && "meet" === s || i < r && "slice" === s) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i > r && "meet" === s || i < r && "slice" === s) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
          } else "none" === this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
          this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
        }, CanvasRenderer.prototype.destroy = function () {
          var t;
          for (this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
          this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
        }, CanvasRenderer.prototype.renderFrame = function (t, e) {
          if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
            var r;
            this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
            var i = this.layers.length;
            for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r += 1)(this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
            if (this.globalData._mdf) {
              for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
              !0 !== this.renderConfig.clearCanvas && this.restore()
            }
          }
        }, CanvasRenderer.prototype.buildItem = function (t) {
          var e = this.elements;
          if (!e[t] && 99 !== this.layers[t].ty) {
            var r = this.createItem(this.layers[t], this, this.globalData);
            e[t] = r, r.initExpressions()
          }
        }, CanvasRenderer.prototype.checkPendingElements = function () {
          for (; this.pendingElements.length;) {
            this.pendingElements.pop().checkParenting()
          }
        }, CanvasRenderer.prototype.hide = function () {
          this.animationItem.container.style.display = "none"
        }, CanvasRenderer.prototype.show = function () {
          this.animationItem.container.style.display = "block"
        }, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
          for (; this.pendingElements.length;) {
            this.pendingElements.pop().checkParenting()
          }
        }, HybridRenderer.prototype.appendElementInPos = function (t, e) {
          var r = t.getBaseElement();
          if (r) {
            var i = this.layers[e];
            if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);
            else if (this.threeDElements) this.addTo3dContainer(r, e);
            else {
              for (var a, s, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement && (s = this.elements[n], a = (this.layers[n].ddd ? this.getThreeDContainerByPos(n) : s.getBaseElement()) || a), n += 1;
              a ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, a) : i.ddd && this.supports3d || this.layerElement.appendChild(r)
            }
          }
        }, HybridRenderer.prototype.createShape = function (t) {
          return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this)
        }, HybridRenderer.prototype.createText = function (t) {
          return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextLottieElement(t, this.globalData, this)
        }, HybridRenderer.prototype.createCamera = function (t) {
          return this.camera = new HCameraElement(t, this.globalData, this), this.camera
        }, HybridRenderer.prototype.createImage = function (t) {
          return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this)
        }, HybridRenderer.prototype.createComp = function (t) {
          return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
        }, HybridRenderer.prototype.createSolid = function (t) {
          return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this)
        }, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
          for (var e = 0, r = this.threeDElements.length; e < r;) {
            if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
            e += 1
          }
          return null
        }, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
          var r, i, a = createTag("div");
          styleDiv(a);
          var s = createTag("div");
          if (styleDiv(s), "3d" === e) {
            (r = a.style).width = this.globalData.compSize.w + "px", r.height = this.globalData.compSize.h + "px";
            r.webkitTransformOrigin = "50% 50%", r.mozTransformOrigin = "50% 50%", r.transformOrigin = "50% 50%";
            var n = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
            (i = s.style).transform = n, i.webkitTransform = n
          }
          a.appendChild(s);
          var o = {
            container: s,
            perspectiveElem: a,
            startPos: t,
            endPos: t,
            type: e
          };
          return this.threeDElements.push(o), o
        }, HybridRenderer.prototype.build3dContainers = function () {
          var t, e, r = this.layers.length,
            i = "";
          for (t = 0; t < r; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")), e.endPos = Math.max(e.endPos, t)) : ("2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t));
          for (t = (r = this.threeDElements.length) - 1; t >= 0; t -= 1) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
        }, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
          for (var r = 0, i = this.threeDElements.length; r < i;) {
            if (e <= this.threeDElements[r].endPos) {
              for (var a, s = this.threeDElements[r].startPos; s < e;) this.elements[s] && this.elements[s].getBaseElement && (a = this.elements[s].getBaseElement()), s += 1;
              a ? this.threeDElements[r].container.insertBefore(t, a) : this.threeDElements[r].container.appendChild(t);
              break
            }
            r += 1
          }
        }, HybridRenderer.prototype.configAnimation = function (t) {
          var e = createTag("div"),
            r = this.animationItem.wrapper,
            i = e.style;
          i.width = t.w + "px", i.height = t.h + "px", this.resizerElem = e, styleDiv(e), i.transformStyle = "flat", i.mozTransformStyle = "flat", i.webkitTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), i.overflow = "hidden";
          var a = createNS("svg");
          a.setAttribute("width", "1"), a.setAttribute("height", "1"), styleDiv(a), this.resizerElem.appendChild(a);
          var s = createNS("defs");
          a.appendChild(s), this.data = t, this.setupGlobalData(t, a), this.globalData.defs = s, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
        }, HybridRenderer.prototype.destroy = function () {
          var t;
          this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.animationItem.container = null, this.globalData.defs = null;
          var e = this.layers ? this.layers.length : 0;
          for (t = 0; t < e; t += 1) this.elements[t].destroy();
          this.elements.length = 0, this.destroyed = !0, this.animationItem = null
        }, HybridRenderer.prototype.updateContainerSize = function () {
          var t, e, r, i, a = this.animationItem.wrapper.offsetWidth,
            s = this.animationItem.wrapper.offsetHeight,
            n = a / s;
          this.globalData.compSize.w / this.globalData.compSize.h > n ? (t = a / this.globalData.compSize.w, e = a / this.globalData.compSize.w, r = 0, i = (s - this.globalData.compSize.h * (a / this.globalData.compSize.w)) / 2) : (t = s / this.globalData.compSize.h, e = s / this.globalData.compSize.h, r = (a - this.globalData.compSize.w * (s / this.globalData.compSize.h)) / 2, i = 0);
          var o = this.resizerElem.style;
          o.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)", o.transform = o.webkitTransform
        }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
          this.resizerElem.style.display = "none"
        }, HybridRenderer.prototype.show = function () {
          this.resizerElem.style.display = "block"
        }, HybridRenderer.prototype.initItems = function () {
          if (this.buildAllItems(), this.camera) this.camera.setup();
          else {
            var t, e = this.globalData.compSize.w,
              r = this.globalData.compSize.h,
              i = this.threeDElements.length;
            for (t = 0; t < i; t += 1) {
              var a = this.threeDElements[t].perspectiveElem.style;
              a.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px", a.perspective = a.webkitPerspective
            }
          }
        }, HybridRenderer.prototype.searchExtraCompositions = function (t) {
          var e, r = t.length,
            i = createTag("div");
          for (e = 0; e < r; e += 1)
            if (t[e].xt) {
              var a = this.createComp(t[e], i, this.globalData.comp, null);
              a.initExpressions(), this.globalData.projectInterface.registerComposition(a)
            }
        }, MaskElement.prototype.getMaskProperty = function (t) {
          return this.viewData[t].prop
        }, MaskElement.prototype.renderFrame = function (t) {
          var e, r = this.element.finalTransform.mat,
            i = this.masksProperties.length;
          for (e = 0; e < i; e += 1)
            if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
              var a = this.storedData[e].expan;
              this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), a.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
            }
        }, MaskElement.prototype.getMaskelement = function () {
          return this.maskElement
        }, MaskElement.prototype.createLayerSolidPath = function () {
          var t = "M0,0 ";
          return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
        }, MaskElement.prototype.drawPath = function (t, e, r) {
          var i, a, s = " M" + e.v[0][0] + "," + e.v[0][1];
          for (a = e._length, i = 1; i < a; i += 1) s += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
          if (e.c && a > 1 && (s += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== s) {
            var n = "";
            r.elem && (e.c && (n = t.inv ? this.solidPath + s : s), r.elem.setAttribute("d", n)), r.lastPath = s
          }
        }, MaskElement.prototype.destroy = function () {
          this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
        }, HierarchyElement.prototype = {
          initHierarchy: function () {
            this.hierarchy = [], this._isParent = !1, this.checkParenting()
          },
          setHierarchy: function (t) {
            this.hierarchy = t
          },
          setAsParent: function () {
            this._isParent = !0
          },
          checkParenting: function () {
            void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
          }
        }, FrameElement.prototype = {
          initFrame: function () {
            this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
          },
          prepareProperties: function (t, e) {
            var r, i = this.dynamicProperties.length;
            for (r = 0; r < i; r += 1)(e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
          },
          addDynamicProperty: function (t) {
            -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
          }
        }, TransformElement.prototype = {
          initTransform: function () {
            this.finalTransform = {
              mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
                o: 0
              },
              _matMdf: !1,
              _opMdf: !1,
              mat: new Matrix
            }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
          },
          renderTransform: function () {
            if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
              var t, e = this.finalTransform.mat,
                r = 0,
                i = this.hierarchy.length;
              if (!this.finalTransform._matMdf)
                for (; r < i;) {
                  if (this.hierarchy[r].finalTransform.mProp._mdf) {
                    this.finalTransform._matMdf = !0;
                    break
                  }
                  r += 1
                }
              if (this.finalTransform._matMdf)
                for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
            }
          },
          globalToLocal: function (t) {
            var e = [];
            e.push(this.finalTransform);
            for (var r, i = !0, a = this.comp; i;) a.finalTransform ? (a.data.hasMask && e.splice(0, 0, a.finalTransform), a = a.comp) : i = !1;
            var s, n = e.length;
            for (r = 0; r < n; r += 1) s = e[r].mat.applyToPointArray(0, 0, 0), t = [t[0] - s[0], t[1] - s[1], 0];
            return t
          },
          mHelper: new Matrix
        }, RenderableElement.prototype = {
          initRenderable: function () {
            this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
          },
          addRenderableComponent: function (t) {
            -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
          },
          removeRenderableComponent: function (t) {
            -1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
          },
          prepareRenderableFrame: function (t) {
            this.checkLayerLimits(t)
          },
          checkTransparency: function () {
            this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
          },
          checkLayerLimits: function (t) {
            this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
          },
          renderRenderable: function () {
            var t, e = this.renderableComponents.length;
            for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
          },
          sourceRectAtTime: function () {
            return {
              top: 0,
              left: 0,
              width: 100,
              height: 100
            }
          },
          getLayerSize: function () {
            return 5 === this.data.ty ? {
              w: this.data.textData.width,
              h: this.data.textData.height
            } : {
              w: this.data.width,
              h: this.data.height
            }
          }
        }, extendPrototype([RenderableElement, createProxyFunction({
          initElement: function (t, e, r) {
            this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
          },
          hide: function () {
            this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
          },
          show: function () {
            this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
          },
          renderFrame: function () {
            this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
          },
          renderInnerContent: function () {},
          prepareFrame: function (t) {
            this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
          },
          destroy: function () {
            this.innerElem = null, this.destroyBaseElement()
          }
        })], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
          this.d = "", this._mdf = !1
        }, SVGShapeData.prototype.setAsAnimated = function () {
          this._isAnimated = !0
        }, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
          this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
            k: 0
          }, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
            k: 0
          }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated
        }, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
          var r = createElementID(),
            i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
          i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
          var a, s, n, o = [];
          for (n = 4 * e.g.p, s = 0; s < n; s += 4) a = createNS("stop"), i.appendChild(a), o.push(a);
          t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o
        }, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
          if (this.g._hasOpacity && !this.g._collapsable) {
            var r, i, a, s = createNS("mask"),
              n = createNS("path");
            s.appendChild(n);
            var o = createElementID(),
              h = createElementID();
            s.setAttribute("id", h);
            var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
            l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), a = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
            var p = this.stops;
            for (i = 4 * t.g.p; i < a; i += 2)(r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
            n.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), "gs" === t.ty && (n.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]), n.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]), 1 === t.lj && n.setAttribute("stroke-miterlimit", t.ml)), this.of = l, this.ms = s, this.ost = p, this.maskId = h, e.msElem = n
          }
        }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
        var SVGElementsRenderer = function () {
          var t = new Matrix,
            e = new Matrix;

          function r(t, e, r) {
            (r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
          }

          function i(r, i, a) {
            var s, n, o, h, l, p, d, c, f, m, u, y = i.styles.length,
              g = i.lvl;
            for (p = 0; p < y; p += 1) {
              if (h = i.sh._mdf || a, i.styles[p].lvl < g) {
                for (c = e.reset(), m = g - i.styles[p].lvl, u = i.transformers.length - 1; !h && m > 0;) h = i.transformers[u].mProps._mdf || h, m -= 1, u -= 1;
                if (h)
                  for (m = g - i.styles[p].lvl, u = i.transformers.length - 1; m > 0;) f = i.transformers[u].mProps.v.props, c.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), m -= 1, u -= 1
              } else c = t;
              if (n = (d = i.sh.paths)._length, h) {
                for (o = "", s = 0; s < n; s += 1)(l = d.shapes[s]) && l._length && (o += buildShapeString(l, l._length, l.c, c));
                i.caches[p] = o
              } else o = i.caches[p];
              i.styles[p].d += !0 === r.hd ? "" : o, i.styles[p]._mdf = h || i.styles[p]._mdf
            }
          }

          function a(t, e, r) {
            var i = e.style;
            (e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v)
          }

          function s(t, e, r) {
            n(t, e, r), o(t, e, r)
          }

          function n(t, e, r) {
            var i, a, s, n, o, h = e.gf,
              l = e.g._hasOpacity,
              p = e.s.v,
              d = e.e.v;
            if (e.o._mdf || r) {
              var c = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
              e.style.pElem.setAttribute(c, e.o.v)
            }
            if (e.s._mdf || r) {
              var f = 1 === t.t ? "x1" : "cx",
                m = "x1" === f ? "y1" : "cy";
              h.setAttribute(f, p[0]), h.setAttribute(m, p[1]), l && !e.g._collapsable && (e.of.setAttribute(f, p[0]), e.of.setAttribute(m, p[1]))
            }
            if (e.g._cmdf || r) {
              i = e.cst;
              var u = e.g.c;
              for (s = i.length, a = 0; a < s; a += 1)(n = i[a]).setAttribute("offset", u[4 * a] + "%"), n.setAttribute("stop-color", "rgb(" + u[4 * a + 1] + "," + u[4 * a + 2] + "," + u[4 * a + 3] + ")")
            }
            if (l && (e.g._omdf || r)) {
              var y = e.g.o;
              for (s = (i = e.g._collapsable ? e.cst : e.ost).length, a = 0; a < s; a += 1) n = i[a], e.g._collapsable || n.setAttribute("offset", y[2 * a] + "%"), n.setAttribute("stop-opacity", y[2 * a + 1])
            }
            if (1 === t.t)(e.e._mdf || r) && (h.setAttribute("x2", d[0]), h.setAttribute("y2", d[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", d[0]), e.of.setAttribute("y2", d[1])));
            else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - d[0], 2) + Math.pow(p[1] - d[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
              o || (o = Math.sqrt(Math.pow(p[0] - d[0], 2) + Math.pow(p[1] - d[1], 2)));
              var g = Math.atan2(d[1] - p[1], d[0] - p[0]),
                _ = e.h.v;
              _ >= 1 ? _ = .99 : _ <= -1 && (_ = -.99);
              var v = o * _,
                b = Math.cos(g + e.a.v) * v + p[0],
                E = Math.sin(g + e.a.v) * v + p[1];
              h.setAttribute("fx", b), h.setAttribute("fy", E), l && !e.g._collapsable && (e.of.setAttribute("fx", b), e.of.setAttribute("fy", E))
            }
          }

          function o(t, e, r) {
            var i = e.style,
              a = e.d;
            a && (a._mdf || r) && a.dashStr && (i.pElem.setAttribute("stroke-dasharray", a.dashStr), i.pElem.setAttribute("stroke-dashoffset", a.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v))
          }
          return {
            createRenderFunction: function (t) {
              switch (t.ty) {
                case "fl":
                  return a;
                case "gf":
                  return n;
                case "gs":
                  return s;
                case "st":
                  return o;
                case "sh":
                case "el":
                case "rc":
                case "sr":
                  return i;
                case "tr":
                  return r;
                default:
                  return null
              }
            }
          }
        }();

        function ShapeTransformManager() {
          this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
        }

        function CVShapeData(t, e, r, i) {
          this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
          var a, s = 4;
          "rc" === e.ty ? s = 5 : "el" === e.ty ? s = 6 : "sr" === e.ty && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
          var n, o = r.length;
          for (a = 0; a < o; a += 1) r[a].closed || (n = {
            transforms: i.addTransformSequence(r[a].transforms),
            trNodes: []
          }, this.styledShapes.push(n), r[a].elements.push(n))
        }

        function BaseElement() {}

        function NullElement(t, e, r) {
          this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy()
        }

        function SVGBaseElement() {}

        function IShapeElement() {}

        function ITextElement() {}

        function ICompElement() {}

        function IImageElement(t, e, r) {
          this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
            top: 0,
            left: 0,
            width: this.assetData.w,
            height: this.assetData.h
          }
        }

        function ISolidElement(t, e, r) {
          this.initElement(t, e, r)
        }

        function AudioElement(t, e, r) {
          this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.initBaseData(t, e, r), this._isPlaying = !1, this._canPlay = !1;
          var i = this.globalData.getAssetsPath(this.assetData);
          this.audio = this.globalData.audioController.createAudio(i), this._currentTime = 0, this.globalData.audioController.addAudio(this), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
          }
        }

        function FootageElement(t, e, r) {
          this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.footageData = e.imageLoader.getAsset(this.assetData), this.initBaseData(t, e, r)
        }

        function SVGCompElement(t, e, r) {
          this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
          }
        }

        function SVGTextLottieElement(t, e, r) {
          this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r)
        }

        function SVGShapeElement(t, e, r) {
          this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = []
        }

        function SVGTintFilter(t, e) {
          this.filterManager = e;
          var r = createNS("feColorMatrix");
          if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
            var i, a = createNS("feMerge");
            t.appendChild(a), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), a.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), a.appendChild(i)
          }
        }

        function SVGFillFilter(t, e) {
          this.filterManager = e;
          var r = createNS("feColorMatrix");
          r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r
        }

        function SVGGaussianBlurEffect(t, e) {
          t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
          var r = createNS("feGaussianBlur");
          t.appendChild(r), this.feGaussianBlur = r
        }

        function SVGStrokeEffect(t, e) {
          this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = []
        }

        function SVGTritoneFilter(t, e) {
          this.filterManager = e;
          var r = createNS("feColorMatrix");
          r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
          var i = createNS("feComponentTransfer");
          i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
          var a = createNS("feFuncR");
          a.setAttribute("type", "table"), i.appendChild(a), this.feFuncR = a;
          var s = createNS("feFuncG");
          s.setAttribute("type", "table"), i.appendChild(s), this.feFuncG = s;
          var n = createNS("feFuncB");
          n.setAttribute("type", "table"), i.appendChild(n), this.feFuncB = n
        }

        function SVGProLevelsFilter(t, e) {
          this.filterManager = e;
          var r = this.filterManager.effectElements,
            i = createNS("feComponentTransfer");
          (r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i))
        }

        function SVGDropShadowEffect(t, e) {
          var r = e.container.globalData.renderConfig.filterSize;
          t.setAttribute("x", r.x), t.setAttribute("y", r.y), t.setAttribute("width", r.width), t.setAttribute("height", r.height), this.filterManager = e;
          var i = createNS("feGaussianBlur");
          i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
          var a = createNS("feOffset");
          a.setAttribute("dx", "25"), a.setAttribute("dy", "0"), a.setAttribute("in", "drop_shadow_1"), a.setAttribute("result", "drop_shadow_2"), this.feOffset = a, t.appendChild(a);
          var s = createNS("feFlood");
          s.setAttribute("flood-color", "#00ff00"), s.setAttribute("flood-opacity", "1"), s.setAttribute("result", "drop_shadow_3"), this.feFlood = s, t.appendChild(s);
          var n = createNS("feComposite");
          n.setAttribute("in", "drop_shadow_3"), n.setAttribute("in2", "drop_shadow_2"), n.setAttribute("operator", "in"), n.setAttribute("result", "drop_shadow_4"), t.appendChild(n);
          var o, h = createNS("feMerge");
          t.appendChild(h), o = createNS("feMergeNode"), h.appendChild(o), (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = h, this.originalNodeAdded = !1, h.appendChild(o)
        }
        ShapeTransformManager.prototype = {
          addTransformSequence: function (t) {
            var e, r = t.length,
              i = "_";
            for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
            var a = this.sequences[i];
            return a || (a = {
              transforms: [].concat(t),
              finalTransform: new Matrix,
              _mdf: !1
            }, this.sequences[i] = a, this.sequenceList.push(a)), a
          },
          processSequence: function (t, e) {
            for (var r, i = 0, a = t.transforms.length, s = e; i < a && !e;) {
              if (t.transforms[i].transform.mProps._mdf) {
                s = !0;
                break
              }
              i += 1
            }
            if (s)
              for (t.finalTransform.reset(), i = a - 1; i >= 0; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
            t._mdf = s
          },
          processSequences: function (t) {
            var e, r = this.sequenceList.length;
            for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t)
          },
          getNewKey: function () {
            return this.transform_key_count += 1, "_" + this.transform_key_count
          }
        }, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
          checkMasks: function () {
            if (!this.data.hasMask) return !1;
            for (var t = 0, e = this.data.masksProperties.length; t < e;) {
              if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
              t += 1
            }
            return !1
          },
          initExpressions: function () {
            this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
            var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
          },
          setBlendMode: function () {
            var t = getBlendMode(this.data.bm);
            (this.baseElement || this.layerElement).style["mix-blend-mode"] = t
          },
          initBaseData: function (t, e, r) {
            this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
          },
          getType: function () {
            return this.type
          },
          sourceRectAtTime: function () {}
        }, NullElement.prototype.prepareFrame = function (t) {
          this.prepareProperties(t, !0)
        }, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
          return null
        }, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
          initRendererElement: function () {
            this.layerElement = createNS("g")
          },
          createContainerElements: function () {
            this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
            var t, e, r, i = null;
            if (this.data.td) {
              if (3 == this.data.td || 1 == this.data.td) {
                var a = createNS("mask");
                a.setAttribute("id", this.layerId), a.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), a.appendChild(this.layerElement), i = a, this.globalData.defs.appendChild(a), featureSupport.maskType || 1 != this.data.td || (a.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, a.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"))
              } else if (2 == this.data.td) {
                var s = createNS("mask");
                s.setAttribute("id", this.layerId), s.setAttribute("mask-type", "alpha");
                var n = createNS("g");
                s.appendChild(n), t = createElementID(), e = filtersFactory.createFilter(t);
                var o = createNS("feComponentTransfer");
                o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
                var h = createNS("feFuncA");
                h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
                var l = createNS("rect");
                l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), n.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), n.appendChild(l), n.appendChild(this.layerElement), i = n, featureSupport.maskType || (s.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), n.appendChild(l), r.appendChild(this.layerElement), i = r, n.appendChild(r)), this.globalData.defs.appendChild(s)
              }
            } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
            if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
              var p = createNS("clipPath"),
                d = createNS("path");
              d.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
              var c = createElementID();
              if (p.setAttribute("id", c), p.appendChild(d), this.globalData.defs.appendChild(p), this.checkMasks()) {
                var f = createNS("g");
                f.setAttribute("clip-path", "url(" + locationHref + "#" + c + ")"), f.appendChild(this.layerElement), this.transformedElement = f, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
              } else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + c + ")")
            }
            0 !== this.data.bm && this.setBlendMode()
          },
          renderElement: function () {
            this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
          },
          destroyBaseElement: function () {
            this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
          },
          getBaseElement: function () {
            return this.data.hd ? null : this.baseElement
          },
          createRenderableComponents: function () {
            this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
          },
          setMatte: function (t) {
            this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
          }
        }, IShapeElement.prototype = {
          addShapeToModifiers: function (t) {
            var e, r = this.shapeModifiers.length;
            for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t)
          },
          isShapeInAnimatedModifiers: function (t) {
            for (var e = this.shapeModifiers.length; 0 < e;)
              if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
            return !1
          },
          renderModifiers: function () {
            if (this.shapeModifiers.length) {
              var t, e = this.shapes.length;
              for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
              for (t = (e = this.shapeModifiers.length) - 1; t >= 0 && !this.shapeModifiers[t].processShapes(this._isFirstFrame); t -= 1);
            }
          },
          searchProcessedElement: function (t) {
            for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
              if (e[r].elem === t) return e[r].pos;
              r += 1
            }
            return 0
          },
          addProcessedElement: function (t, e) {
            for (var r = this.processedElements, i = r.length; i;)
              if (r[i -= 1].elem === t) return void(r[i].pos = e);
            r.push(new ProcessedElement(t, e))
          },
          prepareFrame: function (t) {
            this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
          }
        }, ITextElement.prototype.initElement = function (t, e, r) {
          this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
        }, ITextElement.prototype.prepareFrame = function (t) {
          this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
        }, ITextElement.prototype.createPathShape = function (t, e) {
          var r, i, a = e.length,
            s = "";
          for (r = 0; r < a; r += 1) i = e[r].ks.k, s += buildShapeString(i, i.i.length, !0, t);
          return s
        }, ITextElement.prototype.updateDocumentData = function (t, e) {
          this.textProperty.updateDocumentData(t, e)
        }, ITextElement.prototype.canResizeFont = function (t) {
          this.textProperty.canResizeFont(t)
        }, ITextElement.prototype.setMinimumFontSize = function (t) {
          this.textProperty.setMinimumFontSize(t)
        }, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, a) {
          switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
            case 1:
              e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
              break;
            case 2:
              e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
          }
          e.translate(i, a, 0)
        }, ITextElement.prototype.buildColor = function (t) {
          return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
        }, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
          this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
        }, ICompElement.prototype.prepareFrame = function (t) {
          if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
            if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
            else {
              var e = this.tm.v;
              e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
            }
            var r, i = this.elements.length;
            for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0))
          }
        }, ICompElement.prototype.renderInnerContent = function () {
          var t, e = this.layers.length;
          for (t = 0; t < e; t += 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
        }, ICompElement.prototype.setElements = function (t) {
          this.elements = t
        }, ICompElement.prototype.getElements = function () {
          return this.elements
        }, ICompElement.prototype.destroyElements = function () {
          var t, e = this.layers.length;
          for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
        }, ICompElement.prototype.destroy = function () {
          this.destroyElements(), this.destroyBaseElement()
        }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
          var t = this.globalData.getAssetsPath(this.assetData);
          this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
        }, IImageElement.prototype.sourceRectAtTime = function () {
          return this.sourceRect
        }, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
          var t = createNS("rect");
          t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
        }, AudioElement.prototype.prepareFrame = function (t) {
          if (this.prepareRenderableFrame(t, !0), this.prepareProperties(t, !0), this.tm._placeholder) this._currentTime = t / this.data.sr;
          else {
            var e = this.tm.v;
            this._currentTime = e
          }
        }, extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement), AudioElement.prototype.renderFrame = function () {
          this.isInRange && this._canPlay && (this._isPlaying ? (!this.audio.playing() || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > .1) && this.audio.seek(this._currentTime / this.globalData.frameRate) : (this.audio.play(), this.audio.seek(this._currentTime / this.globalData.frameRate), this._isPlaying = !0))
        }, AudioElement.prototype.show = function () {}, AudioElement.prototype.hide = function () {
          this.audio.pause(), this._isPlaying = !1
        }, AudioElement.prototype.pause = function () {
          this.audio.pause(), this._isPlaying = !1, this._canPlay = !1
        }, AudioElement.prototype.resume = function () {
          this._canPlay = !0
        }, AudioElement.prototype.setRate = function (t) {
          this.audio.rate(t)
        }, AudioElement.prototype.volume = function (t) {
          this.audio.volume(t)
        }, AudioElement.prototype.getBaseElement = function () {
          return null
        }, AudioElement.prototype.destroy = function () {}, AudioElement.prototype.sourceRectAtTime = function () {}, AudioElement.prototype.initExpressions = function () {}, FootageElement.prototype.prepareFrame = function () {}, extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement), FootageElement.prototype.getBaseElement = function () {
          return null
        }, FootageElement.prototype.renderFrame = function () {}, FootageElement.prototype.destroy = function () {}, FootageElement.prototype.initExpressions = function () {
          this.layerInterface = FootageInterface(this)
        }, FootageElement.prototype.getFootageData = function () {
          return this.footageData
        }, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement), SVGTextLottieElement.prototype.createContent = function () {
          this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
        }, SVGTextLottieElement.prototype.buildTextContents = function (t) {
          for (var e = 0, r = t.length, i = [], a = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(a), a = "") : a += t[e], e += 1;
          return i.push(a), i
        }, SVGTextLottieElement.prototype.buildNewText = function () {
          var t, e, r = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
          var i = this.globalData.fontManager.getFontByName(r.f);
          if (i.fClass) this.layerElement.setAttribute("class", i.fClass);
          else {
            this.layerElement.setAttribute("font-family", i.fFamily);
            var a = r.fWeight,
              s = r.fStyle;
            this.layerElement.setAttribute("font-style", s), this.layerElement.setAttribute("font-weight", a)
          }
          this.layerElement.setAttribute("aria-label", r.t);
          var n, o = r.l || [],
            h = !!this.globalData.fontManager.chars;
          e = o.length;
          var l, p = this.mHelper,
            d = "",
            c = this.data.singleShape,
            f = 0,
            m = 0,
            u = !0,
            y = .001 * r.tr * r.finalSize;
          if (!c || h || r.sz) {
            var g, _, v = this.textSpans.length;
            for (t = 0; t < e; t += 1) h && c && 0 !== t || (n = v > t ? this.textSpans[t] : createNS(h ? "path" : "text"), v <= t && (n.setAttribute("stroke-linecap", "butt"), n.setAttribute("stroke-linejoin", "round"), n.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = n, this.layerElement.appendChild(n)), n.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), c && (o[t].n && (f = -y, m += r.yOffset, m += u ? 1 : 0, u = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, f, m), f += o[t].l || 0, f += y), h ? (l = (g = (_ = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && _.data || {}).shapes ? g.shapes[0].it : [], c ? d += this.createPathShape(p, l) : n.setAttribute("d", this.createPathShape(p, l))) : (c && n.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), n.textContent = o[t].val, n.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
            c && n && n.setAttribute("d", d)
          } else {
            var b = this.textContainer,
              E = "start";
            switch (r.j) {
              case 1:
                E = "end";
                break;
              case 2:
                E = "middle";
                break;
              default:
                E = "start"
            }
            b.setAttribute("text-anchor", E), b.setAttribute("letter-spacing", y);
            var S = this.buildTextContents(r.finalText);
            for (e = S.length, m = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)(n = this.textSpans[t] || createNS("tspan")).textContent = S[t], n.setAttribute("x", 0), n.setAttribute("y", m), n.style.display = "inherit", b.appendChild(n), this.textSpans[t] = n, m += r.finalLineHeight;
            this.layerElement.appendChild(b)
          }
          for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;
          this._sizeChanged = !0
        }, SVGTextLottieElement.prototype.sourceRectAtTime = function () {
          if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
            this._sizeChanged = !1;
            var t = this.layerElement.getBBox();
            this.bbox = {
              top: t.y,
              left: t.x,
              width: t.width,
              height: t.height
            }
          }
          return this.bbox
        }, SVGTextLottieElement.prototype.renderInnerContent = function () {
          if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
            var t, e;
            this._sizeChanged = !0;
            var r, i, a = this.textAnimator.renderedLetters,
              s = this.textProperty.currentData.l;
            for (e = s.length, t = 0; t < e; t += 1) s[t].n || (r = a[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc))
          }
        }, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
        }, SVGShapeElement.prototype.filterUniqueShapes = function () {
          var t, e, r, i, a = this.shapes.length,
            s = this.stylesList.length,
            n = [],
            o = !1;
          for (r = 0; r < s; r += 1) {
            for (i = this.stylesList[r], o = !1, n.length = 0, t = 0; t < a; t += 1) - 1 !== (e = this.shapes[t]).styles.indexOf(i) && (n.push(e), o = e._isAnimated || o);
            n.length > 1 && o && this.setShapesAsAnimated(n)
          }
        }, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
          var e, r = t.length;
          for (e = 0; e < r; e += 1) t[e].setAsAnimated()
        }, SVGShapeElement.prototype.createStyleElement = function (t, e) {
          var r, i = new SVGStyleData(t, e),
            a = i.pElem;
          if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);
          else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);
          else if ("gf" === t.ty || "gs" === t.ty) {
            r = new("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), a.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"))
          }
          return "st" !== t.ty && "gs" !== t.ty || (a.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]), a.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]), a.setAttribute("fill-opacity", "0"), 1 === t.lj && a.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && a.setAttribute("fill-rule", "evenodd"), t.ln && a.setAttribute("id", t.ln), t.cl && a.setAttribute("class", t.cl), t.bm && (a.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r
        }, SVGShapeElement.prototype.createGroupElement = function (t) {
          var e = new ShapeGroupData;
          return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
        }, SVGShapeElement.prototype.createTransformElement = function (t, e) {
          var r = TransformPropertyFactory.getTransformProperty(this, t, this),
            i = new SVGTransformData(r, r.o, e);
          return this.addToAnimatedContents(t, i), i
        }, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
          var i = 4;
          "rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
          var a = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
          return this.shapes.push(a), this.addShapeToModifiers(a), this.addToAnimatedContents(t, a), a
        }, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
          for (var r = 0, i = this.animatedContents.length; r < i;) {
            if (this.animatedContents[r].element === e) return;
            r += 1
          }
          this.animatedContents.push({
            fn: SVGElementsRenderer.createRenderFunction(t),
            element: e,
            data: t
          })
        }, SVGShapeElement.prototype.setElementStyles = function (t) {
          var e, r = t.styles,
            i = this.stylesList.length;
          for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e])
        }, SVGShapeElement.prototype.reloadShapes = function () {
          var t;
          this._isFirstFrame = !0;
          var e = this.itemsData.length;
          for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
          for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
          this.renderModifiers()
        }, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, a, s, n) {
          var o, h, l, p, d, c, f = [].concat(s),
            m = t.length - 1,
            u = [],
            y = [];
          for (o = m; o >= 0; o -= 1) {
            if ((c = this.searchProcessedElement(t[o])) ? e[o] = r[c - 1] : t[o]._render = n, "fl" === t[o].ty || "st" === t[o].ty || "gf" === t[o].ty || "gs" === t[o].ty) c ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], a), t[o]._render && e[o].style.pElem.parentNode !== i && i.appendChild(e[o].style.pElem), u.push(e[o].style);
            else if ("gr" === t[o].ty) {
              if (c)
                for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];
              else e[o] = this.createGroupElement(t[o]);
              this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, a + 1, f, n), t[o]._render && e[o].gr.parentNode !== i && i.appendChild(e[o].gr)
            } else "tr" === t[o].ty ? (c || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, f.push(p)) : "sh" === t[o].ty || "rc" === t[o].ty || "el" === t[o].ty || "sr" === t[o].ty ? (c || (e[o] = this.createShapeElement(t[o], f, a)), this.setElementStyles(e[o])) : "tm" === t[o].ty || "rd" === t[o].ty || "ms" === t[o].ty || "pb" === t[o].ty ? (c ? (d = e[o]).closed = !1 : ((d = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = d, this.shapeModifiers.push(d)), y.push(d)) : "rp" === t[o].ty && (c ? (d = e[o]).closed = !0 : (d = ShapeModifiers.getModifier(t[o].ty), e[o] = d, d.init(this, t, o, e), this.shapeModifiers.push(d), n = !1), y.push(d));
            this.addProcessedElement(t[o], o + 1)
          }
          for (m = u.length, o = 0; o < m; o += 1) u[o].closed = !0;
          for (m = y.length, o = 0; o < m; o += 1) y[o].closed = !0
        }, SVGShapeElement.prototype.renderInnerContent = function () {
          var t;
          this.renderModifiers();
          var e = this.stylesList.length;
          for (t = 0; t < e; t += 1) this.stylesList[t].reset();
          for (this.renderShape(), t = 0; t < e; t += 1)(this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
        }, SVGShapeElement.prototype.renderShape = function () {
          var t, e, r = this.animatedContents.length;
          for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
        }, SVGShapeElement.prototype.destroy = function () {
          this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
        }, SVGTintFilter.prototype.renderFrame = function (t) {
          if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = this.filterManager.effectElements[2].p.v / 100;
            this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
          }
        }, SVGFillFilter.prototype.renderFrame = function (t) {
          if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[2].p.v,
              r = this.filterManager.effectElements[6].p.v;
            this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
          }
        }, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
          if (t || this.filterManager._mdf) {
            var e = .3 * this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = 3 == r ? 0 : e,
              a = 2 == r ? 0 : e;
            this.feGaussianBlur.setAttribute("stdDeviation", i + " " + a);
            var s = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
            this.feGaussianBlur.setAttribute("edgeMode", s)
          }
        }, SVGStrokeEffect.prototype.initialize = function () {
          var t, e, r, i, a = this.elem.layerElement.children || this.elem.layerElement.childNodes;
          for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
            p: t,
            m: r
          });
          if (3 === this.filterManager.effectElements[10].p.v) {
            var s = createNS("mask"),
              n = createElementID();
            s.setAttribute("id", n), s.setAttribute("mask-type", "alpha"), s.appendChild(e), this.elem.globalData.defs.appendChild(s);
            var o = createNS("g");
            for (o.setAttribute("mask", "url(" + locationHref + "#" + n + ")"); a[0];) o.appendChild(a[0]);
            this.elem.layerElement.appendChild(o), this.masker = s, e.setAttribute("stroke", "#fff")
          } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
            if (2 === this.filterManager.effectElements[10].p.v)
              for (a = this.elem.layerElement.children || this.elem.layerElement.childNodes; a.length;) this.elem.layerElement.removeChild(a[0]);
            this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
          }
          this.initialized = !0, this.pathMasker = e
        }, SVGStrokeEffect.prototype.renderFrame = function (t) {
          var e;
          this.initialized || this.initialize();
          var r, i, a = this.paths.length;
          for (e = 0; e < a; e += 1)
            if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
              var s;
              if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                var n = .01 * Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
                  o = .01 * Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
                  h = i.getTotalLength();
                s = "0 0 0 " + h * n + " ";
                var l, p = h * (o - n),
                  d = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01,
                  c = Math.floor(p / d);
                for (l = 0; l < c; l += 1) s += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01 + " ";
                s += "0 " + 10 * h + " 0 0"
              } else s = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * .01;
              i.setAttribute("stroke-dasharray", s)
            } if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
            var f = this.filterManager.effectElements[3].p.v;
            this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(255 * f[0]) + "," + bmFloor(255 * f[1]) + "," + bmFloor(255 * f[2]) + ")")
          }
        }, SVGTritoneFilter.prototype.renderFrame = function (t) {
          if (t || this.filterManager._mdf) {
            var e = this.filterManager.effectElements[0].p.v,
              r = this.filterManager.effectElements[1].p.v,
              i = this.filterManager.effectElements[2].p.v,
              a = i[0] + " " + r[0] + " " + e[0],
              s = i[1] + " " + r[1] + " " + e[1],
              n = i[2] + " " + r[2] + " " + e[2];
            this.feFuncR.setAttribute("tableValues", a), this.feFuncG.setAttribute("tableValues", s), this.feFuncB.setAttribute("tableValues", n)
          }
        }, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
          var r = createNS(t);
          return r.setAttribute("type", "table"), e.appendChild(r), r
        }, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, a) {
          for (var s, n, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
              length: 256
            }), d = 0, c = a - i, f = e - t; o <= 256;) n = (s = o / 256) <= h ? f < 0 ? a : i : s >= l ? f < 0 ? i : a : i + c * Math.pow((s - t) / f, 1 / r), p[d] = n, d += 1, o += 256 / 255;
          return p.join(" ")
        }, SVGProLevelsFilter.prototype.renderFrame = function (t) {
          if (t || this.filterManager._mdf) {
            var e, r = this.filterManager.effectElements;
            this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e))
          }
        }, SVGDropShadowEffect.prototype.renderFrame = function (t) {
          if (t || this.filterManager._mdf) {
            if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
              var e = this.filterManager.effectElements[0].p.v;
              this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
            }
            if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
              var r = this.filterManager.effectElements[3].p.v,
                i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                a = r * Math.cos(i),
                s = r * Math.sin(i);
              this.feOffset.setAttribute("dx", a), this.feOffset.setAttribute("dy", s)
            }
          }
        };
        var _svgMatteSymbols = [];

        function SVGMatte3Effect(t, e, r) {
          this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement
        }

        function SVGEffects(t) {
          var e, r, i = t.data.ef ? t.data.ef.length : 0,
            a = createElementID(),
            s = filtersFactory.createFilter(a, !0),
            n = 0;
          for (this.filters = [], e = 0; e < i; e += 1) r = null, 20 === t.data.ef[e].ty ? (n += 1, r = new SVGTintFilter(s, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (n += 1, r = new SVGFillFilter(s, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (n += 1, r = new SVGTritoneFilter(s, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (n += 1, r = new SVGProLevelsFilter(s, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (n += 1, r = new SVGDropShadowEffect(s, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(s, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (n += 1, r = new SVGGaussianBlurEffect(s, t.effectsManager.effectElements[e])), r && this.filters.push(r);
          n && (t.globalData.defs.appendChild(s), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + a + ")")), this.filters.length && t.addRenderableComponent(this)
        }

        function CVContextData() {
          var t;
          this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1;
          for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
          this._length = 15
        }

        function CVBaseElement() {}

        function CVImageElement(t, e, r) {
          this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getAsset(this.assetData), this.initElement(t, e, r)
        }

        function CVCompElement(t, e, r) {
          this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
          }
        }

        function CVMaskElement(t, e) {
          var r;
          this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
          var i = this.masksProperties.length,
            a = !1;
          for (r = 0; r < i; r += 1) "n" !== this.masksProperties[r].mode && (a = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
          this.hasMasks = a, a && this.element.addRenderableComponent(this)
        }

        function CVShapeElement(t, e, r) {
          this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, r)
        }

        function CVSolidElement(t, e, r) {
          this.initElement(t, e, r)
        }

        function CVTextElement(t, e, r) {
          this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
            fill: "rgba(0,0,0,0)",
            stroke: "rgba(0,0,0,0)",
            sWidth: 0,
            fValue: ""
          }, this.initElement(t, e, r)
        }

        function CVEffects() {}

        function HBaseElement() {}

        function HSolidElement(t, e, r) {
          this.initElement(t, e, r)
        }

        function HCompElement(t, e, r) {
          this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
            _placeholder: !0
          }
        }

        function HShapeElement(t, e, r) {
          this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
          }
        }

        function HTextElement(t, e, r) {
          this.textSpans = [], this.textPaths = [], this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
          }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r)
        }

        function HImageElement(t, e, r) {
          this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r)
        }

        function HCameraElement(t, e, r) {
          this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
          var i = PropertyFactory.getProp;
          if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
            var a, s = t.ks.or.k.length;
            for (a = 0; a < s; a += 1) t.ks.or.k[a].to = null, t.ks.or.k[a].ti = null
          }
          this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix, this._prevMat = new Matrix, this._isFirstFrame = !0, this.finalTransform = {
            mProp: this
          }
        }
        SVGMatte3Effect.prototype.findSymbol = function (t) {
          for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
            if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
            e += 1
          }
          return null
        }, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
          var r = t.layerElement.parentNode;
          if (r) {
            for (var i, a = r.children, s = 0, n = a.length; s < n && a[s] !== t.layerElement;) s += 1;
            s <= n - 2 && (i = a[s + 1]);
            var o = createNS("use");
            o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o)
          }
        }, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
          if (!this.findSymbol(e)) {
            var r = createElementID(),
              i = createNS("mask");
            i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
            var a = t.globalData.defs;
            a.appendChild(i);
            var s = createNS("symbol");
            s.setAttribute("id", r), this.replaceInParent(e, r), s.appendChild(e.layerElement), a.appendChild(s);
            var n = createNS("use");
            n.setAttribute("href", "#" + r), i.appendChild(n), e.data.hd = !1, e.show()
          }
          t.setMatte(e.layerId)
        }, SVGMatte3Effect.prototype.initialize = function () {
          for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
          this.initialized = !0
        }, SVGMatte3Effect.prototype.renderFrame = function () {
          this.initialized || this.initialize()
        }, SVGEffects.prototype.renderFrame = function (t) {
          var e, r = this.filters.length;
          for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t)
        }, CVContextData.prototype.duplicate = function () {
          var t = 2 * this._length,
            e = this.savedOp;
          this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
          var r = 0;
          for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
          this._length = t
        }, CVContextData.prototype.reset = function () {
          this.cArrPos = 0, this.cTr.reset(), this.cO = 1
        }, CVBaseElement.prototype = {
          createElements: function () {},
          initRendererElement: function () {},
          createContainerElements: function () {
            this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this)
          },
          createContent: function () {},
          setBlendMode: function () {
            var t = this.globalData;
            if (t.blendMode !== this.data.bm) {
              t.blendMode = this.data.bm;
              var e = getBlendMode(this.data.bm);
              t.canvasContext.globalCompositeOperation = e
            }
          },
          createRenderableComponents: function () {
            this.maskManager = new CVMaskElement(this.data, this)
          },
          hideElement: function () {
            this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
          },
          showElement: function () {
            this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
          },
          renderFrame: function () {
            if (!this.hidden && !this.data.hd) {
              this.renderTransform(), this.renderRenderable(), this.setBlendMode();
              var t = 0 === this.data.ty;
              this.globalData.renderer.save(t), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(t), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1)
            }
          },
          destroy: function () {
            this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
          },
          mHelper: new Matrix
        }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
          if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
            var t = createTag("canvas");
            t.width = this.assetData.w, t.height = this.assetData.h;
            var e, r, i = t.getContext("2d"),
              a = this.img.width,
              s = this.img.height,
              n = a / s,
              o = this.assetData.w / this.assetData.h,
              h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
            n > o && "xMidYMid slice" === h || n < o && "xMidYMid slice" !== h ? e = (r = s) * o : r = (e = a) / o, i.drawImage(this.img, (a - e) / 2, (s - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t
          }
        }, CVImageElement.prototype.renderInnerContent = function () {
          this.canvasContext.drawImage(this.img, 0, 0)
        }, CVImageElement.prototype.destroy = function () {
          this.img = null
        }, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
          var t, e = this.canvasContext;
          for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; t >= 0; t -= 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
        }, CVCompElement.prototype.destroy = function () {
          var t;
          for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
          this.layers = null, this.elements = null
        }, CVMaskElement.prototype.renderFrame = function () {
          if (this.hasMasks) {
            var t, e, r, i, a = this.element.finalTransform.mat,
              s = this.element.canvasContext,
              n = this.masksProperties.length;
            for (s.beginPath(), t = 0; t < n; t += 1)
              if ("n" !== this.masksProperties[t].mode) {
                var o;
                this.masksProperties[t].inv && (s.moveTo(0, 0), s.lineTo(this.element.globalData.compSize.w, 0), s.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), s.lineTo(0, this.element.globalData.compSize.h), s.lineTo(0, 0)), i = this.viewData[t].v, e = a.applyToPointArray(i.v[0][0], i.v[0][1], 0), s.moveTo(e[0], e[1]);
                var h = i._length;
                for (o = 1; o < h; o += 1) r = a.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                r = a.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
              } this.element.globalData.renderer.save(!0), s.clip()
          }
        }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
          this.element = null
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
          opacity: 1,
          _opMdf: !1
        }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
        }, CVShapeElement.prototype.createStyleElement = function (t, e) {
          var r = {
              data: t,
              type: t.ty,
              preTransforms: this.transformsManager.addTransformSequence(e),
              transforms: [],
              elements: [],
              closed: !0 === t.hd
            },
            i = {};
          if ("fl" === t.ty || "st" === t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bmFloor(i.c.v[0]) + "," + bmFloor(i.c.v[1]) + "," + bmFloor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
              k: 0
            }, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
              k: 0
            }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" === t.ty || "gs" === t.ty) {
            if (r.lc = lineCapEnum[t.lc || 2], r.lj = lineJoinEnum[t.lj || 2], 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
              var a = new DashProperty(this, t.d, "canvas", this);
              i.d = a, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0])
            }
          } else r.r = 2 === t.r ? "evenodd" : "nonzero";
          return this.stylesList.push(r), i.style = r, i
        }, CVShapeElement.prototype.createGroupElement = function () {
          return {
            it: [],
            prevViewData: []
          }
        }, CVShapeElement.prototype.createTransformElement = function (t) {
          return {
            transform: {
              opacity: 1,
              _opMdf: !1,
              key: this.transformsManager.getNewKey(),
              op: PropertyFactory.getProp(this, t.o, 0, .01, this),
              mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
            }
          }
        }, CVShapeElement.prototype.createShapeElement = function (t) {
          var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
          return this.shapes.push(e), this.addShapeToModifiers(e), e
        }, CVShapeElement.prototype.reloadShapes = function () {
          var t;
          this._isFirstFrame = !0;
          var e = this.itemsData.length;
          for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
          for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
          this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
        }, CVShapeElement.prototype.addTransformToStyleList = function (t) {
          var e, r = this.stylesList.length;
          for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
        }, CVShapeElement.prototype.removeTransformFromStyleList = function () {
          var t, e = this.stylesList.length;
          for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
        }, CVShapeElement.prototype.closeStyles = function (t) {
          var e, r = t.length;
          for (e = 0; e < r; e += 1) t[e].closed = !0
        }, CVShapeElement.prototype.searchShapes = function (t, e, r, i, a) {
          var s, n, o, h, l, p, d = t.length - 1,
            c = [],
            f = [],
            m = [].concat(a);
          for (s = d; s >= 0; s -= 1) {
            if ((h = this.searchProcessedElement(t[s])) ? e[s] = r[h - 1] : t[s]._shouldRender = i, "fl" === t[s].ty || "st" === t[s].ty || "gf" === t[s].ty || "gs" === t[s].ty) h ? e[s].style.closed = !1 : e[s] = this.createStyleElement(t[s], m), c.push(e[s].style);
            else if ("gr" === t[s].ty) {
              if (h)
                for (o = e[s].it.length, n = 0; n < o; n += 1) e[s].prevViewData[n] = e[s].it[n];
              else e[s] = this.createGroupElement(t[s]);
              this.searchShapes(t[s].it, e[s].it, e[s].prevViewData, i, m)
            } else "tr" === t[s].ty ? (h || (p = this.createTransformElement(t[s]), e[s] = p), m.push(e[s]), this.addTransformToStyleList(e[s])) : "sh" === t[s].ty || "rc" === t[s].ty || "el" === t[s].ty || "sr" === t[s].ty ? h || (e[s] = this.createShapeElement(t[s])) : "tm" === t[s].ty || "rd" === t[s].ty || "pb" === t[s].ty ? (h ? (l = e[s]).closed = !1 : ((l = ShapeModifiers.getModifier(t[s].ty)).init(this, t[s]), e[s] = l, this.shapeModifiers.push(l)), f.push(l)) : "rp" === t[s].ty && (h ? (l = e[s]).closed = !0 : (l = ShapeModifiers.getModifier(t[s].ty), e[s] = l, l.init(this, t, s, e), this.shapeModifiers.push(l), i = !1), f.push(l));
            this.addProcessedElement(t[s], s + 1)
          }
          for (this.removeTransformFromStyleList(), this.closeStyles(c), d = f.length, s = 0; s < d; s += 1) f[s].closed = !0
        }, CVShapeElement.prototype.renderInnerContent = function () {
          this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
        }, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
          (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
        }, CVShapeElement.prototype.drawLayer = function () {
          var t, e, r, i, a, s, n, o, h, l = this.stylesList.length,
            p = this.globalData.renderer,
            d = this.globalData.canvasContext;
          for (t = 0; t < l; t += 1)
            if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
              for (p.save(), s = h.elements, "st" === o || "gs" === o ? (d.strokeStyle = "st" === o ? h.co : h.grd, d.lineWidth = h.wi, d.lineCap = h.lc, d.lineJoin = h.lj, d.miterLimit = h.ml || 0) : d.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && d.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = s.length, e = 0; e < r; e += 1) {
                for ("st" !== o && "gs" !== o || (d.beginPath(), h.da && (d.setLineDash(h.da), d.lineDashOffset = h.do)), a = (n = s[e].trNodes).length, i = 0; i < a; i += 1) "m" === n[i].t ? d.moveTo(n[i].p[0], n[i].p[1]) : "c" === n[i].t ? d.bezierCurveTo(n[i].pts[0], n[i].pts[1], n[i].pts[2], n[i].pts[3], n[i].pts[4], n[i].pts[5]) : d.closePath();
                "st" !== o && "gs" !== o || (d.stroke(), h.da && d.setLineDash(this.dashResetter))
              }
              "st" !== o && "gs" !== o && d.fill(h.r), p.restore()
            }
        }, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
          var a, s;
          for (s = t, a = e.length - 1; a >= 0; a -= 1) "tr" === e[a].ty ? (s = r[a].transform, this.renderShapeTransform(t, s)) : "sh" === e[a].ty || "el" === e[a].ty || "rc" === e[a].ty || "sr" === e[a].ty ? this.renderPath(e[a], r[a]) : "fl" === e[a].ty ? this.renderFill(e[a], r[a], s) : "st" === e[a].ty ? this.renderStroke(e[a], r[a], s) : "gf" === e[a].ty || "gs" === e[a].ty ? this.renderGradientFill(e[a], r[a], s) : "gr" === e[a].ty ? this.renderShape(s, e[a].it, r[a].it) : e[a].ty;
          i && this.drawLayer()
        }, CVShapeElement.prototype.renderStyledShape = function (t, e) {
          if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
            var r, i, a, s = t.trNodes,
              n = e.paths,
              o = n._length;
            s.length = 0;
            var h = t.transforms.finalTransform;
            for (a = 0; a < o; a += 1) {
              var l = n.shapes[a];
              if (l && l.v) {
                for (i = l._length, r = 1; r < i; r += 1) 1 === r && s.push({
                  t: "m",
                  p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                }), s.push({
                  t: "c",
                  pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
                });
                1 === i && s.push({
                  t: "m",
                  p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
                }), l.c && i && (s.push({
                  t: "c",
                  pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
                }), s.push({
                  t: "z"
                }))
              }
            }
            t.trNodes = s
          }
        }, CVShapeElement.prototype.renderPath = function (t, e) {
          if (!0 !== t.hd && t._shouldRender) {
            var r, i = e.styledShapes.length;
            for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh)
          }
        }, CVShapeElement.prototype.renderFill = function (t, e, r) {
          var i = e.style;
          (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
        }, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
          var i, a = e.style;
          if (!a.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
            var s, n = this.globalData.canvasContext,
              o = e.s.v,
              h = e.e.v;
            if (1 === t.t) i = n.createLinearGradient(o[0], o[1], h[0], h[1]);
            else {
              var l = Math.sqrt(Math.pow(o[0] - h[0], 2) + Math.pow(o[1] - h[1], 2)),
                p = Math.atan2(h[1] - o[1], h[0] - o[0]),
                d = e.h.v;
              d >= 1 ? d = .99 : d <= -1 && (d = -.99);
              var c = l * d,
                f = Math.cos(p + e.a.v) * c + o[0],
                m = Math.sin(p + e.a.v) * c + o[1];
              i = n.createRadialGradient(f, m, 0, o[0], o[1], l)
            }
            var u = t.g.p,
              y = e.g.c,
              g = 1;
            for (s = 0; s < u; s += 1) e.g._hasOpacity && e.g._collapsable && (g = e.g.o[2 * s + 1]), i.addColorStop(y[4 * s] / 100, "rgba(" + y[4 * s + 1] + "," + y[4 * s + 2] + "," + y[4 * s + 3] + "," + g + ")");
            a.grd = i
          }
          a.coOp = e.o.v * r.opacity
        }, CVShapeElement.prototype.renderStroke = function (t, e, r) {
          var i = e.style,
            a = e.d;
          a && (a._mdf || this._isFirstFrame) && (i.da = a.dashArray, i.do = a.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
        }, CVShapeElement.prototype.destroy = function () {
          this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
          var t = this.canvasContext;
          t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
        }, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
          var t = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
          var e = !1;
          t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
          var r = !1;
          t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
          var i, a, s, n, o, h, l, p, d, c, f, m, u = this.globalData.fontManager.getFontByName(t.f),
            y = t.l,
            g = this.mHelper;
          this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, a = t.finalText.length;
          var _ = this.data.singleShape,
            v = .001 * t.tr * t.finalSize,
            b = 0,
            E = 0,
            S = !0,
            P = 0;
          for (i = 0; i < a; i += 1) {
            for (n = (s = this.globalData.fontManager.getCharData(t.finalText[i], u.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && s.data || {}, g.reset(), _ && y[i].n && (b = -v, E += t.yOffset, E += S ? 1 : 0, S = !1), d = (l = n.shapes ? n.shapes[0].it : []).length, g.scale(t.finalSize / 100, t.finalSize / 100), _ && this.applyTextPropertiesToMatrix(t, g, y[i].line, b, E), f = createSizedArray(d), p = 0; p < d; p += 1) {
              for (h = l[p].ks.k.i.length, c = l[p].ks.k, m = [], o = 1; o < h; o += 1) 1 === o && m.push(g.applyToX(c.v[0][0], c.v[0][1], 0), g.applyToY(c.v[0][0], c.v[0][1], 0)), m.push(g.applyToX(c.o[o - 1][0], c.o[o - 1][1], 0), g.applyToY(c.o[o - 1][0], c.o[o - 1][1], 0), g.applyToX(c.i[o][0], c.i[o][1], 0), g.applyToY(c.i[o][0], c.i[o][1], 0), g.applyToX(c.v[o][0], c.v[o][1], 0), g.applyToY(c.v[o][0], c.v[o][1], 0));
              m.push(g.applyToX(c.o[o - 1][0], c.o[o - 1][1], 0), g.applyToY(c.o[o - 1][0], c.o[o - 1][1], 0), g.applyToX(c.i[0][0], c.i[0][1], 0), g.applyToY(c.i[0][0], c.i[0][1], 0), g.applyToX(c.v[0][0], c.v[0][1], 0), g.applyToY(c.v[0][0], c.v[0][1], 0)), f[p] = m
            }
            _ && (b += y[i].l, b += v), this.textSpans[P] ? this.textSpans[P].elem = f : this.textSpans[P] = {
              elem: f
            }, P += 1
          }
        }, CVTextElement.prototype.renderInnerContent = function () {
          var t, e, r, i, a, s, n = this.canvasContext;
          n.font = this.values.fValue, n.lineCap = "butt", n.lineJoin = "miter", n.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
          var o, h = this.textAnimator.renderedLetters,
            l = this.textProperty.currentData.l;
          e = l.length;
          var p, d, c = null,
            f = null,
            m = null;
          for (t = 0; t < e; t += 1)
            if (!l[t].n) {
              if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
                for (o && o.fc ? c !== o.fc && (c = o.fc, n.fillStyle = o.fc) : c !== this.values.fill && (c = this.values.fill, n.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
                  for (s = (d = p[r]).length, this.globalData.canvasContext.moveTo(d[0], d[1]), a = 2; a < s; a += 6) this.globalData.canvasContext.bezierCurveTo(d[a], d[a + 1], d[a + 2], d[a + 3], d[a + 4], d[a + 5]);
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
              }
              if (this.stroke) {
                for (o && o.sw ? m !== o.sw && (m = o.sw, n.lineWidth = o.sw) : m !== this.values.sWidth && (m = this.values.sWidth, n.lineWidth = this.values.sWidth), o && o.sc ? f !== o.sc && (f = o.sc, n.strokeStyle = o.sc) : f !== this.values.stroke && (f = this.values.stroke, n.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
                  for (s = (d = p[r]).length, this.globalData.canvasContext.moveTo(d[0], d[1]), a = 2; a < s; a += 6) this.globalData.canvasContext.bezierCurveTo(d[a], d[a + 1], d[a + 2], d[a + 3], d[a + 4], d[a + 5]);
                this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
              }
              o && this.globalData.renderer.restore()
            }
        }, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = {
          checkBlendMode: function () {},
          initRendererElement: function () {
            this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement)
          },
          createContainerElements: function () {
            this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode()
          },
          renderElement: function () {
            var t = this.transformedElement ? this.transformedElement.style : {};
            if (this.finalTransform._matMdf) {
              var e = this.finalTransform.mat.toCSS();
              t.transform = e, t.webkitTransform = e
            }
            this.finalTransform._opMdf && (t.opacity = this.finalTransform.mProp.o.v)
          },
          renderFrame: function () {
            this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
          },
          destroy: function () {
            this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
          },
          createRenderableComponents: function () {
            this.maskManager = new MaskElement(this.data, this, this.globalData)
          },
          addEffects: function () {},
          setMatte: function () {}
        }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
          var t;
          this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t)
        }, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
          this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
        }, HCompElement.prototype.addTo3dContainer = function (t, e) {
          for (var r, i = 0; i < e;) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
          r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
        }, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
          var t;
          if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;
          else {
            t = createNS("svg");
            var e = this.comp.data ? this.comp.data : this.globalData.compSize;
            t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t)
          }
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t
        }, HShapeElement.prototype.getTransformedPoint = function (t, e) {
          var r, i = t.length;
          for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
          return e
        }, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
          var r, i, a, s, n, o = t.sh.v,
            h = t.transformers,
            l = o._length;
          if (!(l <= 1)) {
            for (r = 0; r < l - 1; r += 1) i = this.getTransformedPoint(h, o.v[r]), a = this.getTransformedPoint(h, o.o[r]), s = this.getTransformedPoint(h, o.i[r + 1]), n = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, a, s, n, e);
            o.c && (i = this.getTransformedPoint(h, o.v[r]), a = this.getTransformedPoint(h, o.o[r]), s = this.getTransformedPoint(h, o.i[0]), n = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, a, s, n, e))
          }
        }, HShapeElement.prototype.checkBounds = function (t, e, r, i, a) {
          this.getBoundsOfCurve(t, e, r, i);
          var s = this.shapeBoundingBox;
          a.x = bmMin(s.left, a.x), a.xMax = bmMax(s.right, a.xMax), a.y = bmMin(s.top, a.y), a.yMax = bmMax(s.bottom, a.yMax)
        }, HShapeElement.prototype.shapeBoundingBox = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }, HShapeElement.prototype.tempBoundingBox = {
          x: 0,
          xMax: 0,
          y: 0,
          yMax: 0,
          width: 0,
          height: 0
        }, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
          for (var a, s, n, o, h, l, p, d = [
              [t[0], i[0]],
              [t[1], i[1]]
            ], c = 0; c < 2; ++c) s = 6 * t[c] - 12 * e[c] + 6 * r[c], a = -3 * t[c] + 9 * e[c] - 9 * r[c] + 3 * i[c], n = 3 * e[c] - 3 * t[c], s |= 0, n |= 0, 0 === (a |= 0) && 0 === s || (0 === a ? (o = -n / s) > 0 && o < 1 && d[c].push(this.calculateF(o, t, e, r, i, c)) : (h = s * s - 4 * n * a) >= 0 && ((l = (-s + bmSqrt(h)) / (2 * a)) > 0 && l < 1 && d[c].push(this.calculateF(l, t, e, r, i, c)), (p = (-s - bmSqrt(h)) / (2 * a)) > 0 && p < 1 && d[c].push(this.calculateF(p, t, e, r, i, c))));
          this.shapeBoundingBox.left = bmMin.apply(null, d[0]), this.shapeBoundingBox.top = bmMin.apply(null, d[1]), this.shapeBoundingBox.right = bmMax.apply(null, d[0]), this.shapeBoundingBox.bottom = bmMax.apply(null, d[1])
        }, HShapeElement.prototype.calculateF = function (t, e, r, i, a, s) {
          return bmPow(1 - t, 3) * e[s] + 3 * bmPow(1 - t, 2) * t * r[s] + 3 * (1 - t) * bmPow(t, 2) * i[s] + bmPow(t, 3) * a[s]
        }, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
          var r, i = t.length;
          for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e)
        }, HShapeElement.prototype.currentBoxContains = function (t) {
          return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
        }, HShapeElement.prototype.renderInnerContent = function () {
          if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
            var t = this.tempBoundingBox,
              e = 999999;
            if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
            var r = !1;
            if (this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) {
              this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
              var i = this.shapeCont.style,
                a = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
              i.transform = a, i.webkitTransform = a
            }
          }
        }, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
          if (this.isMasked = this.checkMasks(), this.isMasked) {
            this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
            var t = createNS("g");
            this.maskedElement.appendChild(t), this.innerElem = t
          } else this.renderType = "html", this.innerElem = this.layerElement;
          this.checkParenting()
        }, HTextElement.prototype.buildNewText = function () {
          var t = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
          var e = this.innerElem.style,
            r = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)";
          e.fill = r, e.color = r, t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
          var i, a, s = this.globalData.fontManager.getFontByName(t.f);
          if (!this.globalData.fontManager.chars)
            if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", s.fClass) this.innerElem.className = s.fClass;
            else {
              e.fontFamily = s.fFamily;
              var n = t.fWeight,
                o = t.fStyle;
              e.fontStyle = o, e.fontWeight = n
            } var h, l, p, d = t.l;
          a = d.length;
          var c, f = this.mHelper,
            m = "",
            u = 0;
          for (i = 0; i < a; i += 1) {
            if (this.globalData.fontManager.chars ? (this.textPaths[u] ? h = this.textPaths[u] : ((h = createNS("path")).setAttribute("stroke-linecap", lineCapEnum[1]), h.setAttribute("stroke-linejoin", lineJoinEnum[2]), h.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[u] ? p = (l = this.textSpans[u]).children[0] : ((l = createTag("div")).style.lineHeight = 0, (p = createNS("svg")).appendChild(h), styleDiv(l)))) : this.isMasked ? h = this.textPaths[u] ? this.textPaths[u] : createNS("text") : this.textSpans[u] ? (l = this.textSpans[u], h = this.textPaths[u]) : (styleDiv(l = createTag("span")), styleDiv(h = createTag("span")), l.appendChild(h)), this.globalData.fontManager.chars) {
              var y, g = this.globalData.fontManager.getCharData(t.finalText[i], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
              if (y = g ? g.data : null, f.reset(), y && y.shapes && (c = y.shapes[0].it, f.scale(t.finalSize / 100, t.finalSize / 100), m = this.createPathShape(f, c), h.setAttribute("d", m)), this.isMasked) this.innerElem.appendChild(h);
              else {
                if (this.innerElem.appendChild(l), y && y.shapes) {
                  document.body.appendChild(p);
                  var _ = p.getBBox();
                  p.setAttribute("width", _.width + 2), p.setAttribute("height", _.height + 2), p.setAttribute("viewBox", _.x - 1 + " " + (_.y - 1) + " " + (_.width + 2) + " " + (_.height + 2));
                  var v = p.style,
                    b = "translate(" + (_.x - 1) + "px," + (_.y - 1) + "px)";
                  v.transform = b, v.webkitTransform = b, d[i].yOffset = _.y - 1
                } else p.setAttribute("width", 1), p.setAttribute("height", 1);
                l.appendChild(p)
              }
            } else if (h.textContent = d[i].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked) this.innerElem.appendChild(h);
            else {
              this.innerElem.appendChild(l);
              var E = h.style,
                S = "translate3d(0," + -t.finalSize / 1.2 + "px,0)";
              E.transform = S, E.webkitTransform = S
            }
            this.isMasked ? this.textSpans[u] = h : this.textSpans[u] = l, this.textSpans[u].style.display = "block", this.textPaths[u] = h, u += 1
          }
          for (; u < this.textSpans.length;) this.textSpans[u].style.display = "none", u += 1
        }, HTextElement.prototype.renderInnerContent = function () {
          var t;
          if (this.data.singleShape) {
            if (!this._isFirstFrame && !this.lettersChangedFlag) return;
            if (this.isMasked && this.finalTransform._matMdf) {
              this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), t = this.svgElement.style;
              var e = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
              t.transform = e, t.webkitTransform = e
            }
          }
          if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
            var r, i, a, s, n, o = 0,
              h = this.textAnimator.renderedLetters,
              l = this.textProperty.currentData.l;
            for (i = l.length, r = 0; r < i; r += 1) l[r].n ? o += 1 : (s = this.textSpans[r], n = this.textPaths[r], a = h[o], o += 1, a._mdf.m && (this.isMasked ? s.setAttribute("transform", a.m) : (s.style.webkitTransform = a.m, s.style.transform = a.m)), s.style.opacity = a.o, a.sw && a._mdf.sw && n.setAttribute("stroke-width", a.sw), a.sc && a._mdf.sc && n.setAttribute("stroke", a.sc), a.fc && a._mdf.fc && (n.setAttribute("fill", a.fc), n.style.color = a.fc));
            if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
              var p = this.innerElem.getBBox();
              this.currentBBox.w !== p.width && (this.currentBBox.w = p.width, this.svgElement.setAttribute("width", p.width)), this.currentBBox.h !== p.height && (this.currentBBox.h = p.height, this.svgElement.setAttribute("height", p.height));
              if (this.currentBBox.w !== p.width + 2 || this.currentBBox.h !== p.height + 2 || this.currentBBox.x !== p.x - 1 || this.currentBBox.y !== p.y - 1) {
                this.currentBBox.w = p.width + 2, this.currentBBox.h = p.height + 2, this.currentBBox.x = p.x - 1, this.currentBBox.y = p.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), t = this.svgElement.style;
                var d = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
                t.transform = d, t.webkitTransform = d
              }
            }
          }
        }, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
          var t = this.globalData.getAssetsPath(this.assetData),
            e = new Image;
          this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.crossOrigin = "anonymous", e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
        }, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
          var t, e, r, i, a = this.comp.threeDElements.length;
          for (t = 0; t < a; t += 1)
            if ("3d" === (e = this.comp.threeDElements[t]).type) {
              r = e.perspectiveElem.style, i = e.container.style;
              var s = this.pe.v + "px",
                n = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
              r.perspective = s, r.webkitPerspective = s, i.transformOrigin = "0px 0px 0px", i.mozTransformOrigin = "0px 0px 0px", i.webkitTransformOrigin = "0px 0px 0px", r.transform = n, r.webkitTransform = n
            }
        }, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
          var t, e, r = this._isFirstFrame;
          if (this.hierarchy)
            for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
          if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
            if (this.mat.reset(), this.hierarchy)
              for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
                var i = this.hierarchy[t].finalTransform.mProp;
                this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2])
              }
            if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
              var a;
              a = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
              var s = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2)),
                n = [a[0] / s, a[1] / s, a[2] / s],
                o = Math.sqrt(n[2] * n[2] + n[0] * n[0]),
                h = Math.atan2(n[1], o),
                l = Math.atan2(n[0], -n[2]);
              this.mat.rotateY(l).rotateX(-h)
            }
            this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
            var p = !this._prevMat.equals(this.mat);
            if ((p || this.pe._mdf) && this.comp.threeDElements) {
              var d, c, f;
              for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1)
                if ("3d" === (d = this.comp.threeDElements[t]).type) {
                  if (p) {
                    var m = this.mat.toCSS();
                    (f = d.container.style).transform = m, f.webkitTransform = m
                  }
                  this.pe._mdf && ((c = d.perspectiveElem.style).perspective = this.pe.v + "px", c.webkitPerspective = this.pe.v + "px")
                } this.mat.clone(this._prevMat)
            }
          }
          this._isFirstFrame = !1
        }, HCameraElement.prototype.prepareFrame = function (t) {
          this.prepareProperties(t, !0)
        }, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.getBaseElement = function () {
          return null
        };
        var animationManager = function () {
            var t = {},
              e = [],
              r = 0,
              i = 0,
              a = 0,
              s = !0,
              n = !1;

            function o(t) {
              for (var r = 0, a = t.target; r < i;) e[r].animation === a && (e.splice(r, 1), r -= 1, i -= 1, a.isPaused || p()), r += 1
            }

            function h(t, r) {
              if (!t) return null;
              for (var a = 0; a < i;) {
                if (e[a].elem === t && null !== e[a].elem) return e[a].animation;
                a += 1
              }
              var s = new AnimationItem;
              return d(s, t), s.setData(t, r), s
            }

            function l() {
              a += 1, m()
            }

            function p() {
              a -= 1
            }

            function d(t, r) {
              t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
                elem: r,
                animation: t
              }), i += 1
            }

            function c(t) {
              var o, h = t - r;
              for (o = 0; o < i; o += 1) e[o].animation.advanceTime(h);
              r = t, a && !n ? window.requestAnimationFrame(c) : s = !0
            }

            function f(t) {
              r = t, window.requestAnimationFrame(c)
            }

            function m() {
              !n && a && s && (window.requestAnimationFrame(f), s = !1)
            }
            return t.registerAnimation = h, t.loadAnimation = function (t) {
              var e = new AnimationItem;
              return d(e, null), e.setParams(t), e
            }, t.setSpeed = function (t, r) {
              var a;
              for (a = 0; a < i; a += 1) e[a].animation.setSpeed(t, r)
            }, t.setDirection = function (t, r) {
              var a;
              for (a = 0; a < i; a += 1) e[a].animation.setDirection(t, r)
            }, t.play = function (t) {
              var r;
              for (r = 0; r < i; r += 1) e[r].animation.play(t)
            }, t.pause = function (t) {
              var r;
              for (r = 0; r < i; r += 1) e[r].animation.pause(t)
            }, t.stop = function (t) {
              var r;
              for (r = 0; r < i; r += 1) e[r].animation.stop(t)
            }, t.togglePause = function (t) {
              var r;
              for (r = 0; r < i; r += 1) e[r].animation.togglePause(t)
            }, t.searchAnimations = function (t, e, r) {
              var i, a = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
                s = a.length;
              for (i = 0; i < s; i += 1) r && a[i].setAttribute("data-bm-type", r), h(a[i], t);
              if (e && 0 === s) {
                r || (r = "svg");
                var n = document.getElementsByTagName("body")[0];
                n.innerText = "";
                var o = createTag("div");
                o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), n.appendChild(o), h(o, t)
              }
            }, t.resize = function () {
              var t;
              for (t = 0; t < i; t += 1) e[t].animation.resize()
            }, t.goToAndStop = function (t, r, a) {
              var s;
              for (s = 0; s < i; s += 1) e[s].animation.goToAndStop(t, r, a)
            }, t.destroy = function (t) {
              var r;
              for (r = i - 1; r >= 0; r -= 1) e[r].animation.destroy(t)
            }, t.freeze = function () {
              n = !0
            }, t.unfreeze = function () {
              n = !1, m()
            }, t.setVolume = function (t, r) {
              var a;
              for (a = 0; a < i; a += 1) e[a].animation.setVolume(t, r)
            }, t.mute = function (t) {
              var r;
              for (r = 0; r < i; r += 1) e[r].animation.mute(t)
            }, t.unmute = function (t) {
              var r;
              for (r = 0; r < i; r += 1) e[r].animation.unmute(t)
            }, t.getRegisteredAnimations = function () {
              var t, r = e.length,
                i = [];
              for (t = 0; t < r; t += 1) i.push(e[t].animation);
              return i
            }, t
          }(),
          AnimationItem = function () {
            this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader, this.audioController = audioControllerFactory(), this.markers = [], this.configAnimation = this.configAnimation.bind(this), this.onSetupError = this.onSetupError.bind(this), this.onSegmentComplete = this.onSegmentComplete.bind(this)
          };
        extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
          (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
          var e = "svg";
          switch (t.animType ? e = t.animType : t.renderer && (e = t.renderer), e) {
            case "canvas":
              this.renderer = new CanvasRenderer(this, t.rendererSettings);
              break;
            case "svg":
              this.renderer = new SVGRenderer(this, t.rendererSettings);
              break;
            default:
              this.renderer = new HybridRenderer(this, t.rendererSettings)
          }
          this.imagePreloader.setCacheType(e, this.renderer.globalData.defs), this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop ? this.loop = !0 : !1 === t.loop ? this.loop = !1 : this.loop = parseInt(t.loop, 10), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !Object.prototype.hasOwnProperty.call(t, "autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, this.initialSegment = t.initialSegment, t.audioFactory && this.audioController.setAudioFactory(t.audioFactory), t.animationData ? this.setupAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), dataManager.loadAnimation(t.path, this.configAnimation, this.onSetupError))
        }, AnimationItem.prototype.onSetupError = function () {
          this.trigger("data_failed")
        }, AnimationItem.prototype.setupAnimation = function (t) {
          dataManager.completeAnimation(t, this.configAnimation)
        }, AnimationItem.prototype.setData = function (t, e) {
          e && "object" != typeof e && (e = JSON.parse(e));
          var r = {
              wrapper: t,
              animationData: e
            },
            i = t.attributes;
          r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
          var a = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
          "false" === a ? r.loop = !1 : "true" === a ? r.loop = !0 : "" !== a && (r.loop = parseInt(a, 10));
          var s = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
          r.autoplay = "false" !== s, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r)
        }, AnimationItem.prototype.includeLayers = function (t) {
          t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
          var e, r, i = this.animationData.layers,
            a = i.length,
            s = t.layers,
            n = s.length;
          for (r = 0; r < n; r += 1)
            for (e = 0; e < a;) {
              if (i[e].id === s[r].id) {
                i[e] = s[r];
                break
              }
              e += 1
            }
          if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
            for (a = t.assets.length, e = 0; e < a; e += 1) this.animationData.assets.push(t.assets[e]);
          this.animationData.__complete = !1, dataManager.completeAnimation(this.animationData, this.onSegmentComplete)
        }, AnimationItem.prototype.onSegmentComplete = function (t) {
          this.animationData = t, expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment()
        }, AnimationItem.prototype.loadNextSegment = function () {
          var t = this.animationData.segments;
          if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.totalFrames);
          var e = t.shift();
          this.timeCompleted = e.time * this.frameRate;
          var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
          this.segmentPos += 1, dataManager.loadData(r, this.includeLayers.bind(this), function () {
            this.trigger("data_failed")
          }.bind(this))
        }, AnimationItem.prototype.loadSegments = function () {
          this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
        }, AnimationItem.prototype.imagesLoaded = function () {
          this.trigger("loaded_images"), this.checkLoaded()
        }, AnimationItem.prototype.preloadImages = function () {
          this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
        }, AnimationItem.prototype.configAnimation = function (t) {
          if (this.renderer) try {
            this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.markers = markerParser(t.markers || []), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), this.isPaused && this.audioController.pause()
          } catch (t) {
            this.triggerConfigError(t)
          }
        }, AnimationItem.prototype.waitForFontsLoaded = function () {
          this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
        }, AnimationItem.prototype.checkLoaded = function () {
          !this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || "canvas" !== this.renderer.rendererType) && this.imagePreloader.loadedFootages() && (this.isLoaded = !0, expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
            this.trigger("DOMLoaded")
          }.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
        }, AnimationItem.prototype.resize = function () {
          this.renderer.updateContainerSize()
        }, AnimationItem.prototype.setSubframe = function (t) {
          this.isSubframeEnabled = !!t
        }, AnimationItem.prototype.gotoFrame = function () {
          this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame(), this.trigger("drawnFrame")
        }, AnimationItem.prototype.renderFrame = function () {
          if (!1 !== this.isLoaded && this.renderer) try {
            this.renderer.renderFrame(this.currentFrame + this.firstFrame)
          } catch (t) {
            this.triggerRenderFrameError(t)
          }
        }, AnimationItem.prototype.play = function (t) {
          t && this.name !== t || !0 === this.isPaused && (this.isPaused = !1, this.audioController.resume(), this._idle && (this._idle = !1, this.trigger("_active")))
        }, AnimationItem.prototype.pause = function (t) {
          t && this.name !== t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"), this.audioController.pause())
        }, AnimationItem.prototype.togglePause = function (t) {
          t && this.name !== t || (!0 === this.isPaused ? this.play() : this.pause())
        }, AnimationItem.prototype.stop = function (t) {
          t && this.name !== t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
        }, AnimationItem.prototype.getMarkerData = function (t) {
          for (var e, r = 0; r < this.markers.length; r += 1)
            if ((e = this.markers[r]).payload && e.payload.name === t) return e;
          return null
        }, AnimationItem.prototype.goToAndStop = function (t, e, r) {
          if (!r || this.name === r) {
            var i = Number(t);
            if (isNaN(i)) {
              var a = this.getMarkerData(t);
              a && this.goToAndStop(a.time, !0)
            } else e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier);
            this.pause()
          }
        }, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
          if (!r || this.name === r) {
            var i = Number(t);
            if (isNaN(i)) {
              var a = this.getMarkerData(t);
              a && (a.duration ? this.playSegments([a.time, a.time + a.duration], !0) : this.goToAndStop(a.time, !0))
            } else this.goToAndStop(i, e, r);
            this.play()
          }
        }, AnimationItem.prototype.advanceTime = function (t) {
          if (!0 !== this.isPaused && !1 !== this.isLoaded) {
            var e = this.currentRawFrame + t * this.frameModifier,
              r = !1;
            e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"))
          }
        }, AnimationItem.prototype.adjustSegment = function (t, e) {
          this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.timeCompleted = this.totalFrames, this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.timeCompleted = this.totalFrames, this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
        }, AnimationItem.prototype.setSegment = function (t, e) {
          var r = -1;
          this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.totalFrames = e - t, this.timeCompleted = this.totalFrames, -1 !== r && this.goToAndStop(r, !0)
        }, AnimationItem.prototype.playSegments = function (t, e) {
          if (e && (this.segments.length = 0), "object" == typeof t[0]) {
            var r, i = t.length;
            for (r = 0; r < i; r += 1) this.segments.push(t[r])
          } else this.segments.push(t);
          this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
        }, AnimationItem.prototype.resetSegments = function (t) {
          this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
        }, AnimationItem.prototype.checkSegments = function (t) {
          return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
        }, AnimationItem.prototype.destroy = function (t) {
          t && this.name !== t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.renderer = null, this.imagePreloader = null, this.projectInterface = null)
        }, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
          this.currentRawFrame = t, this.gotoFrame()
        }, AnimationItem.prototype.setSpeed = function (t) {
          this.playSpeed = t, this.updaFrameModifier()
        }, AnimationItem.prototype.setDirection = function (t) {
          this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
        }, AnimationItem.prototype.setVolume = function (t, e) {
          e && this.name !== e || this.audioController.setVolume(t)
        }, AnimationItem.prototype.getVolume = function () {
          return this.audioController.getVolume()
        }, AnimationItem.prototype.mute = function (t) {
          t && this.name !== t || this.audioController.mute()
        }, AnimationItem.prototype.unmute = function (t) {
          t && this.name !== t || this.audioController.unmute()
        }, AnimationItem.prototype.updaFrameModifier = function () {
          this.frameModifier = this.frameMult * this.playSpeed * this.playDirection, this.audioController.setRate(this.playSpeed * this.playDirection)
        }, AnimationItem.prototype.getPath = function () {
          return this.path
        }, AnimationItem.prototype.getAssetsPath = function (t) {
          var e = "";
          if (t.e) e = t.p;
          else if (this.assetsPath) {
            var r = t.p; - 1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r
          } else e = this.path, e += t.u ? t.u : "", e += t.p;
          return e
        }, AnimationItem.prototype.getAssetData = function (t) {
          for (var e = 0, r = this.assets.length; e < r;) {
            if (t === this.assets[e].id) return this.assets[e];
            e += 1
          }
          return null
        }, AnimationItem.prototype.hide = function () {
          this.renderer.hide()
        }, AnimationItem.prototype.show = function () {
          this.renderer.show()
        }, AnimationItem.prototype.getDuration = function (t) {
          return t ? this.totalFrames : this.totalFrames / this.frameRate
        }, AnimationItem.prototype.trigger = function (t) {
          if (this._cbs && this._cbs[t]) switch (t) {
            case "enterFrame":
            case "drawnFrame":
              this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
              break;
            case "loopComplete":
              this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
              break;
            case "complete":
              this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
              break;
            case "segmentStart":
              this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
              break;
            case "destroy":
              this.triggerEvent(t, new BMDestroyEvent(t, this));
              break;
            default:
              this.triggerEvent(t)
          }
          "enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
        }, AnimationItem.prototype.triggerRenderFrameError = function (t) {
          var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
          this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
        }, AnimationItem.prototype.triggerConfigError = function (t) {
          var e = new BMConfigErrorEvent(t, this.currentFrame);
          this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
        };
        var Expressions = function () {
          var t = {};
          return t.initExpressions = function (t) {
            var e = 0,
              r = [];
            t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
              e += 1
            }, t.renderer.globalData.popExpression = function () {
              0 === (e -= 1) && function () {
                var t, e = r.length;
                for (t = 0; t < e; t += 1) r[t].release();
                r.length = 0
              }()
            }, t.renderer.globalData.registerExpressionProperty = function (t) {
              -1 === r.indexOf(t) && r.push(t)
            }
          }, t
        }();
        expressionsPlugin = Expressions;
        var ExpressionManager = function () {
            var ob = {},
              Math = BMMath;

            function initiateExpression(elem, data, property) {
              var val = data.x,
                needsVelocity = /velocity(?![\w\d])/.test(val),
                _needsRandom = -1 !== val.indexOf("random"),
                elemType = elem.data.ty,
                transform, content, effect, thisProperty = property,
                thisLayer, velocityAtTime, scoped_bm_rt;
              thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
                get: function () {
                  return thisProperty.v
                }
              }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0, elem.data.ip, elem.comp.globalData.frameRate, elem.data.op, elem.comp.globalData.frameRate, elem.data.sw && elem.data.sw, elem.data.sh && elem.data.sh, elem.data.nm;
              var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
                time, value;

              function seedRandom(t) {
                BMMath.seedrandom(randSeed + t)
              }
              property.kf && data.k.length, !this.data || this.data.hd,
                function (t, e) {
                  var r, i, a = this.pv.length ? this.pv.length : 1,
                    s = createTypedArray("float32", a);
                  var n = Math.floor(5 * time);
                  for (r = 0, i = 0; r < n;) {
                    for (i = 0; i < a; i += 1) s[i] += -e + 2 * e * BMMath.random();
                    r += 1
                  }
                  var o = 5 * time,
                    h = o - Math.floor(o),
                    l = createTypedArray("float32", a);
                  if (a > 1) {
                    for (i = 0; i < a; i += 1) l[i] = this.pv[i] + s[i] + (-e + 2 * e * BMMath.random()) * h;
                    return l
                  }
                  return this.pv + s[0] + (-e + 2 * e * BMMath.random()) * h
                }.bind(this), thisProperty.loopIn && thisProperty.loopIn.bind(thisProperty), thisProperty.loopOut && thisProperty.loopOut.bind(thisProperty), thisProperty.smooth && thisProperty.smooth.bind(thisProperty), this.getValueAtTime && this.getValueAtTime.bind(this), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this)), elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface), elem.data.ind;
              var hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                parent, randSeed = Math.floor(1e6 * Math.random());

              function executeExpression(t) {
                return value = t, this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (this.textIndex, this.textTotal, this.selectorValue), thisLayer || (elem.layerInterface.text, thisLayer = elem.layerInterface, elem.comp.compInterface, thisLayer.toWorld.bind(thisLayer), thisLayer.fromWorld.bind(thisLayer), thisLayer.fromComp.bind(thisLayer), thisLayer.toComp.bind(thisLayer), thisLayer.mask && thisLayer.mask.bind(thisLayer)), transform || (transform = elem.layerInterface("ADBE Transform Group")) && transform.anchorPoint, 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, _needsRandom && seedRandom(randSeed + time), needsVelocity && velocityAtTime(time), expression_function(), this.frameExpressionId = elem.globalData.frameId, scoped_bm_rt.propType, scoped_bm_rt)
              }
              return elem.globalData, executeExpression
            }
            return BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get, BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get, BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get, ob.initiateExpression = initiateExpression, ob
          }(),
          expressionHelpers = {
            searchExpressions: function (t, e, r) {
              e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
            },
            getSpeedAtTime: function (t) {
              var e = this.getValueAtTime(t),
                r = this.getValueAtTime(t + -.01),
                i = 0;
              if (e.length) {
                var a;
                for (a = 0; a < e.length; a += 1) i += Math.pow(r[a] - e[a], 2);
                i = 100 * Math.sqrt(i)
              } else i = 0;
              return i
            },
            getVelocityAtTime: function (t) {
              if (void 0 !== this.vel) return this.vel;
              var e, r, i = this.getValueAtTime(t),
                a = this.getValueAtTime(t + -.001);
              if (i.length)
                for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (a[r] - i[r]) / -.001;
              else e = (a - i) / -.001;
              return e
            },
            getValueAtTime: function (t) {
              return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
            },
            getStaticValueAtTime: function () {
              return this.pv
            },
            setGroupProperty: function (t) {
              this.propertyGroup = t
            }
          };
        ! function () {
          function t(t, e, r) {
            if (!this.k || !this.keyframes) return this.pv;
            t = t ? t.toLowerCase() : "";
            var i, a, s, n, o, h = this.comp.renderedFrame,
              l = this.keyframes,
              p = l[l.length - 1].t;
            if (h <= p) return this.pv;
            if (r ? a = p - (i = e ? Math.abs(p - this.elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (a = l[l.length - 1 - e].t)), "pingpong" === t) {
              if (Math.floor((h - a) / i) % 2 != 0) return this.getValueAtTime((i - (h - a) % i + a) / this.comp.globalData.frameRate, 0)
            } else {
              if ("offset" === t) {
                var d = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  f = this.getValueAtTime(((h - a) % i + a) / this.comp.globalData.frameRate, 0),
                  m = Math.floor((h - a) / i);
                if (this.pv.length) {
                  for (n = (o = new Array(d.length)).length, s = 0; s < n; s += 1) o[s] = (c[s] - d[s]) * m + f[s];
                  return o
                }
                return (c - d) * m + f
              }
              if ("continue" === t) {
                var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (n = (o = new Array(u.length)).length, s = 0; s < n; s += 1) o[s] = u[s] + (u[s] - y[s]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
                  return o
                }
                return u + (h - p) / .001 * (u - y)
              }
            }
            return this.getValueAtTime(((h - a) % i + a) / this.comp.globalData.frameRate, 0)
          }

          function e(t, e, r) {
            if (!this.k) return this.pv;
            t = t ? t.toLowerCase() : "";
            var i, a, s, n, o, h = this.comp.renderedFrame,
              l = this.keyframes,
              p = l[0].t;
            if (h >= p) return this.pv;
            if (r ? a = p + (i = e ? Math.abs(this.elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (a = l[e].t) - p), "pingpong" === t) {
              if (Math.floor((p - h) / i) % 2 == 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
            } else {
              if ("offset" === t) {
                var d = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime(a / this.comp.globalData.frameRate, 0),
                  f = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
                  m = Math.floor((p - h) / i) + 1;
                if (this.pv.length) {
                  for (n = (o = new Array(d.length)).length, s = 0; s < n; s += 1) o[s] = f[s] - (c[s] - d[s]) * m;
                  return o
                }
                return f - (c - d) * m
              }
              if ("continue" === t) {
                var u = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
                  y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (n = (o = new Array(u.length)).length, s = 0; s < n; s += 1) o[s] = u[s] + (u[s] - y[s]) * (p - h) / .001;
                  return o
                }
                return u + (u - y) * (p - h) / .001
              }
            }
            return this.getValueAtTime((i - ((p - h) % i + p)) / this.comp.globalData.frameRate, 0)
          }

          function r(t, e) {
            if (!this.k) return this.pv;
            if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
            var r, i, a = this.comp.renderedFrame / this.comp.globalData.frameRate,
              s = a - t,
              n = e > 1 ? (a + t - s) / (e - 1) : 1,
              o = 0,
              h = 0;
            for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
              if (i = this.getValueAtTime(s + o * n), this.pv.length)
                for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];
              else r += i;
              o += 1
            }
            if (this.pv.length)
              for (h = 0; h < this.pv.length; h += 1) r[h] /= e;
            else r /= e;
            return r
          }

          function i(t) {
            this._transformCachingAtTime || (this._transformCachingAtTime = {
              v: new Matrix
            });
            var e = this._transformCachingAtTime.v;
            if (e.cloneFromProps(this.pre.props), this.appliedTransformations < 1) {
              var r = this.a.getValueAtTime(t);
              e.translate(-r[0] * this.a.mult, -r[1] * this.a.mult, r[2] * this.a.mult)
            }
            if (this.appliedTransformations < 2) {
              var i = this.s.getValueAtTime(t);
              e.scale(i[0] * this.s.mult, i[1] * this.s.mult, i[2] * this.s.mult)
            }
            if (this.sk && this.appliedTransformations < 3) {
              var a = this.sk.getValueAtTime(t),
                s = this.sa.getValueAtTime(t);
              e.skewFromAxis(-a * this.sk.mult, s * this.sa.mult)
            }
            if (this.r && this.appliedTransformations < 4) {
              var n = this.r.getValueAtTime(t);
              e.rotate(-n * this.r.mult)
            } else if (!this.r && this.appliedTransformations < 4) {
              var o = this.rz.getValueAtTime(t),
                h = this.ry.getValueAtTime(t),
                l = this.rx.getValueAtTime(t),
                p = this.or.getValueAtTime(t);
              e.rotateZ(-o * this.rz.mult).rotateY(h * this.ry.mult).rotateX(l * this.rx.mult).rotateZ(-p[2] * this.or.mult).rotateY(p[1] * this.or.mult).rotateX(p[0] * this.or.mult)
            }
            if (this.data.p && this.data.p.s) {
              var d = this.px.getValueAtTime(t),
                c = this.py.getValueAtTime(t);
              if (this.data.p.z) {
                var f = this.pz.getValueAtTime(t);
                e.translate(d * this.px.mult, c * this.py.mult, -f * this.pz.mult)
              } else e.translate(d * this.px.mult, c * this.py.mult, 0)
            } else {
              var m = this.p.getValueAtTime(t);
              e.translate(m[0] * this.p.mult, m[1] * this.p.mult, -m[2] * this.p.mult)
            }
            return e
          }

          function a() {
            return this.v.clone(new Matrix)
          }
          var s = TransformPropertyFactory.getTransformProperty;
          TransformPropertyFactory.getTransformProperty = function (t, e, r) {
            var n = s(t, e, r);
            return n.dynamicProperties.length ? n.getValueAtTime = i.bind(n) : n.getValueAtTime = a.bind(n), n.setGroupProperty = expressionHelpers.setGroupProperty, n
          };
          var n = PropertyFactory.getProp;
          PropertyFactory.getProp = function (i, a, s, o, h) {
            var l = n(i, a, s, o, h);
            l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = r, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === a.a ? a.k.length : 0, l.propertyIndex = a.ix;
            var p = 0;
            return 0 !== s && (p = createTypedArray("float32", 1 === a.a ? a.k[0].s.length : a.k.length)), l._cachingAtTime = {
              lastFrame: initialDefaultFrame,
              lastIndex: 0,
              value: p
            }, expressionHelpers.searchExpressions(i, a, l), l.k && h.addDynamicProperty(l), l
          };
          var o = ShapePropertyFactory.getConstructorFunction(),
            h = ShapePropertyFactory.getKeyframedConstructorFunction();

          function l() {}
          l.prototype = {
            vertices: function (t, e) {
              this.k && this.getValue();
              var r, i = this.v;
              void 0 !== e && (i = this.getValueAtTime(e, 0));
              var a = i._length,
                s = i[t],
                n = i.v,
                o = createSizedArray(a);
              for (r = 0; r < a; r += 1) o[r] = "i" === t || "o" === t ? [s[r][0] - n[r][0], s[r][1] - n[r][1]] : [s[r][0], s[r][1]];
              return o
            },
            points: function (t) {
              return this.vertices("v", t)
            },
            inTangents: function (t) {
              return this.vertices("i", t)
            },
            outTangents: function (t) {
              return this.vertices("o", t)
            },
            isClosed: function () {
              return this.v.c
            },
            pointOnPath: function (t, e) {
              var r = this.v;
              void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
              for (var i, a = this._segmentsLength, s = a.lengths, n = a.totalLength * t, o = 0, h = s.length, l = 0; o < h;) {
                if (l + s[o].addedLength > n) {
                  var p = o,
                    d = r.c && o === h - 1 ? 0 : o + 1,
                    c = (n - l) / s[o].addedLength;
                  i = bez.getPointInSegment(r.v[p], r.v[d], r.o[p], r.i[d], c, s[o]);
                  break
                }
                l += s[o].addedLength, o += 1
              }
              return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i
            },
            vectorOnPath: function (t, e, r) {
              1 == t ? t = this.v.c : 0 == t && (t = .999);
              var i = this.pointOnPath(t, e),
                a = this.pointOnPath(t + .001, e),
                s = a[0] - i[0],
                n = a[1] - i[1],
                o = Math.sqrt(Math.pow(s, 2) + Math.pow(n, 2));
              return 0 === o ? [0, 0] : "tangent" === r ? [s / o, n / o] : [-n / o, s / o]
            },
            tangentOnPath: function (t, e) {
              return this.vectorOnPath(t, e, "tangent")
            },
            normalOnPath: function (t, e) {
              return this.vectorOnPath(t, e, "normal")
            },
            setGroupProperty: expressionHelpers.setGroupProperty,
            getValueAtTime: expressionHelpers.getStaticValueAtTime
          }, extendPrototype([l], o), extendPrototype([l], h), h.prototype.getValueAtTime = function (t) {
            return this._cachingAtTime || (this._cachingAtTime = {
              shapeValue: shapePool.clone(this.pv),
              lastIndex: 0,
              lastTime: initialDefaultFrame
            }), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
          }, h.prototype.initiateExpression = ExpressionManager.initiateExpression;
          var p = ShapePropertyFactory.getShapeProp;
          ShapePropertyFactory.getShapeProp = function (t, e, r, i, a) {
            var s = p(t, e, r, i, a);
            return s.propertyIndex = e.ix, s.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, s) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, s), s.k && t.addDynamicProperty(s), s
          }
        }(), TextProperty.prototype.getExpressionValue = function (t, e) {
          var r = this.calculateExpression(e);
          if (t.t !== r) {
            var i = {};
            return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i
          }
          return t
        }, TextProperty.prototype.searchProperty = function () {
          var t = this.searchKeyframes(),
            e = this.searchExpressions();
          return this.kf = t || e, this.kf
        }, TextProperty.prototype.searchExpressions = function () {
          return this.data.d.x ? (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0) : null
        };
        var ShapePathInterface = function (t, e, r) {
            var i = e.sh;

            function a(t) {
              return "Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t ? a.path : null
            }
            var s = propertyGroupFactory(a, r);
            return i.setGroupProperty(PropertyInterface("Path", s)), Object.defineProperties(a, {
              path: {
                get: function () {
                  return i.k && i.getValue(), i
                }
              },
              shape: {
                get: function () {
                  return i.k && i.getValue(), i
                }
              },
              _name: {
                value: t.nm
              },
              ix: {
                value: t.ix
              },
              propertyIndex: {
                value: t.ix
              },
              mn: {
                value: t.mn
              },
              propertyGroup: {
                value: r
              }
            }), a
          },
          propertyGroupFactory = function (t, e) {
            return function (r) {
              return (r = void 0 === r ? 1 : r) <= 0 ? t : e(r - 1)
            }
          },
          PropertyInterface = function (t, e) {
            var r = {
              _name: t
            };
            return function (t) {
              return (t = void 0 === t ? 1 : t) <= 0 ? r : e(t - 1)
            }
          },
          ShapeExpressionInterface = function () {
            function t(t, o, f) {
              var m, u = [],
                y = t ? t.length : 0;
              for (m = 0; m < y; m += 1) "gr" === t[m].ty ? u.push(e(t[m], o[m], f)) : "fl" === t[m].ty ? u.push(r(t[m], o[m], f)) : "st" === t[m].ty ? u.push(s(t[m], o[m], f)) : "tm" === t[m].ty ? u.push(n(t[m], o[m], f)) : "tr" === t[m].ty || ("el" === t[m].ty ? u.push(h(t[m], o[m], f)) : "sr" === t[m].ty ? u.push(l(t[m], o[m], f)) : "sh" === t[m].ty ? u.push(ShapePathInterface(t[m], o[m], f)) : "rc" === t[m].ty ? u.push(p(t[m], o[m], f)) : "rd" === t[m].ty ? u.push(d(t[m], o[m], f)) : "rp" === t[m].ty ? u.push(c(t[m], o[m], f)) : "gf" === t[m].ty ? u.push(i(t[m], o[m], f)) : u.push(a(t[m], o[m])));
              return u
            }

            function e(e, r, i) {
              var a = function (t) {
                switch (t) {
                  case "ADBE Vectors Group":
                  case "Contents":
                  case 2:
                    return a.content;
                  default:
                    return a.transform
                }
              };
              a.propertyGroup = propertyGroupFactory(a, i);
              var s = function (e, r, i) {
                  var a, s = function (t) {
                    for (var e = 0, r = a.length; e < r;) {
                      if (a[e]._name === t || a[e].mn === t || a[e].propertyIndex === t || a[e].ix === t || a[e].ind === t) return a[e];
                      e += 1
                    }
                    return "number" == typeof t ? a[t - 1] : null
                  };
                  s.propertyGroup = propertyGroupFactory(s, i), a = t(e.it, r.it, s.propertyGroup), s.numProperties = a.length;
                  var n = o(e.it[e.it.length - 1], r.it[r.it.length - 1], s.propertyGroup);
                  return s.transform = n, s.propertyIndex = e.cix, s._name = e.nm, s
                }(e, r, a.propertyGroup),
                n = o(e.it[e.it.length - 1], r.it[r.it.length - 1], a.propertyGroup);
              return a.content = s, a.transform = n, Object.defineProperty(a, "_name", {
                get: function () {
                  return e.nm
                }
              }), a.numProperties = e.np, a.propertyIndex = e.ix, a.nm = e.nm, a.mn = e.mn, a
            }

            function r(t, e, r) {
              function i(t) {
                return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : null
              }
              return Object.defineProperties(i, {
                color: {
                  get: ExpressionPropertyInterface(e.c)
                },
                opacity: {
                  get: ExpressionPropertyInterface(e.o)
                },
                _name: {
                  value: t.nm
                },
                mn: {
                  value: t.mn
                }
              }), e.c.setGroupProperty(PropertyInterface("Color", r)), e.o.setGroupProperty(PropertyInterface("Opacity", r)), i
            }

            function i(t, e, r) {
              function i(t) {
                return "Start Point" === t || "start point" === t ? i.startPoint : "End Point" === t || "end point" === t ? i.endPoint : "Opacity" === t || "opacity" === t ? i.opacity : null
              }
              return Object.defineProperties(i, {
                startPoint: {
                  get: ExpressionPropertyInterface(e.s)
                },
                endPoint: {
                  get: ExpressionPropertyInterface(e.e)
                },
                opacity: {
                  get: ExpressionPropertyInterface(e.o)
                },
                type: {
                  get: function () {
                    return "a"
                  }
                },
                _name: {
                  value: t.nm
                },
                mn: {
                  value: t.mn
                }
              }), e.s.setGroupProperty(PropertyInterface("Start Point", r)), e.e.setGroupProperty(PropertyInterface("End Point", r)), e.o.setGroupProperty(PropertyInterface("Opacity", r)), i
            }

            function a() {
              return function () {
                return null
              }
            }

            function s(t, e, r) {
              var i, a = propertyGroupFactory(l, r),
                s = propertyGroupFactory(h, a);

              function n(r) {
                Object.defineProperty(h, t.d[r].nm, {
                  get: ExpressionPropertyInterface(e.d.dataProps[r].p)
                })
              }
              var o = t.d ? t.d.length : 0,
                h = {};
              for (i = 0; i < o; i += 1) n(i), e.d.dataProps[i].p.setGroupProperty(s);

              function l(t) {
                return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : null
              }
              return Object.defineProperties(l, {
                color: {
                  get: ExpressionPropertyInterface(e.c)
                },
                opacity: {
                  get: ExpressionPropertyInterface(e.o)
                },
                strokeWidth: {
                  get: ExpressionPropertyInterface(e.w)
                },
                dash: {
                  get: function () {
                    return h
                  }
                },
                _name: {
                  value: t.nm
                },
                mn: {
                  value: t.mn
                }
              }), e.c.setGroupProperty(PropertyInterface("Color", a)), e.o.setGroupProperty(PropertyInterface("Opacity", a)), e.w.setGroupProperty(PropertyInterface("Stroke Width", a)), l
            }

            function n(t, e, r) {
              function i(e) {
                return e === t.e.ix || "End" === e || "end" === e ? i.end : e === t.s.ix ? i.start : e === t.o.ix ? i.offset : null
              }
              var a = propertyGroupFactory(i, r);
              return i.propertyIndex = t.ix, e.s.setGroupProperty(PropertyInterface("Start", a)), e.e.setGroupProperty(PropertyInterface("End", a)), e.o.setGroupProperty(PropertyInterface("Offset", a)), i.propertyIndex = t.ix, i.propertyGroup = r, Object.defineProperties(i, {
                start: {
                  get: ExpressionPropertyInterface(e.s)
                },
                end: {
                  get: ExpressionPropertyInterface(e.e)
                },
                offset: {
                  get: ExpressionPropertyInterface(e.o)
                },
                _name: {
                  value: t.nm
                }
              }), i.mn = t.mn, i
            }

            function o(t, e, r) {
              function i(e) {
                return t.a.ix === e || "Anchor Point" === e ? i.anchorPoint : t.o.ix === e || "Opacity" === e ? i.opacity : t.p.ix === e || "Position" === e ? i.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? i.rotation : t.s.ix === e || "Scale" === e ? i.scale : t.sk && t.sk.ix === e || "Skew" === e ? i.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? i.skewAxis : null
              }
              var a = propertyGroupFactory(i, r);
              return e.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", a)), e.transform.mProps.p.setGroupProperty(PropertyInterface("Position", a)), e.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", a)), e.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", a)), e.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", a)), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", a)), e.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", a))), e.transform.op.setGroupProperty(PropertyInterface("Opacity", a)), Object.defineProperties(i, {
                opacity: {
                  get: ExpressionPropertyInterface(e.transform.mProps.o)
                },
                position: {
                  get: ExpressionPropertyInterface(e.transform.mProps.p)
                },
                anchorPoint: {
                  get: ExpressionPropertyInterface(e.transform.mProps.a)
                },
                scale: {
                  get: ExpressionPropertyInterface(e.transform.mProps.s)
                },
                rotation: {
                  get: ExpressionPropertyInterface(e.transform.mProps.r)
                },
                skew: {
                  get: ExpressionPropertyInterface(e.transform.mProps.sk)
                },
                skewAxis: {
                  get: ExpressionPropertyInterface(e.transform.mProps.sa)
                },
                _name: {
                  value: t.nm
                }
              }), i.ty = "tr", i.mn = t.mn, i.propertyGroup = r, i
            }

            function h(t, e, r) {
              function i(e) {
                return t.p.ix === e ? i.position : t.s.ix === e ? i.size : null
              }
              var a = propertyGroupFactory(i, r);
              i.propertyIndex = t.ix;
              var s = "tm" === e.sh.ty ? e.sh.prop : e.sh;
              return s.s.setGroupProperty(PropertyInterface("Size", a)), s.p.setGroupProperty(PropertyInterface("Position", a)), Object.defineProperties(i, {
                size: {
                  get: ExpressionPropertyInterface(s.s)
                },
                position: {
                  get: ExpressionPropertyInterface(s.p)
                },
                _name: {
                  value: t.nm
                }
              }), i.mn = t.mn, i
            }

            function l(t, e, r) {
              function i(e) {
                return t.p.ix === e ? i.position : t.r.ix === e ? i.rotation : t.pt.ix === e ? i.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? i.outerRadius : t.os.ix === e ? i.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? i.innerRoundness : null : i.innerRadius
              }
              var a = propertyGroupFactory(i, r),
                s = "tm" === e.sh.ty ? e.sh.prop : e.sh;
              return i.propertyIndex = t.ix, s.or.setGroupProperty(PropertyInterface("Outer Radius", a)), s.os.setGroupProperty(PropertyInterface("Outer Roundness", a)), s.pt.setGroupProperty(PropertyInterface("Points", a)), s.p.setGroupProperty(PropertyInterface("Position", a)), s.r.setGroupProperty(PropertyInterface("Rotation", a)), t.ir && (s.ir.setGroupProperty(PropertyInterface("Inner Radius", a)), s.is.setGroupProperty(PropertyInterface("Inner Roundness", a))), Object.defineProperties(i, {
                position: {
                  get: ExpressionPropertyInterface(s.p)
                },
                rotation: {
                  get: ExpressionPropertyInterface(s.r)
                },
                points: {
                  get: ExpressionPropertyInterface(s.pt)
                },
                outerRadius: {
                  get: ExpressionPropertyInterface(s.or)
                },
                outerRoundness: {
                  get: ExpressionPropertyInterface(s.os)
                },
                innerRadius: {
                  get: ExpressionPropertyInterface(s.ir)
                },
                innerRoundness: {
                  get: ExpressionPropertyInterface(s.is)
                },
                _name: {
                  value: t.nm
                }
              }), i.mn = t.mn, i
            }

            function p(t, e, r) {
              function i(e) {
                return t.p.ix === e ? i.position : t.r.ix === e ? i.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? i.size : null
              }
              var a = propertyGroupFactory(i, r),
                s = "tm" === e.sh.ty ? e.sh.prop : e.sh;
              return i.propertyIndex = t.ix, s.p.setGroupProperty(PropertyInterface("Position", a)), s.s.setGroupProperty(PropertyInterface("Size", a)), s.r.setGroupProperty(PropertyInterface("Rotation", a)), Object.defineProperties(i, {
                position: {
                  get: ExpressionPropertyInterface(s.p)
                },
                roundness: {
                  get: ExpressionPropertyInterface(s.r)
                },
                size: {
                  get: ExpressionPropertyInterface(s.s)
                },
                _name: {
                  value: t.nm
                }
              }), i.mn = t.mn, i
            }

            function d(t, e, r) {
              function i(e) {
                return t.r.ix === e || "Round Corners 1" === e ? i.radius : null
              }
              var a = propertyGroupFactory(i, r),
                s = e;
              return i.propertyIndex = t.ix, s.rd.setGroupProperty(PropertyInterface("Radius", a)), Object.defineProperties(i, {
                radius: {
                  get: ExpressionPropertyInterface(s.rd)
                },
                _name: {
                  value: t.nm
                }
              }), i.mn = t.mn, i
            }

            function c(t, e, r) {
              function i(e) {
                return t.c.ix === e || "Copies" === e ? i.copies : t.o.ix === e || "Offset" === e ? i.offset : null
              }
              var a = propertyGroupFactory(i, r),
                s = e;
              return i.propertyIndex = t.ix, s.c.setGroupProperty(PropertyInterface("Copies", a)), s.o.setGroupProperty(PropertyInterface("Offset", a)), Object.defineProperties(i, {
                copies: {
                  get: ExpressionPropertyInterface(s.c)
                },
                offset: {
                  get: ExpressionPropertyInterface(s.o)
                },
                _name: {
                  value: t.nm
                }
              }), i.mn = t.mn, i
            }
            return function (e, r, i) {
              var a;

              function s(t) {
                if ("number" == typeof t) return 0 === (t = void 0 === t ? 1 : t) ? i : a[t - 1];
                for (var e = 0, r = a.length; e < r;) {
                  if (a[e]._name === t) return a[e];
                  e += 1
                }
                return null
              }
              return s.propertyGroup = propertyGroupFactory(s, (function () {
                return i
              })), a = t(e, r, s.propertyGroup), s.numProperties = a.length, s._name = "Contents", s
            }
          }(),
          TextExpressionInterface = function (t) {
            var e;

            function r(t) {
              switch (t) {
                case "ADBE Text Document":
                  return r.sourceText;
                default:
                  return null
              }
            }
            return Object.defineProperty(r, "sourceText", {
              get: function () {
                t.textProperty.getValue();
                var r = t.textProperty.currentData.t;
                return void 0 !== r && (t.textProperty.currentData.t = void 0, (e = new String(r)).value = r || new String(r)), e
              }
            }), r
          },
          LayerExpressionInterface = function () {
            function t(t) {
              var e = new Matrix;
              void 0 !== t ? this._elem.finalTransform.mProp.getValueAtTime(t).clone(e) : this._elem.finalTransform.mProp.applyToMatrix(e);
              return e
            }

            function e(t, e) {
              var r = this.getMatrix(e);
              return r.props[12] = 0, r.props[13] = 0, r.props[14] = 0, this.applyPoint(r, t)
            }

            function r(t, e) {
              var r = this.getMatrix(e);
              return this.applyPoint(r, t)
            }

            function i(t, e) {
              var r = this.getMatrix(e);
              return r.props[12] = 0, r.props[13] = 0, r.props[14] = 0, this.invertPoint(r, t)
            }

            function a(t, e) {
              var r = this.getMatrix(e);
              return this.invertPoint(r, t)
            }

            function s(t, e) {
              if (this._elem.hierarchy && this._elem.hierarchy.length) {
                var r, i = this._elem.hierarchy.length;
                for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
              }
              return t.applyToPointArray(e[0], e[1], e[2] || 0)
            }

            function n(t, e) {
              if (this._elem.hierarchy && this._elem.hierarchy.length) {
                var r, i = this._elem.hierarchy.length;
                for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(t)
              }
              return t.inversePoint(e)
            }

            function o(t) {
              var e = new Matrix;
              if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
                var r, i = this._elem.hierarchy.length;
                for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
                return e.inversePoint(t)
              }
              return e.inversePoint(t)
            }

            function h() {
              return [1, 1, 1, 1]
            }
            return function (l) {
              var p;

              function d(t) {
                switch (t) {
                  case "ADBE Root Vectors Group":
                  case "Contents":
                  case 2:
                    return d.shapeInterface;
                  case 1:
                  case 6:
                  case "Transform":
                  case "transform":
                  case "ADBE Transform Group":
                    return p;
                  case 4:
                  case "ADBE Effect Parade":
                  case "effects":
                  case "Effects":
                    return d.effect;
                  case "ADBE Text Properties":
                    return d.textInterface;
                  default:
                    return null
                }
              }
              d.getMatrix = t, d.invertPoint = n, d.applyPoint = s, d.toWorld = r, d.toWorldVec = e, d.fromWorld = a, d.fromWorldVec = i, d.toComp = r, d.fromComp = o, d.sampleImage = h, d.sourceRectAtTime = l.sourceRectAtTime.bind(l), d._elem = l;
              var c = getDescriptor(p = TransformExpressionInterface(l.finalTransform.mProp), "anchorPoint");
              return Object.defineProperties(d, {
                hasParent: {
                  get: function () {
                    return l.hierarchy.length
                  }
                },
                parent: {
                  get: function () {
                    return l.hierarchy[0].layerInterface
                  }
                },
                rotation: getDescriptor(p, "rotation"),
                scale: getDescriptor(p, "scale"),
                position: getDescriptor(p, "position"),
                opacity: getDescriptor(p, "opacity"),
                anchorPoint: c,
                anchor_point: c,
                transform: {
                  get: function () {
                    return p
                  }
                },
                active: {
                  get: function () {
                    return l.isInRange
                  }
                }
              }), d.startTime = l.data.st, d.index = l.data.ind, d.source = l.data.refId, d.height = 0 === l.data.ty ? l.data.h : 100, d.width = 0 === l.data.ty ? l.data.w : 100, d.inPoint = l.data.ip / l.comp.globalData.frameRate, d.outPoint = l.data.op / l.comp.globalData.frameRate, d._name = l.data.nm, d.registerMaskInterface = function (t) {
                d.mask = new MaskManagerInterface(t, l)
              }, d.registerEffectsInterface = function (t) {
                d.effect = t
              }, d
            }
          }(),
          FootageInterface = (dataInterfaceFactory = function (t) {
            function e(t) {
              return "Outline" === t ? e.outlineInterface() : null
            }
            return e._name = "Outline", e.outlineInterface = function (t) {
              var e = "",
                r = t.getFootageData();

              function i(t) {
                if (r[t]) return e = t, "object" == typeof (r = r[t]) ? i : r;
                var a = t.indexOf(e);
                if (-1 !== a) {
                  var s = parseInt(t.substr(a + e.length), 10);
                  return "object" == typeof (r = r[s]) ? i : r
                }
                return ""
              }
              return function () {
                return e = "", r = t.getFootageData(), i
              }
            }(t), e
          }, function (t) {
            function e(t) {
              return "Data" === t ? e.dataInterface : null
            }
            return e._name = "Data", e.dataInterface = dataInterfaceFactory(t), e
          }),
          dataInterfaceFactory, CompExpressionInterface = function (t) {
            function e(e) {
              for (var r = 0, i = t.layers.length; r < i;) {
                if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
                r += 1
              }
              return null
            }
            return Object.defineProperty(e, "_name", {
              value: t.data.nm
            }), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e
          },
          TransformExpressionInterface = function (t) {
            function e(t) {
              switch (t) {
                case "scale":
                case "Scale":
                case "ADBE Scale":
                case 6:
                  return e.scale;
                case "rotation":
                case "Rotation":
                case "ADBE Rotation":
                case "ADBE Rotate Z":
                case 10:
                  return e.rotation;
                case "ADBE Rotate X":
                  return e.xRotation;
                case "ADBE Rotate Y":
                  return e.yRotation;
                case "position":
                case "Position":
                case "ADBE Position":
                case 2:
                  return e.position;
                case "ADBE Position_0":
                  return e.xPosition;
                case "ADBE Position_1":
                  return e.yPosition;
                case "ADBE Position_2":
                  return e.zPosition;
                case "anchorPoint":
                case "AnchorPoint":
                case "Anchor Point":
                case "ADBE AnchorPoint":
                case 1:
                  return e.anchorPoint;
                case "opacity":
                case "Opacity":
                case 11:
                  return e.opacity;
                default:
                  return null
              }
            }
            var r, i, a, s;
            return Object.defineProperty(e, "rotation", {
              get: ExpressionPropertyInterface(t.r || t.rz)
            }), Object.defineProperty(e, "zRotation", {
              get: ExpressionPropertyInterface(t.rz || t.r)
            }), Object.defineProperty(e, "xRotation", {
              get: ExpressionPropertyInterface(t.rx)
            }), Object.defineProperty(e, "yRotation", {
              get: ExpressionPropertyInterface(t.ry)
            }), Object.defineProperty(e, "scale", {
              get: ExpressionPropertyInterface(t.s)
            }), t.p ? s = ExpressionPropertyInterface(t.p) : (r = ExpressionPropertyInterface(t.px), i = ExpressionPropertyInterface(t.py), t.pz && (a = ExpressionPropertyInterface(t.pz))), Object.defineProperty(e, "position", {
              get: function () {
                return t.p ? s() : [r(), i(), a ? a() : 0]
              }
            }), Object.defineProperty(e, "xPosition", {
              get: ExpressionPropertyInterface(t.px)
            }), Object.defineProperty(e, "yPosition", {
              get: ExpressionPropertyInterface(t.py)
            }), Object.defineProperty(e, "zPosition", {
              get: ExpressionPropertyInterface(t.pz)
            }), Object.defineProperty(e, "anchorPoint", {
              get: ExpressionPropertyInterface(t.a)
            }), Object.defineProperty(e, "opacity", {
              get: ExpressionPropertyInterface(t.o)
            }), Object.defineProperty(e, "skew", {
              get: ExpressionPropertyInterface(t.sk)
            }), Object.defineProperty(e, "skewAxis", {
              get: ExpressionPropertyInterface(t.sa)
            }), Object.defineProperty(e, "orientation", {
              get: ExpressionPropertyInterface(t.or)
            }), e
          },
          ProjectInterface = function () {
            function t(t) {
              this.compositions.push(t)
            }
            return function () {
              function e(t) {
                for (var e = 0, r = this.compositions.length; e < r;) {
                  if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
                  e += 1
                }
                return null
              }
              return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
            }
          }(),
          EffectsExpressionInterface = function () {
            function t(r, i, a, s) {
              function n(t) {
                for (var e = r.ef, i = 0, a = e.length; i < a;) {
                  if (t === e[i].nm || t === e[i].mn || t === e[i].ix) return 5 === e[i].ty ? l[i] : l[i]();
                  i += 1
                }
                throw new Error
              }
              var o, h = propertyGroupFactory(n, a),
                l = [],
                p = r.ef.length;
              for (o = 0; o < p; o += 1) 5 === r.ef[o].ty ? l.push(t(r.ef[o], i.effectElements[o], i.effectElements[o].propertyGroup, s)) : l.push(e(i.effectElements[o], r.ef[o].ty, s, h));
              return "ADBE Color Control" === r.mn && Object.defineProperty(n, "color", {
                get: function () {
                  return l[0]()
                }
              }), Object.defineProperties(n, {
                numProperties: {
                  get: function () {
                    return r.np
                  }
                },
                _name: {
                  value: r.nm
                },
                propertyGroup: {
                  value: h
                }
              }), n.enabled = 0 !== r.en, n.active = n.enabled, n
            }

            function e(t, e, r, i) {
              var a = ExpressionPropertyInterface(t.p);
              return t.p.setGroupProperty && t.p.setGroupProperty(PropertyInterface("", i)),
                function () {
                  return 10 === e ? r.comp.compInterface(t.p.v) : a()
                }
            }
            return {
              createEffectsInterface: function (e, r) {
                if (e.effectsManager) {
                  var i, a = [],
                    s = e.data.ef,
                    n = e.effectsManager.effectElements.length;
                  for (i = 0; i < n; i += 1) a.push(t(s[i], e.effectsManager.effectElements[i], r, e));
                  var o = e.data.ef || [],
                    h = function (t) {
                      for (i = 0, n = o.length; i < n;) {
                        if (t === o[i].nm || t === o[i].mn || t === o[i].ix) return a[i];
                        i += 1
                      }
                      return null
                    };
                  return Object.defineProperty(h, "numProperties", {
                    get: function () {
                      return o.length
                    }
                  }), h
                }
                return null
              }
            }
          }(),
          MaskManagerInterface = function () {
            function t(t, e) {
              this._mask = t, this._data = e
            }
            Object.defineProperty(t.prototype, "maskPath", {
              get: function () {
                return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
              }
            }), Object.defineProperty(t.prototype, "maskOpacity", {
              get: function () {
                return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
              }
            });
            return function (e) {
              var r, i = createSizedArray(e.viewData.length),
                a = e.viewData.length;
              for (r = 0; r < a; r += 1) i[r] = new t(e.viewData[r], e.masksProperties[r]);
              return function (t) {
                for (r = 0; r < a;) {
                  if (e.masksProperties[r].nm === t) return i[r];
                  r += 1
                }
                return null
              }
            }
          }(),
          ExpressionPropertyInterface = function () {
            var t = {
                pv: 0,
                v: 0,
                mult: 1
              },
              e = {
                pv: [0, 0, 0],
                v: [0, 0, 0],
                mult: 1
              };

            function r(t, e, r) {
              Object.defineProperty(t, "velocity", {
                get: function () {
                  return e.getVelocityAtTime(e.comp.currentFrame)
                }
              }), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function (i) {
                if (!t.numKeys) return 0;
                var a = "";
                a = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
                var s = "unidimensional" === r ? new Number(a) : Object.assign({}, a);
                return s.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, s.value = "unidimensional" === r ? a[0] : a, s
              }, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup
            }

            function i() {
              return t
            }
            return function (a) {
              return a ? "unidimensional" === a.propType ? function (e) {
                e && "pv" in e || (e = t);
                var i = 1 / e.mult,
                  a = e.pv * i,
                  s = new Number(a);
                return s.value = a, r(s, e, "unidimensional"),
                  function () {
                    return e.k && e.getValue(), a = e.v * i, s.value !== a && ((s = new Number(a)).value = a, r(s, e, "unidimensional")), s
                  }
              }(a) : function (t) {
                t && "pv" in t || (t = e);
                var i = 1 / t.mult,
                  a = t.data && t.data.l || t.pv.length,
                  s = createTypedArray("float32", a),
                  n = createTypedArray("float32", a);
                return s.value = n, r(s, t, "multidimensional"),
                  function () {
                    t.k && t.getValue();
                    for (var e = 0; e < a; e += 1) n[e] = t.v[e] * i, s[e] = n[e];
                    return s
                  }
              }(a) : i
            }
          }(),
          TextExpressionSelectorPropFactory = function () {
            function t(t, e) {
              return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v
            }
            return function (e, r) {
              this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, r, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty
            }
          }(),
          propertyGetTextProp = TextSelectorProp.getTextSelectorProp;

        function SliderEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
        }

        function AngleEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
        }

        function ColorEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
        }

        function PointEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
        }

        function LayerIndexEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
        }

        function MaskIndexEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
        }

        function CheckboxEffect(t, e, r) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
        }

        function NoValueEffect() {
          this.p = {}
        }

        function EffectsManager(t, e) {
          var r, i = t.ef || [];
          this.effectElements = [];
          var a, s = i.length;
          for (r = 0; r < s; r += 1) a = new GroupEffect(i[r], e), this.effectElements.push(a)
        }

        function GroupEffect(t, e) {
          this.init(t, e)
        }
        TextSelectorProp.getTextSelectorProp = function (t, e, r) {
          return 1 === e.t ? new TextExpressionSelectorPropFactory(t, e, r) : propertyGetTextProp(t, e, r)
        }, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
          var r;
          this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
          var i, a = this.data.ef.length,
            s = this.data.ef;
          for (r = 0; r < a; r += 1) {
            switch (i = null, s[r].ty) {
              case 0:
                i = new SliderEffect(s[r], e, this);
                break;
              case 1:
                i = new AngleEffect(s[r], e, this);
                break;
              case 2:
                i = new ColorEffect(s[r], e, this);
                break;
              case 3:
                i = new PointEffect(s[r], e, this);
                break;
              case 4:
              case 7:
                i = new CheckboxEffect(s[r], e, this);
                break;
              case 10:
                i = new LayerIndexEffect(s[r], e, this);
                break;
              case 11:
                i = new MaskIndexEffect(s[r], e, this);
                break;
              case 5:
                i = new EffectsManager(s[r], e, this);
                break;
              default:
                i = new NoValueEffect(s[r], e, this)
            }
            i && this.effectElements.push(i)
          }
        };
        var lottie = {},
          queryString;

        function setLocationHref(t) {
          locationHref = t
        }

        function searchAnimations() {
          animationManager.searchAnimations()
        }

        function setSubframeRendering(t) {
          subframeEnabled = t
        }

        function setIDPrefix(t) {
          idPrefix = t
        }

        function loadAnimation(t) {
          return animationManager.loadAnimation(t)
        }

        function setQuality(t) {
          if ("string" == typeof t) switch (t) {
            case "high":
              defaultCurveSegments = 200;
              break;
            default:
            case "medium":
              defaultCurveSegments = 50;
              break;
            case "low":
              defaultCurveSegments = 10
          } else !isNaN(t) && t > 1 && (defaultCurveSegments = t)
        }

        function inBrowser() {
          return "undefined" != typeof navigator
        }

        function installPlugin(t, e) {
          "expressions" === t && (expressionsPlugin = e)
        }

        function getFactory(t) {
          switch (t) {
            case "propertyFactory":
              return PropertyFactory;
            case "shapePropertyFactory":
              return ShapePropertyFactory;
            case "matrix":
              return Matrix;
            default:
              return null
          }
        }

        function checkReady() {
          "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
        }

        function getQueryVariable(t) {
          for (var e = queryString.split("&"), r = 0; r < e.length; r += 1) {
            var i = e[r].split("=");
            if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
          }
          return null
        }
        lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocationHref, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.setVolume = animationManager.setVolume, lottie.mute = animationManager.mute, lottie.unmute = animationManager.unmute, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.useWebWorker = function (t) {
          _useWebWorker = t
        }, lottie.setIDPrefix = setIDPrefix, lottie.__getFactory = getFactory, lottie.version = "5.8.1";
        var scripts = document.getElementsByTagName("script"),
          index = scripts.length - 1,
          myScript = scripts[index] || {
            src: ""
          };
        queryString = myScript.src.replace(/^[^\?]+\??/, ""), getQueryVariable("renderer");
        var readyStateCheckInterval = setInterval(checkReady, 100);
        return lottie
      }))
    })),
    _templateObject$2, styles$1 = css(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n  * {\n    box-sizing: border-box;\n  }\n\n  :host {\n    --lottie-player-toolbar-height: 35px;\n    --lottie-player-toolbar-background-color: transparent;\n    --lottie-player-toolbar-icon-color: #999;\n    --lottie-player-toolbar-icon-hover-color: #222;\n    --lottie-player-toolbar-icon-active-color: #555;\n    --lottie-player-seeker-track-color: #ccc;\n    --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);\n    --lottie-player-seeker-display: block;\n\n    display: block;\n    width: 100%;\n    height: 100%;\n  }\n\n  .main {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    width: 100%;\n  }\n\n  .animation {\n    width: 100%;\n    height: 100%;\n    display: flex;\n  }\n  .animation.controls {\n    height: calc(100% - 35px);\n  }\n\n  .toolbar {\n    display: flex;\n    align-items: center;\n    justify-items: center;\n    background-color: var(--lottie-player-toolbar-background-color);\n    margin: 0 5px;\n    height: 35px;\n  }\n\n  .toolbar button {\n    cursor: pointer;\n    fill: var(--lottie-player-toolbar-icon-color);\n    display: flex;\n    background: none;\n    border: 0;\n    padding: 0;\n    outline: none;\n    height: 100%;\n  }\n\n  .toolbar button:hover {\n    fill: var(--lottie-player-toolbar-icon-hover-color);\n  }\n\n  .toolbar button.active {\n    fill: var(--lottie-player-toolbar-icon-active-color);\n  }\n\n  .toolbar button.active:hover {\n\tfill: var(--lottie-player-toolbar-icon-hover-color);\n  }\n\n\n  .toolbar button:focus{\n\toutline: 1px dotted var(--lottie-player-toolbar-icon-active-color);\n  }\n\n  .toolbar button svg {\n  }\n\n  .toolbar button.disabled svg {\n    display: none;\n  }\n\n  .seeker {\n    -webkit-appearance: none;\n    width: 95%;\n    outline: none;\n    background-color: var(--lottie-player-toolbar-background-color);\n    display: var(--lottie-player-seeker-display);\n  }\n\n  .seeker::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 5px;\n    cursor: pointer;\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-webkit-slider-thumb {\n    height: 15px;\n    width: 15px;\n    border-radius: 50%;\n    background: var(--lottie-player-seeker-thumb-color);\n    cursor: pointer;\n    -webkit-appearance: none;\n    margin-top: -5px;\n  }\n  .seeker:focus::-webkit-slider-runnable-track {\n    background: #999;\n  }\n  .seeker::-moz-range-track {\n    width: 100%;\n    height: 5px;\n    cursor: pointer;\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-moz-range-thumb {\n    height: 15px;\n    width: 15px;\n    border-radius: 50%;\n    background: var(--lottie-player-seeker-thumb-color);\n    cursor: pointer;\n  }\n  .seeker::-ms-track {\n    width: 100%;\n    height: 5px;\n    cursor: pointer;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n  }\n  .seeker::-ms-fill-lower {\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-ms-fill-upper {\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-ms-thumb {\n    border: 0;\n    height: 15px;\n    width: 15px;\n    border-radius: 50%;\n    background: var(--lottie-player-seeker-thumb-color);\n    cursor: pointer;\n  }\n  .seeker:focus::-ms-fill-lower {\n    background: var(--lottie-player-seeker-track-color);\n  }\n  .seeker:focus::-ms-fill-upper {\n    background: var(--lottie-player-seeker-track-color);\n  }\n\n  .error {\n    display: flex;\n    justify-content: center;\n    height: 100%;\n    align-items: center;\n  }\n"]))),
    _templateObject$1, _templateObject2, _templateObject3, _templateObject4, _templateObject5, PlayerState, PlayMode, PlayerEvents;

  function parseSrc(t) {
    if ("object" == typeof t) return t;
    try {
      return JSON.parse(t)
    } catch (e) {
      return new URL(t, window.location.href).toString()
    }
  }

  function isLottie(t) {
    return ["v", "ip", "op", "layers", "fr", "w", "h"].every(e => Object.prototype.hasOwnProperty.call(t, e))
  }

  function fromURL(t) {
    return _fromURL.apply(this, arguments)
  }

  function _fromURL() {
    return (_fromURL = _asyncToGenerator((function* (t) {
      if ("string" != typeof t) throw new Error("The url value must be a string");
      var e;
      try {
        var r = new URL(t),
          i = yield fetch(r.toString());
        e = yield i.json()
      } catch (t) {
        throw new Error("An error occurred while trying to load the Lottie file from URL")
      }
      return e
    }))).apply(this, arguments)
  }! function (t) {
    t.Destroyed = "destroyed", t.Error = "error", t.Frozen = "frozen", t.Loading = "loading", t.Paused = "paused", t.Playing = "playing", t.Stopped = "stopped"
  }(PlayerState || (PlayerState = {})),
  function (t) {
    t.Bounce = "bounce", t.Normal = "normal"
  }(PlayMode || (PlayMode = {})),
  function (t) {
    t.Complete = "complete", t.Destroyed = "destroyed", t.Error = "error", t.Frame = "frame", t.Freeze = "freeze", t.Load = "load", t.Loop = "loop", t.Pause = "pause", t.Play = "play", t.Ready = "ready", t.Rendered = "rendered", t.Stop = "stop"
  }(PlayerEvents || (PlayerEvents = {}));
  var LottiePlayer = class extends LitElement {
      constructor() {
        super(...arguments), this.autoplay = !1, this.background = "transparent", this.controls = !1, this.currentState = PlayerState.Loading, this.description = "Lottie animation", this.direction = 1, this.hover = !1, this.intermission = 1, this.loop = !1, this.mode = PlayMode.Normal, this.preserveAspectRatio = "xMidYMid meet", this.renderer = "svg", this.speed = 1, this._io = void 0, this._counter = 1
      }
      load(t) {
        var e = this;
        return _asyncToGenerator((function* () {
          if (e.shadowRoot) {
            var r = {
              container: e.container,
              loop: !1,
              autoplay: !1,
              renderer: e.renderer,
              rendererSettings: {
                preserveAspectRatio: e.preserveAspectRatio,
                clearCanvas: !1,
                progressiveLoad: !0,
                hideOnTransparent: !0
              }
            };
            try {
              var i = parseSrc(t),
                a = {},
                s = "string" == typeof i ? "path" : "animationData";
              e._lottie && e._lottie.destroy(), e.webworkers && lottie.useWebWorker(!0), e._lottie = lottie.loadAnimation(Object.assign(Object.assign({}, r), {
                [s]: i
              })), e._attachEventListeners(), "path" === s ? (a = yield fromURL(i), s = "animationData") : a = i, isLottie(a) || (e.currentState = PlayerState.Error, e.dispatchEvent(new CustomEvent(PlayerEvents.Error)))
            } catch (t) {
              e.currentState = PlayerState.Error, e.dispatchEvent(new CustomEvent(PlayerEvents.Error))
            }
          }
        }))()
      }
      getLottie() {
        return this._lottie
      }
      play() {
        this._lottie && (this._lottie.play(), this.currentState = PlayerState.Playing, this.dispatchEvent(new CustomEvent(PlayerEvents.Play)))
      }
      pause() {
        this._lottie && (this._lottie.pause(), this.currentState = PlayerState.Paused, this.dispatchEvent(new CustomEvent(PlayerEvents.Pause)))
      }
      stop() {
        this._lottie && (this._counter = 1, this._lottie.stop(), this.currentState = PlayerState.Stopped, this.dispatchEvent(new CustomEvent(PlayerEvents.Stop)))
      }
      destroy() {
        this._lottie && (this._lottie.destroy(), this.currentState = PlayerState.Destroyed, this.dispatchEvent(new CustomEvent(PlayerEvents.Destroyed)), this.remove())
      }
      seek(t) {
        if (this._lottie) {
          var e = /^(\d+)(%?)$/.exec(t.toString());
          if (e) {
            var r = "%" === e[2] ? this._lottie.totalFrames * Number(e[1]) / 100 : Number(e[1]);
            this.seeker = r, this.currentState === PlayerState.Playing ? this._lottie.goToAndPlay(r, !0) : (this._lottie.goToAndStop(r, !0), this._lottie.pause())
          }
        }
      }
      snapshot() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (this.shadowRoot) {
          var e = this.shadowRoot.querySelector(".animation svg"),
            r = (new XMLSerializer).serializeToString(e);
          if (t) {
            var i = document.createElement("a");
            i.href = "data:image/svg+xml;charset=utf-8,".concat(encodeURIComponent(r)), i.download = "download_".concat(this.seeker, ".svg"), document.body.appendChild(i), i.click(), document.body.removeChild(i)
          }
          return r
        }
      }
      setSpeed() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        this._lottie && this._lottie.setSpeed(t)
      }
      setDirection(t) {
        this._lottie && this._lottie.setDirection(t)
      }
      setLooping(t) {
        this._lottie && (this.loop = t, this._lottie.loop = t)
      }
      togglePlay() {
        return this.currentState === PlayerState.Playing ? this.pause() : this.play()
      }
      toggleLooping() {
        this.setLooping(!this.loop)
      }
      resize() {
        this._lottie && this._lottie.resize()
      }
      static get styles() {
        return styles$1
      }
      disconnectedCallback() {
        this._io && (this._io.disconnect(), this._io = void 0), document.removeEventListener("visibilitychange", () => this._onVisibilityChange()), this.destroy()
      }
      render() {
        var t = this.controls ? "main controls" : "main",
          e = this.controls ? "animation controls" : "animation";
        return html(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral([' <div\n      id="animation-container"\n      class=', '\n      lang="en"\n      aria-label=', '\n      role="img"\n    >\n      <div\n        id="animation"\n        class=', '\n        style="background:', ';"\n      >\n        ', "\n      </div>\n      ", "\n    </div>"])), t, this.description, e, this.background, this.currentState === PlayerState.Error ? html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(['<div class="error">⚠️</div>']))) : void 0, this.controls ? this.renderControls() : void 0)
      }
      firstUpdated() {
        "IntersectionObserver" in window && (this._io = new IntersectionObserver(t => {
          t[0].isIntersecting ? this.currentState === PlayerState.Frozen && this.play() : this.currentState === PlayerState.Playing && this.freeze()
        }), this._io.observe(this.container)), void 0 !== document.hidden && document.addEventListener("visibilitychange", () => this._onVisibilityChange()), this.src && this.load(this.src), this.dispatchEvent(new CustomEvent(PlayerEvents.Rendered))
      }
      renderControls() {
        var t = this.currentState === PlayerState.Playing,
          e = this.currentState === PlayerState.Paused,
          r = this.currentState === PlayerState.Stopped;
        return html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(['\n      <div\n        id="lottie-controls"\n        aria-label="lottie-animation-controls"\n        class="toolbar"\n      >\n        <button\n          id="lottie-play-button"\n          @click=', "\n          class=", '\n          style="align-items:center;"\n          tabindex="0"\n          aria-label="play-pause"\n        >\n          ', '\n        </button>\n        <button\n          id="lottie-stop-button"\n          @click=', "\n          class=", '\n          style="align-items:center;"\n          tabindex="0"\n          aria-label="stop"\n        >\n          <svg width="24" height="24" aria-hidden="true" focusable="false"><path d="M6 6h12v12H6V6z" /></svg>\n        </button>\n        <input\n          id="lottie-seeker-input"\n          class="seeker"\n          type="range"\n          min="0"\n          step="1"\n          max="100"\n          .value=', "\n          @input=", "\n          @mousedown=", "\n          @mouseup=", '\n          aria-valuemin="1"\n          aria-valuemax="100"\n          role="slider"\n          aria-valuenow=', '\n          tabindex="0"\n          aria-label="lottie-seek-input"\n        />\n        <button\n          id="lottie-loop-toggle"\n          @click=', "\n          class=", '\n          style="align-items:center;"\n          tabindex="0"\n          aria-label="loop-toggle"\n        >\n          <svg width="24" height="24" aria-hidden="true" focusable="false">\n            <path\n              d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"\n            />\n          </svg>\n        </button>\n      </div>\n    '])), this.togglePlay, t || e ? "active" : "", html(t ? _templateObject4 || (_templateObject4 = _taggedTemplateLiteral(['<svg width="24" height="24" aria-hidden="true" focusable="false">\n                <path\n                  d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"\n                />\n              </svg>'])) : _templateObject5 || (_templateObject5 = _taggedTemplateLiteral(['<svg width="24" height="24" aria-hidden="true" focusable="false">\n                <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />\n              </svg>']))), this.stop, r ? "active" : "", this.seeker, this._handleSeekChange, () => {
          this._prevState = this.currentState, this.freeze()
        }, () => {
          this._prevState === PlayerState.Playing && this.play()
        }, this.seeker, this.toggleLooping, this.loop ? "active" : "")
      }
      _onVisibilityChange() {
        !0 === document.hidden && this.currentState === PlayerState.Playing ? this.freeze() : this.currentState === PlayerState.Frozen && this.play()
      }
      _handleSeekChange(t) {
        if (this._lottie && !isNaN(t.target.value)) {
          var e = t.target.value / 100 * this._lottie.totalFrames;
          this.seek(e)
        }
      }
      _attachEventListeners() {
        this._lottie.addEventListener("enterFrame", () => {
          this.seeker = this._lottie.currentFrame / this._lottie.totalFrames * 100, this.dispatchEvent(new CustomEvent(PlayerEvents.Frame, {
            detail: {
              frame: this._lottie.currentFrame,
              seeker: this.seeker
            }
          }))
        }), this._lottie.addEventListener("complete", () => {
          this.currentState === PlayerState.Playing ? !this.loop || this.count && this._counter >= this.count ? this.dispatchEvent(new CustomEvent(PlayerEvents.Complete)) : this.mode === PlayMode.Bounce ? (this.count && (this._counter += .5), setTimeout(() => {
            this.dispatchEvent(new CustomEvent(PlayerEvents.Loop)), this.currentState === PlayerState.Playing && (this._lottie.setDirection(-1 * this._lottie.playDirection), this._lottie.play())
          }, this.intermission)) : (this.count && (this._counter += 1), window.setTimeout(() => {
            this.dispatchEvent(new CustomEvent(PlayerEvents.Loop)), this.currentState === PlayerState.Playing && (this._lottie.stop(), this._lottie.play())
          }, this.intermission)) : this.dispatchEvent(new CustomEvent(PlayerEvents.Complete))
        }), this._lottie.addEventListener("DOMLoaded", () => {
          this.setSpeed(this.speed), this.setDirection(this.direction), this.autoplay && this.play(), this.dispatchEvent(new CustomEvent(PlayerEvents.Ready))
        }), this._lottie.addEventListener("data_ready", () => {
          this.dispatchEvent(new CustomEvent(PlayerEvents.Load))
        }), this._lottie.addEventListener("data_failed", () => {
          this.currentState = PlayerState.Error, this.dispatchEvent(new CustomEvent(PlayerEvents.Error))
        }), this.container.addEventListener("mouseenter", () => {
          this.hover && this.currentState !== PlayerState.Playing && this.play()
        }), this.container.addEventListener("mouseleave", () => {
          this.hover && this.currentState === PlayerState.Playing && this.stop()
        })
      }
      freeze() {
        this._lottie && (this._lottie.pause(), this.currentState = PlayerState.Frozen, this.dispatchEvent(new CustomEvent(PlayerEvents.Freeze)))
      }
    },
    _templateObject;
  __decorate([property({
    type: Boolean
  })], LottiePlayer.prototype, "autoplay", void 0), __decorate([property({
    type: String,
    reflect: !0
  })], LottiePlayer.prototype, "background", void 0), __decorate([property({
    type: Boolean
  })], LottiePlayer.prototype, "controls", void 0), __decorate([property({
    type: Number
  })], LottiePlayer.prototype, "count", void 0), __decorate([property({
    type: String
  })], LottiePlayer.prototype, "currentState", void 0), __decorate([property({
    type: String
  })], LottiePlayer.prototype, "description", void 0), __decorate([property({
    type: Number
  })], LottiePlayer.prototype, "direction", void 0), __decorate([property({
    type: Boolean
  })], LottiePlayer.prototype, "hover", void 0), __decorate([property()], LottiePlayer.prototype, "intermission", void 0), __decorate([property({
    type: Boolean,
    reflect: !0
  })], LottiePlayer.prototype, "loop", void 0), __decorate([property()], LottiePlayer.prototype, "mode", void 0), __decorate([property({
    type: String
  })], LottiePlayer.prototype, "preserveAspectRatio", void 0), __decorate([property({
    type: String
  })], LottiePlayer.prototype, "renderer", void 0), __decorate([property()], LottiePlayer.prototype, "seeker", void 0), __decorate([property({
    type: Number
  })], LottiePlayer.prototype, "speed", void 0), __decorate([property({
    type: String
  })], LottiePlayer.prototype, "src", void 0), __decorate([property({
    type: Boolean
  })], LottiePlayer.prototype, "webworkers", void 0), __decorate([query(".animation")], LottiePlayer.prototype, "container", void 0), LottiePlayer = __decorate([customElement("lottie-player")], LottiePlayer);
  var styles = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n", "\n\n:host {\n  width: 512px;\n  height: 512px;\n}\n"])), styles$1);

  function fetchPath(t) {
    return new Promise((e, r) => {
      var i = new XMLHttpRequest;
      i.open("GET", t, !0), i.responseType = "arraybuffer", i.send(), i.onreadystatechange = function () {
        if (4 == i.readyState && 200 == i.status) try {
          var t = String.fromCharCode.apply(null, new Uint8Array(i.response));
          return e(JSON.parse(t))
        } catch (t) {
          try {
            var a = pako_1.inflate(i.response, {
              to: "string"
            });
            return e(JSON.parse(a))
          } catch (t) {
            return r(t)
          }
        }
      }
    })
  }
  exports.TGSPlayer = class extends LottiePlayer {
    constructor() {
      super(...arguments), this.strict = !0
    }
    load(t) {
      var e = () => super.load,
        r = this;
      return _asyncToGenerator((function* () {
        var i = parseSrc(t);
        if ("path" === ("string" == typeof i ? "path" : "animationData") && (i = yield fetchPath(i)), !0 === r.strict) {
          var a = r.formatCheck(i);
          0 !== a.length && r.dispatchEvent(new CustomEvent(PlayerEvents.Error, {
            detail: a
          }))
        }
        return delete i.tgs, e().call(r, i)
      }))()
    }
    static get styles() {
      return styles
    }
    formatCheck(t) {
      var e = [];
      return "tgs" in t && 1 === t.tgs || e.push("Must be marked as a TGS Lottie variant"), (t.op - t.ip) / t.fr > 3 && e.push("Longer than 3 seconds"), 512 == t.w && 512 == t.h || e.push("Dimensions should be exactly 512pxx512px"), null != t.ddd && 0 != t.ddd && e.push("Must not have 3D layers"), "markers" in t && e.push("Must not have markers"), null != t.assets && t.assets.forEach(t => {
        e.concat(this.checkLayer(t.layers))
      }), t.layers.forEach(t => {
        e.concat(this.checkLayer(t))
      }), e
    }
    checkLayer(t) {
      var e = [];
      return null != t.ddd && 0 != t.ddd && e.push("Composition should not include any 3D Layers"), null != t.sr && 1 != t.sr && e.push("Composition should not include any Time Stretching"), null != t.tm && e.push("Composition should not include any Time Remapping"), 1 === t.ty && e.push("Composition should not include any Solids"), 2 === t.ty && e.push("Composition should not include any Images"), 5 === t.ty && e.push("Composition should not include any Texts"), !0 !== t.hasMask && null == t.masksProperties || e.push("Composition should not include any Masks"), null != t.tt && e.push("Composition should not include any Mattes"), 1 === t.ao && e.push("Composition should not include any Auto-Oriented Layers"), null != t.ef && e.push("Composition should not include any Layer Effects"), e.concat(this.checkItems(t.shapes, !0)), e
    }
    checkItems(t, e) {
      var r = [];
      return null != t && t.forEach(t => {
        "rp" == t.ty && r.push("Composition should not include any Repeaters"), "sr" == t.ty && r.push("Composition should not include any Star Shapes"), "mm" == t.ty && r.push("Composition should not include any Merge Paths"), "gs" == t.ty && r.push("Composition should not include any Gradient Strokes"), !0 === e && r.concat(this.checkItems(t.it, !1))
      }), r
    }
  }, __decorate([property({
    type: Boolean
  })], exports.TGSPlayer.prototype, "strict", void 0), exports.TGSPlayer = __decorate([customElement("tgs-player")], exports.TGSPlayer), Object.defineProperty(exports, "__esModule", {
    value: !0
  })
}));
//# sourceMappingURL=tgs-player.js.map
