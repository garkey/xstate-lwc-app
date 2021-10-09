!(function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
        ? e(exports)
        : 'function' == typeof define && define.amd
        ? define(['exports'], e)
        : e(
              ((t =
                  'undefined' != typeof globalThis
                      ? globalThis
                      : t || self).XState = {})
          );
})(this, function (t) {
    'use strict';
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
    ***************************************************************************** */ var e =
        function () {
            return (e =
                Object.assign ||
                function (t) {
                    for (var e, n = 1, r = arguments.length; n < r; n++)
                        for (var i in (e = arguments[n]))
                            Object.prototype.hasOwnProperty.call(e, i) &&
                                (t[i] = e[i]);
                    return t;
                }).apply(this, arguments);
        };
    function n(t, e) {
        var n = {};
        for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) &&
                e.indexOf(r) < 0 &&
                (n[r] = t[r]);
        if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
                e.indexOf(r[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
                    (n[r[i]] = t[r[i]]);
        }
        return n;
    }
    function r(t) {
        var e = 'function' == typeof Symbol && Symbol.iterator,
            n = e && t[e],
            r = 0;
        if (n) return n.call(t);
        if (t && 'number' == typeof t.length)
            return {
                next: function () {
                    return (
                        t && r >= t.length && (t = void 0),
                        { value: t && t[r++], done: !t }
                    );
                }
            };
        throw new TypeError(
            e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
        );
    }
    function i(t, e) {
        var n = 'function' == typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r,
            i,
            o = n.call(t),
            a = [];
        try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
                a.push(r.value);
        } catch (t) {
            i = { error: t };
        } finally {
            try {
                r && !r.done && (n = o.return) && n.call(o);
            } finally {
                if (i) throw i.error;
            }
        }
        return a;
    }
    function o(t, e) {
        for (var n = 0, r = e.length, i = t.length; n < r; n++, i++)
            t[i] = e[n];
        return t;
    }
    var a = {};
    function s(t) {
        return Object.keys(t);
    }
    function c(t, e, n) {
        void 0 === n && (n = '.');
        var r = f(t, n),
            i = f(e, n);
        return O(i)
            ? !!O(r) && i === r
            : O(r)
            ? r in i
            : s(r).every(function (t) {
                  return t in i && c(r[t], i[t]);
              });
    }
    function u(t) {
        try {
            return O(t) || 'number' == typeof t ? '' + t : t.type;
        } catch (t) {
            throw new Error(
                'Events must be strings or objects with a string event.type property.'
            );
        }
    }
    function h(t, e) {
        try {
            return T(t) ? t : t.toString().split(e);
        } catch (e) {
            throw new Error("'" + t + "' is not a valid state path.");
        }
    }
    function f(t, e) {
        return 'object' == typeof (n = t) &&
            'value' in n &&
            'context' in n &&
            'event' in n &&
            '_event' in n
            ? t.value
            : T(t)
            ? l(t)
            : 'string' != typeof t
            ? t
            : l(h(t, e));
        var n;
    }
    function l(t) {
        if (1 === t.length) return t[0];
        for (var e = {}, n = e, r = 0; r < t.length - 1; r++)
            r === t.length - 2
                ? (n[t[r]] = t[r + 1])
                : ((n[t[r]] = {}), (n = n[t[r]]));
        return e;
    }
    function d(t, e) {
        for (var n = {}, r = s(t), i = 0; i < r.length; i++) {
            var o = r[i];
            n[o] = e(t[o], o, t, i);
        }
        return n;
    }
    function p(t, e, n) {
        var i,
            o,
            a = {};
        try {
            for (var c = r(s(t)), u = c.next(); !u.done; u = c.next()) {
                var h = u.value,
                    f = t[h];
                n(f) && (a[h] = e(f, h, t));
            }
        } catch (t) {
            i = { error: t };
        } finally {
            try {
                u && !u.done && (o = c.return) && o.call(c);
            } finally {
                if (i) throw i.error;
            }
        }
        return a;
    }
    var v = function (t) {
        return function (e) {
            var n,
                i,
                o = e;
            try {
                for (var a = r(t), s = a.next(); !s.done; s = a.next()) {
                    o = o[s.value];
                }
            } catch (t) {
                n = { error: t };
            } finally {
                try {
                    s && !s.done && (i = a.return) && i.call(a);
                } finally {
                    if (n) throw n.error;
                }
            }
            return o;
        };
    };
    function y(t) {
        return t
            ? O(t)
                ? [[t]]
                : g(
                      s(t).map(function (e) {
                          var n = t[e];
                          return 'string' == typeof n ||
                              (n && Object.keys(n).length)
                              ? y(t[e]).map(function (t) {
                                    return [e].concat(t);
                                })
                              : [[e]];
                      })
                  )
            : [[]];
    }
    function g(t) {
        var e;
        return (e = []).concat.apply(e, o([], i(t)));
    }
    function m(t) {
        return T(t) ? t : [t];
    }
    function S(t) {
        return void 0 === t ? [] : m(t);
    }
    function x(t, e, n) {
        var i, o;
        if (N(t)) return t(e, n.data);
        var a = {};
        try {
            for (
                var s = r(Object.keys(t)), c = s.next();
                !c.done;
                c = s.next()
            ) {
                var u = c.value,
                    h = t[u];
                N(h) ? (a[u] = h(e, n.data)) : (a[u] = h);
            }
        } catch (t) {
            i = { error: t };
        } finally {
            try {
                c && !c.done && (o = s.return) && o.call(s);
            } finally {
                if (i) throw i.error;
            }
        }
        return a;
    }
    function w(t) {
        return (
            t instanceof Promise ||
            !(null === t || (!N(t) && 'object' != typeof t) || !N(t.then))
        );
    }
    function b(t, e) {
        var n,
            o,
            a = i([[], []], 2),
            s = a[0],
            c = a[1];
        try {
            for (var u = r(t), h = u.next(); !h.done; h = u.next()) {
                var f = h.value;
                e(f) ? s.push(f) : c.push(f);
            }
        } catch (t) {
            n = { error: t };
        } finally {
            try {
                h && !h.done && (o = u.return) && o.call(u);
            } finally {
                if (n) throw n.error;
            }
        }
        return [s, c];
    }
    function _(t, e) {
        return d(t.states, function (t, n) {
            if (t) {
                var r = (O(e) ? void 0 : e[n]) || (t ? t.current : void 0);
                if (r) return { current: r, states: _(t, r) };
            }
        });
    }
    function E(t, e, n, i) {
        return t
            ? n.reduce(function (t, n) {
                  var o,
                      a,
                      c = n.assignment,
                      u = { state: i, action: n, _event: e },
                      h = {};
                  if (N(c)) h = c(t, e.data, u);
                  else
                      try {
                          for (
                              var f = r(s(c)), l = f.next();
                              !l.done;
                              l = f.next()
                          ) {
                              var d = l.value,
                                  p = c[d];
                              h[d] = N(p) ? p(t, e.data, u) : p;
                          }
                      } catch (t) {
                          o = { error: t };
                      } finally {
                          try {
                              l && !l.done && (a = f.return) && a.call(f);
                          } finally {
                              if (o) throw o.error;
                          }
                      }
                  return Object.assign({}, t, h);
              }, t)
            : t;
    }
    function T(t) {
        return Array.isArray(t);
    }
    function N(t) {
        return 'function' == typeof t;
    }
    function O(t) {
        return 'string' == typeof t;
    }
    function A(t, e) {
        if (t)
            return O(t)
                ? {
                      type: 'xstate.guard',
                      name: t,
                      predicate: e ? e[t] : void 0
                  }
                : N(t)
                ? { type: 'xstate.guard', name: t.name, predicate: t }
                : t;
    }
    var P = (function () {
        return (
            ('function' == typeof Symbol && Symbol.observable) || '@@observable'
        );
    })();
    function k(t) {
        try {
            return '__xstatenode' in t;
        } catch (t) {
            return !1;
        }
    }
    var I,
        j,
        C = (function () {
            var t = 0;
            return function () {
                return (++t).toString(16);
            };
        })();
    function V(t, n) {
        return O(t) || 'number' == typeof t ? e({ type: t }, n) : t;
    }
    function L(t, n) {
        if (!O(t) && '$$type' in t && 'scxml' === t.$$type) return t;
        var r = V(t);
        return e(
            { name: r.type, data: r, $$type: 'scxml', type: 'external' },
            n
        );
    }
    function D(t, n) {
        return m(n).map(function (n) {
            return void 0 === n || 'string' == typeof n || k(n)
                ? { target: n, event: t }
                : e(e({}, n), { event: t });
        });
    }
    function R(t, e, n, r, i) {
        var o = t.options.guards,
            a = { state: i, cond: e, _event: r };
        if ('xstate.guard' === e.type)
            return ((null == o ? void 0 : o[e.name]) || e.predicate)(
                n,
                r.data,
                a
            );
        var s = o[e.type];
        if (!s)
            throw new Error(
                "Guard '" +
                    e.type +
                    "' is not implemented on machine '" +
                    t.id +
                    "'."
            );
        return s(n, r.data, a);
    }
    function M(t) {
        return 'string' == typeof t ? { type: t } : t;
    }
    function z(t, e, n) {
        if ('object' == typeof t) return t;
        var r = function () {};
        return { next: t, error: e || r, complete: n || r };
    }
    ((I = t.ActionTypes || (t.ActionTypes = {})).Start = 'xstate.start'),
        (I.Stop = 'xstate.stop'),
        (I.Raise = 'xstate.raise'),
        (I.Send = 'xstate.send'),
        (I.Cancel = 'xstate.cancel'),
        (I.NullEvent = ''),
        (I.Assign = 'xstate.assign'),
        (I.After = 'xstate.after'),
        (I.DoneState = 'done.state'),
        (I.DoneInvoke = 'done.invoke'),
        (I.Log = 'xstate.log'),
        (I.Init = 'xstate.init'),
        (I.Invoke = 'xstate.invoke'),
        (I.ErrorExecution = 'error.execution'),
        (I.ErrorCommunication = 'error.communication'),
        (I.ErrorPlatform = 'error.platform'),
        (I.ErrorCustom = 'xstate.error'),
        (I.Update = 'xstate.update'),
        (I.Pure = 'xstate.pure'),
        (I.Choose = 'xstate.choose'),
        ((j = t.SpecialTargets || (t.SpecialTargets = {})).Parent = '#_parent'),
        (j.Internal = '#_internal');
    var F = function (t) {
        return 'atomic' === t.type || 'final' === t.type;
    };
    function U(t) {
        return s(t.states).map(function (e) {
            return t.states[e];
        });
    }
    function B(t) {
        var e = [t];
        return F(t) ? e : e.concat(g(U(t).map(B)));
    }
    function J(t, e) {
        var n,
            i,
            o,
            a,
            s,
            c,
            u,
            h,
            f = q(new Set(t)),
            l = new Set(e);
        try {
            for (var d = r(l), p = d.next(); !p.done; p = d.next())
                for (var v = (E = p.value).parent; v && !l.has(v); )
                    l.add(v), (v = v.parent);
        } catch (t) {
            n = { error: t };
        } finally {
            try {
                p && !p.done && (i = d.return) && i.call(d);
            } finally {
                if (n) throw n.error;
            }
        }
        var y = q(l);
        try {
            for (var g = r(l), m = g.next(); !m.done; m = g.next()) {
                if (
                    'compound' !== (E = m.value).type ||
                    (y.get(E) && y.get(E).length)
                ) {
                    if ('parallel' === E.type)
                        try {
                            for (
                                var S = ((s = void 0), r(U(E))), x = S.next();
                                !x.done;
                                x = S.next()
                            ) {
                                var w = x.value;
                                'history' !== w.type &&
                                    (l.has(w) ||
                                        (l.add(w),
                                        f.get(w)
                                            ? f.get(w).forEach(function (t) {
                                                  return l.add(t);
                                              })
                                            : w.initialStateNodes.forEach(
                                                  function (t) {
                                                      return l.add(t);
                                                  }
                                              )));
                            }
                        } catch (t) {
                            s = { error: t };
                        } finally {
                            try {
                                x && !x.done && (c = S.return) && c.call(S);
                            } finally {
                                if (s) throw s.error;
                            }
                        }
                } else
                    f.get(E)
                        ? f.get(E).forEach(function (t) {
                              return l.add(t);
                          })
                        : E.initialStateNodes.forEach(function (t) {
                              return l.add(t);
                          });
            }
        } catch (t) {
            o = { error: t };
        } finally {
            try {
                m && !m.done && (a = g.return) && a.call(g);
            } finally {
                if (o) throw o.error;
            }
        }
        try {
            for (var b = r(l), _ = b.next(); !_.done; _ = b.next()) {
                var E;
                for (v = (E = _.value).parent; v && !l.has(v); )
                    l.add(v), (v = v.parent);
            }
        } catch (t) {
            u = { error: t };
        } finally {
            try {
                _ && !_.done && (h = b.return) && h.call(b);
            } finally {
                if (u) throw u.error;
            }
        }
        return l;
    }
    function q(t) {
        var e,
            n,
            i = new Map();
        try {
            for (var o = r(t), a = o.next(); !a.done; a = o.next()) {
                var s = a.value;
                i.has(s) || i.set(s, []),
                    s.parent &&
                        (i.has(s.parent) || i.set(s.parent, []),
                        i.get(s.parent).push(s));
            }
        } catch (t) {
            e = { error: t };
        } finally {
            try {
                a && !a.done && (n = o.return) && n.call(o);
            } finally {
                if (e) throw e.error;
            }
        }
        return i;
    }
    function $(t, e) {
        return (function t(e, n) {
            var r = n.get(e);
            if (!r) return {};
            if ('compound' === e.type) {
                var i = r[0];
                if (!i) return {};
                if (F(i)) return i.key;
            }
            var o = {};
            return (
                r.forEach(function (e) {
                    o[e.key] = t(e, n);
                }),
                o
            );
        })(t, q(J([t], e)));
    }
    function X(t, e) {
        return Array.isArray(t)
            ? t.some(function (t) {
                  return t === e;
              })
            : t instanceof Set && t.has(e);
    }
    function H(t, e) {
        return 'compound' === e.type
            ? U(e).some(function (e) {
                  return 'final' === e.type && X(t, e);
              })
            : 'parallel' === e.type &&
                  U(e).every(function (e) {
                      return H(t, e);
                  });
    }
    var G = t.ActionTypes.Start,
        K = t.ActionTypes.Stop,
        Q = t.ActionTypes.Raise,
        W = t.ActionTypes.Send,
        Y = t.ActionTypes.Cancel,
        Z = t.ActionTypes.NullEvent,
        tt = t.ActionTypes.Assign,
        et = (t.ActionTypes.After, t.ActionTypes.DoneState, t.ActionTypes.Log),
        nt = t.ActionTypes.Init,
        rt = t.ActionTypes.Invoke,
        it = (t.ActionTypes.ErrorExecution, t.ActionTypes.ErrorPlatform),
        ot = t.ActionTypes.ErrorCustom,
        at = t.ActionTypes.Update,
        st = t.ActionTypes.Choose,
        ct = t.ActionTypes.Pure,
        ut = L({ type: nt });
    function ht(t, e) {
        return (e && e[t]) || void 0;
    }
    function ft(t, n) {
        var r;
        if (O(t) || 'number' == typeof t)
            r = N((i = ht(t, n)))
                ? { type: t, exec: i }
                : i || { type: t, exec: void 0 };
        else if (N(t)) r = { type: t.name || t.toString(), exec: t };
        else {
            var i;
            if (N((i = ht(t.type, n)))) r = e(e({}, t), { exec: i });
            else if (i) {
                var o = i.type || t.type;
                r = e(e(e({}, i), t), { type: o });
            } else r = t;
        }
        return r;
    }
    var lt = function (t, e) {
        return t
            ? (T(t) ? t : [t]).map(function (t) {
                  return ft(t, e);
              })
            : [];
    };
    function dt(t) {
        var n = ft(t);
        return e(e({ id: O(t) ? t : n.id }, n), { type: n.type });
    }
    function pt(e) {
        return O(e)
            ? { type: Q, event: e }
            : vt(e, { to: t.SpecialTargets.Internal });
    }
    function vt(t, e) {
        return {
            to: e ? e.to : void 0,
            type: W,
            event: N(t) ? t : V(t),
            delay: e ? e.delay : void 0,
            id: e && void 0 !== e.id ? e.id : N(t) ? t.name : u(t)
        };
    }
    function yt(n, r) {
        return vt(n, e(e({}, r), { to: t.SpecialTargets.Parent }));
    }
    function gt() {
        return yt(at);
    }
    var mt = function (t, e) {
        return { context: t, event: e };
    };
    var St = function (t) {
        return { type: Y, sendId: t };
    };
    function xt(e) {
        var n = dt(e);
        return { type: t.ActionTypes.Start, activity: n, exec: void 0 };
    }
    function wt(e) {
        var n = N(e) ? e : dt(e);
        return { type: t.ActionTypes.Stop, activity: n, exec: void 0 };
    }
    var bt = function (t) {
        return { type: tt, assignment: t };
    };
    function _t(e, n) {
        var r = n ? '#' + n : '';
        return t.ActionTypes.After + '(' + e + ')' + r;
    }
    function Et(e, n) {
        var r = t.ActionTypes.DoneState + '.' + e,
            i = {
                type: r,
                data: n,
                toString: function () {
                    return r;
                }
            };
        return i;
    }
    function Tt(e, n) {
        var r = t.ActionTypes.DoneInvoke + '.' + e,
            i = {
                type: r,
                data: n,
                toString: function () {
                    return r;
                }
            };
        return i;
    }
    function Nt(e, n) {
        var r = t.ActionTypes.ErrorPlatform + '.' + e,
            i = {
                type: r,
                data: n,
                toString: function () {
                    return r;
                }
            };
        return i;
    }
    function Ot(t, n) {
        return vt(function (t, e) {
            return e;
        }, e(e({}, n), { to: t }));
    }
    function At(n, r, a, s, c, u) {
        void 0 === u && (u = !1);
        var h = i(
                u
                    ? [[], c]
                    : b(c, function (t) {
                          return t.type === tt;
                      }),
                2
            ),
            f = h[0],
            l = h[1],
            d = f.length ? E(a, s, f, r) : a,
            p = u ? [a] : void 0;
        return [
            g(
                l
                    .map(function (a) {
                        var c;
                        switch (a.type) {
                            case Q:
                                return { type: Q, _event: L(a.event) };
                            case W:
                                return (function (t, n, r, i) {
                                    var o,
                                        a = { _event: r },
                                        s = L(
                                            N(t.event)
                                                ? t.event(n, r.data, a)
                                                : t.event
                                        );
                                    if (O(t.delay)) {
                                        var c = i && i[t.delay];
                                        o = N(c) ? c(n, r.data, a) : c;
                                    } else o = N(t.delay) ? t.delay(n, r.data, a) : t.delay;
                                    var u = N(t.to) ? t.to(n, r.data, a) : t.to;
                                    return e(e({}, t), {
                                        to: u,
                                        _event: s,
                                        event: s.data,
                                        delay: o
                                    });
                                })(a, d, s, n.options.delays);
                            case et:
                                return (function (t, n, r) {
                                    return e(e({}, t), {
                                        value: O(t.expr)
                                            ? t.expr
                                            : t.expr(n, r.data, { _event: r })
                                    });
                                })(a, d, s);
                            case st:
                                if (
                                    !(v =
                                        null ===
                                            (c = a.conds.find(function (t) {
                                                var e = A(
                                                    t.cond,
                                                    n.options.guards
                                                );
                                                return !e || R(n, e, d, s, r);
                                            })) || void 0 === c
                                            ? void 0
                                            : c.actions)
                                )
                                    return [];
                                var h = i(
                                        At(
                                            n,
                                            r,
                                            d,
                                            s,
                                            lt(S(v), n.options.actions),
                                            u
                                        ),
                                        2
                                    ),
                                    f = h[0],
                                    l = h[1];
                                return (d = l), null == p || p.push(d), f;
                            case ct:
                                var v;
                                if (!(v = a.get(d, s.data))) return [];
                                var y = i(
                                        At(
                                            n,
                                            r,
                                            d,
                                            s,
                                            lt(S(v), n.options.actions),
                                            u
                                        ),
                                        2
                                    ),
                                    g = y[0],
                                    m = y[1];
                                return (d = m), null == p || p.push(d), g;
                            case K:
                                return (function (e, n, r) {
                                    var i = N(e.activity)
                                            ? e.activity(n, r.data)
                                            : e.activity,
                                        o =
                                            'string' == typeof i
                                                ? { id: i }
                                                : i;
                                    return {
                                        type: t.ActionTypes.Stop,
                                        activity: o
                                    };
                                })(a, d, s);
                            case tt:
                                (d = E(d, s, [a], r)), null == p || p.push(d);
                                break;
                            default:
                                var x = ft(a, n.options.actions),
                                    w = x.exec;
                                if (w && p) {
                                    var b = p.length - 1;
                                    x.exec = function (t) {
                                        for (
                                            var e = [], n = 1;
                                            n < arguments.length;
                                            n++
                                        )
                                            e[n - 1] = arguments[n];
                                        null == w ||
                                            w.apply(void 0, o([p[b]], i(e)));
                                    };
                                }
                                return x;
                        }
                    })
                    .filter(function (t) {
                        return !!t;
                    })
            ),
            d
        ];
    }
    var Pt = (function () {
            function t(t) {
                var e,
                    n,
                    r = this;
                (this.actions = []),
                    (this.activities = a),
                    (this.meta = {}),
                    (this.events = []),
                    (this.value = t.value),
                    (this.context = t.context),
                    (this._event = t._event),
                    (this._sessionid = t._sessionid),
                    (this.event = this._event.data),
                    (this.historyValue = t.historyValue),
                    (this.history = t.history),
                    (this.actions = t.actions || []),
                    (this.activities = t.activities || a),
                    (this.meta =
                        (void 0 === (n = t.configuration) && (n = []),
                        n.reduce(function (t, e) {
                            return void 0 !== e.meta && (t[e.id] = e.meta), t;
                        }, {}))),
                    (this.events = t.events || []),
                    (this.matches = this.matches.bind(this)),
                    (this.toStrings = this.toStrings.bind(this)),
                    (this.configuration = t.configuration),
                    (this.transitions = t.transitions),
                    (this.children = t.children),
                    (this.done = !!t.done),
                    (this.tags =
                        null !==
                            (e = Array.isArray(t.tags)
                                ? new Set(t.tags)
                                : t.tags) && void 0 !== e
                            ? e
                            : new Set()),
                    (this.machine = t.machine),
                    Object.defineProperty(this, 'nextEvents', {
                        get: function () {
                            return (function (t) {
                                return o(
                                    [],
                                    i(
                                        new Set(
                                            g(
                                                o(
                                                    [],
                                                    i(
                                                        t.map(function (t) {
                                                            return t.ownEvents;
                                                        })
                                                    )
                                                )
                                            )
                                        )
                                    )
                                );
                            })(r.configuration);
                        }
                    });
            }
            return (
                (t.from = function (e, n) {
                    return e instanceof t
                        ? e.context !== n
                            ? new t({
                                  value: e.value,
                                  context: n,
                                  _event: e._event,
                                  _sessionid: null,
                                  historyValue: e.historyValue,
                                  history: e.history,
                                  actions: [],
                                  activities: e.activities,
                                  meta: {},
                                  events: [],
                                  configuration: [],
                                  transitions: [],
                                  children: {}
                              })
                            : e
                        : new t({
                              value: e,
                              context: n,
                              _event: ut,
                              _sessionid: null,
                              historyValue: void 0,
                              history: void 0,
                              actions: [],
                              activities: void 0,
                              meta: void 0,
                              events: [],
                              configuration: [],
                              transitions: [],
                              children: {}
                          });
                }),
                (t.create = function (e) {
                    return new t(e);
                }),
                (t.inert = function (e, n) {
                    if (e instanceof t) {
                        if (!e.actions.length) return e;
                        var r = ut;
                        return new t({
                            value: e.value,
                            context: n,
                            _event: r,
                            _sessionid: null,
                            historyValue: e.historyValue,
                            history: e.history,
                            activities: e.activities,
                            configuration: e.configuration,
                            transitions: [],
                            children: {}
                        });
                    }
                    return t.from(e, n);
                }),
                (t.prototype.toStrings = function (t, e) {
                    var n = this;
                    if (
                        (void 0 === t && (t = this.value),
                        void 0 === e && (e = '.'),
                        O(t))
                    )
                        return [t];
                    var r = s(t);
                    return r.concat.apply(
                        r,
                        o(
                            [],
                            i(
                                r.map(function (r) {
                                    return n
                                        .toStrings(t[r], e)
                                        .map(function (t) {
                                            return r + e + t;
                                        });
                                })
                            )
                        )
                    );
                }),
                (t.prototype.toJSON = function () {
                    var t = this,
                        r = (t.configuration, t.transitions, t.tags),
                        i =
                            (t.machine,
                            n(t, [
                                'configuration',
                                'transitions',
                                'tags',
                                'machine'
                            ]));
                    return e(e({}, i), { tags: Array.from(r) });
                }),
                (t.prototype.matches = function (t) {
                    return c(t, this.value);
                }),
                (t.prototype.hasTag = function (t) {
                    return this.tags.has(t);
                }),
                (t.prototype.can = function (t) {
                    var e;
                    return (
                        this.machine,
                        !!(null === (e = this.machine) || void 0 === e
                            ? void 0
                            : e.transition(this, t).changed)
                    );
                }),
                t
            );
        })(),
        kt = [],
        It = function (t, e) {
            kt.push(t);
            var n = e(t);
            return kt.pop(), n;
        };
    function jt(t) {
        return {
            id: t,
            send: function () {},
            subscribe: function () {
                return { unsubscribe: function () {} };
            },
            getSnapshot: function () {},
            toJSON: function () {
                return { id: t };
            }
        };
    }
    function Ct(t, e, n) {
        var r = jt(e);
        if (((r.deferred = !0), k(t))) {
            var i = (r.state = It(void 0, function () {
                return (n ? t.withContext(n) : t).initialState;
            }));
            r.getSnapshot = function () {
                return i;
            };
        }
        return r;
    }
    function Vt(t) {
        if ('string' == typeof t) {
            var e = {
                type: t,
                toString: function () {
                    return t;
                }
            };
            return e;
        }
        return t;
    }
    function Lt(t) {
        return e(e({ type: rt }, t), {
            toJSON: function () {
                t.onDone, t.onError;
                var r = n(t, ['onDone', 'onError']);
                return e(e({}, r), { type: rt, src: Vt(t.src) });
            }
        });
    }
    var Dt = {},
        Rt = function (t) {
            return '#' === t[0];
        },
        Mt = (function () {
            function a(t, n, c) {
                var u,
                    h = this;
                void 0 === c && (c = 'context' in t ? t.context : void 0),
                    (this.config = t),
                    (this._context = c),
                    (this.order = -1),
                    (this.__xstatenode = !0),
                    (this.__cache = {
                        events: void 0,
                        relativeValue: new Map(),
                        initialStateValue: void 0,
                        initialState: void 0,
                        on: void 0,
                        transitions: void 0,
                        candidates: {},
                        delayedTransitions: void 0
                    }),
                    (this.idMap = {}),
                    (this.tags = []),
                    (this.options = Object.assign(
                        {
                            actions: {},
                            guards: {},
                            services: {},
                            activities: {},
                            delays: {}
                        },
                        n
                    )),
                    (this.parent = this.options._parent),
                    (this.key =
                        this.config.key ||
                        this.options._key ||
                        this.config.id ||
                        '(machine)'),
                    (this.machine = this.parent ? this.parent.machine : this),
                    (this.path = this.parent
                        ? this.parent.path.concat(this.key)
                        : []),
                    (this.delimiter =
                        this.config.delimiter ||
                        (this.parent ? this.parent.delimiter : '.')),
                    (this.id =
                        this.config.id ||
                        o([this.machine.key], i(this.path)).join(
                            this.delimiter
                        )),
                    (this.version = this.parent
                        ? this.parent.version
                        : this.config.version),
                    (this.type =
                        this.config.type ||
                        (this.config.parallel
                            ? 'parallel'
                            : this.config.states && s(this.config.states).length
                            ? 'compound'
                            : this.config.history
                            ? 'history'
                            : 'atomic')),
                    (this.schema = this.parent
                        ? this.machine.schema
                        : null !== (u = this.config.schema) && void 0 !== u
                        ? u
                        : {}),
                    (this.initial = this.config.initial),
                    (this.states = this.config.states
                        ? d(this.config.states, function (t, n) {
                              var r,
                                  i = new a(t, { _parent: h, _key: n });
                              return (
                                  Object.assign(
                                      h.idMap,
                                      e((((r = {})[i.id] = i), r), i.idMap)
                                  ),
                                  i
                              );
                          })
                        : Dt);
                var f = 0;
                !(function t(e) {
                    var n, i;
                    e.order = f++;
                    try {
                        for (
                            var o = r(U(e)), a = o.next();
                            !a.done;
                            a = o.next()
                        ) {
                            t(a.value);
                        }
                    } catch (t) {
                        n = { error: t };
                    } finally {
                        try {
                            a && !a.done && (i = o.return) && i.call(o);
                        } finally {
                            if (n) throw n.error;
                        }
                    }
                })(this),
                    (this.history =
                        !0 === this.config.history
                            ? 'shallow'
                            : this.config.history || !1),
                    (this._transient =
                        !!this.config.always ||
                        (!!this.config.on &&
                            (Array.isArray(this.config.on)
                                ? this.config.on.some(function (t) {
                                      return '' === t.event;
                                  })
                                : '' in this.config.on))),
                    (this.strict = !!this.config.strict),
                    (this.onEntry = S(
                        this.config.entry || this.config.onEntry
                    ).map(function (t) {
                        return ft(t);
                    })),
                    (this.onExit = S(
                        this.config.exit || this.config.onExit
                    ).map(function (t) {
                        return ft(t);
                    })),
                    (this.meta = this.config.meta),
                    (this.doneData =
                        'final' === this.type ? this.config.data : void 0),
                    (this.invoke = S(this.config.invoke).map(function (t, n) {
                        var r, i;
                        if (k(t))
                            return (
                                (h.machine.options.services = e(
                                    (((r = {})[t.id] = t), r),
                                    h.machine.options.services
                                )),
                                Lt({ src: t.id, id: t.id })
                            );
                        if (O(t.src))
                            return Lt(
                                e(e({}, t), { id: t.id || t.src, src: t.src })
                            );
                        if (k(t.src) || N(t.src)) {
                            var o = h.id + ':invocation[' + n + ']';
                            return (
                                (h.machine.options.services = e(
                                    (((i = {})[o] = t.src), i),
                                    h.machine.options.services
                                )),
                                Lt(e(e({ id: o }, t), { src: o }))
                            );
                        }
                        var a = t.src;
                        return Lt(e(e({ id: a.type }, t), { src: a }));
                    })),
                    (this.activities = S(this.config.activities)
                        .concat(this.invoke)
                        .map(function (t) {
                            return dt(t);
                        })),
                    (this.transition = this.transition.bind(this)),
                    (this.tags = S(this.config.tags));
            }
            return (
                (a.prototype._init = function () {
                    this.__cache.transitions ||
                        B(this).forEach(function (t) {
                            return t.on;
                        });
                }),
                (a.prototype.withConfig = function (t, n) {
                    var r = this.options,
                        i = r.actions,
                        o = r.activities,
                        s = r.guards,
                        c = r.services,
                        u = r.delays;
                    return new a(
                        this.config,
                        {
                            actions: e(e({}, i), t.actions),
                            activities: e(e({}, o), t.activities),
                            guards: e(e({}, s), t.guards),
                            services: e(e({}, c), t.services),
                            delays: e(e({}, u), t.delays)
                        },
                        null != n ? n : this.context
                    );
                }),
                (a.prototype.withContext = function (t) {
                    return new a(this.config, this.options, t);
                }),
                Object.defineProperty(a.prototype, 'context', {
                    get: function () {
                        return N(this._context)
                            ? this._context()
                            : this._context;
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, 'definition', {
                    get: function () {
                        return {
                            id: this.id,
                            key: this.key,
                            version: this.version,
                            context: this.context,
                            type: this.type,
                            initial: this.initial,
                            history: this.history,
                            states: d(this.states, function (t) {
                                return t.definition;
                            }),
                            on: this.on,
                            transitions: this.transitions,
                            entry: this.onEntry,
                            exit: this.onExit,
                            activities: this.activities || [],
                            meta: this.meta,
                            order: this.order || -1,
                            data: this.doneData,
                            invoke: this.invoke
                        };
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (a.prototype.toJSON = function () {
                    return this.definition;
                }),
                Object.defineProperty(a.prototype, 'on', {
                    get: function () {
                        if (this.__cache.on) return this.__cache.on;
                        var t = this.transitions;
                        return (this.__cache.on = t.reduce(function (t, e) {
                            return (
                                (t[e.eventType] = t[e.eventType] || []),
                                t[e.eventType].push(e),
                                t
                            );
                        }, {}));
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, 'after', {
                    get: function () {
                        return (
                            this.__cache.delayedTransitions ||
                            ((this.__cache.delayedTransitions =
                                this.getDelayedTransitions()),
                            this.__cache.delayedTransitions)
                        );
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, 'transitions', {
                    get: function () {
                        return (
                            this.__cache.transitions ||
                            ((this.__cache.transitions =
                                this.formatTransitions()),
                            this.__cache.transitions)
                        );
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (a.prototype.getCandidates = function (t) {
                    if (this.__cache.candidates[t])
                        return this.__cache.candidates[t];
                    var e = '' === t,
                        n = this.transitions.filter(function (n) {
                            var r = n.eventType === t;
                            return e ? r : r || '*' === n.eventType;
                        });
                    return (this.__cache.candidates[t] = n), n;
                }),
                (a.prototype.getDelayedTransitions = function () {
                    var t = this,
                        n = this.config.after;
                    if (!n) return [];
                    var r = function (e, n) {
                        var r = _t(N(e) ? t.id + ':delay[' + n + ']' : e, t.id);
                        return (
                            t.onEntry.push(vt(r, { delay: e })),
                            t.onExit.push(St(r)),
                            r
                        );
                    };
                    return (
                        T(n)
                            ? n.map(function (t, n) {
                                  var i = r(t.delay, n);
                                  return e(e({}, t), { event: i });
                              })
                            : g(
                                  s(n).map(function (t, i) {
                                      var o = n[t],
                                          a = O(o) ? { target: o } : o,
                                          s = isNaN(+t) ? t : +t,
                                          c = r(s, i);
                                      return S(a).map(function (t) {
                                          return e(e({}, t), {
                                              event: c,
                                              delay: s
                                          });
                                      });
                                  })
                              )
                    ).map(function (n) {
                        var r = n.delay;
                        return e(e({}, t.formatTransition(n)), { delay: r });
                    });
                }),
                (a.prototype.getStateNodes = function (t) {
                    var e,
                        n = this;
                    if (!t) return [];
                    var r = t instanceof Pt ? t.value : f(t, this.delimiter);
                    if (O(r)) {
                        var i = this.getStateNode(r).initial;
                        return void 0 !== i
                            ? this.getStateNodes((((e = {})[r] = i), e))
                            : [this, this.states[r]];
                    }
                    var o = s(r),
                        a = o.map(function (t) {
                            return n.getStateNode(t);
                        });
                    return (
                        a.push(this),
                        a.concat(
                            o.reduce(function (t, e) {
                                var i = n.getStateNode(e).getStateNodes(r[e]);
                                return t.concat(i);
                            }, [])
                        )
                    );
                }),
                (a.prototype.handles = function (t) {
                    var e = u(t);
                    return this.events.includes(e);
                }),
                (a.prototype.resolveState = function (t) {
                    var n = Array.from(J([], this.getStateNodes(t.value)));
                    return new Pt(
                        e(e({}, t), {
                            value: this.resolve(t.value),
                            configuration: n,
                            done: H(n, this)
                        })
                    );
                }),
                (a.prototype.transitionLeafNode = function (t, e, n) {
                    var r = this.getStateNode(t).next(e, n);
                    return r && r.transitions.length ? r : this.next(e, n);
                }),
                (a.prototype.transitionCompoundNode = function (t, e, n) {
                    var r = s(t),
                        i = this.getStateNode(r[0])._transition(t[r[0]], e, n);
                    return i && i.transitions.length ? i : this.next(e, n);
                }),
                (a.prototype.transitionParallelNode = function (t, e, n) {
                    var i,
                        o,
                        a = {};
                    try {
                        for (
                            var c = r(s(t)), u = c.next();
                            !u.done;
                            u = c.next()
                        ) {
                            var h = u.value,
                                f = t[h];
                            if (f) {
                                var l = this.getStateNode(h)._transition(
                                    f,
                                    e,
                                    n
                                );
                                l && (a[h] = l);
                            }
                        }
                    } catch (t) {
                        i = { error: t };
                    } finally {
                        try {
                            u && !u.done && (o = c.return) && o.call(c);
                        } finally {
                            if (i) throw i.error;
                        }
                    }
                    var d = s(a).map(function (t) {
                            return a[t];
                        }),
                        p = g(
                            d.map(function (t) {
                                return t.transitions;
                            })
                        );
                    if (
                        !d.some(function (t) {
                            return t.transitions.length > 0;
                        })
                    )
                        return this.next(e, n);
                    var v = g(
                            d.map(function (t) {
                                return t.entrySet;
                            })
                        ),
                        y = g(
                            s(a).map(function (t) {
                                return a[t].configuration;
                            })
                        );
                    return {
                        transitions: p,
                        entrySet: v,
                        exitSet: g(
                            d.map(function (t) {
                                return t.exitSet;
                            })
                        ),
                        configuration: y,
                        source: e,
                        actions: g(
                            s(a).map(function (t) {
                                return a[t].actions;
                            })
                        )
                    };
                }),
                (a.prototype._transition = function (t, e, n) {
                    return O(t)
                        ? this.transitionLeafNode(t, e, n)
                        : 1 === s(t).length
                        ? this.transitionCompoundNode(t, e, n)
                        : this.transitionParallelNode(t, e, n);
                }),
                (a.prototype.next = function (t, e) {
                    var n,
                        a,
                        s,
                        u = this,
                        h = e.name,
                        l = [],
                        d = [];
                    try {
                        for (
                            var p = r(this.getCandidates(h)), y = p.next();
                            !y.done;
                            y = p.next()
                        ) {
                            var m = y.value,
                                S = m.cond,
                                x = m.in,
                                w = t.context,
                                b =
                                    !x ||
                                    (O(x) && Rt(x)
                                        ? t.matches(
                                              f(
                                                  this.getStateNodeById(x).path,
                                                  this.delimiter
                                              )
                                          )
                                        : c(
                                              f(x, this.delimiter),
                                              v(this.path.slice(0, -2))(t.value)
                                          )),
                                _ = !1;
                            try {
                                _ = !S || R(this.machine, S, w, e, t);
                            } catch (t) {
                                throw new Error(
                                    "Unable to evaluate guard '" +
                                        (S.name || S.type) +
                                        "' in transition for event '" +
                                        h +
                                        "' in state node '" +
                                        this.id +
                                        "':\n" +
                                        t.message
                                );
                            }
                            if (_ && b) {
                                void 0 !== m.target && (d = m.target),
                                    l.push.apply(l, o([], i(m.actions))),
                                    (s = m);
                                break;
                            }
                        }
                    } catch (t) {
                        n = { error: t };
                    } finally {
                        try {
                            y && !y.done && (a = p.return) && a.call(p);
                        } finally {
                            if (n) throw n.error;
                        }
                    }
                    if (s) {
                        if (!d.length)
                            return {
                                transitions: [s],
                                entrySet: [],
                                exitSet: [],
                                configuration: t.value ? [this] : [],
                                source: t,
                                actions: l
                            };
                        var E = g(
                                d.map(function (e) {
                                    return u.getRelativeStateNodes(
                                        e,
                                        t.historyValue
                                    );
                                })
                            ),
                            T = !!s.internal;
                        return {
                            transitions: [s],
                            entrySet: T
                                ? []
                                : g(
                                      E.map(function (t) {
                                          return u.nodesFromChild(t);
                                      })
                                  ),
                            exitSet: T ? [] : [this],
                            configuration: E,
                            source: t,
                            actions: l
                        };
                    }
                }),
                (a.prototype.nodesFromChild = function (t) {
                    if (t.escapes(this)) return [];
                    for (var e = [], n = t; n && n !== this; )
                        e.push(n), (n = n.parent);
                    return e.push(this), e;
                }),
                (a.prototype.escapes = function (t) {
                    if (this === t) return !1;
                    for (var e = this.parent; e; ) {
                        if (e === t) return !1;
                        e = e.parent;
                    }
                    return !0;
                }),
                (a.prototype.getActions = function (t, e, n, a) {
                    var s,
                        c,
                        u,
                        h,
                        f = J([], a ? this.getStateNodes(a.value) : [this]),
                        l = t.configuration.length ? J(f, t.configuration) : f;
                    try {
                        for (
                            var d = r(l), p = d.next();
                            !p.done;
                            p = d.next()
                        ) {
                            X(f, (m = p.value)) || t.entrySet.push(m);
                        }
                    } catch (t) {
                        s = { error: t };
                    } finally {
                        try {
                            p && !p.done && (c = d.return) && c.call(d);
                        } finally {
                            if (s) throw s.error;
                        }
                    }
                    try {
                        for (
                            var v = r(f), y = v.next();
                            !y.done;
                            y = v.next()
                        ) {
                            var m;
                            (X(l, (m = y.value)) && !X(t.exitSet, m.parent)) ||
                                t.exitSet.push(m);
                        }
                    } catch (t) {
                        u = { error: t };
                    } finally {
                        try {
                            y && !y.done && (h = v.return) && h.call(v);
                        } finally {
                            if (u) throw u.error;
                        }
                    }
                    t.source || ((t.exitSet = []), t.entrySet.push(this));
                    var S = g(
                        t.entrySet.map(function (r) {
                            var i = [];
                            if ('final' !== r.type) return i;
                            var o = r.parent;
                            if (!o.parent) return i;
                            i.push(
                                Et(r.id, r.doneData),
                                Et(
                                    o.id,
                                    r.doneData ? x(r.doneData, e, n) : void 0
                                )
                            );
                            var a = o.parent;
                            return (
                                'parallel' === a.type &&
                                    U(a).every(function (e) {
                                        return H(t.configuration, e);
                                    }) &&
                                    i.push(Et(a.id)),
                                i
                            );
                        })
                    );
                    t.exitSet.sort(function (t, e) {
                        return e.order - t.order;
                    }),
                        t.entrySet.sort(function (t, e) {
                            return t.order - e.order;
                        });
                    var w = new Set(t.entrySet),
                        b = new Set(t.exitSet),
                        _ = i(
                            [
                                g(
                                    Array.from(w).map(function (t) {
                                        return o(
                                            o(
                                                [],
                                                i(
                                                    t.activities.map(function (
                                                        t
                                                    ) {
                                                        return xt(t);
                                                    })
                                                )
                                            ),
                                            i(t.onEntry)
                                        );
                                    })
                                ).concat(S.map(pt)),
                                g(
                                    Array.from(b).map(function (t) {
                                        return o(
                                            o([], i(t.onExit)),
                                            i(
                                                t.activities.map(function (t) {
                                                    return wt(t);
                                                })
                                            )
                                        );
                                    })
                                )
                            ],
                            2
                        ),
                        E = _[0],
                        T = _[1];
                    return lt(
                        T.concat(t.actions).concat(E),
                        this.machine.options.actions
                    );
                }),
                (a.prototype.transition = function (t, e, n) {
                    void 0 === t && (t = this.initialState);
                    var r,
                        a,
                        s = L(e);
                    if (t instanceof Pt)
                        r = void 0 === n ? t : this.resolveState(Pt.from(t, n));
                    else {
                        var c = O(t)
                                ? this.resolve(l(this.getResolvedPath(t)))
                                : this.resolve(t),
                            u = null != n ? n : this.machine.context;
                        r = this.resolveState(Pt.from(c, u));
                    }
                    if (
                        this.strict &&
                        !this.events.includes(s.name) &&
                        ((a = s.name), !/^(done|error)\./.test(a))
                    )
                        throw new Error(
                            "Machine '" +
                                this.id +
                                "' does not accept event '" +
                                s.name +
                                "'"
                        );
                    var h = this._transition(r.value, r, s) || {
                            transitions: [],
                            configuration: [],
                            entrySet: [],
                            exitSet: [],
                            source: r,
                            actions: []
                        },
                        f = J([], this.getStateNodes(r.value)),
                        d = h.configuration.length ? J(f, h.configuration) : f;
                    return (
                        (h.configuration = o([], i(d))),
                        this.resolveTransition(h, r, s)
                    );
                }),
                (a.prototype.resolveRaisedTransition = function (t, e, n) {
                    var r,
                        a = t.actions;
                    return (
                        ((t = this.transition(t, e))._event = n),
                        (t.event = n.data),
                        (r = t.actions).unshift.apply(r, o([], i(a))),
                        t
                    );
                }),
                (a.prototype.resolveTransition = function (n, o, a, c) {
                    var u,
                        h,
                        f = this;
                    void 0 === a && (a = ut),
                        void 0 === c && (c = this.machine.context);
                    var l = n.configuration,
                        d = !o || n.transitions.length > 0,
                        p = d ? $(this.machine, l) : void 0,
                        v = o
                            ? o.historyValue
                                ? o.historyValue
                                : n.source
                                ? this.machine.historyValue(o.value)
                                : void 0
                            : void 0,
                        y = o ? o.context : c,
                        m = this.getActions(n, y, a, o),
                        S = o ? e({}, o.activities) : {};
                    try {
                        for (
                            var w = r(m), E = w.next();
                            !E.done;
                            E = w.next()
                        ) {
                            var T = E.value;
                            T.type === G
                                ? (S[T.activity.id || T.activity.type] = T)
                                : T.type === K &&
                                  (S[T.activity.id || T.activity.type] = !1);
                        }
                    } catch (t) {
                        u = { error: t };
                    } finally {
                        try {
                            E && !E.done && (h = w.return) && h.call(w);
                        } finally {
                            if (u) throw u.error;
                        }
                    }
                    var N,
                        A,
                        P = i(
                            At(
                                this,
                                o,
                                y,
                                a,
                                m,
                                this.machine.config.preserveActionOrder
                            ),
                            2
                        ),
                        k = P[0],
                        I = P[1],
                        j = i(
                            b(k, function (e) {
                                return (
                                    e.type === Q ||
                                    (e.type === W &&
                                        e.to === t.SpecialTargets.Internal)
                                );
                            }),
                            2
                        ),
                        C = j[0],
                        V = j[1],
                        L = k
                            .filter(function (t) {
                                var e;
                                return (
                                    t.type === G &&
                                    (null === (e = t.activity) || void 0 === e
                                        ? void 0
                                        : e.type) === rt
                                );
                            })
                            .reduce(
                                function (t, e) {
                                    return (
                                        (t[e.activity.id] = (function (
                                            t,
                                            e,
                                            n,
                                            r
                                        ) {
                                            var i,
                                                o = M(t.src),
                                                a =
                                                    null ===
                                                        (i =
                                                            null == e
                                                                ? void 0
                                                                : e.options
                                                                      .services) ||
                                                    void 0 === i
                                                        ? void 0
                                                        : i[o.type],
                                                s = t.data
                                                    ? x(t.data, n, r)
                                                    : void 0,
                                                c = a
                                                    ? Ct(a, t.id, s)
                                                    : jt(t.id);
                                            return (c.meta = t), c;
                                        })(e.activity, f.machine, I, a)),
                                        t
                                    );
                                },
                                o ? e({}, o.children) : {}
                            ),
                        D = p ? n.configuration : o ? o.configuration : [],
                        R = H(D, this),
                        z = new Pt({
                            value: p || o.value,
                            context: I,
                            _event: a,
                            _sessionid: o ? o._sessionid : null,
                            historyValue: p
                                ? v
                                    ? ((N = v),
                                      (A = p),
                                      { current: A, states: _(N, A) })
                                    : void 0
                                : o
                                ? o.historyValue
                                : void 0,
                            history: !p || n.source ? o : void 0,
                            actions: p ? V : [],
                            activities: p ? S : o ? o.activities : {},
                            events: [],
                            configuration: D,
                            transitions: n.transitions,
                            children: L,
                            done: R,
                            tags: null == o ? void 0 : o.tags,
                            machine: this
                        }),
                        F = y !== I;
                    z.changed = a.name === at || F;
                    var U = z.history;
                    U && delete U.history;
                    var B =
                        !R &&
                        (this._transient ||
                            l.some(function (t) {
                                return t._transient;
                            }));
                    if (!(d || (B && '' !== a.name))) return z;
                    var J = z;
                    if (!R)
                        for (
                            B &&
                            (J = this.resolveRaisedTransition(
                                J,
                                { type: Z },
                                a
                            ));
                            C.length;

                        ) {
                            var q = C.shift();
                            J = this.resolveRaisedTransition(J, q._event, a);
                        }
                    var X =
                        J.changed ||
                        (U
                            ? !!J.actions.length ||
                              F ||
                              typeof U.value != typeof J.value ||
                              !(function t(e, n) {
                                  if (e === n) return !0;
                                  if (void 0 === e || void 0 === n) return !1;
                                  if (O(e) || O(n)) return e === n;
                                  var r = s(e),
                                      i = s(n);
                                  return (
                                      r.length === i.length &&
                                      r.every(function (r) {
                                          return t(e[r], n[r]);
                                      })
                                  );
                              })(J.value, U.value)
                            : void 0);
                    return (
                        (J.changed = X),
                        (J.history = U),
                        (J.tags = new Set(
                            g(
                                J.configuration.map(function (t) {
                                    return t.tags;
                                })
                            )
                        )),
                        J
                    );
                }),
                (a.prototype.getStateNode = function (t) {
                    if (Rt(t)) return this.machine.getStateNodeById(t);
                    if (!this.states)
                        throw new Error(
                            "Unable to retrieve child state '" +
                                t +
                                "' from '" +
                                this.id +
                                "'; no child states exist."
                        );
                    var e = this.states[t];
                    if (!e)
                        throw new Error(
                            "Child state '" +
                                t +
                                "' does not exist on '" +
                                this.id +
                                "'"
                        );
                    return e;
                }),
                (a.prototype.getStateNodeById = function (t) {
                    var e = Rt(t) ? t.slice('#'.length) : t;
                    if (e === this.id) return this;
                    var n = this.machine.idMap[e];
                    if (!n)
                        throw new Error(
                            "Child state node '#" +
                                e +
                                "' does not exist on machine '" +
                                this.id +
                                "'"
                        );
                    return n;
                }),
                (a.prototype.getStateNodeByPath = function (t) {
                    if ('string' == typeof t && Rt(t))
                        try {
                            return this.getStateNodeById(t.slice(1));
                        } catch (t) {}
                    for (
                        var e = h(t, this.delimiter).slice(), n = this;
                        e.length;

                    ) {
                        var r = e.shift();
                        if (!r.length) break;
                        n = n.getStateNode(r);
                    }
                    return n;
                }),
                (a.prototype.resolve = function (t) {
                    var e,
                        n = this;
                    if (!t) return this.initialStateValue || Dt;
                    switch (this.type) {
                        case 'parallel':
                            return d(this.initialStateValue, function (e, r) {
                                return e
                                    ? n.getStateNode(r).resolve(t[r] || e)
                                    : Dt;
                            });
                        case 'compound':
                            if (O(t)) {
                                var r = this.getStateNode(t);
                                return 'parallel' === r.type ||
                                    'compound' === r.type
                                    ? (((e = {})[t] = r.initialStateValue), e)
                                    : t;
                            }
                            return s(t).length
                                ? d(t, function (t, e) {
                                      return t
                                          ? n.getStateNode(e).resolve(t)
                                          : Dt;
                                  })
                                : this.initialStateValue || {};
                        default:
                            return t || Dt;
                    }
                }),
                (a.prototype.getResolvedPath = function (t) {
                    if (Rt(t)) {
                        var e = this.machine.idMap[t.slice('#'.length)];
                        if (!e)
                            throw new Error(
                                "Unable to find state node '" + t + "'"
                            );
                        return e.path;
                    }
                    return h(t, this.delimiter);
                }),
                Object.defineProperty(a.prototype, 'initialStateValue', {
                    get: function () {
                        var t, e;
                        if (this.__cache.initialStateValue)
                            return this.__cache.initialStateValue;
                        if ('parallel' === this.type)
                            e = p(
                                this.states,
                                function (t) {
                                    return t.initialStateValue || Dt;
                                },
                                function (t) {
                                    return !('history' === t.type);
                                }
                            );
                        else if (void 0 !== this.initial) {
                            if (!this.states[this.initial])
                                throw new Error(
                                    "Initial state '" +
                                        this.initial +
                                        "' not found on '" +
                                        this.key +
                                        "'"
                                );
                            e = F(this.states[this.initial])
                                ? this.initial
                                : (((t = {})[this.initial] =
                                      this.states[
                                          this.initial
                                      ].initialStateValue),
                                  t);
                        } else e = {};
                        return (
                            (this.__cache.initialStateValue = e),
                            this.__cache.initialStateValue
                        );
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (a.prototype.getInitialState = function (t, e) {
                    var n = this.getStateNodes(t);
                    return this.resolveTransition(
                        {
                            configuration: n,
                            entrySet: n,
                            exitSet: [],
                            transitions: [],
                            source: void 0,
                            actions: []
                        },
                        void 0,
                        void 0,
                        e
                    );
                }),
                Object.defineProperty(a.prototype, 'initialState', {
                    get: function () {
                        this._init();
                        var t = this.initialStateValue;
                        if (!t)
                            throw new Error(
                                "Cannot retrieve initial state from simple state '" +
                                    this.id +
                                    "'."
                            );
                        return this.getInitialState(t);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, 'target', {
                    get: function () {
                        var t;
                        if ('history' === this.type) {
                            var e = this.config;
                            t =
                                O(e.target) && Rt(e.target)
                                    ? l(
                                          this.machine
                                              .getStateNodeById(e.target)
                                              .path.slice(this.path.length - 1)
                                      )
                                    : e.target;
                        }
                        return t;
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (a.prototype.getRelativeStateNodes = function (t, e, n) {
                    return (
                        void 0 === n && (n = !0),
                        n
                            ? 'history' === t.type
                                ? t.resolveHistory(e)
                                : t.initialStateNodes
                            : [t]
                    );
                }),
                Object.defineProperty(a.prototype, 'initialStateNodes', {
                    get: function () {
                        var t = this;
                        return F(this)
                            ? [this]
                            : 'compound' !== this.type || this.initial
                            ? g(
                                  y(this.initialStateValue).map(function (e) {
                                      return t.getFromRelativePath(e);
                                  })
                              )
                            : [this];
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (a.prototype.getFromRelativePath = function (t) {
                    if (!t.length) return [this];
                    var e = i(t),
                        n = e[0],
                        r = e.slice(1);
                    if (!this.states)
                        throw new Error(
                            "Cannot retrieve subPath '" +
                                n +
                                "' from node with no states"
                        );
                    var o = this.getStateNode(n);
                    if ('history' === o.type) return o.resolveHistory();
                    if (!this.states[n])
                        throw new Error(
                            "Child state '" +
                                n +
                                "' does not exist on '" +
                                this.id +
                                "'"
                        );
                    return this.states[n].getFromRelativePath(r);
                }),
                (a.prototype.historyValue = function (t) {
                    if (s(this.states).length)
                        return {
                            current: t || this.initialStateValue,
                            states: p(
                                this.states,
                                function (e, n) {
                                    if (!t) return e.historyValue();
                                    var r = O(t) ? void 0 : t[n];
                                    return e.historyValue(
                                        r || e.initialStateValue
                                    );
                                },
                                function (t) {
                                    return !t.history;
                                }
                            )
                        };
                }),
                (a.prototype.resolveHistory = function (t) {
                    var e = this;
                    if ('history' !== this.type) return [this];
                    var n = this.parent;
                    if (!t) {
                        var i = this.target;
                        return i
                            ? g(
                                  y(i).map(function (t) {
                                      return n.getFromRelativePath(t);
                                  })
                              )
                            : n.initialStateNodes;
                    }
                    var o,
                        a,
                        s = ((o = n.path),
                        (a = 'states'),
                        function (t) {
                            var e,
                                n,
                                i = t;
                            try {
                                for (
                                    var s = r(o), c = s.next();
                                    !c.done;
                                    c = s.next()
                                ) {
                                    var u = c.value;
                                    i = i[a][u];
                                }
                            } catch (t) {
                                e = { error: t };
                            } finally {
                                try {
                                    c && !c.done && (n = s.return) && n.call(s);
                                } finally {
                                    if (e) throw e.error;
                                }
                            }
                            return i;
                        })(t).current;
                    return O(s)
                        ? [n.getStateNode(s)]
                        : g(
                              y(s).map(function (t) {
                                  return 'deep' === e.history
                                      ? n.getFromRelativePath(t)
                                      : [n.states[t[0]]];
                              })
                          );
                }),
                Object.defineProperty(a.prototype, 'stateIds', {
                    get: function () {
                        var t = this,
                            e = g(
                                s(this.states).map(function (e) {
                                    return t.states[e].stateIds;
                                })
                            );
                        return [this.id].concat(e);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, 'events', {
                    get: function () {
                        var t, e, n, i;
                        if (this.__cache.events) return this.__cache.events;
                        var o = this.states,
                            a = new Set(this.ownEvents);
                        if (o)
                            try {
                                for (
                                    var c = r(s(o)), u = c.next();
                                    !u.done;
                                    u = c.next()
                                ) {
                                    var h = o[u.value];
                                    if (h.states)
                                        try {
                                            for (
                                                var f =
                                                        ((n = void 0),
                                                        r(h.events)),
                                                    l = f.next();
                                                !l.done;
                                                l = f.next()
                                            ) {
                                                var d = l.value;
                                                a.add('' + d);
                                            }
                                        } catch (t) {
                                            n = { error: t };
                                        } finally {
                                            try {
                                                l &&
                                                    !l.done &&
                                                    (i = f.return) &&
                                                    i.call(f);
                                            } finally {
                                                if (n) throw n.error;
                                            }
                                        }
                                }
                            } catch (e) {
                                t = { error: e };
                            } finally {
                                try {
                                    u && !u.done && (e = c.return) && e.call(c);
                                } finally {
                                    if (t) throw t.error;
                                }
                            }
                        return (this.__cache.events = Array.from(a));
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                Object.defineProperty(a.prototype, 'ownEvents', {
                    get: function () {
                        var t = new Set(
                            this.transitions
                                .filter(function (t) {
                                    return !(
                                        !t.target &&
                                        !t.actions.length &&
                                        t.internal
                                    );
                                })
                                .map(function (t) {
                                    return t.eventType;
                                })
                        );
                        return Array.from(t);
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                (a.prototype.resolveTarget = function (t) {
                    var e = this;
                    if (void 0 !== t)
                        return t.map(function (t) {
                            if (!O(t)) return t;
                            var n = t[0] === e.delimiter;
                            if (n && !e.parent)
                                return e.getStateNodeByPath(t.slice(1));
                            var r = n ? e.key + t : t;
                            if (!e.parent) return e.getStateNodeByPath(r);
                            try {
                                return e.parent.getStateNodeByPath(r);
                            } catch (t) {
                                throw new Error(
                                    "Invalid transition definition for state node '" +
                                        e.id +
                                        "':\n" +
                                        t.message
                                );
                            }
                        });
                }),
                (a.prototype.formatTransition = function (t) {
                    var n = this,
                        r = (function (t) {
                            if (void 0 !== t && '' !== t) return S(t);
                        })(t.target),
                        i =
                            'internal' in t
                                ? t.internal
                                : !r ||
                                  r.some(function (t) {
                                      return O(t) && t[0] === n.delimiter;
                                  }),
                        o = this.machine.options.guards,
                        a = this.resolveTarget(r),
                        s = e(e({}, t), {
                            actions: lt(S(t.actions)),
                            cond: A(t.cond, o),
                            target: a,
                            source: this,
                            internal: i,
                            eventType: t.event,
                            toJSON: function () {
                                return e(e({}, s), {
                                    target: s.target
                                        ? s.target.map(function (t) {
                                              return '#' + t.id;
                                          })
                                        : void 0,
                                    source: '#' + n.id
                                });
                            }
                        });
                    return s;
                }),
                (a.prototype.formatTransitions = function () {
                    var t,
                        e,
                        a,
                        c = this;
                    if (this.config.on)
                        if (Array.isArray(this.config.on)) a = this.config.on;
                        else {
                            var u = this.config.on,
                                h = u['*'],
                                f = void 0 === h ? [] : h,
                                l = n(u, ['*']);
                            a = g(
                                s(l)
                                    .map(function (t) {
                                        return D(t, l[t]);
                                    })
                                    .concat(D('*', f))
                            );
                        }
                    else a = [];
                    var d = this.config.always ? D('', this.config.always) : [],
                        p = this.config.onDone
                            ? D(String(Et(this.id)), this.config.onDone)
                            : [],
                        v = g(
                            this.invoke.map(function (t) {
                                var e = [];
                                return (
                                    t.onDone &&
                                        e.push.apply(
                                            e,
                                            o(
                                                [],
                                                i(D(String(Tt(t.id)), t.onDone))
                                            )
                                        ),
                                    t.onError &&
                                        e.push.apply(
                                            e,
                                            o(
                                                [],
                                                i(
                                                    D(
                                                        String(Nt(t.id)),
                                                        t.onError
                                                    )
                                                )
                                            )
                                        ),
                                    e
                                );
                            })
                        ),
                        y = this.after,
                        m = g(
                            o(o(o(o([], i(p)), i(v)), i(a)), i(d)).map(
                                function (t) {
                                    return S(t).map(function (t) {
                                        return c.formatTransition(t);
                                    });
                                }
                            )
                        );
                    try {
                        for (
                            var x = r(y), w = x.next();
                            !w.done;
                            w = x.next()
                        ) {
                            var b = w.value;
                            m.push(b);
                        }
                    } catch (e) {
                        t = { error: e };
                    } finally {
                        try {
                            w && !w.done && (e = x.return) && e.call(x);
                        } finally {
                            if (t) throw t.error;
                        }
                    }
                    return m;
                }),
                a
            );
        })();
    var zt = { deferEvents: !1 },
        Ft = (function () {
            function t(t) {
                (this.processingEvent = !1),
                    (this.queue = []),
                    (this.initialized = !1),
                    (this.options = e(e({}, zt), t));
            }
            return (
                (t.prototype.initialize = function (t) {
                    if (((this.initialized = !0), t)) {
                        if (!this.options.deferEvents)
                            return void this.schedule(t);
                        this.process(t);
                    }
                    this.flushEvents();
                }),
                (t.prototype.schedule = function (t) {
                    if (this.initialized && !this.processingEvent) {
                        if (0 !== this.queue.length)
                            throw new Error(
                                'Event queue should be empty when it is not processing events'
                            );
                        this.process(t), this.flushEvents();
                    } else this.queue.push(t);
                }),
                (t.prototype.clear = function () {
                    this.queue = [];
                }),
                (t.prototype.flushEvents = function () {
                    for (var t = this.queue.shift(); t; )
                        this.process(t), (t = this.queue.shift());
                }),
                (t.prototype.process = function (t) {
                    this.processingEvent = !0;
                    try {
                        t();
                    } catch (t) {
                        throw (this.clear(), t);
                    } finally {
                        this.processingEvent = !1;
                    }
                }),
                t
            );
        })(),
        Ut = new Map(),
        Bt = 0,
        Jt = function () {
            return 'x:' + Bt++;
        },
        qt = function (t, e) {
            return Ut.set(t, e), t;
        },
        $t = function (t) {
            return Ut.get(t);
        },
        Xt = function (t) {
            Ut.delete(t);
        };
    function Ht() {
        return 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
            ? global
            : void 0;
    }
    function Gt(t) {
        if (Ht()) {
            var e = (function () {
                var t = Ht();
                if (t && '__xstate__' in t) return t.__xstate__;
            })();
            e && e.register(t);
        }
    }
    function Kt(t, n) {
        void 0 === n && (n = {});
        var r,
            i = t.initialState,
            o = new Set(),
            a = [],
            s = !1,
            c =
                ((r = {
                    id: n.id,
                    send: function (e) {
                        a.push(e),
                            (function () {
                                if (!s) {
                                    for (s = !0; a.length > 0; ) {
                                        var e = a.shift();
                                        (i = t.transition(i, e, u)),
                                            o.forEach(function (t) {
                                                return t.next(i);
                                            });
                                    }
                                    s = !1;
                                }
                            })();
                    },
                    getSnapshot: function () {
                        return i;
                    },
                    subscribe: function (t, e, n) {
                        var r = z(t, e, n);
                        return (
                            o.add(r),
                            r.next(i),
                            {
                                unsubscribe: function () {
                                    o.delete(r);
                                }
                            }
                        );
                    }
                }),
                e(
                    {
                        subscribe: function () {
                            return { unsubscribe: function () {} };
                        },
                        id: 'anonymous',
                        getSnapshot: function () {}
                    },
                    r
                )),
            u = {
                parent: n.parent,
                self: c,
                id: n.id || 'anonymous',
                observers: o
            };
        return (i = t.start ? t.start(u) : i), c;
    }
    var Qt,
        Wt = { sync: !1, autoForward: !1 };
    ((Qt = t.InterpreterStatus || (t.InterpreterStatus = {}))[
        (Qt.NotStarted = 0)
    ] = 'NotStarted'),
        (Qt[(Qt.Running = 1)] = 'Running'),
        (Qt[(Qt.Stopped = 2)] = 'Stopped');
    var Yt = (function () {
        function n(r, i) {
            var o = this;
            void 0 === i && (i = n.defaultOptions),
                (this.machine = r),
                (this.scheduler = new Ft()),
                (this.delayedEventsMap = {}),
                (this.listeners = new Set()),
                (this.contextListeners = new Set()),
                (this.stopListeners = new Set()),
                (this.doneListeners = new Set()),
                (this.eventListeners = new Set()),
                (this.sendListeners = new Set()),
                (this.initialized = !1),
                (this.status = t.InterpreterStatus.NotStarted),
                (this.children = new Map()),
                (this.forwardTo = new Set()),
                (this.init = this.start),
                (this.send = function (e, n) {
                    if (T(e)) return o.batch(e), o.state;
                    var r = L(V(e, n));
                    if (o.status === t.InterpreterStatus.Stopped)
                        return o.state;
                    if (
                        o.status !== t.InterpreterStatus.Running &&
                        !o.options.deferEvents
                    )
                        throw new Error(
                            'Event "' +
                                r.name +
                                '" was sent to uninitialized service "' +
                                o.machine.id +
                                '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ' +
                                JSON.stringify(r.data)
                        );
                    return (
                        o.scheduler.schedule(function () {
                            o.forward(r);
                            var t = o.nextState(r);
                            o.update(t, r);
                        }),
                        o._state
                    );
                }),
                (this.sendTo = function (n, r) {
                    var i,
                        a =
                            o.parent &&
                            (r === t.SpecialTargets.Parent ||
                                o.parent.id === r),
                        s = a
                            ? o.parent
                            : O(r)
                            ? o.children.get(r) || $t(r)
                            : (i = r) && 'function' == typeof i.send
                            ? r
                            : void 0;
                    if (s)
                        'machine' in s
                            ? s.send(
                                  e(e({}, n), {
                                      name:
                                          n.name === ot
                                              ? '' + Nt(o.id)
                                              : n.name,
                                      origin: o.sessionId
                                  })
                              )
                            : s.send(n.data);
                    else if (!a)
                        throw new Error(
                            "Unable to send event to child '" +
                                r +
                                "' from service '" +
                                o.id +
                                "'."
                        );
                });
            var a = e(e({}, n.defaultOptions), i),
                s = a.clock,
                c = a.logger,
                u = a.parent,
                h = a.id,
                f = void 0 !== h ? h : r.id;
            (this.id = f),
                (this.logger = c),
                (this.clock = s),
                (this.parent = u),
                (this.options = a),
                (this.scheduler = new Ft({
                    deferEvents: this.options.deferEvents
                })),
                (this.sessionId = Jt());
        }
        return (
            Object.defineProperty(n.prototype, 'initialState', {
                get: function () {
                    var t = this;
                    return this._initialState
                        ? this._initialState
                        : It(this, function () {
                              return (
                                  (t._initialState = t.machine.initialState),
                                  t._initialState
                              );
                          });
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, 'state', {
                get: function () {
                    return this._state;
                },
                enumerable: !1,
                configurable: !0
            }),
            (n.prototype.execute = function (t, e) {
                var n, i;
                try {
                    for (
                        var o = r(t.actions), a = o.next();
                        !a.done;
                        a = o.next()
                    ) {
                        var s = a.value;
                        this.exec(s, t, e);
                    }
                } catch (t) {
                    n = { error: t };
                } finally {
                    try {
                        a && !a.done && (i = o.return) && i.call(o);
                    } finally {
                        if (n) throw n.error;
                    }
                }
            }),
            (n.prototype.update = function (t, e) {
                var n,
                    i,
                    o,
                    a,
                    s,
                    c,
                    u,
                    h,
                    f = this;
                if (
                    ((t._sessionid = this.sessionId),
                    (this._state = t),
                    this.options.execute && this.execute(this.state),
                    this.children.forEach(function (t) {
                        f.state.children[t.id] = t;
                    }),
                    this.devTools && this.devTools.send(e.data, t),
                    t.event)
                )
                    try {
                        for (
                            var l = r(this.eventListeners), d = l.next();
                            !d.done;
                            d = l.next()
                        ) {
                            (0, d.value)(t.event);
                        }
                    } catch (t) {
                        n = { error: t };
                    } finally {
                        try {
                            d && !d.done && (i = l.return) && i.call(l);
                        } finally {
                            if (n) throw n.error;
                        }
                    }
                try {
                    for (
                        var p = r(this.listeners), v = p.next();
                        !v.done;
                        v = p.next()
                    ) {
                        (0, v.value)(t, t.event);
                    }
                } catch (t) {
                    o = { error: t };
                } finally {
                    try {
                        v && !v.done && (a = p.return) && a.call(p);
                    } finally {
                        if (o) throw o.error;
                    }
                }
                try {
                    for (
                        var y = r(this.contextListeners), g = y.next();
                        !g.done;
                        g = y.next()
                    ) {
                        (0, g.value)(
                            this.state.context,
                            this.state.history
                                ? this.state.history.context
                                : void 0
                        );
                    }
                } catch (t) {
                    s = { error: t };
                } finally {
                    try {
                        g && !g.done && (c = y.return) && c.call(y);
                    } finally {
                        if (s) throw s.error;
                    }
                }
                var m = H(t.configuration || [], this.machine);
                if (this.state.configuration && m) {
                    var S = t.configuration.find(function (t) {
                            return 'final' === t.type && t.parent === f.machine;
                        }),
                        w =
                            S && S.doneData
                                ? x(S.doneData, t.context, e)
                                : void 0;
                    try {
                        for (
                            var b = r(this.doneListeners), _ = b.next();
                            !_.done;
                            _ = b.next()
                        ) {
                            (0, _.value)(Tt(this.id, w));
                        }
                    } catch (t) {
                        u = { error: t };
                    } finally {
                        try {
                            _ && !_.done && (h = b.return) && h.call(b);
                        } finally {
                            if (u) throw u.error;
                        }
                    }
                    this.stop();
                }
            }),
            (n.prototype.onTransition = function (e) {
                return (
                    this.listeners.add(e),
                    this.status === t.InterpreterStatus.Running &&
                        e(this.state, this.state.event),
                    this
                );
            }),
            (n.prototype.subscribe = function (e, n, r) {
                var i,
                    o = this;
                if (!e) return { unsubscribe: function () {} };
                var a = r;
                return (
                    'function' == typeof e
                        ? (i = e)
                        : ((i = e.next.bind(e)), (a = e.complete.bind(e))),
                    this.listeners.add(i),
                    this.status === t.InterpreterStatus.Running &&
                        i(this.state),
                    a && this.onDone(a),
                    {
                        unsubscribe: function () {
                            i && o.listeners.delete(i),
                                a && o.doneListeners.delete(a);
                        }
                    }
                );
            }),
            (n.prototype.onEvent = function (t) {
                return this.eventListeners.add(t), this;
            }),
            (n.prototype.onSend = function (t) {
                return this.sendListeners.add(t), this;
            }),
            (n.prototype.onChange = function (t) {
                return this.contextListeners.add(t), this;
            }),
            (n.prototype.onStop = function (t) {
                return this.stopListeners.add(t), this;
            }),
            (n.prototype.onDone = function (t) {
                return this.doneListeners.add(t), this;
            }),
            (n.prototype.off = function (t) {
                return (
                    this.listeners.delete(t),
                    this.eventListeners.delete(t),
                    this.sendListeners.delete(t),
                    this.stopListeners.delete(t),
                    this.doneListeners.delete(t),
                    this.contextListeners.delete(t),
                    this
                );
            }),
            (n.prototype.start = function (e) {
                var n = this;
                if (this.status === t.InterpreterStatus.Running) return this;
                qt(this.sessionId, this),
                    (this.initialized = !0),
                    (this.status = t.InterpreterStatus.Running);
                var r =
                    void 0 === e
                        ? this.initialState
                        : It(this, function () {
                              return !O((t = e)) &&
                                  'value' in t &&
                                  'history' in t
                                  ? n.machine.resolveState(e)
                                  : n.machine.resolveState(
                                        Pt.from(e, n.machine.context)
                                    );
                              var t;
                          });
                return (
                    this.options.devTools && this.attachDev(),
                    this.scheduler.initialize(function () {
                        n.update(r, ut);
                    }),
                    this
                );
            }),
            (n.prototype.stop = function () {
                var e,
                    n,
                    i,
                    o,
                    a,
                    c,
                    u,
                    h,
                    f,
                    l,
                    d = this;
                try {
                    for (
                        var p = r(this.listeners), v = p.next();
                        !v.done;
                        v = p.next()
                    ) {
                        var y = v.value;
                        this.listeners.delete(y);
                    }
                } catch (t) {
                    e = { error: t };
                } finally {
                    try {
                        v && !v.done && (n = p.return) && n.call(p);
                    } finally {
                        if (e) throw e.error;
                    }
                }
                try {
                    for (
                        var g = r(this.stopListeners), m = g.next();
                        !m.done;
                        m = g.next()
                    ) {
                        (y = m.value)(), this.stopListeners.delete(y);
                    }
                } catch (t) {
                    i = { error: t };
                } finally {
                    try {
                        m && !m.done && (o = g.return) && o.call(g);
                    } finally {
                        if (i) throw i.error;
                    }
                }
                try {
                    for (
                        var S = r(this.contextListeners), x = S.next();
                        !x.done;
                        x = S.next()
                    ) {
                        y = x.value;
                        this.contextListeners.delete(y);
                    }
                } catch (t) {
                    a = { error: t };
                } finally {
                    try {
                        x && !x.done && (c = S.return) && c.call(S);
                    } finally {
                        if (a) throw a.error;
                    }
                }
                try {
                    for (
                        var w = r(this.doneListeners), b = w.next();
                        !b.done;
                        b = w.next()
                    ) {
                        y = b.value;
                        this.doneListeners.delete(y);
                    }
                } catch (t) {
                    u = { error: t };
                } finally {
                    try {
                        b && !b.done && (h = w.return) && h.call(w);
                    } finally {
                        if (u) throw u.error;
                    }
                }
                if (!this.initialized) return this;
                this.state.configuration.forEach(function (t) {
                    var e, n;
                    try {
                        for (
                            var i = r(t.definition.exit), o = i.next();
                            !o.done;
                            o = i.next()
                        ) {
                            var a = o.value;
                            d.exec(a, d.state);
                        }
                    } catch (t) {
                        e = { error: t };
                    } finally {
                        try {
                            o && !o.done && (n = i.return) && n.call(i);
                        } finally {
                            if (e) throw e.error;
                        }
                    }
                }),
                    this.children.forEach(function (t) {
                        N(t.stop) && t.stop();
                    });
                try {
                    for (
                        var _ = r(s(this.delayedEventsMap)), E = _.next();
                        !E.done;
                        E = _.next()
                    ) {
                        var T = E.value;
                        this.clock.clearTimeout(this.delayedEventsMap[T]);
                    }
                } catch (t) {
                    f = { error: t };
                } finally {
                    try {
                        E && !E.done && (l = _.return) && l.call(_);
                    } finally {
                        if (f) throw f.error;
                    }
                }
                return (
                    this.scheduler.clear(),
                    (this.initialized = !1),
                    (this.status = t.InterpreterStatus.Stopped),
                    Xt(this.sessionId),
                    this
                );
            }),
            (n.prototype.batch = function (n) {
                var a = this;
                if (
                    this.status === t.InterpreterStatus.NotStarted &&
                    this.options.deferEvents
                );
                else if (this.status !== t.InterpreterStatus.Running)
                    throw new Error(
                        n.length +
                            ' event(s) were sent to uninitialized service "' +
                            this.machine.id +
                            '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.'
                    );
                this.scheduler.schedule(function () {
                    var t,
                        s,
                        c = a.state,
                        u = !1,
                        h = [],
                        f = function (t) {
                            var n = L(t);
                            a.forward(n),
                                (c = It(a, function () {
                                    return a.machine.transition(c, n);
                                })),
                                h.push.apply(
                                    h,
                                    o(
                                        [],
                                        i(
                                            c.actions.map(function (t) {
                                                return (
                                                    (r = c),
                                                    (i = (n = t).exec),
                                                    e(e({}, n), {
                                                        exec:
                                                            void 0 !== i
                                                                ? function () {
                                                                      return i(
                                                                          r.context,
                                                                          r.event,
                                                                          {
                                                                              action: n,
                                                                              state: r,
                                                                              _event: r._event
                                                                          }
                                                                      );
                                                                  }
                                                                : void 0
                                                    })
                                                );
                                                var n, r, i;
                                            })
                                        )
                                    )
                                ),
                                (u = u || !!c.changed);
                        };
                    try {
                        for (
                            var l = r(n), d = l.next();
                            !d.done;
                            d = l.next()
                        ) {
                            f(d.value);
                        }
                    } catch (e) {
                        t = { error: e };
                    } finally {
                        try {
                            d && !d.done && (s = l.return) && s.call(l);
                        } finally {
                            if (t) throw t.error;
                        }
                    }
                    (c.changed = u),
                        (c.actions = h),
                        a.update(c, L(n[n.length - 1]));
                });
            }),
            (n.prototype.sender = function (t) {
                return this.send.bind(this, t);
            }),
            (n.prototype.nextState = function (t) {
                var e = this,
                    n = L(t);
                if (
                    0 === n.name.indexOf(it) &&
                    !this.state.nextEvents.some(function (t) {
                        return 0 === t.indexOf(it);
                    })
                )
                    throw n.data.data;
                return It(this, function () {
                    return e.machine.transition(e.state, n);
                });
            }),
            (n.prototype.forward = function (t) {
                var e, n;
                try {
                    for (
                        var i = r(this.forwardTo), o = i.next();
                        !o.done;
                        o = i.next()
                    ) {
                        var a = o.value,
                            s = this.children.get(a);
                        if (!s)
                            throw new Error(
                                "Unable to forward event '" +
                                    t +
                                    "' from interpreter '" +
                                    this.id +
                                    "' to nonexistant child '" +
                                    a +
                                    "'."
                            );
                        s.send(t);
                    }
                } catch (t) {
                    e = { error: t };
                } finally {
                    try {
                        o && !o.done && (n = i.return) && n.call(i);
                    } finally {
                        if (e) throw e.error;
                    }
                }
            }),
            (n.prototype.defer = function (t) {
                var e = this;
                this.delayedEventsMap[t.id] = this.clock.setTimeout(
                    function () {
                        t.to ? e.sendTo(t._event, t.to) : e.send(t._event);
                    },
                    t.delay
                );
            }),
            (n.prototype.cancel = function (t) {
                this.clock.clearTimeout(this.delayedEventsMap[t]),
                    delete this.delayedEventsMap[t];
            }),
            (n.prototype.exec = function (e, n, r) {
                void 0 === r && (r = this.machine.options.actions);
                var i = n.context,
                    o = n._event,
                    a = e.exec || ht(e.type, r),
                    s = N(a) ? a : a ? a.exec : e.exec;
                if (s)
                    try {
                        return s(i, o.data, {
                            action: e,
                            state: this.state,
                            _event: o
                        });
                    } catch (t) {
                        throw (
                            (this.parent &&
                                this.parent.send({
                                    type: 'xstate.error',
                                    data: t
                                }),
                            t)
                        );
                    }
                switch (e.type) {
                    case W:
                        var c = e;
                        if ('number' == typeof c.delay)
                            return void this.defer(c);
                        c.to
                            ? this.sendTo(c._event, c.to)
                            : this.send(c._event);
                        break;
                    case Y:
                        this.cancel(e.sendId);
                        break;
                    case G:
                        var u = e.activity;
                        if (!this.state.activities[u.id || u.type]) break;
                        if (u.type === t.ActionTypes.Invoke) {
                            var h = M(u.src),
                                f = this.machine.options.services
                                    ? this.machine.options.services[h.type]
                                    : void 0,
                                l = u.id,
                                d = u.data,
                                p =
                                    'autoForward' in u
                                        ? u.autoForward
                                        : !!u.forward;
                            if (!f) return;
                            var v = d ? x(d, i, o) : void 0;
                            if ('string' == typeof f) return;
                            var y = N(f)
                                ? f(i, o.data, { data: v, src: h })
                                : f;
                            if (!y) return;
                            var g = void 0;
                            k(y) &&
                                ((y = v ? y.withContext(v) : y),
                                (g = { autoForward: p })),
                                this.spawn(y, l, g);
                        } else this.spawnActivity(u);
                        break;
                    case K:
                        this.stopChild(e.activity.id);
                        break;
                    case et:
                        var m = e.label,
                            S = e.value;
                        m ? this.logger(m, S) : this.logger(S);
                }
            }),
            (n.prototype.removeChild = function (t) {
                var e;
                this.children.delete(t),
                    this.forwardTo.delete(t),
                    null === (e = this.state) ||
                        void 0 === e ||
                        delete e.children[t];
            }),
            (n.prototype.stopChild = function (t) {
                var e = this.children.get(t);
                e && (this.removeChild(t), N(e.stop) && e.stop());
            }),
            (n.prototype.spawn = function (t, n, r) {
                if (w(t)) return this.spawnPromise(Promise.resolve(t), n);
                if (N(t)) return this.spawnCallback(t, n);
                if (
                    (function (t) {
                        try {
                            return 'function' == typeof t.send;
                        } catch (t) {
                            return !1;
                        }
                    })((o = t)) &&
                    'id' in o
                )
                    return this.spawnActor(t, n);
                if (
                    (function (t) {
                        try {
                            return 'subscribe' in t && N(t.subscribe);
                        } catch (t) {
                            return !1;
                        }
                    })(t)
                )
                    return this.spawnObservable(t, n);
                if (k(t)) return this.spawnMachine(t, e(e({}, r), { id: n }));
                if (
                    null !== (i = t) &&
                    'object' == typeof i &&
                    'transition' in i &&
                    'function' == typeof i.transition
                )
                    return this.spawnBehavior(t, n);
                throw new Error(
                    'Unable to spawn entity "' +
                        n +
                        '" of type "' +
                        typeof t +
                        '".'
                );
                var i, o;
            }),
            (n.prototype.spawnMachine = function (t, r) {
                var i = this;
                void 0 === r && (r = {});
                var o = new n(
                        t,
                        e(e({}, this.options), {
                            parent: this,
                            id: r.id || t.id
                        })
                    ),
                    a = e(e({}, Wt), r);
                a.sync &&
                    o.onTransition(function (t) {
                        i.send(at, { state: t, id: o.id });
                    });
                var s = o;
                return (
                    this.children.set(o.id, s),
                    a.autoForward && this.forwardTo.add(o.id),
                    o
                        .onDone(function (t) {
                            i.removeChild(o.id), i.send(L(t, { origin: o.id }));
                        })
                        .start(),
                    s
                );
            }),
            (n.prototype.spawnBehavior = function (t, e) {
                var n = Kt(t, { id: e, parent: this });
                return this.children.set(e, n), n;
            }),
            (n.prototype.spawnPromise = function (t, e) {
                var n,
                    r = this,
                    i = !1;
                t.then(
                    function (t) {
                        i ||
                            ((n = t),
                            r.removeChild(e),
                            r.send(L(Tt(e, t), { origin: e })));
                    },
                    function (t) {
                        if (!i) {
                            r.removeChild(e);
                            var n = Nt(e, t);
                            try {
                                r.send(L(n, { origin: e }));
                            } catch (t) {
                                r.devTools && r.devTools.send(n, r.state),
                                    r.machine.strict && r.stop();
                            }
                        }
                    }
                );
                var o = {
                    id: e,
                    send: function () {},
                    subscribe: function (e, n, r) {
                        var i = z(e, n, r),
                            o = !1;
                        return (
                            t.then(
                                function (t) {
                                    o || (i.next(t), o || i.complete());
                                },
                                function (t) {
                                    o || i.error(t);
                                }
                            ),
                            {
                                unsubscribe: function () {
                                    return (o = !0);
                                }
                            }
                        );
                    },
                    stop: function () {
                        i = !0;
                    },
                    toJSON: function () {
                        return { id: e };
                    },
                    getSnapshot: function () {
                        return n;
                    }
                };
                return this.children.set(e, o), o;
            }),
            (n.prototype.spawnCallback = function (t, e) {
                var n,
                    r,
                    i = this,
                    o = !1,
                    a = new Set(),
                    s = new Set();
                try {
                    r = t(
                        function (t) {
                            (n = t),
                                s.forEach(function (e) {
                                    return e(t);
                                }),
                                o || i.send(L(t, { origin: e }));
                        },
                        function (t) {
                            a.add(t);
                        }
                    );
                } catch (t) {
                    this.send(Nt(e, t));
                }
                if (w(r)) return this.spawnPromise(r, e);
                var c = {
                    id: e,
                    send: function (t) {
                        return a.forEach(function (e) {
                            return e(t);
                        });
                    },
                    subscribe: function (t) {
                        return (
                            s.add(t),
                            {
                                unsubscribe: function () {
                                    s.delete(t);
                                }
                            }
                        );
                    },
                    stop: function () {
                        (o = !0), N(r) && r();
                    },
                    toJSON: function () {
                        return { id: e };
                    },
                    getSnapshot: function () {
                        return n;
                    }
                };
                return this.children.set(e, c), c;
            }),
            (n.prototype.spawnObservable = function (t, e) {
                var n,
                    r = this,
                    i = t.subscribe(
                        function (t) {
                            (n = t), r.send(L(t, { origin: e }));
                        },
                        function (t) {
                            r.removeChild(e),
                                r.send(L(Nt(e, t), { origin: e }));
                        },
                        function () {
                            r.removeChild(e), r.send(L(Tt(e), { origin: e }));
                        }
                    ),
                    o = {
                        id: e,
                        send: function () {},
                        subscribe: function (e, n, r) {
                            return t.subscribe(e, n, r);
                        },
                        stop: function () {
                            return i.unsubscribe();
                        },
                        getSnapshot: function () {
                            return n;
                        },
                        toJSON: function () {
                            return { id: e };
                        }
                    };
                return this.children.set(e, o), o;
            }),
            (n.prototype.spawnActor = function (t, e) {
                return this.children.set(e, t), t;
            }),
            (n.prototype.spawnActivity = function (t) {
                var e =
                    this.machine.options && this.machine.options.activities
                        ? this.machine.options.activities[t.type]
                        : void 0;
                if (e) {
                    var n = e(this.state.context, t);
                    this.spawnEffect(t.id, n);
                }
            }),
            (n.prototype.spawnEffect = function (t, e) {
                this.children.set(t, {
                    id: t,
                    send: function () {},
                    subscribe: function () {
                        return { unsubscribe: function () {} };
                    },
                    stop: e || void 0,
                    getSnapshot: function () {},
                    toJSON: function () {
                        return { id: t };
                    }
                });
            }),
            (n.prototype.attachDev = function () {
                var t = Ht();
                if (this.options.devTools && t) {
                    if (t.__REDUX_DEVTOOLS_EXTENSION__) {
                        var n =
                            'object' == typeof this.options.devTools
                                ? this.options.devTools
                                : void 0;
                        (this.devTools = t.__REDUX_DEVTOOLS_EXTENSION__.connect(
                            e(
                                e(
                                    {
                                        name: this.id,
                                        autoPause: !0,
                                        stateSanitizer: function (t) {
                                            return {
                                                value: t.value,
                                                context: t.context,
                                                actions: t.actions
                                            };
                                        }
                                    },
                                    n
                                ),
                                {
                                    features: e(
                                        { jump: !1, skip: !1 },
                                        n ? n.features : void 0
                                    )
                                }
                            ),
                            this.machine
                        )),
                            this.devTools.init(this.state);
                    }
                    Gt(this);
                }
            }),
            (n.prototype.toJSON = function () {
                return { id: this.id };
            }),
            (n.prototype[P] = function () {
                return this;
            }),
            (n.prototype.getSnapshot = function () {
                return this.status === t.InterpreterStatus.NotStarted
                    ? this.initialState
                    : this._state;
            }),
            (n.defaultOptions = (function (t) {
                return {
                    execute: !0,
                    deferEvents: !0,
                    clock: {
                        setTimeout: function (t, e) {
                            return setTimeout(t, e);
                        },
                        clearTimeout: function (t) {
                            return clearTimeout(t);
                        }
                    },
                    logger: t.console.log.bind(console),
                    devTools: !1
                };
            })('undefined' != typeof self ? self : global)),
            (n.interpret = Zt),
            n
        );
    })();
    function Zt(t, e) {
        return new Yt(t, e);
    }
    var te = {
        raise: pt,
        send: vt,
        sendParent: yt,
        sendUpdate: gt,
        log: function (t, e) {
            return void 0 === t && (t = mt), { type: et, label: e, expr: t };
        },
        cancel: St,
        start: xt,
        stop: wt,
        assign: bt,
        after: _t,
        done: Et,
        respond: function (t, n) {
            return vt(
                t,
                e(e({}, n), {
                    to: function (t, e, n) {
                        return n._event.origin;
                    }
                })
            );
        },
        forwardTo: Ot,
        escalate: function (n, r) {
            return yt(function (t, e, r) {
                return { type: ot, data: N(n) ? n(t, e, r) : n };
            }, e(e({}, r), { to: t.SpecialTargets.Parent }));
        },
        choose: function (e) {
            return { type: t.ActionTypes.Choose, conds: e };
        },
        pure: function (e) {
            return { type: t.ActionTypes.Pure, get: e };
        }
    };
    (t.Interpreter = Yt),
        (t.Machine = function (t, e, n) {
            return void 0 === n && (n = t.context), new Mt(t, e, n);
        }),
        (t.State = Pt),
        (t.StateNode = Mt),
        (t.actions = te),
        (t.assign = bt),
        (t.createMachine = function (t, e) {
            return new Mt(t, e);
        }),
        (t.createSchema = function (t) {
            return t;
        }),
        (t.doneInvoke = Tt),
        (t.forwardTo = Ot),
        (t.interpret = Zt),
        (t.mapState = function (t, e) {
            var n, i, o;
            try {
                for (var a = r(s(t)), u = a.next(); !u.done; u = a.next()) {
                    var h = u.value;
                    c(h, e) && (!o || e.length > o.length) && (o = h);
                }
            } catch (t) {
                n = { error: t };
            } finally {
                try {
                    u && !u.done && (i = a.return) && i.call(a);
                } finally {
                    if (n) throw n.error;
                }
            }
            return t[o];
        }),
        (t.matchState = function (t, e, n) {
            var o,
                a,
                s = Pt.from(t, t instanceof Pt ? t.context : void 0);
            try {
                for (var c = r(e), u = c.next(); !u.done; u = c.next()) {
                    var h = i(u.value, 2),
                        f = h[0],
                        l = h[1];
                    if (s.matches(f)) return l(s);
                }
            } catch (t) {
                o = { error: t };
            } finally {
                try {
                    u && !u.done && (a = c.return) && a.call(c);
                } finally {
                    if (o) throw o.error;
                }
            }
            return n(s);
        }),
        (t.matchesState = c),
        (t.send = vt),
        (t.sendParent = yt),
        (t.sendUpdate = gt),
        (t.spawn = function (t, n) {
            var r = (function (t) {
                return O(t)
                    ? e(e({}, Wt), { name: t })
                    : e(e(e({}, Wt), { name: C() }), t);
            })(n);
            return (function (e) {
                return e ? e.spawn(t, r.name, r) : Ct(t, r.name);
            })(kt[kt.length - 1]);
        }),
        Object.defineProperty(t, '__esModule', { value: !0 });
});
